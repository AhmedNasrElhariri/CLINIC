# Migration `20210212130117-add-user-id-and-appointment-id`

This migration has been generated by etahoon at 2/12/2021, 3:01:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Appointment" ADD COLUMN "doctorId" text   NOT NULL 

ALTER TABLE "public"."Permission" ALTER COLUMN "action" DROP DEFAULT

ALTER TABLE "public"."Appointment" ADD FOREIGN KEY ("doctorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210212092907-update-actions..20210212130117-add-user-id-and-appointment-id
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
@@ -111,9 +111,10 @@
   organization        Organization         @relation(fields: [organizationId], references: [id])
   organizationId      String
   role                PermissionRole?      @relation(fields: [roleId], references: [id])
   roleId              String?
-  appointments        Appointment[]
+  appointments        Appointment[]        @relation(name: "user_appointment")
+  doctors             Appointment[]        @relation("doctor_appointment")
   views               View[]
   viewStatus          ViewStatus[]
   clinics             Clinic[]             @relation(references: [id])
   workingHours        WorkingHours[]
@@ -154,10 +155,12 @@
   date             DateTime           @default(now())
   type             AppointmentType
   patient          Patient            @relation(fields: [patientId], references: [id])
   patientId        String
-  user             User               @relation(fields: [userId], references: [id])
+  user             User               @relation(name: "user_appointment", fields: [userId], references: [id])
   userId           String
+  doctor           User               @relation(name: "doctor_appointment", fields: [doctorId], references: [id])
+  doctorId         String
   labs             String?            @default("[]")
   status           AppointmentStatus
   data             AppointmentField[]
   collections      Collection[]
```

