import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ContentService } from '../../../core/services/content.service';
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
  protected readonly services = inject(ContentService).services;
}
