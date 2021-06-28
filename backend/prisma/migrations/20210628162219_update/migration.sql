/*
  Warnings:

  - You are about to drop the column `category` on the `LabDefinition` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `LabDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LabDefinition" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "LabDefinition" ADD FOREIGN KEY ("categoryId") REFERENCES "LabCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
