import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ContentService } from '../../../core/services/content.service';
import { SeoService } from '../../../core/services/seo.service';
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
  private readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);

  readonly slug = input.required<string>();
  protected readonly loaded = this.content.loaded;
  protected readonly destination = computed(() =>
    this.content.destinations().find((item) => item.slug === this.slug()),
  );

  constructor() {
    effect(() => {
      const item = this.destination();
      if (!item) return;
      this.seo.update(
        { title: `${item.name} | Cross Border Migration`, description: item.summary },
        this.router.url,
      );
    });
  }
}
