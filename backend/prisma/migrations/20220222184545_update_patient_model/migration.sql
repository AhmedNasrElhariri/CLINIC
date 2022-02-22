/*
  Warnings:

  - Made the column `phoneNoTwo` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "phoneNoTwo" SET NOT NULL,
ALTER COLUMN "phoneNoTwo" SET DEFAULT E'';
