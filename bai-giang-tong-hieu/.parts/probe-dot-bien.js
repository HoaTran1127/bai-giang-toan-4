// PROBE ĐỘT BIẾN của BÀI 3: phá từng luật một trên BẢN SAO, chạy máy tự kiểm, luật phải BÁO LỖI.
//   node bai-giang-tong-hieu/.parts/probe-dot-bien.js
// Luật nào im lặng = luật giả (đã từng im lặng và để lọt 2 lỗi thật ngày 21/10 — xem README Vòng 65).
// Mỗi M phải: (a) tìm thấy chuỗi gốc trong file giao, (b) làm tuKiem() báo lỗi. Bản GỐC phải 0 lỗi.
// Exit code: 0 = GỐC sạch và 100% đột biến bị bắt.
const D = require("./dung-chung.js");
const fs = require("fs");
const src = fs.readFileSync(D.SRC, "utf8");

// [mã, mô tả luật bị phá, chuỗi gốc, chuỗi thay]
const MUT = [
  ["GỐC", "bản giao phải 0 lỗi", null, null],
  ["M1", "quy data-loai ô trong khung thành chữ tắt t/h (lỗi thật 21/10)",
    'data-loai="\' + tenLoai + \'"', 'data-loai="\' + loai + \'"'],
  ["M2", "xongSoDo quên hiện số TỔNG (lỗi thật 21/10: câu HIỆU in sẵn vĩnh viễn ?)",
    "  hienSo(id, 't'); hienSo(id, 'h');", "  hienSo(id, 'h');"],
  ["M3", "thẻ mang cả dấu phép tính thay vì chỉ một số",
    "giai: 1, loai: 'tong', gia: x, txt: x", "giai: 1, loai: 'tong', gia: x, txt: x + ' + 1'"],
  ["M4", "khung HIỆU mở sẵn từ đầu (đòi bé làm hai khung một lúc)",
    "dong('h', 'HIỆU', kH, kT.so.length > 0)", "dong('h', 'HIỆU', kH, false)"],
  ["M5", "khung TỔNG bị giấu",
    "dong('t', 'TỔNG', kT, false)", "dong('t', 'TỔNG', kT, true)"],
  ["M6", "câu chấm điểm không vẽ sơ đồ (lỗi cô gạch hôm trước)",
    "  html += veBuKeo(i, j) + veSoDoKeo(i, j)", "  if (!laCapCham(i)) html += veBuKeo(i, j) + veSoDoKeo(i, j)"],
  ["M7", "bỏ ô điền đáp án",
    '<div class="qrow"><input type="number" id="nhap-', '<div class="qrow"><span id="nhap-'],
  ["M8", "nhãn tên không phải chữ của lời đề",
    "ten: ['giá sách thứ hai', 'giá sách thứ nhất']", "ten: ['bạn An', 'giá sách thứ nhất']"],
  ["M9", "ô trống nhận cả số KHÔNG có trong đề (hằng số phương pháp, kết quả trung gian)",
    "  return new RegExp('(^|[^0-9])' + t + '([^0-9]|$)').test(van);", "  return true;"],
  ["M10", "số in trên khung báo sai giá trị khung phải ra",
    'data-gia-tri="\' + khu.giaTri + \'"', 'data-gia-tri="\' + (Number(khu.giaTri) + 1) + \'"'],
  ["M11", "luôn hiện sẵn số trên sơ đồ (che mất bước bé phải tự tính)",
    "(khu.so.length ? ' cho' : '')", "(false ? ' cho' : '')"],
  ["M12", "khay thẻ thiếu thẻ số của khung TỔNG",
    "kT.so.forEach(function (x) { c.push({ giai: 1, loai: 'tong', gia: x, txt: x }); });",
    "kT.so.slice(0, 1).forEach(function (x) { c.push({ giai: 1, loai: 'tong', gia: x, txt: x }); });"],
  ["M13", "thẻ HIỆU bày ra cùng lúc với thẻ TỔNG (giai đoạn 1 thừa thẻ)",
    "c.push({ giai: doiGiai ? 2 : 1, loai: 'hieu'", "c.push({ giai: 1, loai: 'hieu'"],
  ["M14", "nhãn khay thẻ luôn hứa \"tính\" dù khung chỉ có một ô số lấy thẳng từ đề",
    "var tinh = khu.tokens.some(function (t) { return t.d != null; }) || khu.so.length > 1;", "var tinh = true;"],
];

