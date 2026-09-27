import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Destination } from '../../core/data/destinations.data';

@Component({
  selector: 'app-route-board',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './route-board.html',
  styleUrl: './route-board.css',
})
export class RouteBoard {
  readonly destinations = input.required<Destination[]>();
}
