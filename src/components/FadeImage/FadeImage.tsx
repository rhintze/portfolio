"use client";

import { useState, useCallback } from "react";
import Image, { ImageProps } from "next/image";
import styles from "./FadeImage.module.css";

type FadeImageProps = ImageProps & {
  shimmer?: boolean;
};

export default function FadeImage({
  shimmer = true,
  className = "",
  onLoad,
  alt,
  ...props
}: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true);
      if (onLoad) {
        (onLoad as (e: React.SyntheticEvent<HTMLImageElement>) => void)(e);
      }
    },
    [onLoad],
  );

  return (
    <div className={`${styles.wrapper} ${loaded ? styles.loaded : ""}`}>
      {shimmer && <div className={styles.shimmer} aria-hidden />}
      <Image
        {...props}
        alt={alt}
        className={`${styles.image} ${className}`}
        onLoad={handleLoad}
      />
    </div>
  );
}
