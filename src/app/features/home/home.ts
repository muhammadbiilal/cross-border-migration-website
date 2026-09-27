import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FAQS, PROCESS, TESTIMONIALS } from '../../core/data/content.data';
import { DESTINATIONS } from '../../core/data/destinations.data';
import { SERVICES } from '../../core/data/services.data';
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
  protected readonly services = SERVICES;
  protected readonly destinations = DESTINATIONS;
  protected readonly process = PROCESS;
  protected readonly reasons = REASONS;
  protected readonly faqs = FAQS;
  protected readonly testimonials = TESTIMONIALS;
}
