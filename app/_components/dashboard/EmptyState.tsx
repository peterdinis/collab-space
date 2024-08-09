import { FC } from 'react';

const EmptyState: FC = () => {
    return (
        <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
            <div className='flex flex-col items-center gap-1 text-center'>
                <h3 className='text-2xl font-bold tracking-tight'>
                    Hey Welcome here
                </h3>
                <p className='mt-5 text-xl text-muted-foreground'>
                    Create new workspace or team to get started.
                </p>
            </div>
        </div>
    );
};

export default EmptyState;
