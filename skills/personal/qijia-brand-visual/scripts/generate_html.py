#!/usr/bin/env python3
import base64
import html
import json
import sys
from pathlib import Path

from validate_input import load_and_validate


NAVY = "#172A4A"
RED = "#CE2A2A"


def esc(value):
    return html.escape(str(value))


def asset_data_uri(path):
    mime = "image/png" if path.suffix.lower() == ".png" else "image/jpeg"
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode('ascii')}"


def bullets(items):
    return "".join(f"<li>{esc(item)}</li>" for item in items)


def main():
    data_path = Path(sys.argv[1]).resolve()
    output_path = Path(sys.argv[2]).resolve()
    skill_root = Path(sys.argv[3]).resolve() if len(sys.argv) > 3 else Path(__file__).resolve().parents[1]
    data = load_and_validate(data_path)
    logo = asset_data_uri(skill_root / "assets/brand/qijia-logo.png")
    panel = asset_data_uri(skill_root / "assets/brand/qijia-brand-panel.png")
    meta = data["meta"]

    nav = "".join(
        f'<a href="#{esc(p["id"])}"><span>{esc(p["id"])}</span>{esc(p["category"])}</a>'
        for p in data["policies"]
    )
    summary = "".join(
        f'''<article class="metric {"critical" if item["priority"] == "高" else ""}">
          <div class="metric-label">{esc(item["label"])}</div>
          <strong>{esc(item["value"])}</strong>
          <p>{esc(item["detail"])}</p>
        </article>'''
        for item in data["summary"]
    )
    policy_sections = "".join(
        f'''<section class="policy" id="{esc(p["id"])}">
          <div class="policy-kicker"><span>{esc(p["id"])}</span>{esc(p["category"])} · {esc(p["priority"])}优先级</div>
          <h2>{esc(p["title"])}</h2>
          <div class="meta-row"><b>{esc(p["document_no"])}</b><span>发布 {esc(p["published"])}</span><span>实施/关注 {esc(p["effective"])}</span></div>
          <p class="lead">{esc(p["summary"])}</p>
          <div class="two-col">
            <div><h3>企业影响</h3><ul>{bullets(p["impacts"])}</ul></div>
            <div><h3>建议行动</h3><ol>{bullets(p["actions"])}</ol></div>
          </div>
          <div class="owner-row"><span>责任角色：{esc(p["owner"])}</span><span>建议时限：{esc(p["deadline"])}</span></div>
          <a class="source" href="{esc(p["source_url"])}">官方来源 · {esc(p["source_title"])}</a>
        </section>'''
        for p in data["policies"]
    )
    action_rows = "".join(
        f'''<tr><td><span class="priority {"high" if a["priority"] == "高" else ""}">{esc(a["priority"])}</span></td>
        <td>{esc(a["action"])}</td><td>{esc(a["owner"])}</td><td>{esc(a["deadline"])}</td><td>{esc(a["status"])}</td></tr>'''
        for a in data["actions"]
    )

    document = f'''<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(meta["title"])} · {esc(meta["date"])}</title>
<style>
:root{{--navy:{NAVY};--red:{RED};--ink:#15181D;--paper:#F7F5EF;--soft:#EDF2F8;--line:#D8DCE2;--muted:#68717F;}}
*{{box-sizing:border-box}}html{{scroll-behavior:smooth}}body{{margin:0;color:var(--ink);font-family:"PingFang SC","Microsoft YaHei",Arial,sans-serif;background:#F1F2F4;letter-spacing:0;}}
a{{color:inherit}}.shell{{min-height:100vh;display:grid;grid-template-columns:264px minmax(0,1fr)}}
.side{{position:sticky;top:0;height:100vh;background:#fff;border-right:1px solid var(--line);padding:28px 22px;display:flex;flex-direction:column;z-index:5}}
.brand{{display:flex;align-items:center;gap:11px;padding-bottom:24px;border-bottom:2px solid var(--navy)}}.brand img{{width:30px;height:36px;object-fit:contain}}.brand b{{font-size:15px;color:var(--navy)}}.brand small{{display:block;color:var(--muted);font-size:10px;margin-top:3px}}
.side nav{{display:grid;gap:4px;margin-top:24px}}.side nav a{{text-decoration:none;padding:11px 10px;border-left:2px solid transparent;color:#46505E;font-size:13px}}.side nav a:hover{{background:var(--soft);border-left-color:var(--red);color:var(--navy)}}.side nav span{{display:inline-grid;place-items:center;width:28px;height:22px;border:1px solid var(--line);margin-right:8px;font-size:10px}}
.side-foot{{margin-top:auto;font-size:11px;color:var(--muted);line-height:1.7}}.main{{min-width:0}}.hero{{min-height:540px;padding:64px clamp(32px,6vw,104px);position:relative;overflow:hidden;background:var(--paper);border-bottom:1px solid var(--line);display:flex;align-items:center}}
.hero:before,.content:before{{content:"";position:absolute;inset:0;background-image:linear-gradient(#172A4A0A 1px,transparent 1px),linear-gradient(90deg,#172A4A0A 1px,transparent 1px);background-size:24px 24px;pointer-events:none}}
.hero-copy{{position:relative;z-index:1;max-width:760px}}.eyebrow{{font-size:12px;font-weight:700;color:var(--red);margin-bottom:28px}}h1{{font-size:clamp(42px,5vw,68px);line-height:1.1;margin:0 0 18px;color:var(--navy);font-weight:720}}.subtitle{{font-size:20px;line-height:1.6;max-width:650px;color:#46505E}}.issue{{display:flex;gap:28px;margin-top:38px;font-size:13px;color:var(--muted)}}
.panel{{position:absolute;right:0;top:0;width:min(38vw,520px);height:100%;object-fit:cover;object-position:left center;opacity:.97}}.content{{position:relative;padding:64px clamp(32px,6vw,104px) 100px;background:#fff}}.content>*{{position:relative;z-index:1}}
.section-head{{display:flex;align-items:end;justify-content:space-between;border-bottom:2px solid var(--navy);padding-bottom:14px;margin-bottom:24px}}.section-head h2{{margin:0;color:var(--navy);font-size:28px}}.section-head span{{font-size:12px;color:var(--muted)}}
.metrics{{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:64px}}.metric{{border:1px solid var(--line);padding:20px;min-height:184px;background:#fff}}.metric.critical{{border-top:4px solid var(--red)}}.metric-label{{font-size:12px;color:var(--muted)}}.metric strong{{display:block;font-size:28px;color:var(--navy);margin:18px 0 12px}}.metric p{{margin:0;color:#4E5865;font-size:13px;line-height:1.75}}
.policy{{scroll-margin-top:24px;padding:42px 0;border-top:1px solid var(--line)}}.policy:first-of-type{{border-top:0}}.policy-kicker{{font-size:12px;font-weight:700;color:var(--red)}}.policy-kicker span{{display:inline-grid;place-items:center;width:34px;height:26px;border:1px solid var(--red);margin-right:10px}}.policy h2{{font-size:30px;line-height:1.3;margin:18px 0 12px;color:var(--navy);max-width:900px}}.meta-row{{display:flex;gap:18px;flex-wrap:wrap;font-size:12px;color:var(--muted)}}.lead{{font-size:17px;line-height:1.9;max-width:980px;margin:28px 0;padding-left:18px;border-left:3px solid var(--navy)}}
.two-col{{display:grid;grid-template-columns:1fr 1fr;gap:16px}}.two-col>div{{border:1px solid var(--line);padding:22px;background:#fff}}.two-col h3{{font-size:14px;color:var(--navy);margin:0 0 14px}}ul,ol{{margin:0;padding-left:22px}}li{{margin:8px 0;line-height:1.65;font-size:14px}}.owner-row{{display:flex;justify-content:space-between;gap:16px;padding:13px 16px;margin-top:14px;background:var(--soft);font-size:12px;color:var(--navy)}}.source{{display:block;margin-top:14px;color:#526075;font-size:11px;word-break:break-all}}
.actions{{margin-top:52px}}table{{width:100%;border-collapse:collapse;background:#fff}}th{{text-align:left;background:var(--navy);color:#fff;font-size:12px;padding:12px}}td{{border-bottom:1px solid var(--line);padding:13px 12px;font-size:12px;line-height:1.5}}.priority{{display:inline-block;padding:3px 8px;border:1px solid var(--line)}}.priority.high{{color:var(--red);border-color:var(--red);font-weight:700}}.disclaimer{{margin-top:48px;padding:18px;border-top:2px solid var(--navy);background:var(--paper);font-size:12px;line-height:1.8;color:#56606D}}
.print-button{{position:fixed;right:22px;bottom:22px;border:0;background:var(--navy);color:#fff;padding:12px 16px;cursor:pointer;font:inherit}}
@media(max-width:920px){{.shell{{display:block}}.side{{position:relative;width:100%;height:auto}}.side nav,.side-foot{{display:none}}.panel{{opacity:.16;width:100%}}.metrics{{grid-template-columns:1fr 1fr}}.two-col{{grid-template-columns:1fr}}}}
@media(max-width:560px){{.hero,.content{{padding:36px 20px}}.hero{{min-height:430px}}.metrics{{grid-template-columns:1fr}}.issue,.owner-row{{display:block}}.issue span,.owner-row span{{display:block;margin:6px 0}}h1{{font-size:40px}}.policy h2{{font-size:25px}}table{{display:block;overflow:auto}}}}
@media print{{@page{{size:A4;margin:15mm}}body{{background:#fff}}.shell{{display:block}}.side,.print-button,.panel{{display:none}}.hero{{min-height:auto;padding:18mm 0 30mm;page-break-after:always}}.content{{padding:0}}.metrics{{grid-template-columns:1fr 1fr;break-inside:avoid}}.policy{{break-before:page;border-top:0}}.two-col>div,.actions,table{{break-inside:avoid}}.source{{color:#000;text-decoration:none}}}}
</style></head><body>
<div class="shell"><aside class="side"><div class="brand"><img src="{logo}" alt="企加Logo"><div><b>{esc(meta["brand"])}</b><small>BRAND DOCUMENT SYSTEM 0.2</small></div></div><nav><a href="#overview"><span>00</span>今日总览</a>{nav}<a href="#actions"><span>05</span>行动清单</a></nav><div class="side-foot">{esc(meta["issue"])}<br>{esc(meta["date"])}<br>正式发布与执行以主管机关口径为准</div></aside>
<main class="main"><header class="hero"><div class="hero-copy"><div class="eyebrow">QIJIA · TAX & FINANCE POLICY BRIEF</div><h1>{esc(meta["title"])}</h1><div class="subtitle">{esc(meta["subtitle"])}</div><div class="issue"><span>{esc(meta["issue"])}</span><span>{esc(meta["audience"])}</span><span>{esc(meta["date"])}</span></div></div><img class="panel" src="{panel}" alt="企加线形品牌图"></header>
<div class="content" id="overview"><div class="section-head"><h2>今日要点</h2><span>事实 · 影响 · 行动</span></div><div class="metrics">{summary}</div>{policy_sections}
<section class="actions" id="actions"><div class="section-head"><h2>行动清单</h2><span>建议结合企业实际分配责任人</span></div><table><thead><tr><th>优先级</th><th>行动事项</th><th>责任角色</th><th>建议时限</th><th>状态</th></tr></thead><tbody>{action_rows}</tbody></table></section>
<div class="disclaimer"><b>使用提示</b><br>{esc(meta["disclaimer"])}</div></div></main></div>
<button class="print-button" onclick="window.print()">打印 / 导出 PDF</button></body></html>'''
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(document, encoding="utf-8")
    print(output_path)


if __name__ == "__main__":
    main()
