# 统一内容结构

四种格式共用同一份 UTF-8 JSON：

```json
{
  "meta": {
    "brand": "代理猫",
    "title": "代理猫品牌视觉 Skill",
    "subtitle": "统一应用代理猫品牌视觉到网页、文档、表格与演示文件",
    "date": "2026-07-16",
    "document_type": "Skill 说明",
    "audience": "设计、产品、研发与文档交付人员"
  },
  "overview": "代理猫品牌视觉 Skill 的一句话说明。",
  "highlights": [
    {"title": "核心方法", "detail": "模板优先、原图优先、规则化排版"}
  ],
  "sections": [
    {
      "heading": "一、品牌基础",
      "paragraphs": ["说明本阶段范围、成果和限制。"],
      "bullets": ["品牌橙与深墨蓝", "暖白留白与规则线", "固定品牌口号"]
    }
  ],
  "actions": [
    {"id": "01", "title": "套用模板并完成 QA", "detail": "检查多格式渲染、品牌文字和文件完整性", "owner": "设计 / QA"}
  ],
  "footer_note": "代理记账认准代理猫"
}
```

`paragraphs` 用于连续正文；`bullets` 只用于真正并列的短要点。普通段落不能为了视觉效果拆成卡片。
