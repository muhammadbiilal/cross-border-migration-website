import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FAQS } from '../../core/data/content.data';
import { FaqList } from '../../shared/faq-list/faq-list';
import { PageHero } from '../../shared/page-hero/page-hero';

@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHero, FaqList],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  protected readonly faqs = FAQS;
}
