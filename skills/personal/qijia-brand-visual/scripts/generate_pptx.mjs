import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { loadArtifactTool } from "./load_artifact_tool.mjs";

const { Presentation, PresentationFile } = await loadArtifactTool();

const [dataArg, outputArg, skillArg] = process.argv.slice(2);
if (!dataArg || !outputArg) throw new Error("用法: generate_pptx.mjs <content.json> <output.pptx> [skill-root]");
const dataPath = path.resolve(dataArg);
const outputPath = path.resolve(outputArg);
const skillRoot = skillArg ? path.resolve(skillArg) : path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const data = JSON.parse(await fs.readFile(dataPath, "utf8"));
const logo = await readImage(path.join(skillRoot, "assets/brand/qijia-logo.png"));
const panel = await readImage(path.join(skillRoot, "assets/brand/qijia-brand-panel.png"));

const W = 1280, H = 720;
const C = { navy: "#172A4A", red: "#CE2A2A", ink: "#15181D", paper: "#F7F5EF", soft: "#EDF2F8", line: "#D8DCE2", muted: "#68717F", white: "#FFFFFF" };
const deck = Presentation.create({ slideSize: { width: W, height: H } });

async function readImage(file) {
  const b = await fs.readFile(file);
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
}

function shape(slide, position, fill = "none", line = "none", geometry = "rect", name) {
  return slide.shapes.add({
    geometry, name, position, fill,
    line: { style: "solid", fill: line, width: line === "none" ? 0 : 1 },
  });
}

function textBox(slide, text, position, style = {}, name) {
  const box = shape(slide, position, "none", "none", "textbox", name);
  box.text = text;
  box.text.style = {
    fontSize: 18, color: C.ink, fontFamily: "Microsoft YaHei",
    ...style,
  };
  return box;
}

function addGrid(slide) {
  for (let x = 72; x <= 1208; x += 48) shape(slide, { left: x, top: 62, width: 1, height: 602 }, "none", "#E9EBEF", "line");
  for (let y = 72; y <= 648; y += 48) shape(slide, { left: 64, top: y, width: 1152, height: 1 }, "none", "#E9EBEF", "line");
}

function addChrome(slide, page, section = "财税政策简报") {
  slide.background.fill = C.paper;
  addGrid(slide);
  slide.images.add({ blob: logo, contentType: "image/png", alt: "企加Logo", fit: "contain", position: { left: 68, top: 24, width: 26, height: 32 } });
  textBox(slide, data.meta.brand, { left: 102, top: 26, width: 320, height: 28 }, { fontSize: 14, bold: true, color: C.navy });
  textBox(slide, section, { left: 936, top: 28, width: 250, height: 24 }, { fontSize: 11, color: C.muted, alignment: "right" });
  shape(slide, { left: 64, top: 62, width: 1152, height: 2 }, C.red, "none", "rect");
  textBox(slide, `${data.meta.date}  ·  ${String(page).padStart(2, "0")}`, { left: 1020, top: 670, width: 168, height: 20 }, { fontSize: 10, color: C.muted, alignment: "right" });
}

function addTitle(slide, title, kicker) {
  if (kicker) textBox(slide, kicker, { left: 76, top: 92, width: 500, height: 24 }, { fontSize: 11, bold: true, color: C.red });
  textBox(slide, title, { left: 76, top: 120, width: 1050, height: 72 }, { fontSize: 32, bold: true, color: C.navy });
  shape(slide, { left: 76, top: 198, width: 44, height: 4 }, C.red, "none", "rect");
}

function card(slide, x, y, w, h, title, body, accent = C.navy, value = null) {
  shape(slide, { left: x, top: y, width: w, height: h }, C.white, C.line, "rect");
  shape(slide, { left: x, top: y, width: 5, height: h }, accent, "none", "rect");
  textBox(slide, title, { left: x + 24, top: y + 20, width: w - 48, height: 32 }, { fontSize: 16, bold: true, color: C.navy });
  if (value) textBox(slide, value, { left: x + 24, top: y + 58, width: w - 48, height: 54 }, { fontSize: 28, bold: true, color: accent });
  textBox(slide, body, { left: x + 24, top: y + (value ? 118 : 64), width: w - 48, height: h - (value ? 136 : 82) }, { fontSize: 15, color: C.ink });
}

function bullets(items) { return items.map((item, index) => `${index + 1}. ${item}`).join("\n"); }

