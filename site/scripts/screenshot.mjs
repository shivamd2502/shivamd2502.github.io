// Visual check: opens the local preview in headless Edge and saves viewport screenshots
// while scrolling. Usage: node scripts/screenshot.mjs <url> <outDir> [width] [height]
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const [url = "http://localhost:4173/", out = "shots", W = "1440", H = "900", WAIT = "2500"] = process.argv.slice(2);
const width = Number(W), height = Number(H);
mkdirSync(out, { recursive: true });

const edgeCandidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const edge = edgeCandidates.find(existsSync);
const port = 9333 + Math.floor(Math.random() * 500);
const proc = spawn(edge, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`,
  `--user-data-dir=${join(tmpdir(), "edge-shot-" + port)}`, `--window-size=${width},${height}`, "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    target = list.find((t) => t.type === "page");
  } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 600 });
await send("Page.enable");
await send("Page.navigate", { url });
await sleep(Number(WAIT));
const evalJs = async (expr) => (await send("Runtime.evaluate", { expression: expr, returnByValue: true })).result.result.value;
const total = await evalJs("document.documentElement.scrollHeight");
let n = 0;
for (let y = 0; y < total; y += height) {
  await evalJs(`window.scrollTo(0, ${y})`);
  await sleep(1100);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(join(out, `view_${String(n++).padStart(2, "0")}.png`), Buffer.from(shot.result.data, "base64"));
}
console.log(`page height ${total}px, saved ${n} screenshots to ${out}`);
ws.close();
proc.kill();
process.exit(0);
