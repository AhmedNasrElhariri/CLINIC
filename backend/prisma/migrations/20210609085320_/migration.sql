/*
  Warnings:

  - You are about to drop the column `expenseTypeId` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `expenseType` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_expenseTypeId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "expenseTypeId",
ADD COLUMN     "expenseType" TEXT NOT NULL;
