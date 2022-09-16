-- AlterTable
ALTER TABLE "User" ADD COLUMN     "CampusCommunityActive" TEXT,
ADD COLUMN     "isNewuser" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "mentor" DROP NOT NULL;
