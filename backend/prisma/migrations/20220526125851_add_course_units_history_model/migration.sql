-- CreateTable
CREATE TABLE "CourseUnitsHistory" (
    "id" TEXT NOT NULL,
    "units" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "doctorId" TEXT,
    "specialtyId" TEXT,
    "branchId" TEXT,
    "courseId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseUnitsHistory" ADD FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseUnitsHistory" ADD FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseUnitsHistory" ADD FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseUnitsHistory" ADD FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
