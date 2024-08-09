"use client"

import { FC, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/_firebase/init";
import Header from "../shared/Header";
import Sidebar from "../shared/sidebar/Sidebar";

const TeamInfo: FC = () => {
    const {id} = useParams<{id: string}>();
    const [team, setTeam] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                if (!id) throw new Error("Team ID not found");
                const docRef = doc(db, "teams", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTeam(docSnap.data());
                } else {
                    throw new Error("No such team!");
                }
            } catch (err) {
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log("D", team);

    return (
        <div className='mt-32'>
            <Header text="INFO" />
            <Sidebar />
        </div>
    )
}

export default TeamInfo;