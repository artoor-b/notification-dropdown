import "./styles.scss";
import clsx from "clsx";
import Badge from "../Badge";

const CN = "notification-header";

interface NotificationHeaderProps {
  unreadCount: number;
}

/** Panel title with a unread-count badge. */
const NotificationHeader = ({ unreadCount }: NotificationHeaderProps) => (
  <div className={clsx(CN)}>
    <h2 className={clsx(`${CN}__title`)} id="notification-panel-title">
      Notifications
      <Badge count={unreadCount} className={clsx(`${CN}__badge`)} />
    </h2>
  </div>
);

export default NotificationHeader;
