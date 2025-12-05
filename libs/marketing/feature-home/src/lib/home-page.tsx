import { Navbar, Footer } from '@mobile-store/marketing-ui-landing';
import { Hero } from './components/hero';
import { ServicesGrid } from './components/services-grid';
import { ManifestoSection } from './components/manifesto-section';

/**
 * @component HomePage
 * @description Orquestador principal de la Landing Page.
 * Compone los aparatos visuales en el orden narrativo correcto.
 *
 * Estructura:
 * 1. Navbar (Flotante Global)
 * 2. Hero (Impacto Visual)
 * 3. Services (Propuesta de Valor Racional)
 * 4. Manifesto (Conexión Emocional)
 * 5. Footer (Navegación y Cierre)
 */
export function HomePage() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-zinc-950 selection:bg-brand-primary selection:text-white">
      {/* 1. Navegación Superior */}
      <Navbar />

      {/* 2. Área de Contenido Principal */}
      <div className="flex flex-col">
        {/* Sección Hero: Punto de entrada (LCP Critical) */}
        <Hero />

        {/* Sección Servicios: Grid de Bento Box */}
        <ServicesGrid />

        {/* Sección Manifiesto: Storytelling de Marca */}
        <ManifestoSection />
      </div>

      {/* 3. Pie de Página */}
      <Footer />
    </main>
  );
}
