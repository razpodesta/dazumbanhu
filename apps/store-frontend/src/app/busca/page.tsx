//apps/store-frontend/src/app/busca/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Loader2, Filter } from 'lucide-react';
import { useProductSearch } from '@mobile-store/marketing-ui-landing/hooks/use-product-search'; // Nota: Verifica si exportaste el hook en index.ts
import { cn } from '@mobile-store/shared-ui-kit';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { search, results, isLoading } = useProductSearch();
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (query) {
      search({ query, limit: 50 }); // Búsqueda más amplia para la página de resultados
      setHasSearched(true);
    }
  }, [query, search]);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">

      {/* Header de Búsqueda */}
      <div className="bg-white dark:bg-black border-b border-zinc-100 dark:border-zinc-800 pt-8 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Resultados para: <span className="text-brand-primary">"{query}"</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {isLoading ? 'Buscando nos nossos estoques...' : `${results.length} produtos encontrados`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar de Filtros (Mockup Visual) */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6 hidden lg:block">
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white mb-4">
              <Filter size={18} /> Filtros
            </div>
            {/* Aquí irían los filtros reales */}
            <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 h-64 flex items-center justify-center text-xs text-zinc-400 text-center">
              Filtros em breve<br/>(Marca, Preço, Categoria)
            </div>
          </aside>

          {/* Grid de Resultados */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-brand-primary animate-spin mb-4" />
                <p className="text-zinc-500">Consultando o oráculo digital...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/produto/${product.id}`}
                    className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
                      {product.image_url && (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <div className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-1">
                        {product.brand}
                      </div>
                      <h3 className="font-bold text-zinc-900 dark:text-white mb-2 line-clamp-2 group-hover:text-brand-primary transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-bold text-zinc-900 dark:text-white">
                          R$ {product.price}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
                  <Search size={32} />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-zinc-500 max-w-xs mx-auto">
                  Tente termos mais genéricos ou navegue pelas categorias no menu.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
