//apps/store-frontend/src/app/api/search/vectorize/route.ts
import { NextResponse } from 'next/server';
import { generateEmbedding } from '@mobile-store/shared-util-search';

/**
 * @api {post} /api/search/vectorize
 * @description Microservicio de vectorización de texto.
 * Convierte lenguaje natural en vectores matemáticos (Embeddings).
 */
export async function POST(req: Request) {
  try {
    // 1. Validación de Entrada
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== 'string' || text.length > 500) {
      return NextResponse.json(
        { error: 'Input inválido. Máximo 500 caracteres.' },
        { status: 400 }
      );
    }

    // 2. Procesamiento (Con métricas de rendimiento)
    const start = performance.now();

    const vector = await generateEmbedding(text);

    const duration = performance.now() - start;

    // Log en servidor para monitoreo de latencia
    if (duration > 500) {
      console.warn(`[Slow Vectorization] ${duration.toFixed(0)}ms para: "${text.slice(0, 20)}..."`);
    }

    // 3. Respuesta Exitosa
    // Cache-Control: public para que búsquedas idénticas no re-procesen inmediatamente
    return NextResponse.json(
      { vector },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600'
        }
      }
    );

  } catch (error) {
    console.error('[API/Vectorize] Error crítico:', error);
    return NextResponse.json(
      { error: 'Error interno del motor de búsqueda.' },
      { status: 500 }
    );
  }
}
