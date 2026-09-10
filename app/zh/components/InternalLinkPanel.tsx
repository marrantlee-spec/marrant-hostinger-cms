import Link from "next/link";
import styles from "../../components/InternalLinkPanel.module.css";

export type InternalLink = {
  href: string;
  label: string;
  description: string;
};

type InternalLinkPanelProps = {
  eyebrow?: string;
  title: string;
  description: string;
  links: InternalLink[];
  tone?: "light" | "dark";
};

export default function InternalLinkPanel({
  eyebrow = "继续了解",
  title,
  description,
  links,
  tone = "light",
}: InternalLinkPanelProps) {
  return (
    <section className={`${styles.panel} ${tone === "dark" ? styles.dark : ""}`} aria-labelledby="internal-links-title">
      <div className={styles.intro}>
        <p>{eyebrow}</p>
        <h2 id="internal-links-title">{title}</h2>
        <span>{description}</span>
      </div>
      <nav aria-label={`${title}相关页面`}>
        <ul className={styles.links}>
          {links.map(({ href, label, description }) => (
            <li key={href}>
              <Link href={href}>
                <strong>{label}<span aria-hidden="true">→</span></strong>
                <small>{description}</small>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
