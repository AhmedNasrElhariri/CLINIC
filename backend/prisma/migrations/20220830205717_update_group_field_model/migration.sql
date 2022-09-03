-- CreateEnum
CREATE TYPE "FieldGroupStatus" AS ENUM ('Static', 'Dynamic');

-- AlterTable
ALTER TABLE "FieldGroup" ADD COLUMN     "status" "FieldGroupStatus" DEFAULT E'Static';
