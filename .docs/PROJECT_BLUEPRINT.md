<!-- .docs/PROJECT_BLUEPRINT.md -->

/**
 * @file PROJECT_BLUEPRINT.md
 * @description Plan Maestro, Constitución Técnica y Hoja de Ruta Ejecutiva para Dázum Banhu.
 *              Este documento es la Única Fuente de Verdad (SSoT) para la arquitectura,
 *              estándares de calidad y progresión del proyecto.
 * @version 2.0.0 (Elite Engineering Edition)
 * @author L.I.A. Legacy & RaZ Podestá
 */

# 📱 BLUEPRINT MAESTRO: DÁZUM BANHU DXP

## 1. Resumen Ejecutivo (Visión del Comandante)

**Dázum Banhu** no es un sitio web; es una **Plataforma de Experiencia Digital (DXP)** hiper-optimizada diseñada para dominar el mercado de asistencia técnica y accesorios móviles en Florianópolis.

*   **Filosofía:** "Zero Latency" + "Mobile First" + "Local Authority".
*   **Identidad:** "Aqua-Tech". Fusión de la frescura local ("Dázum Banhu") con la precisión de ingeniería de Apple.
*   **Objetivo Técnico:** LCP < 1.2s, CLS 0, Accesibilidad WCAG 2.2 AA, SEO Local Dominante.
*   **Stack:** Nx Monorepo, Next.js 15, Tailwind v4, Supabase, Shopify Headless, Zod, Zustand.

---

## 2. Temario del Proyecto (Dominios y Capacidades)

El sistema se divide estrictamente siguiendo **Domain-Driven Design (DDD)** dentro del Monorepo.

### A. Dominio: Marketing (`libs/marketing`)
*   **Propósito:** Atracción, Autoridad y Conversión (Funnel).
*   **Capacidades:**
    *   **Landing Page Dinámica:** Hero cinematográfico, Scrollytelling.
    *   **Social Proof Engine:** Carrusel de reseñas Google API (+670 reviews).
    *   **Service Showcase:** Grid interactivo de servicios (Bento Box style).
    *   **Brand Manifesto:** Conexión emocional con la cultura "Manezinha".

### B. Dominio: Catálogo (`libs/catalogo` - Futuro)
*   **Propósito:** E-commerce Headless.
*   **Capacidades:**
    *   **Product Browser:** Listados con filtros instantáneos.
    *   **Product Detail:** Rich snippets, especificaciones técnicas.
    *   **Smart Cart:** Carrito persistente (Zustand) con recuperación.

### C. Dominio: Fidelidade (`libs/fidelidade` - Futuro)
*   **Propósito:** Retención y LTV (Lifetime Value).
*   **Capacidades:**
    *   **User Dashboard:** Puntos, Historial de Reparaciones.
    *   **Gamification:** Badges, Niveles de cliente.

### D. Dominio: Shared (`libs/shared`)
*   **Propósito:** Utilidades transversales y UI System.
*   **Capacidades:**
    *   **UI Kit:** Botones, Inputs, Modales (Radix + Tailwind).
    *   **Content Engine:** CMS local basado en JSON + Zod.
    *   **SEO Engine:** Generador de JSON-LD y Metadatos.
    *   **Assets:** Manifiesto de medios optimizados.

---

## 3. Directivas Obligatorias de Ingeniería (12 Pilares Adaptados)

Cualquier código generado **DEBE** cumplir estrictamente con estas reglas. La violación de una regla implica el rechazo del PR/Commit.

### I. Seguridad de Tipos & Datos (Zod Sovereignty)
1.  **Cero `any`:** Prohibido. Usar `unknown` si es estrictamente necesario y validar antes de usar.
2.  **Zod es Ley:** Todo dato que entra (API, JSON, Props complejas) debe tener un Schema Zod.
3.  **Inferencia:** Los tipos TypeScript se generan con `z.infer<typeof Schema>`. Nunca escribir interfaces manuales que dupliquen esquemas.

### II. Content Engine (i18n & CMS)
1.  **Cero Hardcoding:** Prohibido escribir textos en `.tsx`.
2.  **Flujo:** `src/raw/*.json` -> `generate-dictionary.js` -> `dictionary.ts` -> Componente.
3.  **Tipado:** El diccionario debe ser `as const` y totalmente tipado.

