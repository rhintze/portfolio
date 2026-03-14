import Link from "next/link";
import ContentBlock from "@/components/ContentBlock/ContentBlock";
import styles from "./page.module.css";

const caseStudies = [
  {
    slug: "helping-small-business-transact",
    label: "Jimdo",
    title: "Helping small businesses transact. Fast.",
    excerpt:
      "AI-powered product focused on speed, clarity and usability. Shaped through 70+ user interviews and tracked with UMUX-Lite.",
    metric: "2.6×",
    metricLabel: "B2C transactions",
  },
  {
    slug: "helping-small-business-transact",
    label: "BuildFire",
    title: "Making app building accessible to everyone.",
    excerpt:
      "Redesigned the core builder experience to reduce time-to-publish and improve usability for non-technical users.",
    metric: "40%",
    metricLabel: "faster publishing",
  },
  {
    slug: "helping-small-business-transact",
    label: "iTexico",
    title: "Scaling design systems across distributed teams.",
    excerpt:
      "Created a shared component library and design process that unified 4 product teams across Mexico and the US.",
    metric: "4",
    metricLabel: "teams unified",
  },
];

export default function CaseStudies() {
  return (
    <>
      <ContentBlock>
        <h1 className={styles.heading}>Case Studies</h1>
        <p className={styles.intro}>
          Selected product design work from concept to launch.
        </p>
      </ContentBlock>

      <section className={styles.grid} aria-label="Case studies">
        {caseStudies.map((study, i) => (
          <Link
            key={i}
            href={`/case-studies/${study.slug}`}
            className={styles.card}
            aria-label={`${study.title} — ${study.label}`}
          >
            <div className={styles.cardThumb} />
            <div className={styles.cardContent}>
              <span className={styles.cardLabel}>{study.label}</span>
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <h3 className={styles.cardTitle}>{study.title}</h3>
                  <div className={styles.cardMetric}>
                    <span className={styles.metricValue}>{study.metric}</span>
                    <span className={styles.metricLabel}>
                      {study.metricLabel}
                    </span>
                  </div>
                </div>
                <p className={styles.cardExcerpt}>{study.excerpt}</p>
              </div>
              <span className={styles.cardCta} aria-hidden>
                Read case study →
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
