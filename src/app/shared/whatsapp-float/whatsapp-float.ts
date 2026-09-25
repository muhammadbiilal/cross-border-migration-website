import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SITE } from '../../core/data/site.data';

@Component({
  selector: 'app-whatsapp-float',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './whatsapp-float.html',
  styleUrl: './whatsapp-float.css',
})
export class WhatsappFloat {
  protected readonly site = SITE;
}
