import { z } from 'zod';

/**
 * Schema para un enlace de navegación individual.
 */
export const navItemSchema = z.object({
  label: z.string(),
  href: z.string(),
  isHighlight: z.boolean().optional(),
});

/**
 * Schema maestro para la barra de navegación.
 * Controla textos, links y accesibilidad.
 */
export const navbarSchema = z.object({
  logoText: z.string(),
  logoSubtext: z.string(),
  links: z.object({
    home: navItemSchema,
    repair: navItemSchema,
    shop: navItemSchema,
    about: navItemSchema,
  }),
  actions: z.object({
    search: z.string(), // Texto para aria-label
    cart: z.string(),   // Texto para aria-label
    menu: z.string(),   // Texto para aria-label
  }),
  mobile: z.object({
    menuTitle: z.string(),
    emergencyCta: z.string(),
    locationText: z.string(),
  })
});

export type NavbarContent = z.infer<typeof navbarSchema>;
