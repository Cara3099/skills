Skills are organized by author first and function second:

- `skills/cara3099/` — skills authored and maintained by Cara3099.
- `skills/matt-pocock/engineering/` — daily code work from Matt Pocock.
- `skills/matt-pocock/productivity/` — daily non-code workflow tools from Matt Pocock.
- `skills/matt-pocock/personal/` — personal setup skills from Matt Pocock.
- `skills/matt-pocock/misc/` — useful but non-promoted skills from Matt Pocock.
- `skills/matt-pocock/in-progress/` — drafts not yet ready to ship.
- `skills/matt-pocock/deprecated/` — no longer used.

Every promoted skill must have a reference in the top-level `README.md` and an entry in `.claude-plugin/plugin.json`. The full ownership and function map lives in `docs/skill-catalog.md`.

Each skill entry in the top-level `README.md` must link the skill name to its `SKILL.md`.

The top-level `README.md` and `docs/skill-catalog.md` are the source of truth for navigation. Keep skill names linked to their `SKILL.md` files and preserve original author attribution when importing or moving a skill.

Skills in `skills/matt-pocock/engineering/` and `skills/matt-pocock/productivity/` also have human-facing docs pages in `docs/engineering/` and `docs/productivity/`. The docs tree keeps the original functional organization even though the skill tree is now author-first. When you add, rename, or change the behaviour of an imported promoted skill, create or re-sync its docs page following [.agents/writing-docs.md](./.agents/writing-docs.md). Cara3099-authored skills document their own usage in the skill folder and the catalog.

Every `SKILL.md` is either user-invoked (`disable-model-invocation: true`, reachable only by the human) or model-invoked (model- or user-reachable). See [.agents/invocation.md](./.agents/invocation.md).

[`ask-matt`](./skills/matt-pocock/engineering/ask-matt/SKILL.md) is the router that maps every user-reachable skill and how they relate. The same trigger that re-syncs a docs page applies to it: whenever you add, rename, remove, or change how a user-reachable skill fits the flows, re-read `ask-matt`'s `SKILL.md` and update it so the map stays accurate — a new skill it never mentions, or a stale one it still routes to, is a router that lies.

To (re)link every skill into the local harness skill directories (`~/.claude/skills`, `~/.agents/skills`), run `scripts/link-skills.sh`. Each entry is a symlink into this repo, so a `git pull` keeps installed skills current; re-run the script after adding, removing, or renaming a skill.
