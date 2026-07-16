#!/usr/bin/env python3
import base64
import html
import sys
from pathlib import Path

from validate_input import load_and_validate


def esc(value):
    return html.escape(str(value))


def main():
    if len(sys.argv) < 3:
        raise SystemExit("用法：generate_html.py <content.json> <output.html> [skill-root]")
    data_path = Path(sys.argv[1]).resolve()
    output_path = Path(sys.argv[2]).resolve()
    skill_root = Path(sys.argv[3]).resolve() if len(sys.argv) > 3 else Path(__file__).resolve().parents[1]
    data = load_and_validate(data_path)
    meta = data["meta"]
    logo_path = skill_root / "assets/brand/agentcat-logo.png"
    logo = base64.b64encode(logo_path.read_bytes()).decode("ascii")

    highlights = "".join(
        f'<p class="highlight"><strong>{esc(item.get("title", "重点"))}：</strong>{esc(item.get("detail", ""))}</p>'
        for item in data.get("highlights", [])
    )
    sections = "".join(
        f'<section><h2>{esc(item.get("heading", ""))}</h2>'
        + "".join(f'<p>{esc(text)}</p>' for text in item.get("paragraphs", []))
        + ("<ul>" + "".join(f'<li>{esc(text)}</li>' for text in item.get("bullets", [])) + "</ul>" if item.get("bullets") else "")
        + "</section>"
        for item in data.get("sections", [])
    )
    actions = "".join(
        f'<li><strong>{esc(item.get("id", ""))} {esc(item.get("title", ""))}</strong>'
        f'<p>{esc(item.get("detail", ""))}</p><small>责任：{esc(item.get("owner", ""))}</small></li>'
        for item in data.get("actions", [])
    )

    document = f'''<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(meta['title'])}</title>
<style>
:root{{--orange:#FF5001;--navy:#162033;--ink:#20242C;--muted:#666D78;--paper:#FCFBF8;--line:#E8E2DC}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--paper);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif}}
.page{{max-width:920px;margin:auto;padding:48px 64px 80px;background:#fff;min-height:100vh}}header{{border-bottom:1px solid var(--line);padding-bottom:28px;margin-bottom:34px}}
.brand{{display:flex;align-items:center;justify-content:space-between;color:var(--muted);font-size:12px}}.brand img{{width:122px;height:auto}}
.eyebrow{{margin-top:38px;color:var(--orange);font-size:12px;font-weight:700;letter-spacing:.08em}}h1{{margin:12px 0 10px;color:var(--navy);font-size:42px;line-height:1.2}}.subtitle{{color:var(--muted);font-size:17px;line-height:1.7}}
.meta{{margin-top:18px;color:var(--muted);font-size:12px}}main>p,section p{{font-size:16px;line-height:1.9;text-align:justify}}h2{{margin:42px 0 14px;color:var(--navy);font-size:24px;border-top:2px solid var(--orange);padding-top:12px}}
.highlight{{margin:10px 0;padding-left:14px;border-left:2px solid var(--orange)}}ul,ol{{padding-left:24px}}li{{margin:10px 0;line-height:1.75}}.actions li{{padding:12px 0;border-bottom:1px solid var(--line)}}.actions p{{margin:6px 0}}small{{color:var(--muted)}}footer{{margin-top:54px;padding-top:18px;border-top:1px solid var(--line);color:var(--muted);font-size:12px}}
@media(max-width:640px){{.page{{padding:28px 22px 56px}}h1{{font-size:34px}}.brand{{align-items:flex-start;gap:16px}}}}
@media print{{@page{{size:A4;margin:18mm}}body{{background:#fff}}.page{{max-width:none;padding:0}}h2{{break-after:avoid}}section,.actions li{{break-inside:avoid}}}}
</style></head><body><article class="page"><header><div class="brand"><img src="data:image/png;base64,{logo}" alt="代理猫 Logo"><span>{esc(meta['document_type'])}</span></div>
<div class="eyebrow">AGENTCAT · {esc(meta['date'])}</div><h1>{esc(meta['title'])}</h1><div class="subtitle">{esc(meta['subtitle'])}</div><div class="meta">适用对象：{esc(meta['audience'])}</div></header>
<main><h2>概览</h2><p>{esc(data.get('overview',''))}</p>{highlights}{sections}
<section class="actions"><h2>后续行动</h2><ol>{actions}</ol></section></main><footer>{esc(data.get('footer_note','代理记账认准代理猫'))}</footer></article></body></html>'''
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(document, encoding="utf-8")
    print(output_path)


if __name__ == "__main__":
    main()
