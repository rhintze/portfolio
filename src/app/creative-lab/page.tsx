import Image from "next/image";
import ContentBlock from "@/components/ContentBlock/ContentBlock";
import styles from "./page.module.css";

type ProjectImage = {
  src: string;
  alt: string;
  aspect?: "cinematic" | "wide" | "standard" | "portrait";
};

type CreativeProject = {
  title: string;
  medium: string;
  year?: string;
  description?: string;
  featured?: boolean;
  images: ProjectImage[];
};

const projects: CreativeProject[] = [
  {
    title: "Trains at Night",
    medium: "3D Render",
    year: "2024",
    description:
      "Cinematic rendering of a train yard at night. Built in Blender with volumetric lighting and atmospheric fog.",
    featured: true,
    images: [
      {
        src: "/images/trains.png",
        alt: "Aerial view of a train yard at night with cinematic lighting and atmospheric fog",
        aspect: "cinematic",
      },
    ],
  },
];

export default function CreativeLab() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <ContentBlock>
        <h1 className={styles.title}>Creative Lab</h1>
        <p className={styles.subtitle}>
          Animation, filmmaking, photography, and experiments.
        </p>
      </ContentBlock>

      <section className={styles.gallery} aria-label="Creative projects">
        {featured.map((project, i) => (
          <article key={`f-${i}`} className={styles.featuredProject}>
            <div
              className={`${styles.imageFrame} ${styles[project.images[0]?.aspect || "wide"]}`}
            >
              <Image
                src={project.images[0].src}
                alt={project.images[0].alt}
                fill
                className={styles.image}
                sizes="100vw"
                priority={i === 0}
              />
              <div className={styles.imageVignette} aria-hidden />
            </div>
            <div className={styles.projectMeta}>
              <div className={styles.metaLeft}>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                {project.description && (
                  <p className={styles.projectDesc}>{project.description}</p>
                )}
              </div>
              <div className={styles.metaRight}>
                <span className={styles.tag}>{project.medium}</span>
                {project.year && (
                  <span className={styles.tag}>{project.year}</span>
                )}
              </div>
            </div>

            {project.images.length > 1 && (
              <div className={styles.imageRow}>
                {project.images.slice(1).map((img, j) => (
                  <div
                    key={j}
                    className={`${styles.imageFrame} ${styles[img.aspect || "wide"]}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}

        {rest.map((project, i) => (
          <article key={`r-${i}`} className={styles.project}>
            <div className={styles.projectHeader}>
              <div>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                {project.description && (
                  <p className={styles.projectDesc}>{project.description}</p>
                )}
              </div>
              <div className={styles.metaRight}>
                <span className={styles.tag}>{project.medium}</span>
                {project.year && (
                  <span className={styles.tag}>{project.year}</span>
                )}
              </div>
            </div>
            <div
              className={
                project.images.length === 1
                  ? styles.singleImage
                  : styles.imageGrid
              }
            >
              {project.images.map((img, j) => (
                <div
                  key={j}
                  className={`${styles.imageFrame} ${styles[img.aspect || "wide"]}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className={styles.image}
                    sizes={
                      project.images.length === 1
                        ? "100vw"
                        : "(max-width: 768px) 100vw, 50vw"
                    }
                  />
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
