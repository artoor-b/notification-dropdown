import "./styles.scss";
import clsx from "clsx";

const CN = "badge";

interface BadgeProps {
  count: number;
  max?: number;
  className?: string;
}

/**
 * Count badge
 * Badge has position: absolute by default.
 * Remember to set position: relative to parent element.
 */
const Badge = ({ count, max = 99, className }: BadgeProps) => {
  if (count <= 0) return null;

  const label = count > max ? `${max}+` : String(count);

  return <span className={clsx(CN, className)}>{label}</span>;
};

export default Badge;
