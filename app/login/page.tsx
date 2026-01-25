import Link from "next/link";

import FormLogin from "@/components/FormLogin";

export default function Registro() {
     return (
        <div 
            className="flex flex-col items-center justify-center"
            style={{ marginTop: "4rem" }}
        >
            <div className="w-full max-w-md space-y-8">
                <div className="text-center" style={{marginBottom: "2rem"}}>
                    <h1 className="text-3xl md:text-5xl mb-1 text-white font-bold" style={{marginBottom: "0.4rem"}}>Login</h1>
                    <p className="text-xl text-[#e0e0e0]">Entre com suas credencias</p>
                </div>

                <FormLogin />

                <div className="text-center">
                    <p className="text-3x1 text-[#e0e0e0]" style={{ margin: "1.2rem 0" }}>Não tem uma conta</p>
                    <Link href="/singup" className="font-medium hover:underline text-white text-3xl">Crie uma</Link>
                </div>
            </div>
        </div>
   )
};