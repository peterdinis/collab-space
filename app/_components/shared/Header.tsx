import { FC } from 'react';

interface IHeaderProps {
    text: string;
}

const Header: FC<IHeaderProps> = ({ text }: IHeaderProps) => {
    return (
        <h1 className='prose-h1: prose ml-4 mt-5 text-3xl font-bold dark:text-white'>
            {text}
        </h1>
    );
};

export default Header;
