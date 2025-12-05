//libs/marketing/ui-landing/src/lib/components/icon-registry.tsx
/**
 * @file icon-registry.tsx
 * @description Registro centralizado de iconos para el sistema de navegación.
 * Mapea claves de texto (string) a componentes React (Lucide).
 * @pattern Factory/Registry
 */

import {
  Home,
  Store,
  Wrench,
  LifeBuoy,
  Smartphone,
  Laptop,
  Headphones,
  Gamepad2,
  PackageSearch,
  RefreshCcw,
  MessageCircle,
  HelpCircle,
  Sparkles,
  TrendingUp,
  Tag,
  Cpu,
  Instagram,
  Facebook,
  ChevronRight,
  ShoppingBag,
  Search,
  Menu,
  X,
  LucideIcon
} from 'lucide-react';

// Mapa estricto de iconos disponibles para el sistema de navegación
const ICON_MAP: Record<string, LucideIcon> = {
  // Navegación Principal
  'home': Home,
  'store': Store,
  'wrench': Wrench,
  'life-buoy': LifeBuoy,

  // Categorías (Electronics)
  'smartphone': Smartphone,
  'laptop': Laptop,
  'headphones': Headphones,
  'gamepad-2': Gamepad2,

  // Soporte
  'package-search': PackageSearch,
  'refresh-ccw': RefreshCcw,
  'message-circle': MessageCircle,
  'help-circle': HelpCircle,

  // Colecciones
  'sparkles': Sparkles,
  'trending-up': TrendingUp,
  'tag': Tag,
  'cpu': Cpu,

  // Social & UI
  'instagram': Instagram,
  'facebook': Facebook,
  'chevron-right': ChevronRight,
  'shopping-bag': ShoppingBag,
  'search': Search,
  'menu': Menu,
  'x': X
};

/**
 * Recupera un componente de icono basado en su clave de texto.
 * Implementa un fallback seguro si la clave no existe.
 *
 * @param key Identificador del icono (ej: 'smartphones')
 * @returns Componente LucideIcon
 */
export function getIconByKey(key: string | undefined): LucideIcon {
  if (!key) return Sparkles; // Fallback visual genérico
  return ICON_MAP[key] || Sparkles;
}
