-- AlterEnum
ALTER TYPE "PermissionAction" ADD VALUE 'View_Permission';

-- AlterTable
ALTER TABLE "MedicineDefinition" ADD COLUMN     "doctorId" TEXT;

-- AddForeignKey
ALTER TABLE "MedicineDefinition" ADD FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
