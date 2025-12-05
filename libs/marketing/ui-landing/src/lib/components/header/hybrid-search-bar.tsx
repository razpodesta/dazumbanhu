//libs/marketing/ui-landing/src/lib/components/header/hybrid-search-bar.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useProductSearch } from '../../hooks/use-product-search'; // Hook nivelado
import { cn } from '@mobile-store/shared-ui-kit';

interface HybridSearchBarProps {
  placeholder: string;
  loadingText: string;
  noResultsText: string;
}

/**
 * @component HybridSearchBar
 * @description Barra de búsqueda inteligente con autocompletado y resultados híbridos.
 * Se expande al recibir foco y muestra resultados enriquecidos.
 */
export function HybridSearchBar({ placeholder, loadingText, noResultsText }: HybridSearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Consumo del Hook de Lógica de Negocio
  const { search, results, isLoading, clearSearch } = useProductSearch();

  // Manejo de Click Outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      search({ query: value, limit: 5 });
    } else if (value.length === 0) {
      clearSearch();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto z-50">
      {/* Input Field */}
      <div className={cn(
        "relative flex items-center w-full h-10 rounded-full transition-all duration-300 overflow-hidden",
        isFocused
          ? "bg-white shadow-lg ring-2 ring-brand-light text-zinc-900"
          : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
      )}>
        <div className="pl-4 pr-2 text-current opacity-70">
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
        </div>

        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          className={cn(
            "w-full bg-transparent border-none outline-none text-sm placeholder:text-current/60",
            isFocused ? "text-zinc-900 placeholder:text-zinc-400" : "text-white placeholder:text-white/70"
          )}
        />

        {query && (
          <button
            onClick={() => { setQuery(''); clearSearch(); }}
            className="pr-4 text-current hover:opacity-100 opacity-60 transition-opacity"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Resultados Dropdown */}
      <AnimatePresence>
        {isFocused && query.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden"
          >
            {isLoading ? (
              <div className="p-6 text-center text-sm text-zinc-500">
                <Loader2 size={24} className="animate-spin mx-auto mb-2 text-brand-primary" />
                {loadingText}
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/produto/${product.id}`}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-zinc-50 transition-colors group border-b border-zinc-50 last:border-none"
                  >
                    {/* Placeholder visual de imagen */}
                    <div className="w-10 h-10 rounded-lg bg-zinc-100 shrink-0 overflow-hidden">
                       {product.image_url && <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-zinc-800 truncate group-hover:text-brand-primary transition-colors">
                        {product.title}
                      </h4>
                      <p className="text-xs text-zinc-500 truncate">
                        {product.category} • <span className="font-medium text-green-600">R$ {product.price}</span>
                      </p>
                    </div>

                    <ChevronRight size={16} className="text-zinc-300 group-hover:text-brand-primary" />
                  </Link>
                ))}
                <div className="px-4 pt-2 pb-1 text-center">
                   <Link href={`/busca?q=${query}`} className="text-xs font-bold text-brand-primary hover:underline">
                     Ver todos os resultados
                   </Link>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-sm text-zinc-500">
                <p>{noResultsText}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
