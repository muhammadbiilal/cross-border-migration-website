import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROCESS } from '../../core/data/content.data';
import { ContentService } from '../../core/services/content.service';
import { REASONS } from '../../core/data/site.data';
import { CountryCard } from '../../shared/country-card/country-card';
import { CtaBand } from '../../shared/cta-band/cta-band';
import { FaqList } from '../../shared/faq-list/faq-list';
import { RouteBoard } from '../../shared/route-board/route-board';
import { ServiceCard } from '../../shared/service-card/service-card';
import { TestimonialCard } from '../../shared/testimonial-card/testimonial-card';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ServiceCard, CountryCard, FaqList, CtaBand, TestimonialCard, RouteBoard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly content = inject(ContentService);

  protected readonly services = this.content.services;
  protected readonly destinations = this.content.destinations;
  protected readonly process = PROCESS;
  protected readonly reasons = REASONS;
  protected readonly faqs = this.content.faqs;
  protected readonly testimonials = this.content.testimonials;
}
