-- CreateTable
CREATE TABLE "ebook" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ebook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ebook" ADD CONSTRAINT "ebook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
