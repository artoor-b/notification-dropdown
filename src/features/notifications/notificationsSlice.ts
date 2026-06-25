import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Notification } from "./types";
import { mockNotifications } from "./mockData";
import { applyPersistedReadState } from "./persistence";

export interface NotificationsState {
  items: Notification[];
}

const initialState: NotificationsState = {
  // Seed from the mock feed, then overlay any read-state the user has
  // accumulated in a previous session.
  items: applyPersistedReadState(mockNotifications),
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
  },
});

export const { markAsRead, markAllAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
