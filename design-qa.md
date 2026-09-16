# Design QA — Marrant 工厂实力中文版 · 方案 2

## Comparison target and evidence

- **Source visual truth path:** `D:\GPT\Marrant独立站9.7\design-reference\factory-page-version-2.png`，971 × 1619 px；按比例归一化到原定 1440 × 2400 构图进行比较。
- **Implementation:** `http://localhost:3000/zh/factory`。
- **Implementation browser evidence:** Codex 内置浏览器在 1440 × 1000 CSS 视口完成桌面捕获，页面高度 2957 px，device scale factor 1；浏览器提供了内联画面但未提供文件系统截图路径。
- **Mobile browser evidence:** 同一内置浏览器通过 390 × 844 iframe 独立视口渲染并捕获中文版手机首屏，确认真实触发 700 px 以下响应式样式。
- **Side-by-side comparison input:** 选定方案与 1440 px 中文实现已在同一个浏览器对照画面中并排检查；重点比较首屏、信任条、工坊拼图、流程、品质、客户、商标与询盘区的顺序和视觉节奏。
- **State:** 中文公开工厂实力页默认状态；询盘表单使用合成测试数据提交并显示成功状态；语言切换与导航链接已检查。

## Findings

- 无可执行的 P0、P1 或 P2 问题。
- [P3] 中文移动端主标题因语义完整性自然换为三行，英文版为两行；字号、对比度与首屏按钮仍保持清晰，不影响所选视觉方向。
- [P3] 中文标题使用系统宋体回退组合，避免 Playfair Display 对汉字的不可控替代；不同 Windows/macOS 设备会有轻微字面差异，但整体编辑感与层级保持一致。

## Required fidelity surfaces

| Surface | Result | Evidence and assessment |
|---|---|---|
| Fonts and typography | Pass | 中文大标题使用宋体回退体系，正文使用微软雅黑/苹方/思源黑体回退；桌面和 390 px 首屏的字重、行距、换行与层级均清晰。 |
| Spacing and layout rhythm | Pass | 完整保留方案 2 的深色纪实首屏、四项信任条、非对称工坊拼图、五步流程、深色品质区、客户证据、商标条与参观/询盘收口；1440 px 无横向溢出。 |
| Colors and visual tokens | Pass | 暖白纸张、深咖、焦糖棕、米色细线与品牌红完全沿用英文实现和选定视觉。 |
| Image quality and asset fidelity | Pass | 继续使用真实 Marrant 标志、车间、产品、客户与团队图片；中文替代文本已补齐，没有占位图或代码绘制的伪素材。 |
| Copy and content | Pass | 文案按中文外贸采购语境重写，完整覆盖开发、材料、过程质检、交付、参观和询盘；没有新增未经证实的产能、人数、面积、MOQ、交期或客户品牌。 |

## Comparison history

1. 中文首版沿用英文结构，完成桌面同屏对照后未发现版式漂移。
2. 补充中文专用宋体展示层级、中文图片替代文本，以及 `/factory` 与 `/zh/factory` 的双向语言切换。
3. 通过 390 × 844 独立 iframe 视口验证真实移动断点；标题、按钮与折叠菜单入口均完整可见。
4. **浏览器标注修正：** 1780 × 986 视口下，参观区内容误用整页宽度计算双侧内边距，导致半宽图片区的中英文标题被严重挤压。现改为栏内固定最大宽度 490 px 并水平居中；修正后中英文标题均为正常两行横排，高度 93.6 px，页面无横向溢出，控制台无警告。

## Interaction, responsive, and accessibility checks

- 中文主导航和页脚“工厂实力/工厂介绍”均指向 `/zh/factory`，语言切换正确返回 `/factory`。
- 两个首屏 CTA 分别指向中文询盘区与参观区；工厂参观按钮进入 `/zh/contact#inquiry`。
- 中文询盘表单可填写、提交、清空，并显示中文成功提示。
- 根文档语言为 `zh-CN`；标题结构、表单标签、必填字段和中文图片替代文本齐全。
- 1440 px 页面无横向溢出；390 × 844 手机视图成功触发移动导航和单列首屏。
- 运行时控制台无 error 或 warning。

## Implementation checklist

