-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "pulses" INTEGER,
ADD COLUMN     "powerOne" INTEGER,
ADD COLUMN     "powerTwo" INTEGER,
ADD COLUMN     "sessionsPulses" JSONB DEFAULT E'[]';

-- CreateTable
CREATE TABLE "PulseControl" (
    "id" TEXT NOT NULL,
    "before" INTEGER NOT NULL DEFAULT 0,
    "after" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);
