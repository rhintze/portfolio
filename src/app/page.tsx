import ContentBlock from "@/components/ContentBlock/ContentBlock";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <ContentBlock>
        <h1 className={styles.name}>Ricardo Hintze</h1>
        <div className={styles.tagline}>
          <span>Senior Product Designer</span>
          <span className={styles.taglineDot} />
          <span>SaaS | AI | Creative Systems</span>
        </div>
      </ContentBlock>

      <ContentBlock>
        <p className={styles.body}>
          Over the <strong>8+ years</strong>, I&apos;ve led design for SaaS
          products from concept to launch. Combining UX strategy, AI
          prototyping, and front-end implementation to deliver usable,
          measurable results.
        </p>
        <p className={styles.body}>
          Currently, I&apos;m shaping <strong>AI-first</strong> experiences at
          Jimdo, helping solopreneurs turn their ideas into real businesses in
          minutes.
        </p>
      </ContentBlock>
    </>
  );
}
