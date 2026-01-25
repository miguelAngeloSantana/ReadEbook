import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { showFavorites } from "@/action/uptadeStatusReading";

import Image from "next/image";
import DesfavoritarEbook from "@/components/DesvaforitarEbook";
import Link from "next/link";
 
export default async function Perfin() {
    const section = await auth.api.getSession({
        headers: await headers()
    });

    if (!section?.user.id) return;

    const ebooksFavorites = await showFavorites();

    return (
        <>
            <div className="w-full" style={{ marginTop: "1.4rem" }}>
                <ul className="flex flex-col md:flex-row justify-center items-center w-full md:w-[70%]" style={{gap: "8rem"}}>
                    {
                        ebooksFavorites.map((ebook) => (
                            ebook.title && (

                            <li key={ebook.id}>
                                {
                                    ebook.imageLink &&
                                    <Image src={`${ebook.imageLink}`} alt="Capa do livro" width={300} height={300}/>
                                }
                                <h1 className="text-amber-50 text-xl font-bold" style={{ margin: "1.2rem 0 2rem 0" }}>
                                    {ebook.title}
                                </h1>

                                <div className="flex w-full text-center" style={{ marginTop: "0.7rem", gap: "1.3rem" }}>
                                    
                                   <Link 
                                        href={`/pagedetails/${ebook.id}`}
                                        target="_blank"
                                        className="bg-red-500 rounded-[100px] font-bold w-full md:flex-[50%]"
                                        style={{ padding: "1rem" }}
                                    >
                                        Detalhes
                                    </Link>

                                    <DesfavoritarEbook />
                                </div>
                            </li>
                            )
                        ))
                    }
                </ul>
            </div>
        </>
    )
}