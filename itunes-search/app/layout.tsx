import type React from "react";
import type { Metadata } from "next";
import { ReactQueryProviders } from "../lib/providers/ReactQueryProviders";
import localFont from "next/font/local";
import "./globals.css";

const ibmPlexSansArabic = localFont({
  src: [
    {
      path: "../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/IBM-Plex-Sans-Arabic/IBMPlexSansArabic-Text.otf",
      weight: "450",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "بحث البودكاست - iTunes Search",
  description:
    "ابحث عن البودكاست المفضلة لديك من خلال iTunes. استكشف آلاف البودكاست في مختلف المجالات.",
  keywords: ["بودكاست", "iTunes", "بحث", "الموسيقى", "Apple Podcasts"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className={ibmPlexSansArabic.className} suppressHydrationWarning>
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </body>
    </html>
  );
}
