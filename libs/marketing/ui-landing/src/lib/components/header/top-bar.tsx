//libs/marketing/ui-landing/src/lib/components/header/top-bar.tsx
'use client';

import { ContentDictionary } from '@mobile-store/shared-util-content';
import { NewsTicker } from './news-ticker';
import { HybridSearchBar } from './hybrid-search-bar';

export function TopBar() {
  // Acceso seguro al diccionario (asumiendo que ha sido regenerado)
  const headerData = ContentDictionary.header;
  const tickerMessages = headerData.ticker_messages || []; // Fallback safe

  return (
    <div className="w-full bg-brand-dark z-[60] relative border-b border-white/10">
      <div className="container mx-auto px-4 h-14 md:h-12 flex items-center justify-between gap-4">

        {/* Left: News Ticker (Oculto en móviles muy pequeños para priorizar búsqueda) */}
        <div className="hidden md:block flex-1 max-w-md overflow-hidden">
          <NewsTicker messages={tickerMessages} />
        </div>

        {/* Center/Right: Hybrid Search (Full width en mobile) */}
        <div className="flex-1 w-full md:max-w-xl">
          <HybridSearchBar
            placeholder={headerData.search_placeholder}
            loadingText={headerData.search_loading}
            noResultsText={headerData.search_no_results}
          />
        </div>

      </div>
    </div>
  );
}
