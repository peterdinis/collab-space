"use client"

import { FC, useState, useEffect } from 'react';
import Sidebar from '../shared/sidebar/Sidebar';
import DashboardHeader from '../dashboard/DashboardHeader';
import Header from '../shared/Header';
import { Input } from '@/components/ui/input';
import TeamsPagination from './TeamsPagination';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { db } from '@/app/_firebase/init';
import {collection, getDocs} from "firebase/firestore";
import { Loader2 } from 'lucide-react';

const TeamsWrapper: FC = () => {
    const [teams, setTeams] = useState<any[]>([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const teamsCollection = collection(db, 'teams');
                const teamsSnapshot = await getDocs(teamsCollection);
                const teamsList = teamsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTeams(teamsList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching teams:', error);
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    if (loading) {
        return <Loader2 className='animate-bounce w-8 h-8' />
    }

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
                        <section className='grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4 lg:p-6'>
                            {teams.map((item) => {
                                return (
                                    <>
                                    <div className='group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
                                <Link
                                    href={`/detail/${item!.id}`}
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
                                        style={{
                                            aspectRatio: '80/80',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <div className='bg-background p-4'>
                                    <h3 className='text-xl font-bold'>
                                        {item.name}
                                    </h3>
                                    <p className='text-sm text-muted-foreground'>
                                        {item.description}
                                    </p>
                                    <Button
                                        className='mt-5 flex justify-center align-top'
                                        variant={'default'}
                                    >
                                        <Link href={`/detail/${item!.id}`}>
                                        Detail</Link>
                                    </Button>
                                </div>
                            </div>
                                    </>
                                )
                            })}
                        </section>
                    </div>
                    <TeamsPagination />
                </main>
            </div>
        </div>
    );
};

export default TeamsWrapper;
