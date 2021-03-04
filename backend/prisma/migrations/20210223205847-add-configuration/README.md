# Migration `20210223205847-add-configuration`

This migration has been generated by etahoon at 2/23/2021, 10:58:47 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Configuration" (
"id" text   NOT NULL ,
"userId" text   NOT NULL ,
"sessions" jsonb   NOT NULL DEFAULT '[]',
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "userid_unique_constraint" ON "public"."Configuration"("userId")

ALTER TABLE "public"."Configuration" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210215023350-add-user-to-revenues-and-expenses..20210223205847-add-configuration
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
@@ -133,8 +133,9 @@
   patientReports      PatientReport[]
   patients            Patient[]
   expenses            Expense[]
   revenues            Revenue[]
+  configurations      Configuration?
 }
 model Patient {
   id               String                @id @default(uuid())
@@ -254,8 +255,17 @@
   File             File?              @relation(fields: [fileId], references: [id])
   fileId           String?
 }
+model Configuration {
+  id       String @id @default(uuid())
+  user     User   @relation(fields: [userId], references: [id])
+  userId   String
+  sessions Json   @default("[]")
+
+  @@unique([userId], name: "userid_unique_constraint")
+}
+
 model Week {
   id     String @id @default(uuid())
   weekNo Int
   year   Int
```

