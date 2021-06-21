/*
  Warnings:

  - You are about to drop the `SessionDefinition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SessionDefinition" DROP CONSTRAINT "SessionDefinition_branchId_fkey";

-- DropForeignKey
ALTER TABLE "SessionDefinition" DROP CONSTRAINT "SessionDefinition_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "SessionDefinition" DROP CONSTRAINT "SessionDefinition_specialtyId_fkey";

-- DropForeignKey
ALTER TABLE "SessionDefinition" DROP CONSTRAINT "SessionDefinition_userId_fkey";

-- DropTable
DROP TABLE "SessionDefinition";

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "Apptype" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "specialtyId" TEXT,
    "branchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizationId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Price" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
