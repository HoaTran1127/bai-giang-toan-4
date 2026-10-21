// Đồ dùng chung cho các probe của BÀI 3 (Tổng và Hiệu — Tìm hai số).
// Mọi probe nạp đúng FILE GIAO `../index.html` — đo trên file sẽ push, không đo bản nháp.
// Trang dựng tạm nằm trong thư mục tạm của hệ thống, KHÔNG nằm trong repo.
const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFileSync } = require("child_process");

const SRC = path.join(__dirname, "..", "index.html");
const TMP = path.join(os.tmpdir(), "qc-bai-3");
fs.mkdirSync(TMP, { recursive: true });

const url = t => "file:///" + path.join(TMP, t).replace(/\\/g, "/");

function chrome() {
  const may = [
    process.env.CHROME,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    path.join(process.env.LOCALAPPDATA || "", "Google/Chrome/Application/chrome.exe"),
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  const co = may.find(p => { try { return fs.statSync(p).isFile(); } catch (e) { return false; } });
  if (!co) { console.log("KHONG TIM THAY CHROME — probe cần Chrome chạy headless (hoặc đặt CHROME=<đường dẫn>)."); process.exit(1); }
  return co;
}

/** Ghi một trang/html bất kỳ vào thư mục tạm, trả về URL file:/// */
function ghi(ten, noi) {
  fs.writeFileSync(path.join(TMP, ten), noi);
  return url(ten);
}

/** Chụp DOM trang bằng Chrome headless (--dump-dom), trả về HTML text. */
function dump(u, budget) {
  return execFileSync(chrome(), [
    "--headless=new", "--disable-gpu", "--allow-file-access-from-files",
    "--virtual-time-budget=" + (budget || 30000), "--dump-dom", u,
  ], { maxBuffer: 1 << 27, encoding: "utf8" });
}

/** Script probe: chờ trang ổn định, chạy HÀM (nguyên văn), in kết quả có marker QCJSON. */
function do_probe(ham, doi_ms) {
  return '<script>\nwindow.addEventListener("load", function () {\n  setTimeout(function () {\n' +
    '    try { document.getElementById("qc-out").textContent = "QCJSON " + JSON.stringify((' + ham + ")()); }\n" +
    '    catch (e) { document.getElementById("qc-out").textContent = "QCERR " + e + " | " + (e.stack || ""); }\n' +
    "  }, " + (doi_ms || 600) + ");\n});\n<\/script>";
}

/** Dựng TRANG PROBE: nạp file bài giảng, chèn style phụ + probe, ghi ra tạm, trả về URL. */
function trang_probe(ten, probe, dinh_kem) {
  const src = fs.readFileSync(SRC, "utf8");
  return ghi(ten, src.replace("</body>", (dinh_kem || "") + '<pre id="qc-out">…</pre>' + probe + "</body>"));
}

/** Moi khối JSON marker ra khỏi DOM; không thấy thì in DOM và exit 1. */
function moi(dom, marker) {
  const m = new RegExp(marker + " ([\\s\\S]*?)<\\/pre>").exec(dom);
  if (!m) { console.log(dom.slice(0, 2500)); process.exit(1); }
  return JSON.parse(m[1]);
}

/** Đọc kết quả probe từ DOM dump; QCERR (probe ném lỗi) coi như hỏng. */
function ket_qua(dom) {
  const r = moi(dom, "QCJSON");
  if (r.qcerr) { console.log("✕ PROBE CHẠY HỎNG: " + r.qcerr); process.exit(1); }
  return r;
}

module.exports = { SRC, TMP, url, chrome, ghi, dump, do_probe, trang_probe, moi, ket_qua };
