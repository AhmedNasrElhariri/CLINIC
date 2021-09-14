/*
  Warnings:

  - Added the required column `units` to the `FaceOperation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `FacePartation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FaceOperation" ADD COLUMN     "units" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FacePartation" ADD COLUMN     "name" TEXT NOT NULL;
