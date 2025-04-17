-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "mainPost" UUID,
ADD COLUMN     "postId" UUID;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mainPost_fkey" FOREIGN KEY ("mainPost") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
