-- AlterTable
ALTER TABLE "ebook" ADD COLUMN     "isReading" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "ebook_userId_idx" ON "ebook"("userId");
