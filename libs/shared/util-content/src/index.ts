//libs/shared/util-content/src/index.ts
/**
 * @file index.ts
 * @description Punto de entrada principal para la librería de contenido.
 * Gestiona la exportación de esquemas Zod y tipos TypeScript.
 * @architecture Barrel Pattern con resolución de conflictos de nombres.
 */

// 1. Diccionario Generado (Runtime Data)
export * from './generated/dictionary';

// 2. Esquemas de Dominio (Zod Schemas)
export * from './schemas/manifesto.schema';
export * from './schemas/footer.schema';
export * from './schemas/home.schema';
export * from './schemas/header.schema';

// 3. Sistema de Navegación Nuevo (Elite Architecture)
// Este archivo posee ahora la definición canónica de 'navItemSchema'
export * from './schemas/nav-links.schema';

// 4. Sistema de Navegación Legacy (Resolución de Conflictos TS2308)
// Exportamos explícitamente los miembros para evitar colisión de 'navItemSchema'.
// Renombramos 'navItemSchema' a 'legacyNavItemSchema' para mantener retrocompatibilidad.
export {
  navbarSchema,
  type NavbarContent,
  navItemSchema as legacyNavItemSchema
} from './schemas/navbar.schema';
