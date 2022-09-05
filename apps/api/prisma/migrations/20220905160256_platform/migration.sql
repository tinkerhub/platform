-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(25) NOT NULL,
    "authid" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "campus" TEXT,
    "desc" TEXT NOT NULL,
    "district" TEXT,
    "dob" TIMESTAMP(3) NOT NULL,
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
CREATE UNIQUE INDEX "User_authid_key" ON "User"("authid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");
