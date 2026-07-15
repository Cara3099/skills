import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { loadArtifactTool } from "./load_artifact_tool.mjs";

const { SpreadsheetFile, Workbook } = await loadArtifactTool();

const [dataArg, outputArg, skillArg] = process.argv.slice(2);
if (!dataArg || !outputArg) {
  throw new Error("用法: generate_xlsx.mjs <content.json> <output.xlsx> [skill-root]");
}

const dataPath = path.resolve(dataArg);
const outputPath = path.resolve(outputArg);
const skillRoot = skillArg ? path.resolve(skillArg) : path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const data = JSON.parse(await fs.readFile(dataPath, "utf8"));
const logoBytes = await fs.readFile(path.join(skillRoot, "assets/brand/qijia-logo.png"));
const logoData = `data:image/png;base64,${logoBytes.toString("base64")}`;

const C = {
  navy: "#172A4A", red: "#CE2A2A", ink: "#15181D", paper: "#F7F5EF",
  soft: "#EDF2F8", line: "#D8DCE2", muted: "#68717F", white: "#FFFFFF",
};

const wb = Workbook.create();
const summary = wb.worksheets.add("政策摘要");
const actions = wb.worksheets.add("行动清单");
const sources = wb.worksheets.add("政策来源");

function setTitle(sheet, title, subtitle, endCol) {
  sheet.showGridLines = false;
  sheet.mergeCells(`B1:${endCol}1`);
  sheet.getRange("B1").values = [[data.meta.brand]];
  sheet.getRange(`A1:${endCol}1`).format = {
    fill: C.white,
    font: { bold: true, color: C.navy, size: 17 },
    verticalAlignment: "center",
    borders: { bottom: { style: "medium", color: C.red } },
  };
  sheet.getRange(`A1:${endCol}1`).format.rowHeight = 52;
  sheet.getRange("A:A").format.columnWidth = 11;
  sheet.images.add({
    dataUrl: logoData,
    anchor: { from: { row: 0, col: 0 }, extent: { widthPx: 42, heightPx: 48 } },
  });
  sheet.mergeCells(`A2:${endCol}2`);
  sheet.getRange("A2").values = [[title]];
  sheet.getRange(`A2:${endCol}2`).format = {
    fill: C.navy,
    font: { bold: true, color: C.white, size: 18 },
    verticalAlignment: "center",
  };
  sheet.getRange(`A2:${endCol}2`).format.rowHeight = 34;
  sheet.mergeCells(`A3:${endCol}3`);
  sheet.getRange("A3").values = [[subtitle]];
  sheet.getRange(`A3:${endCol}3`).format = {
    fill: C.paper,
    font: { color: C.muted, size: 10 },
    verticalAlignment: "center",
  };
  sheet.getRange(`A3:${endCol}3`).format.rowHeight = 26;
}

function styleHeader(range) {
  range.format = {
    fill: C.navy,
    font: { bold: true, color: C.white, size: 10 },
    horizontalAlignment: "left",
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "outside", style: "thin", color: C.navy },
  };
  range.format.rowHeight = 28;
}

function styleBody(range) {
  range.format = {
    font: { color: C.ink, size: 10 },
    verticalAlignment: "top",
    wrapText: true,
    borders: {
      insideHorizontal: { style: "thin", color: C.line },
      bottom: { style: "thin", color: C.line },
    },
  };
}

// 政策摘要
setTitle(summary, data.meta.title, `${data.meta.subtitle}  ·  ${data.meta.issue}`, "I");
summary.getRange("A5:I5").values = [["编号", "政策类别", "政策标题", "文号", "发布日期", "实施/关注", "优先级", "责任角色", "核心影响"]];
styleHeader(summary.getRange("A5:I5"));
const policyRows = data.policies.map((p) => [
  p.id, p.category, p.title, p.document_no, p.published, p.effective, p.priority, p.owner, p.impacts.join("；"),
]);
summary.getRange(`A6:I${5 + policyRows.length}`).values = policyRows;
styleBody(summary.getRange(`A6:I${5 + policyRows.length}`));
summary.getRange(`A6:A${5 + policyRows.length}`).format.font = { bold: true, color: C.navy };
summary.getRange(`G6:G${5 + policyRows.length}`).format.font = { bold: true, color: C.navy };
data.policies.forEach((p, i) => {
  if (p.priority === "高") summary.getRange(`G${6 + i}`).format.font = { bold: true, color: C.red };
});
summary.getRange(`A6:I${5 + policyRows.length}`).format.rowHeight = 72;
summary.getRange("A:A").format.columnWidth = 8;
summary.getRange("B:B").format.columnWidth = 12;
summary.getRange("C:C").format.columnWidth = 35;
summary.getRange("D:D").format.columnWidth = 28;
summary.getRange("E:F").format.columnWidth = 13;
summary.getRange("G:G").format.columnWidth = 10;
summary.getRange("H:H").format.columnWidth = 18;
summary.getRange("I:I").format.columnWidth = 48;
summary.freezePanes.freezeRows(5);
const countRow = 8 + policyRows.length;
summary.getRange(`A${countRow}:I${countRow}`).format = { fill: C.soft, font: { bold: true, color: C.navy } };
summary.getRange(`A${countRow}:C${countRow}`).merge();
summary.getRange(`A${countRow}`).values = [["本期政策统计"]];
summary.getRange(`D${countRow}`).values = [["政策数"]];
summary.getRange(`E${countRow}`).formulas = [[`=COUNTA(A6:A${5 + policyRows.length})`]];
summary.getRange(`F${countRow}`).values = [["高优先级"]];
summary.getRange(`G${countRow}`).formulas = [[`=COUNTIF(G6:G${5 + policyRows.length},"高")`]];
summary.getRange(`H${countRow}`).values = [["行动事项"]];
summary.getRange(`I${countRow}`).formulas = [[`=COUNTA('行动清单'!B6:B${5 + data.actions.length})`]];
summary.getRange(`A${countRow}:I${countRow}`).format.rowHeight = 30;

