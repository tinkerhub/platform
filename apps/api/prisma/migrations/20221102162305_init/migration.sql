/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `College` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "College_id_key" ON "College"("id");
