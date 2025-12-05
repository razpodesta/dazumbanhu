// libs/marketing/feature-home/src/lib/home-page.tsx

import { Navbar, Footer } from '@mobile-store/marketing-ui-landing';
import { HeroSlider } from './components/hero-slider'; // <--- USAMOS ESTE
// import { Hero } from './components/hero'; // <--- MANTENEMOS ESTE COMENTADO COMO FALLBACK
import { CategoryNav } from './components/category-nav';
import { ServicesGrid } from './components/services-grid';
import { ManifestoSection } from './components/manifesto-section';

export function HomePage() {
  return (
    <main className="relative min-h-screen bg-white dark:bg-black selection:bg-brand-primary selection:text-white">
      <Navbar />
      <div className="flex flex-col">
        <HeroSlider /> {/* Slider Activo */}
        <CategoryNav />
        <ServicesGrid />
        <ManifestoSection />
      </div>
      <Footer />
    </main>
  );
}
