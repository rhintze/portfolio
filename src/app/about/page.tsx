import ContentBlock from "@/components/ContentBlock/ContentBlock";
import styles from "./page.module.css";

export default function About() {
  return (
    <>
      <ContentBlock>
        <h1 className={styles.headline}>About</h1>
        <p className={styles.tagline}>
          Born in Mexico. Based in Barcelona.
        </p>
      </ContentBlock>

      <ContentBlock>
        <div className={styles.prose}>
          <p className={styles.body}>
            Art brought me to design. In school, illustration and drawing
            evolved into 3D modeling and sculpting, tools that demanded I
            understand how things are built. That curiosity eventually led me
            to code. I started with HTML and CSS, applied it from day one, and
            never stopped. In every company I&apos;ve worked at, I&apos;ve
            written UI code that goes to production.
          </p>
          <p className={styles.body}>
            I&apos;ve spent 8+ years designing SaaS products across Softtek,
            General Electric, iTexico, BuildFire, and Jimdo, where I currently
            work on AI-first tools for solopreneurs. The through-line across all
            of it: reducing complexity without losing what makes a product
            useful.
          </p>
          <p className={styles.body}>
            I moved to Barcelona to study at the Barcelona Academy of Art, one
            of Europe&apos;s leading atelier schools. Traditional drawing,
            anatomy, the fundamentals. The same obsession with craft that drives
            my product work shows up in everything else I make: 3D animation in
            Blender, analog photography, film. I wrote, directed, and produced a
            short horror film. I have a long-form animation project in progress.
          </p>
          <p className={styles.body}>
            I grew up with a computer thanks to my father. That probably explains
            most of this.
          </p>
        </div>
      </ContentBlock>
    </>
  );
}
