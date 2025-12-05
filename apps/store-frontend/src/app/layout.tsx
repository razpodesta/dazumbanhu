INICIO DEL ARCHIVO [apps/store-frontend/src/app/layout.tsx]
import { Inter, Outfit, Caveat } from 'next/font/google';
import { constructMetadata, getLocalBusinessSchema } from '@mobile-store/shared-util-seo';
import { ThemeProvider, cn } from '@mobile-store/shared-ui-kit';
import './global.css';

// 1. Configuración de Fuentes (Google Fonts Optimization)
const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fontHeading = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const fontHandwriting = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

// 2. Metadata Global
export const metadata = constructMetadata({
  title: 'Home',
  description: 'A assistência técnica #1 de Florianópolis.',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = getLocalBusinessSchema();

  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${fontSans.variable} ${fontHeading.variable} ${fontHandwriting.variable}`}>
      <body className={cn(
        "min-h-screen bg-zinc-50 font-sans antialiased text-zinc-900 dark:bg-black dark:text-zinc-50",
        "selection:bg-[#00C2CB] selection:text-white"
      )}>
        {/* Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Theme Provider */}
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
FIN DEL ARCHIVO [apps/store-frontend/src/app/layout.tsx]
