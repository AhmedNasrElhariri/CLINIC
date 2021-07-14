-- AlterTable
ALTER TABLE "BankRevenue" ADD COLUMN     "doctorId" TEXT;

-- AlterTable
ALTER TABLE "InsuranceRevenue" ADD COLUMN     "doctorId" TEXT;

-- AddForeignKey
ALTER TABLE "BankRevenue" ADD FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceRevenue" ADD FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
