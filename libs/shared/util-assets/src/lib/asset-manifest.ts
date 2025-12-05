/**
 * @fileoverview MANIFIESTO DE ACTIVOS (Single Source of Truth)
 * Centraliza las rutas de recursos multimedia para garantizar consistencia,
 * cacheo eficiente y optimización de motores de búsqueda (SEO).
 *
 * @architecture
 * Este archivo desacopla la lógica de los componentes de las rutas de archivos.
 * Si mañana cambiamos de almacenamiento local a un CDN (AWS S3/Cloudinary),
 * solo necesitamos actualizar este archivo, no toda la aplicación.
 */

// Ruta base para los activos locales.
// En producción, esto podría reemplazarse por una variable de entorno apuntando a un CDN.
const ASSET_BASE_PATH = '/images';

export const AssetManifest = {
  /**
   * Identidad Corporativa
   * Logotipos y favicon utilizados en el Header, Footer y Metadatos.
   */
  brand: {
    logo: '/icons/brand/logo-circular-recortado-oficial.png',
    favicon: '/icons/brand/favicon.ico',
    openGraph: '/images/og-social-share.jpg', // Imagen por defecto para compartir en WhatsApp
  },

  /**
   * Hero Section (Slider "Infinity Fade")
   * Estrategia de "Art Direction": Se requieren versiones específicas para
   * móvil (Portrait) y escritorio (Landscape) para evitar recortar
   * el sujeto principal de la foto y minimizar el peso de la descarga.
   */
  hero: {
    // Slide 01: Enfoque en Confianza y Expertise Técnico (Reparación)
    slide1: {
      mobile: `${ASSET_BASE_PATH}/hero/hero-01-repair-lab-microscope-mobile-1080x1920.jpg`,
      desktop: `${ASSET_BASE_PATH}/hero/hero-01-repair-lab-microscope-desktop-1920x1080.jpg`,
      alt: 'Técnico certificado realizando micro-soldadura en iPhone 15 Pro Max',
    },
    // Slide 02: Enfoque en Estilo de Vida y Moda (Fundas "Burga Style")
    slide2: {
      mobile: `${ASSET_BASE_PATH}/hero/hero-02-lifestyle-fashion-case-mobile-1080x1920.jpg`,
      desktop: `${ASSET_BASE_PATH}/hero/hero-02-lifestyle-fashion-case-desktop-1920x1080.jpg`,
      alt: 'Modelo utilizando funda premium Dázum Banhu colección mármol en cafetería',
    },
    // Slide 03: Enfoque en Alto Rendimiento (Gaming & Computing)
    slide3: {
      mobile: `${ASSET_BASE_PATH}/hero/hero-03-gaming-setup-rgb-mobile-1080x1920.jpg`,
      desktop: `${ASSET_BASE_PATH}/hero/hero-03-gaming-setup-rgb-desktop-1920x1080.jpg`,
      alt: 'Setup gamer de alto rendimiento con periféricos mecánicos y luces RGB',
    },
  },

  /**
   * Navegación Visual de Categorías (Círculos)
   * Imágenes cuadradas optimizadas para recortes circulares.
   * Usadas en el componente "QuickNav" debajo del Hero.
   */
  categories: {
    repair: `${ASSET_BASE_PATH}/categories/cat-repair-tools-circle.jpg`,
    cases: `${ASSET_BASE_PATH}/categories/cat-cases-fashion-circle.jpg`,
    audio: `${ASSET_BASE_PATH}/categories/cat-audio-headphones-circle.jpg`,
    mac: `${ASSET_BASE_PATH}/categories/cat-macbook-pro-circle.jpg`,
    chargers: `${ASSET_BASE_PATH}/categories/cat-chargers-power-circle.jpg`,
  },

  /**
   * Elementos de Interfaz de Usuario (UI)
   * Placeholders y avatares genéricos para estados de carga o error.
   */
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

/**
 * Hook para obtener el manifiesto de activos.
 * Preparado para soportar carga asíncrona de configuración remota en el futuro.
 *
 * @returns {typeof AssetManifest} El objeto completo de activos tipado.
 */
export const useAssetManifest = () => {
  return AssetManifest;
};
