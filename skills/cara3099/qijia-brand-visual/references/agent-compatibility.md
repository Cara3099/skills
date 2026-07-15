# 多智能体使用说明

本包采用“说明文件 + 资产 + 可运行脚本”的便携结构，不依赖某个智能体独有的提示词语法。

## Codex / OpenAI Agent

- 将整个目录放入可读取的 skills 目录。
- 以 `SKILL.md` 为入口，必要时读取对应 references。
- 先调用 `load_workspace_dependencies` 获取文档运行环境，再使用当前环境的文档、表格、演示文稿渲染工具完成验证。
- PPT/Excel 脚本会自动定位 Codex 内置的 `@oai/artifact-tool`；非标准安装可设置 `QIJIA_NODE_MODULES` 指向包含该包的 `node_modules`。

## Claude Code

- 将目录复制或链接到项目的 `.claude/skills/qijia-brand-visual`，或在任务中明确要求先读取 `SKILL.md`。
- 保持 `assets`、`references`、`scripts` 相对路径不变。
- Word 生成需要 Python 与 `python-docx`。若环境没有 `@oai/artifact-tool`，PPT/Excel 应直接编辑 `assets/templates` 中的 Office 模版，不要删除 Logo、母版或品牌色。

## Gemini CLI / 其他编码智能体

- 把整个目录作为项目上下文或知识目录提供。
- 明确指定：先读取 `SKILL.md`，再按照目标文件类型读取 reference 并运行对应脚本。
- 若不能使用 `@oai/artifact-tool`，使用模版编辑路径；HTML 生成器只依赖 Python 标准库，Word 生成器依赖 `python-docx`。

## 不支持自动发现的对话型智能体

- 上传压缩包，要求智能体把 `SKILL.md` 作为最高优先级的品牌制作规范。
- 若不能执行脚本，仍可复制模版并依据 `references/brand-system.md` 手工制作。

不同平台对“Skill”的自动发现机制不同，因此本包保证的是内容、资产和工作流可迁移，不承诺所有平台都能零配置自动加载。
