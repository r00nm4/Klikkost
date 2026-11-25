
"use client";

import Link from "next/link";
import { MapPin, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0A241B]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4ADE9F]">
            <MapPin className="text-[#0A241B]" size={23} />
          </div>

          <div>
            <h1 className="text-xl font-extrabold">
              Klik<span className="text-[#4ADE9F]">Kost</span>
            </h1>
            <p className="text-[10px] text-[#91A99D]">
              KOST TERVALIDASI UNNES
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-[#285441] bg-[#0F3226] px-4 py-2 text-sm md:flex">
            <MapPin size={16} className="text-[#4ADE9F]" />
            Sekaran, Semarang
          </div>

          <button
            aria-label="Notifikasi"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#285441] bg-[#0F3226]"
          >
            <Bell size={18} />
          </button>
        </div>

      </div>
    </header>
  );
}
