//libs/shared/util-search/src/lib/types.ts
import { z } from 'zod';

/**
 * @schema SearchFiltersSchema
 * @description Define los parámetros permitidos para filtrar productos.
 * Incluye validación de tipos para precios y paginación.
 */
export const searchFiltersSchema = z.object({
  query: z.string().optional().describe("Texto de búsqueda del usuario"),
  brand: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
});

/**
 * @schema ProductResultSchema
 * @description Estructura de datos simplificada para resultados de búsqueda.
 * Optimizada para renderizado rápido en tarjetas de producto.
 */
export const productResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  price: z.number(),
  image_url: z.string().optional(),
  brand: z.string(),
  category: z.string(),
  similarity: z.number().optional().describe("Puntaje de relevancia (0-1)"),
});

export type SearchFilters = z.infer<typeof searchFiltersSchema>;
export type ProductResult = z.infer<typeof productResultSchema>;
