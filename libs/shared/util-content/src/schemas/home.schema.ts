//libs/shared/util-content/src/schemas/home.schema.ts
import { z } from 'zod';

/**
 * @schema HeroSlideSchema
 */
const heroSlideSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  cta: z.object({
    label: z.string(),
    href: z.string(),
  }),
  badges: z.array(z.object({
    label: z.string(),
    value: z.string(),
    iconKey: z.string()
  })).optional(), // Nuevos badges del Hero
  imageKey: z.enum(['slide1', 'slide2', 'slide3']),
  theme: z.enum(['dark', 'light']),
});

/**
 * @schema AboutSectionSchema
 * Datos para la sección "Quem Somos" y "Nossa Missão"
 */
const aboutSectionSchema = z.object({
  title: z.string(),
  description: z.string(),
  cards: z.array(z.object({
    title: z.string(),
    description: z.string(),
    iconKey: z.enum(['history', 'mission']),
  })),
  stats: z.array(z.object({
    value: z.string(),
    label: z.string(),
  })),
});

/**
 * @schema DifferentialsSchema
 * Los 8 puntos de valor de la marca
 */
const differentialItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  iconKey: z.string(), // Mapeo a Lucide
});

const differentialsSectionSchema = z.object({
  titlePrefix: z.string(),
  titleHighlight: z.string(),
  subtitle: z.string(),
  items: z.array(differentialItemSchema),
});

/**
 * @schema ServicesSchema
 * Catálogo de servicios actualizado
 */
const serviceItemSchema = z.object({
  iconKey: z.string(),
  title: z.string(),
  description: z.string(),
  features: z.array(z.string()), // Lista de bullets (Tela LCD, Bateria, etc)
  ctaLabel: z.string(),
});

/**
 * Schema Maestro de la Home Page
 */
export const homePageSchema = z.object({
  hero: z.object({
    slides: z.array(heroSlideSchema),
    autoPlayInterval: z.number().default(3000),
    socialProof: z.object({
      rating: z.string(),
      source: z.string(),
      totalReviews: z.string(),
    }),
  }),
  categories: z.object({
    title: z.string(),
    items: z.array(z.object({
      label: z.string(),
      href: z.string(),
      imageKey: z.string(),
    })),
  }),
  about: aboutSectionSchema,
  differentials: differentialsSectionSchema,
  services: z.object({
    titlePrefix: z.string(),
    titleHighlight: z.string(),
    subtitle: z.string(),
    items: z.array(serviceItemSchema),
  }),
  finalCta: z.object({
    title: z.string(),
    description: z.string(),
    buttonLabel: z.string(),
    whatsappText: z.string(),
  })
});

export type HomePageContent = z.infer<typeof homePageSchema>;
