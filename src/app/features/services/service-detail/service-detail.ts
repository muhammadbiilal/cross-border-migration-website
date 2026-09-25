import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { serviceBySlug } from '../../../core/data/services.data';
import { CtaBand } from '../../../shared/cta-band/cta-band';
import { PageHero } from '../../../shared/page-hero/page-hero';

@Component({
  selector: 'app-service-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageHero, CtaBand],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.css',
})
export class ServiceDetail {
  readonly slug = input.required<string>();
  protected readonly service = computed(() => serviceBySlug(this.slug()));
}
