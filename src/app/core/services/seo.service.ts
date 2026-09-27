import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';
import { SITE } from '../data/site.data';

export interface PageSeo {
  title: string;
  description: string;
  noindex?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(seo: PageSeo, url: string): void {
    const path = url.split(/[?#]/)[0] || '/';
    const canonical = environment.siteUrl + (path === '/' ? '/' : path.replace(/\/$/, ''));
    const image = `${environment.siteUrl}/og.svg`;

    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ name: 'theme-color', content: '#397f81' });
    this.meta.updateTag({
      name: 'robots',
      content: seo.noindex ? 'noindex, follow' : 'index, follow',
    });

    const tags: [string, string][] = [
      ['og:type', 'website'],
      ['og:site_name', SITE.name],
      ['og:locale', 'en_US'],
      ['og:url', canonical],
      ['og:title', seo.title],
      ['og:description', seo.description],
      ['og:image', image],
    ];

    for (const [property, content] of tags) {
      this.meta.updateTag({ property, content });
    }

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(canonical);
    this.setJsonLd(seo, canonical);
  }

  private setCanonical(href: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = href;
  }

  private setJsonLd(seo: PageSeo, canonical: string): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: SITE.name,
      url: environment.siteUrl,
      description: seo.description,
      email: SITE.email,
      telephone: SITE.phone,
      image: `${environment.siteUrl}/og.svg`,
      mainEntityOfPage: canonical,
    };

    let script = this.document.head.querySelector<HTMLScriptElement>('#site-jsonld');
    if (!script) {
      script = this.document.createElement('script');
      script.id = 'site-jsonld';
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
