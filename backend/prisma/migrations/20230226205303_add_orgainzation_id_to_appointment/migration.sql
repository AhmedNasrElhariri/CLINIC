
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN  "organizationId" TEXT;

-- CreateIndex
CREATE INDEX "Appointment_organizationId_idx" ON "Appointment"("organizationId");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

UPDATE "Appointment"
SET "organizationId" = "Patient"."organizationId"
FROM "Patient"
WHERE "Appointment"."patientId" = "Patient".id;

ALTER TABLE "Appointment" ALTER COLUMN  "organizationId" SET NOT NULL;