-- CreateEnum
CREATE TYPE "subInventoryOperation" AS ENUM ('accept', 'reject');

-- AlterTable
ALTER TABLE "InventoryHistory" ADD COLUMN     "subOperation" "subInventoryOperation";
