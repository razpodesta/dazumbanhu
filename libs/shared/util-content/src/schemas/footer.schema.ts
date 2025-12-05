import { z } from 'zod';

/**
 * @schema FooterSchema
 * @description Define la estructura estricta para el pie de página global.
 * @context Marketing Domain
 */

const footerLinkSchema = z.object({
  label: z.string().describe("Texto visible del enlace"),
  href: z.string().describe("Ruta de destino interna o externa"),
  isExternal: z.boolean().optional().default(false).describe("Si es true, añade target=_blank"),
});

const footerColumnSchema = z.object({
  title: z.string().describe("Título semántico de la columna de navegación"),
  links: z.array(footerLinkSchema).describe("Lista de enlaces de esta sección"),
});

const socialLinkSchema = z.object({
  platform: z.enum(['instagram', 'whatsapp', 'facebook', 'google']).describe("Identificador para renderizar el icono correcto"),
  href: z.string().url(),
  ariaLabel: z.string().describe("Texto descriptivo para lectores de pantalla (A11Y)"),
});

export const footerSchema = z.object({
  brandColumn: z.object({
    description: z.string().describe("Propuesta de valor resumida"),
    address: z.string(),
    workingHours: z.string(),
  }),
  navigationColumns: z.array(footerColumnSchema),
  socialLinks: z.array(socialLinkSchema),
  legal: z.object({
    copyrightText: z.string(),
    developerCredit: z.string(),
    developerUrl: z.string(),
    policies: z.array(footerLinkSchema),
  }),
});

export type FooterContent = z.infer<typeof footerSchema>;
