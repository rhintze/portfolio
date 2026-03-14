import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.credit}>
          <span>
            Animation:{" "}
            <a
              href="https://www.youtube.com/@hintze_r"
              target="_blank"
              rel="noopener noreferrer"
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
