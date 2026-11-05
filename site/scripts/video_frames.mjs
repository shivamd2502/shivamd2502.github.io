// Checks the intro video: prints duration/resolution and saves frames at several timestamps.
// Usage: node scripts/video_frames.mjs <siteUrl> <outDir>
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const [url = "http://localhost:4173/", out = "frames"] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const edge = ["C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"].find(existsSync);
const port = 9900 + Math.floor(Math.random() * 300);
const proc = spawn(edge, ["--headless=new", "--autoplay-policy=no-user-gesture-required", `--remote-debugging-port=${port}`,
  `--user-data-dir=${join(tmpdir(), "edge-vid-" + port)}`, "--window-size=1440,900", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) { await sleep(200); try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page"); } catch {} }
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pending = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => (await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true })).result.result.value;

await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url });
await sleep(1500);
const meta = await ev(`new Promise(r => { const v = document.querySelector('video'); if (!v) return r(null);
  const f = () => r({ duration: v.duration, w: v.videoWidth, h: v.videoHeight, playing: !v.paused, t: v.currentTime });
  v.readyState >= 1 ? f() : v.addEventListener('loadedmetadata', f, { once: true }); })`);
console.log("video:", JSON.stringify(meta));
if (meta) {
  for (const frac of [0.05, 0.3, 0.55, 0.8, 0.97]) {
    const t = meta.duration * frac;
    await ev(`new Promise(r => { const v = document.querySelector('video'); v.pause(); v.currentTime = ${t}; v.addEventListener('seeked', () => r(1), { once: true }); })`);
    await sleep(250);
    const shot = await send("Page.captureScreenshot", { format: "png" });
    writeFileSync(join(out, `frame_${frac.toFixed(2)}.png`), Buffer.from(shot.result.data, "base64"));
  }
}
ws.close(); proc.kill(); process.exit(0);
