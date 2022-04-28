-- CreateTable
CREATE TABLE "SupplierInvoiceTransaction" (
    "id" TEXT NOT NULL,
    "paid" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SupplierInvoiceTransaction" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
