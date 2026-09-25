import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-faq-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './faq-list.html',
  styleUrl: './faq-list.css',
})
export class FaqList {
  readonly items = input.required<readonly { question: string; answer: string }[]>();
}
