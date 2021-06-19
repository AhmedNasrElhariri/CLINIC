-- CreateTable
CREATE TABLE "TransactionCoursesTimeFrame" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "payrollUserId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TransactionCoursesTimeFrame" ADD FOREIGN KEY ("payrollUserId") REFERENCES "PayrollUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
