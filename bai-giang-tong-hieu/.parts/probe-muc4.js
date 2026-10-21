// PROBE MỤC 4 của BÀI 3: chạy máy cắt thanh qua cả 5 bước trên CHÍNH file giao, đòi
//   (a) không bước nào crash,  (b) hai ô công thức luôn kết thúc bằng "= ?" (bé tự tính),
//   (c) #may-lenh luôn là CÔNG THỨC CHUNG và không chứa số của thế số máy,
//   (d) số cụ thể chỉ hiện trên sơ đồ, B4 hai thanh phải cùng ghi giá trị của SỐ LỚN.
// Chạy: node bai-giang-tong-hieu/.parts/probe-muc4.js      (exit 0 = đạt)
const D = require("./dung-chung.js");

const PROBE = String.raw`
var out = [];
for (var b = 0; b <= 4; b++) {
  may.b = b; veMay();
  var bd = document.getElementById('may-board');
  out.push({
    b: b,
    be: document.getElementById('ct-be-f').innerText,
    lon: document.getElementById('ct-lon-f').innerText,
    lenh: String(document.getElementById('may-lenh').textContent),
    gia: [].slice.call(bd.querySelectorAll('.gia')).map(function (e) { return e.textContent; }).join('·'),
    so: (bd.textContent.match(/\d+/g) || []).length
  });
}
may.b = 0; veMay();
return { out: out, t: may.t, h: may.h, loi: tuKiem().err };`;

const u = D.trang_probe("muc4.html", D.do_probe("function(){\n" + PROBE + "\n}", 900), "");
const r = D.ket_qua(D.dump(u, 60000));
const sai = [];

r.out.forEach(function (x) {
  const buoc = "B" + x.b;
  if (!/\?\s*$/.test(x.be)) sai.push(buoc + ": ô công thức SỐ BÉ không để \"?\" — \"" + x.be + "\"");
  if (!/\?\s*$/.test(x.lon)) sai.push(buoc + ": ô công thức SỐ LỚN không để \"?\" — \"" + x.lon + "\"");
  if (x.lenh.indexOf("(TỔNG − HIỆU) ÷ 2") < 0 || x.lenh.indexOf("(TỔNG + HIỆU) ÷ 2") < 0)
    sai.push(buoc + ": #may-lenh mất CÔNG THỨC CHUNG — \"" + x.lenh.slice(0, 60) + "\"");
  if (x.lenh.indexOf(String(r.t)) >= 0 || x.lenh.indexOf(String(r.h)) >= 0)
    sai.push(buoc + ": #may-lenh chứa số của máy (" + r.t + " / " + r.h + ") — công thức chung phải đứng yên");
  console.log(buoc.padEnd(4) + " | " + x.be.padEnd(20) + " | " + x.lon.padEnd(20) +
    " | so tren so do: " + (x.so || "0") + (x.gia ? " | cột giá trị: " + x.gia : ""));
});

const b4 = r.out[4];
if (!b4.gia || !/^(\d+)·\1$/.test(b4.gia))
  sai.push("B4: cột giá trị hai thanh phải GIỐNG NHAU (đang \"" + b4.gia + "\")");
if (r.loi.length) r.loi.forEach(function (e) { sai.push("tuKiem: " + e); });

console.log("\n" + (sai.length ? "✕ MỤC 4 CÓ " + sai.length + " LỖI" : "=== MỤC 4 ĐẠT: 5 bước chạy sạch · công thức để \"?\" · #may-lenh là công thức chung ==="));
sai.forEach(function (e) { console.log("  • " + e); });
process.exitCode = sai.length ? 1 : 0;
