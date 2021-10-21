/*
  Warnings:

  - The values [GeneralAnesthesia,RegionalAnesthesia,LocalAnesthesia] on the enum `AnesthesiaType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AnesthesiaType_new" AS ENUM ('General', 'Regional', 'Local');
ALTER TABLE "PatientSurgery" ALTER COLUMN "anesthesia" TYPE "AnesthesiaType_new" USING ("anesthesia"::text::"AnesthesiaType_new");
ALTER TYPE "AnesthesiaType" RENAME TO "AnesthesiaType_old";
ALTER TYPE "AnesthesiaType_new" RENAME TO "AnesthesiaType";
DROP TYPE "AnesthesiaType_old";
COMMIT;
