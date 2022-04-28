/*
  Warnings:

  - Added the required column `supplierInvoiceId` to the `SupplierInvoiceTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SupplierInvoiceTransaction" ADD COLUMN     "supplierInvoiceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SupplierInvoiceTransaction" ADD FOREIGN KEY ("supplierInvoiceId") REFERENCES "SupplierInvoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
