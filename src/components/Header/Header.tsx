"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/creative-lab", label: "Creative Lab" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const menuOpenRef = useRef(menuOpen);
  const closingTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  menuOpenRef.current = menuOpen;

  const close = useCallback(() => {
    if (!menuOpenRef.current) return;
    setMenuClosing(true);
    closingTimer.current = setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 250);
  }, []);

  const toggle = useCallback(() => {
    if (menuOpenRef.current) {
      close();
    } else {
      setMenuOpen(true);
    }
  }, [close]);

  useEffect(() => {
    return () => {
      if (closingTimer.current) clearTimeout(closingTimer.current);
    };
  }, []);

  useEffect(() => {
    if (menuOpen && !menuClosing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, menuClosing]);

  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <header className={styles.header} role="banner">
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo} onClick={close} aria-label="Ricardo Hintze — Home">
          Ricardo Hintze
        </Link>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerActive : ""}`}
          onClick={toggle}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
        >
          <span className={styles.burgerIcon} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="main-nav"
          className={styles.desktopNav}
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {menuOpen && (
        <nav
          className={`${styles.mobileNav} ${menuClosing ? styles.mobileNavClosing : ""}`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          {navItems.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ""}`}
                onClick={close}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
