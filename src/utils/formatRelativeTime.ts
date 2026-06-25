// Formats an ISO timestamp into a short label that mirrors the
// design language ("54 minutes ago", "6 hours ago", "yesterday", "2 days ago").

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const pluralize = (value: number, unit: string): string =>
  `${value} ${unit}${value === 1 ? "" : "s"} ago`;

export const formatRelativeTime = (
  iso: string,
  now: number = Date.now(),
): string => {
  const seconds = Math.max(
    0,
    Math.floor((now - new Date(iso).getTime()) / 1000),
  );

  if (seconds < MINUTE) return "just now";
  if (seconds < HOUR) return pluralize(Math.floor(seconds / MINUTE), "minute");
  if (seconds < DAY) return pluralize(Math.floor(seconds / HOUR), "hour");

  const days = Math.floor(seconds / DAY);
  if (days === 1) return "yesterday";
  if (days < 7) return pluralize(days, "day");

  // Older than a week: fall back to an absolute date.
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};
