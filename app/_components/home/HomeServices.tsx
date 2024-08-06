import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Cannabis, Shuffle, Camera, Award } from 'lucide-react';

// Define the service type
interface Service {
    icon: LucideIcon;
    title: string;
    description: string;
}

// Update the service list with lucide-react icons
const serviceList: Service[] = [
    {
        icon: Cannabis,
        title: 'Team Collaboration',
        description:
            'Our platform provides robust tools for seamless team collaboration. Engage with your colleagues in real-time.',
    },
    {
        icon: Shuffle,
        title: 'Project Management',
        description:
            'Manage your projects efficiently with our integrated tools, ensuring every team member is on the same page.',
    },
    {
        icon: Camera,
        title: 'Communication Tools',
        description:
            'Utilize our advanced communication tools to stay connected with your team, no matter where you are.',
    },
    {
        icon: Award,
        title: 'Resource Sharing',
        description:
            'Share resources effortlessly with your team. Our platform ensures secure and easy access to all your important files.',
    },
];

// Update the ServiceItem component to TypeScript
interface ServiceItemProps {
    service: Service;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service }) => (
    <div className='h-full bg-white p-3 shadow dark:bg-slate-800 md:mt-4'>
        <div className='p-4 lg:p-8'>
            <div className='mb-2 text-[40px] text-blue-600'>
                <service.icon />
            </div>
            <h5 className='my-6 text-xl font-medium'>{service.title}</h5>
            <p className='mt-4 opacity-75'>{service.description}</p>
        </div>
    </div>
);

const ShapeOne: React.FC = () => {
    return (
        <svg
            className='absolute -bottom-[20%] left-0 -z-[1]'
            width='405'
            height='626'
            viewBox='0 0 405 626'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <rect
                x='-302.65'
                y='296.986'
                width='433.92'
                height='140'
                rx='73.8464'
                transform='rotate(-33.796 -302.65 296.986)'
                fill='#7434F8'
                fillOpacity='0.5'
            />
            <rect
                x='-315'
                y='502.403'
                width='666.584'
                height='140'
                rx='73.8464'
                transform='rotate(-33.796 -315 502.403)'
                fill='#FAA515'
                fillOpacity='0.5'
            />
        </svg>
    );
};

const ShapeTwo: React.FC = () => {
    return (
        <svg
            className='absolute -top-[20%] right-0 -z-[1]'
            width='340'
            height='658'
            viewBox='0 0 495 778'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <circle
                cx='389'
                cy='389'
                r='389'
                fill='#0d6efd'
                fillOpacity='0.19'
            />
        </svg>
    );
};

const HomeServices: React.FC = () => {
    return (
        <section className='relative z-[1] overflow-hidden bg-gray-50 py-14 text-zinc-900 dark:bg-background dark:text-white md:py-24'>
            <ShapeOne />
            <ShapeTwo />

            <div className='container mx-auto px-4'>
                <div className='grid grid-cols-12 gap-6'>
                    <div className='col-span-12 md:col-span-4'>
                        <h2 className='mb-4 text-3xl font-bold leading-normal md:text-[40px]'>
                            Collaborate Seamlessly with Your Team
                        </h2>
                        <p className='text-[17px] font-bold leading-normal opacity-80'>
                            Empower your team to work together efficiently with
                            our advanced collaboration tools. From project
                            management to real-time communication, we have
                            everything you need to succeed.
                        </p>
                    </div>
                    <div className='col-span-12 md:col-span-8'>
                        <div className='grid grid-cols-2 gap-6 gap-x-5'>
                            <div className='col-span-2 md:col-span-1'>
                                {serviceList.slice(0, 2).map((service, i) => (
                                    <div key={i}>
                                        <ServiceItem service={service} />
                                    </div>
                                ))}
                            </div>
                            <div className='col-span-2 md:col-span-1 md:mt-12'>
                                {serviceList.slice(2, 4).map((service, i) => (
                                    <div key={i}>
                                        <ServiceItem service={service} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeServices;
