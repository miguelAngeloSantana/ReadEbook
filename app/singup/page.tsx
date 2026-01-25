import Link from "next/link";

import LoginForm from "@/components/FormSingUp";

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center" 
            style ={{ marginTop: "1.9rem" }}
        >
            <div className="w-full max-w-md space-y-8">
                <div className="text-center" style={{marginBottom: "2rem"}}>
                    <h1 className="text-4xl mb-1 text-white" style={{marginBottom: "0.4rem"}}>Login</h1>
                    <p className="text-2x1 text-[#e0e0e0]">Crie uma conta para salvar as informações das viagens </p>
                </div>

                <LoginForm />

                <div className="text-center">
                    <p 
                        className="text-white font-bold text-2x1"
                        style={{ margin: "1.4rem 0"}}
                    >
                        Já tem uma conta 
                        <Link href="/login" className="font-medium hover:underline text-white text-2xl" style={{ marginLeft: "0.4rem" }}>
                            Acesse ela
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}