import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { destinationBySlug } from '../../../core/data/destinations.data';
import { CtaBand } from '../../../shared/cta-band/cta-band';
import { PageHero } from '../../../shared/page-hero/page-hero';

@Component({
  selector: 'app-destination-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageHero, CtaBand],
  templateUrl: './destination-detail.html',
  styleUrl: './destination-detail.css',
})
export class DestinationDetail {
  readonly slug = input.required<string>();
  protected readonly destination = computed(() => destinationBySlug(this.slug()));
}
