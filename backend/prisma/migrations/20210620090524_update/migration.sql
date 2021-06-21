/*
  Warnings:

  - You are about to drop the column `name` on the `SessionDefinition` table. All the data in the column will be lost.
  - Added the required column `type` to the `SessionDefinition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `SessionDefinition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SessionDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionDefinition" DROP COLUMN "name",
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "specialtyId" TEXT,
ADD COLUMN     "branchId" TEXT;

-- AddForeignKey
ALTER TABLE "SessionDefinition" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionDefinition" ADD FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionDefinition" ADD FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
