import { ReactNode } from "react";
import styles from "./ResponsiveContainer.module.css";

type ResponsiveContainerProps = {
  children: ReactNode;
  /** Max width for optimal line length (~65-75 chars) */
  className?: string;
};

export default function ResponsiveContainer({
  children,
  className = "",
}: ResponsiveContainerProps) {
  return (
    <div className={`${styles.container} ${className}`}>{children}</div>
  );
}
