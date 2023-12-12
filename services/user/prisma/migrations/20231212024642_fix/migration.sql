/*
  Warnings:

  - You are about to drop the column `profileImage` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_schema"."User" DROP COLUMN "profileImage",
ADD COLUMN     "avatar" TEXT;
