// CHUP ẢNH MỤC 7 bằng Chrome headless để MẮT NGƯỜI xem được thật (không chỉ đo hộp).
//   node bai-giang-tong-hieu/.parts/chup-anh.js                     -> bộ 6 ảnh mặc định
//   node bai-giang-tong-hieu/.parts/chup-anh.js 5 0 1 760          -> 1 ảnh: cấp 5 câu 1 (j=0), ghép xong, 760px
// Ảnh PNG ghi ra thư mục tạm (đường dẫn in ở cuối), KHÔNG nằm trong repo.
const fs = require("fs");
const path = require("path");
const D = require("./dung-chung.js");
const src = fs.readFileSync(D.SRC, "utf8");

const hide = `<style>
  body > header, #hero, .hero, nav, footer { display:none !important; }
  body > div > section { display:none !important; }
  body > div > section#muc-7 { display:block !important; }
  #muc-7 .card-head { display:none !important; }
  #lv-tabs, .lv-head { display:none !important; }
</style>`;

const keo = String.raw`
function keoThe(card, loai) {
  var kt = card.querySelector('.khu.' + (loai === 't' ? 't' : 'h') + ':not(.cho)');
  var d = kt ? kt.querySelector('.drop:not(.ok)') : null;
  while (d) {
    var dap = String(d.getAttribute('data-dap')).split('|');
    var ch = [].slice.call(card.querySelectorAll('.qkeo .keo[data-loai="' + (loai === 't' ? 'tong' : 'hieu') + '"]'))
      .filter(function (e) { return e.offsetParent && dap.indexOf(String(e.getAttribute('data-gia'))) >= 0; })[0];
    if (!ch) break;
    ch.click(); d.click(); KEO = null;
    d = kt.querySelector('.drop:not(.ok)');
  }
}
function keoTen(card) {
  [].slice.call(card.querySelectorAll('.drop[data-loai="ten"]:not(.ok)')).forEach(function (d) {
    var ch = [].slice.call(card.querySelectorAll('.qkeo .keo[data-loai="ten"]'))
      .filter(function (e) { return String(e.getAttribute('data-gia')) === d.getAttribute('data-dap'); })[0];
    if (ch) { ch.click(); d.click(); KEO = null; }
  });
}
function moCau(cap, j, xongXuong) {
  var al = document.getElementById('self-test-alert'); if (al) al.style.display = 'none';
  document.getElementById('name-gate').classList.add('hidden');
  document.getElementById('practice-wrap').classList.remove('hidden');
  CO_TAT = true;
  runState = { key: 'qc', label: 'QC', attempts: {} }; nhap = {}; submitted = false;
  activeCap = cap; veDanhSach();
  var card = document.getElementById('card-cap-' + cap + '-' + j);
  if (xongXuong) {
    keoTen(card);
    keoThe(card, 't');
    var kh = document.getElementById('khu-h-' + cap + '-' + j);
    if (kh && kh.offsetParent) keoThe(card, 'h');
    var q = CAP[cap].ds[j], inp = document.getElementById('nhap-cap-' + cap + '-' + j);
    if (inp) { inp.value = String(q.ans); inp.dispatchEvent(new Event('input', { bubbles: true })); document.getElementById('btn-cap-' + cap + '-' + j).click(); }
  }
  window.scrollTo(0, card.getBoundingClientRect().top + window.scrollY - 8);
}
`;

const jobs = process.argv.length > 5
  ? [{ cap: +process.argv[2], j: +process.argv[3], xong: +process.argv[4], w: +process.argv[5],
       ten: "cap-" + process.argv[2] + "-cau-" + (Number(process.argv[3]) + 1) + (Number(process.argv[4]) ? "-xong" : "-dau") + "-" + process.argv[5] }]
  : [
      { cap: 2, j: 0, xong: 0, w: 760, ten: "cap2-luc-dau-760" },
      { cap: 2, j: 0, xong: 1, w: 760, ten: "cap2-sau-keo-760" },
      { cap: 2, j: 0, xong: 0, w: 320, ten: "cap2-luc-dau-320" },
      { cap: 2, j: 0, xong: 1, w: 320, ten: "cap2-sau-keo-320" },
      { cap: 5, j: 0, xong: 1, w: 760, ten: "cap5-cham-760" },
      { cap: 5, j: 0, xong: 0, w: 420, ten: "cap5-luc-dau-420" },
    ];

jobs.forEach(x => {
  D.ghi(x.ten + "-page.html", src.replace("</body>", hide + "<script>window.addEventListener('load',function(){setTimeout(function(){" +
    keo + "moCau(" + x.cap + "," + x.j + "," + x.xong + ");},500);});</scr" + "ipt></body>"));
  D.ghi(x.ten + ".html", `<!doctype html><meta charset="utf-8"><body style="margin:0">
<iframe style="width:${x.w}px;height:2200px;border:0;display:block" src="${x.ten}-page.html"></iframe></body>`);
  const png = path.join(D.TMP, x.ten + ".png");
  require("child_process").execFileSync(D.chrome(), ["--headless=new", "--disable-gpu", "--allow-file-access-from-files",
    "--hide-scrollbars", "--virtual-time-budget=20000", "--screenshot=" + png,
    "--window-size=" + (x.w + 20) + ",2200", D.url(x.ten + ".html")], { stdio: "ignore" });
  console.log(fs.existsSync(png) ? "✓ " + png + "  " + fs.statSync(png).size + " byte"
                                 : "✕ KHÔNG CHỤP ĐƯỢC " + x.ten);
});
