import Image from "next/image";
import Link from "next/link";

import { CalendarDays, BookText, FileDigit } from "lucide-react";

import { showEbook } from "@/action/uptadeStatusReading";
import DesfavoritarEbook from "@/components/DesvaforitarEbook";
import FavoritarEbook from "@/components/FavoritarEbook";

interface Props {
    params: { id: string }
};

interface VolumeInfoProps {
    title: string;
    authors: string;
    publishedDate: string; 
    description: string;    
    pageCount: number;
    categories: string[]
    imageLinks: { thumbnail: string };
    infoLink: string;
};

interface AcessInfoProps {
    epub: {downloadLink: string}
};

interface VolumeDoc {
    volumeInfo: VolumeInfoProps;
    accessInfo: AcessInfoProps
};

interface DataBookProps {
    items: VolumeDoc[];
};

export default async function PageDetails({params}: Props) {
    const { id } = await params;

    const ebook = await showEbook(id);

    const dataFromTitle = await fetch(`
        https://www.googleapis.com/books/v1/volumes/${id}`, 
        {cache: "no-cache"});
    if (!dataFromTitle.ok) {
        throw new Error("Error ao buscar dados na API Google Book");
    }
    const dataTitleJson: VolumeDoc = await dataFromTitle.json();

    const dataAuthor = await fetch(`
        https://www.googleapis.com/books/v1/volumes?q=inauthor:${dataTitleJson.volumeInfo.authors}&maxResults=4&key=${process.env.API_KEY}`
    )

    if (!dataAuthor.ok) {
        throw new Error("Error ao buscar outras outras bibras do autor");
    };

    const dataAuthorJson:DataBookProps = await dataAuthor.json()
    const dataPublisher = dataAuthorJson.items.slice(0, 34).map((books) => {
        const { title, imageLinks, infoLink } = books.volumeInfo;

        return {
           title, imageLinks, infoLink
        };
    });

    const dataCategory = await fetch(`
        https://www.googleapis.com/books/v1/volumes?q=${dataTitleJson.volumeInfo.categories}&maxResults=4`
    );

    if(!dataCategory.ok) {
        throw new Error("Error ao buscar obras similares");
    };

    const dataCategoryJson:DataBookProps = await dataCategory.json();
    const dataArrayCategory = dataCategoryJson.items.slice(0, 34).map((category) => {
        const { title, imageLinks, infoLink } = category.volumeInfo;

        return {
            title,
            imageLinks,
            infoLink
        };
    });

    return (
        <>
            <div 
                className="flex flex-row justify-center w-full"
                style={{ marginTop: '2.2rem' }}
            >
                <div className="flex flex-col md:flex-row justify-center md:justify-around w-[80%]">
                    <div 
                        className="flex flex-col text-center text-amber-50"
                        style={{ marginBottom: "1.4rem" }}
                    >
                        <div className="flex flex-col md:flex-row justify-center md:justify-between" style={{ gap: "4rem" }}>
                            <div className="flex flex-col items-center w-full md:w-[50%]">
                                <Image 
                                    src={dataTitleJson.volumeInfo.imageLinks.thumbnail} 
                                    width={450}
                                    height={450}
                                    alt="Capa do Livro"
                                    className="w-full md:w-[320px]"
                                />

                                <div className="flex w-full" style={{ marginTop: "0.7rem", gap: "1.3rem" }}>
                                    {
                                        dataTitleJson.accessInfo.epub.downloadLink ?
                                    <Link 
                                        href={dataTitleJson.accessInfo.epub.downloadLink}
                                        target="_blank"
                                        className="bg-red-500 rounded-[100px] font-bold w-full md:flex-[50%]"
                                        style={{ padding: "1rem" }}
                                    >
                                        Leia de graça
                                    </Link> :
                                    <Link 
                                        href={dataTitleJson.volumeInfo.infoLink}
                                        target="_blank"
                                        className="bg-red-500 rounded-[100px] font-bold w-full md:flex-[50%]"
                                        style={{ padding: "1rem" }}
                                    >
                                        Compre/Alugue
                                    </Link>

                                    }

                                    {
                                        ebook?.isReading === true ? <DesfavoritarEbook />:  
                                        <FavoritarEbook 
                                            title={dataTitleJson.volumeInfo.title} 
                                            imageLink={dataTitleJson.volumeInfo.imageLinks.thumbnail}
                                            author={dataTitleJson.volumeInfo.authors}   
                                            linkBuyFree={dataTitleJson.accessInfo.epub.downloadLink} 
                                            linkRead={dataTitleJson.volumeInfo.infoLink}
                                        />
                                    }
                                    {/* <FavoritarEbook /> */}

                                    {/* <button 
                                        className="bg-red-500 rounded-[100px] font-bold w-full md:w-[50%]"
                                        style={{ padding: "1rem" }}
                                    >
                                        Favoritar
                                    </button> */}
                                </div>
                            </div>
                            <div className="flex flex-col w-full">

                                <h1 className="text-2xl text-bold" style={{ margin: "1.1rem" }}>{dataTitleJson.volumeInfo.title}</h1>
                                <p className="text-[#e0e0e0] text-lg">{dataTitleJson.volumeInfo.authors}</p>
                                <p className="text-base md:text-xl" style={{ margin: "1.4rem" }}>{dataTitleJson.volumeInfo.description}</p>
                               
                                <div  style={{ marginTop: "1.7rem" }}>
                                    <h2 className="text-lg" style={{ marginBottom: "0.9rem" }}>Dados sobre o livro</h2>

                                    <div className="flex flex-col md:flex-row items-center justify-between" style={{ gap: "1.4rem" }}>
                                        <div className="flex" style={{ gap: "1rem" }}>
                                            <BookText />
                                            <p>{dataTitleJson.volumeInfo.categories}</p>
                                        </div>

                                        <div className="flex" style={{ gap: "1rem" }}>
                                            <FileDigit />
                                            <p className="text-[#e0e0e0]">Número de páginas: 
                                                <span className="font-bold" style={{ marginLeft: "0.4rem" }}>{dataTitleJson.volumeInfo.pageCount}</span>
                                            </p>
                                        </div>


                                        <div className="flex" style={{ gap: "1rem" }}>
                                            <CalendarDays />
                                            <p>{dataTitleJson.volumeInfo.publishedDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className="flex flex-col" style={{ marginTop: "1.8rem" }}>
                            <h2 className="text-lg" style={{ margin: "1.8rem 0" }}>Outras obras do/a {dataTitleJson.volumeInfo.authors}</h2>
                            <div className="flex flex-col md:flex-row justify-between items-center w-full">
                            {
                                dataPublisher.map(bookAuthor => (
                                    <Link 
                                        className="flex flex-col justify-center items-center flex-1" 
                                        key={id} 
                                        href={bookAuthor.infoLink} 
                                        target="_blank"
                                    >
                                        {
                                                            
                                            bookAuthor.imageLinks ?
                                            <Image 
                                                alt="Capa do livro"
                                                width={340}
                                                height={340}
                                                src={`${bookAuthor.imageLinks.thumbnail}.jpg`}
                                                className="w-52"
                                                style={{ margin: "1.3rem 0" }}
                                            /> :
                                            <div>

                                                <div
                                                    className="w-[220] h-[340] text-black bg-amber-50 flex items-center justify-center text-center"
                                                    style={{ margin: "1.3rem 0" }}
                                                >
                                                    {bookAuthor.title}
                                                </div>
                                            </div>
                                        }
                                        <p className="font-bold text-xl">{bookAuthor.title}</p>
                                    </Link>
                                ))
                            }
                            </div>
                        </div>            

                        <div className="flex flex-col" style={{ marginTop: "6rem" }}>
                            <h2 className="text-xl font-bold" style={{ marginBottom: "2.2rem" }}>Obras similares</h2>
                            <div className="flex flex-col md:flex-row justify-between items-center w-full">
                                {
                                    dataArrayCategory.map(cate => (
                                        <Link 
                                            className="flex flex-col justify-center items-center flex-1" 
                                            key={cate.title} 
                                            href={cate.infoLink}
                                            target="_blank"
                                        >
                                            {
                                                cate.imageLinks?
                                                <Image 
                                                src={`${cate.imageLinks.thumbnail}.jpg`}
                                                alt="Capa do livro"
                                                width={340}
                                                height={340}
                                                className="w-52"
                                                style={{ margin: "1.3rem 0" }}
                                            />:
                                            <div>

                                                <div
                                                    className="w-[220] h-[340] text-black bg-amber-50 flex items-center justify-center text-center"
                                                    style={{ margin: "1.3rem 0" }}
                                                >
                                                    {cate.title}
                                                </div>
                                            </div>

                                            }
                                            <p className="font-bold text-xl">{cate.title}</p>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>            
                    </div>
                </div>
            </div> 
        </>
    )
}