"use client";

import { useParams } from "next/navigation"

import { uptadeStatusReading } from "@/action/uptadeStatusReading";
import { authClient } from "@/lib/auth-client";

export default function FavoritarEbook(
    {title, imageLink, linkBuyFree, linkRead}: 
    {title: string, imageLink: string, author: string, linkBuyFree: string, linkRead: string}
) {

    const params = useParams();
    const session = authClient.useSession(); 

    async function handleFavoriteEbook() {
        const id = String(params.id);
        
        if (!session.data?.user.id) return;

        await uptadeStatusReading(session.data?.user.id, {
            id: id,
            title: title,
            // author: author,
            linkFreeRead: linkBuyFree,
            linkRead: linkRead,
            imageLink: imageLink
        });

        window.location.reload();
    };

    return (
        <>   
        
            <button 
                className="bg-red-500 rounded-[100px] font-bold w-full md:w-[50%] cursor-pointer"
                style={{ padding: "1rem" }}
                type="button"
                value="favorirar"
                onClick={handleFavoriteEbook}
            >
                Favoritar
            </button>
        </>
    )
}