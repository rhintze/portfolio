import ContentBlock from "@/components/ContentBlock/ContentBlock";
import styles from "./page.module.css";

export default function About() {
  return (
    <>
      <ContentBlock>
        <h2 className={styles.heading}>About</h2>
        <div className={styles.bio}>
          <p>
            My name is <strong>Ricardo Hintze</strong>. I was born in Mexico and
            am currently based in Barcelona, Spain.
          </p>
          <p>
            I studied Graphic Design and began my career as a Product Designer
            in 2016. Initially drawn to coding user interfaces, I started
            learning about user experience early on, which helped me enter the
            industry.
          </p>
          <p>
            I&apos;ve worked for companies such as Softtek, General Electric,
            iTexico, BuildFire, and am currently with the German website builder
            Jimdo.
          </p>
          <p>
            In addition to my professional work, I am always engaged in creative
            projects on the side, particularly in filmmaking and 3D animation. I
            also have a keen interest in drawing and photography.
          </p>
        </div>
      </ContentBlock>
    </>
  );
}
