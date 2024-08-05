'use client';

import useScrollTop from '@/app/_hooks/useScrollToTop';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FC } from 'react';
import { Orbit } from 'lucide-react';
import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';
import ProfileDropdown from '../auth/ProfileDropdown';
import { useUser } from '@clerk/nextjs';

const Navigation: FC = () => {
    const scrolled = useScrollTop();
    const { user } = useUser();
    return (
        <div
            className={cn(
                'fixed top-0 z-50 flex w-full items-center bg-background p-4 text-2xl font-bold shadow-white dark:bg-[#1F1F1F]',
                scrolled && 'border-b shadow-sm',
            )}
        >
            <div className='flex w-full items-center'>
                <div className='flex items-center'>
                    Collab <Orbit className='ml-2 size-8' />
                </div>
                <div className='ml-auto'>
                    {user ? (
                        <ProfileDropdown />
                    ) : (
                        <>
                            <Button variant={'destructive'}>
                                <Link href='/sign-in'>Login</Link>
                            </Button>
                            <Button className='ml-3' variant={'default'}>
                                <Link href='/sign-up'>Register</Link>
                            </Button>
                        </>
                    )}
                </div>
                <div className='ml-4'>
                    <ThemeSwitch />
                </div>
            </div>
        </div>
    );
};

export default Navigation;
