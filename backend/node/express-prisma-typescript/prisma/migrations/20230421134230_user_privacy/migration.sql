-- CreateEnum
CREATE TYPE "UserPrivacy" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "privacy" "UserPrivacy" NOT NULL DEFAULT 'PUBLIC';
