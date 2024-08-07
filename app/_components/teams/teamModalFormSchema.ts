import { z } from 'zod';

export const formSchema = z.object({
    name: z.string().min(2, {
        message: 'name must be at least 2 characters.',
    }),

    description: z.string().min(2, {
        message: "Description for teams must be at least 2 characters"
    })
});
