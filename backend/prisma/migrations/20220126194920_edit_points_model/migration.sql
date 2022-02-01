/*
  Warnings:

  - Added the required column `couponValue` to the `Points` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Points" ADD COLUMN     "couponValue" INTEGER NOT NULL;
