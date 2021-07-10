/*
  Warnings:

  - The primary key for the `InventoryItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `userId` on table `InventoryItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "InventoryItem" DROP CONSTRAINT "InventoryItem_pkey",
ADD COLUMN     "doctorId" TEXT,
ALTER COLUMN "userId" SET NOT NULL,
ADD PRIMARY KEY ("itemId", "userId");

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
