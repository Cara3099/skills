# Skill catalog

This repository contains only Cara3099-maintained skills.

## Available skills

| Skill | Function | Install path |
|---|---|---|
| [agentcat-brand-visual](../skills/cara3099/agentcat-brand-visual/SKILL.md) | AgentCat brand visual system for HTML, Word, Excel, PowerPoint, PDF, and miniapp UI | `skills/cara3099/agentcat-brand-visual` |
| [qijia-brand-visual](../skills/cara3099/qijia-brand-visual/SKILL.md) | Qijia brand visual system for policy briefs, training, reports, Word, Excel, PowerPoint, and HTML | `skills/cara3099/qijia-brand-visual` |

## Direct installation

AgentCat:

```bash
python3 "${CODEX_HOME:-$HOME/.codex}/skills/.system/skill-installer/scripts/install-skill-from-github.py" --repo Cara3099/skills --path skills/cara3099/agentcat-brand-visual
```

Qijia:

```bash
python3 "${CODEX_HOME:-$HOME/.codex}/skills/.system/skill-installer/scripts/install-skill-from-github.py" --repo Cara3099/skills --path skills/cara3099/qijia-brand-visual
```

## Placement rules

1. Every Cara3099 skill lives under `skills/cara3099/<skill-name>/`.
2. Every skill package contains exactly one `SKILL.md`.
3. References, scripts, assets, examples, and templates stay inside their skill package.
4. Update this catalog, the root README, and `.claude-plugin/plugin.json` whenever the inventory changes.
