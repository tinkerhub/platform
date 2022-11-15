/*
  Warnings:

  - You are about to drop the column `CampusCommunityActive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `campus` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passyear` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `User` table. All the data in the column will be lost.
  - Added the required column `collegeId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `mentor` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "CampusCommunityActive",
DROP COLUMN "campus",
DROP COLUMN "desc",
DROP COLUMN "passyear",
DROP COLUMN "skills",
ADD COLUMN     "campusCommunityActive" BOOLEAN,
ADD COLUMN     "collegeId" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "passYear" INTEGER,
ALTER COLUMN "mentor" SET NOT NULL;

-- CreateTable
CREATE TABLE "College" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" VARCHAR(25) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SkillToUser" (
    "A" VARCHAR(25) NOT NULL,
    "B" VARCHAR(25) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "College_name_key" ON "College"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SkillToUser_AB_unique" ON "_SkillToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SkillToUser_B_index" ON "_SkillToUser"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToUser" ADD CONSTRAINT "_SkillToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToUser" ADD CONSTRAINT "_SkillToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
