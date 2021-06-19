/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Appointment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_sessionId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "sessionId",
ADD COLUMN     "session" TEXT;
