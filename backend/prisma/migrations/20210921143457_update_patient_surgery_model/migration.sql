-- CreateEnum
CREATE TYPE "AnesthesiaType" AS ENUM ('GeneralAnesthesia', 'RegionalAnesthesia', 'LocalAnesthesia');

-- AlterTable
ALTER TABLE "PatientSurgery" ADD COLUMN     "anesthesia" "AnesthesiaType",
ADD COLUMN     "anesthesiaDoctorName" TEXT,
ADD COLUMN     "assistantFees" INTEGER,
ADD COLUMN     "anesthesiaFees" INTEGER,
ADD COLUMN     "others" INTEGER;

