"use server";

interface BookInfoType {
    cover_i: number;
    title: string;
    key: string;
    author_name: string[];
    cover_edition_key: string
};

interface BookType {
    docs:BookInfoType[];
};

export async function getTitleBooks(title: string) {
    const dataForTitle = await fetch(`https://openlibrary.org/search.json?title=${title}`, {cache: "no-cache"});

    if(!dataForTitle.ok) {
        throw new Error("Error ao buscaAS as dados do titulo");
    };

    const dataForTitleJson: BookType = await dataForTitle.json();


    const data = dataForTitleJson.docs.slice(0, 20).map((single) => {
        const { title, cover_i, key, author_name, cover_edition_key } = single;

        return {
            key,
            title,
            cover_i,
            author_name,
            cover_edition_key,
        };

    });
    return data;
};