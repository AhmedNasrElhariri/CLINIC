/*
  Warnings:

  - A unique constraint covering the columns `[appointmentFollowUpId]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "appointmentFollowUpId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Appointment.appointmentFollowUpId_unique" ON "Appointment"("appointmentFollowUpId");

-- AddForeignKey
ALTER TABLE "Appointment" ADD FOREIGN KEY ("appointmentFollowUpId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
