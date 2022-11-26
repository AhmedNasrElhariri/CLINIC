-- AlterTable
ALTER TABLE "PayrollTransaction" ALTER COLUMN "reason" SET DEFAULT ' ';

-- RenameIndex
ALTER INDEX "Appointment.appointmentFollowUpId_unique" RENAME TO "Appointment_appointmentFollowUpId_key";

-- RenameIndex
ALTER INDEX "appointment_fieldId_unique_constraint" RENAME TO "AppointmentField_appointmentId_fieldId_key";

-- RenameIndex
ALTER INDEX "organizationId_unique_constraint" RENAME TO "Configuration_organizationId_key";

-- RenameIndex
ALTER INDEX "order_fieldGroupId_unique_constraint" RENAME TO "Field_order_fieldGroupId_key";

-- RenameIndex
ALTER INDEX "order_viewId_unique_constraint" RENAME TO "FieldGroup_order_viewId_key";

-- RenameIndex
ALTER INDEX "Item.name_unique" RENAME TO "Item_name_key";

-- RenameIndex
ALTER INDEX "organizationId_phoneNo_unique_constraint" RENAME TO "Patient_organizationId_phoneNo_key";

-- RenameIndex
ALTER INDEX "patient_fieldId_unique_constraint" RENAME TO "PatientField_patientId_fieldId_key";

-- RenameIndex
ALTER INDEX "PatientOtp.phoneNo_unique" RENAME TO "PatientOtp_phoneNo_key";

-- RenameIndex
ALTER INDEX "action_roleId_unique_constraint" RENAME TO "Permission_action_roleId_key";

-- RenameIndex
ALTER INDEX "Snippet.title_unique" RENAME TO "Snippet_title_key";

-- RenameIndex
ALTER INDEX "toothNumber_toothPartNumber_patientId_unique_constraint" RENAME TO "Tooth_toothNumber_toothPartNumber_patientId_key";

-- RenameIndex
ALTER INDEX "payrollUserId_unique_constraint" RENAME TO "TransactionCoursesTimeFrame_payrollUserId_key";

-- RenameIndex
ALTER INDEX "payrollUserId_Revenues_unique_constraint" RENAME TO "TransactionRevenuesTimeFrame_payrollUserId_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "userId_specialtyId_branchId_unique_constraint" RENAME TO "UserSpecialty_userId_specialtyId_branchId_key";

-- RenameIndex
ALTER INDEX "week_year_unique_constraint" RENAME TO "Week_weekNo_year_key";
