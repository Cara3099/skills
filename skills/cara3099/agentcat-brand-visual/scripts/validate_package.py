#!/usr/bin/env python3
import hashlib
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    "SKILL.md",
    "agents/openai.yaml",
    "assets/brand/agentcat-logo.png",
    "assets/templates/ppt/agentcat-brand-visual-skill-template.pptx",
    "assets/templates/ppt/代理猫品牌视觉Skill完整模版.pptx",
    "assets/templates/ppt/agentcat-brand-visual-skill-preview.png",
    "assets/templates/word/agentcat-brand-visual-skill-template.docx",
    "assets/templates/excel/agentcat-brand-visual-skill-template.xlsx",
    "assets/templates/html/agentcat-brand-visual-skill-template.html",
    "assets/examples/agentcat-brand-skill-example.json",
    "assets/examples/代理猫品牌视觉Skill-Word示例.docx",
    "assets/examples/代理猫品牌视觉Skill-Excel示例.xlsx",
    "assets/examples/代理猫品牌视觉Skill-PPT示例.pptx",
    "assets/examples/代理猫品牌视觉Skill-HTML示例.html",
    "scripts/generate_docx.py",
    "scripts/generate_xlsx.mjs",
    "scripts/generate_pptx.mjs",
    "scripts/generate_html.py",
    "scripts/validate_brand_text.py",
]


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    missing = [item for item in REQUIRED if not (ROOT / item).is_file()]
    if missing:
        raise SystemExit("缺少文件：\n" + "\n".join(missing))

    for item in REQUIRED:
        path = ROOT / item
        if path.suffix.lower() in {".docx", ".xlsx", ".pptx"}:
            with zipfile.ZipFile(path) as archive:
                bad = archive.testzip()
                if bad:
                    raise SystemExit(f"压缩包损坏：{item} -> {bad}")

    ppt = ROOT / "assets/templates/ppt/agentcat-brand-visual-skill-template.pptx"
    ppt_zh = ROOT / "assets/templates/ppt/代理猫品牌视觉Skill完整模版.pptx"
    if digest(ppt) != digest(ppt_zh):
        raise SystemExit("中英文 PPT 模板内容不一致")

    print(f"OK: {len(REQUIRED)} 个核心文件完整；Office 模板压缩结构有效；PPT 中英文副本一致。")


if __name__ == "__main__":
    main()
