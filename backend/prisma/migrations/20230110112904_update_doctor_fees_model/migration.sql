-- DropForeignKey
ALTER TABLE "DoctorFees" DROP CONSTRAINT "DoctorFees_sessionId_fkey";

-- AlterTable
ALTER TABLE "DoctorFees" ALTER COLUMN "sessionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DoctorFees" ADD CONSTRAINT "DoctorFees_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SessionDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
