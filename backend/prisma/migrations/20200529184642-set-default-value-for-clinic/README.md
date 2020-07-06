# Migration `20200529184642-set-default-value-for-clinic`

This migration has been generated by etahoon at 5/29/2020, 6:46:42 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Clinic" ALTER COLUMN "address" SET DEFAULT '',
ALTER COLUMN "doctorJobDescription" SET DEFAULT '',
ALTER COLUMN "doctorName" SET DEFAULT '',
ALTER COLUMN "doctorTitle" SET DEFAULT '';
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200529164515-add-organization-id-to-user..20200529184642-set-default-value-for-clinic
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
@@ -151,15 +151,15 @@
 model Clinic {
   id                   String  @default(uuid()) @id
   // shown on prescription
-  doctorName           String?
+  doctorName           String? @default("")
   // shown on prescription
-  doctorTitle          String?
+  doctorTitle          String? @default("")
   // shown on prescription
-  doctorJobDescription String?
+  doctorJobDescription String? @default("")
   // shown on prescription
-  address              String?
+  address              String? @default("")
   logo                 File?   @relation(fields: [logoId], references: [id])
   logoId               String?
   users                User[]
   organizationId       String
```

