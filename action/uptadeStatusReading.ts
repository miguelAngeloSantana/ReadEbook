"use server";

import { prisma } from "@/lib/prisma";

interface BookProps {
    id: string
    title: string 
    // author: string
    imageLink: string
    linkFreeRead: string 
    linkRead: string
};

export async function uptadeStatusReading(userID: string, data: BookProps) {

    await prisma.ebooks.create({
        data: {
            id: data.id,
            title: data.title,
            // author: data.author,
            imageLink: data.imageLink,
            linkBuyFree: data.linkFreeRead,
            linkRead: data.linkRead,
            userId: userID
        },
    });

    await prisma.ebooks.update({
            where: {
                id: data.id
            },
            data: {
                isReading: true
            }
    });

    return await prisma.ebooks.findMany({
            where: {
                id: data.id
            }
    });
};

export async function deleteEbook(userID: string) {
    const t =  await prisma.ebooks.delete({
        where: {
            id: userID
        }
    });

    console.log("Dele", t)
    return await prisma.ebooks.delete({
        where: {
            id: userID
        }
    });
};

export async function showFavorites() {
    return prisma.ebooks.findMany({
        where: {
            isReading: true
        }
    });
};

export async function showEbook(userID: string) {
    return await prisma.ebooks.findUnique({
        where: {
            id: userID
        }
    });
};