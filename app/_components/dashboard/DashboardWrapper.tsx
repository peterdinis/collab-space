import { FC } from 'react';
import EmptyState from './EmptyState';
import Sidebar from '../shared/sidebar/Sidebar';
import DashboardHeader from './DashboardHeader';

const DashboardWrapper: FC = () => {
    return (
        <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
            <Sidebar />
            <div className='flex flex-col'>
                <DashboardHeader />
                <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
                    <div className='flex items-center'>
                        <h1 className='prose-h1: prose ml-2 mt-6 text-lg font-semibold dark:text-white md:text-2xl'>
                            Dashboard
                        </h1>
                    </div>
                    <EmptyState />
                </main>
            </div>
        </div>
    );
};

export default DashboardWrapper;
