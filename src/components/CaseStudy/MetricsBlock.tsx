import styles from "./MetricsBlock.module.css";

type Metric = {
  value: string;
  label: string;
};

type Props = {
  metrics: Metric[];
};

export default function MetricsBlock({ metrics }: Props) {
  return (
    <section className={styles.wrapper} aria-label="Key metrics">
      <div className={styles.grid} role="list">
        {metrics.map((m, i) => (
          <div key={i} className={styles.card} role="listitem">
            <span className={styles.value} aria-label={`${m.value} ${m.label}`}>
              {m.value}
            </span>
            <p className={styles.label}>{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
