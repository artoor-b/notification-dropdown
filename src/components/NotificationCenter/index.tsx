import "./styles.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import NotificationBell from "../NotificationBell";
import UserMenu from "../UserMenu";
import NotificationPanel from "../NotificationPanel";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useAppSelector } from "../../app/hooks";
import { selectUnreadCount } from "../../features/notifications/selectors";

const CN = "notification-center";
const PANEL_ID = "notifications-panel";

interface NotificationCenterProps {
  userName?: string;
}

/**
 * Top-level orchestrator for the notifications experience.
 * It handles the behaviours:
 * click-outside, Escape-to-close, and focus restoration to the trigger.
 */
const NotificationCenter = ({
  userName = "John Doe",
}: NotificationCenterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const unreadCount = useAppSelector(selectUnreadCount);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((open) => !open), []);

  useOnClickOutside(containerRef, close, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        bellRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Move focus into the panel when it opens
  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  return (
    <div className={clsx(CN)} ref={containerRef}>
      <div className={clsx(`${CN}__triggers`)}>
        <NotificationBell
          ref={bellRef}
          unreadCount={unreadCount}
          isOpen={isOpen}
          onToggle={toggle}
          controlsId={PANEL_ID}
        />
        <UserMenu
          name={userName}
          isOpen={isOpen}
          onToggle={toggle}
          controlsId={PANEL_ID}
        />
      </div>

      <div
        ref={panelRef}
        id={PANEL_ID}
        tabIndex={-1}
        inert={!isOpen}
        aria-hidden={!isOpen}
        className={clsx(`${CN}__dropdown`, isOpen && `${CN}__dropdown--open`)}
      >
        <NotificationPanel />
      </div>
    </div>
  );
};

export default NotificationCenter;
