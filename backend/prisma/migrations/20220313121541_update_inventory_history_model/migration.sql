-- AlterTable
ALTER TABLE "InventoryHistory" ADD COLUMN     "specialtyId" TEXT,
ADD COLUMN     "branchId" TEXT,
ADD COLUMN     "doctorId" TEXT;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
