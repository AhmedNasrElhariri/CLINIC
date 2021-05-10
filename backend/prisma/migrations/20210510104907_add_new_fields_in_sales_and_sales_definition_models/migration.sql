/*
  Warnings:

  - Added the required column `totalCost` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `SalesDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PulseControl" ALTER COLUMN "before" SET DEFAULT 0,
ALTER COLUMN "after" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "totalCost" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SalesDefinition" ADD COLUMN     "cost" INTEGER NOT NULL;
