"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "./ImageViewer.module.css";

type ViewerImage = {
  src: string;
  alt: string;
  description?: string;
};

type Props = {
  images: ViewerImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

function ImageViewerContent({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: Props) {
  const current = images[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;
  const [loaded, setLoaded] = useState(false);
  const [closing, setClosing] = useState(false);
  const closingTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setLoaded(false);
  }, [currentIndex]);

  const handleClose = useCallback(() => {
    setClosing(true);
    closingTimer.current = setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    return () => {
      if (closingTimer.current) clearTimeout(closingTimer.current);
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && hasNext) onNavigate(currentIndex + 1);
    },
    [handleClose, onNavigate, currentIndex, hasPrev, hasNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.overlayClosing : ""}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer — ${current.alt}`}
    >
      <button
        className={styles.close}
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        aria-label="Close image viewer"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => hasPrev && onNavigate(currentIndex - 1)}
          aria-label="Previous image"
          disabled={!hasPrev}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className={styles.imageWrapper}>
          <Image
            key={current.src + currentIndex}
            src={current.src}
            alt={current.alt}
            width={720}
            height={1560}
            className={`${styles.image} ${loaded ? styles.imageLoaded : ""}`}
            onLoad={() => setLoaded(true)}
            unoptimized
            priority
          />
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => hasNext && onNavigate(currentIndex + 1)}
          aria-label="Next image"
          disabled={!hasNext}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className={styles.meta} onClick={(e) => e.stopPropagation()}>
        {current.description && (
          <p className={styles.description}>{current.description}</p>
        )}
        <span className={styles.counter} aria-live="polite">
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}

export default function ImageViewer(props: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(<ImageViewerContent {...props} />, document.body);
}
