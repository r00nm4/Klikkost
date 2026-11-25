"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock3, Heart, House, Map } from "lucide-react";

const items = [
  { href: "/", label: "Beranda", icon: House },
  { href: "/peta", label: "Peta", icon: Map },
  { href: "/tersimpan", label: "Tersimpan", icon: Heart },
  { href: "/riwayat", label: "Riwayat", icon: Clock3 }
];

export default function BottomNav() {
  const pathname = usePathname();

  if (
    pathname.startsWith("/kost/") ||
    pathname.startsWith("/rute/") ||
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <nav
      aria-label="Navigasi utama"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#285441] bg-[#0A241B]/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex min-w-16 flex-col items-center gap-1 px-3 py-3 text-[11px] font-semibold transition ${
                active ? "text-[#4ADE9F]" : "text-[#91A99D] hover:text-white"
              }`}
            >
              <Icon size={19} aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}