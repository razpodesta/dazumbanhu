//libs/shared/util-content/src/schemas/nav-links.schema.ts
import { z } from 'zod';

/**
 * @schema NavLinksSchema
 * @description Definición recursiva para el sistema de navegación.
 * @version 2.1 - Add isHighlight support
 */

const socialLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  iconKey: z.string(),
});

// Definición Manual del Tipo (Necesaria para recursividad y exactOptionalPropertyTypes)
export type NavItem = {
  labelKey?: string | undefined;
  descriptionKey?: string | undefined; // Para tooltips o subtítulos
  href?: string | undefined;
  iconKey?: string | undefined;
  isNested?: boolean | undefined;
  isHighlight?: boolean | undefined; // <-- FIX TS2339

  children?: NavItem[] | undefined;

  isSeparator?: boolean | undefined;
  isSocial?: boolean | undefined;
  links?: Array<{ label: string; href: string; iconKey: string }> | undefined;
};

export const navItemSchema: z.ZodType<NavItem> = z.lazy(() =>
  z.union([
    // Caso A: Enlace Estándar o Contenedor
    z.object({
      labelKey: z.string(),
      descriptionKey: z.string().optional(),
      href: z.string().optional(),
      iconKey: z.string().optional(),
      isNested: z.boolean().optional(),
      isHighlight: z.boolean().optional(), // <-- Soporte para botón destacado
      children: z.array(navItemSchema).optional(),

      // Exclusiones explícitas
      isSeparator: z.undefined().optional(),
      isSocial: z.undefined().optional(),
      links: z.undefined().optional(),
    }),

    // Caso B: Separador
    z.object({
      isSeparator: z.literal(true),
      labelKey: z.undefined().optional(),
      descriptionKey: z.undefined().optional(),
      href: z.undefined().optional(),
      iconKey: z.undefined().optional(),
      isNested: z.undefined().optional(),
      isHighlight: z.undefined().optional(),
      children: z.undefined().optional(),
      isSocial: z.undefined().optional(),
      links: z.undefined().optional(),
    }),

    // Caso C: Social
    z.object({
      isSocial: z.literal(true),
      links: z.array(socialLinkSchema),
      labelKey: z.undefined().optional(),
      descriptionKey: z.undefined().optional(),
      href: z.undefined().optional(),
      iconKey: z.undefined().optional(),
      isNested: z.undefined().optional(),
      isHighlight: z.undefined().optional(),
      children: z.undefined().optional(),
      isSeparator: z.undefined().optional(),
    }),
  ])
);

export const navLinksSchema = z.object({
  nav_links: z.record(z.string(), z.string()),
});

export type NavItemType = NavItem;
export type NavLinksContent = z.infer<typeof navLinksSchema>;
