"use client";

import { useSyncExternalStore } from "react";
import { useContactStore } from "@/store/contactStore";
import { useSavedStore } from "@/store/savedStore";

const subscribeSaved = (onChange: () => void) =>
  useSavedStore.persist.onFinishHydration(onChange);
const getSavedSnapshot = () => useSavedStore.persist.hasHydrated();

const subscribeContacts = (onChange: () => void) =>
  useContactStore.persist.onFinishHydration(onChange);
const getContactsSnapshot = () => useContactStore.persist.hasHydrated();

export function useSavedHydrated() {
  return useSyncExternalStore(subscribeSaved, getSavedSnapshot, () => false);
}

export function useContactsHydrated() {
  return useSyncExternalStore(subscribeContacts, getContactsSnapshot, () => false);
}
