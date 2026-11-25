"use client";

import Link from "next/link";
import { ArrowLeft, ClipboardList, ExternalLink } from "lucide-react";
import { kostData } from "@/data/kost.mock";
import { useContactStore } from "@/store/contactStore";
import { useContactsHydrated } from "@/store/usePersistedHydration";
import type { ContactStatus } from "@/types";

const statusOptions: { value: ContactStatus; label: string }[] = [
  { value: "DRAFT", label: "Belum dikirim" },
  { value: "WA_SENT", label: "Pertanyaan dikirim" },
  { value: "AVAILABLE", label: "Kost tersedia" },
  { value: "UNAVAILABLE", label: "Kost tidak tersedia" },
  { value: "VISIT_REQUESTED", label: "Meminta jadwal kunjungan" },
  { value: "VISIT_CONFIRMED", label: "Kunjungan terjadwal" },
  { value: "VISITED", label: "Sudah dikunjungi" },
  { value: "NOT_SUITABLE", label: "Tidak sesuai" },
  { value: "PROCEED_RENT", label: "Lanjut proses sewa" }
];

export default function AdminPage() {
  const contacts = useContactStore((state) => state.contacts);
  const updateContact = useContactStore((state) => state.updateContact);
  const hydrated = useContactsHydrated();

  return (
    <main className="min-h-screen bg-[#0A241B] px-5 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#91A99D] hover:text-white"
        >
          <ArrowLeft size={17} /> Kembali ke beranda
        </Link>
        <div className="mb-8 mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#4ADE9F]">
              Panel demonstrasi
            </p>
            <h1 className="mt-2 text-3xl font-extrabold">
              Pengelolaan pertanyaan
            </h1>
            <p className="mt-3 text-sm text-[#91A99D]">
              Perbarui status dan catatan untuk setiap pertanyaan yang tersimpan
              di perangkat ini.
            </p>
          </div>
          <div className="rounded-xl border border-[#285441] bg-[#0F3226] px-4 py-3 text-sm">
            <span className="text-[#91A99D]">Total pertanyaan</span>
            <strong className="ml-3 text-[#4ADE9F]">{contacts.length}</strong>
          </div>
        </div>

        {!hydrated ? (
          <div className="rounded-[20px] border border-[#285441] bg-[#0F3226] p-10 text-center text-[#91A99D]">
            Memuat data...
          </div>
        ) : contacts.length === 0 ? (
          <div className="rounded-[24px] border border-[#285441] bg-[#0F3226] px-6 py-16 text-center">
            <ClipboardList size={34} className="mx-auto text-[#91A99D]" />
            <h2 className="mt-4 text-xl font-bold">Belum ada pertanyaan</h2>
            <p className="mt-2 text-sm text-[#91A99D]">
              Pertanyaan kost dari halaman Riwayat akan tampil di sini.
            </p>
            <Link
              href="/riwayat"
              className="mt-5 inline-flex rounded-full bg-[#4ADE9F] px-5 py-3 text-sm font-bold text-[#0A241B] transition hover:bg-[#86EFAC]"
            >
              Lihat halaman riwayat
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => {
              const kost = kostData.find((item) => item.id === contact.kostId);
              if (!kost) return null;

              return (
                <article
                  key={contact.id}
                  className="grid gap-5 rounded-[20px] border border-[#285441] bg-[#0F3226] p-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold">{kost.nama}</h2>
                      {kost.verified && (
                        <span className="rounded-full bg-[#4ADE9F]/10 px-3 py-1 text-xs font-semibold text-[#4ADE9F]">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-[#91A99D]">{kost.alamat}</p>
                    <p className="mt-4 whitespace-pre-wrap rounded-xl bg-[#143D2F] p-4 text-sm leading-6">
                      {contact.pesan}
                    </p>
                    <p className="mt-3 text-xs text-[#91A99D]">
                      {new Intl.DateTimeFormat("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short"
                      }).format(new Date(contact.waktu))}
                    </p>
                    <a
                      href={`https://wa.me/${kost.whatsapp}?text=${encodeURIComponent(contact.pesan)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#4ADE9F]"
                    >
                      Buka WhatsApp <ExternalLink size={15} />
                    </a>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor={`status-${contact.id}`}
                        className="mb-2 block text-sm font-semibold"
                      >
                        Status
                      </label>
                      <select
                        id={`status-${contact.id}`}
                        value={contact.status}
                        onChange={(event) => {
                          const status = statusOptions.find(
                            (option) => option.value === event.target.value
                          )?.value;
                          if (status) {
                            updateContact(contact.id, { status });
                          }
                        }}
                        className="w-full rounded-xl border border-[#285441] bg-[#143D2F] p-3 text-sm text-white outline-none focus:border-[#4ADE9F]"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor={`admin-note-${contact.id}`}
                        className="mb-2 block text-sm font-semibold"
                      >
                        Catatan untuk calon penghuni
                      </label>
                      <textarea
                        id={`admin-note-${contact.id}`}
                        rows={3}
                        value={contact.adminNote ?? ""}
                        onChange={(event) =>
                          updateContact(contact.id, {
                            adminNote: event.target.value
                          })
                        }
                        placeholder="Tambahkan informasi atau tindak lanjut"
                        className="w-full resize-y rounded-xl border border-[#285441] bg-[#143D2F] p-3 text-sm outline-none placeholder:text-[#91A99D] focus:border-[#4ADE9F]"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        <p className="mt-5 text-xs text-[#91A99D]">
          Data panel ini hanya disimpan secara lokal pada browser, bukan pada
          server bersama.
        </p>
      </div>
    </main>
  );
}