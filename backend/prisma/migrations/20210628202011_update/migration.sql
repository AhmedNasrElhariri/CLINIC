/*
  Warnings:

  - You are about to drop the column `category` on the `ImageDefinition` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `ImageDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ImageDefinition" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ImageDefinition" ADD FOREIGN KEY ("categoryId") REFERENCES "ImageCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
