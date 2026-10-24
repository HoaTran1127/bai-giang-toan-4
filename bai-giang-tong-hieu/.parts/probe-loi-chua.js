// Cửa kiểm BÀI 3 — "LỜI CHỮA PHẢI TÁI HIỆN ĐƯỢC LỐI SAI".
// Đo trên ĐÚNG FILE GIAO ../index.html: máy dựng bản đồ "số dễ nhầm" của 24 câu chấm,
// và với mỗi số em ghi sai phải gọi ra nó LÀ SỐ NÀO trong bài + câu này hỏi gì + đáp án đúng.
// Hai lượt làm thật trên bảng điểm được đưa vào đây ĐÃ ẨN DANH (chỉ còn số, không còn tên),
// vì trang giảng bài cấm chứa lỗi của riêng một em.
// Mỗi đột biến phải cháy thật — hàng "ÂM TINH" thì trang phải còn xanh, chứng minh cửa không phát nông.
const fs = require("fs");
const path = require("path");
const D = require("./dung-chung.js");

/* ---------------- FIXTURE: hai lượt nộp thật, đã bỏ tên ----------------
   Lấy từ Sheet bài 3 (22/10 và 24/10/2026), key 'cap-i-j' đúng như máy chấm dùng. */
const LUOT = [
  {
    ten: "lượt A (22/10) — 17/24", dung: 17,
    sai: [
      ["cap-4-0", 66], ["cap-4-2", 78], ["cap-5-1", 12], ["cap-5-3", 21],
      ["cap-5-4", 76], ["cap-6-0", 39], ["cap-6-2", 22]
    ]
  },
  {
    ten: "lượt B (24/10) — 18/24", dung: 18,
    sai: [
      ["cap-5-0", 66], ["cap-5-4", 75], ["cap-5-5", 45],
      ["cap-7-0", 100], ["cap-7-1", 332], ["cap-7-5", 56]
    ]
  }
];

/* Nguyên nhân MÀ NGƯỜI CHẤM ĐỌC RA từ ảnh chụp bảng điểm — cửa phải đọc được y như vậy. */
const NGUYEN_NHAN = [
  ["cap-4-0", "Bài 4.6"],            // 66 = đáp án câu dưới, nhìn nhầm dòng
  ["cap-4-2", "thanh NGẮN"],          // 78 = số bé, câu hỏi số lớn
  ["cap-5-1", "HIỆU"],                // 12 = phần lệch, chưa phải số của hai bạn
  ["cap-5-3", "thanh NGẮN"],          // 21 = chiều rộng, câu hỏi chiều dài
  ["cap-5-4", "nửa TỔNG"],            // 76 = 152 ÷ 2, chưa dùng lệch 2
  ["cap-6-0", "tuổi mẹ"],             // 39 = thanh DÀI, câu hỏi tuổi con
  ["cap-6-2", "tuổi trung bình"],     // 22 = 62 ÷ 2 − 9, lấy tuổi trung bình của HAI người
  ["cap-5-0", "thanh DÀI"],           // 66 = số lớn, câu hỏi số bé
  ["cap-5-4b", "thanh NGẮN"],         // 75 = số bé, câu hỏi số lớn
  ["cap-5-5", "thanh NGẮN"],          // 45 = bao gạo, câu hỏi bao ngô
  ["cap-7-0", "LÚC ĐẦU"],             // 100 = số sách trước khi chuyển, còn thiếu bước bớt 10
  ["cap-7-1", "hàng trăm"],           // 332 vs 432 — quên chữ nhớ
  ["cap-7-5", "không trùng với số nào"] // 56: số lạ, phải rơi vào đường dự phòng
];

