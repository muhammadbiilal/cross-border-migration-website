import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

import { FAQS, TESTIMONIALS } from '../data/content.data';
import { DESTINATIONS, Destination } from '../data/destinations.data';
import { SERVICES, ServiceItem } from '../data/services.data';
import { EMAILS, OFFICES, PHONES } from '../data/site.data';
import { SupabaseService } from './supabase.service';

export type CatalogKind =
  | 'services'
  | 'destinations'
  | 'faqs'
  | 'testimonials'
  | 'offices'
  | 'phones'
  | 'emails';

export interface CatalogField {
  key: string;
  label: string;
  value: string;
  lines?: boolean;
}

export interface CatalogRow {
  key: string;
  label: string;
  fields: CatalogField[];
}

interface FieldSpec {
  key: string;
  label: string;
  lines?: boolean;
}

const SPECS: Record<CatalogKind, FieldSpec[]> = {
  services: [
    { key: 'slug', label: 'Slug' },
    { key: 'title', label: 'Title' },
    { key: 'summary', label: 'Summary', lines: true },
    { key: 'lead', label: 'Longer text', lines: true },
    { key: 'points', label: 'Bullet list, one item per line', lines: true },
  ],
  destinations: [
    { key: 'slug', label: 'Slug' },
    { key: 'name', label: 'Title' },
    { key: 'region', label: 'Region' },
    { key: 'summary', label: 'Summary', lines: true },
    { key: 'pathways', label: 'Bullet list, one item per line', lines: true },
  ],
  faqs: [
    { key: 'question', label: 'Question', lines: true },
    { key: 'answer', label: 'Answer', lines: true },
  ],
  testimonials: [
    { key: 'quote', label: 'Quote', lines: true },
    { key: 'name', label: 'Name' },
    { key: 'detail', label: 'Detail' },
  ],
  offices: [
    { key: 'name', label: 'Name' },
    { key: 'address', label: 'Address', lines: true },
  ],
  phones: [
    { key: 'label', label: 'Label' },
    { key: 'text', label: 'Number' },
    { key: 'href', label: 'Link' },
  ],
  emails: [
    { key: 'label', label: 'Label' },
    { key: 'text', label: 'Email' },
    { key: 'href', label: 'Link' },
  ],
};

const LIST_FIELDS = new Set(['points', 'pathways']);
const SLUG_KINDS = new Set<CatalogKind>(['services', 'destinations']);