- [x] 新增 `/zh/factory` 中文路由与中文 SEO metadata。
- [x] 全页面文案、按钮、表单选项、成功状态与图片替代文本完成本地化。
- [x] 中文导航、页脚和语言切换接入新路由。
- [x] 1440 px 桌面、390 × 844 手机与询盘成功状态完成浏览器检查。
- [x] TypeScript、生产构建与 diff whitespace 检查通过。

## Follow-up polish

- 如后续确定品牌指定中文字体，可将系统宋体回退替换为正式 Web Font，以获得跨平台完全一致的字形。

**final result: passed**

---

# Design QA — Marrant Factory Strength Page · Selected Direction 2

## Comparison target and evidence

- **Source visual truth path:** `D:\GPT\Marrant独立站9.7\design-reference\factory-page-version-2.png`.
- **Source dimensions:** 971 × 1619 px. The generated source is a 0.674× density representation of the requested 1440 × 2400 composition; it was normalized by proportional scaling for layout comparison.
- **Implementation:** `http://localhost:3000/factory`.
- **Implementation browser evidence:** Codex in-app browser capture at a 1440 × 1000 CSS viewport, device scale factor 1, with a 2958 px document height. The browser provider exposed the capture inline but did not expose a filesystem screenshot path.
- **Mobile evidence:** Codex in-app browser captures at 390 × 844 CSS px, device scale factor 1, for the hero, open navigation, form, success state, and footer.
- **Side-by-side comparison input:** the source image and live 1440 px implementation were opened together on a temporary local comparison board in the same in-app browser capture. The source was shown at 971 × 1619 px; the live page was rendered at 1440 CSS px and normalized to 0.55 scale.
- **State:** public English factory page, default desktop state; mobile navigation open; factory inquiry filled with synthetic QA data and submitted to its local success state.

## Findings

- No actionable P0, P1, or P2 issues remain.
- [P3] The implementation is taller than the compact 1440 × 2400 concept proportion. This is intentional: the live form, real navigation, readable body copy, and supplied photography retain usable sizing rather than reproducing the concept's very small display text.
- [P3] The workshop collage substitutes supplied Marrant photography for the concept's generated hand-cutting and leather-roll crops. The layout roles and warm documentary art direction are preserved while keeping the page grounded in real brand assets.
- [P3] The live header retains Home, Blog, and Contact Us from the existing site information architecture. Its surface, spacing, color, and CTA treatment were changed to the selected light-header direction.

## Required fidelity surfaces

| Surface | Result | Evidence and assessment |
|---|---|---|
| Fonts and typography | Pass | Playfair Display carries the editorial display hierarchy and Manrope carries compact procurement copy. Headline scale, serif/sans contrast, line height, and readable form labels were checked at desktop and mobile. |
| Spacing and layout rhythm | Pass | The page preserves the selected order and alternating rhythm: light header, dark documentary hero, four-part trust strip, asymmetric workshop collage, five-step process, dark quality band, partner evidence, trademark strip, visit/form conversion block, and dark footer. No horizontal overflow at 1440 or 390 px. |
| Colors and visual tokens | Pass | Warm paper, espresso, cognac, muted brass, fine beige rules, and Marrant red match the selected direction and the existing brand system. Text and controls remain legible in all inspected states. |
| Image quality and asset fidelity | Pass | The exact Marrant logo, supplied real customer photographs, and existing high-resolution workshop, leather, and product imagery are used. Images use deliberate crops and responsive `next/image`; no placeholders, CSS drawings, handcrafted SVGs, or fabricated client logos appear. |
| Copy and content | Pass | Copy is written for international importers, distributors, e-commerce brands, and wholesale buyers. It avoids invented production capacity, employee count, factory size, MOQ, lead time, certifications, client brands, or audit claims. UK and US Class 18 trademark language matches the supplied certificates. |

## Comparison history

