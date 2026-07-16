#!/usr/bin/env python3
"""Validate fixed AgentCat copy in text and Office Open XML artifacts."""

from __future__ import annotations

import sys
from pathlib import Path
from zipfile import BadZipFile, ZipFile


GOOD_SLOGAN = "代理记账认准代理猫"
BAD_PHRASES = ("代理记账" + "认" + "证代理猫", "认" + "证代理猫")
OFFICE_EXTENSIONS = {".docx", ".xlsx", ".pptx"}
TEXT_EXTENSIONS = {".css", ".html", ".js", ".json", ".md", ".mjs", ".py", ".ts", ".wxml", ".wxss", ".xml", ".yaml", ".yml"}


def read_content(path: Path) -> str:
    if path.suffix.lower() in OFFICE_EXTENSIONS:
        try:
            with ZipFile(path) as archive:
                return "\n".join(
                    archive.read(name).decode("utf-8", "ignore")
                    for name in archive.namelist()
                    if name.endswith(".xml")
                )
        except (BadZipFile, OSError) as exc:
            raise RuntimeError(f"cannot read Office file: {exc}") from exc
    return path.read_text(encoding="utf-8", errors="ignore")


def expand_paths(raw_paths: list[str]) -> list[Path]:
    result: list[Path] = []
    for raw in raw_paths:
        path = Path(raw)
        if path.is_dir():
            result.extend(sorted(p for p in path.rglob("*") if p.is_file()))
        elif path.is_file():
            result.append(path)
    return result


def main() -> int:
    paths = expand_paths(sys.argv[1:] or ["."])
    checked = 0
    failures = 0
    for path in paths:
        if path.suffix.lower() not in OFFICE_EXTENSIONS | TEXT_EXTENSIONS:
            continue
        try:
            content = read_content(path)
        except RuntimeError as exc:
            print(f"ERROR {path}: {exc}")
            failures += 1
            continue
        checked += 1
        for phrase in BAD_PHRASES:
            if phrase in content:
                print(f"ERROR {path}: forbidden phrase: {phrase}")
                failures += 1
        if "代理猫" in content and GOOD_SLOGAN in content:
            print(f"OK    {path}: fixed slogan present")
    print(f"Checked {checked} files; failures: {failures}")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
