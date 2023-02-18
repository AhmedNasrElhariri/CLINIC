-- CreateTable
CREATE TABLE "InventoryItemConsumption" (
    "id" TEXT NOT NULL,
    "numberOfUnits" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "insertionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inventoryItemId" TEXT NOT NULL,

    CONSTRAINT "InventoryItemConsumption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InventoryItemConsumption" ADD CONSTRAINT "InventoryItemConsumption_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
