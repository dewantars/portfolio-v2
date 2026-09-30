import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dewanta Rahma Satria — Software Engineer & QA",
  description:
    "Software Engineering student focused on software development, quality assurance, test automation, and UI/UX.",
  icons: {
    icon: [
      {
        url: "https://api.iconify.design/lucide:code-2.svg?color=%23ffffff",
        type: "image/svg+xml",
      },
    ],
    shortcut: ["https://api.iconify.design/lucide:code-2.svg?color=%23ffffff"],
    apple: ["https://api.iconify.design/lucide:code-2.svg?color=%23ffffff"],
  },
  openGraph: {
    title: "Dewanta Rahma Satria — Software Engineer & QA",
    description:
      "Software Engineering student focused on software development, quality assurance, test automation, and UI/UX.",
    type: "website",
  },
  other: {
    "theme-color": "#050505",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>{children}</body>
    </html>
  );
}
