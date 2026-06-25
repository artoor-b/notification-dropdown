import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "../features/notifications/notificationsSlice";
import {
  persistReadState,
  persistSimulating,
} from "../features/notifications/persistence";

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
  },
});

// Persist read-state and the simulator flag whenever they change.
let lastItems = store.getState().notifications.items;
let lastSimulating = store.getState().notifications.simulating;
store.subscribe(() => {
  const { items, simulating } = store.getState().notifications;
  if (items !== lastItems) {
    lastItems = items;
    persistReadState(items);
  }
  if (simulating !== lastSimulating) {
    lastSimulating = simulating;
    persistSimulating(simulating);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
