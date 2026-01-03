import { getDataBook } from "@/action/getDataBook";

import Link from "next/link";

export default async function RecentBookAdd() {
   const booksRes = await getDataBook();
//    console.log(booksRes)
   if (!booksRes.length) {
        return <p className="text-white text-center" style={{marginTop: "1.4rem"}}>Nenhum atualização hoje...</p>
   };


   
    return (
        <>
            <p>Atualizações de hoje</p>
            <div className="flex flex-row justify-center items-center flex-1">
                <div style={{marginTop: "1rem", padding: "0 2rem"}}>
                    <ul className="flex flex-1">
                        {
                            booksRes.map(changes => (
                                <li 
                                    key={changes.key} 
                                    className="border border-amber-50" 
                                    style={{margin: "0 0.8rem", padding: "0.6rem"}}
                                >
                                    <p 
                                        className="text-white font-bold" 
                                        style={{marginBottom: "0.7rem"}}
                                    >
                                        ]{changes.title}
                                    </p>
                                    <p className="text-red-400">{changes.author}</p>
                                    <Link 
                                        href={changes.url}
                                        target="_blank"
                                        className="text-blue-400 cursor-pointer"
                                    >
                                        Baixar livro
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
        </div>
        </>
    );
};