import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './_components/shared/Navigation';
import ThemeProvider from './_components/shared/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from './_components/shared/ScrollToTop';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import QueryProvider from './_components/shared/providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Collab Space',
    description: 'Application for collaborative work wrriten in nextjs',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Suspense
                    fallback={<Loader2 className='h-8 w-8 animate-spin' />}
                >
                    <QueryProvider>
                        <ThemeProvider attribute='class'>
                            <Navigation />
                            {children}
                            <ScrollToTop />
                            <Toaster />
                        </ThemeProvider>
                    </QueryProvider>
                </Suspense>
            </body>
        </html>
    );
}
