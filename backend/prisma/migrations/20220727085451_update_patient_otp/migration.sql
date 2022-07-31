/*
  Warnings:

  - Added the required column `otp` to the `PatientOtp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PatientOtp" ADD COLUMN     "otp" INTEGER NOT NULL;
