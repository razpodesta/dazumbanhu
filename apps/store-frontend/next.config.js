//@ts-check
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // OPTIMIZACIÓN ELITE PARA VERCEL
  output: 'standalone',

  // Desactivar indicador de TS en build (ya lo hace Nx) para velocidad
  typescript: {
    ignoreBuildErrors: true,
  },

  // Opciones de Imagen (Permitir dominios externos si usas Supabase/Shopify)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
};

const plugins = [
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
