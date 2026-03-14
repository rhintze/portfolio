import Link from "next/link";
import ContentBlock from "@/components/ContentBlock/ContentBlock";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <ContentBlock>
        <h1 className={styles.headline}>
          Designing technology people can actually understand.
        </h1>
        <div className={styles.bio}>
          <p className={styles.body}>
            I&apos;m Ricardo Hintze, a Senior Product Designer with 8+ years
            building SaaS products.
          </p>
          <p className={styles.body}>
            I focus on creating tools that are clear, trustworthy, and genuinely
            useful — products that respect people&apos;s time, attention, and
            privacy.
          </p>
        </div>
        <div className={styles.meta}>
          <span>Senior Product Designer</span>
          <span className={styles.dot} aria-hidden />
          <span>SaaS Products</span>
          <span className={styles.dot} aria-hidden />
          <span>AI Products</span>
          <span className={styles.dot} aria-hidden />
          <span>Barcelona</span>
        </div>
      </ContentBlock>

      <section className={styles.cardGrid} aria-label="Featured work">
        <Link
          href="/case-studies"
          className={styles.card}
          aria-label="View case studies — product design work"
        >
          <div className={styles.cardThumb} />
          <div className={styles.cardContent}>
            <span className={styles.cardLabel}>Case Studies</span>
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitle}>Product Design</h2>
              <p className={styles.cardDesc}>
                Research-driven product design from concept to launch.
              </p>
            </div>
            <span className={styles.cardArrow} aria-hidden>
              →
            </span>
          </div>
        </Link>

        <Link
          href="/creative-lab"
          className={styles.card}
          aria-label="View creative lab — personal projects"
        >
          <div className={styles.cardThumb} />
          <div className={styles.cardContent}>
            <span className={styles.cardLabel}>Creative Lab</span>
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitle}>Personal Projects</h2>
              <p className={styles.cardDesc}>
                Animation, filmmaking, photography, and visual experiments.
              </p>
            </div>
            <span className={styles.cardArrow} aria-hidden>
              →
            </span>
          </div>
        </Link>
      </section>

      <section className={styles.glassSection} aria-label="How I work">
        <div className={styles.twoColumns}>
          <div className={styles.column}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <ul className={styles.experienceList}>
              <li className={styles.experienceEntry}>
                <span className={styles.experienceRole}>Senior Product Designer</span>
                <span className={styles.experienceDetail}>Jimdo</span>
                <span className={styles.experienceDetail}>2022 — Present</span>
              </li>
              <li className={styles.experienceEntry}>
                <span className={styles.experienceRole}>Senior Product Designer</span>
                <span className={styles.experienceDetail}>BuildFire</span>
                <span className={styles.experienceDetail}>2018 — 2022</span>
              </li>
              <li className={styles.experienceEntry}>
                <span className={styles.experienceRole}>UX / UI Designer</span>
                <span className={styles.experienceDetail}>iTexico</span>
                <span className={styles.experienceDetail}>2017 — 2018</span>
              </li>
              <li className={styles.experienceEntry}>
                <span className={styles.experienceRole}>UI &amp; UX Designer</span>
                <span className={styles.experienceDetail}>Softtek</span>
                <span className={styles.experienceDetail}>2016 — 2017</span>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h2 className={styles.sectionTitle}>Design Philosophy</h2>
            <ul className={styles.principlesList}>
              <li className={styles.principle}>
                Technology should be understandable.
              </li>
              <li className={styles.principle}>
                Respect the user&apos;s context.
              </li>
              <li className={styles.principle}>
                Reduce complexity relentlessly.
              </li>
              <li className={styles.principle}>Design with integrity.</li>
              <li className={styles.principle}>Craft matters.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.glassSection} aria-label="Capabilities">
        <h2 className={styles.sectionTitle}>What I&apos;m known for</h2>
        <ul className={styles.capabilitiesList}>
          <li className={styles.capability}>Product Design</li>
          <li className={styles.capability}>User Research</li>
          <li className={styles.capability}>Product Strategy</li>
          <li className={styles.capability}>AI-Driven Experiences</li>
          <li className={styles.capability}>Interaction Design</li>
          <li className={styles.capability}>Design Systems</li>
          <li className={styles.capability}>Rapid Prototyping</li>
          <li className={styles.capability}>Creative Systems</li>
        </ul>
      </section>
    </>
  );
}
