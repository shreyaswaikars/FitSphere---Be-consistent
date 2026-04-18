import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitSphere | Your Consistency Companion",
  description: "A premium fitness consistency tracking application designed to help you stay on track with adaptive insights and motivational streaks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
