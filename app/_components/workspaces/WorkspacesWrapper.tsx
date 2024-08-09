'use client';

import { ChangeEvent, FC, useEffect, useState } from 'react';
import Sidebar from '../shared/sidebar/Sidebar';
import DashboardHeader from '../dashboard/DashboardHeader';
import { WorkspaceType } from '@/app/_types/workspaceTypes';
import { useAuth } from '@/app/_context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/_firebase/init';
import { Ghost, Loader2 } from 'lucide-react';
import Header from '../shared/Header';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import WorkspacesPagination from './WorkspacesPagination';

const WorkspacesWrapper: FC = () => {
    const [workspaces, setWorkspaces] = useState<any[]>([]);
    const [filteredWorkspaces, setFilteredWorkspaces] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const workspacesPerPage = 8;
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchWorkspaces = async () => {
            if (!currentUser) return;
            try {
                const workspacesCollection = collection(db, 'workspaces');
                const q = query(
                    workspacesCollection,
                    where('creatorId', '==', currentUser.uid),
                );
                const teamsSnapshot = await getDocs(q);
                const workspacesLists = teamsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setWorkspaces(workspacesLists);
                setFilteredWorkspaces(workspacesLists);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching workspaces:', error);
                setLoading(false);
            }
        };

        fetchWorkspaces();
    }, [currentUser]);

    useEffect(() => {
        const filtered = workspaces.filter((workspace: { name: string }) =>
            workspace.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredWorkspaces(filtered);
        setCurrentPage(1);
    }, [searchTerm, workspaces]);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const indexOfLastWorkspace = currentPage * workspacesPerPage;
    const indexOfFirstWorkspace = indexOfLastWorkspace  - workspacesPerPage;
    const currentTeams = filteredWorkspaces.slice(
        indexOfFirstWorkspace,
        indexOfLastWorkspace,
    );

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return <Loader2 className='h-8 w-8 animate-spin' />;
    }

    return (
        <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
            <Sidebar />
            <div className='flex flex-col'>
                <DashboardHeader />
                <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
                    <div className='flex items-center'>
                        <Header text='My Workspaces' />
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
                                            <span className='sr-only'>
                                                View Team
                                            </span>
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
                                                <Link
                                                    href={`/detail/${item.id}`}
                                                >
                                                    Detail
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='flex items-center justify-center gap-2 text-center text-lg'>
                                    <Ghost className='h-8 w-8 animate-bounce' />
                                    <p>No team found</p>
                                </div>
                            )}
                        </section>
                    </div>

                    <WorkspacesPagination
                        teamsPerPage={workspacesPerPage}
                        totalTeams={filteredWorkspaces.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </main>
            </div>
        </div>
    );
};

export default WorkspacesWrapper;
