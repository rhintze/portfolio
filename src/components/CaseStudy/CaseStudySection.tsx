import { ReactNode } from "react";
import styles from "./CaseStudySection.module.css";

type Props = {
  title: string;
  description: ReactNode;
  children?: ReactNode;
};

export default function CaseStudySection({
  title,
  description,
  children,
}: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.text}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.description}>{description}</div>
      </div>
      {children && <div className={styles.visual}>{children}</div>}
    </section>
  );
}
