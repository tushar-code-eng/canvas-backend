/*
  Warnings:

  - The `type` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "sessionEnum" AS ENUM ('Flowchart', 'Desgin', 'Wireframe', 'Custom');

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "type",
ADD COLUMN     "type" "sessionEnum";
