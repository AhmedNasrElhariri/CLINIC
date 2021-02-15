# Migration `20210212063725-add-permission-enum`

This migration has been generated by etahoon at 2/12/2021, 8:37:25 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."PermissionAction" AS ENUM ('List_Appointment', 'Create_Appointment', 'Reschedule_Appointment', 'Finish_Appointment', 'Cancel_Appointment', 'Archive_Appointment', 'View_Patient', 'View_Accounting', 'AddRevenue_Accounting', 'AddExpense_Accounting', 'EditRevenue_Accounting', 'EditExpense_Accounting', 'PrintAccounting', 'ViewCalendar', 'CreateEvent_Calendar', 'View_Inventory', 'AddItem_Inventory', 'ViewHistory_Inventory', 'DefineItem_Inventory')

DROP INDEX "public"."actionId_roleId_unique_constraint"

ALTER TABLE "public"."Permission" DROP CONSTRAINT "Permission_actionId_fkey"

ALTER TABLE "public"."Permission" DROP COLUMN "actionId",
ADD COLUMN "action" "PermissionAction"  NOT NULL 

CREATE UNIQUE INDEX "action_roleId_unique_constraint" ON "public"."Permission"("action", "roleId")

DROP TABLE "public"."Action"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210212052332-appointment--doctor-id-to-user-id..20210212063725-add-permission-enum
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource postgresql {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -61,8 +61,31 @@
   Add
   Substract
 }
+enum PermissionAction {
+  List_Appointment
+  Create_Appointment
+  Reschedule_Appointment
+  Finish_Appointment
+  Cancel_Appointment
+  Archive_Appointment
+  View_Patient
+  View_Accounting
+  AddRevenue_Accounting
+  AddExpense_Accounting
+  EditRevenue_Accounting
+  EditExpense_Accounting
+  PrintAccounting
+  ViewCalendar
+  CreateEvent_Calendar
+  View_Inventory
+  AddItem_Inventory
+  ViewHistory_Inventory
+  DefineItem_Inventory
+
+}
+
 ////////////////////////////////////////////////////////////////////////////////////////////////////////
 model Organization {
   id               String           @id @default(uuid())
@@ -466,20 +489,19 @@
   users          User[]
 }
 model Permission {
-  id             String          @id @default(uuid())
-  all            Boolean         @default(false)
-  role           PermissionRole  @relation(fields: [roleId], references: [id])
+  id             String           @id @default(uuid())
+  all            Boolean          @default(false)
+  role           PermissionRole   @relation(fields: [roleId], references: [id])
   roleId         String
-  action         Action          @relation(fields: [actionId], references: [id])
-  actionId       String
+  action         PermissionAction
   level          PermissionLevel
   rules          Rule[]
-  organization   Organization    @relation(fields: [organizationId], references: [id])
+  organization   Organization     @relation(fields: [organizationId], references: [id])
   organizationId String
-  @@unique([actionId, roleId], name: "actionId_roleId_unique_constraint")
+  @@unique([action, roleId], name: "action_roleId_unique_constraint")
 }
 model Rule {
   id             String       @id @default(uuid())
@@ -531,12 +553,5 @@
   @@unique([userId, branchId], name: "userId_branchId_unique_constraint")
 }
-model Action {
-  id          String       @id @default(uuid())
-  name        String
-  subject     String
-  permissions Permission[]
-}
-
 // end permission
```

