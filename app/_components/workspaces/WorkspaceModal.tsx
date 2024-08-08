'use client';

import { FC, useState } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { addDoc, collection } from 'firebase/firestore';
import { formSchema } from './workspaceFormSchema';
import { db } from '@/app/_firebase/init';
import EmojiPicker from '../shared/EmojiPicker';

const CreateWorkspaceModal: FC = () => {
    const [selectedEmoji, setSelectedEmoji] = useState<string>('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            emoji: '',
            isPublic: false,
        },
    });

    const { toast } = useToast();

    const handleEmojiSelect = (emoji: string) => {
        setSelectedEmoji(emoji);
        form.setValue('emoji', emoji);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await addDoc(collection(db, 'workspaces'), {
                name: values.name,
                emoji: values.emoji,
                isPublic: values.isPublic,
                createdAt: new Date(),
            });

            toast({
                title: 'Workspace was created',
                duration: 2000,
                className: 'bg-green-800 text-white font-bold',
            });

            console.log('Workspace created:', values);
        } catch (error) {
            toast({
                title: 'Failed to create workspace',
                duration: 4000,
                className: 'bg-red-800 text-white font-bold',
            });
            console.error('Error creating workspace:', error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                New Workspace
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-3xl font-bold dark:text-blue-50'>
                        New Workspace
                    </DialogTitle>
                </DialogHeader>
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
                                        <FormLabel>Workspace Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='shadcn'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormItem>
                                <FormLabel>Workspace Logo</FormLabel>
                                <div className='flex items-center space-x-4'>
                                    <EmojiPicker getValue={handleEmojiSelect}>
                                        <div className='text-2xl cursor-pointer'>
                                            {selectedEmoji || 'Select an emoji'}
                                        </div>
                                    </EmojiPicker>
                                </div>
                                <input
                                    type='hidden'
                                    {...form.register('emoji')}
                                    value={selectedEmoji}
                                />
                                <FormDescription>
                                    Choose an emoji for your workspace.
                                </FormDescription>
                            </FormItem>

                            <FormField
                                control={form.control}
                                name='isPublic'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Public Workspace</FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                className="size-3 ml-5"
                                                checked={field.value}
                                                onCheckedChange={(checked) =>
                                                    field.onChange(!!checked)
                                                }
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Make the workspace public.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit'>Submit</Button>
                        </form>
                    </Form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default CreateWorkspaceModal;