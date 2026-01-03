"use client";

import { useState, KeyboardEvent } from "react";

import Image from "next/image";

import { getTitleBooks } from "@/action/getTitleBook";


interface BookSearchType {
    cover_i: number
    title: string
    key: string
    author_name: string[]
    cover_edition_key: string
};

export default function SearchBar() {
    const [ userTitleSearch, setUserTitleSearch ] = useState<string>("");
    const [ bookInfo, setBookInfo ] = useState<BookSearchType[]>([]);

    function handleText(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        setUserTitleSearch(e.target.value);

        if (userTitleSearch.trim() === "") {
            setBookInfo([]);
        };

    };


    async function handleTitleSearch(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            
            const searhBookTitle = await getTitleBooks(userTitleSearch.replace(" ", "+").trim());
            setBookInfo(searhBookTitle);

            if (!searhBookTitle.length) {
                console.log("testse")
                alert('Desculpe, mas não temos o ebook no momento ');
                // return <p className="text-amber-50">Desculpe, mas não temos o ebook no momento </p>
            };
        };
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <input 
                type="text" 
                placeholder="Procure um livro especifico..." 
                className="bg-white w-[85%] border-none outline-0 rounded-2xl"
                style={{marginTop: "1.6rem", padding: "1rem "}}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleText(e)
                }}
                onKeyDown={handleTitleSearch}
            />

           {
            bookInfo.length > 0 && (
                <div 
                    className="flex flex-row flex-wrap items-center justify-center w-full" 
                    style={{ marginTop: "1.3rem"}}    
                >
                    <ul 
                        className="flex flex-row items-center justify-center flex-wrap w-[83rem]"
                        style={{ gap: "2.8rem", padding: "0 0.8rem" }}
                    >
                        {
                            bookInfo.map(item => (
                                <li 
                                className="flex flex-col items-center"
                                
                                key={item.key}
                            >
                                { item.cover_i ? <Image 
                                        src={`https://covers.openlibrary.org/b/id/${item.cover_i}.jpg` } 
                                        alt="capa do livro"
                                        width={'160'}
                                        height={'160'}
                                    />: <div 
                                        className="w-[160] h-[240] bg-amber-50 flex items-center justify-center text-center">
                                            {item.title}
                                        </div>}
                    

                                    <p 
                                        className="text-white text-bold text-center text-lg"
                                        style={{ marginTop: "1rem"}}
                                    >{item.title}</p>
                                    
                                    <p 
                                        className="text-[rgba(245,245,245, 0.8)] text-center text-sm"
                                        style={{ marginTop: "0.8rem" ,color: "rgba(245,245,245, .8)"}}    
                                    >{item.author_name}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )
           }
        </div>
    );
};