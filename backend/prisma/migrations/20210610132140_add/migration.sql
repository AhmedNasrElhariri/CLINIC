-- CreateTable
CREATE TABLE "TransactionRevenuesTimeFrame" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "payrollUserId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payrollUserId Revenues_unique_constraint" ON "TransactionRevenuesTimeFrame"("payrollUserId");

-- AddForeignKey
ALTER TABLE "TransactionRevenuesTimeFrame" ADD FOREIGN KEY ("payrollUserId") REFERENCES "PayrollUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
