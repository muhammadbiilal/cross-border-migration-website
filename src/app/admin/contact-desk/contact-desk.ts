import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Catalog } from '../catalog/catalog';

@Component({
  selector: 'app-contact-desk',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Catalog],
  templateUrl: './contact-desk.html',
  styleUrl: './contact-desk.css',
})
export class ContactDesk {}
