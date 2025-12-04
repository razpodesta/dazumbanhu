import { z } from 'zod';

/**
 * Schema para validar la sección del Manifiesto de Marca.
 * Define la estructura para explicar el término "Dázum Banhu".
 *
 * @packageDocumentation
 */

/**
 * Definición Zod para el bloque de definición cultural.
 */
export const definitionBlockSchema = z.object({
  /** El prefijo de la frase (ej: "Diz-se de...") */
  prefix: z.string(),
  /** La parte que irá resaltada con tipografía manuscrita */
  highlight: z.string(),
  /** El sufijo de la frase */
  suffix: z.string(),
});

/**
 * Schema principal para el Manifiesto.
 */
export const manifestoSchema = z.object({
  /** El término principal (ej: "Dázum Banhu") */
  term: z.string(),

  /** Representación fonética para dar contexto de diccionario (ej: "/Dá-zum/") */
  phonetic: z.string(),

  /** Explicación del origen cultural (ej: "Expressão popular de Floripa") */
  origin: z.string(),

  /** Objeto que compone la definición semántica */
  definition: definitionBlockSchema,

  /** Lista de promesas de marca aplicadas al negocio */
  promises: z.array(z.string()).describe("Lista de puntos bullet que explican la aplicación práctica"),

  /** Frase de cierre emocional */
  closing: z.string(),
});

/**
 * Tipo TypeScript inferido automáticamente del Schema Zod.
 * Úsalo en tus componentes React para tipar las props.
 */
export type ManifestoContent = z.infer<typeof manifestoSchema>;
