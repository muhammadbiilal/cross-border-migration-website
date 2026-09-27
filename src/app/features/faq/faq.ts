import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ContentService } from '../../core/services/content.service';
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
  protected readonly faqs = inject(ContentService).faqs;
}
