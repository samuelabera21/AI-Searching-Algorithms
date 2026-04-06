import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "@xyflow/react/dist/style.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Route Planner AI",
  description: "Interactive Ethiopian route planning visualizer for BFS, UCS, Greedy, and A*"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable} bg-paper text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
