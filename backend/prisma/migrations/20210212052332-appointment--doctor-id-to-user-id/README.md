# Migration `20210212052332-appointment--doctor-id-to-user-id`

This migration has been generated by etahoon at 2/12/2021, 7:23:32 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Appointment" DROP CONSTRAINT "Appointment_doctorId_fkey"

ALTER TABLE "public"."Appointment" DROP COLUMN "doctorId",
ADD COLUMN "userId" text   NOT NULL 

ALTER TABLE "public"."Appointment" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210211022727-init..20210212052332-appointment--doctor-id-to-user-id
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
@@ -132,10 +132,10 @@
   date             DateTime           @default(now())
   type             AppointmentType
   patient          Patient            @relation(fields: [patientId], references: [id])
   patientId        String
-  doctor           User               @relation(fields: [doctorId], references: [id])
-  doctorId         String
+  user             User               @relation(fields: [userId], references: [id])
+  userId           String
   labs             String?            @default("[]")
   status           AppointmentStatus
   data             AppointmentField[]
   collections      Collection[]
```

