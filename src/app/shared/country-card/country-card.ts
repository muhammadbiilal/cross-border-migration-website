import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Destination } from '../../core/data/destinations.data';

@Component({
  selector: 'app-country-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './country-card.html',
  styleUrl: './country-card.css',
})
export class CountryCard {
  readonly destination = input.required<Destination>();
}
