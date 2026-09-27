import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ContentService } from '../../../core/services/content.service';
import { CountryCard } from '../../../shared/country-card/country-card';
import { PageHero } from '../../../shared/page-hero/page-hero';

@Component({
  selector: 'app-destination-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHero, CountryCard],
  templateUrl: './destination-list.html',
  styleUrl: './destination-list.css',
})
export class DestinationList {
  protected readonly destinations = inject(ContentService).destinations;
}
