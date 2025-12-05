/**
 * @file link-helpers.ts
 * @description Utilidades puras para la manipulación de URLs y rutas localizadas.
 * @standard ELITE - FUNCTIONAL PURITY
 */

// Definimos un tipo genérico para el locale, asumiendo string por defecto
// para desacoplarlo de la configuración específica de i18n en este nivel de utilidad.
type Locale = string;

/**
 * Normaliza y localiza una ruta (href).
 * Maneja anclas, enlaces externos y rutas relativas.
 *
 * @param href La ruta destino (ej: '/productos', '#features', 'https://google.com')
 * @param currentLang El idioma actual del usuario.
 * @returns La ruta absoluta y localizada lista para el componente Link.
 */
export function getLocalizedHref(href: string | undefined, currentLang: Locale): string {
  if (!href) return '#';

  // 1. Enlaces externos o anclas vacías: retorno directo ("Escape Hatch")
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href === '#') {
    return href;
  }

  // 2. Si la ruta ya tiene el prefijo de idioma, no lo duplicamos (Idempotencia)
  if (href.startsWith(`/${currentLang}`)) {
    return href;
  }

  // 3. Normalización: Asegurar slash inicial
  const cleanHref = href.startsWith('/') ? href : `/${href}`;

  // 4. Construcción canónica
  // Eliminamos trailing slashes para consistencia SEO
  return `/${currentLang}${cleanHref}`.replace(/\/$/, '');
}
