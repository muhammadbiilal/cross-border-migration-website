import { RenderMode, ServerRoute } from '@angular/ssr';

import { DESTINATIONS } from './core/data/destinations.data';
import { SERVICES } from './core/data/services.data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'login',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'services/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SERVICES.map((service) => ({ slug: service.slug }));
    },
  },
  {
    path: 'destinations/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return DESTINATIONS.map((destination) => ({ slug: destination.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
