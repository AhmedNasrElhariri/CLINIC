-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "branchId" TEXT;

-- AddForeignKey
ALTER TABLE "Patient" ADD FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
