// BẤM–THẢ THẬT trên CHÍNH FILE GIAO, chạy ở 3 khổ 760 / 420 / 320px:
//   node bai-giang-tong-hieu/.parts/probe-thao-tac.js
// Mỗi câu phải: ghép xong sơ đồ (nhãn tên -> khung TỔNG -> mở khung HIỆU -> chốt), thả sai bị từ
// chối, số TỔNG/HIỆU hiện đúng bằng số tính ra, nhãn khay thẻ đổi đúng từng giai đoạn, ô đáp án
// chữa sai rồi nhận đúng, và thẻ để lâu phải rung nhắc ĐÚNG số thẻ đang bày ra.
// Exit code: 0 = 0 lỗi tương tác ở cả 3 khổ.
const D = require("./dung-chung.js");

const hide = `<style>
  body > header, #hero, .hero, nav, footer { display:none !important; }
  body > div > section { display:none !important; }
  body > div > section#muc-7 { display:block !important; }
  #muc-7 .card-head { display:none !important; }
</style>`;

const probe = String.raw`
<script>
window.addEventListener('load', function () {
  setTimeout(function () {
    try {
      var al = document.getElementById('self-test-alert'); if (al) al.style.display = 'none';
      document.getElementById('name-gate').classList.add('hidden');
      document.getElementById('practice-wrap').classList.remove('hidden');
      CO_TAT = true;
      var cards = [], dapAn = [], rung = [];

      function vis(e) { return !!e && e.offsetParent !== null; }
      function demOK(card) { return card.querySelectorAll('.drop.ok').length; }
      function boCam() { KEO = null; var c = document.querySelector('.keo.chon'); if (c) c.classList.remove('chon'); }
      function chips(card, loai) {
        return [].slice.call(card.querySelectorAll('.qkeo .keo[data-loai="' + loai + '"]')).filter(vis);
      }
      function timThe(card, loai, dap) {
        var list = chips(card, loai), l = String(dap).split('|'), ch = null;
        for (var x = 0; x < list.length; x++) {
          if (l.indexOf(String(list[x].getAttribute('data-gia'))) >= 0) { ch = list[x]; break; }
        }
        return ch;
      }
      function ghepKhu(khu, loai, card, E) {
        [].slice.call(khu.querySelectorAll('.drop')).forEach(function (d) {
          if (d.classList.contains('ok')) return;
          var ch = timThe(card, loai, d.getAttribute('data-dap'));
          if (!ch) { E('không còn thẻ ' + loai + ' cho ô ' + d.id); return; }
          ch.click(); d.click();
          if (!d.classList.contains('ok')) E('ghép không vào: ' + d.id + ' (' + (ch.getAttribute('data-gia')) + ')');
          boCam();
        });
      }
      function thuCau(i, j) {
        var id = i + '-' + j, errs = [], log = { cap: i, cau: j + 1, errs: errs };
        function E(m) { errs.push(m); }
        var card = document.getElementById('card-cap-' + id);
        if (!card) { E('KHÔNG CARD'); return log; }
        var cap = document.getElementById('qkq-cap-' + id), q = CAP[i].ds[j], s = doiSo(q.dk);
        if (!card.querySelector('.sodo')) E('KHÔNG CÓ SƠ ĐỒ');
        if (!card.querySelector('input[type=number]')) E('KHÔNG CÓ Ô ĐÁP ÁN');
        var kt = document.getElementById('khu-t-' + id), kh = document.getElementById('khu-h-' + id);
        if (!kt && !kh) E('KHÔNG CÓ KHUNG TÍNH NÀO');

        /* --- 1. THẢ SAI PHẢI BỊ TỪ CHỐI --- */
        var dTen = card.querySelector('.drop[data-loai="ten"]:not(.ok)');
        var cSo = chips(card, 'tong')[0] || chips(card, 'hieu')[0];
        if (cSo && dTen) {
          var t0 = demOK(card); cSo.click(); dTen.click();
          if (demOK(card) !== t0) E('thả thẻ SỐ vào nhãn TÊN mà vẫn nhận');
          if (!/✕/.test(String(cap && cap.textContent))) E('thả sai mà không in lời nhắc ✕');
          boCam();
        }
        var cTen = chips(card, 'ten')[0];
        var dSo = (kt && kt.querySelector('.drop')) || (kh && kh.querySelector('.drop'));
        if (cTen && dSo) {
          var t1 = demOK(card); cTen.click(); dSo.click();
          if (demOK(card) !== t1) E('thả thẻ TÊN vào khung tính mà vẫn nhận');
          boCam();
        }
        if (kt && kh && vis(kh) === false) {
          var cH = chips(card, 'hieu')[0];
          if (cH) E('khung HIỆU đang đóng mà thẻ HIỆU vẫn bày ra');
        }

        /* --- 2. GHÉP ĐÚNG: tên -> TỔNG -> HIỆU --- */
        [].slice.call(card.querySelectorAll('.drop[data-loai="ten"]:not(.ok)')).forEach(function (d) {
          var ch = null, list = chips(card, 'ten');
          for (var x = 0; x < list.length; x++) if (String(list[x].getAttribute('data-gia')) === d.getAttribute('data-dap')) ch = list[x];
          if (!ch) { E('không còn thẻ tên cho ' + d.id); return; }
          ch.click(); d.click();
          if (!d.classList.contains('ok')) E('nhãn tên không ghép: ' + d.id);
          boCam();
        });

        var coKhungT = !!(kt && vis(kt));
        if (coKhungT) {
          ghepKhu(kt, 'tong', card, E);
          if (!khuDong(kt)) E('khung TỔNG ghép mà không kín');
          var ht = document.getElementById('hien-t-' + id);
          if (!ht) E('sơ đồ thiếu ô hiện TỔNG');
          else {
            if (ht.classList.contains('cho')) E('khung TỔNG kín rồi mà số TỔNG vẫn ẩn');
            if (String(ht.textContent).trim() !== String(s.tong)) E('số hiện ở ngoặc tím ≠ TỔNG tính ra (' + ht.textContent + ' vs ' + s.tong + ')');
          }
          if (kh) {
            if (vis(kh) === false) E('khung HIỆU không mở sau khi ghép xong TỔNG');
            if (card.querySelectorAll('.keo.cho').length) E('thẻ HIỆU vẫn bị giấu sau khi mở khung');
            var nh = card.querySelector('.qkeo .nhan');
            if (nh && !/HIỆU/.test(String(nh.textContent))) E('nhãn khay thẻ không đổi: "' + nh.textContent + '"');
          }
        }
        if (kh && vis(kh)) {
          ghepKhu(kh, 'hieu', card, E);
          if (!khuDong(kh)) E('khung HIỆU ghép mà không kín');
        }
        var hh = document.getElementById('hien-h-' + id);
        if (hh) {
          if (hh.classList.contains('cho')) E('số HIỆU vẫn ẩn trên đoạn cam');
          if (String(hh.textContent).trim() !== String(s.hieu)) E('số hiện ở đoạn cam ≠ HIỆU tính ra (' + hh.textContent + ' vs ' + s.hieu + ')');
        }
        if (!card.classList.contains('xong')) E('sơ đồ không chốt (thiếu class "xong")');
        else {
          var nhanCuoi = card.querySelector('.qkeo .nhan');
          if (!/Điền đáp số/.test(String(nhanCuoi && nhanCuoi.textContent)))
            E('khung kín hết mà nhãn khay thẻ chưa mời điền đáp số: "' + (nhanCuoi && nhanCuoi.textContent) + '"');
        }
        var con = card.querySelectorAll('.drop:not(.ok)').length;
        if (con) E('còn ' + con + ' ô trống sau khi kéo hết');
        var du = card.querySelectorAll('.qkeo .keo').length;
        if (du) E('còn ' + du + ' thẻ chưa dùng');
        return log;
      }

      function dat(id, v) {
        var e = document.getElementById(id); if (!e) return false;
        e.disabled = false; e.value = String(v);
        e.dispatchEvent(new Event('input', { bubbles: true }));
        return true;
      }
      function thuDapAn(i, j) {
        var key = 'cap-' + i + '-' + j, errs = [], log = { cap: i, cau: j + 1, errs: errs };
        function E(m) { errs.push(m); }
        var q = CAP[i].ds[j], cham = laCapCham(i);
        if (!dat('nhap-' + key, q.ans + 1)) { E('KHÔNG CÓ Ô NHẬP'); return log; }
        document.getElementById('btn-' + key).click();
        var fb = document.getElementById('fb-' + key), t = String(fb && fb.textContent).replace(/\s+/g, ' ');
        if (t.indexOf('đáp án đúng') < 0) E('trả lời sai mà không chữa: ' + t.slice(0, 70));
        if (cham) {
          var inp = document.getElementById('nhap-' + key);
          if (inp && !inp.disabled) E('câu chấm điểm không khóa ô sau 1 lần nộp');
          var the = document.getElementById('the-' + i + '-' + j);
          var nh = the && the.querySelector('.nhan');
          if (!the) E('KHÔNG TÌM THẤY KHAY THẺ the-' + i + '-' + j);
          else if (!nh || !/Đã ghi đáp án/.test(nh.textContent)) E('nhãn khay thẻ không đổi sau khi ghi đáp án');
          runState.attempts[key] = null; delete runState.attempts[key];
          activeCap = i; veDanhSach();
          if (!dat('nhap-' + key, q.ans)) { E('mất ô nhập sau khi vẽ lại'); return log; }
        } else {
          dat('nhap-' + key, q.ans);
        }
        document.getElementById('btn-' + key).click();
        var fb2 = document.getElementById('fb-' + key), t2 = String(fb2 && fb2.textContent).replace(/\s+/g, ' ');
        if (t2.indexOf('ĐÚNG') < 0) E('trả lời đúng mà không nhận: ' + t2.slice(0, 70));
        return log;
      }

      var caps = [], k; for (k in CAP) caps.push(Number(k));
      caps.sort(function (x, y) { return x - y; });

      caps.forEach(function (c) {
        runState = { key: 'qc', label: 'QC', attempts: {} };
        nhap = {}; submitted = false; activeCap = c; veDanhSach();
        CAP[c].ds.forEach(function (q, j) { cards.push(thuCau(c, j)); });
        // rung nhắc: vừa xong câu 0 (thẻ bị ăn hết) + các câu khác còn nguyên thẻ
        runState = { key: 'qc', label: 'QC', attempts: {} };
        nhap = {}; activeCap = c; veDanhSach();
        thuCau(c, 0);
        LAN_THAO_TAC = 0; tatRung(); kiemTraRung();
        var dung = [].slice.call(document.querySelectorAll('#quiz-container .qkeo .keo:not(.cho)'));
        var rungRung = [].slice.call(document.querySelectorAll('#quiz-container .keo.rung'));
        var card0 = document.getElementById('card-cap-' + c + '-0');
        rung.push({
          cap: c, theChayDuoc: dung.length, theRung: rungRung.length,
          card0ConThe: card0 ? card0.querySelectorAll('.keo').length : -1,
          anCho: [].slice.call(document.querySelectorAll('#quiz-container .keo.cho')).length,
          rungTrungTheAn: document.querySelectorAll('#quiz-container .keo.cho.rung').length
        });
        tatRung();
        // đáp án cho từng câu
        runState = { key: 'qc', label: 'QC', attempts: {} };
        nhap = {}; activeCap = c; veDanhSach();
        CAP[c].ds.forEach(function (q, j) { dapAn.push(thuDapAn(c, j)); });
      });

      document.getElementById('qc-out').textContent = 'QCJSON ' + JSON.stringify({
        pw: window.innerWidth, cards: cards, dapAn: dapAn, rung: rung
      });
    } catch (e) {
      document.getElementById('qc-out').textContent = 'QCERR ' + e + ' | ' + (e.stack || '');
    }
  }, 400);
});
</script></body>`;

