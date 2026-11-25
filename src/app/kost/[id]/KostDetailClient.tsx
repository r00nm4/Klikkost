
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  Heart,
  MapPin,
  Share2,
  Wifi,
  CheckCircle2,
  Star,
  MessageCircle,
  Snowflake
} from "lucide-react";

import type { Kost } from "@/types";
import { formatRupiah } from "@/utils/formatRupiah";
import { useSavedStore } from "@/store/savedStore";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";

export default function KostDetailClient({ kost }: { kost: Kost | null }) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);

  const { savedIds, toggleSaved } = useSavedStore();

  if (!kost) {
    return (
      <main className="min-h-screen bg-[#0A241B] p-10 text-center text-white">
        <h1 className="text-2xl font-bold">Kost tidak ditemukan</h1>
        <Link href="/" className="mt-5 inline-block text-[#4ADE9F]">
          Kembali ke Home
        </Link>
      </main>
    );
  }

  const isSaved = savedIds.includes(kost.id);

  const totalAwal =
    Object.values(kost.rincianBiaya).every((value) => value !== null)
      ? Object.values(kost.rincianBiaya).reduce<number>(
          (total, value) => total + (value ?? 0),
          0,
        )
      : null;

  const images = kost.fotos;

  return (
    <main className="min-h-screen bg-[#0A241B] pb-32 text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0A241B]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-[#91A99D]"
          >
            <ArrowLeft size={18} />
            Kembali
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => toggleSaved(kost.id)}
              aria-label="Simpan kost"
              className="rounded-full border border-[#285441] p-3"
            >
              <Heart
                size={18}
                fill={isSaved ? "#4ADE9F" : "none"}
                color={isSaved ? "#4ADE9F" : "white"}
              />
            </button>

            <button
              aria-label="Bagikan kost"
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              className="rounded-full border border-[#285441] p-3"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* BREADCRUMB */}
        <div className="mb-7 text-sm text-[#91A99D]">
          <Link href="/" className="hover:text-[#4ADE9F]">
            Beranda
          </Link>
          {" / "}
          Kost
          {" / "}
          <span className="text-white">{kost.nama}</span>
        </div>

        {/* TITLE */}
        <section className="mb-8">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge type={kost.tipe}>{kost.tipe}</Badge>

            {kost.verified && (
              <Badge type="Verified">✓ Verified Kost</Badge>
            )}
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-extrabold md:text-4xl">
                {kost.nama}
              </h1>

              <p className="mt-3 text-sm text-[#91A99D]">
                <MapPin size={15} className="mr-1 inline text-[#4ADE9F]" />
                {kost.alamat}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#91A99D]">Harga mulai dari</p>
              <p className="mt-1 text-2xl font-extrabold text-[#4ADE9F]">
                {formatRupiah(kost.harga)}
                <span className="text-sm font-normal text-[#91A99D]">
                  /bln
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="grid gap-3 md:grid-cols-4">

          <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-[20px] bg-[#143D2F] md:col-span-3 md:h-[440px]">
            {images[activeImage] ? (
              <img
                src={images[activeImage]}
                alt={kost.nama}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm text-[#91A99D]">Foto belum tersedia</span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto md:flex-col">
              {images.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setActiveImage(index)}
                  className={`h-24 min-w-32 overflow-hidden rounded-xl border-2 md:h-32 ${
                    activeImage === index
                      ? "border-[#4ADE9F]"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Foto kost ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

        </section>

        {/* CONTENT */}
        <div className="mt-10 grid gap-8 lg:grid-cols-3">

          <div className="space-y-8 lg:col-span-2">

            {/* DESKRIPSI */}
            <section>
              <h2 className="text-xl font-bold">
                Tentang Kost
              </h2>

              <p className="mt-4 leading-8 text-[#91A99D]">
                {kost.deskripsi}
              </p>
            </section>

            {/* FASILITAS */}
            <section>
              <h2 className="text-xl font-bold">
                Fasilitas Kamar
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {kost.fasilitasKamar.map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-[#285441] bg-[#0F3226] px-4 py-3 text-sm"
                  >
                    {item === "WiFi" && <Wifi size={15} className="mr-2 inline" />}
                    {item === "AC" && <Snowflake size={15} className="mr-2 inline" />}
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold">
                Fasilitas Umum
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {kost.fasilitasUmum.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#285441] bg-[#0F3226] px-4 py-3 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {/* INSPEKSI */}
            <section className="rounded-[20px] border border-[#285441] bg-[#0F3226] p-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-[#4ADE9F]" size={26} />

                <div>
                  <h2 className="text-xl font-bold">
                    Hasil Inspeksi Fisik KlikKost
                  </h2>
                  <p className="mt-1 text-xs text-[#91A99D]">
                    Data inspeksi demonstrasi
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Star className="fill-yellow-400 text-yellow-400" />

                <span className="text-3xl font-extrabold">
                  {kost.inspeksi.skor ?? "Belum ada data"}
                </span>
                {kost.inspeksi.skor !== null && (
                  <span className="text-sm text-[#91A99D]">/ 5.0</span>
                )}
              </div>

              <p className="mt-4 leading-7 text-[#91A99D]">
                {kost.inspeksi.catatan}
              </p>

              <p className="mt-4 text-xs text-[#91A99D]">
                Tanggal inspeksi: {kost.inspeksi.tanggal ?? "Belum tersedia"}
              </p>
            </section>

            {/* BIAYA */}
            <section className="rounded-[20px] border border-[#285441] bg-[#0F3226] p-6">
              <h2 className="text-xl font-bold">
                Rincian Biaya
              </h2>

              {([
                ["Sewa per bulan", kost.rincianBiaya.sewa],
                ["Listrik", kost.rincianBiaya.listrik],
                ["Air", kost.rincianBiaya.air],
                ["Deposit", kost.rincianBiaya.deposit]
              ] as const).map(([label, value]) => (
                <div
                  key={String(label)}
                  className="flex justify-between border-b border-white/10 py-4 text-sm"
                >
                  <span className="text-[#91A99D]">{label}</span>
                  <span>
                    {value === null
                      ? "Belum dicantumkan"
                      : value === 0 && label === "Listrik"
                        ? "Termasuk sewa"
                        : formatRupiah(value)}
                  </span>
                </div>
              ))}

              <div className="mt-5 flex justify-between font-bold">
                <span>Estimasi awal</span>
                <span className="text-[#4ADE9F]">
                  {totalAwal === null
                    ? "Belum tersedia"
                    : formatRupiah(totalAwal)}
                </span>
              </div>
              {totalAwal === null && (
                <p className="mt-2 text-xs text-[#91A99D]">
                  Estimasi akan tersedia setelah data listrik, air, dan deposit
                  dicantumkan.
                </p>
              )}
            </section>

          </div>

          {/* SIDEBAR */}
          <aside className="space-y-5">

            <section className="rounded-[20px] border border-[#285441] bg-[#0F3226] p-6">
              <h2 className="text-lg font-bold">
                Akses Kost
              </h2>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-[#91A99D]">
                  Jarak ke UNNES
                </span>

                <span className="font-bold text-[#4ADE9F]">
                  {kost.jarakKampusM === null
                    ? "Belum dicantumkan"
                    : `${kost.jarakKampusM} m`}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-[#91A99D]">
                  Status
                </span>

                <span className={kost.tersedia ? "text-[#4ADE9F]" : "text-red-400"}>
                  {kost.tersedia ? "Tersedia" : "Penuh"}
                </span>
              </div>

              <Link href={`/rute/${kost.id}`}>
                <Button variant="outline" className="mt-6 w-full">
                  <MapPin className="mr-2 inline" size={16} />
                  Lihat rute dari UNNES
                </Button>
              </Link>
            </section>

          </aside>

        </div>

      </div>

      {/* STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0A241B]/95 p-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-xs text-[#91A99D]">Harga mulai</p>
            <p className="font-bold text-[#4ADE9F]">
              {formatRupiah(kost.harga)}/bln
            </p>
          </div>

          <Link
            href={`/riwayat?kostId=${kost.id}`}
            className="flex-1 sm:flex-none"
          >
            <Button className="w-full">
              <MessageCircle className="mr-2 inline" size={18} />
              Tanyakan Ketersediaan
            </Button>
          </Link>
        </div>
      </div>

    </main>
  );
}
