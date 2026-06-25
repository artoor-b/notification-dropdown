import "./styles.scss";
import clsx from "clsx";
import { Inbox } from "lucide-react";

const CN = "empty-state";

interface EmptyStateProps {
  title: string;
  description?: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className={clsx(CN)}>
    <span className={clsx(`${CN}__icon`)}>
      <Inbox size={28} aria-hidden="true" />
    </span>
    <p className={clsx(`${CN}__title`)}>{title}</p>
    {description && <p className={clsx(`${CN}__description`)}>{description}</p>}
  </div>
);

export default EmptyState;
