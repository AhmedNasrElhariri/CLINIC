/*
  Warnings:

  - You are about to drop the column `session` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "session",
ADD COLUMN     "sessionId" TEXT;

-- AddForeignKey
ALTER TABLE "Appointment" ADD FOREIGN KEY ("sessionId") REFERENCES "SessionDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
