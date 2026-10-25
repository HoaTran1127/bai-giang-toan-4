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

   Vì sao N process Chrome riêng cho mỗi phase: `localStorage` chỉ sống giữa các lần nạp khi
   dùng chung một `--user-data-dir`, và "mở lại trang" chỉ là mở lại THẬT khi trình duyệt
   đóng hẳn giữa hai phase.
   Vì sao chặn submit: để yên thì cửa này nộp THẬT về Google Form ⇒ Sheet của thầy thêm dòng
   trông y hệt học sinh. Ghi đè `HTMLFormElement.prototype.submit` SAU khi bài nạp (same-origin
   navigation dựng lại global mới) ⇒ chụp đủ field rồi DỪNG, không request nào ra ngoài.

   Đột biến: lỗi cấy phải làm cháy ít nhất một hàng TRƯỚC ĐÓ XANH; hàng âm tinh (chỉ đổi màu
   nền banner) phải im lặng — chứng minh cửa không hỏng ăn lung tung.
   Exit 0 khi bản gốc đạt hết hàng VÀ 6/6 đột biến bị bắt VÀ âm tinh im lặng.
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
     boSai[] = số thứ tự câu CỐ Ý SAI. Câu đã ghi nhận từ phase trước vẫn được tính lại. */
  function lamCap(i, boSai, denSo) {
    moCong('Ban Mai');
    var tab = idoc.querySelector('.lv[data-cap="' + i + '"]');
    if (!tab) throw new Error('thieu tab cap ' + i);
    tab.click();
    var n = iw.CAP[i].ds.length, so = 0, dung = 0;
    for (var j = 0; j < n; j++) {
      if (denSo != null && j >= denSo) break;
      var key = 'cap-' + i + '-' + j;
      var inp = $('#nhap-' + key), btn = $('#btn-' + key);
      if (!inp || !btn) {
        var da = iw.runState.attempts[key];
        so++; if (da && da.ok) dung++;
        continue;
      }
      var ans = iw.CAP[i].ds[j].ans, sai = boSai.indexOf(j) >= 0;
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
    var n5 = iw.CAP[5].ds.length;
    C5 = lamCap(5, W[5], n5 - 2);
    step('nua5-lam', C5.so); step('nua5-tong', C5.tong);
    step('barCon', /Em còn \\d+ câu ở Cấp 5/.test(String($('#submit-bar').textContent)) ? 'con-cau' : 'SAI-BAR');
    step('nutNop', $('#btn-nop') ? 'co-nut-som' : 'khong');
    ketLuan(); return done();
  }
  if (P === 'mo-lai') {
    step('tenKho', $('#runner-name') ? $('#runner-name').textContent : '-');
    step('cap4DaGui', iw.capDaNop[4] ? 'co' : 'khong');
    /* mở đúng cấp đã gửi mới thấy banner — thanh trạng thái luôn nói về cấp đang xem */
    idoc.querySelector('.lv[data-cap="4"]').click();
    step('banner', String($('#submit-bar').textContent).indexOf('Cấp 4 đã gửi') >= 0 ? 'co-banner' : 'khong-banner');
    step('nutNop', $('#btn-nop') ? 'co-nut' : 'khong');
    step('ghichuPhucHoi', String($('#resume-note').textContent).indexOf('giữ hộ em') >= 0 ? 'co' : 'khong');
    if ($('#btn-nop')) $('#btn-nop').click();          /* bản lỗi sẽ gửi trùng ngay tại đây */
    ketLuan(); return done();
  }
  if (P === 'on') {
    var n1 = iw.CAP[1].ds.length;
    C6 = lamCap(1, [], n1);
    step('on-lam', C6.so);
    step('barOn', String($('#submit-bar').textContent).indexOf('cấp ôn') >= 0 ? 'on-khong-gui' : 'SAI-BAR');
    ketLuan(); return done();
  }
  if (P === 'chan-on') {
    /* giả lập người nối nhầm cấp ôn vào đường nộp: seed câu trả lời rồi gọi thẳng nopCap(1) */
    moCong('Ban Mai');
    iw.CAP[1].ds.forEach(function (q, j) { iw.runState.attempts['cap-1-' + j] = { val: q.ans, ok: true }; });
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
  throw new Error('phase la: ' + P);
}
<\/script></body></html>`;
}

/* ---------------- BẢN GỐC + ĐỘT BIẾN ---------------- */
const P_ALL = ['sach', 'cap4', 'nua-cap5', 'mo-lai', 'on', 'chan-on', 'du', 'sau-nop', 'doi-ban'];
const DOT_BIEN = [
  { ten: 'GOC', phase: P_ALL, sua: [] },
  { ten: 'M1-cap-kin-khong-tu-gui', mo: 'cấp vừa kín câu không tự gửi (bắt em bấm nút)', phase: ['sach', 'cap4'],
    sua: [['if (daXongCap(i)) nopCap(i);', 'if (false) nopCap(i);']] },
  { ten: 'M2-dong-van-tinh-ca-bai', mo: 'dòng Sheet vẫn tính cả 16 câu của bốn cấp', phase: ['sach', 'cap4'],
    sua: [['var keys = keysCapi(i);', 'var keys = keyCham();']] },
  { ten: 'M3-mo-lai-gui-trung', mo: 'mở lại trang là gửi trùng cấp', phase: ['sach', 'cap4', 'nua-cap5', 'mo-lai'],
    sua: [['  capDaNop[i] = true;\n  var sent = sendResult(rec);', '  var sent = sendResult(rec);']] },
  { ten: 'M4-dong-que-cot-Cap', mo: 'cột "Cấp" trên Sheet bị bỏ trống', phase: ['sach', 'cap4'],
    sua: [['    cap: String(i),', "    cap: '',"]] },
  { ten: 'M5-cap-on-bi-gui', mo: 'cấp ôn 1·2·3 cũng bị gửi thành dòng', phase: ['sach', 'chan-on'],
    sua: [['if (!runState || !laCapCham(i) || capDaNop[i] || !daXongCap(i)) return;', 'if (!runState || capDaNop[i] || !daXongCap(i)) return;']] },
  { ten: 'M6-tong-ket-post-them', mo: 'màn tổng kết POST thêm dòng thứ năm', phase: ['sach', 'cap4', 'nua-cap5', 'mo-lai', 'on', 'du'],
    sua: [['  showReport(findRoster(runState.label), baoCaoDaNop);', '  sendResult({ ten: runState.label, ngay: ngayLamBai(new Date()), cap: \'TONG KET\', dung: dung, tong: keys.length, sao: tongSao, phanTram: \'\', loiSai: \'\', dapAnCuaEm: \'\' });\n  showReport(findRoster(runState.label), baoCaoDaNop);']] },
  { ten: 'AM-TINH-doi-mau-banner', mo: 'chỉ đổi màu nền banner — phải KHÔNG cháy hàng nào', phase: P_ALL,
    sua: [['background:#DCFCE7', 'background:#F0FDF4']] }
];

const cache = {};
function dungBien(d) {
  const thu = path.join(os.tmpdir(), 'bai4-nop-cap-' + d.ten);
  const profile = path.join(os.tmpdir(), 'bai4-nop-cap-profile-' + d.ten);
  fs.rmSync(thu, { recursive: true, force: true });
  fs.rmSync(profile, { recursive: true, force: true });  /* profile cũ mang nháp lần trước sang là đo sai */
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
  cache[d.ten] = { thu: thu, profile: profile };
}

function docPhase(d, p) {
  const u = urlOf(path.join(cache[d.ten].thu, 'driver.html')) + '?p=' + p;
  const r = spawnSync(CHROME, ['--headless=new', '--disable-gpu', '--no-sandbox',
    '--allow-file-access-from-files', '--user-data-dir=' + cache[d.ten].profile,
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
  Object.keys(kq).forEach(function (p) { if (kq[p]['LOI-DRIVER']) hang(L, p, 'driver', kq[p]['LOI-DRIVER'], 'chay duoc'); });

  if (kq.sach) {
    hang(L, 'sach', 'selfTest-loi', s['selfTest-loi'], '0');
    hang(L, 'sach', 'soMucTkiem', s['soMucTkiem'], '108');
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
  return L;
}

/* ---------------- CHẠY ---------------- */
console.log('ĐO TRÊN FILE GIAO: ' + path.relative(path.join(__dirname, '..', '..'), BAI) + ' (' + Buffer.byteLength(goc, 'utf8') + ' byte · ' + PHASES_OF() + ' phase cho bản gốc)');
function PHASES_OF() { return DOT_BIEN[0].phase.length; }
DOT_BIEN.forEach(dungBien);
if (process.env.ONLY) DOT_BIEN.forEach(function (d) { d.skip = process.env.ONLY.split(',').indexOf(d.ten) < 0; });

let gocBang = null, loi = 0;
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
  if (!ok) loi++;
  console.log('\n' + (ok ? '✓' : '✕') + ' ' + d.ten + ' — ' + d.mo);
  if (chet.length) chet.slice(0, 4).forEach(function (c) { console.log('    cháy: ' + c); });
  else if (!am) console.log('    ✕ IM LẶNG — luật này không có răng');
});

console.log('\nKẾT LUẬN: ' + (loi ? 'CÒN ' + loi + ' mục chưa đạt' : 'toàn bộ hàng đạt · 6/6 đột biến bị bắt · âm tinh im lặng'));
process.exit(loi ? 1 : 0);
