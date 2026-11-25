"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import MapCanvas from "@/components/map/MapCanvas";
import type { Kost } from "@/types";
import { formatRupiah } from "@/utils/formatRupiah";

const campusCoordinates = "-7.0505,110.393";

export default function RuteClient({ kost }: { kost: Kost | null }) {
  if (!kost) {
    return (
      <main className="min-h-screen bg-[#0A241B] p-8 text-center text-white">
        <h1 className="text-2xl font-bold">Kost tidak ditemukan</h1>
        <Link href="/" className="mt-5 inline-block text-[#4ADE9F]">
          Kembali ke beranda
        </Link>
      </main>
    );
  }

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${campusCoordinates}&destination=${kost.lat},${kost.lng}&travelmode=walking`;

  return (
    <main className="min-h-screen bg-[#0A241B] px-5 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/kost/${kost.id}`}
          className="inline-flex items-center gap-2 text-sm text-[#91A99D] hover:text-white"
        >
          <ArrowLeft size={17} /> Kembali ke detail kost
        </Link>

        <div className="mb-6 mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#4ADE9F]">
              Rute dari Universitas Negeri Semarang
            </p>
            <h1 className="mt-2 text-3xl font-extrabold">{kost.nama}</h1>
            <p className="mt-2 text-sm text-[#91A99D]">
              <MapPin size={15} className="mr-1 inline text-[#4ADE9F]" />
              {kost.alamat}
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-sm text-[#91A99D]">Jarak menurut data kost</p>
            <p className="mt-1 text-xl font-bold text-[#4ADE9F]">
              {kost.jarakKampusM === null
                ? "Belum dicantumkan"
                : `${kost.jarakKampusM} m`}
            </p>
          </div>
        </div>

        <div className="h-[58vh] min-h-[380px] overflow-hidden rounded-[24px] border border-[#285441]">
          <MapCanvas kosts={[kost]} selectedId={kost.id} routeToSelected />
        </div>

        <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-[20px] border border-[#285441] bg-[#0F3226] p-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-bold">Rute perkiraan pada peta</p>
            <p className="mt-1 text-sm text-[#91A99D]">
              Buka Google Maps untuk melihat petunjuk jalan dan kondisi rute
              terkini.
            </p>
          </div>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#4ADE9F] px-5 py-3 text-sm font-bold text-[#0A241B] transition hover:bg-[#86EFAC]"
          >
            <ExternalLink size={16} />
            Buka petunjuk jalan
          </a>
        </div>
        <p className="mt-3 text-xs text-[#91A99D]">
          Harga kost: {formatRupiah(kost.harga)}/bln. Garis pada peta hanya
          menunjukkan arah perkiraan, bukan navigasi jalan.
        </p>
      </div>
    </main>
  );
}