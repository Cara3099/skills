import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

function candidateModuleRoots() {
  const roots = [
    process.env.QIJIA_NODE_MODULES,
    process.env.CODEX_NODE_MODULES,
    path.join(
      os.homedir(),
      ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules",
    ),
  ];
  return [...new Set(roots.filter(Boolean))];
}

export async function loadArtifactTool() {
  try {
    return await import("@oai/artifact-tool");
  } catch (directError) {
    for (const root of candidateModuleRoots()) {
      if (!fs.existsSync(root)) continue;
      try {
        const requireFromRoot = createRequire(path.join(root, "package.json"));
        const entry = requireFromRoot.resolve("@oai/artifact-tool");
        return await import(pathToFileURL(entry).href);
      } catch {
        // Try the next compatible runtime root.
      }
    }
    throw new Error(
      "未找到 @oai/artifact-tool。Codex 用户请先调用 load_workspace_dependencies；" +
      "其他智能体可设置 QIJIA_NODE_MODULES 指向包含该包的 node_modules，" +
      "或直接使用 assets/templates 中的可编辑 Office 模版。\n" +
      `原始错误：${directError.message}`,
    );
  }
}
