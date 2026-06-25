# Notifications Dropdown

A notifications dropdown menu built with React + TypeScript. It opens from the
bell (or the user pill), filters notifications, marks them as read, and can
simulate a live feed of incoming notifications.

## Tech stack

- **React 19 + TypeScript** + **Vite**
- **Redux Toolkit** + **react-redux** - domain state
- **SCSS** - styling with shared design tokens
- **lucide-react** - icons
- **clsx** - class name composition

## Getting started

You need Node 18+.

```bash
npm install
npm run dev      # start the dev server (Vite prints the local URL)
```

Other scripts:

```bash
npm run build    # type-check + production build
npm run lint     # run ESLint
npm run preview  # preview the production build
```

## Project structure

```
src/
  app/                     # Redux store + typed hooks
  features/notifications/  # domain logic (state, data, config)
    notificationsSlice.ts    # reducers: markAsRead, markAllAsRead, addNotification, toggleSimulation
    selectors.ts             # derived data (unread count, filtered list)
    notificationConfig.tsx   # type -> icon + message (the registry)
    types.ts, mockData.ts
    generateNotification.ts  # random notification for the simulator
    useNotificationSimulator.ts
    persistence.ts           # localStorage: read-state + simulator flag
  components/              # one folder per component (index.tsx + styles.scss)
  hooks/                  # useOnClickOutside
  utils/                  # formatRelativeTime
  styles/                 # tokens, mixins, global styles
```

## How it works

- **Open / close** - `NotificationCenter` owns the open state. It closes on
  outside click, on `Escape` (focus returns to the bell), and animates with CSS.
- **Tabs** - "All" / "Unread" filter the list. The filter is local UI state; the
  empty message changes to match the active tab.
- **Mark as read** - clicking an unread row marks it read; "Mark all as read"
  clears them in one action. The button is disabled when nothing is unread.
- **Unread count** - the bell badge and the title badge are **computed from the
  data** with a selector, so they can never drift out of sync.
- **Notification types** - each type maps to an icon, colour and message in one
  registry (`notificationConfig`). Adding a new type means adding one entry.
- **Simulator** - the Play/Stop button toggles a feed that adds a random
  notification every 3–4 seconds, so you can watch the count and list update live.
  Note: simulated notifications are not stored - they are gone after a reload.
- **Persistence** - read-state and the simulator on/off flag are saved to
  `localStorage` and restored on reload.

## Key decisions

- **State split.** Domain data (notifications, read-state, simulator flag) lives
  in Redux. Ephemeral UI state (is the menu open, which tab) stays in local
  React state. This keeps the store focused and the components simple.
- **No duplicated counts.** The unread count is always derived from the items
  array, never stored on its own - there is nothing to keep in sync.
- **Open for extension.** The type - presentation registry means new
  notification kinds need no component changes.
- **Container vs presentational.** `NotificationCenter` handles menu behaviour,
  `NotificationPanel` reads the store, and the smaller components just render
  props - easy to read and extend.
- **Persist the minimum.** Only the user's read-state and the simulator flag are
  persisted. The feed itself is treated as server data and regenerated on load,
  so timestamps always look fresh.
- **Accessibility.** Keyboard support (Escape, focus return), ARIA roles for the
  dialog and tabs, `aria-label`/`aria-pressed` on the controls, and
  `prefers-reduced-motion` handling.

## Possible next steps

- **Cap the feed length.** Keep only the latest N notifications so a long
  simulator run does not grow the list forever.
- **Real data source.** Swap the mock feed for an API or WebSocket; the slice and
  selectors would stay the same.
- **Persist the full feed.** Save notifications themselves (not only read-state)
  if they should survive a reload.
- **More actions.** Per-item dismiss/delete, mark as unread, or click-through to
  the related resource.
- **Group by date.** Section the list into "Today", "Yesterday", "Earlier".
- **Tests.** Unit tests for the reducers, selectors and `formatRelativeTime`,
  plus a component test for the open/close and read flows.

```

```
