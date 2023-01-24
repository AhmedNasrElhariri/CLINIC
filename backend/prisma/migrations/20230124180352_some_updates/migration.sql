/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,doctorId,referedDoctor]` on the table `DoctorSessionDefination` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DoctorSessionDefination_sessionId_doctorId_key";

-- AlterTable
ALTER TABLE "CoursePayment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "CourseUnitsHistory" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Logging" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "DoctorSessionDefination_sessionId_doctorId_referedDoctor_key" ON "DoctorSessionDefination"("sessionId", "doctorId", "referedDoctor");
