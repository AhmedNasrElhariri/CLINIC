/*
  Warnings:

  - Added the required column `expenseType` to the `BankExpense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankExpense" ADD COLUMN     "expenseType" TEXT NOT NULL;