const u = D.trang_probe("thao-tac.html", probe, hide);

const widths = [760, 420, 320];
const ifr = widths.map(w => `<iframe style="width:${w}px;height:1400px;border:0;display:block" src="thao-tac.html"></iframe>`).join("");
const wrap = `<!doctype html><meta charset="utf-8"><style>body{margin:0;font:11px monospace}pre{white-space:pre-wrap}</style>
${ifr}<pre id="all">…</pre>
<script>
var fr = [].slice.call(document.querySelectorAll('iframe'));
var got = 0;
addEventListener('load', function(){ setTimeout(check, 6000); });
function check(){
  fr.forEach(function(f,i){
    try {
      var t = f.contentDocument.getElementById('qc-out').textContent;
      if (/QCJSON|QCERR/.test(t)) { document.getElementById('i'+i).textContent = t; got++; }
    } catch(e) { document.getElementById('i'+i).textContent = 'READERR ' + e; got++; }
  });
  if (got < fr.length) setTimeout(check, 900); else done();
}
function done(){
  document.getElementById('all').textContent = 'ALL ' + JSON.stringify([0,1,2].map(function(i){
    var t = document.getElementById('i'+i).textContent || '';
    try { return JSON.parse(t.slice(7)); } catch(e) { return t.slice(0,400); }
  }));
}
</script>
${widths.map((w,i)=>`<div id="i${i}" style="display:none"></div>`).join("")}`;
const uWrap = D.ghi("thao-tac-wrap.html", wrap);

