'use client';

import { FC } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const CreateTeamModal: FC = () => {
    return (
        <Dialog>
            <DialogTrigger>Create new team</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='flex justify-center align-top font-bold text-3xl dark:text-blue-50 prose prose-h1: '>New Team</DialogTitle>
                    <DialogDescription className='mt-5'>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTeamModal;
