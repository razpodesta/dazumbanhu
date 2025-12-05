import { Navbar, Footer } from '@mobile-store/marketing-ui-landing';
import { HeroSlider } from './components/hero-slider';
import { CategoryNav } from './components/category-nav';
import { ServicesGrid } from './components/services-grid';
import { ManifestoSection } from './components/manifesto-section';

/**
 * @component HomePage
 * @description Ensamblaje maestro de la Landing Page.
 * Orquesta los componentes visuales de UI-Landing y Feature-Home.
 */
export function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-white dark:bg-black">
      {/* Navegación Global */}
      <Navbar />

      {/* Bloques de Contenido (Feature) */}
      <div className="flex flex-col w-full">
        <HeroSlider />
        <CategoryNav />
        <ServicesGrid />
        <ManifestoSection />
      </div>

      {/* Pie de Página Global */}
      <Footer />
    </main>
  );
}
