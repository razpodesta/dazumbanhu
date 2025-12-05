//@ts-check
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // NOTA: Eliminamos 'output: standalone' para compatibilidad nativa con Vercel.
  // Si en el futuro usas Docker propio, puedes descomentarlo.
  // output: 'standalone',

  // Desactivar checks de TS en build (ya lo hace Nx en el paso previo)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Desactivar checks de ESLint en build (ya lo hace Nx)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Optimización de imágenes
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
    svgr: false,
  },
};

const plugins = [
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
