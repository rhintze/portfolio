import { ReactNode } from "react";
import styles from "./CaseStudyContainer.module.css";

type Props = {
  children: ReactNode;
  title?: string;
};

export default function CaseStudyContainer({ children, title }: Props) {
  return (
    <article className={styles.container} aria-label={title || "Case study"}>
      <div className={styles.glass}>{children}</div>
    </article>
  );
}
