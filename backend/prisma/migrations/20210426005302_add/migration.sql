/*
  Warnings:

  - Added the required column `startDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('InProgress', 'Finished', 'EarlyFinished');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "businessNotes" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "CourseStatus" NOT NULL;
