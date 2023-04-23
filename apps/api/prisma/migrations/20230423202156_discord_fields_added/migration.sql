/*
  Warnings:

  - A unique constraint covering the columns `[discordUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discordUserName]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discordUserId" TEXT,
ADD COLUMN     "discordUserName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_discordUserId_key" ON "User"("discordUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordUserName_key" ON "User"("discordUserName");
