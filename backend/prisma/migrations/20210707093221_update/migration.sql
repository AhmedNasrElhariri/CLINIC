/*
  Warnings:

  - Added the required column `organizationId` to the `BankRevenue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankRevenue" ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "BankRevenue" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
