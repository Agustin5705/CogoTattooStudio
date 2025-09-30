-- CreateTable
CREATE TABLE "public"."GalleryImage" (
    "id" UUID NOT NULL,
    "publicId" TEXT NOT NULL,
    "secureUrl" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GalleryImage_publicId_key" ON "public"."GalleryImage"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "GalleryImage_secureUrl_key" ON "public"."GalleryImage"("secureUrl");
