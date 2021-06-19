-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "sessionId" TEXT;

-- AddForeignKey
ALTER TABLE "Appointment" ADD FOREIGN KEY ("sessionId") REFERENCES "SessionDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
