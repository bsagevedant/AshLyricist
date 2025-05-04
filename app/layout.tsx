import './globals.css';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'AshLyricist - Your Personal AI Lyricist & Beat Companion',
  description: 'Transform your ideas, moods, and emotions into beautiful song lyrics or rap verses with matching beats in seconds.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased flex flex-col',
        fontSans.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col items-center">
            <Header />
            <main className="flex-1 flex items-center justify-center w-full">
              <div className="w-full flex justify-center">
                <div className="w-full max-w-[1200px]">{children}</div>
              </div>
            </main>
            <Footer className="w-full" />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}