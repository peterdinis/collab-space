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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formSchema } from './teamModalFormSchema';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const CreateTeamModal: FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    });

    const {toast} = useToast();

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        toast({
            title: "Team was created",
            duration: 2000,
            className: "bg-green-800 text-white font-bold"
        })
        console.log(values);
    }

    return (
        <Dialog>
            <DialogTrigger>Create new team</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='prose-h1: prose flex justify-center align-top text-3xl font-bold dark:text-blue-50'>
                        New Team
                    </DialogTitle>
                    <DialogDescription className='mt-5'>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='space-y-8'
                            >
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Team Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='shadcn'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is your public display
                                                name.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type='submit'>Submit</Button>
                            </form>
                        </Form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTeamModal;
