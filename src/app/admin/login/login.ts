import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { SupabaseService } from '../../core/services/supabase.service';
import { Logo } from '../../shared/logo/logo';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, Logo],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly supabase = inject(SupabaseService);
  private readonly router = inject(Router);

  protected readonly configured = this.supabase.configured;
  protected readonly busy = signal(false);
  protected readonly error = signal('');

  protected readonly form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor() {
    if (this.supabase.signedIn()) void this.router.navigate(['/admin']);
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid || this.busy()) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy.set(true);
    this.error.set('');
    const { email, password } = this.form.getRawValue();
    const failure = await this.supabase.signIn(email.trim(), password);
    this.busy.set(false);

    if (failure) {
      this.error.set(failure);
      return;
    }

    await this.router.navigate(['/admin']);
  }
}
