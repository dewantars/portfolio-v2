import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PublicChrome } from "@/components/public-chrome";
import { getShellData } from "@/lib/data/shell";
import { getSiteConfig } from "@/lib/data/site-config";

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

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig();

  return {
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    openGraph: {
      title: siteConfig.seoTitle,
      description: siteConfig.seoDescription,
      type: "website",
    },
    other: {
      "theme-color": "#000000",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { siteConfig } = await getShellData();

  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <PublicChrome siteConfig={siteConfig}>{children}</PublicChrome>
      </body>
    </html>
  );
}
