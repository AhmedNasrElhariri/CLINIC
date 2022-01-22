/*
  Warnings:

  - A unique constraint covering the columns `[toothNumber,toothPartNumber,patientId]` on the table `Tooth` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "toothNumber_toothPartNumber_unique_constraint";

-- CreateIndex
CREATE UNIQUE INDEX "toothNumber_toothPartNumber_patientId_unique_constraint" ON "Tooth"("toothNumber", "toothPartNumber", "patientId");
