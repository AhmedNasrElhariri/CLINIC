/*
  Warnings:

  - You are about to drop the column `patientViewId` on the `PatientViewStatus` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PatientViewStatus" DROP CONSTRAINT "PatientViewStatus_activeViewId_fkey";

-- DropForeignKey
ALTER TABLE "PatientViewStatus" DROP CONSTRAINT "PatientViewStatus_patientViewId_fkey";

-- AlterTable
ALTER TABLE "PatientViewStatus" DROP COLUMN "patientViewId";

-- AddForeignKey
ALTER TABLE "PatientViewStatus" ADD FOREIGN KEY ("activeViewId") REFERENCES "PatientView"("id") ON DELETE CASCADE ON UPDATE CASCADE;
