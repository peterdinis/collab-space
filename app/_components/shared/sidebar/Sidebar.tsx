'use client';

import Link from 'next/link';
import { FileText, Home, LogOut, Package, Users, Users2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/app/_context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import CreateTeamModal from '../../teams/CreateTeamModal';

const Sidebar = () => {
    const { currentUser, logout } = useAuth();

    const { toast } = useToast();

    const router = useRouter();

    const logoutFromApp = () => {
        logout();
        toast({
            title: 'Succesfully logged out',
            duration: 2000,
            className: 'bg-green-800 text-white font-bold',
        });
        router.push('/');
    };

    return (
        <div className='hidden border-r bg-muted/40 pt-20 md:block'>
            <div className='flex h-full max-h-screen flex-col gap-2'>
                <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
                    <div className='flex items-center gap-2 font-semibold'>
                        <span>Welcome {currentUser?.email}</span>
                    </div>
                </div>
                <div className='flex-1'>
                    <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
                        <Link
                            href='/dashboard'
                            className='flex items-center gap-3 rounded-lg px-3 py-2 text-xl font-bold text-muted-foreground transition-all hover:bg-muted hover:text-primary'
                        >
                            <Home className='h-5 w-5' />
                            Dashboard
                        </Link>
                        <Link
                            href='/teams'
                            className='mt-5 flex items-center gap-3 rounded-lg px-3 py-2 text-xl font-bold text-muted-foreground transition-all hover:bg-muted hover:text-primary'
                        >
                            <Users className='h-5 w-5' />
                            Teams
                        </Link>
                        <Link
                            href='/workspaces'
                            className='mt-5 flex items-center gap-3 rounded-lg px-3 py-2 text-xl font-bold text-muted-foreground transition-all hover:bg-muted hover:text-primary'
                        >
                            <Package className='h-5 w-5' />
                            Workspaces
                        </Link>

                        <div
                            className='mt-5 flex items-center gap-3 rounded-lg px-3 py-2 text-xl font-bold text-muted-foreground transition-all hover:bg-muted hover:text-primary'
                        >
                            <Users2 className='h-5 w-5' />
                            <CreateTeamModal />
                        </div>

                        <Link
                            href='/workspaces'
                            className='mt-5 flex items-center gap-3 rounded-lg px-3 py-2 text-xl font-bold text-muted-foreground transition-all hover:bg-muted hover:text-primary'
                        >
                            <FileText className='h-5 w-5' />
                            Create new workspace
                        </Link>

                        <span
                            onClick={logoutFromApp}
                            className='mt-5 flex items-center gap-3 rounded-lg px-3 py-2 text-xl font-bold text-muted-foreground transition-all hover:bg-muted hover:text-primary'
                        >
                            <LogOut className='h-5 w-5' />
                            Logout
                        </span>
                    </nav>
                </div>
                <div className='mt-auto p-4'>
                    <Card x-chunk='dashboard-02-chunk-0'>
                        <CardHeader className='p-2 pt-0 md:p-4'>
                            <CardTitle>Upgrade to Pro</CardTitle>
                            <CardDescription>
                                Unlock all features and get unlimited access to
                                our support team.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
                            <Button size='sm' className='w-full'>
                                Upgrade
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
