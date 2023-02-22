-- AlterTable
ALTER TABLE "InsuranceRevenue" ADD COLUMN     "companySessionId" TEXT;

-- AddForeignKey
ALTER TABLE "InsuranceRevenue" ADD CONSTRAINT "InsuranceRevenue_companySessionId_fkey" FOREIGN KEY ("companySessionId") REFERENCES "CompanySessionDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
