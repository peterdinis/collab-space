'use client';

import { FC, useState, useEffect, ChangeEvent } from 'react';
import { collection, getDocs, query, where, orderBy, limit, startAfter, DocumentData } from 'firebase/firestore';
import { db } from '@/app/_firebase/init';
import Sidebar from '../shared/sidebar/Sidebar';
import DashboardHeader from '../dashboard/DashboardHeader';
import Header from '../shared/Header';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import WorkspacesPagination from './WorkspacesPagination';
import { useAuth } from '@/app/_context/AuthContext';
import { Ghost } from 'lucide-react';

interface Workspace {
    id: string;
    name: string;
    emoji: string;
    description: string;
}

const WorkspacesWrapper: FC = () => {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
    const [, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { currentUser } = useAuth();
    const [totalPages, setTotalPages] = useState(1);

    const fetchWorkspaces = async (page: number = 1, reset: boolean = false) => {
        setLoading(true);

        if (!currentUser) return;  // Ensure the user is authenticated

        const collectionRef = collection(db, 'workspaces');
        let q;

        if (search) {
            q = query(
                collectionRef,
                where('creatorId', '==', currentUser.uid),
                where('name', '>=', search),
                where('name', '<=', search + '\uf8ff'),
                orderBy('name'),
                limit(10)
            );
        } else {
            q = query(
                collectionRef,
                where('creatorId', '==', currentUser.uid),  // Filter by creatorId
                orderBy('name'),
                limit(10)
            );
        }

        if (lastDoc && !reset && page > 1) {
            q = query(q, startAfter(lastDoc));
        }

        try {
            const documentSnapshots = await getDocs(q);

            const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
            setLastDoc(lastVisible);

            const newWorkspaces = documentSnapshots.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Workspace[];

            if (reset) {
                setWorkspaces(newWorkspaces);
            } else {
                setWorkspaces((prevWorkspaces) => [...prevWorkspaces, ...newWorkspaces]);
            }

            // Assume you get the total count of documents from somewhere
            const totalCount = 50; // Example total count, update with actual count if available
            setTotalPages(Math.ceil(totalCount / 10));

        } catch (error) {
            console.error("Error fetching workspaces: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkspaces(1, true);
    }, [search, currentUser]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchWorkspaces(page);
    };

    return (
        <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
            <Sidebar />
            <div className='flex flex-col'>
                <DashboardHeader />
                <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
                    <div className='flex items-center'>
                        <Header text='My Workspaces' />
                    </div>
                    <Input placeholder='Search...' value={search} onChange={handleSearchChange} />
                    <div className='ml-4'>
                        <section className='grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-4 lg:p-6'>
                            {workspaces.length > 0 ? (
                                workspaces.map((workspace) => (
                                    <div key={workspace.id} className='group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl'>
                                        <Link href={`/workspace/${workspace.id}`} className='absolute inset-0 z-10' prefetch={false}>
                                            <span className='sr-only'>View {workspace.name}</span>
                                        </Link>
                                        <div className='flex items-center justify-center bg-muted p-6'>
                                            <span className='text-4xl'>{workspace.emoji}</span>
                                        </div>
                                        <div className='bg-background p-4'>
                                            <h3 className='text-xl font-bold'>{workspace.name}</h3>
                                            <p className='text-sm text-muted-foreground'>{workspace.description}</p>
                                            <Button className='mt-5 flex justify-center align-top' variant={'link'}>Detail</Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='text-lg'>
                                    <Ghost className='animate-bounce w-12 h-12' />
                                    <p className='prose prose-p: font-bold dark:text-white text-xl'>You have not created any workspaces yet.</p>
                                </div>
                            )}
                        </section>
                    </div>
                    {totalPages > 1 && (
                        <div className='flex justify-center'>
                            <WorkspacesPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default WorkspacesWrapper;