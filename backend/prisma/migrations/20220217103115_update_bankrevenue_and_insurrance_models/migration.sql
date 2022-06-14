-- AlterTable
ALTER TABLE "BankRevenue" ADD COLUMN     "patientId" TEXT;

-- AlterTable
ALTER TABLE "InsuranceRevenue" ADD COLUMN     "patientId" TEXT;

-- AddForeignKey
ALTER TABLE "BankRevenue" ADD FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceRevenue" ADD FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
