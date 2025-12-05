import { constructMetadata, getLocalBusinessSchema } from '@mobile-store/shared-util-seo';
import { ThemeProvider } from '@mobile-store/shared-ui-kit';
import './global.css';

// 1. Metadata Global (SEO & Social Sharing)
export const metadata = constructMetadata({
  title: 'Home', // Se convertirá en "Home | Dázum Banhu"
  description: 'A assistência técnica #1 de Florianópolis. Conserto rápido e acessórios premium.',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 2. Generar Schema JSON-LD para SEO Local
  const jsonLd = getLocalBusinessSchema();

  return (
    // suppressHydrationWarning es obligatorio al usar next-themes, ya que modifica el DOM antes de la hidratación
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased selection:bg-brand-primary selection:text-white">
        {/* 3. Inyección de Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* 4. Proveedor de Tema (Configuración Tailwind v4 Class Strategy) */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