// 1 Cover
{
  const slide = deck.slides.add();
  slide.background.fill = C.paper;
  addGrid(slide);
  slide.images.add({ blob: logo, contentType: "image/png", alt: "企加Logo", fit: "contain", position: { left: 80, top: 62, width: 48, height: 58 } });
  textBox(slide, data.meta.brand, { left: 146, top: 72, width: 440, height: 42 }, { fontSize: 22, bold: true, color: C.navy });
  shape(slide, { left: 80, top: 136, width: 520, height: 3 }, C.red, "none", "rect");
  textBox(slide, data.meta.title, { left: 80, top: 236, width: 700, height: 104 }, { fontSize: 48, bold: true, color: C.navy });
  textBox(slide, data.meta.subtitle, { left: 82, top: 356, width: 650, height: 52 }, { fontSize: 21, color: C.muted });
  textBox(slide, `${data.meta.issue}  ·  ${data.meta.date}`, { left: 82, top: 526, width: 460, height: 30 }, { fontSize: 15, bold: true, color: C.red });
  textBox(slide, data.meta.audience, { left: 82, top: 568, width: 560, height: 28 }, { fontSize: 13, color: C.muted });
  shape(slide, { left: 842, top: 0, width: 438, height: 720 }, C.navy, "none", "rect");
  slide.images.add({ blob: panel, contentType: "image/png", alt: "企加线形品牌图", fit: "cover", position: { left: 842, top: 0, width: 438, height: 720 } });
}

// 2 Overview
{
  const slide = deck.slides.add(); addChrome(slide, 2); addTitle(slide, "今天先完成申报，再安排三项政策评估", "TODAY AT A GLANCE");
  data.summary.forEach((s, i) => {
    const x = 76 + (i % 2) * 570, y = 234 + Math.floor(i / 2) * 196;
    card(slide, x, y, 548, 170, s.label, s.detail, s.priority === "高" ? C.red : C.navy, s.value);
  });
}

// 3 Filing deadline
{
  const p = data.policies[0]; const slide = deck.slides.add(); addChrome(slide, 3, p.category); addTitle(slide, "7月申报纳税期限截至今日", `${p.document_no} · ${p.priority}优先级`);
  shape(slide, { left: 76, top: 238, width: 330, height: 250 }, C.navy, "none", "rect");
  textBox(slide, "7月15日", { left: 106, top: 292, width: 270, height: 68 }, { fontSize: 44, bold: true, color: C.white, alignment: "center" });
  textBox(slide, "申报 + 缴款 + 回执\n三项均需确认", { left: 108, top: 382, width: 266, height: 76 }, { fontSize: 18, bold: true, color: C.white, alignment: "center" });
  card(slide, 438, 238, 348, 250, "立即核对", bullets(p.actions), C.red);
  card(slide, 812, 238, 334, 250, "风险影响", bullets(p.impacts), C.navy);
  textBox(slide, p.summary, { left: 78, top: 526, width: 1068, height: 82 }, { fontSize: 14, color: C.ink });
}

// 4 Vehicle tax
{
  const p = data.policies[1]; const slide = deck.slides.add(); addChrome(slide, 4, p.category); addTitle(slide, "2027年起，相关车辆优惠退出需要提前入预算", p.document_no);
  card(slide, 76, 236, 504, 280, "政策变化", p.summary, C.red);
  card(slide, 604, 236, 542, 280, "企业应对", bullets(p.actions), C.navy);
  shape(slide, { left: 90, top: 558, width: 1020, height: 3 }, C.navy, "none", "rect");
  shape(slide, { left: 160, top: 543, width: 30, height: 30 }, C.red, "none", "ellipse");
  shape(slide, { left: 990, top: 543, width: 30, height: 30 }, C.navy, "none", "ellipse");
  textBox(slide, "现在：梳理车辆与优惠资格", { left: 96, top: 582, width: 360, height: 32 }, { fontSize: 15, bold: true, color: C.red });
  textBox(slide, "2027-01-01：按规定缴纳车船税", { left: 796, top: 582, width: 350, height: 32 }, { fontSize: 15, bold: true, color: C.navy, alignment: "right" });
}

// 5 Shared services
{
  const p = data.policies[2]; const slide = deck.slides.add(); addChrome(slide, 5, p.category); addTitle(slide, "财务共享强调标准化，但不会转移法定责任", p.document_no);
  const sharedCards = [
    ["标准化", "会计政策、单据附件、主数据和审批权限统一标准"],
    ["数据治理", "跨系统数据质量和异常处理成为内控重点"],
    ["监控预警", "建立主数据、异常事项和税务风险监控机制"],
    ["责任边界", "共享服务不转移单位及负责人的法定责任"],
  ];
  sharedCards.forEach((item, i) => card(slide, 76 + i * 274, 234, 252, 126, item[0], item[1], i === 3 ? C.red : C.navy));
  shape(slide, { left: 76, top: 390, width: 1072, height: 178 }, C.white, C.line, "rect");
  textBox(slide, "建议行动", { left: 102, top: 414, width: 200, height: 32 }, { fontSize: 17, bold: true, color: C.navy });
  textBox(slide, bullets(p.actions), { left: 104, top: 458, width: 980, height: 92 }, { fontSize: 17, color: C.ink });
  textBox(slide, "共享中心可以承接流程，但单位及负责人依法承担的责任不随之转移。", { left: 78, top: 600, width: 1068, height: 36 }, { fontSize: 14, bold: true, color: C.red });
}

