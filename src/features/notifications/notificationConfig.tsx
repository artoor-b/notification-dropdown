import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { FileText, Trash2, UserRound } from "lucide-react";
import type { Notification, NotificationType } from "./types";

export type IconVariant = "primary" | "maroon";

interface NotificationTypeConfig {
  Icon: LucideIcon;
  iconVariant: IconVariant;
  renderMessage: (notification: Notification) => ReactNode;
}

/**
 * Every notification type maps to its icon, colour and message.
 */
export const notificationConfig: Record<
  NotificationType,
  NotificationTypeConfig
> = {
  TEAM_JOIN: {
    Icon: UserRound,
    iconVariant: "primary",
    renderMessage: ({ actorName }) => (
      <>
        <strong>{actorName}</strong> joined your team.
      </>
    ),
  },
  REVIEW_REQUESTED: {
    Icon: FileText,
    iconVariant: "primary",
    renderMessage: ({ actorName, company }) => (
      <>
        <strong>{actorName}</strong> from <strong>{company}</strong> has
        requested a review
      </>
    ),
  },
  REVIEW_CANCELLED: {
    Icon: Trash2,
    iconVariant: "maroon",
    renderMessage: ({ actorName, company }) => (
      <>
        <strong>{actorName}</strong> from <strong>{company}</strong> has
        cancelled their review request
      </>
    ),
  },
};
