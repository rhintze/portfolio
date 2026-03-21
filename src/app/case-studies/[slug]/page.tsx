"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import MetricsBlock from "@/components/CaseStudy/MetricsBlock";
import ImageViewer from "@/components/CaseStudy/ImageViewer";
import FadeImage from "@/components/FadeImage/FadeImage";
import styles from "./page.module.css";

const SRC_OPEN_TEXT =
  "https://www.figma.com/api/mcp/asset/7fdf8c5a-66c8-4127-9586-a0e88387ef40";
const SRC_SUGGESTIONS =
  "https://www.figma.com/api/mcp/asset/c464f062-b0e3-41ae-9339-4e97aada5e11";

type CaseShot = {
  src: string;
  alt: string;
  caption?: string;
  description?: string;
};

const VIEWER_SHOTS: CaseShot[] = [
  {
    src: SRC_OPEN_TEXT,
    alt: "Open text field — describe the business in your own words",
    description:
      "From one sentence toward ready-to-launch ideas: open input that feeds AI context without feeling like a form.",
  },
  {
    src: SRC_SUGGESTIONS,
    alt: "AI-generated suggestions for what to launch",
    description:
      "Suggestions framed as a short consultation — the lowest drop-off step in onboarding.",
  },
  {
    src: SRC_OPEN_TEXT,
    alt: "Open text field with concrete placeholder examples",
    description:
      "Placeholder copy shows how to describe the business — giving the model what it needs while staying human.",
  },
  {
    src: SRC_SUGGESTIONS,
    alt: "Suggestion screen — five-minute business consultant",
    description:
      "Dynamic proposals replaced a fixed use-case list; testing quotes validated the fit.",
  },
  {
    src: SRC_OPEN_TEXT,
    alt: "Preview of the live transaction page, form, and automated reply",
    description:
      "Preview clarifies what was built for the solopreneur versus what their customers see.",
  },
  {
    src: SRC_SUGGESTIONS,
    alt: "Editor — adjust what matters after seeing the preview",
    description:
      "Editing follows preview so users know what they are tailoring.",
  },
  {
    src: SRC_OPEN_TEXT,
    alt: "Onboarding — who are you?",
    caption: "Who are you?",
    description: "Flow step 1 — identity setup.",
  },
  {
    src: SRC_OPEN_TEXT,
    alt: "Onboarding — describe what you offer in your own words",
    caption: "In your own words.",
    description: "Flow step 2 — open language instead of vertical dropdowns.",
  },
  {
    src: SRC_SUGGESTIONS,
    alt: "Onboarding — AI suggests what to launch",
    caption: "AI suggests what to launch.",
    description: "Flow step 3 — consultant-style suggestions.",
  },
  {
    src: SRC_OPEN_TEXT,
    alt: "Onboarding — see what was built for you",
    caption: "See what was built for you.",
    description:
      "Flow step 4 — page, form, and automated reply as one artifact.",
  },
  {
    src: SRC_SUGGESTIONS,
    alt: "Onboarding — edit what matters",
    caption: "Edit what matters.",
    description: "Flow step 5 — editor after context is clear.",
  },
  {
    src: SRC_SUGGESTIONS,
    alt: "Onboarding complete — active, shareable link",
    caption: "Active. Share it.",
    description:
      "Flow step 6 — ready to share; under ten minutes from sign-up.",
  },
  {
    src: SRC_SUGGESTIONS,
    alt: "Celebration — Flow is live and shareable",
    description:
      "Closing — a solopreneur can go live in the time it takes to drink a coffee.",
  },
];

const IX = {
  hero: 0,
  decision02: 2,
  decision03: 3,
  decision04: 4,
  flow: 6,
  closing: 12,
} as const;

const tags = [
  "Product Strategy",
  "UX Research",
  "AI Integration",
  "Mobile-first",
  "0→1",
];

