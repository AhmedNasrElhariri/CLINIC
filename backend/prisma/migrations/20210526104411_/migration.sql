/*
  Warnings:

  - You are about to drop the column `userId` on the `SessionDefinition` table. All the data in the column will be lost.
  - Added the required column `organizationId` to the `SessionDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SessionDefinition" DROP CONSTRAINT "SessionDefinition_userId_fkey";

-- AlterTable
ALTER TABLE "SessionDefinition" DROP COLUMN "userId",
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SessionDefinition" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
