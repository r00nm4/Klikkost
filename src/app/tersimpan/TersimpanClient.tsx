"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Heart, Search } from "lucide-react";
import Header from "@/components/layout/header";
import KostCard from "@/components/kost/KostCard";
import type { Kost } from "@/types";
import { useSavedStore } from "@/store/savedStore";
import { useSavedHydrated } from "@/store/usePersistedHydration";

export default function TersimpanClient({ kostData }: { kostData: Kost[] }) {
  const hydrated = useSavedHydrated();
  const savedIds = useSavedStore((state) => state.savedIds);

  const savedKost = useMemo(
    () => kostData.filter((kost) => savedIds.includes(kost.id)),
    [kostData, savedIds]
  );

  return (
    <main className="min-h-screen bg-[#0A241B] pb-28 text-white">
      <Header />
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wide text-[#4ADE9F]">
            Daftar pilihanmu
          </p>
          <h1 className="mt-2 text-3xl font-extrabold">Kost tersimpan</h1>
          <p className="mt-3 text-sm text-[#91A99D]">
            Kost yang kamu tandai akan tersimpan di perangkat ini.
          </p>
        </div>

        {!hydrated ? (
          <div className="rounded-[24px] border border-[#285441] bg-[#0F3226] p-10 text-center text-[#91A99D]">
            Memuat daftar tersimpan...
          </div>
        ) : savedKost.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedKost.map((kost) => (
              <KostCard key={kost.id} kost={kost} />
            ))}
          </div>
        ) : (
          <div className="rounded-[24px] border border-[#285441] bg-[#0F3226] px-6 py-16 text-center">
            {savedIds.length > 0 ? (
              <>
                <Heart size={34} className="mx-auto text-[#91A99D]" />
                <h2 className="mt-4 text-xl font-bold">
                  Kost tersimpan tidak tersedia
                </h2>
                <p className="mt-2 text-sm text-[#91A99D]">
                  Data kost yang pernah kamu simpan sudah tidak ditemukan.
                </p>
              </>
            ) : (
              <>
                <Search size={34} className="mx-auto text-[#91A99D]" />
                <h2 className="mt-4 text-xl font-bold">
                  Belum ada kost tersimpan
                </h2>
                <p className="mt-2 text-sm text-[#91A99D]">
                  Tekan ikon hati pada kost untuk menyimpannya di sini.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-flex rounded-full bg-[#4ADE9F] px-5 py-3 text-sm font-bold text-[#0A241B] transition hover:bg-[#86EFAC]"
                >
                  Jelajahi kost
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}