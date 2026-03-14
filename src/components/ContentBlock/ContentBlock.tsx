import { ReactNode } from "react";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import styles from "./ContentBlock.module.css";

type ContentBlockProps = {
  children: ReactNode;
  align?: "start" | "center" | "end";
  grow?: boolean;
  className?: string;
};

export default function ContentBlock({
  children,
  align = "start",
  grow = false,
  className = "",
}: ContentBlockProps) {
  const alignClass =
    styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`];

  return (
    <div
      className={`${styles.block} ${alignClass} ${grow ? styles.grow : ""} ${className}`}
    >
      <div className={styles.glass}>
        <ResponsiveContainer className={styles.inner}>
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
