// libs/shared/util-search/src/lib/use-search.ts
import { useState } from 'react';
import { createClient } from '@mobile-store/shared-util-supabase'; // Tu cliente existente
import { z } from 'zod';

// Schema de filtros para validación
const searchFiltersSchema = z.object({
  query: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  limit: z.number().default(20),
});

export type SearchFilters = z.infer<typeof searchFiltersSchema>;

export function useProductSearch() {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const search = async (filters: SearchFilters) => {
    setIsLoading(true);
    try {
      const { query, brand, minPrice, maxPrice, limit } = filters;

      if (!query) {
        // Si no hay texto, búsqueda simple por filtros
        let dbQuery = supabase.from('products').select('*').limit(limit);
        if (brand) dbQuery = dbQuery.eq('brand', brand);
        if (minPrice) dbQuery = dbQuery.gte('price', minPrice);
        if (maxPrice) dbQuery = dbQuery.lte('price', maxPrice);

        const { data } = await dbQuery;
        setResults(data || []);
        return;
      }

      // Si hay texto, usamos la búsqueda híbrida inteligente
      // NOTA: Necesitamos un endpoint API para generar el embedding del lado del servidor
      // porque transformers.js es pesado para el cliente.
      const response = await fetch('/api/search/vectorize', {
        method: 'POST',
        body: JSON.stringify({ text: query }),
      });

      const { vector } = await response.json();

      // Llamamos a la función RPC de Supabase
      const { data, error } = await supabase.rpc('hybrid_search', {
        query_text: query,
        query_embedding: vector,
        match_threshold: 0.5, // Sensibilidad (ajustable)
        match_count: limit,
        filter_brand: brand || null,
        min_price: minPrice || null,
        max_price: maxPrice || null,
      });

      if (error) throw error;
      setResults(data || []);

    } catch (error) {
      console.error("Search Error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { search, results, isLoading };
}
