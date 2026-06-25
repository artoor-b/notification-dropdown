import { useEffect, type RefObject } from "react";

/**
 * Used to close the dropdown when the user clicks elsewhere.
 *
 * 'enabled' lets callers skip the (small) listener cost while the menu is
 * closed, and avoids the listener firing during the same click that opened it.
 */
export const useOnClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  enabled = true,
): void => {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler();
    };

    // 'mousedown' / 'touchstart' (rather than 'click') so the menu closes as soon
    // as the user presses outside
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, enabled]);
};
