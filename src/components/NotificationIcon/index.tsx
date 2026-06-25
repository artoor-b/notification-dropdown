import "./styles.scss";
import clsx from "clsx";
import { notificationConfig } from "../../features/notifications/notificationConfig";
import type { NotificationType } from "../../features/notifications/types";

const CN = "notification-icon";

interface NotificationIconProps {
  type: NotificationType;
}

/**
 * Renders the coloured circular icon for a notification.
 */
const NotificationIcon = ({ type }: NotificationIconProps) => {
  const { Icon, iconVariant } = notificationConfig[type];

  return (
    <span className={clsx(CN, `${CN}--${iconVariant}`)}>
      <Icon size={20} aria-hidden="true" />
    </span>
  );
};

export default NotificationIcon;
