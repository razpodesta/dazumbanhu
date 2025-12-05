// ... imports anteriores
import { constructMetadata, getLocalBusinessSchema } from '@mobile-store/shared-util-seo';

// 1. Metadata Global (Se hereda en todas las páginas)
export const metadata = constructMetadata({
  title: 'Home', // Se convertirá en "Home | Dázum Banhu"
  description: 'A assistência técnica #1 de Florianópolis. Conserto rápido e acessórios premium.',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 2. Generar Schema JSON-LD
  const jsonLd = getLocalBusinessSchema();

  return (
    <html lang="pt-BR" suppressHydrationWarning className="...">
      <body>
        {/* 3. Inyección de Schema.org para Google Local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <ThemeProvider ...>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
