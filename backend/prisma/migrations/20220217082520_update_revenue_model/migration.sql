-- AlterTable
ALTER TABLE "Revenue" ADD COLUMN     "payer" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "patientId" TEXT;

-- AddForeignKey
ALTER TABLE "Revenue" ADD FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
