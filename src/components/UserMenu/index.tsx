import "./styles.scss";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

const CN = "user-menu";

interface UserMenuProps {
  name: string;
  isOpen: boolean;
  onToggle: () => void;
  controlsId: string;
}

const initialsOf = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

/**
 * User menu
 */
const UserMenu = ({ name, isOpen, onToggle, controlsId }: UserMenuProps) => (
  <button
    type="button"
    className={clsx(CN, isOpen && `${CN}--active`)}
    onClick={onToggle}
    aria-haspopup="dialog"
    aria-expanded={isOpen}
    aria-controls={controlsId}
  >
    <span className={clsx(`${CN}__avatar`)} aria-hidden="true">
      {initialsOf(name)}
    </span>
    <span className={clsx(`${CN}__name`)}>{name}</span>
    <ChevronDown
      size={18}
      className={clsx(`${CN}__chevron`)}
      aria-hidden="true"
    />
  </button>
);

export default UserMenu;
