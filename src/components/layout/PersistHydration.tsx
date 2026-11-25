"use client";

import { useEffect, useRef } from "react";
import { useContactStore } from "@/store/contactStore";
import { useSavedStore } from "@/store/savedStore";

export default function PersistHydration() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    Promise.all([
      useSavedStore.persist.rehydrate(),
      useContactStore.persist.rehydrate()
    ]).catch((error: unknown) => {
      console.error("Gagal memuat data KlikKost dari penyimpanan lokal.", error);
    });
  }, []);

  return null;
}
