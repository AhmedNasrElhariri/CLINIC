/*
  Warnings:

  - You are about to drop the column `totalQuentity` on the `SalesDefinition` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SalesDefinition" DROP COLUMN "totalQuentity",
ADD COLUMN     "totalQuantity" INTEGER NOT NULL DEFAULT 0;
