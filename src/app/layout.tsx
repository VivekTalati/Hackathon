import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { NavigationHeader } from '@/components/NavigationHeader';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'SkillSense — Know What to Practice Next',
  description: 'Adaptive formative assessment platform for modern schools.',
};

import { SkillSenseAuthProvider } from '@/components/auth/SkillSenseAuthProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${fontSans.variable}`}>
      <body className="min-h-full bg-slate-50/80 text-slate-900 antialiased flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
        <SkillSenseAuthProvider>
          <AppProvider>
            <NavigationHeader />
            <main className="flex-1 flex flex-col">{children}</main>
          </AppProvider>
        </SkillSenseAuthProvider>
      </body>
    </html>
  );
}
