import "./styles.scss";
import clsx from "clsx";
import NotificationItem from "../NotificationItem";
import EmptyState from "../EmptyState";
import type {
  Notification,
  NotificationFilter,
} from "../../features/notifications/types";

const CN = "notification-list";

interface NotificationListProps {
  notifications: Notification[];
  filter: NotificationFilter;
  onMarkAsRead: (id: string) => void;
}

// Empty-state copy is chosen by filter so the message is always relevant:
// "all caught up" reads wrong when the user has simply never had
// a notification, and vice-versa.
const EMPTY_COPY: Record<
  NotificationFilter,
  { title: string; description: string }
> = {
  all: {
    title: "No notifications yet",
    description: "When something happens, you'll see it here.",
  },
  unread: {
    title: "You're all caught up",
    description: "You have no unread notifications.",
  },
};

const NotificationList = ({
  notifications,
  filter,
  onMarkAsRead,
}: NotificationListProps) => {
  if (notifications.length === 0) {
    const copy = EMPTY_COPY[filter];
    return <EmptyState title={copy.title} description={copy.description} />;
  }

  return (
    <ul className={clsx(CN)}>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </ul>
  );
};

export default NotificationList;
