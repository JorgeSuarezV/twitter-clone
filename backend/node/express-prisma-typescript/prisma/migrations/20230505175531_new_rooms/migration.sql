/*
  Warnings:

  - You are about to drop the column `name` on the `Room` table. All the data in the column will be lost.
  - Added the required column `type` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('GROUP', 'DIRECT');

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "name",
ADD COLUMN     "type" "RoomType" NOT NULL;

-- CreateTable
CREATE TABLE "GroupRoom" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "roomId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupRoom_pkey" PRIMARY KEY ("id")
);
