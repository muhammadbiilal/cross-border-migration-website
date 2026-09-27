import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE } from '../../../core/data/site.data';
import { PageHero } from '../../../shared/page-hero/page-hero';

@Component({
  selector: 'app-terms',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHero, RouterLink],
  templateUrl: './terms.html',
  styleUrl: './terms.css',
})
export class Terms {
  protected readonly site = SITE;
}
