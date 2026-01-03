"use server";

interface Change {
  key: string;
  revision: number;
}

interface ApiItem {
  changes: Change[];
}

interface ApiValueProps {
    key: string
    title: string
    author: string
    url: string 
    "valor": string
    img: string
}

export async function getDataBook() {
    const lastChangeBook = await fetch("https://openlibrary.org/recentchanges.json?limit=5", {cache: "no-cache"});
    if(!lastChangeBook.ok) {
        throw new Error("Error ao buscaAS as mudanças")
    }

    const recentchanges: ApiItem[] = await lastChangeBook.json()

    const bookId = recentchanges
        .flatMap(item => item.changes)
        .map(change => change.key)
        .filter(key => key.startsWith("/books/"))

        .map(key => key.replace("/books/", ""))
    
    const book = await Promise.all(
        bookId.map(async(bookID) => {
            try {
                const res = await fetch(`https://openlibrary.org/books/${bookID}.json`, {cache: "no-cache"})
                if (!res.ok) return null;

                const data = await res.json();

                const image = await fetch(`https://openlibrary.org/search.json?title=${data.title}`, {
                    cache: "no-cache"
                })


                const imageFormat = await image.json();

                return {
                    key: data.key,
                    title: data.title,
                    author: data.author,
                    url: `https://openlibrary.org${data.key}`,
                    img: imageFormat[0].cover_i
                } as ApiValueProps
            } catch {
                return null;
            }
        })
    )

    return book.filter((book): book is ApiValueProps => book !== null);
}