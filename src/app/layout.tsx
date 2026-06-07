import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Providers } from "./providers";
import { NeuralBackground } from "@/components/landing/neural-background";

export const metadata: Metadata = {
  title: "Operixa — Build Software with AI Teams",
  description:
    "Operixa orchestrates AI agents to take you from idea to production-ready software, faster.",
  icons: { icon: "/icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans antialiased">
        <Providers>
          <NeuralBackground />
          {children}
        </Providers>
      </body>
    </html>
  );
}
