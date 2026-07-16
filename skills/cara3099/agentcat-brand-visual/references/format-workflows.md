# 四种格式工作流

## Word

- 默认使用单栏连续文字排版，以标题、段落、编号和加粗建立层级。
- 禁止卡片、左右分栏、PPT 式拼贴、装饰性表格和大面积色块。
- 生成：`python scripts/generate_docx.py data.json output.docx <skill-root>`。
- 验证：逐页渲染，检查分页、孤行、字体、页眉页脚和黑白打印。

## PowerPoint

- 先复制完整模板：`node scripts/generate_pptx.mjs data.json output.pptx <skill-root>`。
- 使用模板跟随方式替换继承页面中的内容，不从空白页重新设计。
- 验证：逐页渲染、拼图检查、越界检查和字体替换检查。

## Excel

- 先复制项目追踪模板：`node scripts/generate_xlsx.mjs data.json output.xlsx <skill-root>`。
- 保留工作表结构、浅橙表头、筛选、冻结窗格和打印设置，再填充真实数据。
- 验证：检查关键范围、公式错误、筛选、冻结窗格和打印预览。

## HTML

- 生成：`python scripts/generate_html.py data.json output.html <skill-root>`。
- 输出单文件，CSS 和 Logo 内嵌，正文保持真实文本。
- 验证：检查 1440px、390px 和打印样式。
