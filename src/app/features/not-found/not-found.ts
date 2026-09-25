import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PageHero } from '../../shared/page-hero/page-hero';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageHero],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}
