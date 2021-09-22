-- CreateEnum
CREATE TYPE "AnesthesiaType" AS ENUM ('GeneralAnesthesia', 'RegionalAnesthesia', 'LocalAnesthesia');

-- AlterTable
ALTER TABLE "PatientSurgery" ADD COLUMN     "anesthesia" "AnesthesiaType",
ADD COLUMN     "anesthesiaDoctorName" TEXT,
ADD COLUMN     "assistantFees" INTEGER,
ADD COLUMN     "anesthesiaFees" INTEGER,
ADD COLUMN     "others" INTEGER;

-- AlterIndex
ALTER INDEX "payrollUserId Revenues_unique_constraint" RENAME TO "payrollUserId_Revenues_unique_constraint";
