import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitor Ad War Room",
  description: "AI-powered competitor ad intelligence for D2C marketing teams",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