1. **Initial desktop capture:** the factory route rendered correctly, but the global floating navigation treatment drifted from the selected simple light header and the form heading inherited white text on a light surface. The full-page browser compositor also repeated tiles even though DOM checks confirmed exactly one `#process`, one `#visit`, and one `#factory-inquiry`.
2. **Fixes:** added a factory-specific simple header treatment, corrected the form heading color, compacted desktop section proportions, and switched visual review to normal viewport and focused section captures so compositor stitching artifacts were not treated as product defects.
3. **Initial mobile capture:** the factory header's desktop transparency overrode the mobile menu background, producing weak contrast.
4. **Fix:** added a factory-specific ivory mobile navigation surface, dark menu text, dividers, shadow, and a high-contrast quote CTA. Post-fix capture showed a readable open menu with no horizontal overflow.
5. **Framework/performance pass:** replaced the hero's preload behavior with `loading="eager"` and `fetchPriority="high"`, and declared the existing smooth-scroll behavior on the root element per Next.js 16 guidance.
6. **Browser annotation fix:** at 1780 × 986, the visit copy inherited viewport-based side padding inside a half-width grid column, collapsing both English and Chinese headings. Replaced it with a centered 490 px column-relative content width. Post-fix focused captures show both headings in the intended two-line horizontal layout with no overflow or console warnings.

## Interaction, responsive, and accessibility checks

- Desktop primary and secondary hero anchors reach the inquiry and visit sections.
- The inquiry accepts synthetic test values, clears after submission, and displays its local success message.
- Mobile navigation opens and closes, route links remain usable, and the page has zero horizontal overflow at 390 px.
- Semantic headings, form labels, required fields, image alternative text, keyboard-visible focus states, and a polite status message are present.
- Focused region captures covered the desktop hero, workshop collage, process, quality band, partnership evidence, visit/form block, submitted form state, mobile hero, open mobile menu, mobile form, and footer. These focused views were required because the in-app browser's full-page compositor introduced non-DOM tile repetition.

## Implementation checklist

- [x] Selected direction resolved to the second displayed ideation image.
- [x] Responsive `/factory` route implemented with supplied brand photography.
- [x] Shared English navigation and footer link to the new factory route.
- [x] Core anchors, mobile menu, and local inquiry success state tested.
- [x] TypeScript check and production build passed.
- [x] P0/P1/P2 visual findings fixed and rechecked.

## Follow-up polish

- A future photography pass could add a real close-up cutting shot to match the selected collage more literally without relying on generated imagery.

**final result: passed**

---

# Design QA — Marrant Product Catalogue Template 2

## Comparison target and evidence

- **Source visual truth:** `C:\Users\10455\.codex\generated_images\01a07be4-0908-7a11-8359-7f97482c9031\exec-1d38e57d-2bb5-411b-8ff9-8704454312b4.png` — 864 × 1821 px; this is the buyer-catalogue concept selected by the user.
- **Implementation:** `http://localhost:3200/products`.
- **Screenshot evidence:** desktop `C:\Users\10455\.codex\visualizations\2026\09\07\01a07be4-0908-7a11-8359-7f97482c9031\catalogue-desktop.png` at 1440 × 1024 CSS px; mobile `C:\Users\10455\.codex\visualizations\2026\09\07\01a07be4-0908-7a11-8359-7f97482c9031\catalogue-mobile.png` at 390 × 844 CSS px.
- **Comparison method:** the selected concept and desktop capture were reviewed together at a matching wide-desktop state. The assessment covers the slim header, split hero, category rail, three-column catalogue, paired project-inquiry block, and dark OEM/ODM support band. The mobile state was checked separately with the navigation open.

## Required fidelity surfaces

| Surface | Result | Evidence and assessment |
| --- | --- | --- |
| Typography and hierarchy | Pass | Editorial serif display titles, compact uppercase labels, and restrained sans-serif controls preserve the selected buyer-catalogue hierarchy. The hero headline, catalogue heading, form title, and support heading retain the source’s relative scale and line treatment. |
| Layout and spacing | Pass | The implementation follows the selected composition: thin sticky header; left copy/right product hero; left category rail with a three-column product collection; then a split requirements/form section and dark four-part support strip. Mobile stacks the same decision path without horizontal overflow. |
| Colour and materials | Pass | Warm paper background, fine beige dividers, cognac action colour, dark chocolate support block, and purposeful product imagery reflect the source direction and Marrant’s existing leather-goods brand system. |
| Image and asset quality | Pass | Six supplied product photos were refined into consistent warm-studio catalogue assets. The existing Marrant logo is reused for the header and favicon. No placeholder or improvised visual assets are present. |
| Interaction and conversion path | Pass | Collection filters and search update the product grid; a card transfers the selected product into the inquiry form; the client-side form validates and confirms submission; mobile navigation opens and closes cleanly. |

