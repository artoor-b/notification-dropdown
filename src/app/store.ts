import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "../features/notifications/notificationsSlice";
import { persistReadState } from "../features/notifications/persistence";

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
  },
});

// Persist read-state whenever it changes.
let lastItems = store.getState().notifications.items;
store.subscribe(() => {
  const { items } = store.getState().notifications;
  if (items !== lastItems) {
    lastItems = items;
    persistReadState(items);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