const PROBE = String.raw`
<script>
window.addEventListener('load', function () {
  setTimeout(function () {
    var out;
    try {
      var kq = tuKiem();
      out = { n: kq.n, loi: kq.err.length, dau: kq.err.slice(0, 3) };
    } catch (e) { out = { crash: String(e) }; }
    document.getElementById('qc-out').textContent = 'QCJSON ' + JSON.stringify(out);
  }, 700);
});
</script></body>`;

const files = [];
MUT.forEach((x, idx) => {
  const [ma, mo, goc, thay] = x;
  let s = src;
  if (goc) {
    const dem = s.split(goc).length - 1;
    if (dem < 1) { console.log("⚠ " + ma + " KHÔNG TÌM THẤY chuỗi gốc: " + goc.slice(0, 50)); files.push({ ma, idx, mo, thieu: true }); return; }
    s = s.replace(goc, thay);
    if (s === src) { console.log("⚠ " + ma + " thay không đổi"); files.push({ ma, idx, mo, thieu: true }); return; }
    if (dem > 1) console.log("  (" + ma + " chuỗi gốc xuất hiện " + dem + " lần — đột biến lần đầu)");
  }
  const f = "dot-" + idx + ".html";
  D.ghi(f, s.replace("</body>", '<pre id="qc-out">…</pre>' + PROBE));
  files.push({ ma, idx, mo, f });
});

const ifr = files.map(x => `<iframe data-ma="${x.ma}" data-idx="${x.idx}" style="width:900px;height:800px;border:0;display:block" src="${x.f || "dot-0.html"}"></iframe>`).join("");
const wrap = `<!doctype html><meta charset="utf-8"><style>body{margin:0;font:11px monospace}</style>
${ifr}<div id="box">${files.map(x => `<div id="r-${x.idx}" style="display:none"></div>`).join("")}</div>
<pre id="all">…</pre>
<script>
var fr = [].slice.call(document.querySelectorAll('iframe'));
var done = 0;
addEventListener('load', function(){ setTimeout(check, 5000); });
function check(){
  fr.forEach(function(f){
    if (f._x) return;
    var i = f.getAttribute('data-idx');
    try {
      var t = f.contentDocument.getElementById('qc-out').textContent;
      if (/QCJSON/.test(t)) { document.getElementById('r-' + i).textContent = t; f._x = 1; done++; }
    } catch(e) { document.getElementById('r-' + i).textContent = JSON.stringify({crash:'doc ' + e}); f._x = 1; done++; }
  });
  if (done < fr.length) setTimeout(check, 900); else finish();
}
function finish(){
  document.getElementById('all').textContent = 'ALL ' + JSON.stringify(fr.map(function(f){
    var i = f.getAttribute('data-idx');
    var t = document.getElementById('r-' + i).textContent || '';
    try { return [f.getAttribute('data-ma'), JSON.parse(t.slice(7))]; } catch(e) { return [f.getAttribute('data-ma'), { crash: t.slice(0, 200) }]; }
  }));
}
</script>`;
const uWrap = D.ghi("dot-bien-wrap.html", wrap);

// probe thiếu chuỗi gốc (file không đột biến được) coi là hỏng ngay từ đầu
let gia = files.filter(x => x.thieu).length;

const dom = D.dump(uWrap, 150000);
const m = /ALL (\[[\s\S]*?)<\/pre>/.exec(dom);
if (!m) { console.log(dom.slice(0, 2000)); process.exit(1); }
const kq = JSON.parse(m[1]);

console.log("\n" + "MÃ".padEnd(5) + "KẾT QUẢ".padEnd(16) + "LUẬT BỊ PHÁ");
kq.forEach(([ma, r]) => {
  const goc = ma === "GỐC";
  const mo = MUT.find(x => x[0] === ma)[1];
  if (r.crash) { console.log(ma.padEnd(5) + "Crash!".padEnd(16) + mo + " :: " + String(r.crash).slice(0, 90)); if (!goc) gia++; return; }
  const ok = goc ? r.loi === 0 : r.loi > 0;
  if (!ok) gia++;
  console.log(ma.padEnd(5) + (goc ? (ok ? "0 lỗi ✓" : "CÒN LỖI ✕") : (ok ? "bắt ✓ (" + r.loi + ")" : "IM LẶNG ✕")).padEnd(16) + mo);
  if (!goc && r.loi > 0) (r.dau || []).forEach(d => console.log("        ↳ " + String(d).slice(0, 120)));
  if (goc && r.loi > 0) (r.dau || []).forEach(d => console.log("        ✕ " + String(d).slice(0, 140)));
});
console.log("\nĐỘT BIẾN LUẬT GIẢ / GỐC CÒN LỖI / CHUỖI GỐC MẤT: " + gia + "  (trên " + (MUT.length - 1) + " luật có probe)");
process.exitCode = gia ? 1 : 0;
