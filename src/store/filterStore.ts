
"use client";

import { create } from "zustand";

interface FilterState {
  search: string;
  tipe: string[];
  fasilitas: string[];
  minHarga: number;
  maxHarga: number;
  verified: string;
  quick: string;
  sort: string;

  setSearch: (value: string) => void;
  setTipe: (value: string) => void;
  setFasilitas: (value: string) => void;
  setMinHarga: (value: number) => void;
  setMaxHarga: (value: number) => void;
  setVerified: (value: string) => void;
  setQuick: (value: string) => void;
  setSort: (value: string) => void;
  reset: () => void;
}

const initialState = {
  search: "",
  tipe: [] as string[],
  fasilitas: [] as string[],
  minHarga: 0,
  maxHarga: 2000000,
  verified: "Semua",
  quick: "Semua",
  sort: "Terpopuler"
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,

  setSearch: (search) => set({ search }),

  setTipe: (tipe) =>
    set((state) => ({
      tipe: state.tipe.includes(tipe)
        ? state.tipe.filter((item) => item !== tipe)
        : [...state.tipe, tipe]
    })),

  setFasilitas: (fasilitas) =>
    set((state) => ({
      fasilitas: state.fasilitas.includes(fasilitas)
        ? state.fasilitas.filter((item) => item !== fasilitas)
        : [...state.fasilitas, fasilitas]
    })),

  setMinHarga: (minHarga) => set({ minHarga }),
  setMaxHarga: (maxHarga) => set({ maxHarga }),
  setVerified: (verified) => set({ verified }),
  setQuick: (quick) => set({ quick }),
  setSort: (sort) => set({ sort }),

  reset: () => set(initialState)
}));
