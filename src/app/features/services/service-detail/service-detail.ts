import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ContentService } from '../../../core/services/content.service';
import { SeoService } from '../../../core/services/seo.service';
import { CtaBand } from '../../../shared/cta-band/cta-band';
import { EuropePermits } from '../../../shared/europe-permits/europe-permits';
import { PageHero } from '../../../shared/page-hero/page-hero';

@Component({
  selector: 'app-service-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageHero, CtaBand, EuropePermits],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.css',
})
export class ServiceDetail {
  private readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);

  readonly slug = input.required<string>();
  protected readonly loaded = this.content.loaded;
  protected readonly service = computed(() =>
    this.content.services().find((item) => item.slug === this.slug()),
  );

  constructor() {
    effect(() => {
      const item = this.service();
      if (!item) return;
      this.seo.update(
        { title: `${item.title} | Cross Border Migration`, description: item.summary },
        this.router.url,
      );
    });
  }
}
