import { FC } from "react";
import Sidebar from "../shared/sidebar/Sidebar";
import DashboardHeader from "../dashboard/DashboardHeader";

const WorkspacesWrapper: FC = () =>{
    return (
        <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
            <Sidebar />
            <div className="flex flex-col">
                <DashboardHeader />
            </div>
        </div>
    )
}

export default WorkspacesWrapper;