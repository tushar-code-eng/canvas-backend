/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "password" SET DEFAULT 'No Password';

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");
