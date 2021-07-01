/*
  Warnings:

  - Added the required column `code` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "codeNumber" SERIAL NOT NULL,
ADD COLUMN     "code" TEXT NOT NULL;
