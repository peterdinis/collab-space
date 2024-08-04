import { FC, ReactNode } from 'react';

interface IAuthWrapperProps {
    children?: ReactNode;
}

const AuthWrapper: FC<IAuthWrapperProps> = ({
    children,
}: IAuthWrapperProps) => {
    return (
        <div className='mt-20 flex justify-center align-top'>{children}</div>
    );
};

export default AuthWrapper;