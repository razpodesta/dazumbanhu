// Imports provisionales (Asegúrate de exportarlos en ui-landing/src/index.ts cuando los crees)
// import { Navbar, ManifestoSection, Hero } from '@mobile-store/marketing-ui-landing';

export default function Index() {
  return (
    <main className="min-h-screen selection:bg-[#00C2CB] selection:text-white">
      {/*
        TODO: Descomentar cuando los componentes existan en la librería ui-landing
        <Navbar />
        <Hero />
        <ManifestoSection />
      */}

      {/* Placeholder temporal */}
      <div className="flex items-center justify-center h-screen flex-col gap-4">
        <h1 className="font-heading text-6xl font-bold">Dázum Banhu</h1>
        <p className="font-handwriting text-4xl text-[#00C2CB]">Você merece!!!</p>
        <p className="font-sans text-sm text-zinc-500">Construyendo experiencia Elite...</p>
      </div>
    </main>
  );
}
