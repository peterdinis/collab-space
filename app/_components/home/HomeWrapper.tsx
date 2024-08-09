import { FC } from 'react';
import { Shape1, Shape2 } from './Shapes';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import mainImage from '@/public/img/mainImage.png';

const HomeWrapper: FC = () => {
    return (
        <section className='light relative z-10 overflow-hidden bg-white py-14 text-zinc-900 dark:bg-background dark:text-white md:py-24'>
            <Shape1 />
            <div className='container relative mx-auto px-4'>
                <div className='grid grid-cols-12 gap-y-6 lg:gap-x-6'>
                    <div className='col-span-12 text-center lg:col-span-6 lg:text-start xl:pr-12'>
                        <div className='mt-12 flex h-full flex-col justify-center'>
                            <h2 className='prose-h2 prose mb-4 ml-4 text-5xl font-bold dark:text-white md:text-[70px] md:leading-[85px]'>
                                Collab Space
                            </h2>
                            <p className='prose-p prose ml-4 text-[22px] leading-normal opacity-80 dark:text-white'>
                                Unique themes and templates for every budget and
                                every project. Take a look and find the right
                                one for you!
                            </p>
                            <div>
                                <Link
                                    href='/sign-in'
                                    className='mt-6 inline-flex rounded px-8 py-3 text-xl text-white duration-300 hover:bg-opacity-90 md:mt-12'
                                >
                                    <Button size='lg'>Try Now</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='relative col-span-12 flex items-center justify-center pb-6 lg:col-span-6'>
                        <Shape2 />
                        <Image
                            src={mainImage}
                            alt='Main Image'
                            width={600}
                            height={600}
                            className='relative h-auto max-w-full rounded'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeWrapper;
