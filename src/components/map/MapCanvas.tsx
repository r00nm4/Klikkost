"use client";

import dynamic from "next/dynamic";
import type { Kost } from "@/types";

interface MapCanvasProps {
  kosts: Kost[];
  selectedId?: string;
  routeToSelected?: boolean;
}

const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-80 items-center justify-center bg-[#143D2F] text-sm text-[#91A99D]">
      Memuat peta...
    </div>
  )
});

export default function MapCanvas({
  kosts,
  selectedId,
  routeToSelected = false
}: MapCanvasProps) {
  return (
    <InteractiveMap
      kosts={kosts}
      selectedId={selectedId}
      routeToSelected={routeToSelected}
    />
  );
}
