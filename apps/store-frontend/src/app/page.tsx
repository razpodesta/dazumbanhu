import { Navbar } from '@mobile-store/marketing-ui-landing';
import { Hero } from '@mobile-store/marketing-feature-home';
// NOTA: Usamos el Hero antiguo temporalmente hasta que hagamos el "Hero Elite"

export default function Index() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 selection:bg-brand-primary selection:text-white">
      {/* 1. Navbar Flotante (Glassmorphism) */}
      <Navbar />

      {/* 2. Hero Section (Temporalmente el antiguo, luego lo reemplazaremos) */}
      <Hero />

      {/* 3. Espacio para scroll (Para probar el efecto del navbar) */}
      <div className="h-[200vh] container mx-auto px-6 py-20">
        <h2 className="text-3xl font-heading font-bold mb-4 text-zinc-900 dark:text-white">
          Prueba de Scroll
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Haz scroll hacia abajo para ver cómo la barra de navegación cambia de transparente a vidrio esmerilado.
        </p>
      </div>
    </main>
  );
}
