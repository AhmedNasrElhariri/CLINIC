# Migration `20200626151259-add-guradian-name`

This migration has been generated by etahoon at 6/26/2020, 3:12:59 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Clinic" ALTER COLUMN "address" SET DEFAULT '',
ALTER COLUMN "doctorJobDescription" SET DEFAULT '',
ALTER COLUMN "doctorName" SET DEFAULT '',
ALTER COLUMN "doctorTitle" SET DEFAULT '',
ALTER COLUMN "phoneNo" SET DEFAULT '';

ALTER TABLE "public"."Patient" ADD COLUMN "guardianName" text   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200626010554-remove-clinic-id-from-user..20200626151259-add-guradian-name
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -67,8 +67,9 @@
   appointments   Appointment[]
   age            Int
   sex            Sex
   organizationId String
+  guardianName   String?
 }
 model Appointment {
   id        String             @default(uuid()) @id
```

