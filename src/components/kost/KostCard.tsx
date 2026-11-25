
"use client";

import Link from "next/link";
import {
  MapPin,
  Wifi,
  Snowflake,
  Heart,
  ArrowUpRight
} from "lucide-react";

import { Kost } from "@/types";
import Badge from "@/components/ui/badge";
import { formatRupiah } from "@/utils/formatRupiah";
import { useSavedStore } from "@/store/savedStore";

interface KostCardProps {
  kost: Kost;
}

export default function KostCard({ kost }: KostCardProps) {
  const { savedIds, toggleSaved } = useSavedStore();

  const isSaved = savedIds.includes(kost.id);

  return (
    <article className="group overflow-hidden rounded-[20px] border border-[#285441] bg-[#0F3226] transition duration-300 hover:-translate-y-1 hover:border-[#4ADE9F]/50">

      {/* FOTO KOST */}
      <div className="relative h-56 overflow-hidden">

        {kost.fotos[0] ? (
          <img
            src={kost.fotos[0]}
            alt={`Foto ${kost.nama}`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#143D2F] text-sm text-[#91A99D]">
            Foto belum tersedia
          </div>
        )}

        {/* BADGE */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">

          <Badge type={kost.tipe}>
            {kost.tipe}
          </Badge>

          {kost.verified && (
            <Badge type="Verified">
              ✓ Verified
            </Badge>
          )}

        </div>

        {/* TOMBOL SIMPAN */}
        <button
          type="button"
          onClick={() => toggleSaved(kost.id)}
          aria-label={
            isSaved
              ? `Hapus ${kost.nama} dari tersimpan`
              : `Simpan ${kost.nama}`
          }
          aria-pressed={isSaved}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:scale-110 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-[#4ADE9F]"
        >
          <Heart
            size={19}
            fill={isSaved ? "#4ADE9F" : "none"}
            color={isSaved ? "#4ADE9F" : "white"}
          />
        </button>

        {/* JARAK */}
        <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
          <MapPin
            size={13}
            className="mr-1 inline text-[#4ADE9F]"
          />
          {kost.jarakKampusM === null
            ? "Jarak belum dicantumkan"
            : `${kost.jarakKampusM} m dari UNNES`}
        </div>

      </div>

      {/* INFORMASI KOST */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div>
            <h3 className="text-lg font-bold text-white">
              {kost.nama}
            </h3>

            <p className="mt-1 text-xs text-[#91A99D]">
              {kost.alamat}
            </p>
          </div>

          {/* RATING */}
          {kost.inspeksi.skor !== null && (
            <div className="shrink-0 rounded-lg bg-[#143D2F] px-2 py-1 text-xs font-bold text-[#4ADE9F]">
              ★ {kost.inspeksi.skor}
            </div>
          )}

        </div>

        {/* FASILITAS */}
        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-[#91A99D]">

          {kost.fasilitasKamar.includes("WiFi") && (
            <span className="flex items-center gap-1">
              <Wifi size={15} />
              WiFi
            </span>
          )}

          {kost.fasilitasKamar.includes("AC") && (
            <span className="flex items-center gap-1">
              <Snowflake size={15} />
              AC
            </span>
          )}

          <span>
            +{kost.fasilitasUmum.length} fasilitas
          </span>

        </div>

        {/* HARGA DAN DETAIL */}
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">

          <div className="min-w-0">

            <p className="text-xs text-[#91A99D]">
              Mulai dari
            </p>

            <p className="mt-1 whitespace-nowrap text-lg font-extrabold text-[#4ADE9F]">
              {formatRupiah(kost.harga)}
              <span className="text-xs font-normal text-[#91A99D]">
                /bln
              </span>
            </p>

          </div>

          <Link
            href={`/kost/${kost.id}`}
            className="flex shrink-0 items-center gap-2 rounded-full bg-[#4ADE9F] px-4 py-3 text-xs font-bold text-[#0A241B] transition hover:bg-[#86EFAC] focus:outline-none focus:ring-2 focus:ring-white"
          >
            Detail
            <ArrowUpRight size={15} />
          </Link>

        </div>

      </div>

    </article>
  );
}
