"use client"

import { useAuth } from '@/app/_context/AuthContext';
import { FC, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface IAuthSessionCheckWrapperProps {
    children?: ReactNode;
}

const AuthSessionCheckWrapper: FC<IAuthSessionCheckWrapperProps> = ({ children }: IAuthSessionCheckWrapperProps) => {
    const { currentUser } = useAuth();
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        if (!currentUser && pathname !== '/') {
            router.push('/login'); 
        }
    }, [currentUser, pathname, router]);

    return (
        <>
            {children}
        </>
    );
};

export default AuthSessionCheckWrapper;