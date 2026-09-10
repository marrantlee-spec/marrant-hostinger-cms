import Image from "next/image";
import Link from "next/link";
import styles from "../how-to-source-crazy-horse-leather-travel-tote-bag/page.module.css";

type ArticleImage = {
  after: string;
  src: string;
  alt: string;
  caption: string;
};

type Block =
  | { type: "paragraph"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; rows: string[][] };

type Section = { heading: string; id: string; blocks: Block[] };

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function inlineMarkup(value: string) {
  const escaped = value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function parseSections(markdown: string): Section[] {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const sections: Section[] = [];
  let section: Section | null = null;
  let paragraph: string[] = [];

  const ensureSection = () => {
    if (!section) {
      section = { heading: "Overview", id: "overview", blocks: [] };
      sections.push(section);
    }
    return section;
  };

  const flushParagraph = () => {
    if (paragraph.length) {
      ensureSection().blocks.push({ type: "paragraph", text: paragraph.join(" ") });
      paragraph = [];
    }
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) {
      flushParagraph();
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      const heading = line.slice(3).trim();
      section = { heading, id: slugify(heading), blocks: [] };
      sections.push(section);
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      ensureSection().blocks.push({ type: "h3", text: line.slice(4).trim() });
      continue;
    }

    if (line.startsWith("|")) {
      flushParagraph();
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        tableLines.push(lines[index].trim());
        index += 1;
      }
      index -= 1;
      const rows = tableLines
        .filter((tableLine) => !/^\|?[\s:|-]+\|?$/.test(tableLine))
        .map((tableLine) => tableLine.split("|").slice(1, -1).map((cell) => cell.trim()));
      ensureSection().blocks.push({ type: "table", rows });
      continue;
    }

    if (/^- /.test(line) || /^\d+\. /.test(line)) {
      flushParagraph();
      const ordered = /^\d+\. /.test(line);
      const items: string[] = [];
      while (index < lines.length) {
        const itemLine = lines[index].trim();
        const match = ordered ? itemLine.match(/^\d+\.\s+(.+)/) : itemLine.match(/^-\s+(.+)/);
        if (!match) break;
        items.push(match[1]);
        index += 1;
      }
      index -= 1;
      ensureSection().blocks.push({ type: ordered ? "ol" : "ul", items });
      continue;
    }

    if (!line.startsWith(">")) paragraph.push(line);
  }

  flushParagraph();
  return sections;
}

function RichText({ text }: { text: string }) {
  return <span dangerouslySetInnerHTML={{ __html: inlineMarkup(text) }} />;
}

export function getArticleSections(markdown: string) {
  return parseSections(markdown).map(({ id, heading }) => ({ id, heading }));
}

export default function LongFormArticle({
  markdown,
  images,
  midCtaAfter,
}: {
  markdown: string;
  images: ArticleImage[];
  midCtaAfter: string;
}) {
  const sections = parseSections(markdown);
  const imageByHeading = new Map(images.map((item) => [item.after, item]));

  return sections.map((item) => {
    const articleImage = imageByHeading.get(item.heading);
    return (
      <section id={item.id} key={item.id}>
        <h2>{item.heading}</h2>
        {item.blocks.map((block, index) => {
          if (block.type === "paragraph") return <p key={index}><RichText text={block.text} /></p>;
          if (block.type === "h3") return <h3 key={index}><RichText text={block.text} /></h3>;
          if (block.type === "table") {
            return (
              <div className={styles.tableWrap} key={index}>
                <table>
                  <thead><tr>{block.rows[0]?.map((cell, cellIndex) => <th key={`${cell}-${cellIndex}`}><RichText text={cell} /></th>)}</tr></thead>
                  <tbody>{block.rows.slice(1).map((row, rowIndex) => <tr key={`${row.join("-")}-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}><RichText text={cell} /></td>)}</tr>)}</tbody>
                </table>
              </div>
            );
          }
          const List = block.type;
          return <List key={index}>{block.items.map((entry) => <li key={entry}><RichText text={entry} /></li>)}</List>;
        })}
        {articleImage ? (
          <figure className={styles.articleFigure}>
            <div><Image src={articleImage.src} alt={articleImage.alt} fill sizes="(max-width: 860px) 100vw, 650px" /></div>
            <figcaption>{articleImage.caption}</figcaption>
          </figure>
        ) : null}
        {item.heading === midCtaAfter ? (
          <aside className={styles.inlineCta} aria-label="Send your leather bag requirements">
            <p>Preparing a supplier comparison?</p>
            <h3>Turn Your Product Idea Into a Clear Factory Brief</h3>
            <span>Share your category, reference images, market, materials and branding direction. We will identify the points to confirm before sampling.</span>
            <Link href="/contact#inquiry">Send Your Requirements</Link>
          </aside>
        ) : null}
      </section>
    );
  });
}
