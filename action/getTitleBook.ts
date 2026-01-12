"use server";

interface VolumeInfoProps {
    title: string;
    authors: string;
    imageLinks: { thumbnail: string };
};

interface VolumeDoc {
    volumeInfo: VolumeInfoProps;
    id: string;
};

interface BookType {
    items: VolumeDoc[];
};

export async function getTitleBooks(title: string) {
    const dataForTitle = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&filter=ebooks`);

    if(!dataForTitle.ok) {
        throw new Error("Error ao buscaAS as dados do titulo");
    };

    const dataForTitleJson: BookType = await dataForTitle.json();


    const data = dataForTitleJson.items.slice(0, 20).map((single) => {
        const { title, authors, imageLinks } = single.volumeInfo;

        return {
            id: single.id, 
            title, 
            authors,
            imageLinks,
        };

    });

    return data;
};