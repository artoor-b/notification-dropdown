export type NotificationType =
  | "TEAM_JOIN"
  | "REVIEW_REQUESTED"
  | "REVIEW_CANCELLED";

export interface Notification {
  id: string;
  type: NotificationType;
  actorName: string;
  company?: string;
  createdAt: string;
  read: boolean;
}

export type NotificationFilter = "all" | "unread";
