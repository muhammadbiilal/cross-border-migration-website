import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SITE } from '../../../core/data/site.data';
import { PageHero } from '../../../shared/page-hero/page-hero';

@Component({
  selector: 'app-privacy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHero, RouterLink],
  templateUrl: './privacy.html',
  styleUrl: './privacy.css',
})
export class Privacy {
  protected readonly site = SITE;
}
