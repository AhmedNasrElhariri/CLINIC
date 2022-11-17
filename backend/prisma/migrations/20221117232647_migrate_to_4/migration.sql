-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_userId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentField" DROP CONSTRAINT "AppointmentField_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentField" DROP CONSTRAINT "AppointmentField_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentFile" DROP CONSTRAINT "AppointmentFile_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentFile" DROP CONSTRAINT "AppointmentFile_fileId_fkey";

-- DropForeignKey
ALTER TABLE "AppointmentTypeDefinition" DROP CONSTRAINT "AppointmentTypeDefinition_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "BankDefinition" DROP CONSTRAINT "BankDefinition_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "BankExpense" DROP CONSTRAINT "BankExpense_bankId_fkey";

-- DropForeignKey
ALTER TABLE "BankExpense" DROP CONSTRAINT "BankExpense_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "BankExpense" DROP CONSTRAINT "BankExpense_userId_fkey";

-- DropForeignKey
ALTER TABLE "BankRevenue" DROP CONSTRAINT "BankRevenue_bankId_fkey";

-- DropForeignKey
ALTER TABLE "BankRevenue" DROP CONSTRAINT "BankRevenue_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "BankRevenue" DROP CONSTRAINT "BankRevenue_userId_fkey";

-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyDefinition" DROP CONSTRAINT "CompanyDefinition_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "CompanySessionDefinition" DROP CONSTRAINT "CompanySessionDefinition_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanySessionDefinition" DROP CONSTRAINT "CompanySessionDefinition_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Configuration" DROP CONSTRAINT "Configuration_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Coupon" DROP CONSTRAINT "Coupon_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Coupon" DROP CONSTRAINT "Coupon_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_courseDefinitionId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userId_fkey";

-- DropForeignKey
ALTER TABLE "CourseDefinition" DROP CONSTRAINT "CourseDefinition_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "CoursePayment" DROP CONSTRAINT "CoursePayment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CoursePayment" DROP CONSTRAINT "CoursePayment_userId_fkey";

-- DropForeignKey
ALTER TABLE "CourseTypeDefinition" DROP CONSTRAINT "CourseTypeDefinition_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "CourseUnitsHistory" DROP CONSTRAINT "CourseUnitsHistory_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseUnitsHistory" DROP CONSTRAINT "CourseUnitsHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "DentalDiagnosisDefinition" DROP CONSTRAINT "DentalDiagnosisDefinition_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "DentalDiagnosisDefinition" DROP CONSTRAINT "DentalDiagnosisDefinition_userId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_userId_fkey";

-- DropForeignKey
ALTER TABLE "ExpenseTypeDefinition" DROP CONSTRAINT "ExpenseTypeDefinition_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "FaceOperation" DROP CONSTRAINT "FaceOperation_materialId_fkey";

-- DropForeignKey
ALTER TABLE "FaceOperation" DROP CONSTRAINT "FaceOperation_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "FaceOperation" DROP CONSTRAINT "FaceOperation_partationId_fkey";

-- DropForeignKey
ALTER TABLE "FaceOperation" DROP CONSTRAINT "FaceOperation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "FaceOperation" DROP CONSTRAINT "FaceOperation_userId_fkey";

-- DropForeignKey
ALTER TABLE "FacePartation" DROP CONSTRAINT "FacePartation_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "FacePartation" DROP CONSTRAINT "FacePartation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "FacePartation" DROP CONSTRAINT "FacePartation_userId_fkey";

-- DropForeignKey
ALTER TABLE "FamilyHistory" DROP CONSTRAINT "FamilyHistory_patientId_fkey";

-- DropForeignKey
ALTER TABLE "FieldGroup" DROP CONSTRAINT "FieldGroup_viewId_fkey";

-- DropForeignKey
ALTER TABLE "Hospital" DROP CONSTRAINT "Hospital_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Hospital" DROP CONSTRAINT "Hospital_userId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_imageDefinitionId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_patientId_fkey";

-- DropForeignKey
ALTER TABLE "ImageCategory" DROP CONSTRAINT "ImageCategory_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "ImageCategory" DROP CONSTRAINT "ImageCategory_userId_fkey";

-- DropForeignKey
ALTER TABLE "ImageDefinition" DROP CONSTRAINT "ImageDefinition_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ImageDefinition" DROP CONSTRAINT "ImageDefinition_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "ImageDefinition" DROP CONSTRAINT "ImageDefinition_userId_fkey";

