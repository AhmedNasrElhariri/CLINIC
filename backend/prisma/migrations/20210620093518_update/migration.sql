/*
  Warnings:

  - Added the required column `price` to the `SessionDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionDefinition" ADD COLUMN     "price" INTEGER NOT NULL;
