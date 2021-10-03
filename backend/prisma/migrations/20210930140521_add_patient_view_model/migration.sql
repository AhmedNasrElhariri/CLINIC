-- AlterTable
ALTER TABLE "FieldGroup" ADD COLUMN     "patientViewId" TEXT;

-- AlterTable
ALTER TABLE "ViewStatus" ADD COLUMN     "patientViewId" TEXT;

-- CreateTable
CREATE TABLE "PatientView" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PatientView" ADD FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientView" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldGroup" ADD FOREIGN KEY ("patientViewId") REFERENCES "PatientView"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewStatus" ADD FOREIGN KEY ("patientViewId") REFERENCES "PatientView"("id") ON DELETE SET NULL ON UPDATE CASCADE;
