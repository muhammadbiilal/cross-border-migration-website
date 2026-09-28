import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROCESS } from '../../core/data/content.data';
import { ContentService } from '../../core/services/content.service';
import { CountryCard } from '../../shared/country-card/country-card';
import { CtaBand } from '../../shared/cta-band/cta-band';
import { EuropePermits } from '../../shared/europe-permits/europe-permits';
import { FaqList } from '../../shared/faq-list/faq-list';
import { RouteBoard } from '../../shared/route-board/route-board';
import { ServiceCard } from '../../shared/service-card/service-card';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ServiceCard, CountryCard, FaqList, CtaBand, RouteBoard, EuropePermits],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly content = inject(ContentService);

  protected readonly services = this.content.services;
  protected readonly destinations = this.content.destinations;
  protected readonly featured = computed(() => this.destinations().slice(0, 6));
  protected readonly process = PROCESS;
  protected readonly faqs = this.content.faqs;
}
