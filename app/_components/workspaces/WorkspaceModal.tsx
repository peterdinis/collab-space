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
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { addDoc, collection } from 'firebase/firestore';
import { formSchema } from './workspaceFormSchema';
import { db } from '@/app/_firebase/init';

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

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setSelectedEmoji(emojiData.emoji);
        form.setValue('emoji', emojiData.emoji);
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
            <DialogTrigger>New Workspace</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='prose-h1: prose flex justify-center align-top text-3xl font-bold dark:text-blue-50'>
                        New Workspace
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
                                            <FormLabel>Workspace Name</FormLabel>
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
                                <FormField
                                    control={form.control}
                                    name='emoji'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Workspace Logo</FormLabel>
                                            <FormControl>
                                                <div className='flex items-center space-x-4'>
                                                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                                                    <div className='text-2xl'>
                                                        {selectedEmoji || 'No emoji selected'}
                                                    </div>
                                                </div>
                                                <input
                                                    type='hidden'
                                                    {...field}
                                                    value={selectedEmoji}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Choose an emoji for your workspace.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='isPublic'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Public Workspace</FormLabel>
                                            <FormControl>
                                                <Checkbox
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
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CreateWorkspaceModal;