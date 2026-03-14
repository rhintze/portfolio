import Image from "next/image";
import Link from "next/link";
import ContentBlock from "@/components/ContentBlock/ContentBlock";
import styles from "./page.module.css";

const SCREENSHOT_1 =
  "https://www.figma.com/api/mcp/asset/7fdf8c5a-66c8-4127-9586-a0e88387ef40";
const SCREENSHOT_2 =
  "https://www.figma.com/api/mcp/asset/c464f062-b0e3-41ae-9339-4e97aada5e11";

const caseStudies = [
  {
    slug: "helping-small-business-transact",
    label: "Jimdo",
    title: "Helping small businesses transact. Fast.",
    excerpt:
      "AI-powered product focused on speed, clarity and usability. Shaped through 70+ user interviews and tracked with UMUX-Lite.",
    metric: "2.6×",
    metricLabel: "B2C transactions",
    image: SCREENSHOT_1,
    imageAlt: "Jimdo mobile onboarding — business name input screen",
  },
  {
    slug: "helping-small-business-transact",
    label: "BuildFire",
    title: "Making app building accessible to everyone.",
    excerpt:
      "Redesigned the core builder experience to reduce time-to-publish and improve usability for non-technical users.",
    metric: "40%",
    metricLabel: "faster publishing",
    image: SCREENSHOT_2,
    imageAlt: "BuildFire app builder — AI-generated flow selection",
  },
  {
    slug: "helping-small-business-transact",
    label: "iTexico",
    title: "Scaling design systems across distributed teams.",
    excerpt:
      "Created a shared component library and design process that unified 4 product teams across Mexico and the US.",
    metric: "4",
    metricLabel: "teams unified",
    image: SCREENSHOT_1,
    imageAlt: "iTexico design system — component library overview",
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

      <ContentBlock grow>
        <div className={styles.grid}>
          {caseStudies.map((study, i) => (
            <Link
              key={i}
              href={`/case-studies/${study.slug}`}
              className={styles.card}
              aria-label={`${study.title} — ${study.label}`}
            >
              <div className={styles.cardThumb}>
                <Image
                  src={study.image}
                  alt={study.imageAlt}
                  fill
                  className={styles.cardImage}
                  unoptimized
                />
                <span className={styles.cardLabel}>{study.label}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <h3 className={styles.cardTitle}>{study.title}</h3>
                  <div className={styles.cardMetric}>
                    <span className={styles.metricValue}>{study.metric}</span>
                    <span className={styles.metricLabel}>{study.metricLabel}</span>
                  </div>
                </div>
                <p className={styles.cardExcerpt}>{study.excerpt}</p>
                <span className={styles.cardCta} aria-hidden>
                  Read case study →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </ContentBlock>
    </>
  );
}
