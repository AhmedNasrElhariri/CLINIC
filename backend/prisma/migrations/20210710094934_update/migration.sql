/*
  Warnings:

  - The primary key for the `InventoryItem` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "InventoryItem" DROP CONSTRAINT "InventoryItem_pkey",
ALTER COLUMN "userId" DROP NOT NULL,
ADD PRIMARY KEY ("itemId");