/* ---------------- HÀM ĐO ---------------- */
const HAM_DO = `function () {
  var o = { tuKiem: null, foot: "", selfTestAn: "", block: [], luot: [], loiSai: [], dom: {}, baoCao: {}, duPhong: 0, post: 0 };
  HTMLFormElement.prototype.submit = function () { o.post++; };   // không để lại dòng nào trên bảng điểm
  try { veCong(); } catch (e) {}
  document.getElementById('name-input').value = 'Ban Mai';
  document.getElementById('name-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

  var k = tuKiem();
  o.tuKiem = { n: k.n, cau: k.tongCau, loi: k.err.length, chiTiet: k.err.slice(0, 8) };
  o.foot = document.getElementById('footer-stamp').textContent;
  o.selfTestAn = document.getElementById('self-test-alert').classList.contains('hidden') ? 'an' : 'HIEN-LOI';

  /* 1 · bản đồ số dễ nhầm của 24 câu chấm: mỗi số phải được chữa đúng tên */
  GRADED.forEach(function (i) {
    CAP[i].ds.forEach(function (q, j) {
      var ds = nhungSoBiNham(q), dat = 0;
      ds.forEach(function (d) {
        var chu = loiChua(q, d.so, i, j);
        if (chu.indexOf(String(q.ans)) >= 0 && chu.indexOf('Câu này hỏi') >= 0 && !/không trùng với số nào/.test(chu)) dat++;
      });
      o.block.push({ ma: 'Bài ' + i + '.' + (j + 1), ans: q.ans, so: ds.length, dat: dat });
    });
  });

  /* 2 · hai lượt thật (ẩn danh): máy gọi được nguyên nhân cho bao nhiêu câu sai */
  LUOT_PROBE.forEach(function (L) {
    var kq = [];
    L.sai.forEach(function (x) {
      var p = x[0].split('-'), i = +p[1], j = +p[2], q = CAP[i].ds[j];
      var nh = docSoSai(q, x[1], i, j);
      kq.push({ key: x[0], ghi: x[1], dap: q.ans, chu: loiChua(q, x[1], i, j) });
    });
    o.luot.push({ ten: L.ten, dung: L.dung, kq: kq });
  });

  /* 3 · cột "Lời sai của em" gửi về bảng điểm cũng phải mang nguyên nhân */
  var attempts = {};
  keyCham().forEach(function (kk) {
    var p = kk.split('-'), q = CAP[+p[1]].ds[+p[2]];
    attempts[kk] = { val: q.ans, ok: true };
  });
  LUOT_PROBE[0].sai.forEach(function (x) { attempts[x[0]] = { val: x[1], ok: false }; });
  o.loiSai = loiCuaEm(attempts);

  /* 4 · số KHÔNG thuộc bài nào → đường dự phòng phải nhắc lại TỔNG + phần lệch */
  GRADED.forEach(function (i) {
    CAP[i].ds.forEach(function (q, j) {
      var chu = loiChua(q, 99991, i, j);
      if (/không trùng với số nào/.test(chu) && chu.indexOf('TỔNG') >= 0 && chu.indexOf('phần lệch') >= 0) o.duPhong++;
    });
  });

  /* 5 · DOM: em bấm Kiểm tra thật thì hộp nguyên nhân phải hiện trong thẻ */
  document.querySelector('#level-tabs .lv[data-cap="4"]').click();
  var inp = document.getElementById('nhap-cap-4-0');
  inp.value = '66';
  inp.dispatchEvent(new Event('input', { bubbles: true }));
  document.getElementById('btn-cap-4-0').click();
  var nn = document.querySelector('#fb-cap-4-0 .nguyenNhan');
  o.dom = { co: nn ? 'co' : 'khong', text: nn ? nn.textContent : '', so: document.querySelectorAll('#quiz-container .nguyenNhan').length };

  /* 6 · DOM: màn "Lời chữa của thầy cho từng câu em sai" phải đủ 7 hộp */
  var rec = { label: 'QC', correct: 17, total: 24, stars: 2, ngay: 'test', attempts: attempts, sent: false };
  showReport(findRoster('Ban Mai'), rec);
  o.baoCao = {
    so: document.querySelectorAll('#report-wrap .nguyenNhan').length,
    dau: (document.querySelector('#report-wrap .nguyenNhan') || {}).textContent || ''
  };
  return o;
}`;

/* ---------------- DÀN TRANG PROBE TỪ NGUỒN (để đột biến) ---------------- */
function trangTu(src, ten, probe) {
  return D.ghi(ten, src.replace("</body>", '<pre id="qc-out">…</pre>' + probe + "</body>"));
}
function tram(src, ten) {
  const nguon = HAM_DO.split("LUOT_PROBE").join(JSON.stringify(LUOT));
  const u = trangTu(src, ten, D.do_probe(nguon));
  return D.ket_qua(D.dump(u));
}

