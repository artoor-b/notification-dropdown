import "./styles.scss";
import { forwardRef } from "react";
import clsx from "clsx";
import { Bell } from "lucide-react";
import Badge from "../Badge";

const CN = "notification-bell";

interface NotificationBellProps {
  unreadCount: number;
  isOpen: boolean;
  onToggle: () => void;
  controlsId: string;
}

/**
 * The bell trigger.
 */
const NotificationBell = forwardRef<HTMLButtonElement, NotificationBellProps>(
  ({ unreadCount, isOpen, onToggle, controlsId }, ref) => {
    const label =
      unreadCount > 0
        ? `Notifications, ${unreadCount} unread`
        : "Notifications";

    return (
      <button
        ref={ref}
        type="button"
        className={clsx(CN, isOpen && `${CN}--active`)}
        onClick={onToggle}
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={controlsId}
      >
        <Bell size={22} aria-hidden="true" />
        <Badge count={unreadCount} className={clsx(`${CN}__badge`)} />
      </button>
    );
  },
);

NotificationBell.displayName = "NotificationBell";

export default NotificationBell;
