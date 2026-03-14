import { ReactNode } from "react";
import ResponsiveContainer from "@/components/ResponsiveContainer/ResponsiveContainer";
import styles from "./ContentBlock.module.css";

type ContentBlockProps = {
  children: ReactNode;
  /** Alignment: 'start' | 'center' | 'end' */
  align?: "start" | "center" | "end";
  className?: string;
};

export default function ContentBlock({
  children,
  align = "start",
  className = "",
}: ContentBlockProps) {
  return (
    <div className={`${styles.block} ${styles[`align${align.charAt(0).toUpperCase() + align.slice(1)}`]} ${className}`}>
      <div className={styles.glass}>
        <ResponsiveContainer className={styles.inner}>
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
