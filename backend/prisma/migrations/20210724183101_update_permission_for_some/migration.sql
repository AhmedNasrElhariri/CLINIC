/*
  Warnings:

  - The values [List_Session,Create_Session,List_Hospital,List_Surgery] on the enum `PermissionAction` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PermissionAction_new" AS ENUM ('List_Appointment', 'Create_Appointment', 'Reschedule_Appointment', 'Acc_Appointment', 'Cancel_Appointment', 'Archive_Appointment', 'View_Patient', 'View_Accounting', 'AddRevenue_Accounting', 'AddExpense_Accounting', 'EditRevenue_Accounting', 'EditExpense_Accounting', 'Print_Accounting', 'View_Calendar', 'CreateEvent_Calendar', 'View_Inventory', 'AddItem_Inventory', 'ViewHistory_Inventory', 'DefineItem_Inventory', 'Create_Course', 'Create_SessionDefinition', 'Create_Hospital', 'Create_Surgery', 'View_Payroll', 'CreateCommission_Payroll', 'CreateDeduction_Payroll', 'CreateIncentives_Payroll', 'CreateAdvance_Payroll', 'CreatePayslips_Payroll', 'Define_Sales', 'Create_Sales', 'View_Sales', 'Create_Patient', 'CreateSocialReport_Patient', 'CreateAreaReport_Patient', 'ViewSessions_Patient', 'ViewLabs_Patient', 'ViewImages_Patient', 'ViewCourses_Patient', 'ViewSessionsPulses_Patient');
ALTER TABLE "Permission" ALTER COLUMN "action" TYPE "PermissionAction_new" USING ("action"::text::"PermissionAction_new");
ALTER TYPE "PermissionAction" RENAME TO "PermissionAction_old";
ALTER TYPE "PermissionAction_new" RENAME TO "PermissionAction";
DROP TYPE "PermissionAction_old";
COMMIT;
