-- CreateTable
CREATE TABLE "DoctorCoursePartDefination" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "partId" TEXT NOT NULL,
    "feesCalculationMethod" "FeesCalculationMethod",
    "feesCalculationType" "FeesCalculationType" NOT NULL,
    "fees" INTEGER,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "DoctorCoursePartDefination_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DoctorCoursePartDefination_partId_doctorId_key" ON "DoctorCoursePartDefination"("partId", "doctorId");

-- AddForeignKey
ALTER TABLE "DoctorCoursePartDefination" ADD CONSTRAINT "DoctorCoursePartDefination_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorCoursePartDefination" ADD CONSTRAINT "DoctorCoursePartDefination_partId_fkey" FOREIGN KEY ("partId") REFERENCES "CourseTypeDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorCoursePartDefination" ADD CONSTRAINT "DoctorCoursePartDefination_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
