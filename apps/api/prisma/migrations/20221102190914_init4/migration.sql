/*
  Warnings:

  - You are about to drop the column `desc` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passyear` on the `User` table. All the data in the column will be lost.
  - Added the required column `description` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "desc",
DROP COLUMN "passyear",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "passYear" INTEGER;
