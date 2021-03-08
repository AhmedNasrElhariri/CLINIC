# Migration `20210306133026-add`

This migration has been generated by ahmed nasr at 3/6/2021, 3:30:31 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Appointment" DROP COLUMN "labs",
ADD COLUMN "prescriptionId" text   ,
ADD COLUMN "appointmentLabId" text   

CREATE TABLE "public"."Prescription" (
"id" text   NOT NULL ,
"medicineId" text   NOT NULL ,
"timingId" text   NOT NULL ,
"durationLength" integer   NOT NULL ,
"durationType" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."AppointmentLab" (
"id" text   NOT NULL ,
"testId" text   NOT NULL ,
"appointmentId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."LabCategory" (
"id" text   NOT NULL ,
"name" text   NOT NULL ,
"userId" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."ImageCategory" (
"id" text   NOT NULL ,
"name" text   NOT NULL ,
"userId" text   NOT NULL ,
PRIMARY KEY ("id")
)

ALTER TABLE "public"."Prescription" ADD FOREIGN KEY ("medicineId")REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Prescription" ADD FOREIGN KEY ("timingId")REFERENCES "public"."Timing"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."AppointmentLab" ADD FOREIGN KEY ("testId")REFERENCES "public"."TestDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."AppointmentLab" ADD FOREIGN KEY ("appointmentId")REFERENCES "public"."Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."LabCategory" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."ImageCategory" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Appointment" ADD FOREIGN KEY ("prescriptionId")REFERENCES "public"."Prescription"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210306132657-add..20210306133026-add
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
@@ -139,8 +139,9 @@
   InventoryItem       InventoryItem[]
   Item                Item[]
   Timing              Timing[]
   LabCategory         LabCategory[]
+  ImageCategory       ImageCategory[]
 }
 model Patient {
   id               String                @id @default(uuid())
@@ -478,8 +479,15 @@
   user      User   @relation(fields: [userId], references: [id])
   userId    String
 }
+model ImageCategory {
+  id     String @id @default(uuid())
+  name   String
+  user   User   @relation(fields: [userId], references: [id])
+  userId String
+}
+
 model MedicineDefinition {
   id            String @id @default(uuid())
   medicineName  String
   concentration String
```

