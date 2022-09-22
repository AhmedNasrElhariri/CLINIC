-- CreateEnum
CREATE TYPE "PatientOldOrNew" AS ENUM ('Old', 'New');

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "oldOrNew" "PatientOldOrNew";
