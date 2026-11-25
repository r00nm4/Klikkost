"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ContactHistory } from "@/types";

type ContactUpdate = Partial<
  Pick<
    ContactHistory,
    "status" | "adminNote" | "tanggalVisit" | "jamVisit" | "catatanVisit"
  >
>;

interface ContactState {
  contacts: ContactHistory[];
  addContact: (contact: Omit<ContactHistory, "id">) => void;
  updateContact: (id: string, updates: ContactUpdate) => void;
}

export const useContactStore = create<ContactState>()(
  persist(
    (set) => ({
      contacts: [],
      addContact: (contact) =>
        set((state) => ({
          contacts: [
            {
              ...contact,
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
            },
            ...state.contacts
          ]
        })),
      updateContact: (id, updates) =>
        set((state) => ({
          contacts: state.contacts.map((contact) =>
            contact.id === id ? { ...contact, ...updates } : contact
          )
        }))
    }),
    { name: "klikkost-contacts", skipHydration: true }
  )
);
