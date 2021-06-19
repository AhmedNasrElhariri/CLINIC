/*
  Warnings:

  - You are about to drop the column `name` on the `PayrollUser` table. All the data in the column will be lost.
  - Added the required column `userId` to the `PayrollUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PayrollUser" DROP COLUMN "name",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PayrollUser" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
