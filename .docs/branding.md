<!-- .docs/branding.md -->

# Dázum Banhu Celulares - Branding & UI Kit

/**
 * @fileoverview Definición conceptual de la marca, paleta de colores y sistema de diseño.
 * Este documento sirve como base para la configuración de Tailwind v4 y los componentes del UI Kit.
 */

## 1. Identidad de Marca

*   **Nombre Comercial:** Dázum Banhu Celulares
*   **Eslogan Principal:** "Você merece!!!"
*   **Posicionamiento:** Especialistas apaixonados por entregar excelência em Conserto de Celular, Acessórios e Eletrônicos em Florianópolis.
*   **Arquetipo:** El Especialista Amigable / El Cuidador Tecnológico.
*   **Tono de Voz:** Profesional, cercano, entusiasta, confiable y transparente.

## 2. Paleta de Colores (Inferencia)

Se utilizará Tailwind CSS v4 con variables CSS nativas.

/**
 * @tokens Paleta de colores principal
 */
*   **Brand Primary (Turquoise):** `#00C2CB` (Aproximado basado en "turquoise") - Usado en botones, destacados e iconos.
*   **Brand Dark (Turquoise Dark):** `#008B92` - Usado en gradientes y estados hover.
*   **Brand Light:** `#E0F7FA` - Fondos sutiles.
*   **Background:** `#FFFFFF` (Blanco puro) y `#F8FAFC` (Slate 50 para secciones alternas).
*   **Text Main:** `#1E293B` (Slate 800) - Legibilidad alta.
*   **Text Muted:** `#64748B` (Slate 500) - Textos secundarios.
*   **Accent (Success):** `#22C55E` (Green 500) - WhatsApp y garantías.
*   **Accent (Warning/Stars):** `#FACC15` (Yellow 400) - Estrellas de review y destaques.

## 3. Tipografía

*   **Familia Principal:** `Inter` o `Plus Jakarta Sans`.
*   **Estilos:**
    *   **H1/Hero:** Font-black, tracking-tight, leading-tight.
    *   **H2/Section:** Font-bold, tracking-tight.
    *   **Body:** Font-regular, leading-relaxed.

## 4. UI Patterns & Componentes (Lego Blocks)

### Glassmorphism (Vidrio)
Utilizado en tarjetas sobre fondos de color o imagen.
*   `bg-white/10` + `backdrop-blur-sm` + `border-white/20`.

### Tarjetas (Cards)
*   Bordes redondeados amplios: `rounded-3xl` o `rounded-2xl`.
*   Sombras suaves que se elevan al hover: `shadow-xl` -> `hover:shadow-2xl`.
*   Micro-interacciones: `hover:-translate-y-1`.

### Iconografía
*   **Librería:** Lucide React (Stroke width: 2px).
*   **Uso:** Iconos dentro de círculos con gradientes o fondos sólidos.

### Elementos Interactivos
*   **Botones:** Pill shape (`rounded-full`), sombras pronunciadas, gradientes para acciones principales (Instagram).
*   **Carruseles:** Reviews con tarjetas deslizables.

---


