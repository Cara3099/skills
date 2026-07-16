# Cara3099 Skills

Cara3099 维护的公开 Agent Skills 集合，当前聚焦品牌视觉、文档、表格、演示文稿和可复用交付模板。

## Skills

| Skill | 用途 | 安装路径 |
|---|---|---|
| [代理猫品牌视觉](./skills/cara3099/agentcat-brand-visual/SKILL.md) | 统一代理猫在 HTML、Word、Excel、PowerPoint、PDF 和小程序界面中的品牌视觉 | `skills/cara3099/agentcat-brand-visual` |
| [企加品牌视觉](./skills/cara3099/qijia-brand-visual/SKILL.md) | 统一企加税务培训、政策简报、报告和业务文件的品牌视觉 | `skills/cara3099/qijia-brand-visual` |

## 快速安装

安装整个仓库：

```bash
npx skills@latest add Cara3099/skills
```

只安装代理猫品牌视觉：

```bash
python3 "${CODEX_HOME:-$HOME/.codex}/skills/.system/skill-installer/scripts/install-skill-from-github.py" --repo Cara3099/skills --path skills/cara3099/agentcat-brand-visual
```

只安装企加品牌视觉：

```bash
python3 "${CODEX_HOME:-$HOME/.codex}/skills/.system/skill-installer/scripts/install-skill-from-github.py" --repo Cara3099/skills --path skills/cara3099/qijia-brand-visual
```

## 仓库结构

```text
skills/
└── cara3099/
    ├── agentcat-brand-visual/
    └── qijia-brand-visual/
```

每个 Skill 自包含 `SKILL.md`、参考规则、模板、示例、原始品牌素材、生成脚本和校验脚本。完整清单见 [docs/skill-catalog.md](./docs/skill-catalog.md)。

## 维护规则

新增、重命名或删除 Skill 时，同步更新：

- 根目录 `README.md`
- `docs/skill-catalog.md`
- `.claude-plugin/plugin.json`

提交前运行：

```bash
scripts/list-skills.sh
```

本仓库只收录 Cara3099 自己维护的 Skill；第三方 Skill 不放入本仓库。
