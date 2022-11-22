-- AlterTable
ALTER TABLE "PayrollTransaction" ALTER COLUMN "reason" SET DEFAULT E'';

-- AlterIndex
ALTER INDEX "Appointment_appointmentFollowUpId_key" RENAME TO "Appointment.appointmentFollowUpId_unique";

-- AlterIndex
ALTER INDEX "AppointmentField_appointmentId_fieldId_key" RENAME TO "appointment_fieldId_unique_constraint";

-- AlterIndex
ALTER INDEX "Configuration_organizationId_key" RENAME TO "organizationId_unique_constraint";

-- AlterIndex
ALTER INDEX "Field_order_fieldGroupId_key" RENAME TO "order_fieldGroupId_unique_constraint";

-- AlterIndex
ALTER INDEX "FieldGroup_order_viewId_key" RENAME TO "order_viewId_unique_constraint";

-- AlterIndex
ALTER INDEX "Item_name_key" RENAME TO "Item.name_unique";

-- AlterIndex
ALTER INDEX "Patient_organizationId_phoneNo_key" RENAME TO "organizationId_phoneNo_unique_constraint";

-- AlterIndex
ALTER INDEX "PatientField_patientId_fieldId_key" RENAME TO "patient_fieldId_unique_constraint";

-- AlterIndex
ALTER INDEX "PatientOtp_phoneNo_key" RENAME TO "PatientOtp.phoneNo_unique";

-- AlterIndex
ALTER INDEX "Permission_action_roleId_key" RENAME TO "action_roleId_unique_constraint";

-- AlterIndex
ALTER INDEX "Snippet_title_key" RENAME TO "Snippet.title_unique";

-- AlterIndex
ALTER INDEX "Tooth_toothNumber_toothPartNumber_patientId_key" RENAME TO "toothNumber_toothPartNumber_patientId_unique_constraint";

-- AlterIndex
ALTER INDEX "TransactionCoursesTimeFrame_payrollUserId_key" RENAME TO "payrollUserId_unique_constraint";

-- AlterIndex
ALTER INDEX "TransactionRevenuesTimeFrame_payrollUserId_key" RENAME TO "payrollUserId_Revenues_unique_constraint";

-- AlterIndex
ALTER INDEX "User_email_key" RENAME TO "User.email_unique";

-- AlterIndex
ALTER INDEX "UserSpecialty_userId_specialtyId_branchId_key" RENAME TO "userId_specialtyId_branchId_unique_constraint";

-- AlterIndex
ALTER INDEX "Week_weekNo_year_key" RENAME TO "week_year_unique_constraint";
