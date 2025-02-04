/*
  Warnings:

  - You are about to drop the column `canvasId` on the `CursorPosition` table. All the data in the column will be lost.
  - You are about to drop the column `canvasId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `canvasId` on the `Stroke` table. All the data in the column will be lost.
  - You are about to drop the `Canvas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sessionId` to the `CursorPosition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Stroke` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Canvas" DROP CONSTRAINT "Canvas_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "CursorPosition" DROP CONSTRAINT "CursorPosition_canvasId_fkey";

-- DropForeignKey
ALTER TABLE "Stroke" DROP CONSTRAINT "Stroke_canvasId_fkey";

-- AlterTable
ALTER TABLE "CursorPosition" DROP COLUMN "canvasId",
ADD COLUMN     "sessionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "canvasId";

-- AlterTable
ALTER TABLE "Stroke" DROP COLUMN "canvasId",
ADD COLUMN     "sessionId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Canvas";

-- AddForeignKey
ALTER TABLE "Stroke" ADD CONSTRAINT "Stroke_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursorPosition" ADD CONSTRAINT "CursorPosition_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
