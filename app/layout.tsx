import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { DataProvider } from '@/components/data-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { IEEEBranchChatbot } from '@/components/ai/ieee-chatbot';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'IEEE-MUSB Hub | Mapúa University Student Branch',
  description:
    'Official Management System for IEEE - Mapúa University Student Branch. Announcements, Events, Member Directory, Officer Portal, and Student Resources.',
  keywords: [
    'IEEE',
    'Mapua University',
    'IEEE-MUSB',
    'Mapua Student Branch',
    'Intramuros',
    'Electrical Engineering',
    'Computer Engineering',
    'Electronics Engineering',
  ],
  authors: [{ name: 'IEEE - Mapúa University Student Branch' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <DataProvider>
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <IEEEBranchChatbot />
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
