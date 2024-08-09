"use client";

import { useAuth } from '@/app/_context/AuthContext';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface IAuthSessionCheckWrapperProps {
    children?: ReactNode;
}
/* TODO: Update logic later */
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
                    // If currentUser is still null after the delay, redirect
                    if (!currentUser && pathname !== '/' && pathname !== "/register") {
                        router.push('/login');
                    } 
                    setIsCheckingAuth(false);  // Firebase has finished checking
                }, 2000); // Wait 2 seconds before checking again
            } else {
                setIsCheckingAuth(false); // Firebase has resolved and user is authenticated
            }
        };

        checkAuthState();
    }, [currentUser, pathname, router]);

    if (isCheckingAuth) {
        return <Loader2 className='animate-spin w-8 h-8' />; // Loading spinner
    }

    return (
        <>
            {children}
        </>
    );
};

export default AuthSessionCheckWrapper;