## Findings and final checks

- No actionable P0, P1, or P2 visual-fidelity findings remain.
- [P3] The header uses the supplied Marrant logo rather than the abstract wordmark visible in the generated concept. This preserves the live brand identity without changing the selected layout.
- Production build passed with `/products` statically generated.
- Production-browser checks passed: six initial product cards; a category filter and a wallet search each return one card; card-to-form selection works; inquiry success state appears; mobile menu works; console and failed-network-response checks both report zero issues.

final result: passed

---

# Design QA — Marrant About Us Template V2

## Comparison target and evidence

- **Source visual truth:** `C:\Users\10455\.codex\generated_images\01a07c43-17a9-73c2-9ee2-839f02220934\exec-5f9874c2-57d4-4097-baaf-e44410375f70.png` — 799 × 1968 px, the user-selected second About Us concept.
- **Implementation:** `http://127.0.0.1:3201/about`.
- **Implementation screenshot evidence:** in-app Browser rendered captures. Desktop: 1440 × 1024 CSS px, 1425 × 969 px viewport JPEG capture. The browser returns captures inline and does not expose a writable screenshot path; the target visual and matching rendered capture were reviewed together during this QA pass.
- **Density normalization:** the reference is a 799 px-wide long-form concept while the implementation was reviewed at the selected desktop 1440 px CSS viewport. Assessment used equivalent regions and order: header/hero, trust-pillar row, production collage, process, quality/people band, factory-visit form and footer.
- **State:** desktop default; mobile navigation open at 390 × 844 CSS px; local factory-visit form filled with synthetic QA data and submitted successfully.

## Required fidelity surfaces

| Surface | Result | Evidence and assessment |
| --- | --- | --- |
| Fonts and typography | Pass | Playfair Display creates the high-contrast editorial display treatment and Manrope preserves compact B2B labels, controls and body copy. The hero, process title, quality band and conversion titles retain the reference hierarchy. |
| Spacing and layout rhythm | Pass | The rendered desktop keeps the source's slim header; 43/57 hero split; four-column expectation band; asymmetric production collage; five-step process; three-part dark quality band; and three-column visit conversion panel. Mobile intentionally reflows into clear single-column sections with no persistent controls clipped. |
| Colors and visual tokens | Pass | Warm paper white, thin beige rules, cognac buttons and a near-black quality/footer field are aligned to the selected reference and the existing Marrant visual system. |
| Image quality and asset fidelity | Pass | The supplied Marrant logo, factory-client visit, workshop, leather-detail, product and founder photography are used directly. Phosphor is used for functional line icons; no placeholder image, CSS art or improvised asset substitutes appear. |
| Copy and content | Pass | Copy reflects the supplied OEM/ODM leather-bag proposition without inventing certifications, client logos, awards, dates or production metrics. All primary conversion content is present. |

## Findings and comparison history

### Iteration 1 — resolved

- [P1] Interactive controls did not hydrate in the in-app Browser when the development server was opened through `127.0.0.1`; Next.js blocked dev-only cross-origin resources.
  - Location: local development preview only.
  - Evidence: the browser reached the page but the mobile navigation state and local form handler did not update; the Next development log reported blocked dev-resource requests.
  - Fix: verified the finished build through an independent production preview at port 3201.
  - Post-fix evidence: mobile navigation opens at 390 × 844 CSS px, and the factory-visit form prevents native navigation and displays its confirmation state after submission.

### Current findings

- No actionable P0, P1 or P2 findings remain.
- [P3] The source concept includes several generated close-up workshop crops. The implementation replaces these with the supplied Marrant workshop and leather images while retaining their respective layout roles and crop intent.

## Interaction and implementation checklist

- [x] `/about` is statically generated and linked from the Home, Products, Blog, Contact and product-detail navigation.
- [x] Primary CTAs reach the factory-visit anchor or the existing contact inquiry route.
- [x] The mobile navigation opens and exposes all primary destinations at 390 × 844 CSS px.
- [x] The factory-visit form accepts input and shows its local success state after a synthetic QA submission.
- [x] Production-preview browser console checked: 0 errors and 0 warnings.
- [x] `npm run build` passed, including the static `/about` route.

