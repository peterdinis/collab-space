import { FC } from "react";

interface IHeaderProps {
    text: string;
}

const Header: FC<IHeaderProps> = ({text}: IHeaderProps) => {
    return (
        <h1 className="text-3xl mt-5 ml-4 dark:text-white font-bold prose prose-h1:">
            {text}
        </h1>
    )
}

export default Header;