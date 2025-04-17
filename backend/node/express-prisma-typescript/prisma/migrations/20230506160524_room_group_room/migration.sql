/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `GroupRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GroupRoom_roomId_key" ON "GroupRoom"("roomId");

-- AddForeignKey
ALTER TABLE "GroupRoom" ADD CONSTRAINT "GroupRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
