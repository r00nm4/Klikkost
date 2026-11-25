"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock3, MessageCircle, Search } from "lucide-react";
import Header from "@/components/layout/header";
import Button from "@/components/ui/button";
import { kostData } from "@/data/kost.mock";
import { useContactStore } from "@/store/contactStore";
import { useContactsHydrated } from "@/store/usePersistedHydration";
import type { ContactStatus } from "@/types";
import { formatRupiah } from "@/utils/formatRupiah";
import type { FormEvent } from "react";

const subscribeToLocation = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
};
const getRequestedKostId = () =>
  new URLSearchParams(window.location.search).get("kostId") ?? "";

const statusLabels: Record<ContactStatus, string> = {
  DRAFT: "Belum dikirim",
  WA_SENT: "Pertanyaan dikirim",
  AVAILABLE: "Kost tersedia",
  UNAVAILABLE: "Kost tidak tersedia",
  VISIT_REQUESTED: "Meminta jadwal kunjungan",
  VISIT_CONFIRMED: "Kunjungan terjadwal",
  VISITED: "Sudah dikunjungi",
  NOT_SUITABLE: "Tidak sesuai",
  PROCEED_RENT: "Lanjut proses sewa"
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export default function RiwayatPage() {
  const contacts = useContactStore((state) => state.contacts);
  const addContact = useContactStore((state) => state.addContact);
  const requestedKostId = useSyncExternalStore(
    subscribeToLocation,
    getRequestedKostId,
    () => ""
  );
  const [selectedKostOverride, setSelectedKostOverride] = useState<
    string | null
  >(null);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const hydrated = useContactsHydrated();
  const selectedKostId = selectedKostOverride ?? requestedKostId;

  const selectedKost = useMemo(
    () => kostData.find((kost) => kost.id === selectedKostId),
    [selectedKostId]
  );

  function startInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedKost) return;

    const text =
      message.trim() ||
      `Halo, saya ingin bertanya mengenai ketersediaan ${selectedKost.nama}.`;
    addContact({
      kostId: selectedKost.id,
      status: "WA_SENT",
      pesan: text,
      waktu: new Date().toISOString()
    });

    const whatsappUrl = `https://wa.me/${selectedKost.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setNotice("Pertanyaan dicatat. Percakapan WhatsApp dibuka di tab baru.");
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-[#0A241B] pb-28 text-white">
      <Header />
      <div className="mx-auto max-w-5xl px-5 py-10 md:px-8">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wide text-[#4ADE9F]">
            Kelola pertanyaan kost
          </p>
          <h1 className="mt-2 text-3xl font-extrabold">Riwayat & pertanyaan</h1>
          <p className="mt-3 text-sm text-[#91A99D]">
            Pertanyaan tersimpan di perangkat ini dan dapat diteruskan ke
            pemilik kost melalui WhatsApp.
          </p>
        </div>

        <section className="rounded-[24px] border border-[#285441] bg-[#0F3226] p-5 md:p-7">
          <div className="mb-5 flex items-center gap-3">
            <MessageCircle className="text-[#4ADE9F]" />
            <h2 className="text-xl font-bold">Tanyakan ketersediaan</h2>
          </div>

          <form onSubmit={startInquiry} className="space-y-4">
            <div>
              <label
                htmlFor="kost-selection"
                className="mb-2 block text-sm font-semibold"
              >
                Pilih kost
              </label>
              <select
                id="kost-selection"
                required
                value={selectedKostId}
                onChange={(event) =>
                  setSelectedKostOverride(event.target.value)
                }
                className="w-full rounded-xl border border-[#285441] bg-[#143D2F] p-3 text-sm text-white outline-none focus:border-[#4ADE9F]"
              >
                <option value="">Pilih kost yang ingin ditanyakan</option>
                {kostData.map((kost) => (
                  <option key={kost.id} value={kost.id}>
                    {kost.nama} — {formatRupiah(kost.harga)}/bln
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="inquiry-message"
                className="mb-2 block text-sm font-semibold"
              >
                Pesan
              </label>
              <textarea
                id="inquiry-message"
                rows={3}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Contoh: Apakah kamar masih tersedia untuk bulan depan?"
                className="w-full resize-y rounded-xl border border-[#285441] bg-[#143D2F] p-3 text-sm outline-none placeholder:text-[#91A99D] focus:border-[#4ADE9F]"
              />
            </div>

            {selectedKost && (
              <p className="text-xs text-[#91A99D]">
                Kontak WhatsApp: +{selectedKost.whatsapp}
              </p>
            )}
            <Button type="submit" disabled={!selectedKost}>
              <MessageCircle size={16} className="mr-2 inline" />
              Simpan & buka WhatsApp
            </Button>
            {notice && (
              <p role="status" className="text-sm text-[#4ADE9F]">
                {notice}
              </p>
            )}
          </form>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center gap-3">
            <Clock3 className="text-[#4ADE9F]" />
            <h2 className="text-xl font-bold">Aktivitas sebelumnya</h2>
          </div>

          {!hydrated ? (
            <div className="rounded-[20px] border border-[#285441] bg-[#0F3226] p-8 text-center text-sm text-[#91A99D]">
              Memuat riwayat...
            </div>
          ) : contacts.length > 0 ? (
            <div className="space-y-3">
              {contacts.map((contact) => {
                const kost = kostData.find((item) => item.id === contact.kostId);
                if (!kost) return null;

                return (
                  <article
                    key={contact.id}
                    className="flex flex-col justify-between gap-4 rounded-[20px] border border-[#285441] bg-[#0F3226] p-5 sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold">{kost.nama}</h3>
                        <span className="rounded-full bg-[#4ADE9F]/10 px-3 py-1 text-xs font-semibold text-[#4ADE9F]">
                          {statusLabels[contact.status]}
                        </span>
                      </div>
                      <p className="mt-2 break-words text-sm text-[#91A99D]">
                        {contact.pesan}
                      </p>
                      <p className="mt-2 text-xs text-[#91A99D]">
                        {formatDate(contact.waktu)}
                      </p>
                      {contact.adminNote && (
                        <p className="mt-2 text-sm text-white">
                          Catatan: {contact.adminNote}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Link
                        href={`/kost/${kost.id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[#285441] px-4 py-2 text-xs font-bold hover:bg-[#143D2F]"
                      >
                        Detail <ArrowUpRight size={14} />
                      </Link>
                      <a
                        href={`https://wa.me/${kost.whatsapp}?text=${encodeURIComponent(contact.pesan)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#4ADE9F] px-4 py-2 text-xs font-bold text-[#0A241B]"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[20px] border border-[#285441] bg-[#0F3226] px-6 py-12 text-center">
              <Search size={30} className="mx-auto text-[#91A99D]" />
              <p className="mt-3 font-semibold">Belum ada riwayat pertanyaan</p>
              <p className="mt-1 text-sm text-[#91A99D]">
                Pilih kost di atas untuk mulai menghubungi pemiliknya.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}