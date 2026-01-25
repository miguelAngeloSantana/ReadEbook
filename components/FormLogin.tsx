"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";


export default function FormLogin() {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function onSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        await authClient.signIn.email({
            email: email,
            password: password,
            callbackURL: "/"
        }, {
            onRequest: () => {},
            onSuccess: (ctx) => {
                console.log("Logado com sucesso: ", ctx);
                router.replace("/");
            },
            onError: (ctx) => {
                console.log("Error ao entrar: ", ctx);
                if (ctx.error.message === "Invalid email or password") {
                    alert("Email ou senha incorretos");
                }
            }
        })
    }
    
    return (
        <form onSubmit={onSubmit} className="w-full flex flex-col items-center justify-center">
                <div className="flex flex-col w-full" style={{marginBottom: "1.75rem"}}>
                    <label className="mb-4 text-white">Email</label>
                    <input 
                        type="email"
                        placeholder="Qual seu melhor email" 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value)
                        }}
                        style={{padding: '0.7rem 0.75rem', marginTop: "0.7rem"}}
                        className="bg-black rounded-sm text-amber-50"
                        required
                    />
                </div>

                <div className="flex flex-col w-full" style={{marginBottom: "1.75rem"}}>
                    <label className="mb-4 text-sm md:text-base text-white">Senha</label>
                    <input 
                        type="password"
                        placeholder="Escolha uma senha"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value)
                        }}
                        style={{padding: '0.7rem 0.75rem', marginTop: "0.7rem"}}
                        className="bg-black rounded-sm text-amber-50"
                        />
                </div>

                <button type="submit" className="bg-gray-50 w-full text-black rounded-4xl font-bold cursor-pointer" 
                    style={{padding: "0.7rem 0", marginBottom: "0.5rem"}}
                >
                    Entrar
                </button>
            </form>
    )
}