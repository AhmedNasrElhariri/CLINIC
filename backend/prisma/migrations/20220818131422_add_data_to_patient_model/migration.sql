-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('Married', 'Single');

-- CreateEnum
CREATE TYPE "PatientLevel" AS ENUM ('VIP', 'Normal');

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "maritalStatus" "MaritalStatus",
ADD COLUMN     "patientLevel" "PatientLevel",
ADD COLUMN     "email" TEXT;
