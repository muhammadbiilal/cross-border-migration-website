import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'app-admin-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class AdminShell {
  private readonly supabase = inject(SupabaseService);
  private readonly router = inject(Router);

  protected readonly open = signal(false);
  protected readonly links = [
    { path: '/admin', label: 'Overview', exact: true },
    { path: '/admin/inquiries', label: 'Inquiries', exact: false },
    { path: '/admin/services', label: 'Services', exact: false },
    { path: '/admin/destinations', label: 'Destinations', exact: false },
    { path: '/admin/faqs', label: 'FAQs', exact: false },
    { path: '/admin/testimonials', label: 'Testimonials', exact: false },
    { path: '/admin/contact', label: 'Contact', exact: false },
  ];

  constructor() {
    void this.guard();
  }

  protected async signOut(): Promise<void> {
    await this.supabase.signOut();
    await this.router.navigate(['/login']);
  }

  private async guard(): Promise<void> {
    if (!this.supabase.configured) {
      await this.router.navigate(['/login']);
      return;
    }

    await new Promise<void>((resolve) => {
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

    if (!this.supabase.signedIn()) {
      await this.router.navigate(['/login']);
      return;
    }

    this.open.set(true);
  }
}
