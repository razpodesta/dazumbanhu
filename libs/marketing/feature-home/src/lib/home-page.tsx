//libs/marketing/feature-home/src/lib/home-page.tsx
import { HeroSlider } from './components/hero-slider';
import { CategoryNav } from './components/category-nav';
import { AboutSection } from './components/about-section'; // Nuevo
import { DifferentialsSection } from './components/differentials-section'; // Nuevo
import { ServicesGrid } from './components/services-grid';
import { ManifestoSection } from './components/manifesto-section';

/**
 * @component HomePage
 * @description Ensamblaje maestro de la Landing Page con contenido enriquecido.
 */
export function HomePage() {
  return (
    <main className="relative flex flex-col w-full overflow-x-hidden">
      {/* 1. Hero Section (Slider + Badges) */}
      <HeroSlider />

      {/* 2. Navegación Visual Rápida */}
      <CategoryNav />

      {/* 3. Quiénes Somos + Métricas (Social Proof) */}
      <AboutSection />

      {/* 4. Diferenciales (Why Us) */}
      <DifferentialsSection />

      {/* 5. Grid de Servicios Detallado */}
      <ServicesGrid />

      {/* 6. Manifiesto de Marca (Emotional Closing) */}
      <ManifestoSection />
    </main>
  );
}
