
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedState {
  savedIds: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      savedIds: [],

      toggleSaved: (id) =>
        set((state) => ({
          savedIds: state.savedIds.includes(id)
            ? state.savedIds.filter((item) => item !== id)
            : [...state.savedIds, id]
        })),

      isSaved: (id) => get().savedIds.includes(id)
    }),
    {
      name: "klikkost-saved",
      skipHydration: true
    }
  )
);
