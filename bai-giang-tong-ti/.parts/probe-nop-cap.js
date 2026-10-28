/* =============================================================================
   probe-nop-cap.js — cửa kiểm "NỘP THEO TỪNG CẤP" của bài 4 (Tổng và Tỉ số)
     node bai-giang-tong-ti/.parts/probe-nop-cap.js

   Luật phải chứng minh (người dùng chốt 25/10/2026):
     L1  Cấp 4·5·6·7: làm KÍN câu cấp nào thì một dòng gửi về bảng điểm NGAY, không chờ em bấm nút.
     L2  Mỗi cấp MỘT dòng riêng — cột "Cấp" đúng số cấp, tổng = đúng số câu của cấp đó.
     L3  Sao tính TRONG cấp (tối đa 3★), tỷ lệ = đúng/tổng của cấp.
     L4  Cấp 1·2·3 (ôn) không gửi gì cả.
     L5  Mở lại trang KHÔNG gửi trùng (capDaNop sống trong kho giữ bài dở).
     L6  Đổi bạn thì máy nộp reset — bạn khác làm Cấp 4 vẫn gửi được đúng một dòng.
     L7  Màn tổng kết khi đủ bốn cấp chỉ vẽ, không POST lần năm.

   Luật "CÔNG TẮC NÂNG CAO" (người dùng chốt 27/10/2026) — các phase nc-*:
     L8  Bật công tắc thì số trong đề ĐỔI THÀNH BÀI MỚI (chỉ đổi SỐ, chữ của đề y nguyên) và MỌI
         gợi ý ẩn hết: chữ "Dấu hiệu", lời đầu cấp, nhãn khay thẻ, ô nháy sẵn, cô đọc. Nhưng
         KHUNG Ô ĐỂ KÉO, thẻ kéo được và ô điền đáp số vẫn còn — em tự tìm dữ liệu như trong sách.
     L9  Cấp nâng cao kín câu vẫn tự gửi NGAY MỘT dòng; dấu "(nâng cao)" nằm trong cột CÓ SẴN
         (Lời sai · Đáp án em ghi), cột "Cấp" vẫn là SỐ để thầy lọc bảng điểm.
     L10 Tắt công tắc thì đề thường + gợi ý + cô đọc trở lại, và hai chế độ KHÔNG đè nháp của nhau
         (phím câu cap-i-j / nc-cap-i-j, phím cấp th-4 / nc-4) ⇒ Cấp 4 thường gửi thêm đúng một dòng.
     L11 Công tắc sống trong kho giữ bài: mở lại trang vẫn là đề nâng cao, vẫn nhớ cấp đã gửi,
         không gửi trùng; đổi bạn thì xoá sạch dấu cả hai chế độ và trả công tắc về tắt.
     L12 Ngay trên màn hình, LỜI ĐỀ nâng cao phải là chữ thường: mọi thẻ nằm trong `.qvan` không còn
         viền khoanh hay nền màu (border 0px + nền trong suốt) nhưng vẫn draggable — bé tự tìm dữ
         liệu trong câu mà kéo xuống. Cái đề không in sẵn (TỔNG giấu sau chu vi) mới ở khay.
     L13 Thẻ SỐ PHẦN ở đề nâng cao cầm đúng TỈ SỐ in nguyên văn trong đề ("2/5" · "3 lần"), nằm
         TRONG lời đề chứ không nằm ở khay — số phần (2+5=7) là em tự cộng, máy không cộng hộ.

   Vì sao N process Chrome riêng cho mỗi phase: `localStorage` chỉ sống giữa các lần nạp khi
   dùng chung một `--user-data-dir`, và "mở lại trang" chỉ là mở lại THẬT khi trình duyệt
   đóng hẳn giữa hai phase.
   Vì sao chặn submit: để yên thì cửa này nộp THẬT về Google Form ⇒ Sheet của thầy thêm dòng
   trông y hệt học sinh. Ghi đè `HTMLFormElement.prototype.submit` SAU khi bài nạp (same-origin
   navigation dựng lại global mới) ⇒ chụp đủ field rồi DỪNG, không request nào ra ngoài.

   Đột biến: lỗi cấy phải làm cháy ít nhất một hàng TRƯỚC ĐÓ XANH; hàng âm tinh (chỉ đổi màu
   nền banner) phải im lặng — chứng minh cửa không hỏng ăn lung tung.
   Exit 0 khi bản gốc đạt hết hàng VÀ mọi đột biến bị bắt VÀ âm tinh im lặng.
   ============================================================================= */
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BAI = path.join(__dirname, '..', 'index.html');
const KHO = 'bg4-giu-bai-tong-ti';
const FORM_ID = '1FAIpQLSf7NdZw4X4iBonU5rrcwsMXCXSn87PbmHB2DTOJY7mLV49ogA';
const goc = fs.readFileSync(BAI, 'utf8');

const CHROME = (function () {
  const cho = [
    process.env.CHROME,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    'google-chrome', 'chromium', 'chromium-browser'
  ].filter(Boolean);
  for (const c of cho) {
    if (c.match(/[\\/]/) && fs.existsSync(c)) return c;
    const w = spawnSync('where', [c], { encoding: 'utf8' });
    if (w.status === 0 && w.stdout.trim()) return w.stdout.trim().split(/\r?\n/)[0];
  }
  throw new Error('Không tìm thấy Chrome — đặt biến trường CHROME=<đường dẫn chrome.exe>');
})();

function urlOf(f) { return 'file:///' + path.resolve(f).replace(/\\/g, '/'); }
function saoTu(dung, tong) {
  const t = tong > 0 ? dung / tong : 0;
  return t >= 0.85 ? 3 : t >= 0.60 ? 2 : t >= 0.30 ? 1 : 0;
}

/* ---------------- TRANG DRIVER ----------------
   Một phase chọn bằng ?p=. Mỗi phase là MỘT process Chrome: bài giảng nằm trong iframe
   cùng gốc (file:// + --allow-file-access-from-files) nên driver đọc được DOM và gọi
   được hàm của trang; driver in các hàng "ten=giatri". */
