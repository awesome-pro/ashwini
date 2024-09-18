/*
  Warnings:

  - The primary key for the `Patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Patient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `patientId` on the `Appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "patientId",
ADD COLUMN     "patientId" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "Patient_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