final result: passed

---

# Design QA — Marrant Product Detail Template V1

## Comparison target and evidence

- **Source visual truth:** `design-reference/product-page-version-1.png` — 864 × 1821 px.
- **Implementation:** `http://127.0.0.1:3000/products/crazy-horse-leather-travel-tote-bag`
- **Implementation screenshot evidence:** in-app Browser rendered captures of the route at 1440 × 1024 CSS px, device-pixel-ratio 1. The Browser exposes captures inline as image bytes and does not provide a writable screenshot path.
- **Density normalization:** the source was reviewed at its native 864 × 1821 raster size; the implementation was reviewed at the matching desktop layout state in the 1440 px CSS target viewport. No browser chrome or device frame was included in the comparison judgment.
- **State:** default product image, desktop header visible, FAQ collapsed, inquiry form empty. Focused middle and lower-page captures checked the specifications/customization and FAQ/inquiry/footer regions. A separate mobile check used 390 × 844 CSS px.

The source image and the implementation captures were opened during the same QA pass as a visual pair. The in-app browser security policy rejected a temporary composite comparison tab, so no persistent side-by-side image file was created.

## Required fidelity surfaces

| Surface | Result | Evidence and assessment |
| --- | --- | --- |
| Fonts and typography | Pass | Serif display titles, all-caps compact section labels, and restrained sans-serif interface text preserve the source’s editorial procurement-page hierarchy. Heading line breaks and small-label spacing were checked in the hero, spec table, option cards, and inquiry area. |
| Spacing and layout rhythm | Pass | Desktop review confirms the narrow thumbnail rail, large product stage, right-hand buying CTA, seven-column fact strip, paired specifications, three-column customization band, split FAQ/catalogue region, and two-column inquiry/footer sequence. |
| Colors and visual tokens | Pass | Warm off-white paper, hairline grey-beige dividers, cognac CTA treatment, and subdued brown text match the visual direction. The footer was corrected to warm white after the initial review found inherited black styling. |
| Image quality and asset fidelity | Pass | The supplied Marrant logo is used directly. The main bag and leather-detail images are purpose-made bitmap assets with appropriate studio and macro crops; product thumbnails use real product/lifestyle imagery. No CSS art, placeholders, or hand-drawn SVG substitutes are used for visual assets. |
| Copy and content | Pass | Product details align with the business information provided. Values not supplied in the source workbook are explicitly presented as “To be confirmed” rather than invented. |
| Icons and affordances | Pass | The same thin-line icon family is used consistently for WhatsApp, process, packaging, customization, FAQ, and form affordances. |
| Responsiveness and accessibility | Pass | Mobile navigation opens cleanly at 390 px wide. Images have meaningful alt text, controls are semantic buttons/links, FAQ controls expose expanded state, and form controls have labels. |

## Findings and comparison history

### Iteration 1 — resolved

- [P2] Specification pairing did not follow the reference’s row-by-row left/right comparison layout.
  - Location: product specifications grid.
  - Evidence: first rendered capture interleaved product facts across rows, while the source pairs style/dimensions, material/handle drop, lining/strap, and so on.
  - Fix: replaced the flat list with explicit left/right property pairs, including the intentionally blank final left cell.
  - Post-fix evidence: 1440 × 1024 middle-page browser capture shows the matching paired table sequence.

- [P2] Product footer inherited the homepage’s dark footer background.
  - Location: `.product-footer`.
  - Evidence: initial lower-page capture rendered a black footer, while the source uses the same warm paper surface as the page.
  - Fix: set the scoped product footer background to the product-paper token.
  - Post-fix evidence: final lower-page browser capture shows a warm-white footer with fine top divider, matching the reference direction.

### Current findings

- No actionable P0, P1, or P2 findings remain.
- [P3] The supplied red Marrant logo differs from the brown wordmark shown in the visual reference. The supplied logo is retained deliberately to keep brand identity accurate.
- [P3] The reference mock uses generic package renderings and a catalogue cover; the implementation keeps the same information hierarchy while using the available product/lifestyle assets and line icons.

## Interaction and implementation checklist

