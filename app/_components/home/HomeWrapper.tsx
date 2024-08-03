import { FC } from "react";

const HomeWrapper: FC = () => {
    return (
        <div className="flex min-h-full flex-col dark:bg-[#1F1F1F]">
             <div className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 pb-10 text-center md:justify-start">
                <div className="max-4xl space-y-4">
                    <main className="h-full pt-40">
                        COLLAP SPACE
                    </main>
                </div>
             </div>
        </div>
    )
}

export default HomeWrapper;