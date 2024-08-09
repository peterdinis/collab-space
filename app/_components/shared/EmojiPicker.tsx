'use client';
import dynamic from 'next/dynamic';
import { FC, ReactNode } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

interface EmojiPickerProps {
    children: ReactNode;
    getValue?: (emoji: string) => void;
}

const EmojiPicker: FC<EmojiPickerProps> = ({ children, getValue }) => {
    const Picker = dynamic(() => import('emoji-picker-react'));
    const onClick = (selectedEmoji: { emoji: string }) => {
        if (getValue) getValue(selectedEmoji.emoji);
    };
    return (
        <div className='flex items-center'>
            <Popover>
                <PopoverTrigger className='cursor-pointer'>
                    {children}
                </PopoverTrigger>
                <PopoverContent className='border-none p-0'>
                    <Picker onEmojiClick={onClick} />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default EmojiPicker;
