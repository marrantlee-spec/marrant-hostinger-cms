import BlogExperience from "./BlogExperience";
import { chineseMetadata } from "../metadata";
export const metadata = chineseMetadata("/blog");
export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string | string[]; topic?: string | string[] }> }) {
  const query = await searchParams;
  return <BlogExperience page={typeof query.page === "string" ? query.page : "1"} topic={typeof query.topic === "string" ? query.topic : "all"} />;
}
