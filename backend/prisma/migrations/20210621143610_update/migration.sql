-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "level" TEXT,
ADD COLUMN     "specialtyId" TEXT,
ADD COLUMN     "branchId" TEXT;

-- AlterTable
ALTER TABLE "Revenue" ADD COLUMN     "level" TEXT,
ADD COLUMN     "specialtyId" TEXT,
ADD COLUMN     "branchId" TEXT;

-- AddForeignKey
ALTER TABLE "Expense" ADD FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue" ADD FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue" ADD FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
