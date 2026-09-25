import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './logo.html',
  styleUrl: './logo.css',
})
export class Logo {
  /** Light mark for the dark footer. */
  readonly tone = input<'ink' | 'light'>('ink');
}
