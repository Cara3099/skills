# 统一内容结构

四个生成器共用同一份 UTF-8 JSON。最低结构如下：

```json
{
  "meta": {
    "brand": "广东企加税务师事务所",
    "title": "企加财税政策简报",
    "subtitle": "截至今日最新政策动态",
    "date": "2026-07-15",
    "issue": "2026年第01期",
    "audience": "企业管理层、财务及税务负责人",
    "disclaimer": "..."
  },
  "summary": [
    {"label": "今日申报", "value": "7月15日", "detail": "...", "priority": "高"}
  ],
  "policies": [
    {
      "id": "P01",
      "category": "征管提醒",
      "title": "...",
      "document_no": "...",
      "published": "2026-07-03",
      "effective": "2026-07-15",
      "priority": "高",
      "summary": "...",
      "impacts": ["..."],
      "actions": ["..."],
      "owner": "财务/税务",
      "deadline": "2026-07-15",
      "source_title": "...",
      "source_url": "https://..."
    }
  ],
  "actions": [
    {"priority": "高", "action": "...", "owner": "...", "deadline": "...", "status": "待处理", "policy_id": "P01"}
  ]
}
```

## 语义规则

- `priority` 只使用：高、中、常规。
- `status` 建议使用：待处理、处理中、已完成、持续关注。
- `summary` 是政策事实摘要，不写成宣传口号。
- `impacts` 说明对企业、流程、税负、报表或证据链的影响。
- `actions` 必须可执行，尽量有责任人和时限。
- `disclaimer` 单独呈现，不放进政策卡片或并列要点。
