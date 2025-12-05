//libs/marketing/feature-home/src/lib/home-page.tsx
import { HeroSlider } from './components/hero-slider';
import { CategoryNav } from './components/category-nav';
import { ServicesGrid } from './components/services-grid';
import { ManifestoSection } from './components/manifesto-section';

/**
 * @component HomePage
 * @description Composición de secciones específicas de la página de inicio.
 * Ya no gestiona el Shell (Navbar/Footer), delegando eso al Layout global.
 * @architecture Feature Sliced
 */
export function HomePage() {
  return (
    <main className="relative flex flex-col w-full">
      {/* Hero Section (Slider) */}
      <HeroSlider />

      {/* Navegación Visual de Categorías */}
      <CategoryNav />

      {/* Grid de Beneficios/Servicios */}
      <ServicesGrid />

      {/* Manifiesto de Marca */}
      <ManifestoSection />
    </main>
  );
}
