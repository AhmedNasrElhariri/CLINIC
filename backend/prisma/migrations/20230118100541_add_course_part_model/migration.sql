-- CreateTable
CREATE TABLE "CoursePart" (
    "id" TEXT NOT NULL,
    "totalUnits" INTEGER NOT NULL,
    "remainingUnits" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "courseId" TEXT NOT NULL,
    "partId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "CoursePart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoursePart" ADD CONSTRAINT "CoursePart_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePart" ADD CONSTRAINT "CoursePart_partId_fkey" FOREIGN KEY ("partId") REFERENCES "CourseTypeDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePart" ADD CONSTRAINT "CoursePart_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
