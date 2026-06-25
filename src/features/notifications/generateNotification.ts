import type { Notification, NotificationType } from "./types";

// Builds a random notification to simulate an incoming event.

const TYPES: NotificationType[] = [
  "TEAM_JOIN",
  "REVIEW_REQUESTED",
  "REVIEW_CANCELLED",
];

const NAMES = [
  "Carol Jar",
  "Simona Winch",
  "Jim Beam",
  "Peter Pan",
  "Marek Nowak",
  "Anna Kowalska",
  "John Smith",
  "Olivia Cole",
];

const COMPANIES = [
  "Example Company",
  "Example Company 2",
  "Globex",
  "Initech",
  "Umbrella",
];

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateNotification = (): Notification => {
  const type = pick(TYPES);
  return {
    id: `sim-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    actorName: pick(NAMES),
    company: type === "TEAM_JOIN" ? undefined : pick(COMPANIES),
    createdAt: new Date().toISOString(),
    read: false,
  };
};
