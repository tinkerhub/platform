/*
  Warnings:

  - Changed the type of `description` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Description" AS ENUM ('Student', 'Professional');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "description",
ADD COLUMN     "description" "Description" NOT NULL;
