'use client';

import { FC } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/app/_context/AuthContext';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const ProfileDropdown: FC = () => {
    const { currentUser, logout } = useAuth();
    const { toast } = useToast();

    const router = useRouter();

    const logoutFromApp = () => {
        logout();
        toast({
            title: 'Succesfully logged out',
            duration: 2000,
            className: 'bg-green-800 text-white font-bold',
        });
        router.push('/');
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>{currentUser?.email}</DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutFromApp}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default ProfileDropdown;