/* ---------------- BẢNG HÀNG ĐỢT ---------------- */
function dong_day(kq) {
  const L = [];
  L.push(["tự kiểm · lỗi JS", String(kq.tuKiem.loi), "0"]);
  L.push(["tự kiểm · số mục", String(kq.tuKiem.n), "109"]);
  L.push(["tự kiểm · số câu", String(kq.tuKiem.cau), "48"]);
  L.push(["trang không bị chặn", kq.selfTestAn, "an"]);
  L.push(["footer in đủ số mục", /109 mục khớp nhau · 48 câu/.test(kq.foot) ? "co" : "khong", "co"]);

  const tongSo = kq.block.reduce((a, b) => a + b.so, 0);
  const tongDat = kq.block.reduce((a, b) => a + b.dat, 0);
  const itNhat = Math.min.apply(null, kq.block.map(b => b.so));
  L.push(["số câu chấm có bản đồ", String(kq.block.length), "24"]);
  L.push(["mỗi câu ≥ 3 số dễ nhầm", String(itNhat), "ok", (v) => +v >= 3]);
  L.push(["số dễ nhầm cả thảy", String(tongSo), "≥100", (v) => +v >= 100]);
  L.push(["chữa đúng tên 100%", tongDat + "/" + tongSo, tongSo + "/" + tongSo]);

  kq.luot.forEach((luot, li) => {
    const coTen = luot.kq.filter(x => !/không trùng với số nào/.test(x.chu)).length;
    L.push(["nguyên nhân · " + luot.ten, coTen + "/" + luot.kq.length,
      li === 0 ? "7/7" : "5/6"]);
  });
  NGUYEN_NHAN.forEach(([key, mong]) => {
    const kk = key.replace("b", "");
    let chu = "";
    kq.luot.forEach(l => l.kq.forEach(x => { if (x.key === kk) chu = chu || x.chu; }));
    // cap-5-4 có hai lượt khác nhau (A: 76 → nửa TỔNG, B: 75 → thanh NGẮN) — tra theo đúng giá trị ghi
    if (key === "cap-5-4b") { kq.luot.forEach(l => l.kq.forEach(x => { if (x.key === "cap-5-4" && x.ghi === 75) chu = x.chu; })); }
    else if (key === "cap-5-4") { kq.luot.forEach(l => l.kq.forEach(x => { if (x.key === "cap-5-4" && x.ghi === 76) chu = x.chu; })); }
    L.push(["lý lịch lỗi " + key + " (" + mong + ")", chu.indexOf(mong) >= 0 ? "co" : "KHONG", "co"]);
  });

  L.push(["cột Lời sai · số dòng", String(kq.loiSai.length), "7"]);
  const coChua = kq.loiSai.filter(s => s.indexOf("Câu này hỏi") >= 0).length;
  L.push(["cột Lời sai · có nguyên nhân", coChua + "/7", "7/7"]);
  L.push(["cột Lời sai · kèm đáp án đúng", kq.loiSai.filter(s => /đáp án đúng \d+/.test(s)).length + "/7", "7/7"]);
  L.push(["đường dự phòng 24 câu", String(kq.duPhong), "24"]);
  L.push(["thẻ câu sai có hộp nguyên nhân", kq.dom.co + "·" + kq.dom.so, "co·1"]);
  L.push(["hộp nguyên nhân chứa số em ghi", /66/.test(kq.dom.text) ? "co" : "khong", "co"]);
  L.push(["màn lời chữa có 7 hộp", String(kq.baoCao.so), "7"]);
  L.push(["probe KHÔNG gửi POST", String(kq.post), "0"]);
  return L;
}

/* ---------------- SO SÁNH ---------------- */
function danh(giaTri, mong, kiem) {
  if (typeof kiem === "function") return kiem(String(giaTri)) ? "đạt" : "HỎNG";
  return String(giaTri) === String(mong) ? "đạt" : "HỎNG";
}
function chay_va_danh(src, ten) {
  const kq = tram(src, ten);
  const L = dong_day(kq);
  const hong = L.filter(r => danh(r[1], r[2], r[3]) === "HỎNG");
  return { kq: kq, L: L, hong: hong };
}

/* ---------------- ĐỘT BIẾN ----------------
   Mỗi hàng: [tên, neo gốc, neo thay, hàng phải HỎNG] */
