import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@mobile-store/shared-util-seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/private'], // Protegemos rutas futuras
    },
    sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
  };
}
