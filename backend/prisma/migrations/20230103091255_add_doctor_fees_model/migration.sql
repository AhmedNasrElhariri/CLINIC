-- CreateEnum
CREATE TYPE "FeesStatus" AS ENUM ('Draft', 'Cleared');

-- AlterTable
ALTER TABLE "InsuranceRevenue" ADD COLUMN     "status" "FeesStatus" NOT NULL DEFAULT 'Draft';

-- CreateTable
CREATE TABLE "DoctorFees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "cost" INTEGER,
    "status" "FeesStatus" NOT NULL DEFAULT 'Draft',
    "organizationId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "branchId" TEXT,
    "specialtyId" TEXT,

    CONSTRAINT "DoctorFees_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DoctorFees" ADD CONSTRAINT "DoctorFees_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorFees" ADD CONSTRAINT "DoctorFees_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SessionDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorFees" ADD CONSTRAINT "DoctorFees_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorFees" ADD CONSTRAINT "DoctorFees_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorFees" ADD CONSTRAINT "DoctorFees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorFees" ADD CONSTRAINT "DoctorFees_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorFees" ADD CONSTRAINT "DoctorFees_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE SET NULL ON UPDATE CASCADE;
