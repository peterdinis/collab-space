'use client';

import { useToast } from '@/components/ui/use-toast';
import { useCallback, useState } from 'react';
import { CopiedValue, CopyFn } from '../_types/hookTypes';

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
    const [copiedText, setCopiedText] = useState<CopiedValue>(null);
    const { toast } = useToast();
    const copy: CopyFn = useCallback(
        async (text) => {
            if (!navigator?.clipboard) {
                console.warn('Clipboard not supported');
                return false;
            }

            try {
                await navigator.clipboard.writeText(text);
                setCopiedText(text);
                toast({
                    title: 'Copied',
                    duration: 2000,
                    className: 'bg-green-500 text-blue-50',
                });
                return true;
            } catch (error) {
                toast({
                    title: 'Not Copied',
                    duration: 2000,
                    className: 'bg-red-500 text-blue-50',
                });

                setCopiedText(null);
                return false;
            }
        },
        [toast],
    );

    return [copiedText, copy];
}
