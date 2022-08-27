-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "campus" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "house" TEXT,
    "mentor" BOOLEAN NOT NULL,
    "mobile" TEXT NOT NULL,
    "pin" TEXT,
    "pronoun" TEXT,
    "skills" TEXT[],
    "street" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
