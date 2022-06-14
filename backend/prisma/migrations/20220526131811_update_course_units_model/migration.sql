/*
  Warnings:

  - You are about to drop the column `specialtyId` on the `CourseUnitsHistory` table. All the data in the column will be lost.
  - You are about to drop the column `branchId` on the `CourseUnitsHistory` table. All the data in the column will be lost.
  - Added the required column `userId` to the `CourseUnitsHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseUnitsHistory" DROP CONSTRAINT "CourseUnitsHistory_branchId_fkey";

-- DropForeignKey
ALTER TABLE "CourseUnitsHistory" DROP CONSTRAINT "CourseUnitsHistory_specialtyId_fkey";

-- AlterTable
ALTER TABLE "CourseUnitsHistory" DROP COLUMN "specialtyId",
DROP COLUMN "branchId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CourseUnitsHistory" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
