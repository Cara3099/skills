---
name: agentcat-brand-visual
description: 为代理猫制作、改版或批量生成统一品牌视觉的 HTML、小程序界面、Word、PDF、Excel、PowerPoint、项目报告和业务文档。适用于品牌化设计、文案审校、排版优化、模板套用和交付前视觉检查；当用户提到代理猫、代理猫品牌视觉、代理猫 Logo、代理猫 PPT 模板或需要多种格式一致输出时使用。
---

# 代理猫品牌视觉

> 技能制作人：Cara3099

本 Skill 自带完整模板、示例、原始 Logo 和生成/校验脚本。为降低不同智能体与模型能力造成的质量差异，默认先套用固定模板和脚本，不从空白页面自由设计。

## 自动调用条件

当用户要求制作、修改或审查以下内容时，自动调用本 Skill：

- 代理猫品牌相关的网页、小程序、HTML、Word、Excel、PPT、PDF 或项目报告
- 使用代理猫 Logo、品牌橙、暖白或统一品牌视觉
- 检查品牌口号、中文字体、排版、分页、表格样式或页面视觉一致性
- 用户提到“代理猫品牌风格”“品牌视觉统一”“按照代理猫设计”等要求

如果任务与代理猫品牌视觉无关，不要自动调用本 Skill；如果无法判断是否需要品牌视觉，先询问用户是否希望使用本 Skill，再继续工作。

## 开始前

1. 读取 `references/brand-system.md` 和 `references/content-schema.md`。
2. 根据交付格式读取 `references/format-workflows.md`。
3. PPT 任务必须优先使用 `assets/templates/ppt/agentcat-brand-visual-skill-template.pptx`，并读取 `references/ppt-template-guide.md`。
4. Word 任务默认使用单栏连续文字版式，不使用结构化卡片、看板、拼贴或大色块。
5. 不确定智能体环境时，读取 `references/agent-compatibility.md`。

## 品牌文字规则

- 固定品牌口号只能写：`代理记账认准代理猫`。不得把“认准”写成“认证”，也不要自行替换成近义口号。
- 可选副口号为：`让合规创造价值`。只有在需要第二层品牌表达时使用，不替代固定品牌口号。
- `让每一份服务确认，都清楚可查。`不是品牌口号，模板和智能体不得主动使用；只有用户明确把它作为某个项目的临时标题时才可原样引用，且不能放入 Logo 锁定、固定页脚或品牌落款。
- 产品术语使用：`服务单` / `服务确认单`、`公司主体`、`税号`、`确认快照`、`证据链`。
- 不得虚构企业数量、服务年限、满意度、电话、价格或其他业务事实。

## 品牌视觉硬规则

- 只使用 Skill 内原始 Logo：`assets/brand/agentcat-logo.png`。不要重绘、描摹、矢量化、拉伸、仿制或凭文字重新生成 Logo。
- 品牌主橙：`#FF5001`；深橙：`#D94100`；深墨蓝：`#162033`；暖白：`#FCFBF8`；浅桃：`#FFF0E8`；暖灰边框：`#E8E2DC`。
- 不生成品牌插画、吉祥物变体、背景图片、装饰图形或抽象纹理。
- 没有可用原始素材时，使用纯色、规则线、边框、留白和排版完成表达，不用模型生图补位。
- 用户明确需要新增图片时，先询问是否有已批准素材；未经确认不得自行生成或替换品牌图片。

## 按媒介执行
### Word 与 PDF

