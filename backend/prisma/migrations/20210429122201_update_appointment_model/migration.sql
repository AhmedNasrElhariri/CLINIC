/*
  Warnings:

  - Added the required column `branchId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specilityId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "branchId" TEXT NOT NULL,
ADD COLUMN     "specilityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD FOREIGN KEY ("specilityId") REFERENCES "Specialty"("id") ON DELETE CASCADE ON UPDATE CASCADE;
