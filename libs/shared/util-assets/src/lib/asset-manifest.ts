/**
 * @fileoverview MANIFIESTO DE ACTIVOS (Single Source of Truth)
 * Centraliza las rutas para garantizar SEO, cacheo y carga óptima.
 */

// Base path local. A futuro, cambiar esto por la URL de tu CDN/S3.
const ASSET_BASE = '/images';

export const AssetManifest = {
  brand: {
    logo: '/icons/brand/logo-circular-recortado-oficial.png',
    favicon: '/icons/brand/favicon.ico',
  },
  hero: {
    // Mobile First: Definimos explícitamente las variantes para <picture> o CSS
    homeMain: {
      mobile: `${ASSET_BASE}/hero/hero-01-iphone-15-titanium-mobile-1080x1920.jpg`,
      desktop: `${ASSET_BASE}/hero/hero-01-iphone-15-titanium-desktop-1920x1080.jpg`,
      alt: 'iPhone 15 Pro Titanium - Loja Oficial Florianópolis',
      widthMobile: 1080,
      heightMobile: 1920,
      widthDesktop: 1920,
      heightDesktop: 1080
    }
  },
  ui: {
    placeholders: {
      product: `${ASSET_BASE}/ui/placeholder-product-400x400.jpg`,
      avatar: `${ASSET_BASE}/ui/avatar-neutral.jpg`
    }
  }
} as const;

/**
 * Hook para obtener assets (Preparado para futuro CMS asíncrono)
 */
export const useAssetManifest = () => {
  return AssetManifest;
};
