import styles from "./QuoteBlock.module.css";

type Props = {
  quote: string;
  caption?: string;
};

export default function QuoteBlock({ quote, caption }: Props) {
  return (
    <section className={styles.wrapper}>
      <blockquote className={styles.quote}>
        &ldquo;{quote}&rdquo;
      </blockquote>
      {caption && <p className={styles.caption}>{caption}</p>}
    </section>
  );
}
