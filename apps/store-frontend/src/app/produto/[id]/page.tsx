//apps/store-frontend/src/app/produto/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@mobile-store/shared-util-supabase';
import { ChevronRight, Star, Truck, ShieldCheck } from 'lucide-react';
import { cn } from '@mobile-store/shared-ui-kit';

// --- 1. Configuración de la Página ---
export const revalidate = 3600; // ISR: Revalidar cada hora

interface ProductPageProps {
  params: { id: string };
}

// --- 2. Generación de Metadatos SEO ---
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const supabase = createClient();
  const { data: product } = await supabase.from('products').select('title, description').eq('id', params.id).single();

  if (!product) return { title: 'Produto não encontrado' };

  return {
    title: `${product.title} | Dázum Banhu`,
    description: product.description || 'Detalhes do produto na melhor loja de Floripa.',
  };
}

// --- 3. Componente Principal (Server Component) ---
export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = createClient();

  // Fetch de datos (Simulado si no hay tabla, ajusta según tu DB real)
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  // Manejo de Errores / 404
  if (error || !product) {
    // En producción real usaríamos notFound(), por ahora mostramos un estado visual
    // para no romper el flujo si la DB está vacía.
    return <EmptyProductState />;
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12">
      <div className="container mx-auto px-4">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <span>Início</span> <ChevronRight size={14} />
          <span>Catálogo</span> <ChevronRight size={14} />
          <span className="font-medium text-zinc-900 dark:text-white">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800">

          {/* Columna A: Galería de Imágenes */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-zinc-400">Sem Imagem</span>
              )}
            </div>
          </div>

          {/* Columna B: Información y Compra */}
          <div className="flex flex-col justify-center">
            <div className="mb-2 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-brand-light text-brand-dark text-xs font-bold uppercase tracking-wider">
                {product.brand || 'Original'}
              </span>
              <div className="flex items-center gap-1 text-yellow-400 text-sm">
                <Star size={14} fill="currentColor" />
                <span className="text-zinc-600 dark:text-zinc-400 font-medium">5.0 (Verificado)</span>
              </div>
            </div>

            <h1 className="font-heading text-4xl font-black text-zinc-900 dark:text-white mb-4 leading-tight">
              {product.title}
            </h1>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              {product.description || 'Descrição detalhada indisponível no momento.'}
            </p>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-3xl font-bold text-brand-dark">
                R$ {product.price?.toFixed(2)}
              </span>
              <span className="text-sm text-zinc-500 mb-1">
                em até 12x sem juros
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <button className="w-full py-4 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-lg shadow-lg shadow-brand-primary/20 transition-all transform active:scale-95">
                Comprar Agora
              </button>
              <button className="w-full py-4 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                Adicionar ao Carrinho
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <Truck className="text-brand-primary" size={20} />
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Entrega em Floripa</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-brand-primary" size={20} />
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Garantia Dázum</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

// Componente de Fallback (Para desarrollo/demo)
function EmptyProductState() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold text-zinc-800 mb-2">Produto não encontrado</h1>
      <p className="text-zinc-500 mb-6">O produto que você procura pode ter sido removido ou não existe.</p>
      <a href="/" className="px-6 py-2 bg-zinc-900 text-white rounded-full text-sm font-medium">
        Voltar para a Loja
      </a>
    </div>
  );
}
