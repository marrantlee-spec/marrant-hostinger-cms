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
