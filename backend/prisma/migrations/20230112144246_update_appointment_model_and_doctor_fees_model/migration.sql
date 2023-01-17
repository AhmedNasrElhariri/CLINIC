-- CreateEnum
CREATE TYPE "ReferedStatus" AS ENUM ('Credit', 'Debit');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "referedDoctor" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "DoctorFees" ADD COLUMN     "referedStatus" "ReferedStatus" NOT NULL DEFAULT 'Debit';

-- AlterTable
ALTER TABLE "DoctorSessionDefination" ADD COLUMN     "referedDoctor" BOOLEAN NOT NULL DEFAULT false;
