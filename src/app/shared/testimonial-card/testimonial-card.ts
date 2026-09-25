import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-testimonial-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './testimonial-card.html',
  styleUrl: './testimonial-card.css',
})
export class TestimonialCard {
  readonly quote = input.required<string>();
  readonly name = input.required<string>();
  readonly detail = input.required<string>();
}
