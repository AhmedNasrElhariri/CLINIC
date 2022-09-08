/*
  Warnings:

  - A unique constraint covering the columns `[organizationId,phoneNo]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Patient.phoneNo_unique";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "updaterId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "organizationId_phoneNo_unique_constraint" ON "Patient"("organizationId", "phoneNo");

-- AddForeignKey
ALTER TABLE "Appointment" ADD FOREIGN KEY ("updaterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
