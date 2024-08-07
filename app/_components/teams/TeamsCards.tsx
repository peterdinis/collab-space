import Link from 'next/link';
import { FC } from 'react';
import { Button } from '@/components/ui/button';

const TeamsCard: FC = () => {
    return (
        <section className='grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4 lg:p-6'>
            <div className='group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
                <Link
                    href='/detail/$'
                    className='absolute inset-0 z-10'
                    prefetch={false}
                >
                    <span className='sr-only'>View Team</span>
                </Link>
                <div className='flex items-center justify-center bg-muted p-6'>
                    <img
                        src='https://cdn3d.iconscout.com/3d/premium/thumb/team-5339260-4466195.png?f=webp'
                        alt='Team Logo'
                        width={190}
                        height={190}
                        className='object-contain'
                        style={{ aspectRatio: '80/80', objectFit: 'cover' }}
                    />
                </div>
                <div className='bg-background p-4'>
                    <h3 className='text-xl font-bold'>Team Rocket</h3>
                    <p className='text-sm text-muted-foreground'>
                        Blasting off at the speed of light!
                    </p>
                    <Button className='mt-5 flex justify-center align-top' variant={"link"}>Detail</Button>
                </div>
            </div>
        </section>
    );
};

export default TeamsCard;
