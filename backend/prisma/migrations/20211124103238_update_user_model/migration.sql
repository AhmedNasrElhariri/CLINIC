-- AlterTable
ALTER TABLE "User" ADD COLUMN     "allowedViews" JSONB NOT NULL DEFAULT E'[]';
