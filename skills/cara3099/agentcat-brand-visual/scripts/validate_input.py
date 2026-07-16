#!/usr/bin/env python3
import json
from pathlib import Path


REQUIRED_META = {"brand", "title", "subtitle", "date", "document_type", "audience"}


def load_and_validate(path):
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("内容 JSON 顶层必须是对象")
    meta = data.get("meta")
    if not isinstance(meta, dict):
        raise ValueError("缺少 meta 对象")
    missing = sorted(REQUIRED_META - set(meta))
    if missing:
        raise ValueError(f"meta 缺少字段：{', '.join(missing)}")
    for key in ("sections", "actions"):
        if not isinstance(data.get(key, []), list):
            raise ValueError(f"{key} 必须是数组")
    return data
