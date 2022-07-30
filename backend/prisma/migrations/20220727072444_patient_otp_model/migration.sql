-- CreateEnum
CREATE TYPE "PatientOtpStatus" AS ENUM ('Pending', 'Used', 'Expired');

-- CreateTable
CREATE TABLE "PatientOtp" (
    "id" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "status" "PatientOtpStatus" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PatientOtp.phoneNo_unique" ON "PatientOtp"("phoneNo");
