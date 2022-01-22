/*
  Warnings:

  - Added the required column `depth` to the `ToothTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ToothTransaction" ADD COLUMN     "depth" TEXT NOT NULL;
