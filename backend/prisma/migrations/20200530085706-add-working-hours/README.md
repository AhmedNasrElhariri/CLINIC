# Migration `20200530085706-add-working-hours`

This migration has been generated by etahoon at 5/30/2020, 8:57:06 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Week" (
"id" text  NOT NULL ,"weekNo" integer  NOT NULL ,"year" integer  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."WorkingHours" (
"doctorId" text  NOT NULL ,"end" timestamp(3)  NOT NULL ,"id" text  NOT NULL ,"start" timestamp(3)  NOT NULL ,"weekId" text  NOT NULL ,
    PRIMARY KEY ("id"))

ALTER TABLE "public"."Clinic" ALTER COLUMN "address" SET DEFAULT '',
ALTER COLUMN "doctorJobDescription" SET DEFAULT '',
ALTER COLUMN "doctorName" SET DEFAULT '',
ALTER COLUMN "doctorTitle" SET DEFAULT '',
ALTER COLUMN "phoneNo" SET DEFAULT '';

CREATE UNIQUE INDEX "week_year_unique_constraint" ON "public"."Week"("weekNo","year")

ALTER TABLE "public"."WorkingHours" ADD FOREIGN KEY ("weekId")REFERENCES "public"."Week"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."WorkingHours" ADD FOREIGN KEY ("doctorId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200530085617..20200530085706-add-working-hours
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
@@ -174,10 +174,12 @@
   @@unique([weekNo, year], name: "week_year_unique_constraint")
 }
 model WorkingHours {
-  id     String   @default(uuid()) @id
-  week   Week     @relation(fields: [weekId], references: [id])
-  weekId String
-  start  DateTime
-  end    DateTime
+  id       String   @default(uuid()) @id
+  week     Week     @relation(fields: [weekId], references: [id])
+  weekId   String
+  doctor   User     @relation(fields: [doctorId], references: [id])
+  doctorId String
+  start    DateTime
+  end      DateTime
 }
```

