"use client";

import { useRouter } from "next/navigation";

import { authClient } from "../lib/auth-client"

export default function ButtonLogout() {

    const router = useRouter();

    async function singOut() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.replace("/")
                }
            }
        })
    }

    return (
        <>
            <button 
                    className="rounded-xl cursor-pointer" 
                    style={{padding: "0.74rem"}}
                    type="button"
                    onClick={singOut}
                >
                    Deslogar
                </button>
        </>
    )
}