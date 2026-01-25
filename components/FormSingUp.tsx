"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

// import { submitForm } from "@/actions/actions"

import { authClient } from "@/lib/auth-client";

export default function FormSingUp() {
    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function selectNameUser(nameUSer: string) {
        setName(nameUSer);
    };

    async function selectEmailUser(EmailUSer: string) {
        setEmail(EmailUSer);
    };

      async function selectPasswordlUser(passwordUSer: string) {
        setPassword(passwordUSer);
    };

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        await authClient.signUp.email({
            name: name,
            email: email,
            password: password,
            callbackURL: "/"
        }, {
            onRequest: () => {

            }, 
            onSuccess: () => {
                router.replace("/");
            },
            onError: (ctx) => {
                console.log("Error ao logar: ", ctx);
            }
        })
    };

   return (
        <div className="">
            <form onSubmit={onSubmit} className="w-full flex flex-col items-center justify-center">
                <div className="flex flex-col w-full md:mt-6" style={{marginBottom: "1.75rem"}}>
                    <label className="mb-4 text-white text-xl">Nome</label>
                    <input
                        // value={value}
                        type="text"
                        name="userName"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            selectNameUser(e.target.value)
                        }}
                        className="bg-black rounded-xl text-amber-50"
                        style={{padding: '0.9rem 1rem', marginTop: "0.7rem"}}
                        placeholder="Qual seu nome completo"
                        required
                    />
                </div>

                <div className="flex flex-col w-full" style={{marginBottom: "1.75rem"}}>
                    <label className="mb-4 text-white text-xl">Email</label>
                    <input 
                        // value={value}
                        type="email"
                        name="userEmail"
                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            selectEmailUser(e.target.value)
                        }}
                        placeholder="Qual seu melhor email" 
                        style={{padding: '0.7rem 0.75rem', marginTop: "0.7rem"}}
                        className="bg-black rounded-sm text-amber-50"
                        required
                    />
                </div>

                <div className="flex flex-col w-full" style={{marginBottom: "1.75rem"}}>
                    <label className="mb-4 text-base md:text-xl text-white">Senha</label>
                    <input
                        type="password"
                        name="userPassword"
                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            selectPasswordlUser(e.target.value)
                        }}
                        placeholder="Escolha uma senha"
                        style={{padding: '0.7rem 0.75rem', marginTop: "0.7rem"}}
                        className="bg-black rounded-sm text-amber-50"
                        />
                </div>

               <div className="flex flex-col w-full" style={{marginBottom: "1.75rem"}}>
                    <label className="mb-4 text-base md:text-xl text-amber-50">Confirmar Senha</label>
                    <input 
                        type="password"
                        placeholder="Digite a mesma senha que colocou anteriormente"
                        style={{padding: '0.7rem 0.75rem', marginTop: "0.7rem"}}
                        className="bg-black rounded-sm text-amber-50"
                        />
                </div> 

               <button 
                    type="submit" 
                    className="bg-gray-50 w-full text-black rounded-4xl font-bold cursor-pointer" 
                    style={{padding: "0.7rem 0", marginBottom: "0.5rem"}}
                >
                    Cadastrar
                </button> 
            </form>
        </div>
   )
}