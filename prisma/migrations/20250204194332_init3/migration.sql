/*
  Warnings:

  - You are about to drop the column `url` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionId]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Session_url_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "url";

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionId_key" ON "Session"("sessionId");