-- DropForeignKey
ALTER TABLE "InsuranceRevenue" DROP CONSTRAINT "InsuranceRevenue_companyId_fkey";

-- DropForeignKey
ALTER TABLE "InsuranceRevenue" DROP CONSTRAINT "InsuranceRevenue_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "InsuranceRevenue" DROP CONSTRAINT "InsuranceRevenue_userId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryHistory" DROP CONSTRAINT "InventoryHistory_itemId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryHistory" DROP CONSTRAINT "InventoryHistory_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryHistory" DROP CONSTRAINT "InventoryHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryItem" DROP CONSTRAINT "InventoryItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryItem" DROP CONSTRAINT "InventoryItem_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryItem" DROP CONSTRAINT "InventoryItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_userId_fkey";

-- DropForeignKey
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_labDefinitionId_fkey";

-- DropForeignKey
ALTER TABLE "Lab" DROP CONSTRAINT "Lab_patientId_fkey";

-- DropForeignKey
ALTER TABLE "LabCategory" DROP CONSTRAINT "LabCategory_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "LabCategory" DROP CONSTRAINT "LabCategory_userId_fkey";

-- DropForeignKey
ALTER TABLE "LabDefinition" DROP CONSTRAINT "LabDefinition_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "LabDefinition" DROP CONSTRAINT "LabDefinition_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "LabDefinition" DROP CONSTRAINT "LabDefinition_userId_fkey";

-- DropForeignKey
ALTER TABLE "MaterialDefinition" DROP CONSTRAINT "MaterialDefinition_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "MaterialDefinition" DROP CONSTRAINT "MaterialDefinition_userId_fkey";

-- DropForeignKey
ALTER TABLE "MedicineDefinition" DROP CONSTRAINT "MedicineDefinition_userId_fkey";

-- DropForeignKey
ALTER TABLE "MedicineHistory" DROP CONSTRAINT "MedicineHistory_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PageSetup" DROP CONSTRAINT "PageSetup_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_userId_fkey";

-- DropForeignKey
ALTER TABLE "PatientField" DROP CONSTRAINT "PatientField_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "PatientField" DROP CONSTRAINT "PatientField_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PatientField" DROP CONSTRAINT "PatientField_userId_fkey";

-- DropForeignKey
ALTER TABLE "PatientReport" DROP CONSTRAINT "PatientReport_userId_fkey";

-- DropForeignKey
ALTER TABLE "PatientSurgery" DROP CONSTRAINT "PatientSurgery_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "PatientSurgery" DROP CONSTRAINT "PatientSurgery_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "PatientSurgery" DROP CONSTRAINT "PatientSurgery_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PatientSurgery" DROP CONSTRAINT "PatientSurgery_surgeryId_fkey";

-- DropForeignKey
ALTER TABLE "PatientView" DROP CONSTRAINT "PatientView_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "PatientView" DROP CONSTRAINT "PatientView_userId_fkey";

-- DropForeignKey
ALTER TABLE "PatientViewStatus" DROP CONSTRAINT "PatientViewStatus_activeViewId_fkey";

-- DropForeignKey
ALTER TABLE "PatientViewStatus" DROP CONSTRAINT "PatientViewStatus_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payroll" DROP CONSTRAINT "Payroll_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "PayrollTransaction" DROP CONSTRAINT "PayrollTransaction_payrollId_fkey";

-- DropForeignKey
ALTER TABLE "PayrollUser" DROP CONSTRAINT "PayrollUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionRole" DROP CONSTRAINT "PermissionRole_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Points" DROP CONSTRAINT "Points_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "PointsTransactions" DROP CONSTRAINT "PointsTransactions_couponId_fkey";

-- DropForeignKey
ALTER TABLE "Prescription" DROP CONSTRAINT "Prescription_medicineId_fkey";

-- DropForeignKey
ALTER TABLE "Prescription" DROP CONSTRAINT "Prescription_timingId_fkey";

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_userId_fkey";

-- DropForeignKey
ALTER TABLE "Revenue" DROP CONSTRAINT "Revenue_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Revenue" DROP CONSTRAINT "Revenue_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rule" DROP CONSTRAINT "Rule_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_salesDefinitionId_fkey";

