-- DropForeignKey
ALTER TABLE "DoctorFees" DROP CONSTRAINT "DoctorFees_appointmentId_fkey";

-- AlterTable
ALTER TABLE "DoctorFees" ALTER COLUMN "appointmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DoctorFees" ADD CONSTRAINT "DoctorFees_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