- Word 是文字型正式文档，不是 PPT、Excel 或网页看板。正文始终使用单栏连续阅读流。
- 除真实行列数据外，不使用卡片、左右分栏、拼贴、装饰性表格、深色横幅、封面大图或复杂水印。
- 默认 A4；正文使用黑色或深灰，`宋体/SimSun` 或 `Noto Serif CJK SC`，10.5–11pt，1.5 倍行距；一级标题 16pt、二级标题 14pt、小节标题 12pt。
- 重点仅通过标题层级、编号、加粗、段前段后间距和极少量品牌橙提示，不用大面积色块强调。
- 先一次性设置页面、样式、页眉页脚、自动编号、分页规则和表格策略，再填充正文；不用空格、连续回车或手动分页修饰版面。
- 使用真实 Word 样式和自动编号，让 Word 自然分页；仅在章节起始、签署页或附件等语义需要处固定分页。
- 优先参考 `assets/templates/word/agentcat-brand-visual-skill-template.docx`；生成脚本为 `scripts/generate_docx.py`。

### PowerPoint

- 默认从 `assets/templates/ppt/agentcat-brand-visual-skill-template.pptx` 开始，以模板跟随方式编辑，不从空白页重新猜测版式。
- 保留模板页尺寸、字体层级、暖白背景、细橙线、页脚和页码结构；按内容选择最接近的模板页复制修改。
- 不生成新插画或装饰图；只使用模板内已有元素与原始 Logo。
- 标题必须控制换行；正文不小于 16pt。逐页渲染并检查越界、遮挡、字体替换和中文可读性。
- 模板启动脚本为 `scripts/generate_pptx.mjs`。

### Excel

- 优先使用 `assets/templates/excel/agentcat-brand-visual-skill-template.xlsx`，保持数据可筛选、可复制、可排序。
- 表头使用浅桃或淡橙，文字使用深墨蓝；不使用厚重黑色色块。
- 明确设置列宽、行高、换行、冻结窗格、筛选、打印区域和分页。
- 模板启动脚本为 `scripts/generate_xlsx.mjs`。

### HTML 与小程序

- 优先参考 `assets/templates/html/agentcat-brand-visual-skill-template.html`，使用响应式、可打印的真实文本页面。
- 使用单据、印章、证据时间线、细橙线和原始 Logo；不生成背景图。
- 时间线文字必须位于 Grid/Flex 自己的栏位，绝对定位仅用于不含文字的简单装饰。
- 检查 1440px 和 390px 下的换行、溢出、按钮可见性和内容遮挡。
- HTML 生成脚本为 `scripts/generate_html.py`。

## 模板与示例资产

- 原始 Logo：`assets/brand/agentcat-logo.png`
- PPT 完整模板：`assets/templates/ppt/agentcat-brand-visual-skill-template.pptx`
- 中文名 PPT 模板：`assets/templates/ppt/代理猫品牌视觉Skill完整模版.pptx`
- PPT 模板预览：`assets/templates/ppt/agentcat-brand-visual-skill-preview.png`
- Word 正式文档模板：`assets/templates/word/agentcat-brand-visual-skill-template.docx`
- Excel 品牌 Skill 模板：`assets/templates/excel/agentcat-brand-visual-skill-template.xlsx`
- HTML 品牌视觉基准：`assets/templates/html/agentcat-brand-visual-skill-template.html`
- 四种格式示例及统一内容 JSON：`assets/examples/`

## 交付前检查

1. 运行 `python scripts/validate_package.py` 检查模板、示例与脚本完整性。
2. 运行 `python scripts/validate_brand_text.py <路径...>` 拦截固定口号错误。
3. 检查固定口号是否为`代理记账认准代理猫`，副口号是否按需使用`让合规创造价值`，情境化主张没有进入品牌口号位。
4. 确认所有 Logo 使用原图且未变形，没有模型自行生成的品牌图片或装饰图形。
5. Word 检查连续文字阅读、标题层级、行距、分页、页眉页脚和黑白打印效果。
6. PPT 逐页渲染并做拼图检查；Excel 检查公式、筛选、冻结窗格和打印预览；HTML 检查桌面、移动端和打印样式。
7. 检查`服务单`、`确认快照`、`证据链`等术语和产品边界。

详细规则见 `references/`。示例调用见 [references/example-prompts.md](references/example-prompts.md)。
