//apps/store-frontend/next.config.js
//@ts-check
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  nx: {
    svgr: false,
  },

  // --- CONFIGURACIÓN DE ÉLITE PARA IA ---
  // Excluimos transformers del bundle para que funcione en Vercel Serverless
  serverExternalPackages: ['@xenova/transformers'],
  // ---------------------------------------
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);
