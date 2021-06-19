/*
  Warnings:

  - A unique constraint covering the columns `[payrollUserId]` on the table `TransactionCoursesTimeFrame` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "payrollUserId_unique_constraint" ON "TransactionCoursesTimeFrame"("payrollUserId");
