---
name: agentcat-brand-visual
description: Apply the AgentCat brand visual system consistently to HTML, miniapp UI, Word, PDF, Excel, PowerPoint, reports, and business documents. Use when creating, reviewing, or polishing branded artifacts, especially when copy, typography, page furniture, watermarking, or document readability matters.
---

# AgentCat brand visual

Use this skill for brand-consistent visual work across web pages, miniapp screens, Word/PDF documents, spreadsheets, presentations, and status reports.

## Non-negotiable brand rules

- Use the original Logo from `assets/代理猫图.png` or, inside this repository, `apps/miniapp/assets/代理猫图.png`. Never redraw, stretch, or approximate the Logo.
- Use AgentCat orange `#FF5001` for primary actions, short rules, progress, and stamps. Use deep orange `#D94100` sparingly for hover or strong emphasis.
- Use warm white `#FCFBF8` or white for the main background, pale peach `#FFF0E8` for restrained grouping, warm gray `#E8E2DC` for borders, and deep ink blue `#162033` for headings and body text.
- Use the fixed brand slogan exactly: `代理记账认准代理猫`. Never replace the fixed `认准` wording with `认证` or another near-synonym.
- Use product language precisely: `服务单` / `服务确认单`, `公司主体`, `税号`, `确认快照`, and `证据链`. Do not call the P0 service confirmation flow a contract.
- Do not add customer-side `申请合同`, `申请开票`, or `下载/分享确认 PDF` entrances in P0 materials.
- Do not invent company counts, years, satisfaction rates, phone numbers, prices, or other business facts.

## Choose the visual route

Use the default combination: B structure plus A editorial detail.

- **A · 温暖编辑感・证据流**: warm editorial typography, large restrained headlines, thin orange rules, paper/document details, and an evidence timeline. Use for reports, brand pages, and story-led content.
- **B · 静谧单据工作室**: warm white, pale peach, precise document frames, stamps, folders, and calm shadows. Use for service confirmation flows, forms, Word documents, and formal business materials.

Do not use later experimental routes or dashboard-like visual language unless the user explicitly asks for them.

## Typography and layout

- Prefer `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif` for UI/body text.
- Use `"Noto Serif SC", "Songti SC", "STSong", serif` only for selected editorial titles.
- Build hierarchy with type scale, line height, whitespace, alignment, and short rules before adding cards, shadows, or decoration.
- For replaceable Chinese headlines, split by meaning into semantic lines. Desktop headline lines may use `white-space: nowrap`; mobile layouts must use `text-wrap: balance`, `line-break: strict`, and `overflow-wrap: break-word`.
- Keep headline containers bounded and check at both 1440px desktop and 390px mobile widths. Never leave a lone character or punctuation mark on a line.

## Medium-specific rules

### HTML and miniapp UI

- Keep content containers around 1120–1200px on desktop, with a single primary CTA and generous whitespace.
- Use documents, stamps, evidence timelines, and a low-contrast cat watermark as brand assets; do not turn the page into a backend dashboard.
- Keep information-bearing timeline text in Grid/Flex columns or rows. Use absolute positioning only for decorative paper edges, texture, or cat shadows.
- Keep the cat watermark monochrome and subtle, normally 4%–10% opacity, never a cartoon character.
- Check 1440px and 390px layouts for overflow, clipping, button visibility, and Chinese wrapping.

### Word and PDF

- Treat Word as a reading document, contract, memo, or report—not as an Excel-like dashboard.
- Use black/deep-gray body text, comfortable line spacing, clear paragraph rhythm, and restrained deep-blue headings. Use orange only for short rules, kickers, or small emphasis.
- Use the original Logo in the header or footer at its natural aspect ratio. Page numbers, document title, date, and the fixed slogan may appear in page furniture; keep any watermark very faint so it cannot compete with body text.
- Use real Word heading styles and real numbering. Allow Word to reflow and paginate naturally; use explicit page breaks only for intentional section starts, signature pages, or appendices.
- For contract-like documents, set keep-with-next for headings, keep-together for clause blocks, automatic clause numbering, automatic page numbers, repeating headers/footers, and fixed page breaks only where the document semantics require them.
- Render every DOCX and inspect all page images before delivery. Check Chinese fonts, Logo proportions, margins, page breaks, footer consistency, and black-and-white readability.

### Excel

- Keep data areas filterable, copyable, sortable, and white/warm-white. Use pale peach or light orange for headers; do not use heavy black fills.
- Use deep ink-blue header text, restrained orange for titles/totals/highlights, and low-saturation semantic status colors with text labels.
- Set column widths, row heights, wrapping, freeze panes, print area, and page setup deliberately. Inspect every sheet and print preview.

### PowerPoint

- Use one clear composition per slide, warm white space, the original Logo, and restrained orange rules.
- Avoid dense dashboard grids, tiny text, and title wrapping. Inspect every rendered slide for clipping, overlap, and unreadable Chinese.

## Required review before delivery

1. Check that every Logo is the original asset and has not been stretched.
2. Run `python scripts/validate_brand_text.py <paths...>` from this skill directory or the repository root to catch fixed-copy violations.
3. Search generated and source files for the fixed slogan with `认证` substituted for `认准`.
4. Verify important display copy: `代理记账认准代理猫`; `让每一份服务确认，都清楚可查。`; `服务单`; `确认快照`; `证据链`.
5. Verify P0 boundaries: no customer-side contract, invoice, or confirmation-PDF download/share entrance.
6. Render and inspect Word, Excel, PowerPoint, and HTML outputs using the relevant artifact workflow before publishing.

The detailed token map and evidence timeline rules are in [references/brand-system.md](references/brand-system.md).
