import { Routes } from '@angular/router';

import { DESTINATIONS } from './core/data/destinations.data';
import { SERVICES } from './core/data/services.data';
import { PageSeo } from './core/services/seo.service';

export interface RouteSeoData {
  seo: PageSeo;
}

const brand = 'Cross Border Migration';

const serviceRoutes: Routes = SERVICES.map((service) => ({
  path: `services/${service.slug}`,
  loadComponent: () =>
    import('./features/services/service-detail/service-detail').then((m) => m.ServiceDetail),
  data: {
    slug: service.slug,
    seo: {
      title: `${service.title} | ${brand}`,
      description: service.summary,
    },
  } satisfies RouteSeoData & { slug: string },
}));

const destinationRoutes: Routes = DESTINATIONS.map((destination) => ({
  path: `destinations/${destination.slug}`,
  loadComponent: () =>
    import('./features/destinations/destination-detail/destination-detail').then(
      (m) => m.DestinationDetail,
    ),
  data: {
    slug: destination.slug,
    seo: {
      title: `${destination.name} | ${brand}`,
      description: destination.summary,
    },
  } satisfies RouteSeoData & { slug: string },
}));

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    data: {
      seo: {
        title: `${brand} | Work, study, and family visas`,
        description:
          'Cross Border Migration prepares work, study, family, residence, and visit visa files, with a written plan before you commit.',
      },
    } satisfies RouteSeoData,
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./features/services/service-list/service-list').then((m) => m.ServiceList),
    data: {
      seo: {
        title: `Services | ${brand}`,
        description:
          'Student, work, family, residency, visit, permanent residence, business, and skilled migration services.',
      },
    } satisfies RouteSeoData,
  },
  {
    path: 'destinations',
    loadComponent: () =>
      import('./features/destinations/destination-list/destination-list').then(
        (m) => m.DestinationList,
      ),
    data: {
      seo: {
        title: `Destinations | ${brand}`,
        description:
          'Visa guidance for Poland, Croatia, Serbia, Germany, Norway, Canada, Australia, the UK, the USA, and New Zealand.',
      },
    } satisfies RouteSeoData,
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then((m) => m.About),
    data: {
      seo: {
        title: `About | ${brand}`,
        description:
          'How Cross Border Migration works: one consultant, a written plan, and support through arrival.',
      },
    } satisfies RouteSeoData,
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
    data: {
      seo: {
        title: `Free assessment | ${brand}`,
        description: 'Tell us your goal and a consultant will reply about the routes that fit.',
      },
    } satisfies RouteSeoData,
  },
  {
    path: 'faq',
    loadComponent: () => import('./features/faq/faq').then((m) => m.Faq),
    data: {
      seo: {
        title: `FAQ | ${brand}`,
        description: 'Timing, documents, job offers, refusals, and taking over an existing visa file.',
      },
    } satisfies RouteSeoData,
  },
  {
    path: 'privacy',
    loadComponent: () => import('./features/legal/privacy/privacy').then((m) => m.Privacy),
    data: {
      seo: {
        title: `Privacy | ${brand}`,
        description: 'How Cross Border Migration uses the details you send in an assessment.',
        noindex: true,
      },
    } satisfies RouteSeoData,
  },
  {
    path: 'terms',
    loadComponent: () => import('./features/legal/terms/terms').then((m) => m.Terms),
    data: {
      seo: {
        title: `Terms | ${brand}`,
        description: 'Terms for using the Cross Border Migration website and assessment form.',
        noindex: true,
      },
    } satisfies RouteSeoData,
  },
  {
    path: 'login',
    loadComponent: () => import('./admin/login/login').then((m) => m.Login),
    data: {
      seo: {
        title: `Sign in | ${brand}`,
        description: 'Staff sign-in.',
        noindex: true,
      },
    } satisfies RouteSeoData,
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/inquiries/inquiries').then((m) => m.Inquiries),
    data: {
      seo: {
        title: `Inquiries | ${brand}`,
        description: 'Assessment requests.',
        noindex: true,
      },
    } satisfies RouteSeoData,
  },
  ...serviceRoutes,
  ...destinationRoutes,
  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
    data: {
      seo: {
        title: `Page not found | ${brand}`,
        description: 'That page is not on this site.',
        noindex: true,
      },
    } satisfies RouteSeoData,
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
    data: {
      seo: {
        title: `Page not found | ${brand}`,
        description: 'That page is not on this site.',
        noindex: true,
      },
    } satisfies RouteSeoData,
  },
];
