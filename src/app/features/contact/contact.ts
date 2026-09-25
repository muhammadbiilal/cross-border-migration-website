import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { DESTINATIONS } from '../../core/data/destinations.data';
import { SERVICES } from '../../core/data/services.data';
import { SITE } from '../../core/data/site.data';
import { InquiriesService } from '../../core/services/inquiries.service';
import { SupabaseService } from '../../core/services/supabase.service';
import { PageHero } from '../../shared/page-hero/page-hero';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, PageHero],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly inquiries = inject(InquiriesService);
  private readonly supabase = inject(SupabaseService);

  protected readonly site = SITE;
  protected readonly services = SERVICES;
  protected readonly destinations = DESTINATIONS;
  protected readonly configured = this.supabase.configured;
  protected readonly status = signal<Status>('idle');
  protected readonly error = signal('');
  private readonly revision = signal(0);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    phone: ['', [Validators.required, Validators.maxLength(40)]],
    service: ['', Validators.required],
    destination: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(4000)]],
  });

  constructor() {
    this.form.events.pipe(takeUntilDestroyed()).subscribe(() => {
      this.revision.update((value) => value + 1);
    });
  }

  protected showError(field: keyof typeof this.form.controls): boolean {
    this.revision();
    const control = this.form.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  protected async submit(): Promise<void> {
    this.form.markAllAsTouched();
    this.revision.update((value) => value + 1);
    if (this.form.invalid || this.status() === 'sending') return;

    if (!this.configured) {
      this.status.set('failed');
      this.error.set(`The form is not connected yet. Email ${this.site.email} instead.`);
      return;
    }

    this.status.set('sending');
    this.error.set('');
    const failure = await this.inquiries.create(this.form.getRawValue());
    if (failure) {
      this.status.set('failed');
      this.error.set(failure);
      return;
    }

    this.status.set('sent');
    this.form.reset();
  }
}
