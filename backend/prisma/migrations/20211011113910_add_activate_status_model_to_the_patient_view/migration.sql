/*
  Warnings:

  - You are about to drop the column `patientViewId` on the `ViewStatus` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ViewStatus" DROP CONSTRAINT "ViewStatus_patientViewId_fkey";

-- AlterTable
ALTER TABLE "ViewStatus" DROP COLUMN "patientViewId";

-- CreateTable
CREATE TABLE "PatientViewStatus" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activeViewId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientViewId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PatientViewStatus" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientViewStatus" ADD FOREIGN KEY ("activeViewId") REFERENCES "View"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientViewStatus" ADD FOREIGN KEY ("patientViewId") REFERENCES "PatientView"("id") ON DELETE CASCADE ON UPDATE CASCADE;
