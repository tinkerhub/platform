-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discordUserId" BIGINT DEFAULT 0,
ADD COLUMN     "discordUserName" TEXT DEFAULT '';
