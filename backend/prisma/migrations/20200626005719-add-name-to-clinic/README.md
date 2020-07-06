# Migration `20200626005719-add-name-to-clinic`

This migration has been generated by etahoon at 6/26/2020, 12:57:19 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Clinic" ADD COLUMN "name" text   ,
ALTER COLUMN "address" SET DEFAULT '',
ALTER COLUMN "doctorJobDescription" SET DEFAULT '',
ALTER COLUMN "doctorName" SET DEFAULT '',
ALTER COLUMN "doctorTitle" SET DEFAULT '',
ALTER COLUMN "phoneNo" SET DEFAULT '';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200626005201-many-to-many-users-clinics..20200626005719-add-name-to-clinic
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
@@ -153,8 +153,9 @@
 }
 model Clinic {
   id                   String  @default(uuid()) @id
+  name                 String?
   // shown on prescription
   doctorName           String? @default("''")
   // shown on prescription
   doctorTitle          String? @default("''")
```

