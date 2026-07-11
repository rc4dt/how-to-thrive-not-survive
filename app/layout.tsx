import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";

import "./globals.css";

const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "How to thrive not survive",
    template: "%s | How to thrive not survive",
  },
  description:
    "A Y2K pink personal blog about thriving, not just surviving.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pixelify.variable}>
      <body>{children}</body>
    </html>
  );
}
