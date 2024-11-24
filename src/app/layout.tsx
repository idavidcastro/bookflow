import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { monserrat, robotoflex, spectral } from "@/fonts";

export const metadata: Metadata = {
  title: "BookFlow",
  description: "The best app to manage your books",
  keywords: "libros, gestionar, biblioteca, prestamo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monserrat.variable} ${spectral.variable} ${robotoflex.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
