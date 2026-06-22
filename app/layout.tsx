import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Afif Ramadhan — Full Stack Developer & UI/UX Designer",
  description:
    "Portfolio of Afif Ramadhan — a multidisciplinary full-stack developer and UI/UX designer specializing in WordPress, React, and Framer. Based in Jakarta, Indonesia.",
  keywords: [
    "Full Stack Developer",
    "UI/UX Designer",
    "WordPress",
    "React",
    "Framer",
    "Berlin",
  ],
  authors: [{ name: "Afif Ramadhan" }],
  openGraph: {
    title: "Afif Ramadhan — Full Stack Developer",
    description: "Pixel-perfect interfaces, human-centered experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0d0d0d] font-sans antialiased">
        <Navbar />
        <main className="w-full max-w-[100vw] overflow-x-clip">{children}</main>
      </body>
    </html>
  );
}
