/*
  Warnings:

  - You are about to drop the column `description` on the `GalleryImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."GalleryImage" DROP COLUMN "description",
ADD COLUMN     "tags" TEXT[];
