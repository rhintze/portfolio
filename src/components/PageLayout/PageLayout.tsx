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
  /** 'home' = main pushed down to reveal eyes; 'default' = full overlay */
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
      {/* Full-viewport background image */}
      <div className={styles.background}>
        <Image
          src={PROFILE_IMAGE}
          alt=""
          fill
          className={styles.backgroundImage}
          priority
          unoptimized
        />
        {/* Gradient overlay - full cover */}
        <div className={styles.gradientOverlay} aria-hidden />
      </div>

      {/* Content layer - overlaps background */}
      <div
        className={`${styles.contentLayer} ${isHome ? styles.contentLayerHome : ""}`}
      >
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
