// libs/shared/util-content/src/schemas/header.schema.ts
import { z } from 'zod';

/**
 * @schema HeaderSchema
 * @description Contrato de datos para los textos estáticos del encabezado.
 * Define los textos de marca, accesibilidad y llamadas a la acción.
 */
export const headerSchema = z.object({
  // Identidad Visual
  brand_name: z.string().describe("Nombre visible de la marca (texto alternativo del logo)"),
  tagline: z.string().optional().describe("Eslogan corto que puede aparecer en versiones de escritorio"),

  // Accesibilidad (ARIA Labels)
  aria_open_menu: z.string().describe("Texto para lectores de pantalla: Abrir menú"),
  aria_close_menu: z.string().describe("Texto para lectores de pantalla: Cerrar menú"),
  aria_search: z.string().describe("Texto para lectores de pantalla: Botón buscar"),
  aria_cart: z.string().describe("Texto para lectores de pantalla: Botón carrito"),

  // Call to Actions (CTAs)
  cta_primary: z.string().describe("Texto del botón de acción principal (ej: Ofertas / Contacto)"),

  // Textos Específicos de Móvil
  mobile_menu_title: z.string().describe("Título del encabezado dentro del menú móvil"),
});

export type HeaderContent = z.infer<typeof headerSchema>;
