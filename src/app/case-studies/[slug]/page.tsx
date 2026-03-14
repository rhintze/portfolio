import ContentBlock from "@/components/ContentBlock/ContentBlock";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <>
      <ContentBlock>
        <p className={styles.quote}>
          &ldquo;I could even do this from the couch&rdquo;
        </p>
        <p className={styles.quoteSource}>
          Quote from a user during a moderated test
        </p>
      </ContentBlock>

      <ContentBlock>
        <h2 className={styles.title}>Helping small business transact. fast.</h2>
        <p className={styles.body}>
          AI-powered product focused on speed, clarity and usability. The tool
          has been praised for its ease of use that was crafted after a series
          of moderated and unmoderated user tests. Giving us a{" "}
          <strong>UMUX-Lite score of 8+</strong>.
        </p>
      </ContentBlock>
    </>
  );
}