const DOT_BIEN = [
  ["M1 · bản đồ liệt kê cả đáp án",
    "if (so == null || !isFinite(so) || so % 1 !== 0 || so <= 0 || so === d) return;",
    "if (so == null || !isFinite(so) || so % 1 !== 0 || so <= 0) return;",
    "tự kiểm · lỗi JS"],
  ["M2 · quên đường 'chép đáp án bài khác'",
    "if (cap != null && CAP[cap]) {", "if (false && CAP[cap]) {",
    "lý lịch lỗi cap-4-0"],
  ["M3 · quên đường 'lệch một hàng = quên chữ nhớ'",
    "if (HANG[lech]) return { ten:", "if (false) return { ten:",
    "lý lịch lỗi cap-7-1"],
  ["M4 · đường dự phòng không nhắc TỔNG nữa",
    "em dò lại sơ đồ: TỔNG = ' + s.tong +",
    "em dò lại sơ đồ: ' + s.tong +",
    "đường dự phòng 24 câu"],
  ["M5 · thẻ câu sai không hiện nguyên nhân",
    "'<div class=\"nguyenNhan\">→ ' + loiChua(q, val, cap, j) + '</div>' +",
    "'' +",
    "thẻ câu sai có hộp nguyên nhân"],
  ["M6 · cột 'Lời sai của em' gửi về Sheet không kèm nguyên nhân",
    "', đáp án đúng ' + q.ans + '. ' + loiChua(q, a.val, i, j));",
    "', đáp án đúng ' + q.ans);",
    "cột Lời sai · có nguyên nhân"],
  ["ÂM TINH · chỉ đổi màu nền hộp nguyên nhân",
    "border-left: 5px solid var(--orange); background: #FFF7ED;",
    "border-left: 5px solid var(--orange); background: #FEF9C3;",
    null]
];

function dot_bien(src, goc, thay) {
  const dem = src.split(goc).length - 1;
  if (dem !== 1) throw new Error("NEO CHET (" + dem + " lần): " + goc.slice(0, 60));
  return src.replace(goc, thay);
}

/* ---------------- CHẠY ---------------- */
const src = fs.readFileSync(D.SRC, "utf8");
console.log("file giao: " + D.SRC + " · " + src.length + " byte");
const goc = chay_va_danh(src, "lc-goc.html");

let ok = 0;
goc.L.forEach(r => {
  const t = danh(r[1], r[2], r[3]);
  if (t === "đạt") ok++;
  console.log((t === "đạt" ? "  ✓ " : "  ✕ ") + r[0] + " = " + r[1] + (t === "đạt" ? "" : "  (mong " + r[2] + ")"));
});
if (goc.hong.length) {
  console.log("\nHỎNG GỐC — chi tiết tự kiểm: " + JSON.stringify(goc.kq.tuKiem.chiTiet));
  console.log("câu có bản đồ mỏng: " + JSON.stringify(goc.kq.block.filter(b => b.so < 3 || b.dat !== b.so)));
  console.log("chi tiết lý lịch: " + JSON.stringify(goc.kq.luot.map(l => l.kq.map(x => x.key + ":" + x.ghi + "→" + x.chu.slice(0, 70)))));
}

console.log("\nĐỘT BIẾN:");
let cay = 0;
for (const [ten, neo, thay, hang] of DOT_BIEN) {
  let nguon;
  try { nguon = dot_bien(src, neo, thay); }
  catch (e) { console.log("  ✕ " + ten + " — " + e.message); continue; }
  let kq;
  try { kq = chay_va_danh(nguon, "lc-dot.html"); }
  catch (e) { console.log("  ✓ " + ten + " — trang chết ngay: " + String(e).slice(0, 70)); cay++; continue; }
  const amTinh = hang === null;
  let trung = false;
  if (amTinh) {
    trung = kq.hong.length === 0;
    console.log((trung ? "  ✓ " : "  ✕ ") + ten + (trung ? " — trang vẫn xanh ✓ (âm tinh đúng)" : " — PHÁT NÔNG: " + kq.hong.map(r => r[0]).join(", ")));
  } else {
    const dau = kq.L.filter(r => danh(r[1], r[2], r[3]) === "HỎNG").map(r => r[0]);
    trung = dau.some(t => t.indexOf(hang) === 0);
    console.log((trung ? "  ✓ " : "  ✕ ") + ten + " → " + (dau.length ? dau.slice(0, 3).join(" | ") : "KHÔNG HÀNG NÀO HỎNG"));
  }
  if (trung) cay++;
}

console.log("\nKẾT LUẬN: " + ok + "/" + goc.L.length + " hàng đạt · đột biến " + cay + "/" + DOT_BIEN.length);
process.exit(goc.hong.length === 0 && cay === DOT_BIEN.length ? 0 : 1);
