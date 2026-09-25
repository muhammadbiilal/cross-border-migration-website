import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PROCESS } from '../../core/data/content.data';
import { REASONS, SITE } from '../../core/data/site.data';
import { PageHero } from '../../shared/page-hero/page-hero';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHero],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly site = SITE;
  protected readonly reasons = REASONS;
  protected readonly process = PROCESS;
}
