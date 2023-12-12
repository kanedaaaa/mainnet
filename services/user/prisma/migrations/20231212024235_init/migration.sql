-- CreateTable
CREATE TABLE "user_schema"."User" (
    "id" SERIAL NOT NULL,
    "profileImage" TEXT,
    "fullName" TEXT,
    "bio" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "user_schema"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "user_schema"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_passwordHash_key" ON "user_schema"."User"("passwordHash");
