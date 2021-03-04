# Migration `20210224231914-edit-appoitnment-data`

This migration has been generated by etahoon at 2/25/2021, 1:19:14 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
Begin;
CREATE TYPE "public"."AppointmentStatus_new" AS ENUM ('Scheduled', 'Cancelled', 'Missed', 'Changed', 'Archived');
ALTER TABLE "public"."Appointment" ALTER COLUMN "status" DROP DEFAULT,
                            ALTER COLUMN "status" TYPE "AppointmentStatus_new" USING ("status"::text::"AppointmentStatus_new"),
                            ALTER COLUMN "status" SET DEFAULT 'Scheduled';
ALTER TYPE "AppointmentStatus" RENAME TO "AppointmentStatus_old";
ALTER TYPE "AppointmentStatus_new" RENAME TO "AppointmentStatus";
DROP TYPE "AppointmentStatus_old";
Commit
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210224201819-inventory..20210224231914-edit-appoitnment-data
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
@@ -20,10 +20,8 @@
   Cancelled
   Missed
   Changed
   Archived
-  Done
-  Closed
 }
 enum Position {
   Admin
```

