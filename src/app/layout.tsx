
import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import BottomNav from "@/components/layout/BottomNav";
import PersistHydration from "@/components/layout/PersistHydration";

export const metadata: Metadata = {
  title: "KlikKost - Kost Tervalidasi UNNES",
  description:
    "Temukan kost nyaman dan tervalidasi di sekitar Universitas Negeri Semarang."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <PersistHydration />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
