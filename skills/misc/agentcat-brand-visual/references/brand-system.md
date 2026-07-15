# AgentCat brand system reference

## Tokens

| Role | Token |
|---|---|
| AgentCat orange | `#FF5001` |
| Deep orange | `#D94100` |
| Ink blue | `#162033` |
| Secondary ink | `#25324A` |
| Warm white | `#FCFBF8` |
| Pale peach | `#FFF0E8` |
| Near peach | `#FFF8F4` |
| Warm border | `#E8E2DC` |
| Muted gray | `#8A8F98` |
| Success | `#2EAD71` |
| Warning | `#E8A047` |
| Error | `#C9514A` |

Keep body text at WCAG AA contrast where possible. Use orange text on white or ink text on pale peach for small text; reserve orange-on-white for large buttons or large display type.

## Type and rhythm

- UI: `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif`
- Editorial title: `"Noto Serif SC", "Songti SC", "STSong", serif`
- HTML headline: 40–64px, line-height 1.15–1.25
- HTML body: 14–16px, line-height 1.6–1.8
- Word title / section / subsection: approximately 22pt / 16pt / 13pt
- Excel title / header: approximately 16–20pt / 10–11pt

Use spacing units from `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96`. Favor whitespace and alignment over decoration.

## Evidence timeline

Use the A editorial route for `EvidenceTimeline`:

- Desktop: date/version index on the left, a 1px orange rule in the middle, and event/evidence text in its own right column.
- Each node shows time, event, evidence object, and a written status; do not rely on color alone.
- Use 6–8px orange dots or short marks. Avoid thick connectors, large badges, neon effects, and text placed over documents.
- Keep historic confirmations immutable. New changes create a new event or supplementary confirmation; the timeline must not imply that a snapshot was overwritten.

In Excel, use columns such as date, event, evidence object, status, and version. In Word/PDF, use a date index with event paragraphs and keep each heading with its evidence object when paginating.

## Content boundaries

The P0 product is a customer service-order confirmation system. Use `服务单` or `服务确认单`, not `合同`, for the main flow. Contracts, payment, invoicing, and accounting-book capabilities may be described as boundaries or future/internal extensions, but do not become customer-side P0 entrances.

The brand slogan is always `代理记账认准代理猫`.
