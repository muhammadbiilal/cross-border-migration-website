import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DESTINATIONS } from '../../../core/data/destinations.data';
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
  protected readonly destinations = DESTINATIONS;
}
