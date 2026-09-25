import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { InquiriesService, Inquiry } from '../../core/services/inquiries.service';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'app-inquiries',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, FormsModule],
  templateUrl: './inquiries.html',
  styleUrl: './inquiries.css',
})
export class Inquiries {
  private readonly supabase = inject(SupabaseService);
  private readonly inquiries = inject(InquiriesService);
  private readonly router = inject(Router);

  protected readonly rows = signal<Inquiry[]>([]);
  protected readonly selected = signal<Inquiry | null>(null);
  protected readonly error = signal('');
  protected readonly saved = signal(false);
  protected status: Inquiry['status'] = 'new';
  protected note = '';

  constructor() {
    void this.open();
  }

  protected async open(): Promise<void> {
    if (!this.supabase.configured) {
      await this.router.navigate(['/login']);
      return;
    }

    const wait = () =>
      new Promise<void>((resolve) => {
        if (this.supabase.ready()) {
          resolve();
          return;
        }
        const timer = setInterval(() => {
          if (this.supabase.ready()) {
            clearInterval(timer);
            resolve();
          }
        }, 50);
      });

    await wait();
    if (!this.supabase.signedIn()) {
      await this.router.navigate(['/login']);
      return;
    }

    const { rows, error } = await this.inquiries.list();
    this.rows.set(rows);
    this.error.set(error ?? '');
  }

  protected choose(row: Inquiry): void {
    this.selected.set(row);
    this.status = row.status;
    this.note = row.note;
    this.saved.set(false);
  }

  protected async save(): Promise<void> {
    const row = this.selected();
    if (!row) return;

    const failure = await this.inquiries.update(row.id, this.status, this.note);
    if (failure) {
      this.error.set(failure);
      return;
    }

    const next = { ...row, status: this.status, note: this.note };
    this.rows.update((rows) => rows.map((item) => (item.id === row.id ? next : item)));
    this.selected.set(next);
    this.saved.set(true);
  }

  protected async signOut(): Promise<void> {
    await this.supabase.signOut();
    await this.router.navigate(['/login']);
  }
}
