'use client';

import { motion } from 'framer-motion';
import { Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { ContentDictionary } from '@mobile-store/shared-util-content';

export function ManifestoSection() {
  const { term, phonetic, origin, definition, promises, closing } = ContentDictionary.brandManifesto;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative overflow-hidden bg-zinc-50 py-24 dark:bg-zinc-900">
      <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-brand-primary/5 blur-[100px]" />
      <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-teal-500/5 blur-[100px]" />

      <div className="container mx-auto px-6">
        <motion.div
          className="mx-auto max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center">
            <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-sm font-bold text-brand-dark dark:text-brand-primary">
              <Sparkles size={16} />
              <span className="uppercase tracking-widest">{origin}</span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="font-heading text-6xl font-black tracking-tighter text-zinc-900 dark:text-white md:text-8xl">
              {term}
            </motion.h2>

            <motion.p variants={itemVariants} className="mt-4 font-mono text-xl text-zinc-400 dark:text-zinc-600">
              {phonetic}
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="relative mt-16 mb-20">
            <div className="relative z-10 rounded-[2.5rem] bg-white p-10 shadow-2xl shadow-zinc-200/50 dark:bg-zinc-800 dark:shadow-none md:p-16">
              <Quote className="absolute left-8 top-8 rotate-180 text-brand-primary/10" size={64} />

              <p className="relative z-10 text-center text-2xl font-medium leading-relaxed text-zinc-700 dark:text-zinc-200 md:text-4xl">
                {definition.prefix}{" "}
                <span className="relative inline-block px-2">
                  <span className="font-handwriting relative z-10 text-5xl font-bold text-brand-primary md:text-6xl">
                    {definition.highlight}
                  </span>
                  <span className="absolute bottom-2 left-0 -z-0 h-4 w-full -rotate-1 bg-brand-light/50 dark:bg-brand-primary/20" />
                </span>
                <br className="my-4 hidden md:block" />
                {definition.suffix}
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid gap-6 md:grid-cols-3">
            {promises.map((promise: string, index: number) => (
              <div
                key={index}
                className="group flex flex-col items-start gap-4 rounded-3xl border border-zinc-200 bg-white p-8 transition-all hover:border-brand-primary/30 hover:shadow-lg hover:shadow-brand-primary/5 dark:border-zinc-800 dark:bg-zinc-800/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white dark:bg-zinc-700 dark:text-white dark:group-hover:bg-brand-primary">
                  <CheckCircle2 size={24} />
                </div>
                <p className="text-lg font-medium text-zinc-600 dark:text-zinc-300">
                  {promise}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-20 text-center">
            <p className="font-handwriting text-3xl text-zinc-500 dark:text-zinc-400 md:text-4xl">
              "{closing}"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
