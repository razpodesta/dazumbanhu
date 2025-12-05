<!-- .docs/SEO_STRATEGY.md -->

# 🚀 Dázum SEO Engine: Dominio Local & Técnico

> **Objetivo:** Dominar las búsquedas "Conserto de Celular Florianópolis" y "Acessórios iPhone Trindade".
> **Estrategia:** Programmatic SEO, Datos Estructurados (JSON-LD) y Performance Extrema.

---

## 1. Los 3 Pilares del SEO de Élite

### A. SEO Técnico (La Base)
Google no rankea sitios que no entiende o que son lentos.
*   **Rendering:** Server-Side Rendering (SSR) estricto para contenido crítico.
*   **Core Web Vitals:** LCP < 1.2s, CLS = 0, FID < 100ms.
*   **Canonicalización:** Automática para evitar contenido duplicado (`dazumbanhu.com.br` vs `www...`).
*   **Robots & Sitemaps:** Generados dinámicamente en tiempo de compilación.

### B. SEO Local (La Mina de Oro)
Para un negocio físico en Trindade, aparecer en Google Maps es vital.
*   **Schema.org:** Inyección de `LocalBusiness` y `MobilePhoneStore`.
*   **Coordenadas:** Geotagging preciso (-27.584, -48.518).
*   **NAP Consistency:** Name, Address, Phone idénticos en todo el sitio.

### C. SEO Semántico (El Contenido)
*   **Landmarks:** Uso correcto de `<nav>`, `<main>`, `<aside>`, `<footer>`.
*   **Headings:** Un solo `h1` por página. Jerarquía lógica `h2` -> `h3`.
*   **Alt Text:** Descriptivo y rico en keywords locales (ej: "Troca de tela iPhone 13 na Trindade").

---

## 2. Arquitectura de Datos (Metadatos)

Centralizamos la configuración en `libs/shared/util-seo`.

| Variable | Valor Estándar | Propósito |
| :--- | :--- | :--- |
| `title` | `%s | Dázum Banhu` | Branding consistente en pestañas. |
| `description` | "Assistência Técnica #1..." | CTR (Click Through Rate) en SERPs. |
| `og:image` | `/images/og-social.jpg` | Impacto visual en WhatsApp/Instagram. |
| `keywords` | ["Conserto", "Floripa", ...] | Contexto adicional (aunque Google lo ignora, otros no). |

---

## 3. Entidades Estructuradas (JSON-LD)

Inyectamos scripts invisibles para los robots:

1.  **Organization:** Identidad corporativa, logo, redes sociales.
2.  **LocalBusiness:** Horarios de apertura, precio, mapa.
3.  **Product:** (Futuro) Disponibilidad de stock, precio, reseñas.
4.  **BreadcrumbList:** Ruta de navegación para snippets ricos.

---

## 4. Checklist de Implementación

- [ ] Configurar `robots.ts` y `sitemap.ts` dinámicos.
- [ ] Implementar `metadata-helper` en todas las `page.tsx`.
- [ ] Validar Schema en [Google Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Verificar OpenGraph en [Facebook Debugger](https://developers.facebook.com/tools/debug/).

---