type Row = Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly supabase = inject(SupabaseService);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly services = signal<ServiceItem[]>(SERVICES.map((item) => ({ ...item, points: [...item.points] })));
  readonly destinations = signal<Destination[]>(
    DESTINATIONS.map((item) => ({ ...item, pathways: [...item.pathways] })),
  );
  readonly faqs = signal<{ question: string; answer: string }[]>(FAQS.map((item) => ({ ...item })));
  readonly testimonials = signal<{ quote: string; name: string; detail: string }[]>(
    TESTIMONIALS.map((item) => ({ ...item })),
  );
  readonly offices = signal<{ name: string; address: string }[]>(OFFICES.map((item) => ({ ...item })));
  readonly phones = signal<{ label: string; href: string; text: string }[]>(PHONES.map((item) => ({ ...item })));
  readonly emails = signal<{ label: string; href: string; text: string }[]>(EMAILS.map((item) => ({ ...item })));
  readonly loaded = signal(!this.browser || !this.supabase.configured);

  constructor() {
    if (this.browser && this.supabase.configured) void this.refresh();
  }

  async refresh(): Promise<void> {
    await Promise.all(
      (Object.keys(SPECS) as CatalogKind[]).map((kind) => this.pull(kind)),
    );
    this.loaded.set(true);
  }

  blank(kind: CatalogKind): CatalogRow {
    return {
      key: '',
      label: 'New',
      fields: SPECS[kind].map((field) => ({ ...field, value: '' })),
    };
  }

  async list(kind: CatalogKind): Promise<{ rows: CatalogRow[]; error: string | null }> {
    const { rows, error } = await this.pull(kind);
    return {
      rows: rows.map((row) => this.toCatalog(kind, row)),
      error,
    };
  }

  async save(
    kind: CatalogKind,
    fields: CatalogField[],
    previousKey: string | null,
    sort: number,
  ): Promise<string | null> {
    const values = Object.fromEntries(fields.map((field) => [field.key, field.value.trim()]));
    const slug = values['slug'] ?? '';
    if (SLUG_KINDS.has(kind) && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return 'Use a slug of lowercase letters, numbers, and hyphens.';
    }
    if (fields.some((field) => !values[field.key])) {
      return 'Fill in every field.';
    }

    const payload: Row = { sort };
    for (const field of fields) {
      payload[field.key] = LIST_FIELDS.has(field.key) ? lines(values[field.key]) : values[field.key];
    }

    if (SLUG_KINDS.has(kind)) {
      if (previousKey && previousKey !== slug) {
        const removed = await this.supabase.db.from(kind).delete().eq('slug', previousKey);
        if (removed.error) return removed.error.message;
      }
      const { error } = await this.supabase.db.from(kind).upsert(payload);
      if (error) return error.message;
    } else if (previousKey) {
      const { error } = await this.supabase.db.from(kind).update(payload).eq('id', previousKey);
      if (error) return error.message;
    } else {
      const { error } = await this.supabase.db.from(kind).insert(payload);
      if (error) return error.message;
    }

    await this.pull(kind);
    return null;
  }

  async remove(kind: CatalogKind, key: string): Promise<string | null> {
    const column = SLUG_KINDS.has(kind) ? 'slug' : 'id';
    const { error } = await this.supabase.db.from(kind).delete().eq(column, key);
    if (error) return error.message;
    await this.pull(kind);
    return null;
  }

  private async pull(kind: CatalogKind): Promise<{ rows: Row[]; error: string | null }> {
    if (!this.supabase.configured) return { rows: [], error: 'Supabase is not configured.' };

    const { data, error } = await this.supabase.db.from(kind).select('*').order('sort');
    if (error) return { rows: [], error: error.message };

    const rows = (data ?? []) as Row[];
    this.apply(kind, rows);
    return { rows, error: null };
  }

  private apply(kind: CatalogKind, rows: Row[]): void {
    if (kind === 'services') {
      this.services.set(rows.map((row) => ({
        slug: text(row, 'slug'),
        title: text(row, 'title'),
        summary: text(row, 'summary'),
        lead: text(row, 'lead'),
        points: list(row, 'points'),
      })));
    } else if (kind === 'destinations') {
      this.destinations.set(rows.map((row) => ({
        slug: text(row, 'slug'),
        name: text(row, 'name'),
        region: text(row, 'region'),
        summary: text(row, 'summary'),
        pathways: list(row, 'pathways'),
      })));
    } else if (kind === 'faqs') {
      this.faqs.set(rows.map((row) => ({ question: text(row, 'question'), answer: text(row, 'answer') })));
    } else if (kind === 'testimonials') {
      this.testimonials.set(rows.map((row) => ({
        quote: text(row, 'quote'),
        name: text(row, 'name'),
        detail: text(row, 'detail'),
      })));
    } else if (kind === 'offices') {
      this.offices.set(rows.map((row) => ({ name: text(row, 'name'), address: text(row, 'address') })));
    } else if (kind === 'phones') {
      this.phones.set(rows.map((row) => ({
        label: text(row, 'label'),
        href: text(row, 'href'),
        text: text(row, 'text'),
      })));
    } else {
      this.emails.set(rows.map((row) => ({
        label: text(row, 'label'),
        href: text(row, 'href'),
        text: text(row, 'text'),
      })));
    }
  }

  private toCatalog(kind: CatalogKind, row: Row): CatalogRow {
    const fields = SPECS[kind].map((field) => ({
      ...field,
      value: LIST_FIELDS.has(field.key) ? list(row, field.key).join('\n') : text(row, field.key),
    }));
    const key = SLUG_KINDS.has(kind) ? text(row, 'slug') : text(row, 'id');
    const labelKey = kind === 'testimonials' ? 'detail' : 'title';
    const label = fields.find((field) => field.key === labelKey)?.value
      || fields.find((field) => field.key === 'name' || field.key === 'question' || field.key === 'label')?.value
      || key;
    return { key, label, fields };
  }
}

function text(row: Row, key: string): string {
  const value = row[key];
  return typeof value === 'string' ? value : '';
}

function list(row: Row, key: string): string[] {
  const value = row[key];
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function lines(value: string): string[] {
  return value.split('\n').map((item) => item.trim()).filter(Boolean);
}
