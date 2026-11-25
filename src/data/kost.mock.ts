
import { Kost } from "@/types";

export const kostData: Kost[] = [
  {
    id: "kost-001",
    nama: "Kost Green Residence",
    tipe: "Putra",
    harga: 750000,
    jarakKampusM: 420,
    lat: -7.0517,
    lng: 110.3922,
    verified: true,
    fotos: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=900"
    ],
    fasilitasKamar: ["AC", "Kasur", "Lemari", "Meja", "WiFi"],
    fasilitasUmum: ["Dapur", "Parkir Motor", "CCTV"],
    rincianBiaya: {
      sewa: 750000,
      listrik: 50000,
      air: 25000,
      deposit: 200000
    },
    inspeksi: {
      skor: 4.9,
      tanggal: "2026-10-15",
      catatan: "Kamar bersih, ventilasi baik, dan fasilitas sesuai."
    },
    tersedia: true,
    whatsapp: "6281234567890",
    alamat: "Gang Cempaka, Sekaran",
    deskripsi: "Kost nyaman dengan lingkungan tenang dan akses dekat kampus."
  },
  {
    id: "kost-002",
    nama: "Kost Putri Melati",
    tipe: "Putri",
    harga: 650000,
    jarakKampusM: 350,
    lat: -7.0512,
    lng: 110.3915,
    verified: true,
    fotos: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900"
    ],
    fasilitasKamar: ["Kasur", "Lemari", "WiFi"],
    fasilitasUmum: ["Dapur", "Parkir Motor"],
    rincianBiaya: {
      sewa: 650000,
      listrik: 40000,
      air: 20000,
      deposit: 150000
    },
    inspeksi: {
      skor: 4.8,
      tanggal: "2026-10-12",
      catatan: "Lingkungan bersih dan aman."
    },
    tersedia: true,
    whatsapp: "6281234567890",
    alamat: "Gang Melati, Sekaran",
    deskripsi: "Kost khusus putri dengan lingkungan nyaman."
  },
  {
    id: "kost-003",
    nama: "Kost Harmoni Sekaran",
    tipe: "Campur",
    harga: 850000,
    jarakKampusM: 600,
    lat: -7.0525,
    lng: 110.3930,
    verified: true,
    fotos: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900"
    ],
    fasilitasKamar: ["AC", "Kasur", "Lemari", "WiFi"],
    fasilitasUmum: ["Dapur", "CCTV", "Laundry"],
    rincianBiaya: {
      sewa: 850000,
      listrik: 50000,
      air: 30000,
      deposit: 200000
    },
    inspeksi: {
      skor: 4.7,
      tanggal: "2026-10-10",
      catatan: "Bangunan terawat dan fasilitas berfungsi."
    },
    tersedia: true,
    whatsapp: "6281234567890",
    alamat: "Jalan Sekaran Raya",
    deskripsi: "Kost dengan fasilitas lengkap dan lokasi strategis."
  },
  {
    id: "kost-004",
    nama: "Kost Bintang Residence",
    tipe: "Putra",
    harga: 550000,
    jarakKampusM: 800,
    lat: -7.0530,
    lng: 110.3940,
    verified: true,
    fotos: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=900"
    ],
    fasilitasKamar: ["Kasur", "Lemari", "Meja"],
    fasilitasUmum: ["Parkir Motor", "Dapur"],
    rincianBiaya: {
      sewa: 550000,
      listrik: 30000,
      air: 20000,
      deposit: 100000
    },
    inspeksi: {
      skor: 4.6,
      tanggal: "2026-10-08",
      catatan: "Kondisi kamar cukup baik."
    },
    tersedia: true,
    whatsapp: "6281234567890",
    alamat: "Gang Bintang, Sekaran",
    deskripsi: "Pilihan kost ekonomis untuk mahasiswa."
  },
  {
    id: "kost-005",
    nama: "Kost Amanda",
    tipe: "Putri",
    harga: 950000,
    jarakKampusM: 450,
    lat: -7.0509,
    lng: 110.3928,
    verified: true,
    fotos: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900"
    ],
    fasilitasKamar: ["AC", "Kasur", "Lemari", "WiFi"],
    fasilitasUmum: ["CCTV", "Dapur", "Parkir Motor"],
    rincianBiaya: {
      sewa: 950000,
      listrik: 50000,
      air: 25000,
      deposit: 250000
    },
    inspeksi: {
      skor: 4.9,
      tanggal: "2026-10-14",
      catatan: "Fasilitas lengkap dan kebersihan sangat baik."
    },
    tersedia: true,
    whatsapp: "6281234567890",
    alamat: "Gang Kenanga, Sekaran",
    deskripsi: "Kost putri premium dengan fasilitas modern."
  },
  {
    id: "kost-006",
    nama: "Kost Pak Budi",
    tipe: "Putra",
    harga: 500000,
    jarakKampusM: 950,
    lat: -7.0540,
    lng: 110.3910,
    verified: false,
    fotos: [
      "https://images.unsplash.com/photo-1617104678098-de229db51175?w=900"
    ],
    fasilitasKamar: ["Kasur", "Lemari"],
    fasilitasUmum: ["Dapur", "Parkir Motor"],
    rincianBiaya: {
      sewa: 500000,
      listrik: 30000,
      air: 20000,
      deposit: 100000
    },
    inspeksi: {
      skor: 4.2,
      tanggal: "2026-09-10",
      catatan: "Belum menjalani verifikasi akhir."
    },
    tersedia: true,
    whatsapp: "6281234567890",
    alamat: "Gang Mangga, Sekaran",
    deskripsi: "Kost sederhana dengan harga terjangkau."
  },
  {
    id: "kost-007",
    nama: "Kost Griya Mahasiswa",
    tipe: "Campur",
    harga: 800000,
    jarakKampusM: 700,
    lat: -7.0520,
    lng: 110.3950,
    verified: true,
    fotos: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=900"
    ],
    fasilitasKamar: ["AC", "Kasur", "Meja", "WiFi"],
    fasilitasUmum: ["Laundry", "CCTV", "Dapur"],
    rincianBiaya: {
      sewa: 800000,
      listrik: 50000,
      air: 25000,
      deposit: 200000
    },
    inspeksi: {
      skor: 4.8,
      tanggal: "2026-10-11",
      catatan: "Kondisi bangunan terawat."
    },
    tersedia: true,
    whatsapp: "6281234567890",
    alamat: "Gang Mawar, Sekaran",
    deskripsi: "Hunian mahasiswa dengan fasilitas bersama."
  },
  {
    id: "kost-008",
    nama: "Kost Safira",
    tipe: "Putri",
    harga: 700000,
    jarakKampusM: 500,
    lat: -7.0505,
    lng: 110.3908,
    verified: true,
    fotos: [
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=900"
    ],
    fasilitasKamar: ["Kasur", "Lemari", "WiFi", "Meja"],
    fasilitasUmum: ["Dapur", "Parkir Motor"],
    rincianBiaya: {
      sewa: 700000,
      listrik: 40000,
      air: 20000,
      deposit: 150000
    },
    inspeksi: {
      skor: 4.7,
      tanggal: "2026-10-09",
      catatan: "Kamar cukup luas dan bersih."
    },
    tersedia: true,
    whatsapp: "6281234567890",
    alamat: "Gang Safira, Sekaran",
    deskripsi: "Kost putri dengan akses mudah ke kampus."
  },
  {
    id: "kost-009",
    nama: "Kost Java House",
    tipe: "Campur",
    harga: 1100000,
    jarakKampusM: 300,
    lat: -7.0510,
    lng: 110.3945,
    verified: true,
    fotos: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900"
    ],
    fasilitasKamar: ["AC", "Kasur", "Lemari", "WiFi"],
    fasilitasUmum: ["CCTV", "Laundry", "Dapur"],
    rincianBiaya: {
      sewa: 1100000,
      listrik: 60000,
      air: 30000,
      deposit: 300000
    },
    inspeksi: {
      skor: 5.0,
      tanggal: "2026-10-16",
      catatan: "Kondisi bangunan dan fasilitas sangat baik."
    },
    tersedia: true,
    whatsapp: "6281234567890",
    alamat: "Jalan Taman Siswa, Sekaran",
    deskripsi: "Kost premium dekat area kampus."
  },
  {
    id: "kost-010",
    nama: "Kost Dahlia",
    tipe: "Putri",
    harga: 600000,
    jarakKampusM: 850,
    lat: -7.0545,
    lng: 110.3925,
    verified: false,
    fotos: [
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=900"
    ],
    fasilitasKamar: ["Kasur", "Lemari", "Meja"],
    fasilitasUmum: ["Dapur"],
    rincianBiaya: {
      sewa: 600000,
      listrik: 35000,
      air: 20000,
      deposit: 100000
    },
    inspeksi: {
      skor: 4.1,
      tanggal: "2026-09-15",
      catatan: "Menunggu proses verifikasi."
    },
    tersedia: true,
    whatsapp: "6281234567890",
    alamat: "Gang Dahlia, Sekaran",
    deskripsi: "Kost sederhana khusus putri."
  },
  {
    id: "kost-011",
    nama: "Kost Arjuna",
    tipe: "Putra",
    harga: 900000,
    jarakKampusM: 550,
    lat: -7.0535,
    lng: 110.3905,
    verified: true,
    fotos: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900"
    ],
    fasilitasKamar: ["AC", "Kasur", "Lemari", "WiFi"],
    fasilitasUmum: ["Parkir Motor", "CCTV"],
    rincianBiaya: {
      sewa: 900000,
      listrik: 50000,
      air: 25000,
      deposit: 200000
    },
    inspeksi: {
      skor: 4.8,
      tanggal: "2026-10-13",
      catatan: "Kamar bersih dan pencahayaan baik."
    },
    tersedia: true,
    whatsapp: "6281234567890",
    alamat: "Gang Arjuna, Sekaran",
    deskripsi: "Kost putra dengan kamar nyaman."
  },
  {
    id: "kost-012",
    nama: "Kost Cendana",
    tipe: "Campur",
    harga: 750000,
    jarakKampusM: 1200,
    lat: -7.0550,
    lng: 110.3940,
    verified: true,
    fotos: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900"
    ],
    fasilitasKamar: ["Kasur", "Lemari", "WiFi"],
    fasilitasUmum: ["Dapur", "Parkir Motor"],
    rincianBiaya: {
      sewa: 750000,
      listrik: 40000,
      air: 25000,
      deposit: 150000
    },
    inspeksi: {
      skor: 4.6,
      tanggal: "2026-10-07",
      catatan: "Kondisi bangunan baik dan terawat."
    },
    tersedia: true,
    whatsapp: "6281234567890",
    alamat: "Gang Cendana, Sekaran",
    deskripsi: "Kost dengan lingkungan tenang."
  }
];
