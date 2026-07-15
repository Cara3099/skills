---
name: qijia-brand-visual
description: 为广东企加税务师事务所制作、改版或批量生成统一品牌视觉的 Word、Excel、PowerPoint 和 HTML 文件。适用于财税政策简报、正式培训课件、审计监管报告、风险台账、客户方案、业务通知、讲义和内部网页；当用户提到企加、企加税所、公司统一视觉、品牌文件、培训PPT模版或需要四种格式一致输出时使用。
---

# 企加品牌视觉

> 技能制作人：Cara3099

## 启动与调用

当任务涉及广东企加税务师事务所的品牌文件，或用户提到“企加品牌视觉”“企加税所”“企加 Logo”“企加 PPT 模版”“统一生成 Word、Excel、PPT、HTML”时，启动本技能。

启动后按以下顺序执行：

1. 先读取本技能的 `references/brand-system.md` 和 `references/content-schema.md`。
2. 根据目标格式读取 `references/format-workflows.md`；培训 PPT 另读 `references/training-ppt-style-guide.md`。
3. HTML 任务另读 `references/html-visual-guide.md`，并优先使用 `assets/templates/html/qijia-brand-visual-system-0.3.html`。
4. 以统一内容源生成文件，完成渲染、分页、溢出、清晰度和来源检查后再交付。

也可以直接调用：

```text
使用企加品牌视觉，把这份内容生成正式的 Word、Excel、PPT 或 HTML 文件。
```

## 目标

把同一份结构化内容稳定渲染为 Word、Excel、PPT 和 HTML，并保持企加视觉系统 0.3 的品牌一致性、正式感、可编辑性和打印清晰度。

## 开始前

1. 读取 `references/brand-system.md`。
2. 将内容整理为 `references/content-schema.md` 规定的 JSON。
3. 根据交付格式读取 `references/format-workflows.md`。
4. PPT 培训类任务必须优先使用 `assets/templates/ppt/qijia-formal-training-template.pptx`，并同时读取 `references/training-ppt-style-guide.md`。同目录保留中文文件名副本。
5. HTML 视觉系统类任务必须使用 `assets/templates/html/qijia-brand-visual-system-0.3.html` 作为基准，并读取 `references/html-visual-guide.md`。
6. 不确定智能体环境时，读取 `references/agent-compatibility.md`。

## 核心工作流

### 1. 明确内容任务

- 确认受众、用途、正式程度、文件类型、打印或投屏场景。
- 政策、税率、时限、监管口径等时效信息必须先核验官方来源。
- 不改写用户要求保留的原文；免责声明、提示语与并列要点必须保持正确逻辑层级。

### 2. 建立单一内容源

- 使用统一 JSON 作为四种文件的内容源，不在四个文件里分别手工维护事实。
- 每条政策至少包含标题、文号、发布日期、摘要、影响、行动建议和官方来源。
- 链接使用完整官方 URL；文件内应能追溯来源。

### 3. 选择生成路径

- Word：运行 `scripts/generate_docx.py`，产出正式可编辑文件。默认采用合同、制度和政策文件常用的单栏连续阅读流，支持较长正文与自动编号；除真实对照数据外不使用左右分栏或卡片拼贴。
- Excel：运行 `scripts/generate_xlsx.mjs`，产出政策台账、行动清单与来源表。每张工作表顶部必须清楚显示企加 Logo 与“广东企加税务师事务所”。
- PPT：运行 `scripts/generate_pptx.mjs`；正式培训优先套用完整 PPT 模版。
- HTML：政策简报等结构化内容运行 `scripts/generate_html.py`；品牌视觉系统、品牌手册和高质感专题页优先复制并改写 `assets/templates/html/qijia-brand-visual-system-0.3.html`，产出响应式、可打印的单文件网页。

脚本接受：

```text
<script> <content.json> <output-file> [skill-root]
```

### 4. 应用品牌规则

- 主色：深蓝 `#172A4A`、正红 `#CE2A2A`。
- 中性色：墨色 `#15181D`、纸白 `#F7F5EF`、浅蓝灰 `#EDF2F8`、边框 `#D8DCE2`。
- Logo 仅放在白色或浅色干净区域，保证标志图形完整可辨。
- 红色用于风险、时限和品牌强调，不大面积铺满。
- 使用细小方格、清晰分区、克制边框和 8px 节奏；不用大面积渐变、装饰光效或夸张圆角。

### 5. 验证后交付

- Word：渲染为页面图片，检查分页、表格、孤行和页眉页脚。
- Excel：检查关键范围、公式、筛选、冻结窗格、打印区域和公式错误；图片预览器不显示嵌入图时，必须用 Excel 或 LibreOffice 再验证 Logo。
- PPT：逐页渲染并做拼图检查，确认无越界、遮挡和过小文字。
- HTML：检查桌面、移动端和打印样式；正文必须是真实文本，不用截图代替。
- HTML 品牌系统：重点检查 Logo 是否完整可辨、品牌色是否准确、各板块正文是否达到易读字号，以及桌面端无横向溢出。
- 四种文件的标题、日期、政策文号、数字与来源必须一致。

## 模版资产

- `assets/brand/qijia-logo.png`：企加 Logo。
- `assets/brand/qijia-brand-panel.png`：深蓝线形品牌图。
- `assets/templates/ppt/qijia-formal-training-template.pptx`：此前确认的完整培训 PPT 模版。
- `assets/templates/word/qijia-formal-brief-template.docx`：正式简报 Word 模版。
- `assets/templates/excel/qijia-policy-tracker-template.xlsx`：政策追踪 Excel 模版。
- `assets/templates/html/qijia-brand-visual-system-0.3.html`：当前定稿的品牌视觉系统 HTML 模板，采用编辑式品牌图谱布局、原有右侧深蓝品牌图、企加深蓝/正红/纸白体系和放大后的可读文字。

## 禁止事项

- 不把 Logo 当作巨大装饰图。
- 不把 PPT 截图嵌入 Word 或 HTML 充当正文。
- 不把提示、免责声明或结论误放进并列卡片。
- 不为了塞满页面缩小正文字号。
- 不把未经核验的政策信息写成确定事实。
- 不使用“这里讲一下”“讲师提示”等内部制作语气作为受众可见文本。

## 示例调用

参见 `references/example-prompts.md`。示例内容 JSON 位于 `assets/examples/`。