// 6 Accounting interpretation
{
  const p = data.policies[3]; const slide = deck.slides.add(); addChrome(slide, 6, p.category); addTitle(slide, "解释第20号需要同步评估判断、期初调整与披露", p.document_no);
  const steps = [
    ["01", "识别事项", "金融资产、外币交易、境外经营"],
    ["02", "形成判断", "合同现金流特征与会计处理底稿"],
    ["03", "计算调整", "评估2026年1月1日期初影响"],
    ["04", "完成披露", "报表列报、附注与审计沟通"],
  ];
  steps.forEach((s, i) => {
    const x = 76 + i * 274;
    shape(slide, { left: x, top: 246, width: 252, height: 246 }, C.white, C.line, "rect");
    textBox(slide, s[0], { left: x + 20, top: 266, width: 64, height: 44 }, { fontSize: 28, bold: true, color: i === 0 ? C.red : C.navy });
    textBox(slide, s[1], { left: x + 20, top: 332, width: 210, height: 32 }, { fontSize: 17, bold: true, color: C.navy });
    textBox(slide, s[2], { left: x + 20, top: 382, width: 210, height: 78 }, { fontSize: 15, color: C.ink });
  });
  textBox(slide, p.summary, { left: 78, top: 538, width: 1068, height: 86 }, { fontSize: 15, color: C.ink });
}

// 7 Actions
{
  const slide = deck.slides.add(); addChrome(slide, 7, "行动清单"); addTitle(slide, "四项行动按时限推进，今天先关闭申报事项", "ACTION BOARD");
  data.actions.forEach((a, i) => {
    const y = 230 + i * 92;
    shape(slide, { left: 76, top: y, width: 1070, height: 76 }, C.white, C.line, "rect");
    shape(slide, { left: 76, top: y, width: 8, height: 76 }, a.priority === "高" ? C.red : C.navy, "none", "rect");
    textBox(slide, a.priority, { left: 100, top: y + 21, width: 56, height: 28 }, { fontSize: 15, bold: true, color: a.priority === "高" ? C.red : C.navy });
    textBox(slide, a.action, { left: 172, top: y + 15, width: 610, height: 50 }, { fontSize: 15, bold: true, color: C.ink });
    textBox(slide, a.owner, { left: 810, top: y + 15, width: 160, height: 48 }, { fontSize: 13, color: C.muted });
    textBox(slide, a.deadline, { left: 982, top: y + 15, width: 142, height: 48 }, { fontSize: 13, bold: true, color: C.navy, alignment: "right" });
  });
}

// 8 Sources
{
  const slide = deck.slides.add(); addChrome(slide, 8, "资料来源"); addTitle(slide, "全部信息均可追溯至官方公开文件", "OFFICIAL SOURCES");
  data.policies.forEach((p, i) => {
    const y = 226 + i * 94;
    textBox(slide, p.id, { left: 76, top: y, width: 46, height: 32 }, { fontSize: 13, bold: true, color: C.red });
    textBox(slide, p.source_title, { left: 132, top: y, width: 670, height: 34 }, { fontSize: 15, bold: true, color: C.navy });
    textBox(slide, `${p.document_no}  ·  ${p.source_url}`, { left: 132, top: y + 38, width: 980, height: 40 }, { fontSize: 11, color: C.muted });
    shape(slide, { left: 132, top: y + 82, width: 980, height: 1 }, C.line, "none", "rect");
  });
  shape(slide, { left: 76, top: 616, width: 1070, height: 40 }, C.soft, "none", "rect");
  textBox(slide, data.meta.disclaimer, { left: 94, top: 626, width: 1034, height: 26 }, { fontSize: 11, color: C.muted });
}

await fs.mkdir(path.dirname(outputPath), { recursive: true });
const previewDir = path.join(path.dirname(outputPath), "previews", "ppt");
await fs.mkdir(previewDir, { recursive: true });
for (const [i, slide] of deck.slides.items.entries()) {
  const png = await deck.export({ slide, format: "png", scale: 1 });
  await fs.writeFile(path.join(previewDir, `slide-${String(i + 1).padStart(2, "0")}.png`), new Uint8Array(await png.arrayBuffer()));
  const layout = await slide.export({ format: "layout" });
  await fs.writeFile(path.join(previewDir, `slide-${String(i + 1).padStart(2, "0")}.layout.json`), await layout.text(), "utf8");
}
const montage = await deck.export({ format: "webp", montage: true, scale: 1 });
await fs.writeFile(path.join(previewDir, "deck-montage.webp"), new Uint8Array(await montage.arrayBuffer()));
const pptx = await PresentationFile.exportPptx(deck);
await pptx.save(outputPath);
console.log(outputPath);
