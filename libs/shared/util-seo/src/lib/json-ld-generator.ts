import { SEO_CONFIG } from './seo-config';

/**
 * Genera el Schema.org para LocalBusiness/MobilePhoneStore.
 * Crucial para aparecer en Google Maps y búsquedas locales.
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobilePhoneStore',
    name: SEO_CONFIG.business.name,
    image: `${SEO_CONFIG.siteUrl}/icons/brand/logo.png`, // Asegúrate que este path exista
    '@id': SEO_CONFIG.siteUrl,
    url: SEO_CONFIG.siteUrl,
    telephone: SEO_CONFIG.business.telephone,
    priceRange: SEO_CONFIG.business.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_CONFIG.business.address.street,
      addressLocality: SEO_CONFIG.business.address.city,
      addressRegion: SEO_CONFIG.business.address.region,
      postalCode: SEO_CONFIG.business.address.postalCode,
      addressCountry: SEO_CONFIG.business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SEO_CONFIG.business.geo.latitude,
      longitude: SEO_CONFIG.business.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/dazumbanhu/',
    ],
  };
}
