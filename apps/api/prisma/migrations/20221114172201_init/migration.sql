/*
  Warnings:

  - You are about to drop the column `authid` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_authid_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "authid",
ADD COLUMN     "authId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");