const dom = D.dump(uWrap, 90000);
const m = /ALL (\[[\s\S]*?)<\/pre>/.exec(dom);
if (!m) { console.log(dom.slice(0, 2000)); process.exit(1); }
const three = JSON.parse(m[1]);

let tong = 0;
three.forEach((r, w) => {
  if (!r || !r.cards) { console.log("=== " + widths[w] + "px LỖI:", String(r).slice(0, 300)); tong++; return; }
  const loaiCards = r.cards.filter(c => c.errs.length);
  const loiDap = r.dapAn.filter(c => c.errs.length);
  console.log("=== " + widths[w] + "px · kéo thả " + r.cards.length + " câu · lỗi " + loaiCards.length +
    " | đáp án lỗi " + loiDap.length);
  loaiCards.forEach(c => console.log("  KÉO " + c.cap + "." + c.cau + ": " + c.errs.join(" · ")));
  loiDap.forEach(c => console.log("  ĐÁP " + c.cap + "." + c.cau + ": " + c.errs.join(" · ")));
  r.rung.forEach(x => {
    const bad = [];
    if (x.theRung !== x.theChayDuoc) bad.push("số thẻ rung " + x.theRung + " ≠ thẻ chạy được " + x.theChayDuoc);
    if (x.theChayDuoc === 0) bad.push("không thẻ nào để rung");
    if (x.card0ConThe !== 0) bad.push("câu 0 còn " + x.card0ConThe + " thẻ sau khi ghép xong");
    if (x.rungTrungTheAn !== 0) bad.push("thẻ ĐÓNG của câu 0 bị rung " + x.rungTrungTheAn);
    tong += bad.length;
    console.log("  RUNG cấp " + x.cap + ": chạy được " + x.theChayDuoc + ", rung " + x.theRung +
      ", thẻ ẩn " + x.anCho + (bad.length ? "  ⚠ " + bad.join(" · ") : "  ok"));
  });
  tong += loaiCards.length + loiDap.length;
});
console.log("\nTỔNG LỖI TƯƠNG TÁC: " + tong + " (3 khổ) — file đo: " + D.SRC);
process.exitCode = tong ? 1 : 0;
