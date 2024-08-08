'use client';

import { FC, useState, useEffect, ChangeEvent } from 'react';
import Sidebar from '../shared/sidebar/Sidebar';
import DashboardHeader from '../dashboard/DashboardHeader';
import Header from '../shared/Header';
import { Input } from '@/components/ui/input';
import TeamsPagination from './TeamsPagination';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { db } from '@/app/_firebase/init';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Loader2, Ghost } from 'lucide-react';
import { useAuth } from '@/app/_context/AuthContext';

const TeamsWrapper: FC = () => {
    const [teams, setTeams] = useState<any[]>([]);
    const [filteredTeams, setFilteredTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const teamsPerPage = 8;
    const { currentUser } = useAuth();
    
    useEffect(() => {
        const fetchTeams = async () => {
            if (!currentUser) return;  // Ensure the user is authenticated
            try {
                // Create a query to fetch teams where creatorId matches the current user's UID
                const teamsCollection = collection(db, 'teams');
                const q = query(teamsCollection, where('creatorId', '==', currentUser.uid));
                const teamsSnapshot = await getDocs(q);
                const teamsList = teamsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTeams(teamsList);
                setFilteredTeams(teamsList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching teams:', error);
                setLoading(false);
            }
        };

        fetchTeams();
    }, [currentUser]);

    useEffect(() => {
        const filtered = teams.filter(team =>
            team.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTeams(filtered);
        setCurrentPage(1);
    }, [searchTerm, teams]);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const indexOfLastTeam = currentPage * teamsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
    const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return <Loader2 className='animate-spin w-8 h-8' />;
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
                    <Input
                        placeholder='Search...'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <div className='ml-4'>
                        <section className='grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4 lg:p-6'>
                            {currentTeams.length > 0 ? (
                                currentTeams.map((item) => (
                                    <div
                                        key={item.id}
                                        className='group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'
                                    >
                                        <Link
                                            href={`/detail/${item.id}`}
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
                                                <Link href={`/detail/${item.id}`}>
                                                    Detail
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='flex items-center justify-center gap-2 text-center text-lg'>
                                    <Ghost className='animate-bounce w-8 h-8' />
                                    <p>You have not created any teams yet.</p>
                                </div>
                            )}
                        </section>
                    </div>
                    {filteredTeams.length > teamsPerPage && (
                        <TeamsPagination
                            teamsPerPage={teamsPerPage}
                            totalTeams={filteredTeams.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default TeamsWrapper;