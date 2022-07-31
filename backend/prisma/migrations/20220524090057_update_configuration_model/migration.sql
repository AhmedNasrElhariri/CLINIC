-- AlterTable
ALTER TABLE "Configuration" ADD COLUMN     "enableSMS" BOOLEAN DEFAULT false,
ADD COLUMN     "orgName" TEXT,
ADD COLUMN     "orgPhoneNo" TEXT;
