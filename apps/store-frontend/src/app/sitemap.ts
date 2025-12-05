import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@mobile-store/shared-util-seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONFIG.siteUrl;

  // Rutas estáticas principales
  const routes = [
    '',
    '/servicos',
    '/acessorios',
    '/contato',
    '/sobre',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
