//libs/shared/util-assets/src/lib/asset-manifest.ts
/**
 * @fileoverview MANIFIESTO DE ACTIVOS (Single Source of Truth)
 * @version 2.0 - Fully Typed
 */

const ASSET_BASE_PATH = '/images';

export const AssetManifest = {
  brand: {
    logo: '/icons/brand/logo-circular-recortado-oficial.png',
    favicon: '/icons/brand/favicon.ico',
    openGraph: '/images/og-social-share.jpg',
  },
  hero: {
    slide1: {
      mobile: `${ASSET_BASE_PATH}/hero/hero-01-repair-lab-microscope-mobile-1080x1920.jpg`,
      desktop: `${ASSET_BASE_PATH}/hero/hero-01-repair-lab-microscope-desktop-1920x1080.jpg`,
      alt: 'Técnico certificado realizando micro-soldadura en iPhone 15 Pro Max',
    },
    slide2: {
      mobile: `${ASSET_BASE_PATH}/hero/hero-02-lifestyle-fashion-case-mobile-1080x1920.jpg`,
      desktop: `${ASSET_BASE_PATH}/hero/hero-02-lifestyle-fashion-case-desktop-1920x1080.jpg`,
      alt: 'Modelo utilizando funda premium Dázum Banhu colección mármol en cafetería',
    },
    slide3: {
      mobile: `${ASSET_BASE_PATH}/hero/hero-03-gaming-setup-rgb-mobile-1080x1920.jpg`,
      desktop: `${ASSET_BASE_PATH}/hero/hero-03-gaming-setup-rgb-desktop-1920x1080.jpg`,
      alt: 'Setup gamer de alto rendimiento con periféricos mecánicos y luces RGB',
    },
  },
  categories: {
    repair: `${ASSET_BASE_PATH}/categories/cat-repair-tools-circle.jpg`,
    cases: `${ASSET_BASE_PATH}/categories/cat-cases-fashion-circle.jpg`,
    audio: `${ASSET_BASE_PATH}/categories/cat-audio-headphones-circle.jpg`,
    mac: `${ASSET_BASE_PATH}/categories/cat-macbook-pro-circle.jpg`,
    chargers: `${ASSET_BASE_PATH}/categories/cat-chargers-power-circle.jpg`,
  },
  ui: {
    placeholders: {
      product: `${ASSET_BASE_PATH}/ui/placeholder-product-gray-400x400.jpg`,
      avatar: `${ASSET_BASE_PATH}/ui/avatar-neutral-user.jpg`,
      banner: `${ASSET_BASE_PATH}/ui/placeholder-banner-wide.jpg`,
    },
    banners: {
      promotion: `${ASSET_BASE_PATH}/banners/promo-black-friday.jpg`,
    }
  },
} as const;

// Tipos inferidos para uso seguro en componentes
export type AssetManifestType = typeof AssetManifest;
export type HeroAssetKeys = keyof typeof AssetManifest.hero;
export type CategoryAssetKeys = keyof typeof AssetManifest.categories;

export const useAssetManifest = () => AssetManifest;
