-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PermissionAction" ADD VALUE 'Transfer_Inventory';
ALTER TYPE "PermissionAction" ADD VALUE 'Reconciliation_Inventory';

-- AlterTable
ALTER TABLE "InventoryHistory" ADD COLUMN     "newNoOfBoxes" DOUBLE PRECISION,
ADD COLUMN     "oldNoOfBoxes" DOUBLE PRECISION;
