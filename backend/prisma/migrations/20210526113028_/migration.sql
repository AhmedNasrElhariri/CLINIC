/*
  Warnings:

  - You are about to drop the column `userId` on the `CourseDefinition` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SalesDefinition` table. All the data in the column will be lost.
  - Added the required column `organizationId` to the `CourseDefinition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `SalesDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseDefinition" DROP CONSTRAINT "CourseDefinition_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_userId_fkey";

-- DropForeignKey
ALTER TABLE "SalesDefinition" DROP CONSTRAINT "SalesDefinition_userId_fkey";

-- AlterTable
ALTER TABLE "CourseDefinition" DROP COLUMN "userId",
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "userId",
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SalesDefinition" DROP COLUMN "userId",
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CourseDefinition" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesDefinition" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