const metrics = [
  {
    value: "2.5×",
    label:
      "Transaction rate improvement — driven by improved AI-generated language, a fixed CTA, and reducing form questions.",
  },
  {
    value: "88%",
    label:
      "Completion rate on the suggestion screen — the highest in the onboarding flow.",
  },
  {
    value: "+34%",
    label:
      "UMUX-Lite improvement across the end-to-end experience — setup, editing, and sharing — over 15+ usability studies.",
  },
  {
    value: "< 10 min",
    label:
      "From sign-up to a live, shareable page — with no technical knowledge required.",
  },
];

const researchStats = [
  {
    value: "70+",
    label: "User interviews designed, facilitated, and analyzed personally",
  },
  {
    value: "15+",
    label: "Usability tests in Maze with UMUX-Lite scoring",
  },
  {
    value: "+34%",
    label:
      "UMUX-Lite improvement across ease of use, relevance, and task completion",
  },
  {
    value: "4×",
    label:
      "Research methods: moderated, unmoderated, behavioral, live prototype",
  },
];

const flowShots = VIEWER_SHOTS.slice(IX.flow, IX.closing);

const FLOW_GAP = 10;

export default function CaseStudyPage() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const openViewer = useCallback((i: number) => setViewerIndex(i), []);
  const closeViewer = useCallback(() => setViewerIndex(null), []);

  const viewerImages = useMemo(
    () =>
      VIEWER_SHOTS.map(({ src, alt, description }) => ({
        src,
        alt,
        description,
      })),
    []
  );

  /* ── Carousel state ───────────────────────── */
  const [carouselPos, setCarouselPos] = useState(0);
  const [visCount, setVisCount] = useState(6);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackOuterRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef(0);

  useEffect(() => {
    const update = () => {
      if (!trackOuterRef.current) return;
      const w = trackOuterRef.current.offsetWidth;
      if (w < 420) setVisCount(2);
      else if (w < 600) setVisCount(3);
      else if (w < 860) setVisCount(4);
      else setVisCount(6);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxPos = Math.max(0, flowShots.length - visCount);

  useEffect(() => {
    if (carouselPos > maxPos) setCarouselPos(maxPos);
  }, [maxPos, carouselPos]);

  useEffect(() => {
    const apply = () => {
      if (!trackRef.current?.firstElementChild) return;
      const slide = trackRef.current.firstElementChild as HTMLElement;
      const step = slide.offsetWidth + FLOW_GAP;
      trackRef.current.style.transform = `translateX(-${carouselPos * step}px)`;
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [carouselPos]);

  const moveCarousel = useCallback(
    (delta: number) => {
      setCarouselPos((prev) => Math.max(0, Math.min(prev + delta, maxPos)));
    },
    [maxPos]
  );

  const dots = useMemo(
    () => Array.from({ length: maxPos + 1 }, (_, i) => i),
    [maxPos]
  );

  const heroShots = VIEWER_SHOTS.slice(IX.hero, IX.hero + 2);
  const d02Shot = VIEWER_SHOTS[IX.decision02];
  const d03Shot = VIEWER_SHOTS[IX.decision03];
  const d04Shots = VIEWER_SHOTS.slice(IX.decision04, IX.decision04 + 2);
  const closingShot = VIEWER_SHOTS[IX.closing];

  return (
    <>
      <div className={styles.page}>
        {/* ═══ HERO — s-warm ═══════════════════════════ */}
        <section className={`${styles.sWarm} ${styles.hero}`}>
          <div className={styles.prose}>
            <span className={styles.sectionMarker} style={{ marginBottom: 20 }}>
              Case Study
            </span>
            <blockquote className={styles.heroQuote}>
              &ldquo;I could even run my business from my couch.&rdquo;
            </blockquote>
            <h1 className={styles.heroTitle}>Jimdo Flows</h1>
            <p className={styles.heroRole}>
              Senior Product Designer &middot; Jimdo &middot; 2022–Present
            </p>
            <p>
              A tool that turns a plain-text description into a shareable
              transaction page — with form and automated reply — in under 10
              minutes. No technical knowledge. No jargon.
            </p>
            <div className={styles.tags}>
              {tags.map((t) => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.heroScreens}>
            {heroShots.map((shot, i) => (
              <button
                key={i}
                type="button"
                className={styles.screenFrame}
                onClick={() => openViewer(IX.hero + i)}
                aria-label={`View ${shot.alt} fullscreen`}
              >
                <FadeImage
                  src={shot.src}
                  alt={shot.alt}
                  width={360}
                  height={720}
                  className={styles.phoneImage}
                  unoptimized
                />
              </button>
            ))}
          </div>
          <p className={styles.caption}>
            From one sentence to four ready-to-launch ideas — in seconds.
          </p>
        </section>

        {/* ═══ CONTEXT — s-warm ════════════════════════ */}
        <section className={styles.sWarm}>
          <div className={styles.prose}>
            <div className={styles.contextGrid}>
              <div>
                <h2 className={styles.h2}>The Product</h2>
                <p>
                  Jimdo Flows is a transaction artifact builder for
                  solopreneurs. Describe what you offer. Get a micro landing
                  page, a lead capture form, and an automated email reply —
                  ready to share in minutes.
                </p>
                <p>
                  The user already has an audience. What they need is a fast,
                  frictionless way to activate a transaction — today, without
                  building a full website.
                </p>
              </div>
              <div>
                <h2 className={styles.h2}>The Role</h2>
                <p>
                  Involved from day one — from early concept through launch and
                  ongoing iteration. Working across research, strategy,
                  experience, and visual direction, in close collaboration with
                  PMs, engineering, and marketing — including translating
                  research insights into product positioning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ THE CHALLENGE — bare cards ══════════════ */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionMarker}>The Challenge</span>
        </div>
        <div className={styles.challengeGrid}>
          <div className={styles.challengeCard}>
            <span className={styles.challengeIcon} aria-hidden="true">
              🧱
            </span>
            <h3 className={styles.challengeTitle}>Invisible Complexity</h3>
            <p className={styles.challengeBody}>
              Flows shares infrastructure with a broader platform. Our user
              needed none of that complexity exposed.
            </p>
          </div>
          <div className={styles.challengeCard}>
            <span className={styles.challengeIcon} aria-hidden="true">
              🗣
            </span>
            <h3 className={styles.challengeTitle}>The Wrong Language</h3>
            <p className={styles.challengeBody}>
              &ldquo;Form&rdquo;, &ldquo;CMS&rdquo;, &ldquo;email reply&rdquo;
              confused users. The interface had to describe outcomes, not
              features.
            </p>
          </div>
          <div className={styles.challengeCard}>
            <span className={styles.challengeIcon} aria-hidden="true">
              🤖
            </span>
            <h3 className={styles.challengeTitle}>AI Needs Context</h3>
            <p className={styles.challengeBody}>
              To generate relevant content, the product needed user input —
              without making it feel like a form.
            </p>
          </div>
        </div>

        {/* ═══ RESEARCH — s-warm ═══════════════════════ */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionMarker}>How We Learned</span>
        </div>
        <section className={styles.sWarm}>
          <div className={styles.prose}>
            <div className={styles.researchLayout}>
              <div>
                <p>
                  Moderated sessions on Google Meet. Unmoderated flows with Maze
                  heatmaps. Live session recordings in FullStory. Self-serve
                  behavioral data in Mixpanel.
                </p>
                <p>
                  Built a fully functional AI prototype in Lovable connected to
                  a live Supabase database — to test real AI-generated output
                  with real users in moderated sessions. Not a simulation.
                </p>
                <p>
                  Qualitative analysis done in group synthesis sessions and
                  individually using AI to surface patterns — extracting
                  specific user language, identifying non-obvious correlations,
                  flagging potential biases. Formalized this approach and shared
                  it with the research team through internal office hours.
                </p>
                <p className={styles.italicHighlight}>
                  The bar for every decision: would someone with no technical
                  background — and no business training — understand this
                  immediately?
                </p>
              </div>
              <div className={styles.researchStats}>
                {researchStats.map((s) => (
                  <div key={s.value} className={styles.statCard}>
                    <span className={styles.statNumber}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ KEY DECISIONS — all s-black ═════════════ */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionMarker}>Key Decisions</span>
        </div>

        {/* D01 — text only */}
        <section className={styles.sBlack}>
          <div className={styles.decisionGrid}>
            <div>
              <span className={styles.dlabel}>Decision 01</span>
              <h3 className={styles.dtitle}>
                Keep the user in context. Always.
              </h3>
              <p>
                Flows shares infrastructure with Jimdo&apos;s broader platform.
                The pressure was to send users into that fuller environment to
                edit their page.
              </p>
              <p className={styles.pushback}>We pushed back.</p>
              <p>
                The user wants to launch something. Give them exactly that —
                right there, without sending them somewhere else to get lost.
              </p>
            </div>
            <div />
          </div>
        </section>

        {/* D02 — text left, phone right */}
        <section className={styles.sBlack}>
          <div className={styles.decisionGrid}>
            <div>
              <span className={styles.dlabel}>Decision 02</span>
              <h3 className={styles.dtitle}>
                Replace taxonomy with natural language.
              </h3>
              <p>
                There were recurring proposals to use a standard business
                vertical dropdown.
              </p>
              <p className={styles.pushback}>We pushed back.</p>
              <p>
                A dropdown forces the user into someone else&apos;s taxonomy. An
                open text field lets users describe their business in their own
                words.
              </p>
              <p>
                Users naturally followed the format of the placeholder. That
                observation became a design principle:{" "}
                <em>
                  the right example is better than the best instruction.
                </em>
              </p>
            </div>
            <div className={styles.decisionVisual}>
              <button
                type="button"
                className={styles.phoneMock}
                onClick={() => openViewer(IX.decision02)}
                aria-label={`View ${d02Shot.alt} fullscreen`}
                style={{ cursor: "pointer" }}
              >
                <FadeImage
                  src={d02Shot.src}
                  alt={d02Shot.alt}
                  width={360}
                  height={720}
                  className={styles.phoneImage}
                  unoptimized
                />
              </button>
              <p className={styles.caption}>
                The placeholder shows users how to describe their business —
                giving the AI exactly what it needs.
              </p>
            </div>
          </div>
        </section>

        {/* D03 — centerpiece: phone centered, quotes flanking */}
        <section className={styles.sBlack}>
          <div className={styles.prose}>
            <span className={styles.dlabel}>
              Decision 03 — The Centerpiece
            </span>
            <h3 className={styles.dtitle}>
              The 5-minute business consultant.
            </h3>

            <div className={styles.d3Top}>
              <div
                className={`${styles.quoteBlock} ${styles.quoteBlockLeft}`}
              >
                <blockquote className={styles.quoteItemLeft}>
                  &ldquo;This totally fits me.&rdquo;
                </blockquote>
                <blockquote className={styles.quoteItemLeft}>
                  &ldquo;This is exactly what I&apos;m doing.&rdquo;
                </blockquote>
              </div>

              <div className={styles.d3PhoneCol}>
                <button
                  type="button"
                  className={styles.phoneMock}
                  onClick={() => openViewer(IX.decision03)}
                  aria-label={`View ${d03Shot.alt} fullscreen`}
                  style={{ cursor: "pointer" }}
                >
                  <FadeImage
                    src={d03Shot.src}
                    alt={d03Shot.alt}
                    width={360}
                    height={720}
                    className={styles.phoneImage}
                    unoptimized
                  />
                </button>
              </div>

              <div
                className={`${styles.quoteBlock} ${styles.quoteBlockRight}`}
              >
                <blockquote
                  className={`${styles.quoteItem} ${styles.d3MobileQuote}`}
                >
                  &ldquo;This totally fits me.&rdquo;
                </blockquote>
                <blockquote
                  className={`${styles.quoteItem} ${styles.d3MobileQuote}`}
                >
                  &ldquo;This is exactly what I&apos;m doing.&rdquo;
                </blockquote>
                <blockquote className={styles.quoteItem}>
                  &ldquo;I got totally booked using Flows.&rdquo;
                </blockquote>
              </div>
            </div>

            <p>
              The suggestion screen replaced a fixed list of use cases. The
              hypothesis: dynamic suggestions might cause drop-off. Too many
              options. Too much decision.
            </p>
            <p className={styles.emphasized}>The opposite happened.</p>
            <p>
              The prompt concept came from three converging observations: the
              technical constraints of the tool, the principle of time to value,
              and a fundamental truth surfaced through 70+ interviews —
              solopreneurs are not a monolith. A fixed list couldn&apos;t serve
              them. A consultant could.
            </p>
            <p className={styles.italicHighlight}>
              &ldquo;You are a business consultant. You have 5 minutes to give
              any solopreneur something they can promote today.&rdquo;
            </p>
            <p>
              That single framing changed everything. It became the screen with
              the lowest drop-off in the entire onboarding.
            </p>
            <p className={styles.statPull}>88% completion rate.</p>
          </div>
        </section>

        {/* D04 — text left, two screens with arrow right */}
        <section className={styles.sBlack}>
          <div className={styles.decisionGrid}>
            <div>
              <span className={styles.dlabel}>Decision 04</span>
              <h3 className={styles.dtitle}>
                Show the result before the editor.
              </h3>
              <p>
                Before this screen existed, users who completed onboarding
                landed directly in the editor. Most couldn&apos;t tell if the
                interface was for them or for their customers.
              </p>
              <p>
                A preview screen — showing the page, form, and email as a
                complete artifact — resolved that confusion immediately.
              </p>
              <p>
                First Flow setup rate improved by nearly 70% following the
                change.
              </p>
            </div>
            <div className={styles.decisionVisual}>
              <div className={styles.d4Screens}>
                <button
                  type="button"
                  className={styles.phoneMock}
                  onClick={() => openViewer(IX.decision04)}
                  aria-label={`View ${d04Shots[0].alt} fullscreen`}
                  style={{ cursor: "pointer" }}
                >
                  <FadeImage
                    src={d04Shots[0].src}
                    alt={d04Shots[0].alt}
                    width={360}
                    height={720}
                    className={styles.phoneImage}
                    unoptimized
                  />
                </button>
                <span className={styles.arrowBetween} aria-hidden="true">
                  →
                </span>
                <button
                  type="button"
                  className={styles.phoneMock}
                  onClick={() => openViewer(IX.decision04 + 1)}
                  aria-label={`View ${d04Shots[1].alt} fullscreen`}
                  style={{ cursor: "pointer" }}
                >
                  <FadeImage
                    src={d04Shots[1].src}
                    alt={d04Shots[1].alt}
                    width={360}
                    height={720}
                    className={styles.phoneImage}
                    unoptimized
                  />
                </button>
              </div>
              <p className={styles.caption}>
                Before: users landed in the editor confused. After: a preview
                makes clear what was built for them.
              </p>
            </div>
          </div>
        </section>

        {/* D05 — text left, before/after table right */}
        <section className={styles.sBlack}>
          <div className={styles.decisionGrid}>
            <div>
              <span className={styles.dlabel}>Decision 05</span>
              <h3 className={styles.dtitle}>
                Don&apos;t name what you don&apos;t need to explain.
              </h3>
              <p>
                Mentioning &ldquo;form&rdquo; or &ldquo;email reply&rdquo;
                during onboarding increased confusion, not clarity. We removed
                those terms entirely. The interface stopped explaining its
                mechanics and started describing outcomes.
              </p>
            </div>
            <div>
              <table className={styles.baTable}>
                <thead>
                  <tr>
                    <th>Before</th>
                    <th>After</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.tdBefore}>
                      &ldquo;Set up your form&rdquo;
                    </td>
                    <td className={styles.tdAfter}>
                      &ldquo;People will answer a few questions&rdquo;
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tdBefore}>
                      &ldquo;Configure email reply&rdquo;
                    </td>
                    <td className={styles.tdAfter}>
                      &ldquo;They&apos;ll get a confirmation&rdquo;
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tdBefore}>
                      &ldquo;Choose your business vertical&rdquo;
                    </td>
                    <td className={styles.tdAfter}>
                      &ldquo;Describe what you offer&rdquo;
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══ THE FLOW — carousel ════════════════════ */}
        <section className={styles.sBlackClip}>
          <div className={styles.carouselPad}>
            <div className={styles.carouselHeader}>
              <div>
                <span className={styles.sectionMarker}>The Flow</span>
                <p className={styles.carouselSubtitle}>
                  From sign-up to a shareable link
                </p>
              </div>
              <div className={styles.carouselControls}>
                <button
                  type="button"
                  className={styles.carouselBtn}
                  onClick={() => moveCarousel(-1)}
                  disabled={carouselPos === 0}
                  aria-label="Previous slides"
                >
                  ←
                </button>
                <button
                  type="button"
                  className={styles.carouselBtn}
                  onClick={() => moveCarousel(1)}
                  disabled={carouselPos >= maxPos}
                  aria-label="Next slides"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div className={styles.carouselBody}>
            <div className={styles.carouselTrackOuter} ref={trackOuterRef}>
              <div className={styles.carouselTrack} ref={trackRef}
                onTouchStart={(e) => {
                  touchStartRef.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  const dx =
                    e.changedTouches[0].clientX - touchStartRef.current;
                  if (Math.abs(dx) > 40) moveCarousel(dx < 0 ? 1 : -1);
                }}
              >
                {flowShots.map((shot, i) => (
                  <div key={i} className={styles.carouselSlide}>
                    <button
                      type="button"
                      className={styles.carouselPhone}
                      onClick={() => openViewer(IX.flow + i)}
                      aria-label={`View ${shot.alt} fullscreen`}
                    >
                      <FadeImage
                        src={shot.src}
                        alt={shot.alt}
                        width={360}
                        height={720}
                        className={styles.carouselPhoneImage}
                        unoptimized
                      />
                    </button>
                    <p className={styles.carouselStep}>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    {shot.caption && (
                      <p className={styles.carouselCap}>{shot.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.carouselDots}>
              {dots.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`${styles.dot} ${d === carouselPos ? styles.dotActive : ""}`}
                  onClick={() => setCarouselPos(d)}
                  aria-label={`Go to slide ${d + 1}`}
                />
              ))}
            </div>
            <p className={styles.flowCap}>
              Under 10 minutes from sign-up to a live, shareable page.
            </p>
          </div>
          <div className={styles.carouselFooter} />
        </section>

        {/* ═══ IMPACT — metrics ═══════════════════════ */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionMarker}>Impact</span>
        </div>
        <MetricsBlock metrics={metrics} />

        {/* ═══ CLOSING — s-warm ═══════════════════════ */}
        <section className={styles.sWarm}>
          <div className={`${styles.prose} ${styles.closingCenter}`}>
            <button
              type="button"
              className={styles.closingScreen}
              onClick={() => openViewer(IX.closing)}
              aria-label={`View ${closingShot.alt} fullscreen`}
            >
              <FadeImage
                src={closingShot.src}
                alt={closingShot.alt}
                width={640}
                height={360}
                className={styles.closingImage}
                unoptimized
              />
            </button>
            <p>
              A solopreneur with an idea can have an active link — their own
              page, lead capture, and automated reply — in the time it takes to
              drink a coffee.
            </p>
            <p>No technical knowledge. No jargon. No friction.</p>
            <p style={{ marginBottom: 36 }}>
              The product works because it was built on what real people actually
              said — not what we assumed they needed.
            </p>
            <blockquote className={styles.finalQuote}>
              &ldquo;I got totally booked using Flows.&rdquo;
            </blockquote>
          </div>
        </section>
      </div>

      {viewerIndex !== null && (
        <ImageViewer
          images={viewerImages}
          currentIndex={viewerIndex}
          onClose={closeViewer}
          onNavigate={setViewerIndex}
        />
      )}
    </>
  );
}
