-- AlterTable
ALTER TABLE "PayrollTransaction" ADD COLUMN     "status" TEXT NOT NULL DEFAULT E'on',
ADD COLUMN     "added" BOOLEAN NOT NULL DEFAULT false;
