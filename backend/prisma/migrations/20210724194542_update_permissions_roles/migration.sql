-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PermissionAction" ADD VALUE 'ViewBank_Accounting';
ALTER TYPE "PermissionAction" ADD VALUE 'ViewInsurance_Accounting';
ALTER TYPE "PermissionAction" ADD VALUE 'GenerateMonthly_PulsesReport';
ALTER TYPE "PermissionAction" ADD VALUE 'GenerateDaily_PulsesReport';