-- DropForeignKey
ALTER TABLE "SalesDefinition" DROP CONSTRAINT "SalesDefinition_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "SessionDefinition" DROP CONSTRAINT "SessionDefinition_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "SessionTransaction" DROP CONSTRAINT "SessionTransaction_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "SessionTransaction" DROP CONSTRAINT "SessionTransaction_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "SessionTransaction" DROP CONSTRAINT "SessionTransaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "Snippet" DROP CONSTRAINT "Snippet_userId_fkey";

-- DropForeignKey
ALTER TABLE "Specialty" DROP CONSTRAINT "Specialty_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "SupplierAccount" DROP CONSTRAINT "SupplierAccount_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "SupplierAccount" DROP CONSTRAINT "SupplierAccount_userId_fkey";

-- DropForeignKey
ALTER TABLE "SupplierInvoice" DROP CONSTRAINT "SupplierInvoice_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "SupplierInvoice" DROP CONSTRAINT "SupplierInvoice_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "SupplierInvoice" DROP CONSTRAINT "SupplierInvoice_userId_fkey";

-- DropForeignKey
ALTER TABLE "SupplierInvoiceTransaction" DROP CONSTRAINT "SupplierInvoiceTransaction_supplierInvoiceId_fkey";

-- DropForeignKey
ALTER TABLE "SupplierInvoiceTransaction" DROP CONSTRAINT "SupplierInvoiceTransaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "Surgery" DROP CONSTRAINT "Surgery_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Surgery" DROP CONSTRAINT "Surgery_userId_fkey";

-- DropForeignKey
ALTER TABLE "Timing" DROP CONSTRAINT "Timing_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Timing" DROP CONSTRAINT "Timing_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tooth" DROP CONSTRAINT "Tooth_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Tooth" DROP CONSTRAINT "Tooth_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Tooth" DROP CONSTRAINT "Tooth_userId_fkey";

-- DropForeignKey
ALTER TABLE "ToothTransaction" DROP CONSTRAINT "ToothTransaction_diagnosisId_fkey";

-- DropForeignKey
ALTER TABLE "ToothTransaction" DROP CONSTRAINT "ToothTransaction_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "ToothTransaction" DROP CONSTRAINT "ToothTransaction_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "ToothTransaction" DROP CONSTRAINT "ToothTransaction_toothId_fkey";

-- DropForeignKey
ALTER TABLE "ToothTransaction" DROP CONSTRAINT "ToothTransaction_userId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionCoursesTimeFrame" DROP CONSTRAINT "TransactionCoursesTimeFrame_payrollUserId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionRevenuesTimeFrame" DROP CONSTRAINT "TransactionRevenuesTimeFrame_payrollUserId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "UserSpecialty" DROP CONSTRAINT "UserSpecialty_branchId_fkey";

-- DropForeignKey
ALTER TABLE "UserSpecialty" DROP CONSTRAINT "UserSpecialty_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "UserSpecialty" DROP CONSTRAINT "UserSpecialty_specialtyId_fkey";

-- DropForeignKey
ALTER TABLE "UserSpecialty" DROP CONSTRAINT "UserSpecialty_userId_fkey";

-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_userId_fkey";

-- DropForeignKey
ALTER TABLE "ViewStatus" DROP CONSTRAINT "ViewStatus_activeViewId_fkey";

-- DropForeignKey
ALTER TABLE "ViewStatus" DROP CONSTRAINT "ViewStatus_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkingHours" DROP CONSTRAINT "WorkingHours_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "WorkingHours" DROP CONSTRAINT "WorkingHours_weekId_fkey";

