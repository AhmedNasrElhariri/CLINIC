/*
  Warnings:

  - Added the required column `patientId` to the `Tooth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tooth" ADD COLUMN     "patientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tooth" ADD FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
