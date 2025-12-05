import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <h2 className="mb-4 text-4xl font-bold">404</h2>
      <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">Página no encontrada</p>
      <Link
        href="/"
        className="rounded-full bg-brand-primary px-6 py-3 font-medium text-white transition-colors hover:bg-brand-dark"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}
