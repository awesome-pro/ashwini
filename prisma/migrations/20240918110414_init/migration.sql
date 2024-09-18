/*
  Warnings:

  - The primary key for the `Patient` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "patientId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Patient_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Patient_id_seq";

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
