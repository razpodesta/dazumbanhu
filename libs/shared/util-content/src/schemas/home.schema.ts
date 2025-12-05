import { z } from 'zod';

/**
 * Schema para los Slides del Hero
 */
const heroSlideSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  cta: z.object({
    label: z.string(),
    href: z.string(),
  }),
  imageKey: z.enum(['slide1', 'slide2', 'slide3']).describe("Clave del AssetManifest"),
  theme: z.enum(['dark', 'light']).describe("Para ajustar color de texto sobre la foto"),
});

/**
 * Schema para los Círculos de Navegación
 */
const categoryCircleSchema = z.object({
  label: z.string(),
  href: z.string(),
  imageKey: z.string(), // Clave de AssetManifest.categories
});

/**
 * Schema para el Grid de Servicios (Bento Box)
 * Definimos un enum estricto para los iconos disponibles.
 */
const serviceItemSchema = z.object({
  iconKey: z.enum(['timer', 'truck', 'shield', 'wrench']).describe("Identificador para mapear el icono Lucide correspondiente"),
  title: z.string(),
  description: z.string(),
});

/**
 * Schema Maestro de la Home Page
 */
export const homePageSchema = z.object({
  hero: z.object({
    slides: z.array(heroSlideSchema),
    autoPlayInterval: z.number().default(3000),
  }),
  categories: z.object({
    title: z.string(),
    items: z.array(categoryCircleSchema),
  }),
  services: z.object({
    titlePrefix: z.string().describe("Primera parte del título (texto normal)"),
    titleHighlight: z.string().describe("Segunda parte del título (color destacado)"),
    items: z.array(serviceItemSchema).length(4).describe("Debe tener exactamente 4 items para el grid"),
  }),
});

export type HomePageContent = z.infer<typeof homePageSchema>;
