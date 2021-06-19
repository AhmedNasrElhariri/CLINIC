/*
  Warnings:

  - You are about to drop the column `userId` on the `Configuration` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `CourseDefinition` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SalesDefinition` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SessionDefinition` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organizationId]` on the table `Configuration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizationId` to the `Configuration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `CourseDefinition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `SalesDefinition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `SessionDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Configuration" DROP CONSTRAINT "Configuration_userId_fkey";

-- DropForeignKey
ALTER TABLE "CourseDefinition" DROP CONSTRAINT "CourseDefinition_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_userId_fkey";

-- DropForeignKey
ALTER TABLE "SalesDefinition" DROP CONSTRAINT "SalesDefinition_userId_fkey";

-- DropForeignKey
ALTER TABLE "SessionDefinition" DROP CONSTRAINT "SessionDefinition_userId_fkey";

-- DropIndex
DROP INDEX "userid_unique_constraint";

-- AlterTable
ALTER TABLE "Configuration" DROP COLUMN "userId",
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CourseDefinition" DROP COLUMN "userId",
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PayrollTransaction" ADD COLUMN     "status" TEXT NOT NULL DEFAULT E'on',
ADD COLUMN     "added" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "userId",
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SalesDefinition" DROP COLUMN "userId",
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SessionDefinition" DROP COLUMN "userId",
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organizationId_unique_constraint" ON "Configuration"("organizationId");

-- AddForeignKey
ALTER TABLE "Configuration" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseDefinition" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesDefinition" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionDefinition" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
