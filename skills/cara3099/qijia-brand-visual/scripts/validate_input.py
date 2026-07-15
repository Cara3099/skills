#!/usr/bin/env python3
import json
import sys
from pathlib import Path


REQUIRED_META = {"brand", "title", "subtitle", "date", "issue", "disclaimer"}
REQUIRED_POLICY = {
    "id", "category", "title", "document_no", "published", "effective",
    "priority", "summary", "impacts", "actions", "owner", "deadline",
    "source_title", "source_url"
}


def load_and_validate(path):
    data = json.loads(Path(path).read_text(encoding="utf-8"))
    missing_meta = REQUIRED_META - set(data.get("meta", {}))
    if missing_meta:
        raise ValueError(f"meta 缺少字段: {sorted(missing_meta)}")
    if not data.get("policies"):
        raise ValueError("policies 不能为空")
    for index, policy in enumerate(data["policies"], 1):
        missing = REQUIRED_POLICY - set(policy)
        if missing:
            raise ValueError(f"policies[{index}] 缺少字段: {sorted(missing)}")
        if not policy["source_url"].startswith("https://"):
            raise ValueError(f"policies[{index}] 必须使用 HTTPS 官方来源")
    return data


if __name__ == "__main__":
    try:
        payload = load_and_validate(sys.argv[1])
        print(json.dumps({"ok": True, "policies": len(payload["policies"])}, ensure_ascii=False))
    except Exception as exc:
        print(json.dumps({"ok": False, "error": str(exc)}, ensure_ascii=False))
        raise
