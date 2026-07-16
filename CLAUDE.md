# Cara3099 Skills repository

This repository contains only skills authored and maintained by Cara3099.

## Structure

- `skills/cara3099/<skill-name>/` — one self-contained skill package.
- Each skill package contains one `SKILL.md` plus any `agents/`, `references/`, `scripts/`, `assets/`, `examples/`, or `templates/` it needs.
- `docs/skill-catalog.md` and the root `README.md` are the navigation source of truth.
- `.claude-plugin/plugin.json` lists the skills exposed by the repository plugin.

## Maintenance

When adding, renaming, or removing a skill:

1. Keep the package self-contained and preserve its original brand assets.
2. Update the root README, catalog, and plugin manifest.
3. Keep examples generic and free of client-specific project data.
4. Run the skill's own validation scripts when available.
5. Run `scripts/list-skills.sh` to confirm the final inventory.

Do not add third-party skill collections to this repository.
