import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "dist", "client");
const origin = "http://localhost:3201";

const passthroughAssets = [
  "assets/brand/marrant-icon.png",
  "assets/brand/marrant-logo.png",
];

const optimizedImages = [
  ["assets/brand/hero-leather-bags.jpg", 1200],
  ["assets/factory/marrant-office-client-visit.jpg", 1920],
  ["assets/factory/marrant-trade-show-client-visit.jfif", 1920],
  ["assets/product-detail/crazy-horse-leather-detail.png", 1920],
  ["assets/product-detail/factory-client-visit-v1.png", 1920],
  ["assets/product-detail/leather-production-workshop-v1.png", 1920],
  ["assets/products/crazy-horse-duffle-scene-v1.png", 1200],
];

const staticRuntime = String.raw`<script>
document.addEventListener("DOMContentLoaded",function(){
  var menu=document.getElementById("site-navigation");
  var toggle=document.querySelector(".menu-button");
  if(toggle&&menu){toggle.addEventListener("click",function(){var open=menu.classList.toggle("is-open");toggle.setAttribute("aria-expanded",String(open));});}
  document.querySelectorAll(".nav-trigger").forEach(function(button,index){button.addEventListener("click",function(){location.href=index===0?"/products":"/#oem";});});
  var form=document.getElementById("factory-inquiry");
  if(form){form.addEventListener("submit",function(event){event.preventDefault();form.reset();var old=form.querySelector("[data-static-success]");if(old)old.remove();var message=document.createElement("p");message.dataset.staticSuccess="true";message.setAttribute("role","status");message.style.cssText="margin-top:12px;color:#6f3a20;font-size:12px;font-weight:700";message.textContent=document.documentElement.lang==="zh-CN"?"感谢您的咨询，我们的团队将尽快与您联系。":"Thank you. Our team will contact you shortly.";form.appendChild(message);});}
});
</script>`;

function decodeImageOptimizerUrls(html) {
  return html.replace(/\/_next\/image\?url=([^&\s\"]+)&amp;w=\d+&amp;q=\d+/g, (_, encoded) => decodeURIComponent(encoded));
}

function staticize(html) {
  let outputHtml = decodeImageOptimizerUrls(html);
  for (const [asset] of optimizedImages) {
    outputHtml = outputHtml.replaceAll(`/${asset}`, `/${asset.replace(/\.[^.]+$/, ".webp")}`);
  }
  return outputHtml
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*\bas="script"[^>]*>/gi, "")
    .replace("</body>", `${staticRuntime}</body>`);
}

async function exportRoute(route, destination) {
  const response = await fetch(`${origin}${route}`);
  if (!response.ok) throw new Error(`Failed to export ${route}: ${response.status}`);
  const html = staticize(await response.text());
  const directory = path.join(output, destination);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html);
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(root, ".next", "static"), path.join(output, "_next", "static"), { recursive: true });

for (const asset of passthroughAssets) {
  const destination = path.join(output, asset);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(path.join(root, "public", asset), destination);
}

for (const [asset, width] of optimizedImages) {
  const destination = path.join(output, asset.replace(/\.[^.]+$/, ".webp"));
  const optimizerUrl = `${origin}/_next/image?url=${encodeURIComponent(`/${asset}`)}&w=${width}&q=75`;
  const response = await fetch(optimizerUrl);
  if (!response.ok) throw new Error(`Failed to optimize ${asset}: ${response.status}`);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
}

await exportRoute("/factory", "factory");
await exportRoute("/zh/factory", path.join("zh", "factory"));

const rootPage = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=/factory"><title>Marrant Leather Bag Factory</title></head><body><a href="/factory">Open Marrant Factory</a></body></html>`;
await writeFile(path.join(output, "index.html"), rootPage);
await writeFile(path.join(output, "404.html"), rootPage);

const manifest = JSON.parse(await readFile(path.join(root, ".openai", "hosting.json"), "utf8"));
await mkdir(path.join(root, "dist", ".openai"), { recursive: true });
await writeFile(path.join(root, "dist", ".openai", "hosting.json"), `${JSON.stringify(manifest, null, 2)}\n`);

console.log("Exported bilingual factory pages for Sites.");
