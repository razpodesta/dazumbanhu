import { Hero } from './components/hero';
import { ServicesGrid } from './components/services-grid';

export function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <ServicesGrid />
      {/* Aquí irán más secciones: SocialProof, CatalogPreview, Footer */}
    </main>
  );
}
