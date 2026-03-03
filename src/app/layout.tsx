import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AppSec Through Time",
  description: "An educational, interactive timeline that teaches the key historical developments in application security",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
