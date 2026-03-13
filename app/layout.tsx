import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { OrbBackground } from "@/components/ui/orb-background";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

import { SplashScreen } from "@/components/ui/splash-screen";
import { CustomCursor } from "@/components/ui/custom-cursor";

export const metadata: Metadata = {
  title: "SpyderAds AI",
  description: "AI-powered competitor ad intelligence for D2C marketing teams",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-cream text-soft-black antialiased relative z-0">
        <SplashScreen />
        <CustomCursor />
        <OrbBackground />
        {children}
      </body>
    </html>
  );
}
