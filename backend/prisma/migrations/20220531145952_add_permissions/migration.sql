-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PermissionAction" ADD VALUE 'Duplicates_Appointment';
ALTER TYPE "PermissionAction" ADD VALUE 'ViewHistory_Patient';
ALTER TYPE "PermissionAction" ADD VALUE 'ViewDental_Patient';
ALTER TYPE "PermissionAction" ADD VALUE 'ViewFaseOperation_Patient';
ALTER TYPE "PermissionAction" ADD VALUE 'ViewProgress_Patient';
ALTER TYPE "PermissionAction" ADD VALUE 'ViewPatientInformationCreation_Patient';
ALTER TYPE "PermissionAction" ADD VALUE 'ViewCoupons_Patient';
ALTER TYPE "PermissionAction" ADD VALUE 'ViewPatientRevenue_Patient';
ALTER TYPE "PermissionAction" ADD VALUE 'ViewPatientInfo_Patient';
ALTER TYPE "PermissionAction" ADD VALUE 'ViewSurgeries_Patient';
