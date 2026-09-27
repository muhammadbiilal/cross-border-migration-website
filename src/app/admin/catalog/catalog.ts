import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CatalogField, CatalogKind, CatalogRow, ContentService } from '../../core/services/content.service';

const TITLES: Record<CatalogKind, string> = {
  services: 'Services',
  destinations: 'Destinations',
  faqs: 'FAQs',
  testimonials: 'Testimonials',
  offices: 'Offices',
  phones: 'Phones',
  emails: 'Emails',
};

@Component({
  selector: 'app-catalog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog {
  private readonly content = inject(ContentService);

  readonly kind = input.required<CatalogKind>();
  readonly standalone = input(true);

  protected readonly rows = signal<CatalogRow[]>([]);
  protected readonly draft = signal<CatalogField[] | null>(null);
  protected readonly activeKey = signal<string | null>(null);
  protected readonly creating = signal(false);
  protected readonly error = signal('');
  protected readonly saved = signal(false);
  protected readonly heading = computed(() => TITLES[this.kind()]);
  protected readonly page = computed(() => {
    const kind = this.kind();
    if (kind !== 'services' && kind !== 'destinations') return '';
    const slug = this.draft()?.find((field) => field.key === 'slug')?.value.trim() ?? '';
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return '';
    return `/${kind}/${slug}`;
  });

  constructor() {
    effect(() => {
      const kind = this.kind();
      void this.load(kind);
    });
  }

  protected create(): void {
    this.creating.set(true);
    this.activeKey.set(null);
    this.draft.set(this.content.blank(this.kind()).fields);
    this.saved.set(false);
    this.error.set('');
  }

  protected choose(row: CatalogRow): void {
    this.creating.set(false);
    this.activeKey.set(row.key);
    this.draft.set(row.fields.map((field) => ({ ...field })));
    this.saved.set(false);
    this.error.set('');
  }

  protected setField(key: string, value: string): void {
    this.draft.update((fields) => fields?.map((field) => (field.key === key ? { ...field, value } : field)) ?? null);
    this.saved.set(false);
  }

  protected async save(): Promise<void> {
    const fields = this.draft();
    if (!fields) return;

    const previous = this.creating() ? null : this.activeKey();
    const index = this.rows().findIndex((row) => row.key === previous);
    const sort = previous ? Math.max(0, index) : this.rows().length;
    const failure = await this.content.save(this.kind(), fields, previous, sort);
    if (failure) {
      this.error.set(failure);
      this.saved.set(false);
      return;
    }

    const slug = fields.find((field) => field.key === 'slug')?.value.trim();
    await this.load(this.kind());
    const next = this.rows().find((row) => row.key === (slug || previous)) ?? this.rows().at(-1);
    if (next) this.choose(next);
    this.saved.set(true);
  }

  protected async remove(): Promise<void> {
    const key = this.activeKey();
    if (!key || !globalThis.confirm('Delete this row?')) return;
    const failure = await this.content.remove(this.kind(), key);
    if (failure) {
      this.error.set(failure);
      return;
    }
    this.draft.set(null);
    await this.load(this.kind());
  }

  private async load(kind: CatalogKind): Promise<void> {
    const { rows, error } = await this.content.list(kind);
    if (this.kind() !== kind) return;
    this.rows.set(rows);
    this.error.set(error ?? '');
  }
}
