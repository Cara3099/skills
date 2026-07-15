# 四种格式工作流

## Word

- 适用：正式简报、报告、制度、合同类说明、客户交付文稿及长篇文字材料。
- A4 纵向，页眉放 Logo 与公司名，首页使用正式文件式封面。
- 正文默认采用单栏、两端对齐、首行缩进和 1.5 倍行距，按“一、”“（一）”及自动编号组织。
- 优先承载连续文字和完整段落。只有真实的字段对照、行动矩阵或定量数据才使用表格。
- 禁止为了视觉效果把正文切成左右两栏、卡片矩阵或 PPT 式碎片；不要让结构装饰压缩正文容量。
- 生成：`python scripts/generate_docx.py data.json output.docx <skill-root>`。
- 验证：使用可用的 DOCX 渲染工具逐页检查。

## Excel

- 适用：政策台账、行动清单、风险追踪、责任分工。
- 至少包含“政策摘要”“行动清单”“政策来源”三个工作表。
- 每张工作表首行放企加 Logo 与完整公司名，第二行再放当前表标题，品牌归属必须一眼可见。
- 冻结表头、开启筛选、隐藏默认网格线；输入状态使用数据验证或明确枚举。
- 生成：`node scripts/generate_xlsx.mjs data.json output.xlsx <skill-root>`。
- 验证：检查关键范围、公式结果和每个工作表的渲染图。

## PowerPoint

- 适用：培训、政策宣讲、管理层汇报、客户沟通。
- 正式培训必须从完整模版开始：`assets/templates/ppt/企加税所正式培训PPT完整模版.pptx`。
- 新简报可按模版视觉规则生成编辑型页面；每页一个核心结论。
- 生成：`node scripts/generate_pptx.mjs data.json output.pptx <skill-root>`。
- 验证：逐页渲染、拼图检查和越界检查。

## HTML

- 适用：内部发布、微信转发前预览、政策专题页、可打印网页。
- 输出单文件，CSS 和 Logo 均内嵌；正文必须是真实文本。
- 桌面使用固定导航与阅读区，移动端自动变为单列。
- 生成：`python scripts/generate_html.py data.json output.html <skill-root>`。
- 验证：检查响应式布局、链接、打印分页和内容一致性。
