import { chineseMetadata } from "./metadata";

export const metadata = chineseMetadata();

export default function ChineseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