- [x] Gallery thumbnail selection updates the main product image.
- [x] FAQ opens and reports `aria-expanded="true"`.
- [x] Inquiry form validates required fields and shows its front-end success state without transmitting the test data.
- [x] Mobile menu opens at 390 × 844 CSS px.
- [x] Navigation, CTA anchors, WhatsApp, and email links are present.
- [x] Browser console checked after final visual corrections: 0 errors.
- [x] Final production build passed and includes `/products/crazy-horse-leather-travel-tote-bag` as a static route.

final result: passed

---

# Design QA — Marrant Journal Index

## Comparison target and evidence

- **Source visual truth:** `C:\Users\10455\.codex\generated_images\01a07be4-eb8b-7730-9a94-4d5abbbdf662\exec-b43d9d3c-4c3e-40c2-8504-c18c1796d822.png` — 916 × 1717 px, the first selected Journal concept.
- **Implementation:** `http://localhost:3000/blog`.
- **Implementation screenshot evidence:** in-app Browser rendered captures. Desktop: 1440 × 1024 CSS px, 1425 × 2917 px full-page JPEG capture. Mobile: 390 × 844 CSS px, 375 × 812 px viewport JPEG capture. Browser captures are supplied inline by the browser and do not expose a writable screenshot path.
- **Density normalization:** comparison used the source at its native 916 px wide layout and the implementation at the desktop 1440 px CSS target. The assessment compares matching content regions—not browser chrome or raster density—including the masthead, two-column feature, topic strip, first article row and final dark conversion band.
- **State:** desktop default / all six articles; topic-filtered Materials state; mobile navigation open and closed. The source visual and final browser capture were reviewed together as the visual reference pair during this QA pass.

## Required fidelity surfaces

| Surface | Result | Evidence and assessment |
| --- | --- | --- |
| Fonts and typography | Pass | Playfair Display provides the same editorial display hierarchy as the source; Manrope keeps labels, dates and controls compact. The masthead, feature heading, article cards and conversion band were checked after the desktop title-wrap fix. |
| Spacing and layout rhythm | Pass | The page follows the selected composition: centered masthead, image/copy feature pair, four-part topic strip, three-column article collection and dark end CTA. Wide desktop gutters and single-column mobile stacking are intentional. |
| Colors and visual tokens | Pass | Warm paper, near-black navigation and CTA field, fine beige dividers, and cognac accents align with both the chosen concept and the existing Marrant visual system. |
| Image quality and asset fidelity | Pass | The supplied Marrant logo and actual product, leather-detail and workshop images are used directly. Every visible image has a meaningful alt text; no placeholders, CSS drawings or improvised icons are used. |
| Copy and content | Pass | Article topics and conversion copy are aligned to Marrant’s OEM/ODM leather-bag sourcing offer. Visible dates use the Sep 07, 2026 design anchor and are chronologically plausible. |

## Findings and comparison history

### Iteration 1 — resolved

- [P2] Desktop masthead title inherited the homepage `h1` maximum width and wrapped into two lines.
  - Location: `/blog`, `.masthead h1`.
  - Evidence: first 1440 px browser capture split “The Marrant Journal,” while the selected source uses a single-line masthead.
  - Fix: scoped `max-width: none` to the Journal masthead heading.
  - Post-fix evidence: final 1440 × 1024 capture keeps the masthead in one line and preserves the intended focal hierarchy.

### Current findings

- No actionable P0, P1 or P2 findings remain.
- [P3] The implementation uses actual Marrant product photography rather than generating the workshop scenes shown in the concept. This is deliberate: it keeps the page tied to the brand’s real product library while preserving the source composition and palette.

## Interaction and implementation checklist

- [x] Topic filters update the article collection: selecting Materials reduces the visible article count to one; View All Articles restores all six.
- [x] The mobile menu exposes its links and switches correctly between open and closed states at 390 × 844 CSS px.
- [x] Header navigation, feature-guide route and Request a Quote CTAs expose valid local routes.
- [x] Desktop and mobile browser captures reviewed; no clipping or horizontal overflow found (`scrollWidth` 1425 px within the rendered desktop capture).
- [x] Browser console checked after the final reload: 0 errors.
- [x] `npm run build` passed, including the static `/blog` route.

final result: passed
