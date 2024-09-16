/*
  Warnings:

  - You are about to drop the column `queueLimit` on the `Doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "durationMins" INTEGER NOT NULL DEFAULT 12;

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "queueLimit",
ADD COLUMN     "workingHours" JSONB NOT NULL DEFAULT '{"start": "0800", "end": "1700", "breakStart": "1300", "breakEnd": "1400"}',
ALTER COLUMN "available" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "age" INTEGER DEFAULT 0,
ADD COLUMN     "gender" TEXT DEFAULT 'M';
