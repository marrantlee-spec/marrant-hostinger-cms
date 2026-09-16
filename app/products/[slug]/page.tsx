import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedProduct } from "../../../lib/cms";
import { canonicalProductCategoryLabel } from "../../components/product-taxonomy";
import styles from "./cms-product.module.css";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = await getPublishedProduct((await params).slug);
  if (!product) return {};
  return { title: product.seoTitle || product.name, description: product.seoDescription || product.shortDescription, alternates: { canonical: `/products/${product.slug}` }, openGraph: product.mainImage ? { images: [product.mainImage] } : undefined };
}

export default async function CmsProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getPublishedProduct((await params).slug);
  if (!product) notFound();
  const specs = product.specifications && typeof product.specifications === "object" && !Array.isArray(product.specifications) ? Object.entries(product.specifications as Record<string, unknown>) : [];
  const gallery = Array.isArray(product.gallery) ? product.gallery.filter((item): item is string => typeof item === "string") : [];
  return <main className={styles.page}><div className={styles.wrap}><section className={styles.hero}><div className={styles.media}>{product.mainImage ? <img src={product.mainImage} alt={product.name} /> : null}</div><div><p className={styles.category}>{canonicalProductCategoryLabel(product.category.name, "en")}</p><h1 className={styles.title}>{product.name}</h1><p className={styles.short}>{product.shortDescription}</p><p className={styles.description}>{product.description}</p>{specs.length ? <dl className={styles.specs}>{specs.map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{String(value)}</dd></div>)}</dl> : null}</div></section>{gallery.length ? <section className={styles.gallery} aria-label="Product gallery">{gallery.map((url) => <img key={url} src={url} alt={`${product.name} detail`} loading="lazy" />)}</section> : null}</div></main>;
}
