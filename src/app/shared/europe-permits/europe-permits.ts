import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EUROPE_FEATURED, EUROPE_OTHER } from '../../core/data/europe.data';

@Component({
  selector: 'app-europe-permits',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './europe-permits.html',
  styleUrl: './europe-permits.css',
})
export class EuropePermits {
  readonly link = input(true);

  protected readonly featured = EUROPE_FEATURED;
  protected readonly other = EUROPE_OTHER;
}
