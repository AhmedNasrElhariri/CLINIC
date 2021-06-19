-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "reference" JSONB NOT NULL DEFAULT E'[]',
ADD COLUMN     "area" TEXT NOT NULL DEFAULT E'';
