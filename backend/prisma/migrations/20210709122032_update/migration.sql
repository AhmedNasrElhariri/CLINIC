/*
  Warnings:

  - You are about to drop the column `level` on the `SessionDefinition` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SessionDefinition` table. All the data in the column will be lost.
  - You are about to drop the column `specialtyId` on the `SessionDefinition` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `SessionDefinition` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SessionDefinition" DROP CONSTRAINT "SessionDefinition_branchId_fkey";

-- DropForeignKey
ALTER TABLE "SessionDefinition" DROP CONSTRAINT "SessionDefinition_specialtyId_fkey";

-- DropForeignKey
ALTER TABLE "SessionDefinition" DROP CONSTRAINT "SessionDefinition_userId_fkey";

-- AlterTable
ALTER TABLE "SessionDefinition" DROP COLUMN "level",
DROP COLUMN "userId",
DROP COLUMN "specialtyId",
DROP COLUMN "branchId",
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 5;
