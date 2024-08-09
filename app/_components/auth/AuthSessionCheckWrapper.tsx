"use client";

import { FC, ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/app/_hooks/useAuth';

interface IAuthSessionCheckWrapperProps {
    children?: ReactNode;
}

const AuthSessionCheckWrapper: FC<IAuthSessionCheckWrapperProps> = ({ children }: IAuthSessionCheckWrapperProps) => {
    const { currentUser } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuthState = () => {
            if (currentUser === null) {
                setTimeout(() => {
                    setIsCheckingAuth(true);
                    console.log("C", currentUser);
                    if (!currentUser && pathname !== '/' && pathname !== "/register") {
                        router.push('/login');
                    }
                    setIsCheckingAuth(false);
                }, 2000);
            } else {
                if (pathname !== '/dashboard') {
                    router.push('/dashboard');
                } else {
                    setIsCheckingAuth(false);
                }
            }
        };

        checkAuthState();
    }, [currentUser, pathname, router]);

    if (isCheckingAuth) {
        return <Loader2 className='animate-spin w-8 h-8' />;
    }

    return (
        <>
            {children}
        </>
    );
};

export default AuthSessionCheckWrapper;