-- AlterTable
ALTER TABLE "PayrollTransaction" ALTER COLUMN "reason" SET DEFAULT ' ';

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointsTransactions" ADD CONSTRAINT "PointsTransactions_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "MedicineDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_timingId_fkey" FOREIGN KEY ("timingId") REFERENCES "Timing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientView" ADD CONSTRAINT "PatientView_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientView" ADD CONSTRAINT "PatientView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewStatus" ADD CONSTRAINT "ViewStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewStatus" ADD CONSTRAINT "ViewStatus_activeViewId_fkey" FOREIGN KEY ("activeViewId") REFERENCES "View"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientViewStatus" ADD CONSTRAINT "PatientViewStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientViewStatus" ADD CONSTRAINT "PatientViewStatus_activeViewId_fkey" FOREIGN KEY ("activeViewId") REFERENCES "PatientView"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldGroup" ADD CONSTRAINT "FieldGroup_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "View"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentField" ADD CONSTRAINT "AppointmentField_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentField" ADD CONSTRAINT "AppointmentField_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientField" ADD CONSTRAINT "PatientField_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientField" ADD CONSTRAINT "PatientField_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientField" ADD CONSTRAINT "PatientField_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentFile" ADD CONSTRAINT "AppointmentFile_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentFile" ADD CONSTRAINT "AppointmentFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollUser" ADD CONSTRAINT "PayrollUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayrollTransaction" ADD CONSTRAINT "PayrollTransaction_payrollId_fkey" FOREIGN KEY ("payrollId") REFERENCES "Payroll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionCoursesTimeFrame" ADD CONSTRAINT "TransactionCoursesTimeFrame_payrollUserId_fkey" FOREIGN KEY ("payrollUserId") REFERENCES "PayrollUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionRevenuesTimeFrame" ADD CONSTRAINT "TransactionRevenuesTimeFrame_payrollUserId_fkey" FOREIGN KEY ("payrollUserId") REFERENCES "PayrollUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageSetup" ADD CONSTRAINT "PageSetup_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingHours" ADD CONSTRAINT "WorkingHours_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingHours" ADD CONSTRAINT "WorkingHours_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Snippet" ADD CONSTRAINT "Snippet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab" ADD CONSTRAINT "Lab_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab" ADD CONSTRAINT "Lab_labDefinitionId_fkey" FOREIGN KEY ("labDefinitionId") REFERENCES "LabDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lab" ADD CONSTRAINT "Lab_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_imageDefinitionId_fkey" FOREIGN KEY ("imageDefinitionId") REFERENCES "ImageDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineHistory" ADD CONSTRAINT "MedicineHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyHistory" ADD CONSTRAINT "FamilyHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankRevenue" ADD CONSTRAINT "BankRevenue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankRevenue" ADD CONSTRAINT "BankRevenue_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "BankDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankRevenue" ADD CONSTRAINT "BankRevenue_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankExpense" ADD CONSTRAINT "BankExpense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankExpense" ADD CONSTRAINT "BankExpense_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "BankDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankExpense" ADD CONSTRAINT "BankExpense_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceRevenue" ADD CONSTRAINT "InsuranceRevenue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceRevenue" ADD CONSTRAINT "InsuranceRevenue_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "CompanyDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceRevenue" ADD CONSTRAINT "InsuranceRevenue_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD CONSTRAINT "InventoryHistory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD CONSTRAINT "InventoryHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryHistory" ADD CONSTRAINT "InventoryHistory_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospital" ADD CONSTRAINT "Hospital_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospital" ADD CONSTRAINT "Hospital_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabDefinition" ADD CONSTRAINT "LabDefinition_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "LabCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabDefinition" ADD CONSTRAINT "LabDefinition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabDefinition" ADD CONSTRAINT "LabDefinition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabCategory" ADD CONSTRAINT "LabCategory_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabCategory" ADD CONSTRAINT "LabCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timing" ADD CONSTRAINT "Timing_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timing" ADD CONSTRAINT "Timing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierAccount" ADD CONSTRAINT "SupplierAccount_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierAccount" ADD CONSTRAINT "SupplierAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierInvoice" ADD CONSTRAINT "SupplierInvoice_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "SupplierAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierInvoice" ADD CONSTRAINT "SupplierInvoice_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierInvoice" ADD CONSTRAINT "SupplierInvoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierInvoiceTransaction" ADD CONSTRAINT "SupplierInvoiceTransaction_supplierInvoiceId_fkey" FOREIGN KEY ("supplierInvoiceId") REFERENCES "SupplierInvoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierInvoiceTransaction" ADD CONSTRAINT "SupplierInvoiceTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageDefinition" ADD CONSTRAINT "ImageDefinition_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ImageCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageDefinition" ADD CONSTRAINT "ImageDefinition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageDefinition" ADD CONSTRAINT "ImageDefinition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialDefinition" ADD CONSTRAINT "MaterialDefinition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialDefinition" ADD CONSTRAINT "MaterialDefinition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DentalDiagnosisDefinition" ADD CONSTRAINT "DentalDiagnosisDefinition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DentalDiagnosisDefinition" ADD CONSTRAINT "DentalDiagnosisDefinition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tooth" ADD CONSTRAINT "Tooth_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tooth" ADD CONSTRAINT "Tooth_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tooth" ADD CONSTRAINT "Tooth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacePartation" ADD CONSTRAINT "FacePartation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacePartation" ADD CONSTRAINT "FacePartation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacePartation" ADD CONSTRAINT "FacePartation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaceOperation" ADD CONSTRAINT "FaceOperation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaceOperation" ADD CONSTRAINT "FaceOperation_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "MaterialDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaceOperation" ADD CONSTRAINT "FaceOperation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaceOperation" ADD CONSTRAINT "FaceOperation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaceOperation" ADD CONSTRAINT "FaceOperation_partationId_fkey" FOREIGN KEY ("partationId") REFERENCES "FacePartation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToothTransaction" ADD CONSTRAINT "ToothTransaction_toothId_fkey" FOREIGN KEY ("toothId") REFERENCES "Tooth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToothTransaction" ADD CONSTRAINT "ToothTransaction_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "DentalDiagnosisDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToothTransaction" ADD CONSTRAINT "ToothTransaction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToothTransaction" ADD CONSTRAINT "ToothTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToothTransaction" ADD CONSTRAINT "ToothTransaction_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionDefinition" ADD CONSTRAINT "SessionDefinition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTypeDefinition" ADD CONSTRAINT "CourseTypeDefinition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Points" ADD CONSTRAINT "Points_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionTransaction" ADD CONSTRAINT "SessionTransaction_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "SessionDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionTransaction" ADD CONSTRAINT "SessionTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionTransaction" ADD CONSTRAINT "SessionTransaction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BankDefinition" ADD CONSTRAINT "BankDefinition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseTypeDefinition" ADD CONSTRAINT "ExpenseTypeDefinition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyDefinition" ADD CONSTRAINT "CompanyDefinition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanySessionDefinition" ADD CONSTRAINT "CompanySessionDefinition_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "CompanyDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanySessionDefinition" ADD CONSTRAINT "CompanySessionDefinition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesDefinition" ADD CONSTRAINT "SalesDefinition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_salesDefinitionId_fkey" FOREIGN KEY ("salesDefinitionId") REFERENCES "SalesDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseDefinition" ADD CONSTRAINT "CourseDefinition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentTypeDefinition" ADD CONSTRAINT "AppointmentTypeDefinition_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseDefinitionId_fkey" FOREIGN KEY ("courseDefinitionId") REFERENCES "CourseDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePayment" ADD CONSTRAINT "CoursePayment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePayment" ADD CONSTRAINT "CoursePayment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseUnitsHistory" ADD CONSTRAINT "CourseUnitsHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseUnitsHistory" ADD CONSTRAINT "CourseUnitsHistory_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageCategory" ADD CONSTRAINT "ImageCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageCategory" ADD CONSTRAINT "ImageCategory_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineDefinition" ADD CONSTRAINT "MedicineDefinition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientReport" ADD CONSTRAINT "PatientReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surgery" ADD CONSTRAINT "Surgery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Surgery" ADD CONSTRAINT "Surgery_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientSurgery" ADD CONSTRAINT "PatientSurgery_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientSurgery" ADD CONSTRAINT "PatientSurgery_surgeryId_fkey" FOREIGN KEY ("surgeryId") REFERENCES "Surgery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientSurgery" ADD CONSTRAINT "PatientSurgery_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientSurgery" ADD CONSTRAINT "PatientSurgery_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionRole" ADD CONSTRAINT "PermissionRole_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "PermissionRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rule" ADD CONSTRAINT "Rule_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Specialty" ADD CONSTRAINT "Specialty_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpecialty" ADD CONSTRAINT "UserSpecialty_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpecialty" ADD CONSTRAINT "UserSpecialty_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpecialty" ADD CONSTRAINT "UserSpecialty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSpecialty" ADD CONSTRAINT "UserSpecialty_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
