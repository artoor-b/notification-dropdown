import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Notification } from "./types";
import { mockNotifications } from "./mockData";
import { applyPersistedReadState, loadSimulating } from "./persistence";

export interface NotificationsState {
  items: Notification[];
  // Whether the incoming-notification simulator is running.
  simulating: boolean;
}

const initialState: NotificationsState = {
  // Seed from the mock feed, then overlay any read-state the user has
  // accumulated in a previous session.
  items: applyPersistedReadState(mockNotifications),
  simulating: loadSimulating(),
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    /** Mark a single notification as read. No-op if already read. */
    markAsRead(state, action: PayloadAction<string>) {
      const target = state.items.find((n) => n.id === action.payload);
      if (target) target.read = true;
    },

    /** Mark every notification as read in one action. */
    markAllAsRead(state) {
      for (const n of state.items) n.read = true;
    },

    /** Add a new (unread) notification to the top of the feed. */
    addNotification(state, action: PayloadAction<Notification>) {
      state.items.unshift(action.payload);
    },

    /** Start/stop the incoming-notification simulator. */
    toggleSimulation(state) {
      state.simulating = !state.simulating;
    },
  },
});

export const { markAsRead, markAllAsRead, addNotification, toggleSimulation } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
