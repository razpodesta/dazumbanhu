//libs/marketing/feature-home/src/lib/components/manifesto-section.tsx
'use client';

import { motion } from 'framer-motion';
import { Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { ContentDictionary } from '@mobile-store/shared-util-content';
import { cn } from '@mobile-store/shared-ui-kit';

// Sub-componentes internos para atomicidad
function OriginBadge({ origin }: { origin: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 backdrop-blur-sm"
    >
      <Sparkles size={14} className="text-brand-primary" />
      <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300">
        {origin}
      </span>
    </motion.div>
  );
}

function DefinitionCard({ definition }: { definition: typeof ContentDictionary.brandManifesto.definition }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="my-16 relative"
    >
      {/* Uso de clase semántica glass-panel (definida en global.css) */}
      <div className="glass-panel relative z-10 rounded-3xl p-8 md:p-12">
        <Quote className="absolute left-6 top-6 rotate-180 text-zinc-200 dark:text-zinc-800" size={80} />

        <p className="relative z-10 text-2xl font-medium leading-relaxed text-zinc-700 dark:text-zinc-200 md:text-3xl text-center">
          {definition.prefix}{" "}
          <span className="relative whitespace-nowrap px-2 text-brand-primary">
            <span className="font-handwriting relative z-10 text-5xl font-bold md:text-6xl">
              {definition.highlight}
            </span>
            <span className="absolute bottom-3 left-0 -z-0 h-3 w-full -rotate-2 bg-brand-primary/10 dark:bg-brand-primary/20" />
          </span>
          {" "}{definition.suffix}
        </p>
      </div>
    </motion.div>
  );
}

interface ManifestoSectionProps {
  className?: string;
}

export function ManifestoSection({ className }: ManifestoSectionProps) {
  const { term, phonetic, origin, definition, promises, closing } = ContentDictionary.brandManifesto;

  return (
    <section className={cn("relative overflow-hidden bg-white py-24 dark:bg-zinc-950", className)}>
      {/* Background FX simplificado con clases utilitarias */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="ambient-blob ambient-blob-primary -left-[10%] top-[10%] h-[500px] w-[500px]" />
        <div className="ambient-blob ambient-blob-secondary -right-[10%] bottom-[10%] h-[500px] w-[500px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">

          <OriginBadge origin={origin} />

          <h2 className="font-heading text-6xl font-black tracking-tighter text-zinc-900 dark:text-white md:text-8xl lg:text-9xl">
            {term}
          </h2>
          <p className="mt-2 font-mono text-lg text-zinc-400 dark:text-zinc-600">
            {phonetic}
          </p>

          <DefinitionCard definition={definition} />

          {/* Promises Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {promises.map((promise, index) => (
              <div
                key={index}
                className="group flex flex-col items-center gap-4 rounded-2xl border border-zinc-100 bg-zinc-50 p-6 transition-all hover:border-brand-primary/30 hover:bg-white hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors dark:bg-zinc-800">
                  <CheckCircle2 size={24} />
                </div>
                <p className="text-center font-medium text-zinc-600 dark:text-zinc-300">
                  {promise}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <p className="font-handwriting text-3xl text-zinc-400 dark:text-zinc-500 md:text-5xl">
              "{closing}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
