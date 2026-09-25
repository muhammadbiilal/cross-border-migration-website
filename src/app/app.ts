import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

import { RouteSeoData } from './app.routes';
import { SeoService } from './core/services/seo.service';
import { Footer } from './shared/footer/footer';
import { Header } from './shared/header/header';
import { WhatsappFloat } from './shared/whatsapp-float/whatsapp-float';

const CHROMELESS = /^\/(login|admin)\b/;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, WhatsappFloat],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  private readonly url = signal(this.router.url);
  protected readonly chrome = computed(() => !CHROMELESS.test(this.url()));

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map((event) => {
          let route = this.route;
          while (route.firstChild) route = route.firstChild;
          return { url: event.urlAfterRedirects, data: route.snapshot.data as Partial<RouteSeoData> };
        }),
        takeUntilDestroyed(),
      )
      .subscribe(({ url, data }) => {
        this.url.set(url);
        if (data.seo) this.seo.update(data.seo, url);
      });
  }
}
