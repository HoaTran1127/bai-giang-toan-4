// MÁY TỰ KIỂM BÀI 3 chạy bằng node (không cần mở trình duyệt bằng tay):
//   node bai-giang-tong-hieu/.parts/harness.js
// 1) Nạp <script> của trang bằng vm — cú pháp phải sạch, chỉ có ĐÚNG MỘT script inline.
// 2) Chạy tuKiem() CỦA TRANG trong Chrome headless trên CHÍNH FILE GIAO, in lỗi + số mục khớp.
// Exit code: 0 = sạch, khác 0 = có lỗi (dùng được trước khi push).
const vm = require("vm");
const D = require("./dung-chung.js");

const src = require("fs").readFileSync(D.SRC, "utf8");
let loi = 0;

// ---- 1. CÚ PHÁP + HÌNH THỂ FILE ----
const scripts = [...src.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if (scripts.length !== 1) {
  console.log("✕ trang phải có ĐÚNG MỘT <script> inline, đang có " + scripts.length);
  loi++;
} else {
  try {
    new vm.Script(scripts[0]);
    console.log("✓ cú pháp OK · " + Buffer.byteLength(src) + " byte");
  } catch (e) {
    console.log("✕ CÚ PHÁP HỎNG: " + e.message);
    loi++;
  }
}

// ---- 2. tuKiem() TRONG TRÌNH DUYỆT ----
const ham = String.raw`function () {
  var kq = tuKiem();
  return { n: kq.n, tongCau: kq.tongCau, chan: (kq.err || []).length, err: kq.err,
           foot: document.getElementById("footer-stamp").textContent,
           an: document.getElementById("self-test-alert").classList.contains("hidden") };
}`;
const u = D.trang_probe("harness.html", D.do_probe(ham, 700));
const r = D.ket_qua(D.dump(u, 30000));

console.log("số mục kiểm = " + r.n + " · số câu = " + r.tongCau + " · lỗi = " + r.chan);
(r.err || []).forEach(l => console.log("  ✕ " + l));
console.log("footer: " + r.foot);
if (r.chan) loi++;
if (!r.an) { console.log("✕ #self-test-alert vẫn hiện — máy tự kiểm đang báo đỏ trên trang"); loi++; }

console.log(loi ? "=== CO LOI (" + loi + ") ===" : "=== KHONG PHAT HIEN LOI ===");
process.exitCode = loi ? 1 : 0;
