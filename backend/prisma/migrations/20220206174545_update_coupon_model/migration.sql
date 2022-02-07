/*
  Warnings:

  - You are about to drop the column `expireDate` on the `Coupon` table. All the data in the column will be lost.
  - Added the required column `expiryDate` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "expireDate",
ADD COLUMN     "expiryDate" TIMESTAMP(3) NOT NULL;
