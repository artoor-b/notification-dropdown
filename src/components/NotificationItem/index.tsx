import "./styles.scss";
import clsx from "clsx";
import NotificationIcon from "../NotificationIcon";
import { notificationConfig } from "../../features/notifications/notificationConfig";
import type { Notification } from "../../features/notifications/types";
import { formatRelativeTime } from "../../utils/formatRelativeTime";

const CN = "notification-item";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

/**
 * A single notification row. Unread rows are rendered as a button so clicking
 * (or pressing Enter/Space on) them marks the notification read - read rows are
 * static, since there is nothing to act on.
 */
const NotificationItem = ({
  notification,
  onMarkAsRead,
}: NotificationItemProps) => {
  const { type, read, createdAt, actorName } = notification;
  const { renderMessage } = notificationConfig[type];

  const content = (
    <>
      <NotificationIcon type={type} />
      <span className={clsx(`${CN}__content`)}>
        <span className={clsx(`${CN}__message`)}>
          {renderMessage(notification)}
        </span>
        <time className={clsx(`${CN}__time`)} dateTime={createdAt}>
          {formatRelativeTime(createdAt)}
        </time>
      </span>
      {!read && <span className={clsx(`${CN}__dot`)} aria-hidden="true" />}
    </>
  );

  if (read) {
    return (
      <li className={clsx(CN, `${CN}--read`)}>
        <div className={clsx(`${CN}__body`)}>{content}</div>
      </li>
    );
  }

  return (
    <li className={clsx(CN, `${CN}--unread`)}>
      <button
        type="button"
        className={clsx(`${CN}__body`)}
        onClick={() => onMarkAsRead(notification.id)}
        aria-label={`Notification from ${actorName}. Mark as read.`}
      >
        {content}
      </button>
    </li>
  );
};

export default NotificationItem;
