import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerInner}>
        <div className={styles.credit}>
          <span>
            Animation:{" "}
            <a
              href="https://www.youtube.com/@hintze_r"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ricardo Hintze animation on YouTube"
            >
              @hintze_r
            </a>
          </span>
          <span>Photo: hintze_rr</span>
        </div>
      </div>
    </footer>
  );
}
