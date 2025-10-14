import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: '개발 블로그',
  description: 'Next.js, TypeScript, Markdown으로 구축된 개발 블로그',
  keywords: ['Next.js', 'TypeScript', 'Markdown', 'Tailwind CSS'],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
