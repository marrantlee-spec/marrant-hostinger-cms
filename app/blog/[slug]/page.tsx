import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedBlog } from "../../../lib/cms";
import styles from "./cms-article.module.css";

type Node = { type?: string; text?: string; marks?: { type?: string; attrs?: Record<string, unknown> }[]; attrs?: Record<string, unknown>; content?: Node[] };

function renderNodes(nodes: Node[] = []): React.ReactNode {
  return nodes.map((node, index) => {
    if (node.type === "text") {
      let value: React.ReactNode = node.text ?? "";
      for (const mark of node.marks ?? []) {
        if (mark.type === "bold") value = <strong>{value}</strong>;
        if (mark.type === "italic") value = <em>{value}</em>;
        if (mark.type === "link") {
          const href = typeof mark.attrs?.href === "string" && /^(https?:\/\/|\/)/.test(mark.attrs.href) ? mark.attrs.href : "#";
          value = <a href={href} rel="nofollow noopener">{value}</a>;
        }
      }
      return <span key={index}>{value}</span>;
    }
    const children = renderNodes(node.content);
    if (node.type === "paragraph") return <p key={index}>{children}</p>;
    if (node.type === "heading") { const level = node.attrs?.level === 3 ? 3 : 2; return level === 3 ? <h3 key={index}>{children}</h3> : <h2 key={index}>{children}</h2>; }
    if (node.type === "bulletList") return <ul key={index}>{children}</ul>;
    if (node.type === "orderedList") return <ol key={index}>{children}</ol>;
    if (node.type === "listItem") return <li key={index}>{children}</li>;
    if (node.type === "blockquote") return <blockquote key={index}>{children}</blockquote>;
    if (node.type === "image") { const src = typeof node.attrs?.src === "string" && /^https:\/\//.test(node.attrs.src) ? node.attrs.src : ""; return src ? <img key={index} src={src} alt={typeof node.attrs?.alt === "string" ? node.attrs.alt : ""} /> : null; }
    if (node.type === "table") return <table key={index}><tbody>{children}</tbody></table>;
    if (node.type === "tableRow") return <tr key={index}>{children}</tr>;
    if (node.type === "tableHeader") return <th key={index}>{children}</th>;
    if (node.type === "tableCell") return <td key={index}>{children}</td>;
    return <div key={index}>{children}</div>;
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPublishedBlog((await params).slug);
  if (!post) return {};
  return { title: post.seoTitle || post.title, description: post.seoDescription || post.excerpt, alternates: { canonical: `/blog/${post.slug}` }, openGraph: post.coverImage ? { images: [post.coverImage] } : undefined };
}

export default async function CmsBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPublishedBlog((await params).slug);
  if (!post) notFound();
  const content = post.content as Node;
  return <main className={styles.page}><article className={styles.article}><p className={styles.category}>{post.category.name}</p><h1 className={styles.title}>{post.title}</h1><p className={styles.excerpt}>{post.excerpt}</p><p className={styles.meta}>By {post.author} · {post.publishedAt?.toLocaleDateString() ?? "Published"}</p>{post.coverImage ? <img className={styles.cover} src={post.coverImage} alt={post.title} /> : null}<div className={styles.content}>{renderNodes(content.content)}</div></article></main>;
}
