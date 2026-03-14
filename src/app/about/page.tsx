import ContentBlock from "@/components/ContentBlock/ContentBlock";
import styles from "./page.module.css";

export default function About() {
  return (
    <>
      <ContentBlock>
        <h1 className={styles.heading}>About</h1>
        <p className={styles.subtitle}>
          Born in Mexico. Based in Barcelona.
        </p>
      </ContentBlock>

      <ContentBlock>
        <div className={styles.bio}>
          <p>
            I&apos;m <strong>Ricardo Hintze</strong>, a Product Designer with
            8+ years of experience shipping SaaS products from concept to launch.
          </p>
          <p>
            I studied Graphic Design and discovered UX early — starting with
            coding interfaces, then moving into strategy, research, and systems
            thinking.
          </p>
          <p>
            I&apos;ve worked across Softtek, General Electric, iTexico,
            BuildFire, and currently Jimdo — where I help shape AI-first
            experiences for solopreneurs.
          </p>
          <p>
            Outside of work, I make films, experiment with 3D animation, draw,
            and shoot photos.
          </p>
        </div>
      </ContentBlock>
    </>
  );
}