### III. SEO & Performance (Core Web Vitals)
1.  **Imágenes:** Siempre usar `next/image` con `width`, `height` y `alt` descriptivo. Importar desde `AssetManifest`.
2.  **Fuentes:** Usar variables CSS (`var(--font-outfit)`) inyectadas en `layout.tsx`.
3.  **JSON-LD:** Cada página debe inyectar su Schema.org (LocalBusiness, Product) vía `util-seo`.

### IV. Estructura de Aparatos (Componentes)
1.  **Atomicidad:** Un componente, un archivo (o carpeta con `index.ts`).
2.  **Colocación:** `libs/<domain>/<feature>/src/lib/<component-name>`.
3.  **Exportación:** Barrel files (`index.ts`) limpios.

---

## 4. Roadmap & Estado Actual

### ✅ Fase 0: Fundación (Completada)
*   [x] Monorepo Nx Configurado.
*   [x] Tailwind v4 (Alpha) integrado.
*   [x] CI/CD con Nx Cloud y Vercel (Tokens configurados).
*   [x] Librerías Base: `util-assets`, `ui-kit`, `util-security`.

### 🚧 Fase 1: Vitrine de Alta Conversión (En Progreso)
Objetivo: Lanzar la Home Page "Next Level".

*   [x] **Infraestructura SEO:** `util-seo` creada (Falta poblar con lógica).
*   [x] **Infraestructura Contenido:** `util-content` creada y script generador funcional.
*   [x] **Librería UI Landing:** `ui-landing` creada manualmente.
*   [ ] **Componente Navbar:** Creado en código, pendiente integración final en `page.tsx`.
*   [ ] **Componente Hero Elite:** Pendiente de creación (Reemplazar el placeholder).
*   [ ] **Componente Manifesto:** Pendiente de creación (Conectar con `util-content`).
*   [ ] **Componente Footer:** Pendiente.

### 📅 Fase 2: Backend & Auth (Pendiente)
*   [ ] Integración Supabase (Auth & DB).
*   [ ] Esquemas de Base de Datos.

---

## 5. Siguientes Pasos Granulares (Plan de Acción Inmediato)

Para completar la **Fase 1**, ejecutaremos estas tareas en orden secuencial:

### Tarea A: Consolidación del "SEO Engine" (`util-seo`)
1.  Implementar `seo-config.ts` con los datos de Dázum Banhu (Trindade, Horarios).
2.  Implementar `metadata-helper.ts` para generar OpenGraph/Twitter Cards automáticamente.
3.  Implementar `json-ld-generator.ts` para el Schema `MobilePhoneStore`.
4.  Crear `robots.ts` y `sitemap.ts` en `apps/store-frontend`.

### Tarea B: Consolidación del "Content Engine" (`util-content`)
1.  Crear esquemas Zod para: `hero.schema.ts`, `services.schema.ts`, `navbar.schema.ts`.
2.  Crear JSONs en `raw/`: `home-hero.json`, `services-list.json`, `navigation.json`.
3.  Ejecutar script para regenerar el diccionario tipado.

### Tarea C: Construcción de Componentes Visuales (`ui-landing`)
*Ubicación: `libs/marketing/ui-landing/src/lib/...`*

1.  **Refinar Navbar:** Asegurar que consuma `navigation.json` del Content Engine.
2.  **Construir Hero Elite:**
    *   Imagen de fondo optimizada (Mobile/Desktop) desde `AssetManifest`.
    *   Textos desde `ContentDictionary`.
    *   Animaciones de entrada con `framer-motion`.
    *   CTA principal (WhatsApp) usando `ui-kit`.
3.  **Construir Manifesto Section:**
    *   Diseño con tipografía `Caveat` para el concepto "Dázum Banhu".
    *   Datos desde `brand-manifesto.json`.
4.  **Construir Services Grid (Bento Box):**
    *   Grid responsivo CSS.
    *   Tarjetas con efectos hover (Glassmorphism).
    *   Iconos Lucide.

### Tarea D: Ensamblaje de Página (`apps/store-frontend`)
1.  Limpiar `page.tsx`.
2.  Importar componentes desde `@mobile-store/marketing-ui-landing`.
3.  Verificar `layout.tsx` (Fuentes, Providers, SEO Global).
4.  Build & Deploy final a Vercel.

---

**Fin del Blueprint.**
*Este documento debe ser consultado antes de escribir cualquier línea de código nueva.*
