'use client';

import { IAnimationWrapperProps } from '@/app/_types/globalTypes';
import { motion } from 'framer-motion';
import type { FC } from 'react';

const AnimationWrapper: FC<IAnimationWrapperProps> = ({
    children,
    className,
    ...props
}: IAnimationWrapperProps) => {
    return (
        <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            whileInView={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default AnimationWrapper;