// 行动清单
setTitle(actions, "政策行动清单", `责任分工与执行进度  ·  更新日期 ${data.meta.date}`, "G");
actions.getRange("A5:G5").values = [["优先级", "行动事项", "责任角色", "建议时限", "状态", "政策编号", "完成说明"]];
styleHeader(actions.getRange("A5:G5"));
const actionRows = data.actions.map((a) => [a.priority, a.action, a.owner, a.deadline, a.status, a.policy_id, ""]);
actions.getRange(`A6:G${5 + actionRows.length}`).values = actionRows;
styleBody(actions.getRange(`A6:G${5 + actionRows.length}`));
actions.getRange(`A6:A${5 + actionRows.length}`).format.font = { bold: true, color: C.navy };
data.actions.forEach((a, i) => {
  if (a.priority === "高") actions.getRange(`A${6 + i}`).format.font = { bold: true, color: C.red };
});
actions.getRange(`E6:E${5 + actionRows.length}`).format = { fill: C.soft, font: { bold: true, color: C.navy }, horizontalAlignment: "center" };
actions.getRange(`A6:G${5 + actionRows.length}`).format.rowHeight = 60;
actions.getRange("A:A").format.columnWidth = 10;
actions.getRange("B:B").format.columnWidth = 58;
actions.getRange("C:C").format.columnWidth = 22;
actions.getRange("D:D").format.columnWidth = 18;
actions.getRange("E:E").format.columnWidth = 14;
actions.getRange("F:F").format.columnWidth = 12;
actions.getRange("G:G").format.columnWidth = 34;
actions.freezePanes.freezeRows(5);
const actionCountRow = 8 + actionRows.length;
actions.getRange(`A${actionCountRow}:G${actionCountRow}`).format = { fill: C.paper, font: { bold: true, color: C.navy } };
actions.getRange(`A${actionCountRow}`).values = [["统计"]];
actions.getRange(`B${actionCountRow}`).values = [["待处理"]];
actions.getRange(`C${actionCountRow}`).formulas = [[`=COUNTIF(E6:E${5 + actionRows.length},"待处理")`]];
actions.getRange(`D${actionCountRow}`).values = [["已完成"]];
actions.getRange(`E${actionCountRow}`).formulas = [[`=COUNTIF(E6:E${5 + actionRows.length},"已完成")`]];

// 政策来源
setTitle(sources, "政策来源", "官方文件与公开链接  ·  建议在使用前再次核验现行有效性", "G");
sources.getRange("A5:G5").values = [["编号", "政策标题", "文号", "发布日期", "官方来源标题", "官方链接", "核验提示"]];
styleHeader(sources.getRange("A5:G5"));
const sourceRows = data.policies.map((p) => [p.id, p.title, p.document_no, p.published, p.source_title, p.source_url, "以现行有效法规及主管机关口径为准"]);
sources.getRange(`A6:G${5 + sourceRows.length}`).values = sourceRows;
styleBody(sources.getRange(`A6:G${5 + sourceRows.length}`));
sources.getRange(`A6:G${5 + sourceRows.length}`).format.rowHeight = 70;
sources.getRange("A:A").format.columnWidth = 8;
sources.getRange("B:B").format.columnWidth = 38;
sources.getRange("C:C").format.columnWidth = 28;
sources.getRange("D:D").format.columnWidth = 13;
sources.getRange("E:E").format.columnWidth = 42;
sources.getRange("F:F").format.columnWidth = 62;
sources.getRange("G:G").format.columnWidth = 30;
sources.freezePanes.freezeRows(5);
const noteRow = 8 + sourceRows.length;
sources.mergeCells(`A${noteRow}:G${noteRow + 1}`);
sources.getRange(`A${noteRow}`).values = [[data.meta.disclaimer]];
sources.getRange(`A${noteRow}:G${noteRow + 1}`).format = {
  fill: C.paper, font: { color: C.muted, size: 10 }, wrapText: true,
  verticalAlignment: "center", borders: { preset: "outside", style: "thin", color: C.navy },
};

await fs.mkdir(path.dirname(outputPath), { recursive: true });
const xlsx = await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(outputPath);

const previewDir = path.join(path.dirname(outputPath), "previews");
await fs.mkdir(previewDir, { recursive: true });
for (const name of ["政策摘要", "行动清单", "政策来源"]) {
  const preview = await wb.render({ sheetName: name, autoCrop: "all", scale: 1, format: "png" });
  await fs.writeFile(path.join(previewDir, `${name}.png`), new Uint8Array(await preview.arrayBuffer()));
}
const inspect = await wb.inspect({ kind: "sheet,formula", maxChars: 6000, tableMaxRows: 8, tableMaxCols: 10 });
await fs.writeFile(path.join(previewDir, "workbook-inspect.ndjson"), inspect.ndjson, "utf8");
console.log(outputPath);
