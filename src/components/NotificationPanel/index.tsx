import "./styles.scss";
import { useMemo, useState } from "react";
import clsx from "clsx";
import NotificationHeader from "../NotificationHeader";
import NotificationTabs from "../NotificationTabs";
import NotificationList from "../NotificationList";
import { CheckCheck, Pause, Play } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  markAllAsRead,
  markAsRead,
  toggleSimulation,
} from "../../features/notifications/notificationsSlice";
import {
  makeSelectNotificationsByFilter,
  selectIsSimulating,
  selectUnreadCount,
} from "../../features/notifications/selectors";
import type { NotificationFilter } from "../../features/notifications/types";

const CN = "notification-panel";

/**
 * The notifications surface. This is the feature container: it reads the
 * notifications from the store, owns the (UI-only) active filter, and
 * dispatches the read actions. Both the panel and the bell derive their unread
 * count from the same selector, so the two can never disagree.
 */
const NotificationPanel = () => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<NotificationFilter>("all");

  const selectByFilter = useMemo(() => makeSelectNotificationsByFilter(), []);
  const notifications = useAppSelector((state) =>
    selectByFilter(state, filter),
  );
  const unreadCount = useAppSelector(selectUnreadCount);
  const simulating = useAppSelector(selectIsSimulating);

  return (
    <section
      className={clsx(CN)}
      role="dialog"
      aria-labelledby="notification-panel-title"
    >
      <NotificationHeader unreadCount={unreadCount} />

      <div className={clsx(`${CN}__toolbar`)}>
        <NotificationTabs active={filter} onChange={setFilter} />

        <div className={clsx(`${CN}__actions`)}>
          <button
            type="button"
            className={clsx(`${CN}__mark-all`)}
            onClick={() => dispatch(markAllAsRead())}
            disabled={unreadCount === 0}
          >
            <CheckCheck size={18} aria-hidden="true" />
            <span>Mark all as read</span>
          </button>

          <button
            type="button"
            className={clsx(`${CN}__simulate`, simulating && "is-active")}
            onClick={() => dispatch(toggleSimulation())}
            aria-pressed={simulating}
            aria-label={
              simulating
                ? "Stop simulating notifications"
                : "Start simulating notifications"
            }
            title={simulating ? "Stop simulation" : "Simulate notifications"}
          >
            {simulating ? (
              <Pause size={18} aria-hidden="true" />
            ) : (
              <Play size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="notification-tabpanel"
        role="tabpanel"
        aria-labelledby={`notification-tab-${filter}`}
        className={clsx(`${CN}__tabpanel`)}
      >
        <NotificationList
          notifications={notifications}
          filter={filter}
          onMarkAsRead={(id) => dispatch(markAsRead(id))}
        />
      </div>
    </section>
  );
};

export default NotificationPanel;
