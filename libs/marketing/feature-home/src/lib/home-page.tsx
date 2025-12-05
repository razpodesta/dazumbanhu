import { Navbar, Footer } from '@mobile-store/marketing-ui-landing';
import { HeroSlider } from './components/hero-slider';
import { CategoryNav } from './components/category-nav';
import { ServicesGrid } from './components/services-grid'; // Asumimos que este es el Bento Grid
import { ManifestoSection } from './components/manifesto-section';

export function HomePage() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-black selection:bg-brand-primary selection:text-white">
      {/* 1. Navegación Transparente (Glass) */}
      <Navbar />

      <div className="flex flex-col">
        {/* 2. Hero Cinematográfico (Infinity Fade) */}
        <HeroSlider />

        {/* 3. Navegación Rápida Visual (Círculos) */}
        <CategoryNav />

        {/* 4. Grid de Servicios (Bento Box - Reutilizado) */}
        <ServicesGrid />

        {/* 5. Autoridad de Marca (Social Proof) */}
        <ManifestoSection />
      </div>

      {/* 6. Footer Estructural */}
      <Footer />
    </main>
  );
}
