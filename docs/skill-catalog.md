# Skill catalog

This repository is organized by author first and function second. The catalog is the quick map for finding, installing, and attributing skills.

## Cara3099 authored

| Skill | Function | Install path |
|---|---|---|
| [agentcat-brand-visual](../skills/cara3099/agentcat-brand-visual/SKILL.md) | AgentCat brand visual system for HTML, Word, Excel, PowerPoint, PDF, and miniapp UI | `skills/cara3099/agentcat-brand-visual` |

Direct install:

```bash
python3 "${CODEX_HOME:-$HOME/.codex}/skills/.system/skill-installer/scripts/install-skill-from-github.py" --repo Cara3099/skills --path skills/cara3099/agentcat-brand-visual
```

## Imported from Matt Pocock

The following collection keeps its original author attribution and function grouping:

| Function | Location | Notes |
|---|---|---|
| Engineering | [`skills/matt-pocock/engineering/`](../skills/matt-pocock/engineering/) | Daily engineering workflows and model-invoked development discipline |
| Productivity | [`skills/matt-pocock/productivity/`](../skills/matt-pocock/productivity/) | General planning, teaching, handoff, and writing workflows |
| Personal | [`skills/matt-pocock/personal/`](../skills/matt-pocock/personal/) | Personal setup and content workflows |
| Misc | [`skills/matt-pocock/misc/`](../skills/matt-pocock/misc/) | Useful but non-promoted utilities |
| In progress | [`skills/matt-pocock/in-progress/`](../skills/matt-pocock/in-progress/) | Draft or experimental skills |
| Deprecated | [`skills/matt-pocock/deprecated/`](../skills/matt-pocock/deprecated/) | Retained for history; do not install for new work |

The imported skills remain attributable to their original author. Their human-facing docs keep the original source links where applicable.

## Naming and placement rules

1. A skill authored by Cara3099 goes under `skills/cara3099/<skill-name>/`.
2. An imported skill goes under `skills/<author>/<function>/<skill-name>/`.
3. Drafts and retired skills stay under the original author's `in-progress/` or `deprecated/` folder.
4. Every skill folder contains one `SKILL.md`; optional `agents/`, `references/`, `scripts/`, and `assets/` remain inside that skill folder.
5. Update this catalog, the top-level README, and `.claude-plugin/plugin.json` when a promoted skill is added, renamed, or removed.
