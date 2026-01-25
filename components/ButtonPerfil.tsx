"use client";

import { useRouter } from "next/navigation";

export default function ButtonPerfil() {
    const router = useRouter();

    return (
        <>
            <button 
                className="bg-blue-200 rounded-3xl text-[#121212] font-bold cursor-pointer"
                style={{padding: "0.8rem"}}
                onClick={() => router.push("/perfil")}
            >
                Favoritos
            </button>
        </>
    )
}