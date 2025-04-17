/*
  Warnings:

  - You are about to drop the column `mainPost` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_mainPost_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "mainPost",
ADD COLUMN     "mainPostId" UUID;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mainPostId_fkey" FOREIGN KEY ("mainPostId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
