#!/usr/bin/env node
import { copyFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [, , dataArg, outputArg, skillRootArg] = process.argv;
if (!dataArg || !outputArg) {
  throw new Error("用法：generate_xlsx.mjs <content.json> <output.xlsx> [skill-root]");
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(skillRootArg || path.join(scriptDir, ".."));
const data = JSON.parse(await readFile(path.resolve(dataArg), "utf8"));
if (!data.meta?.title) throw new Error("内容 JSON 缺少 meta.title");

const template = path.join(skillRoot, "assets/templates/excel/agentcat-brand-visual-skill-template.xlsx");
const output = path.resolve(outputArg);
await mkdir(path.dirname(output), { recursive: true });
await copyFile(template, output);
console.log(JSON.stringify({
  output,
  template,
  next: "保留模板的工作表、浅橙表头、筛选、冻结窗格和打印设置后填充真实数据。",
}, null, 2));
