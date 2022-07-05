-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ar', 'en');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" "Language";
