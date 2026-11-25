-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADMIN');

-- CreateEnum
CREATE TYPE "KostGender" AS ENUM ('PUTRA', 'PUTRI', 'CAMPUR');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'NEEDS_REVISION', 'REJECTED');

-- CreateEnum
CREATE TYPE "FacilityCategory" AS ENUM ('BUILDING', 'ROOM');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('PRICE_DROP', 'ROOM_AVAILABLE', 'VERIFICATION_UPDATE', 'SYSTEM');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "avatarUrl" TEXT,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kost" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gender" "KostGender" NOT NULL,
    "address" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "rules" TEXT,
    "ownerName" TEXT NOT NULL,
    "ownerWhatsapp" TEXT NOT NULL,
    "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "lastVerifiedAt" TIMESTAMP(3),
    "minPrice" INTEGER NOT NULL DEFAULT 0,
    "totalAvailableRoom" INTEGER NOT NULL DEFAULT 0,
    "ratingAvg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomType" (
    "id" TEXT NOT NULL,
    "kostId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priceMonthly" INTEGER NOT NULL,
    "sizeDesc" TEXT,
    "totalRooms" INTEGER NOT NULL,
    "availableRooms" INTEGER NOT NULL,
    "includeElectric" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KostImage" (
    "id" TEXT NOT NULL,
    "kostId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KostImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconName" TEXT,
    "category" "FacilityCategory" NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KostFacility" (
    "kostId" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,

    CONSTRAINT "KostFacility_pkey" PRIMARY KEY ("kostId","facilityId")
);

-- CreateTable
CREATE TABLE "RoomTypeFacility" (
    "roomTypeId" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,

    CONSTRAINT "RoomTypeFacility_pkey" PRIMARY KEY ("roomTypeId","facilityId")
);

-- CreateTable
CREATE TABLE "CampusLandmark" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CampusLandmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KostDistance" (
    "id" TEXT NOT NULL,
    "kostId" TEXT NOT NULL,
    "landmarkId" TEXT NOT NULL,
    "distanceMeters" INTEGER NOT NULL,
    "walkMinutes" INTEGER NOT NULL,
    "rideMinutes" INTEGER NOT NULL,

    CONSTRAINT "KostDistance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inspection" (
    "id" TEXT NOT NULL,
    "kostId" TEXT NOT NULL,
    "inspectorId" TEXT NOT NULL,
    "inspectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "VerificationStatus" NOT NULL,
    "score" INTEGER NOT NULL,
    "summaryNote" TEXT,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspectionItem" (
    "id" TEXT NOT NULL,
    "inspectionId" TEXT NOT NULL,
    "criterion" TEXT NOT NULL,
    "isPassed" BOOLEAN NOT NULL,
    "note" TEXT,

    CONSTRAINT "InspectionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedKost" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kostId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedKost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ViewHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kostId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ViewHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kostId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "linkUrl" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Kost_slug_key" ON "Kost"("slug");

-- CreateIndex
CREATE INDEX "Kost_gender_verificationStatus_minPrice_idx" ON "Kost"("gender", "verificationStatus", "minPrice");

-- CreateIndex
CREATE INDEX "Kost_area_idx" ON "Kost"("area");

-- CreateIndex
CREATE INDEX "Kost_latitude_longitude_idx" ON "Kost"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "RoomType_kostId_priceMonthly_idx" ON "RoomType"("kostId", "priceMonthly");

-- CreateIndex
CREATE INDEX "KostImage_kostId_sortOrder_idx" ON "KostImage"("kostId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Facility_name_key" ON "Facility"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CampusLandmark_code_key" ON "CampusLandmark"("code");

-- CreateIndex
CREATE INDEX "KostDistance_landmarkId_distanceMeters_idx" ON "KostDistance"("landmarkId", "distanceMeters");

-- CreateIndex
CREATE UNIQUE INDEX "KostDistance_kostId_landmarkId_key" ON "KostDistance"("kostId", "landmarkId");

-- CreateIndex
CREATE INDEX "Inspection_kostId_inspectedAt_idx" ON "Inspection"("kostId", "inspectedAt");

-- CreateIndex
CREATE INDEX "InspectionItem_inspectionId_idx" ON "InspectionItem"("inspectionId");

-- CreateIndex
CREATE INDEX "SavedKost_userId_createdAt_idx" ON "SavedKost"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "SavedKost_userId_kostId_key" ON "SavedKost"("userId", "kostId");

-- CreateIndex
CREATE INDEX "ViewHistory_userId_viewedAt_idx" ON "ViewHistory"("userId", "viewedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ViewHistory_userId_kostId_key" ON "ViewHistory"("userId", "kostId");

-- CreateIndex
CREATE INDEX "Review_kostId_createdAt_idx" ON "Review"("kostId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_kostId_key" ON "Review"("userId", "kostId");

-- CreateIndex
CREATE INDEX "Notification_userId_isRead_createdAt_idx" ON "Notification"("userId", "isRead", "createdAt");

-- AddForeignKey
ALTER TABLE "RoomType" ADD CONSTRAINT "RoomType_kostId_fkey" FOREIGN KEY ("kostId") REFERENCES "Kost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KostImage" ADD CONSTRAINT "KostImage_kostId_fkey" FOREIGN KEY ("kostId") REFERENCES "Kost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KostFacility" ADD CONSTRAINT "KostFacility_kostId_fkey" FOREIGN KEY ("kostId") REFERENCES "Kost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KostFacility" ADD CONSTRAINT "KostFacility_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTypeFacility" ADD CONSTRAINT "RoomTypeFacility_roomTypeId_fkey" FOREIGN KEY ("roomTypeId") REFERENCES "RoomType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTypeFacility" ADD CONSTRAINT "RoomTypeFacility_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KostDistance" ADD CONSTRAINT "KostDistance_kostId_fkey" FOREIGN KEY ("kostId") REFERENCES "Kost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KostDistance" ADD CONSTRAINT "KostDistance_landmarkId_fkey" FOREIGN KEY ("landmarkId") REFERENCES "CampusLandmark"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_kostId_fkey" FOREIGN KEY ("kostId") REFERENCES "Kost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_inspectorId_fkey" FOREIGN KEY ("inspectorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspectionItem" ADD CONSTRAINT "InspectionItem_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "Inspection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedKost" ADD CONSTRAINT "SavedKost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedKost" ADD CONSTRAINT "SavedKost_kostId_fkey" FOREIGN KEY ("kostId") REFERENCES "Kost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewHistory" ADD CONSTRAINT "ViewHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewHistory" ADD CONSTRAINT "ViewHistory_kostId_fkey" FOREIGN KEY ("kostId") REFERENCES "Kost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_kostId_fkey" FOREIGN KEY ("kostId") REFERENCES "Kost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
