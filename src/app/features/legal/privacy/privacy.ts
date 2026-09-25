import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SITE } from '../../../core/data/site.data';
import { PageHero } from '../../../shared/page-hero/page-hero';

@Component({
  selector: 'app-privacy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHero],
  templateUrl: './privacy.html',
  styleUrl: './privacy.css',
})
export class Privacy {
  protected readonly site = SITE;
}
