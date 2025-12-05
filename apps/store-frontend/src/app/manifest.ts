import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@mobile-store/shared-util-seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SEO_CONFIG.siteName,
    short_name: 'Dázum Banhu',
    description: SEO_CONFIG.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: SEO_CONFIG.themeColor,
    icons: [
      {
        src: '/icons/brand/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      // Aquí idealmente agregarías iconos de 192x192 y 512x512 png
    ],
  };
}
