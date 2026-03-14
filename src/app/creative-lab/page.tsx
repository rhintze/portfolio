import ContentBlock from "@/components/ContentBlock/ContentBlock";
import styles from "./page.module.css";

export default function CreativeLab() {
  return (
    <>
      <ContentBlock>
        <h2 className={styles.heading}>Creative Lab</h2>
        <p className={styles.intro}>
          Personal projects in animation, filmmaking, and photography.
        </p>
      </ContentBlock>

      <ContentBlock>
        <p className={styles.placeholder}>
          Projects and media will be added here. Images and short videos with
          optimized loading.
        </p>
      </ContentBlock>
    </>
  );
}
