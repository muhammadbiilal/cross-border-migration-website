import { Injectable, inject } from '@angular/core';

import { SupabaseService } from './supabase.service';

export interface InquiryInput {
  name: string;
  email: string;
  phone: string;
  service: string;
  destination: string;
  message: string;
}

export interface Inquiry extends InquiryInput {
  id: string;
  created_at: string;
  status: 'new' | 'contacted' | 'closed';
  note: string;
}

@Injectable({ providedIn: 'root' })
export class InquiriesService {
  private readonly supabase = inject(SupabaseService);

  async create(input: InquiryInput): Promise<string | null> {
    const { error } = await this.supabase.db.from('inquiries').insert(input);
    return error?.message ?? null;
  }

  async list(): Promise<{ rows: Inquiry[]; error: string | null }> {
    const { data, error } = await this.supabase.db
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    return { rows: (data ?? []) as Inquiry[], error: error?.message ?? null };
  }

  async update(id: string, status: Inquiry['status'], note: string): Promise<string | null> {
    const { error } = await this.supabase.db.from('inquiries').update({ status, note }).eq('id', id);
    return error?.message ?? null;
  }
}
