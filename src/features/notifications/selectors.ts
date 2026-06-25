import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { NotificationFilter } from "./types";

// All derived data lives here as memoised selectors. Crucially the unread
// count is computed from the items array rather than stored separately, so it
// can never drift out of sync with the actual read/unread state.

export const selectAllNotifications = (state: RootState) =>
  state.notifications.items;

export const selectIsSimulating = (state: RootState) =>
  state.notifications.simulating;

export const selectUnreadCount = createSelector(
  selectAllNotifications,
  (items) => items.reduce((count, n) => (n.read ? count : count + 1), 0),
);

export const selectHasUnread = createSelector(
  selectUnreadCount,
  (count) => count > 0,
);

/**
 * Returns the notifications for the active filter. Memoised per-filter so the
 * component only re-renders when the relevant slice actually changes.
 */
export const makeSelectNotificationsByFilter = () =>
  createSelector(
    [
      selectAllNotifications,
      (_: RootState, filter: NotificationFilter) => filter,
    ],
    (items, filter) =>
      filter === "unread" ? items.filter((n) => !n.read) : items,
  );
