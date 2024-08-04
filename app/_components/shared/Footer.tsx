'use client';

import { Button } from '@/components/ui/button';
import { Orbit } from 'lucide-react';

export const Footer = () => {
    return (
        <div className='z-50 flex w-full items-center bg-background p-6 text-2xl font-bold dark:bg-[#1F1F1F]'>
            Collab <Orbit className='ml-2 size-8' />
            <div className='flex w-full items-center justify-between gap-x-2 text-muted-foreground md:ml-auto md:justify-end'>
                <Button variant='ghost' size='lg'>
                    Privacy Policy
                </Button>
                <Button variant='ghost' size='lg'>
                    Terms & Conditions
                </Button>
            </div>
        </div>
    );
};
