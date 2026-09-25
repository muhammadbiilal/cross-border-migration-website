import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './page-hero.html',
  styleUrl: './page-hero.css',
})
export class PageHero {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly lede = input('');
}
