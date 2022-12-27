-- CreateEnum
CREATE TYPE "FeesCalculationMethod" AS ENUM ('before', 'after');

-- CreateEnum
CREATE TYPE "FeesCalculationType" AS ENUM ('fixed', 'percentage');

-- CreateTable
CREATE TABLE "DoctorSessionDefination" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "feesCalculationMethod" "FeesCalculationMethod",
    "feesCalculationType" "FeesCalculationType" NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "DoctorSessionDefination_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DoctorSessionDefination_sessionId_doctorId_key" ON "DoctorSessionDefination"("sessionId", "doctorId");

-- AddForeignKey
ALTER TABLE "DoctorSessionDefination" ADD CONSTRAINT "DoctorSessionDefination_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorSessionDefination" ADD CONSTRAINT "DoctorSessionDefination_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SessionDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorSessionDefination" ADD CONSTRAINT "DoctorSessionDefination_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
