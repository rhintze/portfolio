import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import PageLayout from "@/components/PageLayout/PageLayout";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ricardo Hintze | Senior Product Designer",
  description:
    "SaaS | AI | Creative Systems. 8+ years leading design for products from concept to launch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ibmPlexMono.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
