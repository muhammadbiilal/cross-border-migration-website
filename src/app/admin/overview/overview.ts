import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { InquiriesService } from '../../core/services/inquiries.service';

@Component({
  selector: 'app-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {
  private readonly inquiries = inject(InquiriesService);

  protected readonly total = signal(0);
  protected readonly error = signal('');
  protected readonly fresh = computed(() => this.newCount());
  private readonly newCount = signal(0);

  constructor() {
    void this.load();
  }

  private async load(): Promise<void> {
    const { rows, error } = await this.inquiries.list();
    this.total.set(rows.length);
    this.newCount.set(rows.filter((row) => row.status === 'new').length);
    this.error.set(error ?? '');
  }
}
