/*
  Warnings:

  - The `pin` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "College" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discordActive" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "pin",
ADD COLUMN     "pin" INTEGER;
