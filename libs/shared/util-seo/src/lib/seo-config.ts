/**
 * Configuración maestra de SEO.
 * Define la identidad digital del negocio.
 */
export const SEO_CONFIG = {
  siteName: 'Dázum Banhu Celulares',
  // Fallback seguro si la variable de entorno no está definida en build time
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://dazumbanhu.com.br',
  description: 'Assistência Técnica Especializada em Florianópolis. Conserto de iPhone em 15 min, Acessórios Premium e a garantia #1 da Trindade.',
  twitterHandle: '@dazumbanhu',
  locale: 'pt-BR',
  themeColor: '#00C2CB',
  keywords: [
    'Conserto de Celular Florianópolis',
    'Assistência Técnica iPhone Trindade',
    'Troca de Tela Samsung',
    'Acessórios Celular UFSC',
    'Bateria iPhone Original',
    'Dázum Banhu'
  ],
  authors: [{ name: 'Dázum Banhu Team', url: 'https://dazumbanhu.com.br' }],
  business: {
    name: 'Dázum Banhu Celulares',
    telephone: '+5548984771608',
    email: 'contato@dazumbanhu.com.br',
    address: {
      street: 'R. Lauro Linhares, 2123 - Loja 10',
      city: 'Florianópolis',
      region: 'SC',
      postalCode: '88036-003',
      country: 'BR'
    },
    geo: {
      latitude: '-27.584',
      longitude: '-48.518'
    },
    openingHours: ['Mo-Fr 08:00-20:30', 'Sa 09:00-17:00'],
    priceRange: '$$'
  }
} as const;
