/*
  Warnings:

  - A unique constraint covering the columns `[userId,specialtyId,branchId]` on the table `UserSpecialty` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userId_specialtyId_branchId_unique_constraint" ON "UserSpecialty"("userId", "specialtyId", "branchId");
