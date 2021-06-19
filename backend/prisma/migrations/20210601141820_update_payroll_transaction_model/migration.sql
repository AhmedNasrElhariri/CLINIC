/*
  Warnings:

  - Added the required column `reason` to the `PayrollTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PayrollTransaction" ADD COLUMN     "reason" TEXT NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;
