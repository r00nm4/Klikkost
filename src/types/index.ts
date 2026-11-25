
export type KostType = "Putra" | "Putri" | "Campur";

export interface Kost {
  id: string;
  nama: string;
  tipe: KostType;
  harga: number;
  jarakKampusM: number | null;
  lat: number;
  lng: number;
  verified: boolean;
  fotos: string[];
  fasilitasKamar: string[];
  fasilitasUmum: string[];
  rincianBiaya: {
    sewa: number;
    listrik: number | null;
    air: number | null;
    deposit: number | null;
  };
  inspeksi: {
    skor: number | null;
    tanggal: string | null;
    catatan: string;
  };
  tersedia: boolean;
  whatsapp: string;
  alamat: string;
  deskripsi: string;
}

export type ContactStatus =
  | "DRAFT"
  | "WA_SENT"
  | "AVAILABLE"
  | "UNAVAILABLE"
  | "VISIT_REQUESTED"
  | "VISIT_CONFIRMED"
  | "VISITED"
  | "NOT_SUITABLE"
  | "PROCEED_RENT";

export interface ContactHistory {
  id: string;
  kostId: string;
  status: ContactStatus;
  pesan: string;
  waktu: string;
  tanggalVisit?: string;
  jamVisit?: string;
  catatanVisit?: string;
  adminNote?: string;
}
