-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "campus" TEXT,
    "desc" TEXT NOT NULL,
    "district" TEXT,
    "dob" TEXT NOT NULL,
    "house" TEXT,
    "mentor" BOOLEAN NOT NULL,
    "mobile" TEXT,
    "pin" TEXT,
    "pronoun" TEXT,
    "skills" TEXT[],
    "street" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
