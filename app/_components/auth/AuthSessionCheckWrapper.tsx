"use client";

import { useAuth } from '@/app/_context/AuthContext';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

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
                    // If currentUser is still null after a short delay, then redirect
                    if (!currentUser && pathname !== '/' && pathname !== "/register") {
                        router.push('/login');
                    } else {
                        setIsCheckingAuth(false);  // Firebase has loaded, and we won't redirect
                    }
                }, 1000); // Wait 1 second before checking again
            } else {
                setIsCheckingAuth(false); // If currentUser is not null, Firebase has loaded
            }
        };

        checkAuthState();
    }, [currentUser, pathname, router]);

    if (isCheckingAuth) {
        return <div>Loading...</div>; // or a loading spinner
    }

    return (
        <>
            {children}
        </>
    );
};

export default AuthSessionCheckWrapper;