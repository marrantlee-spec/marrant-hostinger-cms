import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marrant | Genuine Leather Bag Manufacturer",
  description: "OEM, ODM and private-label genuine leather bags for global buyers.",
  icons: {
    icon: "/assets/brand/marrant-logo.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
