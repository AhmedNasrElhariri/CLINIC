-- AlterTable
ALTER TABLE "DoctorFees" ADD COLUMN     "partId" TEXT;

-- AddForeignKey
ALTER TABLE "DoctorFees" ADD CONSTRAINT "DoctorFees_partId_fkey" FOREIGN KEY ("partId") REFERENCES "CourseTypeDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
