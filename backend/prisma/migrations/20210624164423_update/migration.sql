/*
  Warnings:

  - You are about to drop the column `pulses` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `powerOne` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `powerTwo` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `sessions` on the `Configuration` table. All the data in the column will be lost.
  - You are about to drop the `PulseControl` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "pulses",
DROP COLUMN "powerOne",
DROP COLUMN "powerTwo";

-- AlterTable
ALTER TABLE "Configuration" DROP COLUMN "sessions";

-- DropTable
DROP TABLE "PulseControl";
