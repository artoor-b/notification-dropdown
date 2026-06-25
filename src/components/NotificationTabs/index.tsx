import "./styles.scss";
import clsx from "clsx";
import type { NotificationFilter } from "../../features/notifications/types";

const CN = "notification-tabs";

interface NotificationTabsProps {
  active: NotificationFilter;
  onChange: (filter: NotificationFilter) => void;
}

const TABS: { id: NotificationFilter; label: string }[] = [
  { id: "all", label: "All Notifications" },
  { id: "unread", label: "Unread Notifications" },
];

/**
 * Notification tabs with ARIA
 */
const NotificationTabs = ({ active, onChange }: NotificationTabsProps) => (
  <div className={clsx(CN)} role="tablist" aria-label="Filter notifications">
    {TABS.map(({ id, label }) => {
      const isActive = active === id;
      return (
        <button
          key={id}
          type="button"
          role="tab"
          id={`notification-tab-${id}`}
          aria-selected={isActive}
          aria-controls="notification-tabpanel"
          tabIndex={isActive ? 0 : -1}
          className={clsx(`${CN}__tab`, isActive && `${CN}__tab--active`)}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      );
    })}
  </div>
);

export default NotificationTabs;
