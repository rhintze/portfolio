"use client";

import { useState, useCallback } from "react";
import CaseStudyContainer from "@/components/CaseStudy/CaseStudyContainer";
import QuoteBlock from "@/components/CaseStudy/QuoteBlock";
import CaseStudySection from "@/components/CaseStudy/CaseStudySection";
import ScreenshotGroup from "@/components/CaseStudy/ScreenshotGroup";
import MetricsBlock from "@/components/CaseStudy/MetricsBlock";
import SectionDivider from "@/components/CaseStudy/SectionDivider";
import ImageViewer from "@/components/CaseStudy/ImageViewer";

const SCREENSHOT_1 =
  "https://www.figma.com/api/mcp/asset/7fdf8c5a-66c8-4127-9586-a0e88387ef40";
const SCREENSHOT_2 =
  "https://www.figma.com/api/mcp/asset/c464f062-b0e3-41ae-9339-4e97aada5e11";

const screenshots = [
  {
    src: SCREENSHOT_1,
    alt: "Business name input — onboarding step",
    caption: "Business name input",
    description: "Onboarding step where the user enters their business name to start building.",
  },
  {
    src: SCREENSHOT_2,
    alt: "AI-generated flows — pick a flow",
    caption: "AI-generated flows",
    description: "AI generates multiple flow options so the user can pick the one closest to their intent.",
  },
];

const metrics = [
  {
    value: "2.6×",
    label: "Increase in B2C transactions with key experience improvements.",
  },
  {
    value: "1.2×",
    label: "Increase in traffic by improving how users share their page.",
  },
];

export default function CaseStudyPage() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const openViewer = useCallback((i: number) => setViewerIndex(i), []);
  const closeViewer = useCallback(() => setViewerIndex(null), []);

  return (
    <>
      <CaseStudyContainer title="Helping small businesses transact. Fast.">
        <QuoteBlock
          quote="I could even do this from the couch."
          caption="Quote from a moderated usability test"
        />

        <SectionDivider />

        <CaseStudySection
          title="Helping small businesses transact. Fast."
          description={
            <>
              <p>
                AI-powered product focused on speed, clarity and usability.
              </p>
              <p>
                The experience was shaped through moderated and unmoderated user
                testing, with usability improvements tracked using the UMUX-Lite
                framework.
              </p>
              <p>
                The goal was simple: help solopreneurs transform an idea into a
                real transaction as quickly as possible.
              </p>
            </>
          }
        >
          <ScreenshotGroup
            screenshots={screenshots.slice(0, 2)}
            layout="phone-pair"
            onImageClick={openViewer}
          />
        </CaseStudySection>

        <SectionDivider />

        <ScreenshotGroup
          screenshots={screenshots}
          layout="phone-pair"
          onImageClick={openViewer}
        />

        <SectionDivider />

        <CaseStudySection
          title="My Role"
          description={
            <ul>
              <li>Directed user research from the beginning of the project</li>
              <li>Led 70+ interviews with real users</li>
              <li>Ran 10+ unmoderated usability tests</li>
              <li>Designed a mobile-first experience focused on time-to-value</li>
              <li>Created an AI-powered prototype used to refine the experience</li>
              <li>Helped shape the internal narrative and go-to-market strategy with marketing</li>
            </ul>
          }
        />

        <SectionDivider />

        <MetricsBlock metrics={metrics} />
      </CaseStudyContainer>

      {viewerIndex !== null && (
        <ImageViewer
          images={screenshots}
          currentIndex={viewerIndex}
          onClose={closeViewer}
          onNavigate={setViewerIndex}
        />
      )}
    </>
  );
}
