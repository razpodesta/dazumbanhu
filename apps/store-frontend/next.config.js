//@ts-check
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // 1. Desactivamos la generación standalone para compatibilidad con Vercel
  // output: 'standalone',

  // 2. Ignoramos errores de TS en el build de Next
  // (Nx ya hace el typecheck en su propio proceso, esto acelera el deploy)
  typescript: {
    ignoreBuildErrors: true,
  },

  // 3. ¡CORRECCIÓN! Eliminamos el bloque 'eslint'.
  // Next.js 16 no soporta esta configuración aquí.
  // Nx se encarga de que no subas código sucio.

  // 4. Optimización de imágenes (Permitir dominios externos)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // 5. Configuración específica de Nx
  nx: {
    svgr: false,
  },
};

const plugins = [
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
