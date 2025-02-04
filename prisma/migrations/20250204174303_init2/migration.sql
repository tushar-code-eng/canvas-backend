/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Stroke` table. All the data in the column will be lost.
  - Added the required column `canvasId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canvasId` to the `Stroke` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Stroke" DROP CONSTRAINT "Stroke_sessionId_fkey";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "canvasId" INTEGER NOT NULL,
ADD COLUMN     "guests" TEXT[];

-- AlterTable
ALTER TABLE "Stroke" DROP COLUMN "sessionId",
ADD COLUMN     "canvasId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Canvas" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,

    CONSTRAINT "Canvas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CursorPosition" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "canvasId" INTEGER NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CursorPosition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Canvas_sessionId_key" ON "Canvas"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "CursorPosition_userId_key" ON "CursorPosition"("userId");

-- AddForeignKey
ALTER TABLE "Canvas" ADD CONSTRAINT "Canvas_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stroke" ADD CONSTRAINT "Stroke_canvasId_fkey" FOREIGN KEY ("canvasId") REFERENCES "Canvas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursorPosition" ADD CONSTRAINT "CursorPosition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursorPosition" ADD CONSTRAINT "CursorPosition_canvasId_fkey" FOREIGN KEY ("canvasId") REFERENCES "Canvas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
