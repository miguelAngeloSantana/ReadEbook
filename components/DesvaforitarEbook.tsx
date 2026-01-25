"use client";

import { useParams } from "next/navigation"

import { deleteEbook } from "@/action/uptadeStatusReading";
import { authClient } from "@/lib/auth-client";

export default function DesfavoritarEbook() {

    const params = useParams();

    const session = authClient.useSession(); 

    async function handleDesfavoriteEbook() {
        const id = String(params.id);

        if (!session.data?.user.id) return;

        await deleteEbook(id);

        window.location.reload();
    };

    return (
        <>   
        
            <button 
                className="bg-red-500 rounded-[100px] font-bold w-full md:w-[50%] cursor-pointer"
                style={{ padding: "1rem" }}
                type="button"
                value="Desfavoritar"
                onClick={handleDesfavoriteEbook}
            >
                Desfavoritar
            </button>
        </>
    )
}