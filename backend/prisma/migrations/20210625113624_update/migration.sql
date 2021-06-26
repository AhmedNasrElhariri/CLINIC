-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PermissionAction" ADD VALUE 'View_Payroll';
ALTER TYPE "PermissionAction" ADD VALUE 'Create_Commission';
ALTER TYPE "PermissionAction" ADD VALUE 'Create_Deduction';
ALTER TYPE "PermissionAction" ADD VALUE 'Create_Incentives';
ALTER TYPE "PermissionAction" ADD VALUE 'Create_Advance';
ALTER TYPE "PermissionAction" ADD VALUE 'Define_Sales';
ALTER TYPE "PermissionAction" ADD VALUE 'Create_Sales';
ALTER TYPE "PermissionAction" ADD VALUE 'View_Sales';
