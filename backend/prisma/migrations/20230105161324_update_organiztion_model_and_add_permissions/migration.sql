-- AlterEnum
ALTER TYPE "PermissionAction" ADD VALUE 'View_DoctorFees';

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "loggable" BOOLEAN NOT NULL DEFAULT false;
