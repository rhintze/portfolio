"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./PageLayout.module.css";

const PROFILE_IMAGE =
  "https://www.figma.com/api/mcp/asset/7bfd39c3-da1c-437d-93d2-8092b11a0a8f";

type PageLayoutProps = {
  children: React.ReactNode;
  variant?: "home" | "default";
};

export default function PageLayout({
  children,
  variant = "default",
}: PageLayoutProps) {
  const pathname = usePathname();
  const isHome = pathname === "/" || variant === "home";

  return (
    <div className={styles.layout}>
      <div className={styles.background} aria-hidden>
        <Image
          src={PROFILE_IMAGE}
          alt="Ricardo Hintze — portrait background"
          fill
          className={styles.backgroundImage}
          priority
          unoptimized
        />
        <div className={styles.gradientOverlay} />
      </div>

      <a href="#main-content" className="sr-only">
        Skip to content
      </a>

      <Header />

      <div
        className={`${styles.contentLayer} ${isHome ? styles.contentLayerHome : ""}`}
      >
        <main id="main-content" className={styles.main} role="main">
          {children}
        </main>
        <Footer />
      </div>

      <div key={pathname} className={styles.veil} aria-hidden />
    </div>
  );
}
