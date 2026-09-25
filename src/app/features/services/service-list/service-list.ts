import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SERVICES } from '../../../core/data/services.data';
import { PageHero } from '../../../shared/page-hero/page-hero';
import { ServiceCard } from '../../../shared/service-card/service-card';

@Component({
  selector: 'app-service-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHero, ServiceCard],
  templateUrl: './service-list.html',
  styleUrl: './service-list.css',
})
export class ServiceList {
  protected readonly services = SERVICES;
}
