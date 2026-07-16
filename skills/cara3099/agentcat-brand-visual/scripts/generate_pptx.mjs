#!/usr/bin/env node
import { copyFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [, , dataArg, outputArg, skillRootArg] = process.argv;
if (!dataArg || !outputArg) {
  throw new Error("用法：generate_pptx.mjs <content.json> <output.pptx> [skill-root]");
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const skillRoot = path.resolve(skillRootArg || path.join(scriptDir, ".."));
const data = JSON.parse(await readFile(path.resolve(dataArg), "utf8"));
if (!data.meta?.title) throw new Error("内容 JSON 缺少 meta.title");

const template = path.join(skillRoot, "assets/templates/ppt/agentcat-brand-visual-skill-template.pptx");
const output = path.resolve(outputArg);
await mkdir(path.dirname(output), { recursive: true });
await copyFile(template, output);
console.log(JSON.stringify({
  output,
  template,
  next: "使用模板跟随方式编辑继承页面中的文字；不要从空白页重建，不要生成新图片。",
}, null, 2));
