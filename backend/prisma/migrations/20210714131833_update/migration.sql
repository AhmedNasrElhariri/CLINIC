-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "doctorId" TEXT;

-- AddForeignKey
ALTER TABLE "Expense" ADD FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
