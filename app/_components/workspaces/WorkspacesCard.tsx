import Link from 'next/link';
import { FC } from 'react';
import { Button } from '@/components/ui/button';

const WorkspacesCard: FC = () => {
    return (
        <section className='grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4 lg:p-6'>
            <div className='group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
                <Link
                    href='#'
                    className='absolute inset-0 z-10'
                    prefetch={false}
                >
                    <span className='sr-only'>View Team</span>
                </Link>
                <div className='flex items-center justify-center bg-muted p-6'>
                    <img
                        src='/placeholder.svg'
                        alt='Team Logo'
                        width={80}
                        height={80}
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
            <div className='group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
                <Link
                    href='#'
                    className='absolute inset-0 z-10'
                    prefetch={false}
                >
                    <span className='sr-only'>View Team</span>
                </Link>
                <div className='flex items-center justify-center bg-muted p-6'>
                    <img
                        src='/placeholder.svg'
                        alt='Team Logo'
                        width={80}
                        height={80}
                        className='object-contain'
                        style={{ aspectRatio: '80/80', objectFit: 'cover' }}
                    />
                </div>
                <div className='bg-background p-4'>
                    <h3 className='text-xl font-bold'>Acme Corp</h3>
                    <p className='text-sm text-muted-foreground'>
                        Delivering quality products since 1950.
                    </p>
                    <Button className='mt-5 flex justify-center align-top' variant={"link"}>Detail</Button>
                </div>
            </div>
            <div className='group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
                <Link
                    href='#'
                    className='absolute inset-0 z-10'
                    prefetch={false}
                >
                    <span className='sr-only'>View Team</span>
                </Link>
                <div className='flex items-center justify-center bg-muted p-6'>
                    <img
                        src='/placeholder.svg'
                        alt='Team Logo'
                        width={80}
                        height={80}
                        className='object-contain'
                        style={{ aspectRatio: '80/80', objectFit: 'cover' }}
                    />
                </div>
                <div className='bg-background p-4'>
                    <h3 className='text-xl font-bold'>Stark Industries</h3>
                    <p className='text-sm text-muted-foreground'>
                        Innovating for a better future.
                    </p>
                    <Button className='mt-5 flex justify-center align-top' variant={"link"}>Detail</Button>
                </div>
            </div>
            <div className='group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
                <Link
                    href='#'
                    className='absolute inset-0 z-10'
                    prefetch={false}
                >
                    <span className='sr-only'>View Team</span>
                </Link>
                <div className='flex items-center justify-center bg-muted p-6'>
                    <img
                        src='/placeholder.svg'
                        alt='Team Logo'
                        width={80}
                        height={80}
                        className='object-contain'
                        style={{ aspectRatio: '80/80', objectFit: 'cover' }}
                    />
                </div>
                <div className='bg-background p-4'>
                    <h3 className='text-xl font-bold'>Globex Corporation</h3>
                    <p className='text-sm text-muted-foreground'>
                        Connecting the world, one innovation at a time.
                    </p>
                    <Button className='mt-5 flex justify-center align-top' variant={"link"}>Detail</Button>
                </div>
            </div>
        </section>
    );
};

export default WorkspacesCard;
