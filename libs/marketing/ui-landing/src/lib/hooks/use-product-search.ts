//libs/marketing/ui-landing/src/lib/hooks/use-product-search.ts
import { useState, useCallback, useRef } from 'react';
import { createClient } from '@mobile-store/shared-util-supabase';
import { searchProducts, type SearchFilters, type ProductResult } from '@mobile-store/shared-util-search';

/**
 * @hook useProductSearch
 * @description Hook de alto rendimiento para búsqueda en tiempo real.
 * Implementa Debounce manual y AbortController para cancelar peticiones obsoletas.
 */
export function useProductSearch() {
  const [results, setResults] = useState<ProductResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Referencia para cancelar peticiones en vuelo si el usuario sigue escribiendo
  const abortControllerRef = useRef<AbortController | null>(null);

  const supabase = createClient();

  const search = useCallback(async (filters: SearchFilters) => {
    // 1. Cancelar petición anterior si existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Crear nuevo controlador
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);
    setError(null);

    try {
      let vector: number[] | undefined = undefined;

      // 2. Si hay texto, vectorizamos (Llamada al API Route)
      if (filters.query && filters.query.length > 2) {
        const vectorResponse = await fetch('/api/search/vectorize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: filters.query }),
          signal: abortController.signal, // Vinculamos la señal de aborto
        });

        if (!vectorResponse.ok) throw new Error('Error al conectar con el motor neuronal.');

        const { vector: v } = await vectorResponse.json();
        vector = v;
      }

      // 3. Consulta a Supabase (Lógica Híbrida)
      // Nota: Pasamos el cliente supabase inyectado para mantener el contexto de sesión si fuera necesario
      const products = await searchProducts(supabase, filters, vector);

      setResults(products);

    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Búsqueda cancelada por nueva entrada.');
        return; // No hacemos nada si fue abortado
      }
      console.error('Search Hook Error:', err);
      setError('No pudimos completar la búsqueda. Intenta nuevamente.');
      setResults([]);
    } finally {
      // Solo apagamos loading si esta es la petición activa
      if (abortControllerRef.current === abortController) {
        setIsLoading(false);
      }
    }
  }, [supabase]);

  // Función de utilidad para limpiar resultados
  const clearSearch = useCallback(() => {
    setResults([]);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    search,
    results,
    isLoading,
    error,
    clearSearch
  };
}
