/*
  Warnings:

  - Added the required column `userId` to the `InventoryItemConsumption` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InventoryItemConsumptionStatus" AS ENUM ('Pending', 'Active');

-- AlterTable
ALTER TABLE "InventoryItemConsumption" ADD COLUMN     "fromInventoryItemId" TEXT,
ADD COLUMN     "status" "InventoryItemConsumptionStatus" NOT NULL DEFAULT 'Active',
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "InventoryItemConsumption" ADD CONSTRAINT "InventoryItemConsumption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItemConsumption" ADD CONSTRAINT "InventoryItemConsumption_fromInventoryItemId_fkey" FOREIGN KEY ("fromInventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
