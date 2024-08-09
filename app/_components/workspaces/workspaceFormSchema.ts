import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    emoji: z.string().min(1, {
        message: 'Please select an emoji.',
    }),
    isPublic: z.boolean().optional(),
});
