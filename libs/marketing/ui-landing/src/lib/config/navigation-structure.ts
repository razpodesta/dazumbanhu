//libs/marketing/ui-landing/src/lib/config/navigation-structure.ts
/**
 * @file navigation-structure.ts
 * @description Estructura de datos estática para el menú.
 * @compliance StrictTypeSafe (Compatible con exactOptionalPropertyTypes)
 */

import type { NavItemType } from '@mobile-store/shared-util-content';

// Nivel 3: Categorías (Nietos)
const electronicsChildren: NavItemType[] = [
  { labelKey: 'smartphones', href: '/categoria/smartphones', iconKey: 'smartphone' },
  { labelKey: 'laptops', href: '/categoria/laptops', iconKey: 'laptop' },
  { labelKey: 'accessories', href: '/categoria/accesorios', iconKey: 'headphones' },
  { labelKey: 'gaming', href: '/categoria/gaming', iconKey: 'gamepad-2' },
];

// Nivel 2: Soporte (Hijos)
const supportChildren: NavItemType[] = [
  { labelKey: 'track_order', href: '/pedidos/rastreo', iconKey: 'package-search' },
  { labelKey: 'returns', href: '/soporte/devoluciones', iconKey: 'refresh-ccw' },
  { isSeparator: true },
  { labelKey: 'whatsapp_support', href: 'https://wa.me/5548984771608', iconKey: 'message-circle' },
  { labelKey: 'help_center', href: '/soporte/centro-ayuda', iconKey: 'help-circle' },
];

// Nivel 2: Colecciones (Hijos)
const collectionsChildren: NavItemType[] = [
  { labelKey: 'new_arrivals', href: '/coleccion/nuevos', iconKey: 'sparkles' },
  { labelKey: 'best_sellers', href: '/coleccion/mas-vendidos', iconKey: 'trending-up' },
  { labelKey: 'deals', href: '/coleccion/ofertas', iconKey: 'tag' },
  { isSeparator: true },
  { labelKey: 'electronics_hub', iconKey: 'cpu', children: electronicsChildren, isNested: true },
];

// Nivel 1: Estructura Principal
export const mainNavStructure: NavItemType[] = [
  {
    labelKey: 'home',
    href: '/',
    iconKey: 'home'
  },
  {
    labelKey: 'catalog',
    iconKey: 'store',
    children: collectionsChildren,
    isNested: true
  },
  {
    labelKey: 'services',
    href: '/servicios',
    iconKey: 'wrench'
  },
  {
    labelKey: 'support',
    children: supportChildren,
    iconKey: 'life-buoy',
    isNested: true
  },
];

export const socialNavLinks = [
  { label: 'Instagram', href: 'https://instagram.com/dazumbanhu', iconKey: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com/dazumbanhu', iconKey: 'facebook' },
  { label: 'WhatsApp', href: 'https://wa.me/5548984771608', iconKey: 'message-circle' },
];
