/*
  Warnings:

  - You are about to drop the column `userId` on the `Configuration` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organizationId]` on the table `Configuration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizationId` to the `Configuration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Configuration" DROP CONSTRAINT "Configuration_userId_fkey";

-- DropIndex
DROP INDEX "userid_unique_constraint";

-- AlterTable
ALTER TABLE "Configuration" DROP COLUMN "userId",
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organizationId_unique_constraint" ON "Configuration"("organizationId");

-- AddForeignKey
ALTER TABLE "Configuration" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
