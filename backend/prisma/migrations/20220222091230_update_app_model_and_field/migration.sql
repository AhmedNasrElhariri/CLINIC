/*
  Warnings:

  - The values [MultipleSelector] on the enum `FieldType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `dynamicTextInput` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FieldType_new" AS ENUM ('Text', 'Number', 'LongText', 'Radio', 'Check', 'NestedSelector', 'SelectorWithInput');
ALTER TABLE "Field" ALTER COLUMN "type" TYPE "FieldType_new" USING ("type"::text::"FieldType_new");
ALTER TYPE "FieldType" RENAME TO "FieldType_old";
ALTER TYPE "FieldType_new" RENAME TO "FieldType";
DROP TYPE "FieldType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "dynamicTextInput";
