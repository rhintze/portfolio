import Image from "next/image";
import Link from "next/link";
import ContentBlock from "@/components/ContentBlock/ContentBlock";
import styles from "./page.module.css";

const SCREENSHOT_1 =
  "https://www.figma.com/api/mcp/asset/7fdf8c5a-66c8-4127-9586-a0e88387ef40";

export default function Home() {
  return (
    <>
      <ContentBlock>
        <h1 className={styles.name}>Ricardo Hintze</h1>
        <div className={styles.tagline}>
          <span>Senior Product Designer</span>
          <span className={styles.dot} aria-hidden />
          <span>SaaS | AI | Creative Systems</span>
        </div>
        <div className={styles.bio}>
          <p className={styles.body}>
            Over <strong>8+ years</strong>, I&apos;ve led design for SaaS
            products from concept to launch. Combining UX strategy, AI
            prototyping, and front-end implementation to deliver usable,
            measurable results.
          </p>
          <p className={styles.body}>
            Currently, I&apos;m shaping <strong>AI-first</strong> experiences at
            Jimdo, helping solopreneurs turn their ideas into real businesses in
            minutes.
          </p>
        </div>
      </ContentBlock>

      <ContentBlock grow>
        <div className={styles.cardGrid}>
          <Link
            href="/case-studies"
            className={styles.card}
            aria-label="View case studies — product design work"
          >
            <div className={styles.cardThumb}>
              <Image
                src={SCREENSHOT_1}
                alt="Product design preview — mobile onboarding screen"
                fill
                className={styles.cardImage}
                unoptimized
              />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.cardLabel}>Case Studies</span>
              <h2 className={styles.cardTitle}>Product Design</h2>
              <p className={styles.cardDesc}>
                SaaS products from concept to launch, shaped by research and measurable outcomes.
              </p>
              <span className={styles.cardArrow} aria-hidden>→</span>
            </div>
          </Link>

          <Link
            href="/creative-lab"
            className={styles.card}
            aria-label="View creative lab — personal projects"
          >
            <div className={styles.cardThumb}>
              <Image
                src="/images/trains.png"
                alt="Cinematic train yard at night — 3D render"
                fill
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.cardLabel}>Creative Lab</span>
              <h2 className={styles.cardTitle}>Personal Projects</h2>
              <p className={styles.cardDesc}>
                Animation, filmmaking, photography, and experiments.
              </p>
              <span className={styles.cardArrow} aria-hidden>→</span>
            </div>
          </Link>
        </div>
      </ContentBlock>
    </>
  );
}
