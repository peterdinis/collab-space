"use client"

import { useAuth } from '@/app/_context/AuthContext';
import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface IAuthSessionCheckWrapperProps {
    children?: ReactNode;
}

const AuthSessionCheckWrapper: FC<IAuthSessionCheckWrapperProps> = ({ children }: IAuthSessionCheckWrapperProps) => {
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push('/login'); 
        }
    }, [currentUser, router]);

    return (
        <>
            {children}
        </>
    );
};

export default AuthSessionCheckWrapper;