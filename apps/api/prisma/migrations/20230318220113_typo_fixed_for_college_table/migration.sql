/*
  Warnings:

  - You are about to drop the column `Type` on the `College` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "College" DROP COLUMN "Type",
ADD COLUMN     "type" TEXT,
ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::TEXT;
