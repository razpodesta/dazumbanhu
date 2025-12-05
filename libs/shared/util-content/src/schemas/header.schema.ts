//libs/shared/util-content/src/schemas/header.schema.ts
import { z } from 'zod';

/**
 * @schema HeaderSchema
 * @description Contrato de datos para los textos estáticos del encabezado completo (TopBar + Navbar).
 * @version 2.5 - Dual Layer Support
 */
export const headerSchema = z.object({
  // Identidad Visual
  brand_name: z.string().describe("Nombre visible de la marca"),
  tagline: z.string().optional().describe("Eslogan corto"),

  // Accesibilidad (ARIA Labels)
  aria_open_menu: z.string(),
  aria_close_menu: z.string(),
  aria_search: z.string(),
  aria_cart: z.string(),

  // TopBar: News Ticker & Search
  ticker_messages: z.array(z.string()).describe("Lista de mensajes rotativos para la barra superior"),
  search_placeholder: z.string().default("Buscar produtos..."),
  search_loading: z.string().default("Buscando..."),
  search_no_results: z.string().default("Nenhum produto encontrado."),

  // Call to Actions (CTAs)
  cta_primary: z.string(),

  // Móvil
  mobile_menu_title: z.string(),
});

export type HeaderContent = z.infer<typeof headerSchema>;
