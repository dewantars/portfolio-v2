import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { BackToTop } from "@/components/back-to-top";
import { SpaceBackdrop } from "@/components/space-backdrop";
import { getShellData } from "@/lib/data/shell";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dewanta Rahma Satria | Software Engineer & QA",
  description:
    "Software Engineering student focused on software development, quality assurance, test automation, and UI/UX.",
  openGraph: {
    title: "Dewanta Rahma Satria | Software Engineer & QA",
    description:
      "Software Engineering student focused on software development, quality assurance, test automation, and UI/UX.",
    type: "website",
  },
  other: {
    "theme-color": "#000000",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { profile, socials } = await getShellData();

  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <div className="relative isolate min-h-screen text-[var(--white-100)] flex flex-col">
          <SpaceBackdrop />
          <Navigation name={profile?.name} />
          <div className="flex-1">{children}</div>
          <Footer name={profile?.name} socials={socials} />
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
