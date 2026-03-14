import Link from "next/link";
import ContentBlock from "@/components/ContentBlock/ContentBlock";
import styles from "./page.module.css";

const caseStudies = [
  {
    slug: "helping-small-business-transact",
    title: "Helping small business transact. Fast.",
    excerpt:
      "AI-powered product focused on speed, clarity and usability. UMUX-Lite score of 8+.",
  },
];

export default function CaseStudies() {
  return (
    <>
      <ContentBlock>
        <h2 className={styles.heading}>Case Studies</h2>
        <p className={styles.intro}>
          Selected product design work from concept to launch.
        </p>
      </ContentBlock>

      {caseStudies.map((study) => (
        <ContentBlock key={study.slug}>
          <Link href={`/case-studies/${study.slug}`} className={styles.card}>
            <h3 className={styles.cardTitle}>{study.title}</h3>
            <p className={styles.cardExcerpt}>{study.excerpt}</p>
          </Link>
        </ContentBlock>
      ))}
    </>
  );
}
