import { FC } from 'react';
import Sidebar from '../shared/sidebar/Sidebar';
import DashboardHeader from '../dashboard/DashboardHeader';
import Header from '../shared/Header';
import TeamsCard from './TeamsCard';
import { Input } from '@/components/ui/input';
import TeamsPagination from './TeamsPagination';

const TeamsWrapper: FC = () => {
    return (
        <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
            <Sidebar />
            <div className='flex flex-col'>
                <DashboardHeader />
                <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
                    <div className='flex items-center'>
                        <Header text='My Teams' />
                    </div>
                    <Input placeholder='Search...' />
                    <div className='ml-4'>
                        <TeamsCard />
                    </div>
                    <TeamsPagination />
                </main>
            </div>
        </div>
    );
};

export default TeamsWrapper;
