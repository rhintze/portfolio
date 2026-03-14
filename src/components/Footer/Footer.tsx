import Link from "next/link";
import styles from "./Footer.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/creative-lab", label: "Creative Lab" },
  { href: "/about", label: "About" },
];

const socialLinks = [
  { href: "https://www.linkedin.com/in/ricardohintze", label: "LinkedIn" },
  { href: "https://www.youtube.com/@hintze_r", label: "YouTube" },
  { href: "https://www.instagram.com/hintze_rr", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerInner}>
        <div className={styles.columns}>
          <div className={styles.brand}>
            <span className={styles.initial}>R</span>
          </div>
          <nav className={styles.nav} aria-label="Footer navigation">
            {navItems.map(({ href, label }) => (
              <Link key={href} href={href} className={styles.navLink}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} Ricardo Hintze
          </span>
          <div className={styles.social}>
            {socialLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
