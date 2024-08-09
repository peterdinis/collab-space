import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './_components/shared/Navigation';
import ThemeProvider from './_components/shared/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from './_components/shared/ScrollToTop';
import { AuthProvider } from './_context/AuthContext';
import AuthSessionCheckWrapper from './_components/auth/AuthSessionCheckWrapper';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

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
                    <ThemeProvider attribute='class'>
                        <AuthProvider>
                            <AuthSessionCheckWrapper>
                            <Navigation />
                            {children}
                            <ScrollToTop />
                            <Toaster />
                            </AuthSessionCheckWrapper>
                        </AuthProvider>
                    </ThemeProvider>
                </Suspense>
            </body>
        </html>
    );
}
