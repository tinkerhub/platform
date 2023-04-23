/*
  Warnings:

  - You are about to drop the column `discordUserId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `discordUserName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "discordUserId",
DROP COLUMN "discordUserName";
