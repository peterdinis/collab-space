import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './_components/shared/Navigation';
import ThemeProvider from './_components/shared/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from './_components/shared/ScrollToTop';
import { AuthProvider } from './_context/AuthContext';
import AuthSessionCheckWrapper from './_components/auth/AuthSessionCheckWrapper';

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
                <ThemeProvider attribute='class'>
                    <AuthProvider>
                      {/*   <AuthSessionCheckWrapper> */} {/* TODO: fix later */}
                            <Navigation />
                            {children}
                            <ScrollToTop />
                            <Toaster />
                        {/* </AuthSessionCheckWrapper> */}
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
