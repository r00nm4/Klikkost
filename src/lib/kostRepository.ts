import "server-only";
import {
  FacilityCategory,
  VerificationStatus,
  type Prisma,
} from "@prisma/client";
import type { Kost as AppKost, KostType } from "@/types";
import { prisma } from "./prisma";

const kostInclude = {
  roomTypes: {
    orderBy: { priceMonthly: "asc" },
    include: { facilities: { include: { facility: true } } },
  },
  images: {
    orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }],
  },
  facilities: { include: { facility: true } },
  distances: { include: { landmark: { select: { code: true } } } },
  inspections: {
    where: { status: VerificationStatus.VERIFIED },
    orderBy: { inspectedAt: "desc" },
    take: 1,
  },
} satisfies Prisma.KostInclude;

type KostRecord = Prisma.KostGetPayload<{ include: typeof kostInclude }>;

const genderLabels: Record<KostRecord["gender"], KostType> = {
  PUTRA: "Putra",
  PUTRI: "Putri",
  CAMPUR: "Campur",
};

const facilityLabels: Record<string, string> = {
  "WiFi Cepat": "WiFi",
  "Dapur Bersama": "Dapur",
  "CCTV 24 Jam": "CCTV",
  "Kasur & Dipan": "Kasur",
  "Lemari Pakaian": "Lemari",
  "Meja Belajar": "Meja",
  "Kamar Mandi Dalam": "KM Dalam",
};

function displayFacility(name: string) {
  return facilityLabels[name] ?? name;
}

function mapKost(record: KostRecord): AppKost {
  const cheapestRoomType = record.roomTypes[0];

  if (!cheapestRoomType) {
    throw new Error(`Kost "${record.name}" belum memiliki tipe kamar.`);
  }

  const gateDistance =
    record.distances.find((distance) => distance.landmark.code === "GERBANG_UTAMA")
      ?.distanceMeters ??
    record.distances.reduce<number | null>(
      (nearest, distance) =>
        nearest === null ? distance.distanceMeters : Math.min(nearest, distance.distanceMeters),
      null,
    );
  const inspection = record.inspections[0];
  const roomFacilities = [
    ...new Set(
      record.roomTypes.flatMap((roomType) =>
        roomType.facilities.map(({ facility }) => displayFacility(facility.name)),
      ),
    ),
  ];

  return {
    id: record.id,
    nama: record.name,
    tipe: genderLabels[record.gender],
    harga: cheapestRoomType.priceMonthly,
    jarakKampusM: gateDistance,
    lat: record.latitude,
    lng: record.longitude,
    verified: record.verificationStatus === VerificationStatus.VERIFIED,
    fotos: record.images.map((image) => image.url),
    fasilitasKamar: roomFacilities,
    fasilitasUmum: record.facilities
      .filter(({ facility }) => facility.category === FacilityCategory.BUILDING)
      .map(({ facility }) => displayFacility(facility.name)),
    rincianBiaya: {
      sewa: cheapestRoomType.priceMonthly,
      listrik: cheapestRoomType.includeElectric ? 0 : null,
      air: null,
      deposit: null,
    },
    inspeksi: {
      skor: inspection ? inspection.score / 20 : null,
      tanggal: inspection?.inspectedAt.toISOString().slice(0, 10) ?? null,
      catatan: inspection?.summaryNote ?? "Belum ada data inspeksi.",
    },
    tersedia: record.roomTypes.some((roomType) => roomType.availableRooms > 0),
    whatsapp: record.ownerWhatsapp,
    alamat: record.address,
    deskripsi: record.description,
  };
}

export async function getKosts(): Promise<AppKost[]> {
  const records = await prisma.kost.findMany({
    where: { isActive: true },
    include: kostInclude,
    orderBy: { name: "asc" },
  });

  return records.map(mapKost);
}

export async function getKostById(id: string): Promise<AppKost | null> {
  const record = await prisma.kost.findFirst({
    where: { id, isActive: true },
    include: kostInclude,
  });

  return record ? mapKost(record) : null;
}
