# Migration `20200518073540-updated-appointment-schema`

This migration has been generated by etahoon at 5/18/2020, 7:35:40 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Appointment" DROP COLUMN "complain",
DROP COLUMN "diagnosis",
DROP COLUMN "glucoseLevel",
DROP COLUMN "height",
DROP COLUMN "pulse",
DROP COLUMN "recommendations",
DROP COLUMN "signs",
DROP COLUMN "temp",
DROP COLUMN "treatment",
DROP COLUMN "weight";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200518072712-init..20200518073540-updated-appointment-schema
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
@@ -76,18 +76,8 @@
   specialty       Specialty
   doctor          User               @relation(fields: [doctorId], references: [id])
   doctorId        String
   labs            String?            @default("[]")
-  complain        String?            @default("")
-  signs           String?            @default("")
-  diagnosis       String?            @default("")
-  treatment       String?            @default("")
-  recommendations String?            @default("")
-  weight          Float?             @default(-1)
-  height          Float?             @default(-1)
-  pulse           Float?             @default(-1)
-  temp            Float?             @default(-1)
-  glucoseLevel    Float?             @default(-1)
   status          AppointmentStatus
   data            AppointmentField[]
 }
```

