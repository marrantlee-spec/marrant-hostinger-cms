import BlogExperience from "./BlogExperience";
import { getPublishedBlogs } from "../../lib/cms";

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string | string[]; topic?: string | string[] }> }) {
  const [query, posts] = await Promise.all([searchParams, getPublishedBlogs()]);
  const cmsArticles = posts.map((post) => ({
    category: post.category.slug,
    label: post.category.name,
    title: post.title,
    description: post.excerpt,
    publishedAt: (post.publishedAt ?? post.updatedAt).toISOString(),
    date: (post.publishedAt ?? post.updatedAt).toLocaleDateString("en", { month: "short", day: "2-digit", year: "numeric" }),
    duration: "Article",
    image: post.coverImage || "/assets/brand/hero-leather-bags.jpg",
    href: `/blog/${post.slug}`,
  }));
  return <BlogExperience cmsArticles={cmsArticles} page={typeof query.page === "string" ? query.page : "1"} topic={typeof query.topic === "string" ? query.topic : "all"} />;
}
