// CHUP ẢNH bằng Chrome headless để MẮT NGƯỜI xem được thật (không chỉ đo hộp).
//   node bai-giang-doi-don-vi/.parts/chup-anh.js            -> bộ ảnh mặc định (Mục 1 + phản hồi)
//   node bai-giang-doi-don-vi/.parts/chup-anh.js 5          -> chỉ ảnh số 5 trong danh sách
// Ảnh PNG ghi ra thư mục tạm, KHÔNG nằm trong repo.
const fs = require("fs");
const path = require("path");
const D = require("./dung-chung.js");
const src = fs.readFileSync(D.SRC, "utf8");

const che = muc => `<style>
  body > header, #hero, .hero, nav, footer, #co-dock { display:none !important; }
  body > div > section { display:none !important; }
  body > div > section#${muc} { display:block !important; }
  ${muc === "muc-7" ? "#name-gate, .lvl-head, #level-tabs, #progress-line { display:none !important; }" : ""}
</style>`;

// chạy ĐÚNG máy của bé: bấm thẻ rồi bấm ô / nhập thật rồi chấm — ảnh là thứ bé sẽ thấy
const may = String.raw`
function O(k, i) { return document.querySelector('#bn-' + k + ' .udigit[data-cot="' + i + '"]'); }
function CH(k) { return document.querySelector('#bn-' + k + ' .keo[data-loai="so"]'); }
function NH(k) { return document.querySelector('#bn-' + k + ' .nhay'); }
function keo(c) { var al = document.getElementById('self-test-alert'); if (al) al.style.display = 'none';
  window.scrollTo(0, c.getBoundingClientRect().top + window.scrollY - 6); }
function chay(k, D, tu, den, loi) {
  CO_TAT = true; UTAB[k].set(String(D), tu, den);
  if (loi === 'cot') { CH(k).click(); O(k, den).click(); }
  CH(k).click(); O(k, tu).click();
  if (loi === 'tat') { NH(k).click(); O(k, Math.max(tu, den)).click(); }
  var huong = den > tu ? 1 : -1, vi = tu, n = Math.abs(den - tu) - (loi === 'tat' ? 1 : 0);
  for (var j = 0; j < n; j++) {
    if (loi === 'nguoc' && j === 1) { NH(k).click(); O(k, vi - huong).click(); }
    NH(k).click(); vi += huong; O(k, vi).click();
  }
  keo(document.getElementById('bn-' + k));
}
function chiDat(k, D, tu, den) {
  CO_TAT = true; UTAB[k].set(String(D), tu, den);
  CH(k).click(); O(k, tu).click(); keo(document.getElementById('bn-' + k));
}
/* mở MỤC 7: nhập câu thật, bấm Kiểm tra, rồi cuộn tới khung phản hồi có sơ đồ nhảy */
function fb(cap, j, sai) {
  CO_TAT = true;
  document.getElementById('name-gate').classList.add('hidden');
  document.getElementById('practice-wrap').classList.remove('hidden');
  runState = { key: 'qc', label: 'QC', attempts: {} }; nhap = {}; submitted = false; curLevel = cap;
  renderTabs(); renderLevel(cap);
  var qq = LEVELS[cap].qs[j], k = qKey(cap, j);
  var inp = document.getElementById('in-' + k);
  if (!inp) return;
  inp.value = sai ? '999999' : String(qq.ans);
  checkAnswer(k);
  keo(document.getElementById('fb-' + k).parentNode);
}
`;

const danh_sach = [
  { ten: "1-len-moi-vao", muc: "muc-1", goi: "chiDat('len',5,0,3)", w: 760 },
  { ten: "2-len-3-cunhay", muc: "muc-1", goi: "chay('len',5,0,3,false)", w: 760 },
  { ten: "3-area-2-so-0", muc: "muc-1", goi: "chay('area',4,0,1,false)", w: 760 },
  { ten: "4-len-nguoc-xoa-0", muc: "muc-1", goi: "chay('len',5000,3,0,false)", w: 760 },
  { ten: "5-co-sai-do", muc: "muc-1", goi: "chay('mass',3,0,3,'tat')", w: 760 },
  { ten: "6-dien-thoai-390", muc: "muc-1", goi: "chay('len',5,0,3,'cot')", w: 390 },
  { ten: "7-pb-dung-cap2", muc: "muc-7", goi: "fb(2,0,false)", w: 760 },
  { ten: "8-pb-sai-kep-3kg45g", muc: "muc-7", goi: "fb(5,2,true)", w: 760 },
  { ten: "9-pb-sai-dien-tich", muc: "muc-7", goi: "fb(6,3,true)", w: 390 },
];

const chon = process.argv.length > 2 ? +process.argv[2] : 0, ep = +process.argv[3] || 0;
const jobs = chon ? [Object.assign({}, danh_sach[chon - 1], { ten: "chon-" + chon, w: ep || danh_sach[chon - 1].w })] : danh_sach;

jobs.forEach(x => {
  D.ghi(x.ten + "-page.html", src.replace("</body>", che(x.muc) + "<script>window.addEventListener('load',function(){setTimeout(function(){" +
    may + x.goi + ";},600);});</scr" + "ipt></body>"));
  D.ghi(x.ten + ".html", `<!doctype html><meta charset="utf-8"><body style="margin:0">
<iframe style="width:${x.w}px;height:1400px;border:0;display:block" src="${x.ten}-page.html"></iframe></body>`);
  const png = path.join(D.TMP, x.ten + ".png");
  require("child_process").execFileSync(D.chrome(), ["--headless=new", "--disable-gpu", "--allow-file-access-from-files",
    "--hide-scrollbars", "--virtual-time-budget=20000", "--screenshot=" + png,
    "--window-size=" + (x.w + 20) + ",1400", D.url(x.ten + ".html")], { stdio: "ignore" });
  console.log(fs.existsSync(png) ? "✓ " + png + "  " + fs.statSync(png).size + " byte"
                                 : "✕ KHÔNG CHỤP ĐƯỢC " + x.ten);
});
