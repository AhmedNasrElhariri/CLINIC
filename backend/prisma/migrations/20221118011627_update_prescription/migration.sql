/*
  Warnings:

  - You are about to drop the column `duration` on the `Prescription` table. All the data in the column will be lost.
  - You are about to drop the column `period` on the `Prescription` table. All the data in the column will be lost.
  - You are about to drop the column `timingId` on the `Prescription` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Prescription" DROP CONSTRAINT "Prescription_timingId_fkey";

-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "duration",
DROP COLUMN "period",
DROP COLUMN "timingId";
