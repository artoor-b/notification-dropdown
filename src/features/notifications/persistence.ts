import type { Notification } from "./types";

// Persistence
//
// We persist *only* the read/unread state (a map of id -> read),
// not the notifications themselves. The notification feed is treated as
// server-owned data that is regenerated on every load (with fresh relative
// timestamps), while the user's "have I seen this?" state is the bit worth
// remembering across reloads. Overlaying the two keeps the demo looking like
// the design on first load yet still survives a refresh.

const STORAGE_KEY = "notifications:read-state";
const SIMULATING_KEY = "notifications:simulating";

type ReadStateMap = Record<string, boolean>;

const safeParse = (raw: string | null): ReadStateMap => {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as ReadStateMap) : {};
  } catch {
    return {};
  }
};

export const applyPersistedReadState = (
  notifications: Notification[],
): Notification[] => {
  if (typeof window === "undefined") return notifications;

  const readState = safeParse(window.localStorage.getItem(STORAGE_KEY));
  if (Object.keys(readState).length === 0) return notifications;

  return notifications.map((n) =>
    n.id in readState ? { ...n, read: readState[n.id] } : n,
  );
};

/** Persist the current read-state map. Called from a store subscription. */
export const persistReadState = (notifications: Notification[]): void => {
  if (typeof window === "undefined") return;

  const readState: ReadStateMap = {};
  for (const n of notifications) readState[n.id] = n.read;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(readState));
  } catch {
    // Storage full / unavailable - ignore.
  }
};

/** Whether the notification simulator was running last session. */
export const loadSimulating = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SIMULATING_KEY) === "true";
};

export const persistSimulating = (simulating: boolean): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SIMULATING_KEY, String(simulating));
  } catch {
    // Storage full / unavailable - ignore.
  }
};
