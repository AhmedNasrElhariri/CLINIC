-- CreateEnum
CREATE TYPE "LoggingModel" AS ENUM ('Revenue');

-- CreateEnum
CREATE TYPE "LoggingAction" AS ENUM ('update', 'delete', 'insert');

-- CreateTable
CREATE TABLE "Logging" (
    "id" TEXT NOT NULL,
    "model" "LoggingModel" NOT NULL,
    "recordId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "action" "LoggingAction" NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Logging_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Logging" ADD CONSTRAINT "Logging_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logging" ADD CONSTRAINT "Logging_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
