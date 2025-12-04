<!-- .docs/CONTENT_ENGINE.md -->

# 🧠 Dázum Content Engine: Manifiesto & Convenciones

> **Estado:** Activo | **Tecnología:** Zod + Node.js + TypeScript
> **Objetivo:** Eliminar "Magic Strings", garantizar consistencia de marca y prevenir errores en tiempo de ejecución.

---

## 1. Filosofía: "Zero Hardcoding"

En **Dázum Banhu**, no escribimos textos directamente en los componentes de React (`.tsx`).
¿Por qué? Porque los textos son **Datos**, no código.

Hemos implementado un **Content Engine (Motor de Contenido)** personalizado que trata nuestros textos de marketing (Manifiestos, Claims, Promesas) con la misma rigurosidad que tratamos los datos financieros.

### Beneficios Clave:
1.  **Type Safety Absoluta:** Si borras una clave en el JSON, TypeScript te gritará en rojo antes de compilar.
2.  **Validación de Estructura (Zod):** Garantizamos que secciones críticas (como el Manifiesto de Marca) siempre tengan los campos obligatorios.
3.  **Centralización:** Todo el copy reside en un solo lugar (`libs/shared/util-content`).

---

## 2. Arquitectura del Motor

El flujo de datos es unidireccional y automatizado:

```mermaid
graph LR
    A[JSON Crudo\n(src/raw)] -->|Valida| B(Zod Schemas\n(src/schemas))
    B -->|Script Node.js| C[Diccionario TS\n(src/generated)]
    C -->|Import| D[Componentes React\n(UI Libs)]
Componentes del Sistema (libs/shared/util-content)
Directorio	Propósito	¿Editable?
src/raw/*.json	La fuente de la verdad. Aquí escribes los textos.	✅ SÍ (Creatividad)
src/schemas/*.ts	Las reglas del juego. Define qué campos son obligatorios.	✅ SÍ (Ingeniería)
src/generated/*.ts	Archivo resultante compilado.	⛔ NUNCA (Auto-generado)
scripts/generate-dictionary.js	El robot que transforma JSON a TS.	⚠️ Solo Mantenimiento
3. Convenciones de Código
A. Uso de Zod para Textos
Usamos zod no solo para validar, sino para inferir tipos.
Ejemplo de Schema (manifesto.schema.ts):
code
TypeScript
import { z } from 'zod';

export const manifestoSchema = z.object({
  term: z.string(), // "Dázum Banhu"
  phonetic: z.string(), // "/Dá-zum/"
  definition: z.object({
    highlight: z.string(), // Texto que irá en negrita/manuscrita
  }),
});

// ¡Magia! TypeScript deduce el tipo automáticamente
export type ManifestoContent = z.infer<typeof manifestoSchema>;
B. Nomenclatura de Archivos
JSONs: kebab-case.json (ej: hero-section.json).
Claves en Diccionario: El script las convierte automáticamente a camelCase (ej: heroSection).
C. Inmutabilidad
El diccionario generado usa as const. Esto significa que los textos son de "solo lectura" profunda. No puedes modificar ContentDictionary.hero.title en tiempo de ejecución.
4. Flujo de Trabajo: Cómo agregar nuevo contenido
Si necesitas crear una nueva sección (ej: "Sección de Garantía"), sigue estos pasos:
Paso 1: Definir el Schema
Crea src/schemas/warranty.schema.ts. Piensa: "¿Qué datos necesita esta sección para no romperse?"
Paso 2: Crear el JSON
Crea src/raw/warranty.json y rellénalo con los textos finales aprobados.
Paso 3: Generar el Diccionario
Ejecuta el comando en tu terminal (o reinicia el servidor de desarrollo):
code
Bash
# Opción A: Manual
node libs/shared/util-content/scripts/generate-dictionary.js

# Opción B: Automático
# El script corre solo cada vez que haces un build o start
Paso 4: Consumir en React
Importa y usa con autocompletado total:
code
Tsx
import { ContentDictionary } from '@mobile-store/shared-util-content';

export function WarrantyCard() {
  // Autocompletado disponible después del punto
  const { title, duration } = ContentDictionary.warranty;

  return <h3>{title} ({duration})</h3>;
}

---

