import {
  Role,
  KostGender,
  VerificationStatus,
  FacilityCategory,
  NotificationType,
} from "@prisma/client";
import { createPrismaClient } from "../src/lib/createPrismaClient";

const prisma = createPrismaClient();

/**
 * Menghitung jarak permukaan bumi (meter) menggunakan rumus Haversine.
 * Dikalikan faktor rute jalan 1.25 agar mendekati jarak tempuh riil di gang/jalan Sekaran.
 */
function calculateDistanceMetrics(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371000; // Radius bumi dalam meter
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightMeters = R * c;
  const distanceMeters = Math.round(straightMeters * 1.25);

  const walkMinutes = Math.max(1, Math.round(distanceMeters / 75)); // ~4.5 km/jam
  const rideMinutes = Math.max(1, Math.round(distanceMeters / 350)); // ~21 km/jam area kampus

  return { distanceMeters, walkMinutes, rideMinutes };
}

async function main() {
  console.log("Memulai seeding database KlikKost UNNES...");

  // 1. SEED USERS (ADMIN & MAHASISWA)
  const admin = await prisma.user.upsert({
    where: { email: "admin@klikkost.id" },
    update: {},
    create: {
      name: "Tim Inspeksi KlikKost",
      email: "admin@klikkost.id",
      role: Role.ADMIN,
    },
  });

  const student = await prisma.user.upsert({
    where: { email: "mahasiswa@students.unnes.ac.id" },
    update: {},
    create: {
      name: "Nadia Putri",
      email: "mahasiswa@students.unnes.ac.id",
      role: Role.STUDENT,
    },
  });

  // 2. SEED CAMPUS LANDMARKS (UNNES SEKARAN)
  const landmarksData = [
    { code: "GERBANG_UTAMA", name: "Gerbang Utama UNNES", latitude: -7.0507, longitude: 110.3924 },
    { code: "FMIPA", name: "Fakultas MIPA (FMIPA)", latitude: -7.0517, longitude: 110.3948 },
    { code: "FT", name: "Fakultas Teknik (FT)", latitude: -7.0510, longitude: 110.3976 },
    { code: "FEB", name: "Fakultas Ekonomika & Bisnis (FEB)", latitude: -7.0528, longitude: 110.3910 },
    { code: "FIPP", name: "Fakultas Ilmu Pendidikan & Psikologi (FIPP)", latitude: -7.0493, longitude: 110.3916 },
    { code: "FBS", name: "Fakultas Bahasa & Seni (FBS)", latitude: -7.0526, longitude: 110.3965 },
    { code: "FISIP", name: "Fakultas Ilmu Sosial & Ilmu Politik (FISIP)", latitude: -7.0501, longitude: 110.3942 },
    { code: "FIK", name: "Fakultas Ilmu Keolahragaan (FIK)", latitude: -7.0539, longitude: 110.3982 },
    { code: "FH", name: "Fakultas Hukum (FH)", latitude: -7.0496, longitude: 110.3964 },
  ];

  const landmarks = await Promise.all(
    landmarksData.map((lm) =>
      prisma.campusLandmark.upsert({
        where: { code: lm.code },
        update: { name: lm.name, latitude: lm.latitude, longitude: lm.longitude },
        create: lm,
      })
    )
  );

  // 3. SEED MASTER FACILITIES (IKON LUCIDE REACT)
  const facilitiesData = [
    // Fasilitas Gedung (BUILDING)
    { name: "WiFi Cepat", iconName: "Wifi", category: FacilityCategory.BUILDING },
    { name: "Parkir Motor", iconName: "Bike", category: FacilityCategory.BUILDING },
    { name: "Parkir Mobil", iconName: "Car", category: FacilityCategory.BUILDING },
    { name: "Dapur Bersama", iconName: "CookingPot", category: FacilityCategory.BUILDING },
    { name: "CCTV 24 Jam", iconName: "Cctv", category: FacilityCategory.BUILDING },
    { name: "Jemuran", iconName: "Sun", category: FacilityCategory.BUILDING },
    // Fasilitas Kamar (ROOM)
    { name: "AC", iconName: "Wind", category: FacilityCategory.ROOM },
    { name: "Kamar Mandi Dalam", iconName: "Bath", category: FacilityCategory.ROOM },
    { name: "Kasur & Dipan", iconName: "BedDouble", category: FacilityCategory.ROOM },
    { name: "Lemari Pakaian", iconName: "DoorClosed", category: FacilityCategory.ROOM },
    { name: "Meja Belajar", iconName: "LampDesk", category: FacilityCategory.ROOM },
    { name: "Kipas Angin", iconName: "Fan", category: FacilityCategory.ROOM },
  ];

  const facilities = await Promise.all(
    facilitiesData.map((fac) =>
      prisma.facility.upsert({
        where: { name: fac.name },
        update: { iconName: fac.iconName, category: fac.category },
        create: fac,
      })
    )
  );

  const facId = (name: string) => {
    const found = facilities.find((f) => f.name === name);
    if (!found) throw new Error(`Fasilitas tidak ditemukan: ${name}`);
    return found.id;
  };

  // 4. SEED DATA KOST AWAL SEKITAR UNNES
  const kostsData = [
    {
      slug: "wisma-melati-sekaran-fmipa",
      name: "Wisma Melati Sekaran",
      description:
        "Kost putri tenang dan bersih di Gang Cempaka, hanya 4 menit jalan kaki ke FMIPA UNNES. Akses jalan lebar dan dekat pusat kuliner Sekaran.",
      gender: KostGender.PUTRI,
      address: "Jl. Raya Sekaran Gang Cempaka No. 14, Gunungpati, Semarang",
      area: "Sekaran",
      latitude: -7.0531,
      longitude: 110.3941,
      rules: "Jam malam gerbang pukul 22.00 WIB. Tamu lawan jenis dilarang masuk area kamar.",
      ownerName: "Ibu Sulastri",
      ownerWhatsapp: "6281228100101",
      verificationStatus: VerificationStatus.VERIFIED,
      inspectionScore: 95,
      inspectionSummary: "Foto 100% sesuai kondisi lapangan, air artetis lancar, sirkulasi udara baik.",
      buildingFacilities: ["WiFi Cepat", "Parkir Motor", "Dapur Bersama", "CCTV 24 Jam", "Jemuran"],
      images: [
        { url: "/images/kost-melati-1.jpg", caption: "Tampak Depan & Parkiran", isPrimary: true, sortOrder: 0 },
        { url: "/images/kost-melati-2.jpg", caption: "Interior Kamar Tipe AC", isPrimary: false, sortOrder: 1 },
      ],
      roomTypes: [
        {
          name: "Tipe Reguler (KM Luar)",
          priceMonthly: 650000,
          sizeDesc: "3x3 m",
          totalRooms: 8,
          availableRooms: 2,
          includeElectric: true,
          facilities: ["Kasur & Dipan", "Lemari Pakaian", "Meja Belajar", "Kipas Angin"],
        },
        {
          name: "Tipe Eksklusif (AC + KM Dalam)",
          priceMonthly: 1250000,
          sizeDesc: "3.5x4 m",
          totalRooms: 6,
          availableRooms: 1,
          includeElectric: false,
          facilities: ["AC", "Kamar Mandi Dalam", "Kasur & Dipan", "Lemari Pakaian", "Meja Belajar"],
        },
      ],
    },
    {
      slug: "kost-putra-cahaya-banaran",
      name: "Kost Putra Cahaya Banaran",
      description:
        "Pilihan favorit mahasiswa FT dan FIK. Parkiran motor luas dengan kanopi, bebas akses 24 jam dengan kunci masing-masing.",
      gender: KostGender.PUTRA,
      address: "Jl. Taman Siswa Gang Pete No. 8, Banaran, Sekaran, Semarang",
      area: "Banaran",
      latitude: -7.0514,
      longitude: 110.3992,
      rules: "Akses 24 jam, wajib menjaga ketenangan setelah pukul 23.00 WIB.",
      ownerName: "Bapak Hendra Wijaya",
      ownerWhatsapp: "6281325000202",
      verificationStatus: VerificationStatus.VERIFIED,
      inspectionScore: 90,
      inspectionSummary: "Bangunan terawat, WiFi terukur 50 Mbps, pagar aman terkunci.",
      buildingFacilities: ["WiFi Cepat", "Parkir Motor", "CCTV 24 Jam", "Jemuran"],
      images: [
        { url: "/images/kost-cahaya-1.jpg", caption: "Bangunan 2 Lantai", isPrimary: true, sortOrder: 0 },
        { url: "/images/kost-cahaya-2.jpg", caption: "Kamar Tipe Standar", isPrimary: false, sortOrder: 1 },
      ],
      roomTypes: [
        {
          name: "Tipe Ekonomis",
          priceMonthly: 550000,
          sizeDesc: "3x3 m",
          totalRooms: 12,
          availableRooms: 4,
          includeElectric: true,
          facilities: ["Kasur & Dipan", "Lemari Pakaian", "Meja Belajar"],
        },
        {
          name: "Tipe KM Dalam",
          priceMonthly: 850000,
          sizeDesc: "3x3.5 m",
          totalRooms: 8,
          availableRooms: 2,
          includeElectric: false,
          facilities: ["Kamar Mandi Dalam", "Kasur & Dipan", "Lemari Pakaian", "Meja Belajar", "Kipas Angin"],
        },
      ],
    },
    {
      slug: "griya-cendekia-patemon",
      name: "Griya Cendekia Patemon",
      description:
        "Hunian modern bernuansa tenang dekat gerbang FEB dan FIPP. Cocok untuk mahasiswa tingkat akhir yang butuh lingkungan kondusif.",
      gender: KostGender.CAMPUR,
      address: "Jl. Patemon Raya Gang Mangga No. 21, Gunungpati, Semarang",
      area: "Patemon",
      latitude: -7.0482,
      longitude: 110.3902,
      rules: "Area kamar putra dan putri terpisah lantai. Dilarang membawa hewan peliharaan.",
      ownerName: "Ibu Rina Kusuma",
      ownerWhatsapp: "6285740110303",
      verificationStatus: VerificationStatus.VERIFIED,
      inspectionScore: 98,
      inspectionSummary: "Kondisi bangunan baru, standar kebersihan sangat tinggi, parkir mobil tersedia.",
      buildingFacilities: ["WiFi Cepat", "Parkir Motor", "Parkir Mobil", "Dapur Bersama", "CCTV 24 Jam"],
      images: [
        { url: "/images/kost-cendekia-1.jpg", caption: "Fasad Modern Griya Cendekia", isPrimary: true, sortOrder: 0 },
      ],
      roomTypes: [
        {
          name: "Tipe Deluxe AC",
          priceMonthly: 1450000,
          sizeDesc: "4x4 m",
          totalRooms: 10,
          availableRooms: 3,
          includeElectric: false,
          facilities: ["AC", "Kamar Mandi Dalam", "Kasur & Dipan", "Lemari Pakaian", "Meja Belajar"],
        },
      ],
    },
    {
      slug: "kost-putri-anggrek-kalimasada",
      name: "Kost Putri Anggrek Kalimasada",
      description:
        "Kost terjangkau di area Sekaran dengan suasana kekeluargaan. Dekat minimarket, laundry kiloan, dan warung makan mahasiswa.",
      gender: KostGender.PUTRI,
      address: "Jl. Kalimasada No. 5, Sekaran, Gunungpati, Semarang",
      area: "Sekaran",
      latitude: -7.0499,
      longitude: 110.3931,
      rules: "Tamu wajib lapor ibu kost, jam bertamu maksimal pukul 21.00 WIB.",
      ownerName: "Ibu Marni",
      ownerWhatsapp: "6281566000404",
      verificationStatus: VerificationStatus.PENDING,
      inspectionScore: 0,
      inspectionSummary: "",
      buildingFacilities: ["WiFi Cepat", "Parkir Motor", "Dapur Bersama", "Jemuran"],
      images: [
        { url: "/images/kost-anggrek-1.jpg", caption: "Halaman Depan Kost", isPrimary: true, sortOrder: 0 },
      ],
      roomTypes: [
        {
          name: "Tipe Standar",
          priceMonthly: 500000,
          sizeDesc: "3x3 m",
          totalRooms: 10,
          availableRooms: 3,
          includeElectric: true,
          facilities: ["Kasur & Dipan", "Lemari Pakaian"],
        },
      ],
    },
  ];

  const seededKosts = [];

  for (const data of kostsData) {
    const existing = await prisma.kost.findUnique({ where: { slug: data.slug } });
    if (existing) {
      seededKosts.push(existing);
      continue;
    }

    const minPrice = Math.min(...data.roomTypes.map((r) => r.priceMonthly));
    const totalAvailableRoom = data.roomTypes.reduce((acc, r) => acc + r.availableRooms, 0);

    const createdKost = await prisma.kost.create({
      data: {
        slug: data.slug,
        name: data.name,
        description: data.description,
        gender: data.gender,
        address: data.address,
        area: data.area,
        latitude: data.latitude,
        longitude: data.longitude,
        rules: data.rules,
        ownerName: data.ownerName,
        ownerWhatsapp: data.ownerWhatsapp,
        verificationStatus: data.verificationStatus,
        lastVerifiedAt:
          data.verificationStatus === VerificationStatus.VERIFIED ? new Date() : null,
        minPrice,
        totalAvailableRoom,
        images: {
          create: data.images,
        },
        facilities: {
          create: data.buildingFacilities.map((name) => ({
            facilityId: facId(name),
          })),
        },
        roomTypes: {
          create: data.roomTypes.map((rt) => ({
            name: rt.name,
            priceMonthly: rt.priceMonthly,
            sizeDesc: rt.sizeDesc,
            totalRooms: rt.totalRooms,
            availableRooms: rt.availableRooms,
            includeElectric: rt.includeElectric,
            facilities: {
              create: rt.facilities.map((name) => ({
                facilityId: facId(name),
              })),
            },
          })),
        },
        distances: {
          create: landmarks.map((lm) => {
            const metrics = calculateDistanceMetrics(
              data.latitude,
              data.longitude,
              lm.latitude,
              lm.longitude
            );
            return {
              landmarkId: lm.id,
              distanceMeters: metrics.distanceMeters,
              walkMinutes: metrics.walkMinutes,
              rideMinutes: metrics.rideMinutes,
            };
          }),
        },
        ...(data.verificationStatus === VerificationStatus.VERIFIED && {
          inspections: {
            create: {
              inspectorId: admin.id,
              status: VerificationStatus.VERIFIED,
              score: data.inspectionScore,
              summaryNote: data.inspectionSummary,
              items: {
                create: [
                  { criterion: "Kesesuaian foto dengan kondisi fisik", isPassed: true },
                  { criterion: "Aliran air bersih & sanitasi lancar", isPassed: true },
                  { criterion: "Keamanan akses gerbang / CCTV", isPassed: true },
                  { criterion: "Koneksi listrik & WiFi berfungsi normal", isPassed: true },
                  { criterion: "Kejelasan alamat & kontak pemilik", isPassed: true },
                ],
              },
            },
          },
        }),
      },
    });

    seededKosts.push(createdKost);
  }

  // 5. SEED CONTOH ULASAN, TERSIMPAN, & NOTIFIKASI UNTUK MAHASISWA
  const firstKost = seededKosts[0];
  if (firstKost) {
    await prisma.review.upsert({
      where: {
        userId_kostId: { userId: student.id, kostId: firstKost.id },
      },
      update: {},
      create: {
        userId: student.id,
        kostId: firstKost.id,
        rating: 5,
        comment: "Jalan kaki ke FMIPA cuma 4 menit, air lancar, ibu kost ramah banget.",
      },
    });

    await prisma.kost.update({
      where: { id: firstKost.id },
      data: { ratingAvg: 5, reviewCount: 1 },
    });

    await prisma.savedKost.upsert({
      where: {
        userId_kostId: { userId: student.id, kostId: firstKost.id },
      },
      update: {},
      create: {
        userId: student.id,
        kostId: firstKost.id,
      },
    });

    const existingNotif = await prisma.notification.findFirst({
      where: { userId: student.id, type: NotificationType.SYSTEM },
    });

    if (!existingNotif) {
      await prisma.notification.create({
        data: {
          userId: student.id,
          type: NotificationType.SYSTEM,
          title: "Selamat datang di KlikKost UNNES",
          message: "Semua kost berlabel Verified telah melalui inspeksi fisik tim kami.",
          linkUrl: `/kost/${firstKost.slug}`,
        },
      });
    }
  }

  console.log(
    `Seeding selesai: ${landmarks.length} landmark UNNES, ${facilities.length} fasilitas, dan ${seededKosts.length} kost siap digunakan.`
  );
}

main()
  .catch((e) => {
    console.error("Gagal menjalankan seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });