'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

const useRegisterUser = () => {
    const {toast} = useToast();
    const router = useRouter();

    return useMutation({
        mutationKey: ['registerUser'],
        mutationFn: async (data: any) => {
            await axios.post('/api/register', data);
        },
        onSuccess: () => {
            toast({
                title: "Register DONE",
                duration: 2000,
                className: "bg-green-800 text-white font-bold"
            })
            router.push('/login');
        },
        onError: () => {
            toast({
                title: "Register FAILED",
                duration: 2000,
                className: "bg-red-800 text-white font-bold"
            })
        },
    });
};

export default useRegisterUser;