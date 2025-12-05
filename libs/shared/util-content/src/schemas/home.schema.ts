import { z } from 'zod';

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

const categoryCircleSchema = z.object({
  label: z.string(),
  href: z.string(),
  imageKey: z.string(), // Clave de AssetManifest.categories
});

export const homePageSchema = z.object({
  hero: z.object({
    slides: z.array(heroSlideSchema),
    autoPlayInterval: z.number().default(3000),
  }),
  categories: z.object({
    title: z.string(),
    items: z.array(categoryCircleSchema),
  }),
});

export type HomePageContent = z.infer<typeof homePageSchema>;
