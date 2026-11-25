
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  ArrowRight
} from "lucide-react";

import Header from "@/components/layout/header";
import Button from "@/components/ui/button";
import KostCard from "@/components/kost/KostCard";
import FilterModal from "@/components/kost/FilterModal";

import { kostData } from "@/data/kost.mock";
import { useFilterStore } from "@/store/filterStore";

export default function HomePage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const router = useRouter();

  const {
    search,
    setSearch,
    quick,
    setQuick,
    tipe,
    fasilitas,
    minHarga,
    maxHarga,
    verified,
    sort
  } = useFilterStore();

  const categories = [
    "Semua",
    "Dekat FMIPA",
    "<500m Kampus",
    "Verified Kost"
  ];

  const filteredKost = useMemo(() => {
    const result = kostData.filter((kost) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        kost.nama.toLowerCase().includes(keyword) ||
        kost.alamat.toLowerCase().includes(keyword) ||
        kost.fasilitasKamar.some((f) =>
          f.toLowerCase().includes(keyword)
        ) ||
        kost.fasilitasUmum.some((f) =>
          f.toLowerCase().includes(keyword)
        );

      const matchesTipe =
        tipe.length === 0 || tipe.includes(kost.tipe);

      const matchesFasilitas = fasilitas.every(
        (f) =>
          kost.fasilitasKamar.includes(f) ||
          kost.fasilitasUmum.includes(f)
      );

      const matchesHarga =
        kost.harga >= minHarga &&
        kost.harga <= maxHarga;

      const matchesVerified =
        verified === "Semua" ||
        (verified === "Verified" && kost.verified) ||
        (verified === "Belum Verified" && !kost.verified);

      const matchesQuick =
        quick === "Semua" ||
        (quick === "Dekat FMIPA" && kost.jarakKampusM < 1000) ||
        (quick === "<500m Kampus" && kost.jarakKampusM < 500) ||
        (quick === "Verified Kost" && kost.verified);

      return (
        matchesSearch &&
        matchesTipe &&
        matchesFasilitas &&
        matchesHarga &&
        matchesVerified &&
        matchesQuick
      );
    });

    if (sort === "Harga Terendah") {
      result.sort((a, b) => a.harga - b.harga);
    }

    if (sort === "Harga Tertinggi") {
      result.sort((a, b) => b.harga - a.harga);
    }

    if (sort === "Jarak Terdekat") {
      result.sort(
        (a, b) => a.jarakKampusM - b.jarakKampusM
      );
    }

    return result;
  }, [
    search,
    tipe,
    fasilitas,
    minHarga,
    maxHarga,
    verified,
    quick,
    sort
  ]);

  return (
    <main className="min-h-screen bg-[#0A241B] pb-28 text-white">

      <Header />

      <div className="mx-auto max-w-7xl px-6">

        {/* HERO */}
        <section className="grid items-center gap-12 py-16 lg:grid-cols-2">

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#4ADE9F]/10 px-4 py-2 text-xs font-bold text-[#4ADE9F]">
              <MapPin size={14} />
              AREA UNIVERSITAS NEGERI SEMARANG
            </div>

            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Cari kost
              <span className="text-[#4ADE9F]">
                {" "}tervalidasi{" "}
              </span>
              di sekitar UNNES!
            </h1>

            <p className="mt-6 max-w-lg leading-relaxed text-[#91A99D]">
              Temukan hunian nyaman dan terpercaya.
              Semua kost telah melalui inspeksi fisik
              oleh tim KlikKost.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                onClick={() =>
                  document.getElementById("daftar-kost")?.scrollIntoView({
                    behavior: "smooth"
                  })
                }
              >
                Jelajahi Kost
                <ArrowRight className="ml-2 inline" size={16} />
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push("/peta")}
              >
                <MapPin size={16} className="mr-2 inline" />
                Lihat Peta
              </Button>
            </div>
          </div>

          <div className="flex min-h-72 flex-col justify-between rounded-[24px] border border-[#285441] bg-[#0F3226] p-6">
            <div>
              <span className="text-xs font-bold text-[#4ADE9F]">
                ✦ KOST PILIHAN KLIKKOST
              </span>

              <h2 className="mt-4 text-3xl font-bold">
                Cari hunian yang tepat untuk perjalanan kuliahmu.
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-[#91A99D]">
                Setiap kost pilihan telah diperiksa
                untuk membantu kamu mencari hunian
                dengan lebih tenang.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between rounded-xl bg-[#143D2F] p-4">
              <span className="text-sm text-[#91A99D]">
                Mulai dari
              </span>

              <span className="font-bold text-[#4ADE9F]">
                Rp 500.000/bln
              </span>
            </div>
          </div>

        </section>

        {/* SEARCH */}
        <section>
          <div className="flex flex-col gap-3 md:flex-row">

            <div className="flex flex-1 items-center gap-3 rounded-full border border-[#285441] bg-[#0F3226] px-5 py-4">
              <Search size={20} className="text-[#91A99D]" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Cari nama kost, gang, atau fasilitas..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#91A99D]"
              />

            </div>

            <Button
              variant="secondary"
              onClick={() => setFilterOpen(true)}
            >
              <SlidersHorizontal size={18} className="mr-2 inline" />
              Filter
            </Button>

          </div>
        </section>

        {/* QUICK FILTER */}
        <section className="mt-6 flex gap-3 overflow-x-auto pb-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setQuick(category)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
                quick === category
                  ? "border-[#4ADE9F] bg-[#4ADE9F] text-[#0A241B]"
                  : "border-[#285441] bg-[#0F3226] text-[#91A99D] hover:border-[#4ADE9F]"
              }`}
            >
              {category}
            </button>
          ))}
        </section>

        {/* KOST LIST */}
        <section id="daftar-kost" className="mt-12">

          <div className="mb-7 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Kost terbaik
              </h2>

              <p className="mt-2 text-sm text-[#91A99D]">
                Pilihan kost di sekitar UNNES
              </p>
            </div>

            <span className="text-sm text-[#4ADE9F]">
              {filteredKost.length} kost ditemukan
            </span>
          </div>

          {filteredKost.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredKost.map((kost) => (
                <KostCard key={kost.id} kost={kost} />
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-[#285441] bg-[#0F3226] px-6 py-16 text-center">
              <Search size={35} className="mx-auto text-[#91A99D]" />

              <h3 className="mt-4 text-xl font-bold">
                Kost tidak ditemukan
              </h3>

              <p className="mt-2 text-sm text-[#91A99D]">
                Coba ubah kata pencarian atau filter.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setQuick("Semua");
                }}
                className="mt-5 font-bold text-[#4ADE9F]"
              >
                Hapus pencarian
              </button>
            </div>
          )}

        </section>

      </div>

      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        resultCount={filteredKost.length}
      />

    </main>
  );
}
