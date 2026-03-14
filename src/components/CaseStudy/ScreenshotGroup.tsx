"use client";

import FadeImage from "@/components/FadeImage/FadeImage";
import styles from "./ScreenshotGroup.module.css";

type Screenshot = {
  src: string;
  alt: string;
  caption?: string;
};

type Props = {
  screenshots: Screenshot[];
  layout?: "phone-trio" | "phone-pair" | "desktop-phone";
  onImageClick?: (index: number) => void;
};

export default function ScreenshotGroup({
  screenshots,
  layout = "phone-trio",
  onImageClick,
}: Props) {
  return (
    <section className={styles.wrapper} aria-label="Screenshots">
      <div className={`${styles.group} ${styles[layout]}`}>
        {screenshots.map((shot, i) => (
          <div
            key={i}
            className={styles.item}
            onClick={() => onImageClick?.(i)}
            onKeyDown={(e) => {
              if (onImageClick && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onImageClick(i);
              }
            }}
            role={onImageClick ? "button" : undefined}
            tabIndex={onImageClick ? 0 : undefined}
            aria-label={onImageClick ? `View ${shot.alt} fullscreen` : undefined}
          >
            <div className={styles.frame}>
              <FadeImage
                src={shot.src}
                alt={shot.alt}
                width={360}
                height={780}
                className={styles.image}
                unoptimized
              />
            </div>
            {shot.caption && (
              <p className={styles.caption}>{shot.caption}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
