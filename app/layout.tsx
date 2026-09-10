import type { Metadata } from "next";
import { headers } from "next/headers";
import LanguageSwitcher from "./components/LanguageSwitcher";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.marrantbag.com"),
  title: "Marrant | Genuine Leather Bag Manufacturer",
  description: "OEM, ODM and private-label genuine leather bags for global buyers.",
  verification: {
    google: "tvw02ljMXN8USxdYlfMSpeY9isQXJg8rws1ombYxtnk",
  },
  icons: {
    icon: "/assets/brand/marrant-logo.png"
  }
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-marrant-locale") === "zh-CN" ? "zh-CN" : "en";
  const pathname = requestHeaders.get("x-marrant-pathname") ?? "/";
  return (
    <html lang={locale}>
      <body>
        <SiteHeader locale={locale} />
        {children}
        <SiteFooter locale={locale} />
        <LanguageSwitcher pathname={pathname} />
      </body>
    </html>
  );
}
