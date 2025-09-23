/*
  Warnings:

  - You are about to drop the column `budget` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Contact" DROP COLUMN "budget",
ADD COLUMN     "fecha" TIMESTAMP(3),
ADD COLUMN     "presupuesto" DOUBLE PRECISION;
