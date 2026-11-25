
"use client";

import { useEffect } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";
import { formatRupiah } from "@/utils/formatRupiah";
import Button from "@/components/ui/button";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  resultCount: number;
}

const facilities = [
  "WiFi",
  "AC",
  "Kasur",
  "Lemari",
  "Meja",
  "KM dalam",
  "Dapur",
  "CCTV",
  "Parkir Motor",
  "Laundry"
];

export default function FilterModal({
  open,
  onClose,
  resultCount
}: FilterModalProps) {
  const {
    tipe,
    fasilitas,
    minHarga,
    maxHarga,
    verified,
    sort,
    setTipe,
    setFasilitas,
    setMinHarga,
    setMaxHarga,
    setVerified,
    setSort,
    reset
  } = useFilterStore();

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[24px] border border-[#285441] bg-[#0F3226] shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0F3226] p-6">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="text-[#4ADE9F]" />
            <h2 id="filter-title" className="text-xl font-bold">
              Filter Kost
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup filter"
            className="rounded-full p-2 hover:bg-white/10"
          >
            <X />
          </button>
        </div>

        <div className="space-y-8 p-6">

          {/* TIPE */}
          <section>
            <h3 className="mb-4 font-bold">Tipe Kost</h3>

            <div className="flex flex-wrap gap-3">
              {["Putra", "Putri", "Campur"].map((item) => (
                <button
                  key={item}
                  onClick={() => setTipe(item)}
                  className={`rounded-full border px-5 py-3 text-sm ${
                    tipe.includes(item)
                      ? "border-[#4ADE9F] bg-[#4ADE9F]/15 text-[#4ADE9F]"
                      : "border-[#285441] text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* HARGA */}
          <section>
            <h3 className="mb-4 font-bold">Rentang Harga per Bulan</h3>

            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs text-[#91A99D]">
                  Harga Minimum
                </label>
                <input
                  type="number"
                  min={0}
                  max={maxHarga}
                  value={minHarga}
                  onChange={(e) =>
                    setMinHarga(
                      Math.min(Number(e.target.value), maxHarga)
                    )
                  }
                  className="w-full rounded-xl border border-[#285441] bg-[#143D2F] p-3 text-sm outline-none focus:border-[#4ADE9F]"
                />
                <p className="mt-1 text-xs text-[#91A99D]">
                  {formatRupiah(minHarga)}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-xs text-[#91A99D]">
                  Harga Maksimum
                </label>
                <input
                  type="number"
                  min={minHarga}
                  max={5000000}
                  value={maxHarga}
                  onChange={(e) =>
                    setMaxHarga(
                      Math.max(Number(e.target.value), minHarga)
                    )
                  }
                  className="w-full rounded-xl border border-[#285441] bg-[#143D2F] p-3 text-sm outline-none focus:border-[#4ADE9F]"
                />
                <p className="mt-1 text-xs text-[#91A99D]">
                  {formatRupiah(maxHarga)}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <input
                aria-label="Harga minimum"
                type="range"
                min={0}
                max={2000000}
                step={50000}
                value={minHarga}
                onChange={(e) =>
                  setMinHarga(
                    Math.min(Number(e.target.value), maxHarga)
                  )
                }
                className="w-full accent-[#4ADE9F]"
              />

              <input
                aria-label="Harga maksimum"
                type="range"
                min={0}
                max={2000000}
                step={50000}
                value={maxHarga}
                onChange={(e) =>
                  setMaxHarga(
                    Math.max(Number(e.target.value), minHarga)
                  )
                }
                className="w-full accent-[#4ADE9F]"
              />
            </div>
          </section>

          {/* FASILITAS */}
          <section>
            <h3 className="mb-4 font-bold">Fasilitas</h3>

            <div className="flex flex-wrap gap-2">
              {facilities.map((item) => (
                <button
                  key={item}
                  onClick={() => setFasilitas(item)}
                  className={`rounded-full border px-4 py-2 text-sm ${
                    fasilitas.includes(item)
                      ? "border-[#4ADE9F] bg-[#4ADE9F]/15 text-[#4ADE9F]"
                      : "border-[#285441] text-[#91A99D]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* VERIFIED */}
          <section>
            <h3 className="mb-4 font-bold">Status Verifikasi</h3>

            <div className="grid grid-cols-3 gap-2">
              {["Semua", "Verified", "Belum Verified"].map((item) => (
                <button
                  key={item}
                  onClick={() => setVerified(item)}
                  className={`rounded-xl border p-3 text-xs ${
                    verified === item
                      ? "border-[#4ADE9F] bg-[#4ADE9F]/15 text-[#4ADE9F]"
                      : "border-[#285441] text-[#91A99D]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* SORT */}
          <section>
            <h3 className="mb-4 font-bold">Urutkan</h3>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-xl border border-[#285441] bg-[#143D2F] p-3 text-sm text-white"
            >
              <option>Terpopuler</option>
              <option>Harga Terendah</option>
              <option>Harga Tertinggi</option>
              <option>Jarak Terdekat</option>
            </select>
          </section>
        </div>

        <div className="sticky bottom-0 flex gap-3 border-t border-white/10 bg-[#0F3226] p-5">
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>

          <Button className="flex-1" onClick={onClose}>
            Tampilkan {resultCount} kost
          </Button>
        </div>
      </div>
    </div>
  );
}
