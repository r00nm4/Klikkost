
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin, Search } from "lucide-react";
import Header from "@/components/layout/header";
import MapCanvas from "@/components/map/MapCanvas";
import { kostData } from "@/data/kost.mock";
import { formatRupiah } from "@/utils/formatRupiah";

export default function Peta() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>();

  const filteredKost = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return kostData.filter(
      (kost) =>
        kost.nama.toLowerCase().includes(keyword) ||
        kost.alamat.toLowerCase().includes(keyword)
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-[#0A241B] pb-28 text-white">
      <Header />
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <div className="mb-7">
          <p className="text-sm font-bold uppercase tracking-wide text-[#4ADE9F]">
            Jelajahi area Sekaran
          </p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Peta lokasi kost
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#91A99D]">
            Lihat posisi kost di sekitar Universitas Negeri Semarang. Pilih
            penanda pada peta untuk membuka detailnya.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="h-[55vh] min-h-[380px] overflow-hidden rounded-[24px] border border-[#285441] bg-[#143D2F]">
            <MapCanvas kosts={filteredKost} selectedId={selectedId} />
          </div>

          <aside className="flex min-h-0 flex-col overflow-hidden rounded-[24px] border border-[#285441] bg-[#0F3226]">
            <div className="border-b border-white/10 p-4">
              <label className="flex items-center gap-3 rounded-xl border border-[#285441] bg-[#143D2F] px-4 py-3">
                <Search size={17} className="shrink-0 text-[#91A99D]" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari nama atau alamat kost"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#91A99D]"
                />
              </label>
              <p className="mt-3 text-xs text-[#91A99D]">
                {filteredKost.length} kost ditampilkan
              </p>
            </div>

            <div className="max-h-[55vh] divide-y divide-white/10 overflow-y-auto">
              {filteredKost.map((kost) => (
                <article
                  key={kost.id}
                  className={`w-full p-4 text-left transition hover:bg-[#143D2F] ${
                    selectedId === kost.id ? "bg-[#143D2F]" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(kost.id)}
                    aria-pressed={selectedId === kost.id}
                    className="block w-full text-left"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="font-bold">{kost.nama}</span>
                      <MapPin
                        size={16}
                        className="mt-1 shrink-0 text-[#4ADE9F]"
                      />
                    </span>
                    <span className="mt-1 block text-xs text-[#91A99D]">
                      {kost.alamat} · {kost.jarakKampusM} m dari UNNES
                    </span>
                    <span className="mt-2 block text-sm font-bold text-[#4ADE9F]">
                      {formatRupiah(kost.harga)}/bln
                    </span>
                  </button>
                  <div className="mt-2">
                    <Link
                      href={`/kost/${kost.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-white"
                    >
                      Detail <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
              {filteredKost.length === 0 && (
                <p className="p-6 text-center text-sm text-[#91A99D]">
                  Tidak ada kost yang cocok dengan pencarian.
                </p>
              )}
            </div>
          </aside>
        </div>
        <p className="mt-4 text-xs text-[#91A99D]">
          Peta © OpenStreetMap. Jarak yang ditampilkan mengikuti data kost.
        </p>
      </div>
    </main>
  );
}
