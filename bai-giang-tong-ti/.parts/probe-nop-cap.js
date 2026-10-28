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
     L14 (thầy chốt 28/10) Đề nâng cao KHÔNG vẽ sẵn ô: mỗi hàng bắt đầu MỘT Ô và có hai nút
         − / + dưới thanh; em bấm tới khi số ô hàng trên bằng tử số, hàng dưới bằng mẫu số của
         tỉ số in trong đề. Đề thường VẪN vẽ sẵn ô (không có nút). Bốn điều phải giữ:
         (a) bấm một cái + thêm đúng MỘT ô và nhãn "K phần" đổi theo;
         (b) bấm nút KHÔNG được xoá những ô em đã kéo thẻ vào (bốn ô đích phải là node cũ);
         (c) đủ bốn thẻ mà số ô chưa đúng tỉ số thì máy từ chối vỗ tay (cap bad), dựng đúng thì ok;
         (d) số ô em bấm là công của em ⇒ sống trong kho giữ bài qua lần mở lại trang, và nháp
             hai chế độ không đè nhau. Nút + dừng ở MAX_SP (> mọi tỉ số trong bài) chứ không dừng
             ngay ở đích, kẻo bé dò nút ra đáp số.

   L15 (thầy chốt 28/10, phase may-4) MỤC 4 — MÁY CẮT PHẦN cũng phải theo đúng luật đó:
     "cộng trừ của số bé thì để ngay ở chỗ số bé, cộng trừ số lớn thì để ngay ở chỗ số lớn…
      cộng một thì nó nhảy lên một ô… còn sai là cho là sai luôn, lớp năm rồi, lớn rồi".
     ⇒ bốn nút − / + đổi SỐ PHẦN nằm TRONG sơ đồ, trái xuông đúng mép thanh của nó (đo bằng
     getBoundingClientRect, không đọc CSS); một cái bấm thêm đúng MỘT ô; chữ "K phần" chạy theo
     ô; máy KHÔNG rút gọn hình (3/6 vẫn vẽ 3 ô : 6 ô, in thêm "3/6 = 1/2" chứ không giấu);
     thế sai không bị sửa hộ mà bị GỌI TÊN bằng ✕ rồi im khi về đúng; chỉ hai điều vật lý bị
     chặn (MAY_TO ô mỗi hàng, MAY_TONG_O ô hai hàng) và nút tắt phải kèm lý do in ra được;
     hai nút giá trị MỖI Ô nằm ở dải "Số của máy" và kẹp lấy đúng chữ nó đổi.

   L16 (thầy chốt 28/10, CẢ HAI chế độ) "đừng có tách cái dữ liệu ra khỏi đề bài… cứ khoanh luôn
     ở trên đề bài á, chứ đừng có tách riêng ra rồi đồng bộ cho tất cả các phần như vậy luôn á":
     ⇒ mỗi chữ cầm được nằm NGUYỆN văn TRONG lời đề (tỉ số "2/5" bọc THÀNH HAI thẻ riêng — số 2
     cho hàng trên, số 5 cho hàng dưới — chứ không bọc cả cụm); khay chỉ còn đúng những số đề
     không in ra (TỔNG giấu sau chu vi · trung bình cộng, số 1 của "gấp N lần"), nhãn khay đổi
     theo thật và hết treo dấu ":" khi khay trống; MỤC 1 cùng luật; thả thẻ không được viết lại
     câu. Cửa đo đối xứng từng hàng thường ↔ hàng nâng cao, thêm N36–N39.

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
    step('nhanThuong', vanCau(1, 0).indexOf(iw.LOI_KHOANH.replace(/:$/, '')) >= 0 ? 'con' : 'mat-nhan');
    step('thePhanThuong', thePhan());
    /* ===== L16 (thầy chốt 28/10): "đừng tách dữ liệu ra khỏi đề bài — số nào muốn kéo thì để
       luôn trên đề bài, khoanh số năm · khoanh số một". Đề THƯỜNG đi cùng đường với đề nâng cao,
       chỉ khác cái chữ trong câu được BỌC VÒNG để em nhìn ra chỗ cầm được. ===== */
    step('deDuLieuThuong', demTrong('.qvan .keo[draggable="true"]') >= 3 ? 'nam-trong-de' : 'DAY-VAO-KHAY');
    step('phanTrongDeThuong', idoc.querySelector('#card-' + iw.cauK(1, 0) + ' .qvan .keo[data-loai="phan"]')
      ? 'nam-trong-de' : 'DAY-VAO-KHAY');
    step('khayKhongPhanThuong', demTrong('.qkeo .keo[data-loai="phan"]') === 0
      ? 'sach-khay' : 'CON-' + demTrong('.qkeo .keo[data-loai="phan"]') + '-THE-PHAN');
    step('nhanKhongTreOThuong', (function () {
      var cs = idoc.querySelectorAll('#quiz-container .qkeo'), loi = 0;
      for (var t = 0; t < cs.length; t++) {
        var n = cs[t].querySelector('.nhan');
        if (n && !cs[t].querySelectorAll('.keo').length && String(n.textContent).trim().slice(-1) === ':') loi++;
      }
      return loi ? 'CON-' + loi : 'tron-van';
    }()));
    /* Vòng khoanh ĐỀ THƯỜNG phải NHÌN THẤY được (viền hoặc nền), ngược hẳn chữ thường của nâng cao;
       nếu hai chế độ in giống hệt thì bé không còn dấu hiệu nào chỉ chỗ cầm. */
    step('khoanhCoVienThuong', (function () {
      var ds = idoc.querySelectorAll('#quiz-container .qvan .keo'), co = 0, khong = 0;
      for (var t = 0; t < ds.length; t++) {
        if (!ds[t].offsetParent) continue;
        var cs = iw.getComputedStyle(ds[t]);
        var coVien = cs.borderTopWidth !== '0px' || cs.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
          cs.boxShadow !== 'none' || cs.fontWeight !== iw.getComputedStyle(ds[t].parentElement).fontWeight;
        if (coVien) co++; else khong++;
      }
      return !co ? 'KHONG-VIEN-' + khong : (khong ? 'LECH-' + khong : 'khoanh-tron');
    }()));
    /* MỤC 1: phân số in trong câu ⇒ HAI con số hai thẻ riêng; "gấp N lần" chỉ in số N ⇒ cái 1
       đề không viết mới xuống khay. Đo DOM thật của từng hàng lý thuyết. */
    step('muc1KhoanhCau', (function () {
      var lech = 0;
      for (var t = 0; t < iw.TU.length; t++) {
        var w = idoc.querySelector('#tu-' + t + ' .w');
        if (!w) { lech++; continue; }
        var dung = String(iw.TU[t].van).indexOf('{lan}') >= 0 ? 1 : 2;
        if (w.querySelectorAll('.keo[data-loai="phan"]').length !== dung) lech++;
      }
      return lech ? 'LECH-' + lech + '-CAU' : 'du-cau';
    }()));
    step('muc1KhongTach', (function () {
      var trongKhay = 0, dung = 0;
      for (var t = 0; t < iw.TU.length; t++) {
        if (String(iw.TU[t].van).indexOf('{lan}') >= 0) dung++;
        var k = idoc.querySelector('#tu-' + t + ' .qkeo');
        trongKhay += k ? k.querySelectorAll('.keo[data-loai="phan"]').length : 0;
      }
      return trongKhay === dung ? 'chi-so-de-khong-in' : 'TACH-' + trongKhay + '-DUNG-' + dung;
    }()));
    step('oNhamThuong', iw.oNham('phan', idoc.getElementById('card-' + iw.cauK(1, 0))) > 0 ? 'con-nhay' : 'MAT-NHAY');
    step('coTiengThuong', coTieng());
    /* L14 — ĐỀ THƯỜNG vẫn vẽ sẵn ô: đủ s.a + s.b ô và KHÔNG có nút − / + (nút chỉ dành cho nâng cao) */
    step('soDoThuVeSan', (function () {
      var c = idoc.getElementById('card-' + iw.cauK(1, 0));
      if (!c) return 'khong-co-card';
      var sTh = iw.doiSo(iw.CAP[1].ds[0].dk);
      var o = c.querySelectorAll('.sodo .bar.phan').length, n = c.querySelectorAll('.nutsp .btn').length;
      return o === sTh.a + sTh.b && n === 0 ? 'du-o-khong-nut' : 'o=' + o + '/' + (sTh.a + sTh.b) + '-nut=' + n;
    }()));
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
    /* ================= L14 — ĐỀ NÂNG CAO KHÔNG VẼ SẴN Ô (đo bằng CLICK THẬT) =================
       Mỗi hàng bắt đầu MỘT Ô + hai nút − / +. Bấm đúng cái nút em nhìn thấy rồi đếm ô trong
       hàng đó, không đọc chuỗi nguồn: sửa HTML mà quên sửa máy dựng ô thì vẫn phải bị bắt. */
    var k14 = iw.cauK(1, 0), card14 = idoc.getElementById('card-' + k14);
    var cap14 = idoc.getElementById('qkq-' + k14);
    var s14 = iw.doiSo(iw.cauCua(1, 0).dk);
    var NHAN_L14 = ['soDoKhongVeSan', 'nutDemIn', 'nutCoNhan', 'truCua1Tat', 'themMotO', 'gioLaNodeCu',
      'demTheoO', 'theDaDo', 'capChuaDu', 'oGiuSauKhiBam', 'chanDinh', 'veMotO', 'duTySo', 'capKhop',
      'thuaMotO', 'troLaiKhop', 'demInDungTySo', 'nhapRiengCheDo', 'soPhanDaLuu'];
    if (!card14 || !cap14) {
      NHAN_L14.forEach(function (n) { step(n, 'khong-co-card'); });
    } else {
      function oDong(t) { var h = card14.querySelectorAll('.sodo .cells'); return t < h.length ? h[t].querySelectorAll('.bar.phan').length : -1; }
      function nut14(row, kieu) { return idoc.querySelector('#card-' + k14 + ' [data-sp="' + row + kieu + '"]'); }
      function bam14(row, kieu) { var b = nut14(row, kieu); if (!b) return false; b.click(); return true; }
      function dem14(t) { var d = card14.querySelectorAll('.nutsp .dem'); return t < d.length ? String(d[t].textContent) : '(khong-co-nhan)'; }
      function denDung(row, muc) { for (var t = 0; t < 40 && oDong(row) !== muc; t++) bam14(row, oDong(row) < muc ? '+' : '-'); }
      step('soDoKhongVeSan', card14.querySelectorAll('.sodo .bar.phan').length === 2 &&
        card14.querySelectorAll('.nutsp .btn').length === 4 ? 'moi-hang-1-o' : 'LECH-o=' +
        card14.querySelectorAll('.sodo .bar.phan').length + '-nut=' + card14.querySelectorAll('.nutsp .btn').length);
      step('nutDemIn', dem14(0) === '1 phần' && dem14(1) === '1 phần' ? '1-phan' : 'SAI-' + dem14(0) + '|' + dem14(1));
      step('nutCoNhan', (function () {
        var B = card14.querySelectorAll('.nutsp .btn'), d = 0;
        for (var t = 0; t < B.length; t++) if (/ (trên|dưới) — đang có [0-9]+ phần$/.test(String(B[t].getAttribute('aria-label')))) d++;
        return d === 4 ? 'co-aria' : 'THIEU-ARIA-' + d;
      }()));
      step('truCua1Tat', (function () { var b = nut14(0, '-'); return !b ? 'khong-co-nut' : (b.disabled ? 'tat' : 'CON-BAM'); }()));
      var cayGio14 = [].slice.call(card14.querySelectorAll('.drop'));
      step('themMotO', (function () { bam14(0, '+'); return oDong(0) === 2 && oDong(1) === 1 ? '2-1' : 'LECH-' + oDong(0) + '-' + oDong(1); }()));
      step('gioLaNodeCu', (function () {
        var h = card14.querySelectorAll('.drop'), giong = h.length === 4 && cayGio14.length === 4;
        for (var t = 0; t < h.length && giong; t++) if (h[t] !== cayGio14[t]) giong = false;
        return giong ? '4-node-cu' : 'BI-VE-LAI';
      }()));
      step('demTheoO', dem14(0) === '2 phần' && dem14(1) === '1 phần' ? 'in-theo-o' : 'SAI-' + dem14(0) + '|' + dem14(1));
      /* Đổ đủ bốn thẻ bằng click thật (nhấc thẻ trong lời đề rồi bấm ô đích còn trống) */
      step('theDaDo', (function () {
        var vong = 0;
        while (vong++ < 8) {
          var tro = card14.querySelector('.drop:not(.ok)');
          if (!tro) break;
          var loai = tro.getAttribute('data-loai');
          var ds = card14.querySelectorAll('.keo[draggable="true"]'), xong = false;
          for (var t = 0; t < ds.length; t++) {
            if (ds[t].getAttribute('data-loai') !== loai || !ds[t].offsetParent) continue;
            ds[t].click(); tro.click(); xong = true; break;
          }
          if (!xong) break;
        }
        return card14.querySelectorAll('.drop.ok').length + '/' + vong;
      }()));
      step('capChuaDu', String(cap14.className) === 'cap bad' && String(cap14.textContent).charAt(0) === '✕' ? 'cap-bad' : 'SAI-' + String(cap14.className) + '-' + String(cap14.textContent).slice(0, 10));
      step('oGiuSauKhiBam', (function () { bam14(1, '+'); return card14.querySelectorAll('.drop.ok').length === 4 ? 'giu-4-o' : 'MAT-O-KEO'; }()));
      step('chanDinh', (function () {
        for (var t = 0; t < 20; t++) bam14(0, '+');
        return oDong(0) === iw.MAX_SP && nut14(0, '+').disabled ? 'tat-dinh' : 'LECH-' + oDong(0) + '/' + iw.MAX_SP;
      }()));
      step('veMotO', (function () {
        for (var t = 0; t < 20; t++) bam14(0, '-');
        return oDong(0) === 1 && nut14(0, '-').disabled ? 'tat-day' : 'LECH-' + oDong(0);
      }()));
      step('duTySo', (function () { denDung(0, s14.a); denDung(1, s14.b); return iw.soDuKhop(1, 0) ? 'khop' : 'CHUA-KHOP-' + oDong(0) + ':' + oDong(1); }()));
      step('capKhop', String(cap14.className) === 'cap ok' && String(cap14.textContent).charAt(0) === '✓' ? 'cap-ok' : 'SAI-' + String(cap14.className));
      step('thuaMotO', (function () { bam14(0, '+'); return String(cap14.className) === 'cap bad' ? 'cap-bad' : 'CON-VOP-TAY'; }()));
      step('troLaiKhop', (function () { bam14(0, '-'); return iw.soDuKhop(1, 0) && String(cap14.className) === 'cap ok' ? 'khop' : 'SAI'; }()));
      step('demInDungTySo', dem14(0) === s14.a + ' phần' && dem14(1) === s14.b + ' phần' ? 'in-dung' : 'SAI-' + dem14(0) + '|' + dem14(1));
      step('nhapRiengCheDo', (function () {
        var a = iw.SOPHAN['cap-1-0'];
        return !a || (a[0] === 1 && a[1] === 1) ? 'rieng' : 'DE-NHAU';
      }()));
      step('soPhanDaLuu', (function () {
        var s = JSON.parse(iw.localStorage.getItem('${KHO}') || 'null');
        var luu = s && s.sp && s.sp[k14];
        return luu && luu[0] === iw.soPhan(1, 0, 0) && luu[1] === iw.soPhan(1, 0, 1) ? 'trung-khop' : 'KHONG-LUU';
      }()));
    }
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
    /* L14(d) — số ô em BẤM ở Bài 1.1 phải sống qua lần mở lại trang: máy dựng lại đúng hàng
       đó từ kho, không trả về một ô. So cả bộ nhớ đang chạy lẫn bản ghi trong localStorage. */
    step('soPhanTuKho', (function () {
      var s = JSON.parse(iw.localStorage.getItem('${KHO}') || 'null');
      var k = iw.cauK(1, 0), dang = iw.SOPHAN[k], luu = s && s.sp && s.sp[k];
      var d = iw.doiSo(iw.cauCua(1, 0).dk);
      var dungTySo = !!dang && dang[0] === d.a && dang[1] === d.b;
      var trungLuu = !!luu && !!dang && luu[0] === dang[0] && luu[1] === dang[1];
      return dungTySo && trungLuu ? 'nhu-lan-truoc' : 'MAT-O-' + JSON.stringify(dang) + '/' + JSON.stringify(luu);
    }()));
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
    /* ===== L16 (thầy chốt 28/10): THẢ THẺ XONG thì lời đề vẫn phải nguyên là trang sách. Chữ rơi
       vào ô là con số máy giải; còn chữ trong câu KHÔNG được ai viết lại — "2/5" bị thay bằng
       "7 phần" là máy đếm hộ và xoá mất dữ liệu của đề. Đo bằng click thật ở đề THƯỜNG. */
    step('thaXongConNguyenVan', (function () {
      var lv = idoc.querySelector('.lv[data-cap="1"]');
      if (lv) lv.click();
      var c16 = idoc.getElementById('card-' + iw.cauK(1, 0));
      if (!c16) return 'khong-co-card';
      var q16 = iw.cauCua(1, 0), s16 = iw.doiSo(q16.dk);
      var ty = iw.tySoTrongDe(q16, s16);
      var vong = 0;
      while (vong++ < 8) {
        var tro = c16.querySelector('.drop:not(.ok)');
        if (!tro) break;
        var ds = c16.querySelectorAll('.qvan .keo[draggable="true"]'), xong = false;
        for (var t = 0; t < ds.length; t++) {
          if (ds[t].getAttribute('data-loai') !== tro.getAttribute('data-loai')) continue;
          ds[t].click(); tro.click(); xong = true; break;
        }
        if (!xong) break;
      }
      var doRo = c16.querySelectorAll('.drop.ok').length;
      if (doRo !== 4) return 'THA-CH-' + doRo + '-TRONG-4-O';
      var noi = String(c16.querySelector('.qvan').textContent);
      if (noi.indexOf(ty) < 0) return 'BI-VIET-LAI[' + ty + ']';
      if (noi.indexOf(String(s16.tong)) < 0) return 'BI-VIET-LAI[' + s16.tong + ']';
      if (!c16.querySelector('.qvan b')) return 'KHONG-CON-KHOANH';
      return 'con-nguyen-chu';
    }()));
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
    /* L14(d) — đổi bạn là đổi cả sơ đồ: bạn mới mở trang phải thấy MỖI HÀNG MỘT Ô, không được
       làm hộ bằng số ô bạn cũ bấm. Kéo–thả chỉ có ở cấp ôn ⇒ đo Bài 1.1 của bạn mới. */
    step('soPhanKhoiDienLai', (function () {
      var lech = 0;
      for (var k in iw.SOPHAN) { var a = iw.SOPHAN[k]; if (a[0] !== 1 || a[1] !== 1) lech++; }
      idoc.querySelector('.lv[data-cap="1"]').click();
      var c = idoc.getElementById('card-' + iw.cauK(1, 0));
      var o = c ? c.querySelectorAll('.sodo .bar.phan').length : -1;
      var n = c ? c.querySelectorAll('.nutsp .btn').length : -1;
      return !lech && o === 2 && n === 4 ? 'moi-hang-1-o' : 'LECH-' + lech + '-o=' + o + '-nut=' + n;
    }()));
    ketLuan(); return done();
  }
  /* ================= L15 (thầy chốt 28/10) — MỤC 4: − / + NGAY DƯỚI MỖI THANH =================
     "Cộng trừ của số bé thì để ngay ở chỗ số bé… cộng một thì nhảy lên một ô… còn sai là cho
     là sai luôn, lớp năm rồi." ⇒ mọi hàng dưới đây đo bằng CLICK THẬT vào đúng cái nút em nhìn
     thấy rồi ĐẾM Ô TRÊN HÌNH, không đọc chuỗi nguồn và không gọi hàm tay:
       (a) 4 nút đổi số phần nằm TRONG sơ đồ, 2 nút giá trị mỗi ô nằm ở dải "Số của máy";
       (b) một cái bấm = đúng MỘT ô, hai cái bấm = đúng HAI ô (nút vẽ lại phải được nối lại);
       (c) chữ "K phần" dưới thanh chạy theo ô;
       (d) máy KHÔNG rút gọn hình: 3/6 vẫn vẽ 3 ô : 6 ô và in "3/6 = 1/2";
       (e) thế sai bị GỌI TÊN bằng ✕ rồi im khi về đúng, không bị sửa hộ;
       (f) tới trần thì nút + tắt và có lý do in ra được;
       (g) bấm máy cắt phần không được gửi gì lên Sheet.                                */
  if (P === 'may-4') {
    var b4 = idoc.querySelector('#muc-4 .may-steps [data-b="4"]');
    if (!b4) throw new Error('khong co nut B4 trong muc 4');
    b4.click();
    function oMay(t) { var h = idoc.querySelectorAll('#may-board .cells'); return t < h.length ? h[t].querySelectorAll('.bar.phan').length : -1; }
    function nutMay(k) { return idoc.querySelector('#may-board [data-doi="' + k + '"]'); }
    function bamMay(k) { var b = nutMay(k); if (!b || b.disabled) return false; b.click(); return true; }
    function bamDen(k, giaTriToiDa) {
      for (var t = 0; t < 24; t++) { if (!giaTriToiDa(k)) return t; if (!bamMay(k)) return t; }
      return t;
    }
    function chuNhanMay(t) { var d = idoc.querySelectorAll('#may-board .nutsp .dem'); return t < d.length ? String(d[t].textContent) : '(khong-co-nhan)'; }
    function chuMay(el) { var e = idoc.getElementById(el); return e ? String(e.innerText) : '(khong-co-nhan)'; }
    var loiCap = function () { return String(idoc.getElementById('may-cap').innerText).indexOf('✕') >= 0; };

    step('nutTrongSoDo', (function () {
      var trong = idoc.querySelectorAll('#may-board [data-doi]').length;
      var dai = idoc.querySelectorAll('.may-doi [data-doi]').length;
      return trong === 4 && dai === 2 ? '4-trong-so-do' : 'LECH-board' + trong + '-dai' + dai;
    }()));
    /* đúng CHỖ: cụm nút phải TRÁI xuông mép thanh của mình và nằm DƯỚI thanh — "cộng trừ của
       số bé để ngay ở chỗ số bé". Đo hình (getBoundingClientRect), không đọc CSS.
       SO ĐÍCH THÂN NÚT − chứ không so cái span chứa nó: span stretched thì rộng cả hàng,
       mép trái của nó luôn trùng mép hàng dù nút bên trong bị dồn sang phải (đó đúng là cái
       hình cũ thầy vừa chê). Mỗi hàng là MỘT .track[data-nut], không phải một .khol. */
    step('nutDungThanh', (function () {
      var tracks = idoc.querySelectorAll('#may-board .track[data-nut]'), lac = [];
      for (var t = 0; t < tracks.length; t++) {
        var o = tracks[t].querySelector('.cells'), b = tracks[t].querySelector('.nutsp .btn');
        if (!o || !b) { lac.push('thieu-' + t); continue; }
        var a = o.getBoundingClientRect(), r = b.getBoundingClientRect();
        if (Math.abs(r.left - a.left) > 6) lac.push('ngang-' + Math.round(r.left - a.left));
        if (r.top < a.bottom - 2) lac.push('tren-' + Math.round(r.top - a.bottom));
      }
      return tracks.length !== 2 ? 'SO-HANG-' + tracks.length : (lac.length ? 'LECH-' + lac.join(',') : 'duoi-dung-thanh');
    }()));
    /* (b) một cái bấm = đúng một ô — lấy số ô TRÊN HÌNH làm chuẩn, không lấy bộ nhớ của máy */
    var oTruoc = oMay(0), oBanDuoi = oMay(1);
    step('bamMotLanMotO', (function () {
      bamMay('a+');
      return oMay(0) === oTruoc + 1 && oMay(1) === oBanDuoi ? 'them-dung-1-o' : 'LECH-' + oTruoc + '-' + oMay(0) + '-hangDuoi-' + oBanDuoi + '-' + oMay(1);
    }()));
    step('bamHaiLanHaiO', (function () {
      bamMay('a+');
      return oMay(0) === oTruoc + 2 ? 'hai-lan-hai-o' : 'LECH-' + oTruoc + '-' + oMay(0);
    }()));
    step('truMotLanMotO', (function () {
      bamMay('a-'); bamMay('a-');
      return oMay(0) === oTruoc && oMay(1) === oBanDuoi ? 'tr-dung-1-o' : 'LECH-' + oMay(0);
    }()));
    step('nhanDemInTheo', (function () {
      return chuNhanMay(0) === oMay(0) + ' phần' && chuNhanMay(1) === oMay(1) + ' phần'
        ? 'in-khop-o' : 'SAI-' + chuNhanMay(0) + '|' + chuNhanMay(1) + '-hinh-' + oMay(0) + ':' + oMay(1);
    }()));
    /* (d) chữ TỈ SỐ mở đầu bằng ĐÚNG thế bé dựng; rút gọn chỉ là chữ bổ sung, hình không đổi */
    step('tySoNguyenVan', chuMay('may-ti') === oMay(0) + '/' + oMay(1) ? 'nguyen-van' : 'SAI-' + chuMay('may-ti'));
    var oGoc0 = oMay(0), oGoc1 = oMay(1);
    bamMay('bb+');
    step('soVanNguyenO', (function () {
      return oMay(0) === oGoc0 && oMay(1) === oGoc1 + 1 ? 'khong-rut-hinh' : 'BI-RUT-' + oMay(0) + ':' + oMay(1);
    }()));
    step('tySoChiRutGon', (function () {
      var u = 1, x = oGoc0, y = oGoc1 + 1;
      for (var t = 2; t <= Math.min(x, y); t++) if (x % t === 0 && y % t === 0) { u = t; }
      var mong = x + '/' + y + (u > 1 ? ' = ' + (x / u) + '/' + (y / u) : '');
      return chuMay('may-ti') === mong ? 'co-dang-gon' : 'SAI-' + chuMay('may-ti') + '-mong-' + mong;
    }()));
    /* (e) sai thì gọi tên, đúng thì im — máy không tự ý sửa hàng của em.
       MUỐN CÓ THẾ SAI a>b thì PHẢI BỚT HÀNG DƯỚI TRƯỚC: hai hàng bị trần "tối đa 12 ô"
       chặn nên từ 3:6, hàng trên tới 6 là hết chỗ — 6:6 đúng là thế sai (máy đã gọi tên)
       nhưng không phải "hàng trên NHIỀU hơn", và hàng chữ ✕ có hai câu khác nhau cho hai
       thế. Ép hàng dưới xuống 2 ô rồi mới so: bé nhìn thấy ngay cái sai ngược. */
    step('saiDuocGoiTen', (function () {
      bamDen('bb-', function () { return oMay(1) > 2; });
      for (var t = 0; t < 12 && oMay(0) <= oMay(1); t++) if (!bamMay('a+')) break;
      return oMay(0) > oMay(1) && loiCap() ? 'goi-ten-sai' : 'KHONG-GOI-TEN-o-' + oMay(0) + ':' + oMay(1);
    }()));
    /* Từ thế NGƯỢC (a>b): phải lùi về a<b thì ✕ mới mất. Dừng ở a>=b thì hàng ✕ "hai hàng
       bằng nhau" vẫn sáng — đó là thế sai thật, không phải lỗi máy. */
    step('saiDaHet', (function () {
      for (var t = 0; t < 12 && oMay(0) >= oMay(1); t++) if (!bamMay('a-')) break;
      return oMay(0) < oMay(1) && !loiCap() ? 'im' : 'CON-✕-o-' + oMay(0) + ':' + oMay(1);
    }()));
    /* (f) trần vật lý: mỗi hàng MAY_TO ô ⇒ nút + tắt và hàng chữ giải thích không được trống */
    step('tatDenTran', (function () {
      bamDen('bb-', function (k) { return oMay(1) > 1; });
      bamDen('a+', function (k) { return oMay(0) < iw.MAY_TO; });
      var b = nutMay('a+');
      return oMay(0) === iw.MAY_TO && b && b.disabled ? 'tat-o-' + iw.MAY_TO : 'LECH-o-' + oMay(0) + '-tat-' + (b ? b.disabled : 'khong-co-nut');
    }()));
    step('tranCoLyDo', String(idoc.getElementById('may-bo').innerText).indexOf('hết chỗ') >= 0 ? 'co-ly-do' : 'TRONG-TRUY');
    /* (g) hai nút MỖI Ô đổi giá trị một phần ⇒ cả nhãn MỖI Ô lẫn TỔNG phải chạy theo phép tính */
    step('nhanMayKhopMay', (function () {
      bamMay('mot+');
      var s = iw.maySo();
      return chuMay('may-mot') === String(s.mot) && chuMay('may-tong') === String(s.tong)
        && s.tong === (oMay(0) + oMay(1)) * s.mot ? 'khop' : 'SAI-moi-' + chuMay('may-mot') + '-tong-' + chuMay('may-tong');
    }()));
    step('nhanCongThucTheoO', (function () {
      var s = iw.maySo();
      var l1 = chuMay('ct-be-lab').toLowerCase(), l2 = chuMay('ct-lon-lab').toLowerCase();
      return l1 === 'số bé (' + s.nho + ' phần)' && l2 === 'số lớn (' + s.to + ' phần)'
        ? 'nhan-theo-o' : 'SAI-' + l1 + '|' + l2;
    }()));
    /* maySo() TRẢ RA a / b (b = số ô hàng dưới); "bb" là tên biến trong máy chứ không có
       trong kết quả ⇒ đọc s.bb ra undefined và hàng này chết oan. */
    step('mayVeDungTheBe', (function () {
      var s = iw.maySo();
      return s.a === oMay(0) && s.b === oMay(1) && s.mot === Number(chuMay('may-mot'))
        ? 'dung-the' : 'LECH-' + s.a + ':' + s.b + '-hinh-' + oMay(0) + ':' + oMay(1);
    }()));
    step('posts', iw.__posts.length);
    return done();
  }
  throw new Error('phase la: ' + P);
}
<\/script></body></html>`;
}

/* ---------------- BẢN GỐC + ĐỘT BIẾN ---------------- */
/* 'may-4' chạy ĐẦU: MỤC 4 là bài giảng, không được dính nháp của chuỗi nộp. Bấm nút máy cắt
   phần không gọi luuBai() ⇒ profile vẫn sạch khi tới phase 'sach' (hàng kho=khong). */
const P_ALL = ['may-4', 'sach', 'cap4', 'nua-cap5', 'mo-lai', 'on', 'chan-on', 'du', 'sau-nop', 'doi-ban'];
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
  { ten: 'N3-con-nhan-cach-lam', mo: 'nhãn nhắc vẫn là lối cũ "kéo 4 thẻ" — lời đề bị coi như không có dữ liệu', phase: ['nc-sach'],
    sua: [["var nhan = NC ? LOI_NC : (c.length ? LOI_KHOANH_CON : LOI_KHOANH);", "var nhan = LOI_NC;"]] },
  { ten: 'N4-mat-khung-keo-tha', mo: 'nâng cao ẩn LUÔN sơ đồ kéo (phải giữ khung, chỉ ẩn gợi ý)', phase: ['nc-sach'],
    sua: [["if (!cham) html += veBuKeo(i, j, deKeo) + veSoDoKeo(i, j)", "if (!cham && !NC) html += veBuKeo(i, j, deKeo) + veSoDoKeo(i, j)"]] },
  { ten: 'N5-con-tu-goi-y', mo: 'chữ "Dấu hiệu" vẫn hiện trên đề nâng cao', phase: ['nc-sach', 'nc-cap4'],
    sua: [["(NC ? '' : '<span class=\"qdh\">Dấu hiệu: ' + q.dh + '</span>')", "'<span class=\"qdh\">Dấu hiệu: ' + q.dh + '</span>'"]] },
  { ten: 'N6-the-so-phan-van-cong-ho', mo: 'thẻ số phần vẫn ghi phép cộng "2 + 5" — đếm hộ em, mất luôn chữ của đề', phase: ['nc-sach'],
    sua: [["if (loai === 'phan') return tySoTrongDe(q, s);", "if (loai === 'phan') return s.nho + ' + ' + s.to;"]] },
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
    sua: [["'<span class=\"keo' + (NC ? ' thuong' : '') + '\" id=\"keo-q-'", "'<span class=\"keo\" id=\"keo-q-'"]] },
  { ten: 'N14-css-thuong-bi-ten', mo: 'lớp thuong có gắn nhưng CSS bị đổi tên ⇒ vòng khoanh còn nguyên trên màn hình', phase: ['nc-sach'],
    sua: [['.keo.thuong { display: inline;', '.keo.thuongX { display: inline;']] },
  { ten: 'N15-du-lieu-bi-rut-khoi-de', mo: 'đề vẫn bày hết dữ liệu ra khay — bé không phải tự tìm trong câu', phase: ['nc-sach'],
    sua: [["var deKeo = !cham ? vanKeoDe(q, doiSo(q.dk), i + '-' + j, r.text) : null;", 'var deKeo = null;']] },
  { ten: 'N16-the-phan-tra-san-cong-so', mo: 'nâng cao đưa sẵn con số phần đã cộng (7) — em mất bước cộng tỉ số', phase: ['nc-sach'],
    sua: [["if (loai === 'phan') return tySoTrongDe(q, s);", "if (loai === 'phan') return NC ? String(s.n) : tySoTrongDe(q, s);"]] },
  { ten: 'N17-thi-phan-tim-bang-con-so', mo: 'thẻ tỉ số bị đi tìm bằng con số đáp thay bằng chữ in trong đề ⇒ rơi lại khay', phase: ['nc-sach'],
    sua: [["var chu = p.loai === 'phan' ? String(p.txt) : String(p.gia);", 'var chu = String(p.gia);']] },
  { ten: 'N18-nhan-tre-dau-hai-cham', mo: 'khay đã sạch thẻ mà nhãn vẫn kết thúc bằng ":" — câu treo giữa trang', phase: ['nc-sach'],
    sua: [["if (!c.length) nhan = nhan.replace(/:$/, '.');", '']] },
  { ten: 'N19-the-ty-so-in-chu-la', mo: 'thẻ số phần lấy kiểu "k lần" cho MỌI câu ⇒ câu tỉ số in ra "null lần" ngay trên đề', phase: ['nc-sach'],
    sua: [["if (/\\{lan\\}/.test(mau)) return s.lan + ' lần';", "if (true) return s.lan + ' lần';"]] },
  /* --- đột biến L14 (28/10): sơ đồ nâng cao dựng bằng nút − / + --- */
  { ten: 'N20-nang-cao-ve-san-o', mo: 'quên không dựng ô theo nút: sơ đồ nâng cao vẫn vẽ sẵn đủ số phần của tỉ số', phase: ['nc-sach'],
    sua: [['rows: [hang(0, NC ? soPhan(i, j, 0) : s.a), hang(1, NC ? soPhan(i, j, 1) : s.b)],', 'rows: [hang(0, s.a), hang(1, s.b)],']] },
  { ten: 'N21-nut-bam-khong-do-hinh', mo: 'nút đổi con số trong bộ nhớ nhưng quên vẽ lại hàng ô ⇒ bấm mà hình đứng yên', phase: ['nc-sach'],
    sua: [['  luuBai();\n  veLaiSoPhan(i, j);', '  luuBai();']] },
  { ten: 'N22-mat-nut-dung-o', mo: 'hàng ô nâng cao mất hai nút − / + (đưa null thay vì sinh nút)', phase: ['nc-sach'],
    sua: [['nut: NC ? nutSoPhanHTML(i, j, row) : null', 'nut: null']] },
  { ten: 'N23-so-o-khong-vao-nhap', mo: 'số ô em bấm bị xoá khỏi kho giữ bài ⇒ mở lại trang mất sơ đồ của em', phase: ['nc-sach', 'nc-cap4', 'nc-mo-lai'],
    sua: [['nhap: nhap, nc: NC, sp: SOPHAN, nop: nopChDo,', 'nhap: nhap, nc: NC, nop: nopChDo,']] },
  { ten: 'N24-hai-che-do-de-o-chen-nhau', mo: 'nháp số ô không khóa theo chế độ ⇒ đề thường ăn luôn ô em dựng lúc nâng cao', phase: ['nc-sach'],
    sua: [["function soPhanCua(i, j) { var a = SOPHAN[cauK(i, j)]; return a || (SOPHAN[cauK(i, j)] = [1, 1]); }", "function soPhanCua(i, j) { var k = 'cap-' + i + '-' + j; var a = SOPHAN[k]; return a || (SOPHAN[k] = [1, 1]); }"]] },
  { ten: 'N25-khong-cho-so-sai-ty-so', mo: 'máy vỗ tay cả khi bốn thẻ đã đổ mà hai hàng chưa đúng tỉ số (bỏ cổng kiểm)', phase: ['nc-sach'],
    sua: [['  if (NC && !soDuKhop(i, j)) {', '  if (false) {']] },
  { ten: 'N26-doi-ban-giu-o-ban-cu', mo: 'đổi bạn mà giữ số ô bạn cũ bấm ⇒ bạn mới được làm hộ sơ đồ', phase: P_NC,
    sua: [['  runState = null; nhap = {}; activeCap = 1;\n  SOPHAN = {};', '  runState = null; nhap = {}; activeCap = 1;']] },
  /* --- đột biến L15 (28/10): MỤC 4 — − / + dưới đúng mỗi thanh, một bấm một ô, sai là gọi tên --- */
  { ten: 'N27-nut-hang-tren-bi-xoa', mo: 'hàng trên mất cụm − / + ⇒ chỉ còn 2 nút trong sơ đồ', phase: ['may-4'],
    sua: [['nut: nutMayHTML(0)', 'nut: null']] },
  { ten: 'N28-nut-bam-khong-do-so-do', mo: 'nút đổi số ô trong bộ nhớ nhưng quên vẽ lại sơ đồ ⇒ bấm mà hình đứng yên', phase: ['may-4'],
    sua: [['  else may.mot = x;\n  veMay();', '  else may.mot = x;']] },
  { ten: 'N29-ty-so-an-the-cua-be', mo: 'máy chỉ in dạng rút gọn (1/2) ⇒ giấu mất đúng cái tỉ số bé vừa dựng', phase: ['may-4'],
    sua: [["  document.getElementById('may-ti').innerText =\n    (r[0] === s.a && r[1] === s.b) ? (s.a + '/' + s.b) : (s.a + '/' + s.b + ' = ' + r[0] + '/' + r[1]);",
          "  document.getElementById('may-ti').innerText = r[0] + '/' + r[1];"]] },
  { ten: 'N30-hinh-rut-gon-theo-chu', mo: 'vẽ theo tỉ số đã rút gọn (3/6 thành 1 ô : 2 ô) — chữ hô một nẽ, hình vẽ một nẽ', phase: ['may-4'],
    sua: [['  var a = may.a, b = may.bb, mot = may.mot;', '  var g = rutTi(may.a, may.bb), a = g[0], b = g[1], mot = may.mot;']] },
  { ten: 'N31-sai-khong-bi-goi-ten', mo: 'hàng trên dài hơn hàng dưới mà máy vẫn im (bỏ lời ✕)', phase: ['may-4'],
    sua: [["function loiMay(s) {", "function loiMay(s) { return '';"]] },
  { ten: 'N32-nut-tat-khong-ly-do', mo: 'tới trần thì nút + tắt mà không in ra lý do ⇒ bé tưởng máy liệt', phase: ['may-4'],
    sua: [["  return lo.join(' · ');", "  return '';"]] },
  { ten: 'N33-nhan-moi-o-khong-chay', mo: 'quên cập nhật nhãn MỖI Ô ⇒ bé bấm thấy TỔNG nhảy mà không hiểu cái gì vừa đổi', phase: ['may-4'],
    sua: [["  document.getElementById('may-mot').innerText = String(s.mot);\n", '']] },
  { ten: 'N34-nut-moi-ve-khong-noi', mo: 'sơ đồ vẽ lại mà quên nối nút ⇒ cái bấm THỨ HAI chết (bài học 27/10)', phase: ['may-4'],
    sua: [['  ganNutMay();\n  nhanMay();', '  nhanMay();']] },
  { ten: 'N35-cum-nut-troi-sang-mep-phai', mo: 'cụm − / + trôi sang mép phải của cả hàng (flex-end) — nhìn như của thanh kia', phase: ['may-4'],
    sua: [['.sodo .track.lech-cot[data-nut] { display: flex; flex-direction: column; align-items: flex-start;',
          '.sodo .track.lech-cot[data-nut] { display: flex; flex-direction: column; align-items: flex-end;']] },
  /* --- đột biến L16 (28/10): dữ liệu nằm NGAY TRÊN ĐỀ, khoanh từng con số --- */
  { ten: 'N36-de-thuong-bi-tach-khay', mo: 'đề thường bị rút hết dữ liệu về khay riêng — đúng cái thầy cấm', phase: ['nc-sach'],
    sua: [["var deKeo = !cham ? vanKeoDe(q, doiSo(q.dk), i + '-' + j, r.text) : null;", "var deKeo = !cham && NC ? vanKeoDe(q, doiSo(q.dk), i + '-' + j, r.text) : null;"]] },
  { ten: 'N37-muc1-khoanh-ca-phan-so', mo: 'MỤC 1 khoanh trọn "2/5" thành MỘT thẻ — thầy đòi khoanh số hai · khoanh số năm riêng', phase: ['nc-sach'],
    sua: [["    trong.push(lay(0, s.a, d));\n    trong.push(lay(1, s.b, d + String(s.a).length + 1));", "    trong.push(lay(0, s.a, d));"]] },
  { ten: 'N38-muc1-nhot-so-xuong-khay', mo: 'MỤC 1 không tìm phân số trong câu ⇒ số bị đẩy xuống khay, lời đề mất chữ', phase: ['nc-sach'],
    sua: [["var ty = s.a + '/' + s.b, d = timTrongVan(van, ty, []);", 'var ty = s.a + \'/\' + s.b, d = -1;']] },
  { ten: 'N39-tha-the-de-viet-lai-de', mo: 'thả thẻ xong máy ghi CON SỐ của nó đè lên chữ đề in ("2/5" hóa "7") — mất trang sách', phase: ['nc-tat-thuong'],
    sua: [["var chuDe = chipEl ? chipEl.textContent : String(keo.gia);", "var chuDe = String(keo.gia);"]] },
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
  const mayCoTieng = (s.coTiengMay || ns.coTiengMay || nt.coTiengMay || (kq['may-4'] || {}).coTiengMay) === 'co';
  /* MỌI phase đều có hàng "driver": im lặng khi chạy trọn vẹn, chứa lỗi khi driver chết giữa
     chừng. Nếu chỉ ghi hàng lúc có lỗi thì hàng đó không tồn tại ở BẢN GỐC, bộ lọc "hàng xanh
     → đỏ" bỏ qua ⇒ đột biến làm driver crash hiện ra như mớ hàng "(KHONG-CO-HANG)" mà không
     biết crash ở câu nào (đo N27 ngày 28/10). */
  Object.keys(kq).forEach(function (p) { hang(L, p, 'driver', kq[p]['LOI-DRIVER'] || 'chay duoc', 'chay duoc'); });

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

  /* ================= HÀNG CỦA MỤC 4 — MÁY CẮT PHẦN (L15) ================= */
  if (kq['may-4']) {
    const m4 = kq['may-4'];
    hang(L, 'may-4', 'selfTest-loi', m4['selfTest-loi'], '0');
    hang(L, 'may-4', 'soMucTkiem', m4['soMucTkiem'], mayCoTieng ? '117' : '115');
    hang(L, 'may-4', 'nutTrongSoDo', m4['nutTrongSoDo'], '4-trong-so-do');
    hang(L, 'may-4', 'nutDungThanh', m4['nutDungThanh'], 'duoi-dung-thanh');
    hang(L, 'may-4', 'bamMotLanMotO', m4['bamMotLanMotO'], 'them-dung-1-o');
    hang(L, 'may-4', 'bamHaiLanHaiO', m4['bamHaiLanHaiO'], 'hai-lan-hai-o');
    hang(L, 'may-4', 'truMotLanMotO', m4['truMotLanMotO'], 'tr-dung-1-o');
    hang(L, 'may-4', 'nhanDemInTheo', m4['nhanDemInTheo'], 'in-khop-o');
    hang(L, 'may-4', 'tySoNguyenVan', m4['tySoNguyenVan'], 'nguyen-van');
    hang(L, 'may-4', 'soVanNguyenO', m4['soVanNguyenO'], 'khong-rut-hinh');
    hang(L, 'may-4', 'tySoChiRutGon', m4['tySoChiRutGon'], 'co-dang-gon');
    hang(L, 'may-4', 'saiDuocGoiTen', m4['saiDuocGoiTen'], 'goi-ten-sai');
    hang(L, 'may-4', 'saiDaHet', m4['saiDaHet'], 'im');
    hang(L, 'may-4', 'tatDenTran', m4['tatDenTran'], 'tat-o-8');
    hang(L, 'may-4', 'tranCoLyDo', m4['tranCoLyDo'], 'co-ly-do');
    hang(L, 'may-4', 'nhanMayKhopMay', m4['nhanMayKhopMay'], 'khop');
    hang(L, 'may-4', 'nhanCongThucTheoO', m4['nhanCongThucTheoO'], 'nhan-theo-o');
    hang(L, 'may-4', 'mayVeDungTheBe', m4['mayVeDungTheBe'], 'dung-the');
    hang(L, 'may-4', 'posts', m4['posts'], '0');
  }

  /* ================= HÀNG CỦA CHẾ ĐỘ NÂNG CAO (L8–L11) ================= */
  if (kq['nc-sach']) {
    hang(L, 'nc-sach', 'selfTest-loi', ns['selfTest-loi'], '0');
    hang(L, 'nc-sach', 'ncLucMo', ns['ncLucMo'], 'tat');
    hang(L, 'nc-sach', 'dauHieuThuong', ns['dauHieuThuong'], 'con');
    hang(L, 'nc-sach', 'headLeLoiThuong', ns['headLeLoiThuong'], 'con');
    hang(L, 'nc-sach', 'nhanThuong', ns['nhanThuong'], 'con');
    hang(L, 'nc-sach', 'thePhanThuong', ns['thePhanThuong'], 'ty-so-trong-de');
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
  /* L16 — phía ĐỀ THƯỜNG: dữ liệu nằm trong câu, vòng khoanh nhìn thấy được, khay sạch thẻ tỉ số,
     MỤC 1 khoanh từng con số của phân số ngay trên đề. */
  hang(L, 'nc-sach', 'deDuLieuThuong', ns['deDuLieuThuong'], 'nam-trong-de');
  hang(L, 'nc-sach', 'phanTrongDeThuong', ns['phanTrongDeThuong'], 'nam-trong-de');
  hang(L, 'nc-sach', 'khayKhongPhanThuong', ns['khayKhongPhanThuong'], 'sach-khay');
  hang(L, 'nc-sach', 'nhanKhongTreOThuong', ns['nhanKhongTreOThuong'], 'tron-van');
  hang(L, 'nc-sach', 'khoanhCoVienThuong', ns['khoanhCoVienThuong'], 'khoanh-tron');
  hang(L, 'nc-sach', 'muc1KhoanhCau', ns['muc1KhoanhCau'], 'du-cau');
  hang(L, 'nc-sach', 'muc1KhongTach', ns['muc1KhongTach'], 'chi-so-de-khong-in');
    /* L14 — sơ đồ nâng cao dựng bằng nút − / +, đo bằng click thật */
    hang(L, 'nc-sach', 'soDoThuVeSan', ns['soDoThuVeSan'], 'du-o-khong-nut');
    hang(L, 'nc-sach', 'soDoKhongVeSan', ns['soDoKhongVeSan'], 'moi-hang-1-o');
    hang(L, 'nc-sach', 'nutDemIn', ns['nutDemIn'], '1-phan');
    hang(L, 'nc-sach', 'nutCoNhan', ns['nutCoNhan'], 'co-aria');
    hang(L, 'nc-sach', 'truCua1Tat', ns['truCua1Tat'], 'tat');
    hang(L, 'nc-sach', 'themMotO', ns['themMotO'], '2-1');
    hang(L, 'nc-sach', 'gioLaNodeCu', ns['gioLaNodeCu'], '4-node-cu');
    hang(L, 'nc-sach', 'demTheoO', ns['demTheoO'], 'in-theo-o');
    hang(L, 'nc-sach', 'theDaDo', ns['theDaDo'], '4 thẻ đã đổ', function (v) { return String(v).indexOf('4/') === 0; });
    hang(L, 'nc-sach', 'capChuaDu', ns['capChuaDu'], 'cap-bad');
    hang(L, 'nc-sach', 'oGiuSauKhiBam', ns['oGiuSauKhiBam'], 'giu-4-o');
    hang(L, 'nc-sach', 'chanDinh', ns['chanDinh'], 'tat-dinh');
    hang(L, 'nc-sach', 'veMotO', ns['veMotO'], 'tat-day');
    hang(L, 'nc-sach', 'duTySo', ns['duTySo'], 'khop');
    hang(L, 'nc-sach', 'capKhop', ns['capKhop'], 'cap-ok');
    hang(L, 'nc-sach', 'thuaMotO', ns['thuaMotO'], 'cap-bad');
    hang(L, 'nc-sach', 'troLaiKhop', ns['troLaiKhop'], 'khop');
    hang(L, 'nc-sach', 'demInDungTySo', ns['demInDungTySo'], 'in-dung');
    hang(L, 'nc-sach', 'nhapRiengCheDo', ns['nhapRiengCheDo'], 'rieng');
    hang(L, 'nc-sach', 'soPhanDaLuu', ns['soPhanDaLuu'], 'trung-khop');
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
    hang(L, 'nc-mo-lai', 'soPhanTuKho', nml['soPhanTuKho'], 'nhu-lan-truoc');
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
    hang(L, 'nc-tat-thuong', 'thaXongConNguyenVan', nt['thaXongConNguyenVan'], 'con-nguyen-chu');
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
    hang(L, 'nc-doi-ban', 'soPhanKhoiDienLai', nd['soPhanKhoiDienLai'], 'moi-hang-1-o');
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
  if (chet.length) chet.slice(0, 8).forEach(function (c) { console.log('    cháy: ' + c); });
  else if (!am) console.log('    ✕ IM LẶNG — luật này không có răng');
});

console.log('\nKẾT LUẬN: ' + (loi ? 'CÒN ' + loi + ' mục chưa đạt'
  : 'toàn bộ hàng đạt · ' + dotBienBiBat + '/' + dotBien + ' đột biến bị bắt · âm tinh im lặng'));
process.exit(loi ? 1 : 0);
