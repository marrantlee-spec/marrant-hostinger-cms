"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Article, ChatCircle, FolderSimple, Gear, House, ImageSquare, Package } from "@phosphor-icons/react";

const items = [
  { href: "/admin/dashboard", label: "工作台", icon: House },
  { href: "/admin/products", label: "箱包产品", icon: Package },
  { href: "/admin/categories", label: "分类管理", icon: FolderSimple },
  { href: "/admin/blog", label: "文章管理", icon: Article },
  { href: "/admin/media", label: "图片管理", icon: ImageSquare },
  { href: "/admin/inquiries", label: "询盘管理", icon: ChatCircle },
  { href: "/admin/settings", label: "系统设置", icon: Gear },
] as const;

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="admin-nav mt-8 space-y-1" aria-label="后台导航">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(`${href}/`));
        return (
          <Link key={href} href={href} className={`flex items-center gap-3 rounded-md border-l-[3px] px-3 py-2.5 text-[13px] font-medium transition ${active ? "border-[#c7754d] bg-white/10 text-white" : "border-transparent text-slate-300 hover:bg-white/5 hover:text-white"}`}>
            <Icon size={19} weight="regular" aria-hidden="true" />{label}
          </Link>
        );
      })}
    </nav>
  );
}
