//apps/store-frontend/src/app/api/search/vectorize/route.ts
import { NextResponse } from 'next/server';
import { generateEmbedding } from '@mobile-store/shared-util-search';

/**
 * @api POST /api/search/vectorize
 * @description Endpoint de microservicio para vectorización de texto.
 * @access Internal/Public (Rate limited ideally)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'El campo "text" es requerido y debe ser string.' },
        { status: 400 }
      );
    }

    // Cronometramos la operación para observabilidad
    const start = performance.now();

    // Generación del vector (CPU Intensivo)
    const vector = await generateEmbedding(text);

    const duration = performance.now() - start;
    console.log(`[API] Vectorización completada en ${duration.toFixed(2)}ms para: "${text.substring(0, 20)}..."`);

    return NextResponse.json({ vector });

  } catch (error) {
    console.error('[API] Error crítico en vectorización:', error);
    return NextResponse.json(
      { error: 'Error interno del motor de búsqueda.' },
      { status: 500 }
    );
  }
}
