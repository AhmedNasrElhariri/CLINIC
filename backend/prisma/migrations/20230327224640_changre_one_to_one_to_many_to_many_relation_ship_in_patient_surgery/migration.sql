-- DropForeignKey
ALTER TABLE "PatientSurgery" DROP CONSTRAINT "PatientSurgery_surgeryId_fkey";

-- CreateTable
CREATE TABLE "_PatientSurgeryToSurgery" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PatientSurgeryToSurgery_AB_unique" ON "_PatientSurgeryToSurgery"("A", "B");

-- CreateIndex
CREATE INDEX "_PatientSurgeryToSurgery_B_index" ON "_PatientSurgeryToSurgery"("B");

-- AddForeignKey
ALTER TABLE "_PatientSurgeryToSurgery" ADD CONSTRAINT "_PatientSurgeryToSurgery_A_fkey" FOREIGN KEY ("A") REFERENCES "PatientSurgery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientSurgeryToSurgery" ADD CONSTRAINT "_PatientSurgeryToSurgery_B_fkey" FOREIGN KEY ("B") REFERENCES "Surgery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO "_PatientSurgeryToSurgery"("A", "B")
SELECT "id", "surgeryId"
FROM "PatientSurgery";

ALTER TABLE "PatientSurgery"
DROP COLUMN "surgeryId";