function driverHtml() {
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>nc</title></head><body>
<div id="out">PENDING</div><iframe id="f" style="width:900px;height:2400px"></iframe>
<script>
var P = (location.search.match(/p=([a-z0-9-]+)/) || [])[1] || 'sach';
var L = [];
function step(n, v) { L.push(n + '=' + String(v)); }
function done() { document.getElementById('out').textContent = '@KQ@ ' + L.join(' @|@ ') + ' @END@'; }
var f = document.getElementById('f'), iw, idoc;
f.onload = function () { iw = f.contentWindow; idoc = iw.document; try { chay(); } catch (e) { step('LOI-DRIVER', (e && e.message) || e); done(); } };
f.src = 'index.html?run=' + P;
function chay() {
  iw.__posts = [];
  iw.HTMLFormElement.prototype.submit = function () {
    var o = { action: this.action, cs: this.acceptCharset, fields: [] };
    [].forEach.call(this.querySelectorAll('input'), function (i) { o.fields.push(i.name + '~' + i.value); });
    iw.__posts.push(o);
  };
  var $ = function (s) { return idoc.querySelector(s); };
  var an = function (el) { return !el || el.classList.contains('hidden'); };

  step('selfTest-loi', an(idoc.getElementById('self-test-alert')) ? '0' : 'BI-CHAN');
  step('soMucTkiem', iw.tuKiem().n);
  step('coTiengMay', (iw.speechSynthesis && typeof iw.speechSynthesis.speak === 'function') ? 'co' : 'khong');
  step('congTen', an(idoc.getElementById('name-gate')) ? 'an' : 'hien');
  step('kho', iw.localStorage.getItem('${KHO}') ? 'co' : 'khong');
  step('postsTruocKhiCham', iw.__posts.length);

  if (P === 'sach') { step('posts', iw.__posts.length); return done(); }

  function moCong(ten) {
    if (!an(idoc.getElementById('name-gate'))) {
      var inp = $('#name-input');
      inp.value = ten;
      inp.dispatchEvent(new iw.Event('input', { bubbles: true }));
      $('#name-go').click();
    }
  }
  /* Điền + bấm Kiểm tra cho tới hết (hoặc tới câu thứ chiDenSo) của một cấp.
     boSai[] = số thứ tự câu CỐ Ý SAI. Câu đã ghi nhận từ phase trước vẫn được tính lại.
     Đọc theo capCua()/cauK() ⇒ cùng đoạn code này làm được cả cấp thường lẫn cấp nâng cao. */
  function lamCap(i, boSai, denSo) {
    moCong('Ban Mai');
    var tab = idoc.querySelector('.lv[data-cap="' + i + '"]');
    if (!tab) throw new Error('thieu tab cap ' + i);
    tab.click();
    var n = iw.capCua(i).ds.length, so = 0, dung = 0;
    for (var j = 0; j < n; j++) {
      if (denSo != null && j >= denSo) break;
      var key = iw.cauK(i, j);
      var inp = $('#nhap-' + key), btn = $('#btn-' + key);
      if (!inp || !btn) {
        var da = iw.runState.attempts[key];
        so++; if (da && da.ok) dung++;
        continue;
      }
      var ans = iw.capCua(i).ds[j].ans, sai = boSai.indexOf(j) >= 0;
      inp.value = String(sai ? ans + 1 : ans);
      btn.click();
      so++; if (!sai) dung++;
    }
    return { so: so, dung: dung, tong: n };
  }
  function field(p, name) {
    if (!p) return '(khong-co-post)';
    var t = iw.ENTRY[name], ra = '(thieu-ot)';
    p.fields.forEach(function (x) { if (x.indexOf(t + '~') === 0) ra = x.slice(t.length + 1); });
    return ra;
  }
  function moTa(p, k) {
    var ls = String(field(p, 'loiSai')).split('\\n'), da = String(field(p, 'dapAnCuaEm')).split('\\n');
    var soEntry = p.fields.filter(function (x) { return /^entry\\./.test(x); }).length;
    step('post' + k + '.form', p.action.indexOf('${FORM_ID}/formResponse') >= 0 ? 'dung-form' : 'SAI-FORM');
    step('post' + k + '.charset', p.cs + '/' + (p.fields.indexOf('_charset_~utf-8') >= 0 ? 'co-utf8' : 'khong-utf8'));
    step('post' + k + '.soEntry', soEntry);
    step('post' + k + '.ten', field(p, 'ten'));
    step('post' + k + '.cap', field(p, 'cap'));
    step('post' + k + '.ngay', /^[0-9]{2}\\/[0-9]{2}\\/[0-9]{4} [0-9]{2}:[0-9]{2}$/.test(String(field(p, 'ngay'))) ? 'dd/MM-HH:mm' : 'SAI');
    step('post' + k + '.dung', field(p, 'dung'));
    step('post' + k + '.tong', field(p, 'tong'));
    step('post' + k + '.sao', field(p, 'sao'));
    step('post' + k + '.phanTram', field(p, 'phanTram'));
    step('post' + k + '.loiSaiDau', ls[0].slice(0, 20));
    step('post' + k + '.dapAnDau', da[0].slice(0, 20));
    step('post' + k + '.dapAnDong', da.length);
  }
  function ketLuan() {
    step('posts', iw.__posts.length);
    iw.__posts.forEach(function (p, k) { moTa(p, k); });
  }
  var W = { 4: [], 5: [0, 1, 2], 6: [0], 7: [1] };
  var C4, C5, C6, C7;

  if (P === 'cap4') {
    C4 = lamCap(4, W[4]);
    step('cap4-so', C4.so); step('cap4-dung', C4.dung); step('cap4-tong', C4.tong);
    step('banner', String($('#submit-bar').textContent).indexOf('Cấp 4 đã gửi') >= 0 ? 'co-banner' : 'khong-banner');
    step('tabDauGhi', String(idoc.querySelector('.lv[data-cap="4"]').textContent).indexOf('đã gửi') >= 0 ? 'co' : 'khong');
    ketLuan(); return done();
  }
  if (P === 'nua-cap5') {
    var n5 = iw.capCua(5).ds.length;
    C5 = lamCap(5, W[5], n5 - 2);
    step('nua5-lam', C5.so); step('nua5-tong', C5.tong);
    step('barCon', /Em còn \\d+ câu ở Cấp 5/.test(String($('#submit-bar').textContent)) ? 'con-cau' : 'SAI-BAR');
    step('nutNop', $('#btn-nop') ? 'co-nut-som' : 'khong');
    ketLuan(); return done();
  }
  if (P === 'mo-lai') {
    step('tenKho', $('#runner-name') ? $('#runner-name').textContent : '-');
    step('cap4DaGui', iw.capDaNop[iw.mucK(4)] ? 'co' : 'khong');
    /* mở đúng cấp đã gửi mới thấy banner — thanh trạng thái luôn nói về cấp đang xem */
    idoc.querySelector('.lv[data-cap="4"]').click();
    step('banner', String($('#submit-bar').textContent).indexOf('Cấp 4 đã gửi') >= 0 ? 'co-banner' : 'khong-banner');
    step('nutNop', $('#btn-nop') ? 'co-nut' : 'khong');
    step('ghichuPhucHoi', String($('#resume-note').textContent).indexOf('giữ hộ em') >= 0 ? 'co' : 'khong');
    if ($('#btn-nop')) $('#btn-nop').click();          /* bản lỗi sẽ gửi trùng ngay tại đây */
    ketLuan(); return done();
  }
  if (P === 'on') {
    var n1 = iw.capCua(1).ds.length;
    C6 = lamCap(1, [], n1);
    step('on-lam', C6.so);
    step('barOn', String($('#submit-bar').textContent).indexOf('cấp ôn') >= 0 ? 'on-khong-gui' : 'SAI-BAR');
    ketLuan(); return done();
  }
  if (P === 'chan-on') {
    /* giả lập người nối nhầm cấp ôn vào đường nộp: seed câu trả lời rồi gọi thẳng nopCap(1) */
    moCong('Ban Mai');
    iw.capCua(1).ds.forEach(function (q, j) { iw.runState.attempts[iw.cauK(1, j)] = { val: q.ans, ok: true }; });
    iw.nopCap(1);
    step('nopCap1', iw.__posts.length);
    ketLuan(); return done();
  }
  if (P === 'du') {
    [5, 6, 7].forEach(function (i) { var r = lamCap(i, W[i]); step('lam' + i + '-so', r.so); step('lam' + i + '-dung', r.dung); step('lam' + i + '-tong', r.tong); });
    step('baoCao', an(idoc.getElementById('report-wrap')) ? 'an' : 'hien');
    var m = String($('#report-wrap').textContent).match(/([0-9]+) sao trên tối đa ([0-9]+)/);
    step('reportSao', m ? m[1] + '/' + m[2] : 'khong-co');
    step('reportDong', String($('#report-wrap').textContent).indexOf('Mỗi cấp đã gửi riêng một dòng') >= 0 ? 'du-bon' : 'thieu');
    step('congTenAn', an(idoc.getElementById('name-gate')) ? 'an' : 'hien');
    ketLuan(); return done();
  }
  if (P === 'sau-nop') {
    step('baoCao', an(idoc.getElementById('report-wrap')) ? 'an' : 'hien');
    step('reportTongKet', String($('#report-wrap').textContent).indexOf('Tổng kết lúc') >= 0 ? 'co' : 'khong');
    step('reportDuBon', String($('#report-wrap').textContent).indexOf('Mỗi cấp đã gửi riêng một dòng') >= 0 ? 'co' : 'khong');
    step('luyenTapAn', an(idoc.getElementById('practice-wrap')) ? 'an' : 'hien-loi');
    ketLuan(); return done();
  }
  if (P === 'doi-ban') {
    var nut = $('#btn-sangay');
    if (!nut) throw new Error('khong co nut "Ghi tên bạn khác"');
    nut.click();
    step('sauDoi.congTen', an(idoc.getElementById('name-gate')) ? 'VAN-AN' : 'hien');
    step('sauDoi.kho', iw.localStorage.getItem('${KHO}') ? 'con-kho' : 'xoa-sach');
    step('sauDoi.capDaNop', JSON.stringify(iw.capDaNop));
    var inp2 = $('#name-input');
    inp2.value = 'Gialinh';
    inp2.dispatchEvent(new iw.Event('input', { bubbles: true }));
    $('#name-go').click();
    C7 = lamCap(4, []);
    step('gl-so', C7.so); step('gl-dung', C7.dung);
    ketLuan(); return done();
  }
  /* ================= CÔNG TẮC NÂNG CAO (chuỗi nc-*, profile RIÊNG) =================
     nc-sach       : L8 — mọi gợi ý ẩn hết, khung kéo–thả của cấp ôn VẪN CÒN, đề đổi SỐ mà không đổi chữ
     nc-cap4       : L9 — Cấp 4 nâng cao kín câu gửi ĐÚNG MỘT dòng mang chữ "(nâng cao)"
     nc-mo-lai     : L11 — mở lại trang vẫn là đề nâng cao, vẫn nhớ đã gửi, không gửi trùng
     nc-tat-thuong : L10 — tắt công tắc, Cấp 4 đề thường vẫn gửi thêm MỘT dòng riêng (hai chế độ không đè nhau)
     nc-doi-ban    : L11 — đổi bạn xoá sạch dấu cả hai chế độ, trả công tắc về tắt                     */
  function gat() {
    var b = $('#nc-switch');
    if (!b) throw new Error('khong co cong tac nang cao');
    b.click();
  }
  function deCua(i, j) { return iw.lamVan(iw.capCua(i).ds[j]).text; }
  function deThuong(i, j) { return iw.lamVan(iw.CAP[i].ds[j]).text; }
  function vanCau(i, j) {
    var el = idoc.getElementById('card-' + iw.cauK(i, j));
    return el ? String(el.textContent) + ' ' + String(el.innerHTML) : '(khong-co-card)';
  }
  function headCua() {
    var h = idoc.querySelector('#quiz-container .lv-head');
    return h ? String(h.textContent) : '(khong-co-head)';
  }
  function demTrong(hop) { return idoc.querySelectorAll('#quiz-container ' + hop).length; }
  /* Thẻ "số phần": đề thường ghi phép cộng sẵn (2 + 3); nâng cao phải cầm đúng TỈ SỐ in trong đề
     ("2/5" hoặc "3 lần") để em tự cộng lấy số phần. Thẻ chỉ còn một con số = máy đếm hộ. */
  function thePhan() {
    var c = idoc.querySelector('#card-' + iw.cauK(1, 0) + ' .keo[data-loai="phan"]');
    if (!c) return 'khong-co-the';
    var t = String(c.textContent);
    if (t.indexOf('+') >= 0) return 'con-cong-thuc';
    return /[0-9]\\/[0-9]/.test(t) || /lần/.test(t) ? 'ty-so-trong-de' : 'so-nguyen';
  }
  /* Ống nghe: đặt máy giả vào speechSynthesis rồi gọi thẳng cô đọc ⇒ đếm số câu cô thốt ra. */
  function coTieng() {
    if (!iw.speechSynthesis || typeof iw.speechSynthesis.speak !== 'function') return 'khong-co-may';
    var cu = iw.speechSynthesis.speak, dem = 0;
    iw.speechSynthesis.speak = function () { dem++; };
    iw.baoTieng('Đỗ thẻ đúng ô TỔNG');
    iw.speechSynthesis.speak = cu;
    return dem ? 'co-tieng' : 'im';
  }
  function vaoTen(ten) {
    var inp = $('#name-input');
    inp.value = ten;
    inp.dispatchEvent(new iw.Event('input', { bubbles: true }));
    $('#name-go').click();
  }
  var C4N, C4T, C4D;

  if (P === 'nc-sach') {
    step('ncLucMo', iw.NC ? 'bat' : 'tat');
    moCong('Ban Mai');
    idoc.querySelector('.lv[data-cap="1"]').click();   /* cấp ôn: nơi DUY NHẤT có khung kéo–thả */
    step('dauHieuThuong', vanCau(1, 0).indexOf('Dấu hiệu') >= 0 ? 'con' : 'MAT-GOI-Y');
    step('headLeLoiThuong', headCua().indexOf(iw.CAP[1].hu) >= 0 ? 'con' : 'MAT');
    step('nhanThuong', vanCau(1, 0).indexOf('Kéo 4 thẻ vào sơ đồ:') >= 0 ? 'con' : 'mat-nhan');
    step('thePhanThuong', thePhan());
    step('oNhamThuong', iw.oNham('phan', idoc.getElementById('card-' + iw.cauK(1, 0))) > 0 ? 'con-nhay' : 'MAT-NHAY');
    step('coTiengThuong', coTieng());
    gat();
    step('ncSauGat', iw.NC ? 'bat' : 'tat');
    step('switchChu', String($('#nc-switch').textContent));
    step('dauHieuNC', vanCau(1, 0).indexOf('Dấu hiệu') >= 0 ? 'CON-GOI-Y' : 'an');
    step('headAnLoiNC', headCua().indexOf(iw.CAP[1].hu) >= 0 ? 'CON-GOI-Y' : 'an');
    step('headCoChuNC', headCua().indexOf(iw.LOI_DAU_NC.on) >= 0 ? 'co' : 'khong');
    step('nhanNC', vanCau(1, 0).indexOf(iw.LOI_NC.replace(/:$/, '')) >= 0 ? 'co-loi-chung' : 'mat-nhan');
    step('thePhanNC', thePhan());
    step('oNhamNC', iw.oNham('phan', idoc.getElementById('card-' + iw.cauK(1, 0))) === 0 ? 'im' : 'CON-NHAY');
    step('coTiengNC', coTieng());
    step('frameKeo', demTrong('.drop') >= 3 ? 'co-frame' : 'mat-frame');
    step('theKeo', demTrong('[draggable="true"]') >= 3 ? 'co-the' : 'mat-the');
    /* L12 — đo computed style của từng thẻ NẰM TRONG LỜI ĐỀ (không đo chuỗi nguồn): không viền,
       không nền, không đổi màu/chữ đậm hơn câu, vẫn nhấc lên được. .cumkeo ẩn chờ lượt thì bỏ qua;
       thẻ CHỜ LƯỢT (lớp cho) là chữ thường theo thiết kế nên không tính là mất kéo. */
    step('deChuThuong', (function () {
      var ds = idoc.querySelectorAll('#quiz-container .qvan .keo'), lac = 0, khongKeo = 0, dem = 0;
      for (var t = 0; t < ds.length; t++) {
        if (!ds[t].offsetParent) continue;
        dem++;
        var cs = iw.getComputedStyle(ds[t]);
        var cha = iw.getComputedStyle(ds[t].parentElement);
        var cho = String(ds[t].className).indexOf('cho') >= 0;
        if (cs.borderTopWidth !== '0px' || cs.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
            cs.borderRadius !== '0px' || cs.boxShadow !== 'none' || cs.display !== 'inline' ||
            cs.color !== cha.color || cs.fontWeight !== cha.fontWeight || cs.fontSize !== cha.fontSize) lac++;
        if (!cho && ds[t].getAttribute('draggable') !== 'true') khongKeo++;
      }
      if (!dem) return 'KHONG-CO-THE-TRONG-DE';
      return !lac && !khongKeo ? 'chu-thuong' : 'CON-KHOANH-' + lac + (khongKeo ? '-MAT-KEO-' + khongKeo : '');
    }()));
    /* dữ liệu phải CÓ MẶT TRONG câu, không nằm hết ở khay — đếm thẻ kéo được trong .qvan */
    step('deDuLieu', demTrong('.qvan .keo[draggable="true"]') >= 3 ? 'nam-trong-de' : 'DAY-VAO-KHAY');
    /* L13 — thẻ TỈ SỐ (2/5, 3 lần) phải nằm NGAY TRONG CÂU cho em tự tìm; nếu nó bị nhét lại khay
       thì em chẳng phải đọc đề, và nếu máy đưa sẵn con số phần thì bước cộng bị làm hộ. */
    step('phanTrongDe', idoc.querySelector('#card-' + iw.cauK(1, 0) + ' .qvan .keo[data-loai="phan"]')
      ? 'nam-trong-de' : 'DAY-VAO-KHAY');
    step('khayKhongPhan', demTrong('.qkeo .keo[data-loai="phan"]') === 0
      ? 'sach-khay' : 'CON-' + demTrong('.qkeo .keo[data-loai="phan"]') + '-THE-PHAN');
    /* khay sạch thẻ thì dấu ":" cuối nhãn là câu treo giữa trang ⇒ phải khép lại bằng dấu chấm */
    step('nhanKhongTreO', (function () {
      var cs = idoc.querySelectorAll('#quiz-container .qkeo'), loi = 0;
      for (var t = 0; t < cs.length; t++) {
        var n = cs[t].querySelector('.nhan');
        if (n && !cs[t].querySelectorAll('.keo').length && /:\\s*$/.test(String(n.textContent))) loi++;
      }
      return loi ? 'CON-' + loi : 'tron-van';
    }()));
    step('oNhapSo', demTrong('input[type="number"]') >= 1 ? 'co' : 'mat-o');
    step('deKhac', deCua(1, 0) !== deThuong(1, 0) ? 'khac' : 'GIONG-NGHET');
    step('chiSoDoi', deCua(1, 0).replace(/[0-9]/g, '') === deThuong(1, 0).replace(/[0-9]/g, '')
      ? 'chu-giong-nguyen' : 'DA-SAI-CHU');
    step('ncLoi', String($('#nc-loi').textContent).indexOf('Đề nâng cao') === 0 ? 'co' : 'khong');
    step('posts', iw.__posts.length);
    return done();
  }
  if (P === 'nc-cap4') {
    step('ncTuLoadSau', iw.NC ? 'bat' : 'tat');           /* công tắc phải sống trong kho giữ bài */
    C4N = lamCap(4, W[4]);
    step('nc4-so', C4N.so); step('nc4-dung', C4N.dung); step('nc4-tong', C4N.tong);
    step('banner', String($('#submit-bar').textContent).indexOf('Cấp 4 đã gửi') >= 0 ? 'co-banner' : 'khong-banner');
    step('tabDauGhi', String(idoc.querySelector('.lv[data-cap="4"]').textContent).indexOf('đã gửi') >= 0 ? 'co' : 'khong');
    step('dauHieuVanAn', vanCau(4, 0).indexOf('Dấu hiệu') >= 0 ? 'CON-GOI-Y' : 'an');
    ketLuan(); return done();
  }
  if (P === 'nc-mo-lai') {
    step('ncTuKho', iw.NC ? 'bat' : 'tat');
    step('tenKho', $('#runner-name') ? $('#runner-name').textContent : '-');
    step('cap4DaGuiNC', iw.capDaNop['nc-4'] ? 'co' : 'khong');
    step('cap4DaGuiThuong', iw.capDaNop['th-4'] ? 'co' : 'khong');
    step('deVanNangCao', iw.capCua(4) !== iw.CAP[4] ? 'de-nang-cao' : 'VE-DE-THUONG');
    idoc.querySelector('.lv[data-cap="4"]').click();
    step('banner', String($('#submit-bar').textContent).indexOf('Cấp 4 đã gửi') >= 0 ? 'co-banner' : 'khong-banner');
    step('nutNop', $('#btn-nop') ? 'co-nut' : 'khong');
    if ($('#btn-nop')) $('#btn-nop').click();             /* bản lỗi sẽ gửi trùng ngay tại đây */
    ketLuan(); return done();
  }
  if (P === 'nc-tat-thuong') {
    step('ncTruocTat', iw.NC ? 'bat' : 'tat');
    gat();
    step('ncSauTat', iw.NC ? 'bat' : 'tat');
    step('goiYTroVe', vanCau(4, 0).indexOf('Dấu hiệu') >= 0 ? 'con' : 'MAT-GOI-Y');
    step('headTroVe', headCua().indexOf(iw.CAP[4].hu) >= 0 ? 'con' : 'MAT-LOI-DAU');
    step('coTiengTroVe', coTieng());
    C4T = lamCap(4, []);
    step('th4-so', C4T.so); step('th4-dung', C4T.dung); step('th4-tong', C4T.tong);
    step('cap4ThuongDaGui', iw.capDaNop['th-4'] ? 'co' : 'khong');
    step('cap4NangCaoVanGui', iw.capDaNop['nc-4'] ? 'co' : 'khong');
    ketLuan(); return done();
  }
  if (P === 'nc-doi-ban') {
    /* Phase trước TẮT công tắc để đo L10 ⇒ ở đây bật lại: màn tổng kết nâng cao chỉ hiện khi đủ
       bốn cấp của CHẾ ĐỘ NÂNG CAO (nc-4 đã gửi từ nc-cap4, nc-5·6·7 làm xong ngay dưới đây). */
    if (!iw.NC) gat();
    step('ncDaBatLai', iw.NC ? 'bat' : 'tat');
    [5, 6, 7].forEach(function (i) {
      var r = lamCap(i, []);
      step('nc' + i + '-so', r.so); step('nc' + i + '-dung', r.dung); step('nc' + i + '-tong', r.tong);
    });
    step('baoCaoNC', an(idoc.getElementById('report-wrap')) ? 'an' : 'hien');
    var mN = String($('#report-wrap').textContent).match(/([0-9]+) sao trên tối đa ([0-9]+)/);
    step('reportSao', mN ? mN[1] + '/' + mN[2] : 'khong-co');
    step('reportCheDo', String($('#report-wrap').textContent).indexOf('(nâng cao)') >= 0 ? 'co-dau' : 'khong-dau');
    var nut2 = $('#btn-sangay');
    if (!nut2) throw new Error('khong co nut "Ghi tên bạn khác" tren tong ket nang cao');
    nut2.click();
    step('sauDoi.NC', iw.NC ? 'bat' : 'tat');
    step('sauDoi.kho', iw.localStorage.getItem('${KHO}') ? 'con-kho' : 'xoa-sach');
    step('sauDoi.capDaNop', JSON.stringify(iw.capDaNop));
    vaoTen('Gialinh');
    gat();
    C4D = lamCap(4, []);
    step('gl2-dung', C4D.dung); step('gl2-tong', C4D.tong);
    ketLuan(); return done();
  }
  throw new Error('phase la: ' + P);
}
<\/script></body></html>`;
}

/* ---------------- BẢN GỐC + ĐỘT BIẾN ---------------- */
const P_ALL = ['sach', 'cap4', 'nua-cap5', 'mo-lai', 'on', 'chan-on', 'du', 'sau-nop', 'doi-ban'];
const P_NC = ['nc-sach', 'nc-cap4', 'nc-mo-lai', 'nc-tat-thuong', 'nc-doi-ban'];
const DOT_BIEN = [
  { ten: 'GOC', phase: P_ALL.concat(P_NC), sua: [] },
  { ten: 'M1-cap-kin-khong-tu-gui', mo: 'cấp vừa kín câu không tự gửi (bắt em bấm nút)', phase: ['sach', 'cap4'],
    sua: [['if (daXongCap(i)) nopCap(i);', 'if (false) nopCap(i);']] },
  { ten: 'M2-dong-van-tinh-ca-bai', mo: 'dòng Sheet vẫn tính cả 16 câu của bốn cấp', phase: ['sach', 'cap4'],
    sua: [['var keys = keysCapi(i);', 'var keys = keyCham();']] },
  { ten: 'M3-mo-lai-gui-trung', mo: 'mở lại trang là gửi trùng cấp', phase: ['sach', 'cap4', 'nua-cap5', 'mo-lai'],
    sua: [['\n  capDaNop[mucK(i)] = true;\n  var sent = sendResult(rec);', '\n  var sent = sendResult(rec);']] },
  { ten: 'M4-dong-que-cot-Cap', mo: 'cột "Cấp" trên Sheet bị bỏ trống', phase: ['sach', 'cap4'],
    sua: [['    cap: String(i),', "    cap: '',"]] },
  { ten: 'M5-cap-on-bi-gui', mo: 'cấp ôn 1·2·3 cũng bị gửi thành dòng', phase: ['sach', 'chan-on'],
    sua: [['if (!runState || !laCapCham(i) || capDaNop[mucK(i)] || !daXongCap(i)) return;', 'if (!runState || capDaNop[mucK(i)] || !daXongCap(i)) return;']] },
  { ten: 'M6-tong-ket-post-them', mo: 'màn tổng kết POST thêm dòng thứ năm', phase: ['sach', 'cap4', 'nua-cap5', 'mo-lai', 'on', 'du'],
    sua: [['\n  showReport(findRoster(runState.label), baoCaoCua());', "\n  sendResult({ ten: runState.label, ngay: ngayLamBai(new Date()), cap: 'TONG KET', dung: dung, tong: keys.length, sao: tongSao, phanTram: '', loiSai: '', dapAnCuaEm: '' });\n  showReport(findRoster(runState.label), baoCaoCua());"]] },
  /* --- đột biến RIÊNG chế độ nâng cao: mỗi con phải làm cháy một hàng nc- đang xanh --- */
  { ten: 'N1-de-nang-cao-giong-nguyen', mo: 'máy sinh âm thầm trả lại đề thường (công tắc không đổi số)', phase: ['nc-sach'],
    sua: [['cap.ds.push(nq || q);', 'cap.ds.push(q);']] },
  { ten: 'N2-hien-loi-chi-dan-cach-lam', mo: 'dòng đầu cấp vẫn ghi lời chỉ dẫn cách làm của đề thường', phase: ['nc-sach'],
    sua: [['(NC ? (cham ? LOI_DAU_NC.cham : LOI_DAU_NC.on) : capCua(activeCap).hu)', 'capCua(activeCap).hu']] },
  { ten: 'N3-con-nhan-cach-lam', mo: 'nhãn khay thẻ vẫn bảo "Kéo 4 thẻ vào sơ đồ:" (đề thường)', phase: ['nc-sach'],
    sua: [["var nhan = NC ? LOI_NC : 'Kéo 4 thẻ vào sơ đồ:';", "var nhan = 'Kéo 4 thẻ vào sơ đồ:';"]] },
  { ten: 'N4-mat-khung-keo-tha', mo: 'nâng cao ẩn LUÔN sơ đồ kéo (phải giữ khung, chỉ ẩn gợi ý)', phase: ['nc-sach'],
    sua: [["if (!cham) html += veBuKeo(i, j, nc) + veSoDoKeo(i, j)", "if (!cham && !NC) html += veBuKeo(i, j, nc) + veSoDoKeo(i, j)"]] },
  { ten: 'N5-con-tu-goi-y', mo: 'chữ "Dấu hiệu" vẫn hiện trên đề nâng cao', phase: ['nc-sach', 'nc-cap4'],
    sua: [["(NC ? '' : '<span class=\"qdh\">Dấu hiệu: ' + q.dh + '</span>')", "'<span class=\"qdh\">Dấu hiệu: ' + q.dh + '</span>'"]] },
  { ten: 'N6-the-so-phan-van-cong-ho', mo: 'thẻ số phần nâng cao vẫn ghi phép cộng "2 + 3" — đếm hộ em', phase: ['nc-sach'],
    sua: [["if (loai === 'phan') return NC ? tySoTrongDe(q, s) : s.nho + ' + ' + s.to;", "if (loai === 'phan') return s.nho + ' + ' + s.to;"]] },
  { ten: 'N7-o-van-nhay-sanh', mo: 'ô đích vẫn nháy viền sẵn khi cầm thẻ lúc đang nâng cao', phase: ['nc-sach'],
    sua: [['function oNham(loai, root) {\n  boNham();\n  if (NC) return 0;', 'function oNham(loai, root) {\n  boNham();']] },
  { ten: 'N8-co-van-doc', mo: 'cô trợ giảng vẫn đọc khi đang nâng cao (ẩn cô là điều kiện bắt buộc)', phase: ['nc-sach'],
    sua: [['function baoTieng(msg) {\n  if (NC) return;', 'function baoTieng(msg) {']] },
  { ten: 'N9-dong-khong-dau-che-do', mo: 'dòng Sheet mất chữ "(nâng cao)" — thầy không phân biệt được hai đề', phase: ['nc-sach', 'nc-cap4'],
    sua: [["function chenCheDo(s) { return NC ? '(nâng cao) ' + s : String(s); }", 'function chenCheDo(s) { return String(s); }']] },
  { ten: 'N10-hai-che-do-de-trung-nhau', mo: 'phím cấp không khóa theo chế độ ⇒ đề thường mất dòng thứ hai', phase: ['nc-sach', 'nc-cap4', 'nc-mo-lai', 'nc-tat-thuong'],
    sua: [["function mucK(i) { return cheDoK() + '-' + i; }", 'function mucK(i) { return String(i); }']] },
  { ten: 'N11-mat-cong-tac', mo: 'mất công tắc nâng cao trên màn luyện tập', phase: ['nc-sach'],
    sua: [['<button type="button" class="nc-switch" id="nc-switch"', '<button type="button" class="nc-switch" id="nc-switch-xoa']] },
  { ten: 'N12-nut-khong-duoc-noi', mo: 'nút hiện ra nhưng không được nối ⇒ click vô ích (lỗi thật 27/10 của bài 3)', phase: ['nc-sach'],
    sua: [['if (!b.onclick) b.onclick = batNC;', '']] },
  { ten: 'N13-de-van-khoanh-goi-y', mo: 'thẻ trong lời đề nâng cao vẫn viền khoanh (quên gắn lớp thuong)', phase: ['nc-sach'],
    sua: [["'<span class=\"keo thuong\" id=\"keo-q-'", "'<span class=\"keo\" id=\"keo-q-'"]] },
  { ten: 'N14-css-thuong-bi-ten', mo: 'lớp thuong có gắn nhưng CSS bị đổi tên ⇒ vòng khoanh còn nguyên trên màn hình', phase: ['nc-sach'],
    sua: [['.keo.thuong { display: inline;', '.keo.thuongX { display: inline;']] },
  { ten: 'N15-du-lieu-bi-rut-khoi-de', mo: 'đề nâng cao vẫn bày hết dữ liệu ra khay — bé không phải tự tìm trong câu', phase: ['nc-sach'],
    sua: [["var nc = NC && !cham ? vanKeoNC(q, doiSo(q.dk), i + '-' + j, r.text) : null;", 'var nc = null;']] },
  { ten: 'N16-the-phan-tra-san-cong-so', mo: 'nâng cao đưa sẵn con số phần đã cộng (7) — em mất bước cộng tỉ số', phase: ['nc-sach'],
    sua: [['return NC ? tySoTrongDe(q, s) : s.nho', 'return NC ? String(s.n) : s.nho']] },
  { ten: 'N17-thi-phan-tim-bang-con-so', mo: 'thẻ tỉ số bị đi tìm bằng con số đáp thay bằng chữ in trong đề ⇒ rơi lại khay', phase: ['nc-sach'],
    sua: [["var chu = p.loai === 'phan' ? String(p.txt) : String(p.gia);", 'var chu = String(p.gia);']] },
  { ten: 'N18-nhan-tre-dau-hai-cham', mo: 'khay đã sạch thẻ mà nhãn vẫn kết thúc bằng ":" — câu treo giữa trang', phase: ['nc-sach'],
    sua: [["if (nc && !c.length) nhan = nhan.replace(/:$/, '.');", '']] },
  { ten: 'N19-the-ty-so-in-chu-la', mo: 'thẻ số phần lấy kiểu "k lần" cho MỌI câu ⇒ câu tỉ số in ra "null lần" ngay trên đề', phase: ['nc-sach'],
    sua: [["if (/\\{lan\\}/.test(mau)) return s.lan + ' lần';", "if (true) return s.lan + ' lần';"]] },
  { ten: 'AM-TINH-doi-mau-banner', mo: 'chỉ đổi màu nền banner — phải KHÔNG cháy hàng nào', phase: P_ALL.concat(P_NC),
    sua: [['background:#DCFCE7', 'background:#F0FDF4']] }
];

const cache = {};
function dungBien(d) {
  const thu = path.join(os.tmpdir(), 'bai4-nop-cap-' + d.ten);
  const profile = path.join(os.tmpdir(), 'bai4-nop-cap-profile-' + d.ten);
  /* hai profile: chuỗi thường và chuỗi nâng cao mỗi chuỗi phải nối tiếp nhau mà không bị nháp của
     chuỗi kia chen vào (moLaiBai phục hồi NC + cấp đã gửi từ đúng một kho localStorage). */
  const profileNc = path.join(os.tmpdir(), 'bai4-nop-cap-ncprofile-' + d.ten);
  fs.rmSync(thu, { recursive: true, force: true });
  fs.rmSync(profile, { recursive: true, force: true });  /* profile cũ mang nháp lần trước sang là đo sai */
  fs.rmSync(profileNc, { recursive: true, force: true });
  fs.mkdirSync(thu, { recursive: true });
  let noi = goc.replace(/\r\n/g, '\n');
  d.sua.forEach(function (s) {
    const dem = noi.split(s[0]).length - 1;
    if (dem !== 1) throw new Error('đột biến ' + d.ten + ': neo "' + s[0].slice(0, 44) + '" khớp ' + dem + ' lần');
    noi = noi.replace(s[0], function () { return s[1]; });
  });
  fs.writeFileSync(path.join(thu, 'index.html'), noi.replace(/\n/g, '\r\n'), 'utf8');
  fs.writeFileSync(path.join(thu, 'driver.html'), driverHtml(), 'utf8');
  ['anh-avatar', 'tro-giang'].forEach(function (t) {
    const p = path.join(__dirname, '..', t);
    if (fs.existsSync(p)) fs.cpSync(p, path.join(thu, t), { recursive: true });
  });
  cache[d.ten] = { thu: thu, profile: profile, profileNc: profileNc };
}

function docPhase(d, p) {
  const u = urlOf(path.join(cache[d.ten].thu, 'driver.html')) + '?p=' + p;
  const r = spawnSync(CHROME, ['--headless=new', '--disable-gpu', '--no-sandbox',
    '--allow-file-access-from-files',
    '--user-data-dir=' + (p.indexOf('nc-') === 0 ? cache[d.ten].profileNc : cache[d.ten].profile),
    '--virtual-time-budget=26000', '--dump-dom', u], { encoding: 'utf8', maxBuffer: 1 << 26 });
  const dom = (r.stdout || '').replace(/\r/g, '');
  const m = /@KQ@ ([\s\S]*?) @END@/.exec(dom);
  if (!m) return { 'LOI-DRIVER': 'driver im lặng: ' + dom.slice(0, 300).replace(/\s+/g, ' ') };
  const o = {};
  m[1].split(' @|@ ').forEach(function (x) { const i = x.indexOf('='); o[x.slice(0, i)] = x.slice(i + 1); });
  return o;
}

/* ---------------- BẢNG HÀNG ---------------- */
function hang(L, p, ten, giaTri, mong, kiem) {
  L.push({ phase: p, hang: p + ' · ' + ten, giaTri: giaTri === undefined ? '(KHONG-CO-HANG)' : giaTri, mong: String(mong),
    dat: kiem ? kiem(giaTri) : giaTri === String(mong) });
}
function postHang(L, o, p, k, ten, mong, kiem) {
  hang(L, p, 'post' + k + '.' + ten, o['post' + k + '.' + ten], mong, kiem);
}

function bang(kq) {
  const L = [];
  const s = kq.sach || {}, c4 = kq.cap4 || {}, n5 = kq['nua-cap5'] || {}, ml = kq['mo-lai'] || {},
    on = kq.on || {}, co = kq['chan-on'] || {}, du = kq.du || {}, sn = kq['sau-nop'] || {}, db = kq['doi-ban'] || {};
  const ns = kq['nc-sach'] || {}, nc4 = kq['nc-cap4'] || {}, nml = kq['nc-mo-lai'] || {},
    nt = kq['nc-tat-thuong'] || {}, nd = kq['nc-doi-ban'] || {};
  /* Mỗi phase đều báo máy có giọng đọc hay không: đột biến chỉ chạy chuỗi nc- thì không có
     hàng "sach" để đọc ⇒ phải lấy từ chính phase nc-sach, nếu không hàng cô đọc cháy GIẢ và
     một đột biến đui thật vẫn bị tưởng là có răng. */
  const mayCoTieng = (s.coTiengMay || ns.coTiengMay || nt.coTiengMay) === 'co';
  Object.keys(kq).forEach(function (p) { if (kq[p]['LOI-DRIVER']) hang(L, p, 'driver', kq[p]['LOI-DRIVER'], 'chay duoc'); });

  if (kq.sach) {
    hang(L, 'sach', 'selfTest-loi', s['selfTest-loi'], '0');
    hang(L, 'sach', 'soMucTkiem', s['soMucTkiem'], mayCoTieng ? '117' : '115');
    hang(L, 'sach', 'coTiengMay', s['coTiengMay'], 'co|khong', function (v) { return v === 'co' || v === 'khong'; });
    hang(L, 'sach', 'congTen', s['congTen'], 'hien');
    hang(L, 'sach', 'kho', s['kho'], 'khong');
    hang(L, 'sach', 'postsTruocKhiCham', s['postsTruocKhiCham'], '0');
    hang(L, 'sach', 'posts', s['posts'], '0');
  }
  /* L1+L2+L3: Cấp 4 kín câu → đúng MỘT dòng, total = số câu cấp 4, sao tính trong cấp */
  if (kq.cap4) {
    const tong4 = +c4['cap4-tong'], dung4 = +c4['cap4-dung'];
    hang(L, 'cap4', 'selfTest-loi', c4['selfTest-loi'], '0');
    hang(L, 'cap4', 'posts', c4['posts'], '1');
    hang(L, 'cap4', 'banner', c4['banner'], 'co-banner');
    hang(L, 'cap4', 'tabDauGhi', c4['tabDauGhi'], 'co');
    postHang(L, c4, 'cap4', 0, 'form', 'dung-form');
    postHang(L, c4, 'cap4', 0, 'charset', 'UTF-8/co-utf8');
    postHang(L, c4, 'cap4', 0, 'soEntry', '9');
    postHang(L, c4, 'cap4', 0, 'ten', 'Ban Mai');
    postHang(L, c4, 'cap4', 0, 'cap', '4');
    postHang(L, c4, 'cap4', 0, 'ngay', 'dd/MM-HH:mm');
    postHang(L, c4, 'cap4', 0, 'dung', String(dung4));
    postHang(L, c4, 'cap4', 0, 'tong', String(tong4));
    postHang(L, c4, 'cap4', 0, 'sao', String(saoTu(dung4, tong4)));
    postHang(L, c4, 'cap4', 0, 'phanTram', Math.round(dung4 / tong4 * 100) + '%');
    postHang(L, c4, 'cap4', 0, 'loiSaiDau', 'Không sai câu nào', function (v) { return String(v).indexOf('Không sai câu nào') === 0; });
    postHang(L, c4, 'cap4', 0, 'dapAnDau', 'Bài 4.', function (v) { return String(v).indexOf('Bài 4.') === 0; });
    postHang(L, c4, 'cap4', 0, 'dapAnDong', '1');
  }
  if (kq['nua-cap5']) {
    hang(L, 'nua-cap5', 'posts', n5['posts'], '0');
    hang(L, 'nua-cap5', 'barCon', n5['barCon'], 'con-cau');
    hang(L, 'nua-cap5', 'nutNop', n5['nutNop'], 'khong');
  }
  /* L5: mở lại trang — không gửi trùng, vẫn nhớ Cấp 4, không có nút gửi tay thừa */
  if (kq['mo-lai']) {
    hang(L, 'mo-lai', 'selfTest-loi', ml['selfTest-loi'], '0');
    hang(L, 'mo-lai', 'tenKho', ml['tenKho'], 'Ban Mai');
    hang(L, 'mo-lai', 'cap4DaGui', ml['cap4DaGui'], 'co');
    hang(L, 'mo-lai', 'banner', ml['banner'], 'co-banner');
    hang(L, 'mo-lai', 'nutNop', ml['nutNop'], 'khong');
    hang(L, 'mo-lai', 'ghichuPhucHoi', ml['ghichuPhucHoi'], 'co');
    hang(L, 'mo-lai', 'posts', ml['posts'], '0');
  }
  /* L4: cấp ôn làm kín vẫn im lặng, cả khi gọi thẳng nopCap(1) */
  if (kq.on) {
    hang(L, 'on', 'posts', on['posts'], '0');
    hang(L, 'on', 'barOn', on['barOn'], 'on-khong-gui');
  }
  if (kq['chan-on']) {
    hang(L, 'chan-on', 'nopCap1', co['nopCap1'], '0');
    hang(L, 'chan-on', 'posts', co['posts'], '0');
  }
  /* L2/L3/L7: đủ bốn cấp → đúng ba dòng nữa (5,6,7) và tổng kết chỉ vẽ */
  if (kq.du) {
    const soCau = [5, 6, 7].map(function (i) { return { i: i, dung: +du['lam' + i + '-dung'], tong: +du['lam' + i + '-tong'] }; });
    hang(L, 'du', 'posts', du['posts'], '3');
    soCau.forEach(function (c, k) {
      postHang(L, du, 'du', k, 'cap', String(c.i));
      postHang(L, du, 'du', k, 'dung', String(c.dung));
      postHang(L, du, 'du', k, 'tong', String(c.tong));
      postHang(L, du, 'du', k, 'sao', String(saoTu(c.dung, c.tong)));
      postHang(L, du, 'du', k, 'phanTram', Math.round(c.dung / c.tong * 100) + '%');
      postHang(L, du, 'du', k, 'loiSaiDau', 'Bài ' + c.i + '.', function (v) { return String(v).indexOf('Bài ' + c.i + '.') === 0; });
      postHang(L, du, 'du', k, 'dapAnDau', 'Bài ' + c.i + '.', function (v) { return String(v).indexOf('Bài ' + c.i + '.') === 0; });
      postHang(L, du, 'du', k, 'dapAnDong', '1');
    });
    const tongSao = soCau.reduce(function (a, c) { return a + saoTu(c.dung, c.tong); }, 0) + saoTu(+c4['cap4-dung'], +c4['cap4-tong']);
    hang(L, 'du', 'baoCao', du['baoCao'], 'hien');
    hang(L, 'du', 'reportSao', du['reportSao'], tongSao + '/12');
    hang(L, 'du', 'reportDong', du['reportDong'], 'du-bon');
    hang(L, 'du', 'congTenAn', du['congTenAn'], 'an');
  }
  if (kq['sau-nop']) {
    hang(L, 'sau-nop', 'posts', sn['posts'], '0');
    hang(L, 'sau-nop', 'baoCao', sn['baoCao'], 'hien');
    hang(L, 'sau-nop', 'reportTongKet', sn['reportTongKet'], 'co');
    hang(L, 'sau-nop', 'reportDuBon', sn['reportDuBon'], 'co');
    hang(L, 'sau-nop', 'luyenTapAn', sn['luyenTapAn'], 'an');
  }
  /* L6: đổi bạn là xoá sạch dấu "đã gửi" */
  if (kq['doi-ban']) {
    hang(L, 'doi-ban', 'sauDoi.congTen', db['sauDoi.congTen'], 'hien');
    hang(L, 'doi-ban', 'sauDoi.kho', db['sauDoi.kho'], 'xoa-sach');
    hang(L, 'doi-ban', 'sauDoi.capDaNop', db['sauDoi.capDaNop'], '{}');
    hang(L, 'doi-ban', 'posts', db['posts'], '1');
    postHang(L, db, 'doi-ban', 0, 'ten', 'Gia Linh');
    postHang(L, db, 'doi-ban', 0, 'cap', '4');
    postHang(L, db, 'doi-ban', 0, 'dung', String(db['gl-dung']));
    postHang(L, db, 'doi-ban', 0, 'sao', '3');
  }

  /* ================= HÀNG CỦA CHẾ ĐỘ NÂNG CAO (L8–L11) ================= */
  if (kq['nc-sach']) {
    hang(L, 'nc-sach', 'selfTest-loi', ns['selfTest-loi'], '0');
    hang(L, 'nc-sach', 'ncLucMo', ns['ncLucMo'], 'tat');
    hang(L, 'nc-sach', 'dauHieuThuong', ns['dauHieuThuong'], 'con');
    hang(L, 'nc-sach', 'headLeLoiThuong', ns['headLeLoiThuong'], 'con');
    hang(L, 'nc-sach', 'nhanThuong', ns['nhanThuong'], 'con');
    hang(L, 'nc-sach', 'thePhanThuong', ns['thePhanThuong'], 'con-cong-thuc');
    hang(L, 'nc-sach', 'oNhamThuong', ns['oNhamThuong'], 'con-nhay');
    hang(L, 'nc-sach', 'coTiengThuong', ns['coTiengThuong'], mayCoTieng ? 'co-tieng' : 'khong-co-may');
    hang(L, 'nc-sach', 'ncSauGat', ns['ncSauGat'], 'bat');
    hang(L, 'nc-sach', 'switchChu', ns['switchChu'], 'NÂNG CAO: đang bật');
    hang(L, 'nc-sach', 'dauHieuNC', ns['dauHieuNC'], 'an');
    hang(L, 'nc-sach', 'headAnLoiNC', ns['headAnLoiNC'], 'an');
    hang(L, 'nc-sach', 'headCoChuNC', ns['headCoChuNC'], 'co');
    hang(L, 'nc-sach', 'nhanNC', ns['nhanNC'], 'co-loi-chung');
    hang(L, 'nc-sach', 'thePhanNC', ns['thePhanNC'], 'ty-so-trong-de');
    hang(L, 'nc-sach', 'oNhamNC', ns['oNhamNC'], 'im');
    hang(L, 'nc-sach', 'coTiengNC', ns['coTiengNC'], 'im');
    hang(L, 'nc-sach', 'frameKeo', ns['frameKeo'], 'co-frame');
    hang(L, 'nc-sach', 'theKeo', ns['theKeo'], 'co-the');
  hang(L, 'nc-sach', 'deChuThuong', ns['deChuThuong'], 'chu-thuong');
  hang(L, 'nc-sach', 'deDuLieu', ns['deDuLieu'], 'nam-trong-de');
  hang(L, 'nc-sach', 'phanTrongDe', ns['phanTrongDe'], 'nam-trong-de');
  hang(L, 'nc-sach', 'khayKhongPhan', ns['khayKhongPhan'], 'sach-khay');
  hang(L, 'nc-sach', 'nhanKhongTreO', ns['nhanKhongTreO'], 'tron-van');
    hang(L, 'nc-sach', 'oNhapSo', ns['oNhapSo'], 'co');
    hang(L, 'nc-sach', 'deKhac', ns['deKhac'], 'khac');
    hang(L, 'nc-sach', 'chiSoDoi', ns['chiSoDoi'], 'chu-giong-nguyen');
    hang(L, 'nc-sach', 'ncLoi', ns['ncLoi'], 'co');
    hang(L, 'nc-sach', 'posts', ns['posts'], '0');
  }
  /* L9: Cấp 4 nâng cao kín câu → ĐÚNG MỘT dòng, dấu "(nâng cao)" nằm trong cột có sẵn */
  if (kq['nc-cap4']) {
    const t4 = +nc4['nc4-tong'], d4 = +nc4['nc4-dung'];
    hang(L, 'nc-cap4', 'selfTest-loi', nc4['selfTest-loi'], '0');
    hang(L, 'nc-cap4', 'ncTuLoadSau', nc4['ncTuLoadSau'], 'bat');
    hang(L, 'nc-cap4', 'posts', nc4['posts'], '1');
    hang(L, 'nc-cap4', 'banner', nc4['banner'], 'co-banner');
    hang(L, 'nc-cap4', 'tabDauGhi', nc4['tabDauGhi'], 'co');
    hang(L, 'nc-cap4', 'dauHieuVanAn', nc4['dauHieuVanAn'], 'an');
    postHang(L, nc4, 'nc-cap4', 0, 'form', 'dung-form');
    postHang(L, nc4, 'nc-cap4', 0, 'soEntry', '9');
    postHang(L, nc4, 'nc-cap4', 0, 'ten', 'Ban Mai');
    postHang(L, nc4, 'nc-cap4', 0, 'cap', '4');
    postHang(L, nc4, 'nc-cap4', 0, 'ngay', 'dd/MM-HH:mm');
    postHang(L, nc4, 'nc-cap4', 0, 'dung', String(d4));
    postHang(L, nc4, 'nc-cap4', 0, 'tong', String(t4));
    postHang(L, nc4, 'nc-cap4', 0, 'sao', String(saoTu(d4, t4)));
    postHang(L, nc4, 'nc-cap4', 0, 'phanTram', Math.round(d4 / t4 * 100) + '%');
    postHang(L, nc4, 'nc-cap4', 0, 'loiSaiDau', '(nâng cao) …', function (v) { return String(v).indexOf('(nâng cao)') === 0; });
    postHang(L, nc4, 'nc-cap4', 0, 'dapAnDau', '(nâng cao) Bài 4.1', function (v) { return String(v).indexOf('(nâng cao) Bài 4.1') === 0; });
    postHang(L, nc4, 'nc-cap4', 0, 'dapAnDong', '1');
  }
  /* L11: công tắc + dấu đã gửi cùng sống trong kho giữ bài */
  if (kq['nc-mo-lai']) {
    hang(L, 'nc-mo-lai', 'selfTest-loi', nml['selfTest-loi'], '0');
    hang(L, 'nc-mo-lai', 'ncTuKho', nml['ncTuKho'], 'bat');
    hang(L, 'nc-mo-lai', 'tenKho', nml['tenKho'], 'Ban Mai');
    hang(L, 'nc-mo-lai', 'cap4DaGuiNC', nml['cap4DaGuiNC'], 'co');
    hang(L, 'nc-mo-lai', 'cap4DaGuiThuong', nml['cap4DaGuiThuong'], 'khong');
    hang(L, 'nc-mo-lai', 'deVanNangCao', nml['deVanNangCao'], 'de-nang-cao');
    hang(L, 'nc-mo-lai', 'banner', nml['banner'], 'co-banner');
    hang(L, 'nc-mo-lai', 'nutNop', nml['nutNop'], 'khong');
    hang(L, 'nc-mo-lai', 'posts', nml['posts'], '0');
  }
  /* L10: hai chế độ hai nháp riêng ⇒ tắt công tắc vẫn gửi thêm được dòng của đề thường */
  if (kq['nc-tat-thuong']) {
    const t4 = +nt['th4-tong'], d4 = +nt['th4-dung'];
    hang(L, 'nc-tat-thuong', 'selfTest-loi', nt['selfTest-loi'], '0');
    hang(L, 'nc-tat-thuong', 'ncTruocTat', nt['ncTruocTat'], 'bat');
    hang(L, 'nc-tat-thuong', 'ncSauTat', nt['ncSauTat'], 'tat');
    hang(L, 'nc-tat-thuong', 'goiYTroVe', nt['goiYTroVe'], 'con');
    hang(L, 'nc-tat-thuong', 'headTroVe', nt['headTroVe'], 'con');
    hang(L, 'nc-tat-thuong', 'coTiengTroVe', nt['coTiengTroVe'], mayCoTieng ? 'co-tieng' : 'khong-co-may');
    hang(L, 'nc-tat-thuong', 'posts', nt['posts'], '1');
    hang(L, 'nc-tat-thuong', 'cap4ThuongDaGui', nt['cap4ThuongDaGui'], 'co');
    hang(L, 'nc-tat-thuong', 'cap4NangCaoVanGui', nt['cap4NangCaoVanGui'], 'co');
    postHang(L, nt, 'nc-tat-thuong', 0, 'cap', '4');
    postHang(L, nt, 'nc-tat-thuong', 0, 'dung', String(d4));
    postHang(L, nt, 'nc-tat-thuong', 0, 'tong', String(t4));
    postHang(L, nt, 'nc-tat-thuong', 0, 'sao', String(saoTu(d4, t4)));
    postHang(L, nt, 'nc-tat-thuong', 0, 'loiSaiDau', 'Không sai câu nào', function (v) { return String(v).indexOf('Không sai câu nào') === 0; });
    postHang(L, nt, 'nc-tat-thuong', 0, 'dapAnDau', 'Bài 4.1', function (v) { return String(v).indexOf('Bài 4.1') === 0; });
  }
  if (kq['nc-doi-ban']) {
    hang(L, 'nc-doi-ban', 'selfTest-loi', nd['selfTest-loi'], '0');
    hang(L, 'nc-doi-ban', 'ncDaBatLai', nd['ncDaBatLai'], 'bat');
    [5, 6, 7].forEach(function (i) {
      hang(L, 'nc-doi-ban', 'nc' + i + '-day-du', nd['nc' + i + '-dung'] === nd['nc' + i + '-tong'] ? 'du' : 'THIEU-CAU', 'du');
    });
    hang(L, 'nc-doi-ban', 'baoCaoNC', nd['baoCaoNC'], 'hien');
    hang(L, 'nc-doi-ban', 'reportSao', nd['reportSao'], '12/12');
    hang(L, 'nc-doi-ban', 'reportCheDo', nd['reportCheDo'], 'co-dau');
    hang(L, 'nc-doi-ban', 'posts', nd['posts'], '4');
    hang(L, 'nc-doi-ban', 'sauDoi.NC', nd['sauDoi.NC'], 'tat');
    hang(L, 'nc-doi-ban', 'sauDoi.kho', nd['sauDoi.kho'], 'xoa-sach');
    hang(L, 'nc-doi-ban', 'sauDoi.capDaNop', nd['sauDoi.capDaNop'], '{}');
    postHang(L, nd, 'nc-doi-ban', 3, 'ten', 'Gia Linh');
    postHang(L, nd, 'nc-doi-ban', 3, 'cap', '4');
    postHang(L, nd, 'nc-doi-ban', 3, 'dung', String(nd['gl2-dung']));
    postHang(L, nd, 'nc-doi-ban', 3, 'tong', String(nd['gl2-tong']));
    postHang(L, nd, 'nc-doi-ban', 3, 'sao', '3');
    postHang(L, nd, 'nc-doi-ban', 3, 'loiSaiDau', '(nâng cao) …', function (v) { return String(v).indexOf('(nâng cao)') === 0; });
    postHang(L, nd, 'nc-doi-ban', 3, 'dapAnDau', '(nâng cao) Bài 4.1', function (v) { return String(v).indexOf('(nâng cao) Bài 4.1') === 0; });
  }
  return L;
}

/* ---------------- CHẠY ---------------- */
console.log('ĐO TRÊN FILE GIAO: ' + path.relative(path.join(__dirname, '..', '..'), BAI) + ' (' + Buffer.byteLength(goc, 'utf8') + ' byte · ' + PHASES_OF() + ' phase cho bản gốc)');
function PHASES_OF() { return DOT_BIEN[0].phase.length; }
DOT_BIEN.forEach(dungBien);
if (process.env.ONLY) DOT_BIEN.forEach(function (d) { d.skip = process.env.ONLY.split(',').indexOf(d.ten) < 0; });

let gocBang = null, loi = 0, dotBien = 0, dotBienBiBat = 0;
DOT_BIEN.forEach(function (d) {
  if (d.skip) return;
  const kq = {};
  d.phase.forEach(function (p) { kq[p] = docPhase(d, p); });
  const L = bang(kq);
  if (d.ten === 'GOC') {
    gocBang = {};
    L.forEach(function (r) { gocBang[r.hang] = r; });
    const xanh = L.filter(r => r.dat).length;
    console.log('\n=== BẢN GỐC: ' + xanh + '/' + L.length + ' hàng đạt ===');
    L.filter(r => !r.dat).forEach(function (r) { console.log('  ✕ ' + r.hang + ' = ' + r.giaTri + '  (mong ' + r.mong + ')'); });
    if (xanh !== L.length) loi++;
    return;
  }
  const am = d.ten.indexOf('AM-TINH') === 0;
  const chet = L.filter(function (r) { return gocBang[r.hang] && gocBang[r.hang].dat && !r.dat; })
    .map(function (r) { return r.hang + ' = ' + r.giaTri + ' (mong ' + r.mong + ')'; });
  const ok = am ? chet.length === 0 : chet.length > 0;
  if (!am) { dotBien++; if (ok) dotBienBiBat++; }
  if (!ok) loi++;
  console.log('\n' + (ok ? '✓' : '✕') + ' ' + d.ten + ' — ' + d.mo);
  if (chet.length) chet.slice(0, 4).forEach(function (c) { console.log('    cháy: ' + c); });
  else if (!am) console.log('    ✕ IM LẶNG — luật này không có răng');
});

console.log('\nKẾT LUẬN: ' + (loi ? 'CÒN ' + loi + ' mục chưa đạt'
  : 'toàn bộ hàng đạt · ' + dotBienBiBat + '/' + dotBien + ' đột biến bị bắt · âm tinh im lặng'));
process.exit(loi ? 1 : 0);
