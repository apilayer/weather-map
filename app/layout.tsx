import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "World Weather Board",
  description: "Built using Weatherstack API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
