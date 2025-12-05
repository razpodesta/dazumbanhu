import { Metadata } from 'next';
import { SEO_CONFIG } from './seo-config';

interface PageSEO {
  title: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Genera el objeto Metadata de Next.js asegurando estándares.
 */
export function constructMetadata({
  title,
  description = SEO_CONFIG.description,
  image = '/images/og-default.jpg',
  noIndex = false
}: PageSEO): Metadata {

  return {
    title: {
      default: title,
      template: `%s | ${SEO_CONFIG.siteName}`
    },
    description,
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    // CORRECCIÓN: Copiamos los arrays para hacerlos mutables (Readonly -> Mutable)
    keywords: [...SEO_CONFIG.keywords],
    authors: [...SEO_CONFIG.authors],
    creator: SEO_CONFIG.siteName,
    openGraph: {
      type: 'website',
      locale: SEO_CONFIG.locale,
      url: SEO_CONFIG.siteUrl,
      title,
      description,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: SEO_CONFIG.twitterHandle,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: './',
    },
  };
}
