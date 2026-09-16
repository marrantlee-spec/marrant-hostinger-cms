import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: { default: "Marrant 箱包管理后台", template: "%s | Marrant 箱包管理后台" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-root min-h-screen">{children}</div>;
}
