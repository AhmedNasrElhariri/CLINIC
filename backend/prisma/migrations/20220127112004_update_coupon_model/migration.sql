/*
  Warnings:

  - Added the required column `value` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "value" INTEGER NOT NULL;
