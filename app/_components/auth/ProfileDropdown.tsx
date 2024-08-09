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
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/_hooks/useAuth';

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

    const goToDashboard = () => {
        router.push('/dashboard');
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        className='text-xl font-bold'
                        variant={'ghost'}
                        size={'lg'}
                    >
                        Menu
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel onClick={goToDashboard}>
                        Dashboard
                    </DropdownMenuLabel>
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
