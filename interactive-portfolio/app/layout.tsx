import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lucy's Little Library",
  description: "Business × Technology × Creativity",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}