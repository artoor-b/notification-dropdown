import type { Notification } from "./types";

// In a real app this data would arrive from an API/websocket. Timestamps are generated
// relative to "now" at module load so the relative-time labels ("54 minutes
// ago", "yesterday", etc.) always look fresh and match the reference design,
// regardless of when the demo is opened.
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const ago = (ms: number): string => new Date(Date.now() - ms).toISOString();

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "TEAM_JOIN",
    actorName: "Carol Jar",
    createdAt: ago(54 * MINUTE),
    read: false,
  },
  {
    id: "n2",
    type: "TEAM_JOIN",
    actorName: "Simona Winch",
    createdAt: ago(6 * HOUR),
    read: false,
  },
  {
    id: "n3",
    type: "REVIEW_CANCELLED",
    actorName: "Jim Beam",
    company: "Example Company",
    createdAt: ago(1 * DAY),
    read: true,
  },
  {
    id: "n4",
    type: "REVIEW_REQUESTED",
    actorName: "Jim Beam",
    company: "Example Company",
    createdAt: ago(1 * DAY + 2 * HOUR),
    read: true,
  },
  {
    id: "n5",
    type: "REVIEW_REQUESTED",
    actorName: "Peter Pan",
    company: "Example Company 2",
    createdAt: ago(2 * DAY),
    read: true,
  },
  {
    id: "n6",
    type: "TEAM_JOIN",
    actorName: "Marek Nowak",
    createdAt: ago(3 * DAY),
    read: true,
  },
  {
    id: "n7",
    type: "REVIEW_REQUESTED",
    actorName: "Anna Kowalska",
    company: "Globex",
    createdAt: ago(5 * DAY),
    read: true,
  },
];
