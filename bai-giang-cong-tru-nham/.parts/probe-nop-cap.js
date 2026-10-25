/* =============================================================================
   probe-nop-cap.js — cửa kiểm "NỘP THEO TỪNG CẤP" của bài 1 (Cộng trừ nhẩm qua 10)
     node bai-giang-cong-tru-nham/.parts/probe-nop-cap.js

   Luật phải chứng minh (người dùng chốt 25/10/2026, giống ba bài còn lại):
     L1  Cấp 4·5·6·7: làm KÍN câu cấp nào thì một dòng gửi về bảng điểm NGAY, không chờ em bấm nút.
     L2  Mỗi cấp MỘT dòng riêng — cột "Cấp" đúng số cấp, Tổng = đúng số câu của cấp đó (3·4·4·5).
     L3  Sao tính TRONG cấp (tối đa 3★), Tỉ lệ = đúng/tổng của cấp, lời sai + đáp án chỉ kê bài của cấp đó.
     L4  Cấp 1·2·3 (ôn) không gửi gì cả, kể cả khi ai đó gọi thẳng nopCap(1).
     L5  Mở lại trang KHÔNG gửi trùng (dấu đã gửi sống trong kho giữ bài dở).
     L6  Đổi bạn thì máy nộp reset — bạn khác làm Cấp 4 vẫn gửi được đúng một dòng mang tên mình.
     L7  Màn tổng kết khi đủ bốn cấp chỉ vẽ, không POST lần năm.

   Vì sao 9 process Chrome riêng cho mỗi phase: `localStorage` chỉ sống giữa các lần nạp khi dùng
   chung một `--user-data-dir`, và "mở lại trang" chỉ là mở lại THẬT khi trình duyệt đóng hẳn.
   Vì sao chặn submit: để yên thì cửa này nộp THẬT về Google Form ⇒ Sheet của thầy thêm dòng y hệt
   học sinh. Ghi đè `HTMLFormElement.prototype.submit` ⇒ chụp đủ field rồi DỪNG, không request nào đi.

   Cửa KHÔNG biết đáp án đúng (điều đó do kiem-dinh.js tính lại từng đáp số): nó đo tính TỰ NHẤT trí
   của một dòng — Tổng = số câu của cấp, Đúng ≤ Tổng−1 (luôn có câu cố ý sai), Sao/Tỉ lệ suy ra từ
   Đúng/Tổng của chính cấp đó, số dòng lời sai = số câu sai của cấp đó.
   Exit 0 khi bản gốc đạt hết hàng VÀ 6/6 đột biến bị bắt VÀ âm tinh im lặng.
   ============================================================================= */
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BAI = path.join(__dirname, '..', 'index.html');
const KHO = 'bg4-giu-bai-lam-do';
const FORM_ID = '1FAIpQLSec0WtGr1znhnYgEFJio5BM0iMpqSVr7EOLb9VSxff6QeMy_g';
const goc = fs.readFileSync(BAI, 'utf8');

/* 9 cột của Form "Bảng điểm Cộng trừ nhẩm qua 10 — lớp 4" (đối chiếu lại mỗi lần chạy) */
const E = {
  ten: 'entry.2005620554', ngay: 'entry.509135542', dung: 'entry.2028471663', tong: 'entry.275147971',
  sao: 'entry.1045781291', loiSai: 'entry.1065046570', phanTram: 'entry.1166974658',
  dapAnCuaEm: 'entry.839337160', cap: 'entry.1137339408'
};
const SO_CAU = { 1: 4, 2: 6, 3: 4, 4: 3, 5: 4, 6: 4, 7: 5 };

/* Đáp án thật đọc thẳng từ levelData của FILE GIAO: điền sai thì máy chấm cho qua,
   dòng Sheet sẽ toàn '0 câu đúng' và mọi hàng sao/tỉ lệ thành đo không — phải dùng đáp số thiệt. */
const DAP_AN = (function () {
  const s = goc.replace(/\r\n/g, '\n');
  const i = s.indexOf('const levelData = {');
  if (i < 0) throw new Error('không thấy "const levelData = {" trong file giao');
  const ra = {};
  let cur = null;
  s.slice(i, s.indexOf('\n    };', i)).split('\n').forEach(function (line) {
    const lvl = line.match(/^      ([1-7]): \{/);
    if (lvl) { cur = +lvl[1]; ra[cur] = []; return; }
    const a = line.match(/ans:\s*'?([0-9]+)'?/);
    if (a && cur) ra[cur].push(a[1]);
  });
  Object.keys(SO_CAU).forEach(function (l) {
    const n = (ra[l] || []).length;
    if (n !== SO_CAU[l]) throw new Error('levelData Cấp ' + l + ': đọc được ' + n + ' đáp án, cửa này assume ' + SO_CAU[l]);
  });
  return ra;
})();

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

/* ---------------- TRANG DRIVER ---------------- */
function driverHtml() {
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>nc</title></head><body>
<div id="out">PENDING</div><iframe id="f" style="width:900px;height:2600px"></iframe>
<script>
var P = (location.search.match(/p=([a-z0-9-]+)/) || [])[1] || 'sach';
var L = [];
function step(n, v) { L.push(n + '=' + String(v)); }
function done() { document.getElementById('out').textContent = '@KQ@ ' + L.join(' @|@ ') + ' @END@'; }
var f = document.getElementById('f'), iw, idoc;
f.onload = function () { iw = f.contentWindow; idoc = iw.document; iw.onerror = function (m) { L.push('LOI-JS=' + m); }; try { chay(); } catch (e) { step('LOI-DRIVER', (e && e.message) || e); done(); } };
f.src = 'index.html?run=' + P;
function chay() {
  iw.__posts = [];
  iw.HTMLFormElement.prototype.submit = function () {
    var o = { action: this.action, cs: this.acceptCharset, fields: [] };
    [].forEach.call(this.querySelectorAll('input'), function (i) { o.fields.push(i.name + '~' + i.value); });
    iw.__posts.push(o);
  };
  var an = function (el) { return !el || el.classList.contains('hidden'); };
  var bar = function () { return String(idoc.getElementById('submit-bar').textContent); };

  step('congTen', an(idoc.getElementById('name-gate')) ? 'an' : 'hien');
  step('kho', iw.localStorage.getItem('${KHO}') ? 'co' : 'khong');
  step('postsTruocKhiCham', iw.__posts.length);

  if (P === 'sach') { step('posts', iw.__posts.length); return done(); }

  function moCong(ten) {
    if (!an(idoc.getElementById('name-gate'))) {
      idoc.getElementById('name-input').value = ten;
      idoc.querySelector('button[onclick="startPractice()"]').click();
    }
  }
  /* Bấm tab cấp i rồi điền từng ô. boSai = thứ tự câu CỐ Ý ghi 999999 (không bao giờ là đáp số).
     Câu đã ghi nhận từ phase trước mất ô nhập ⇒ chỉ còn đếm theo boSai. */
  function lamCap(i, boSai, denSo) {
    moCong('Ban Mai');
    var tab = idoc.querySelector('#level-tabs button:nth-child(' + i + ')');
    if (!tab) throw new Error('thieu tab cap ' + i);
    tab.click();
    var n = ${JSON.stringify(SO_CAU)}[i], so = 0, dung = 0;
    for (var j = 0; j < n; j++) {
      if (denSo != null && j >= denSo) break;
      var inp = idoc.getElementById('input-lvl-' + i + '-' + j);
      var btn = idoc.querySelector('button[onclick="evaluateAnswer(' + i + ', ' + j + ')"]');
      if (!inp || !btn) { so++; if (boSai.indexOf(j) < 0) dung++; continue; }
      var sai = boSai.indexOf(j) >= 0;
      inp.value = sai ? '999999' : ${JSON.stringify(DAP_AN)}[i][j];
      btn.click();
      so++; if (!sai) dung++;
    }
    return { so: so, dung: dung, tong: n };
  }
  function field(p, name) {
    if (!p) return '(khong-co-post)';
    var ra = '(thieu-ot)';
    p.fields.forEach(function (x) { if (x.indexOf(name + '~') === 0) ra = x.slice(name.length + 1); });
    return ra;
  }
  function ngayDung(s) {
    s = String(s);
    return s.length === 16 && s.charAt(2) === '/' && s.charAt(5) === '/' &&
      s.charAt(10) === ' ' && s.charAt(13) === ':' && /^[0-9]+$/.test(s.replace(/[^0-9]/g, ''));
  }
  function moTa(p, k) {
    var dung = +field(p, '${E.dung}'), tong = +field(p, '${E.tong}');
    var ls = String(field(p, '${E.loiSai}')).split(' | ');
    var da = String(field(p, '${E.dapAnCuaEm}')).split(' | ');
    var cap = field(p, '${E.cap}');
    var soEntry = p.fields.filter(function (x) { return x.indexOf('entry.') === 0; }).length;
    var ten = field(p, '${E.ten}');
    step('post' + k + '.form', p.action.indexOf('${FORM_ID}/formResponse') >= 0 ? 'dung-form' : 'SAI-FORM');
    step('post' + k + '.charset', p.cs + '/' + (p.fields.indexOf('_charset_~utf-8') >= 0 ? 'co-utf8' : 'khong-utf8'));
    step('post' + k + '.soEntry', soEntry);
    step('post' + k + '.ten', ten);
    step('post' + k + '.cap', cap);
    step('post' + k + '.ngay', ngayDung(field(p, '${E.ngay}')) ? 'dd/MM-HH:mm' : 'SAI');
    step('post' + k + '.dung', field(p, '${E.dung}'));
    step('post' + k + '.tong', field(p, '${E.tong}'));
    step('post' + k + '.sao', field(p, '${E.sao}'));
    step('post' + k + '.phanTram', field(p, '${E.phanTram}'));
    /* mọi dòng lời sai / đáp án chỉ được kê bài của đúng cấp này */
    var lacap = ls.filter(function (x) { return x.indexOf('Không sai câu nào') !== 0 && x.indexOf('Bai ' + (+cap) + '.') !== 0 && x.indexOf('Bài ' + (+cap) + '.') !== 0; }).length;
    var lacapDa = da.filter(function (x) { return x.indexOf('Bài ' + (+cap) + '.') !== 0; }).length;
    step('post' + k + '.loiSaiNgoaiCap', lacap);
    step('post' + k + '.dapAnNgoaiCap', lacapDa);
    step('post' + k + '.loiSaiDong', ls.length);
    step('post' + k + '.dapAnDong', da.length);
  }
  function ketLuan() {
    step('posts', iw.__posts.length);
    iw.__posts.forEach(function (p, k) { moTa(p, k); });
  }
  var W = { 4: [0], 5: [0], 6: [0], 7: [0] };
  var C4, C5;

  if (P === 'cap4') {
    C4 = lamCap(4, W[4]);
    step('cap4-so', C4.so); step('cap4-dung', C4.dung); step('cap4-tong', C4.tong);
    step('banner', bar().indexOf('Cấp độ 4 đã gửi về bảng điểm') >= 0 ? 'co-banner' : 'khong-banner');
    step('tabDauGhi', String(idoc.querySelector('#level-tabs button:nth-child(4)').textContent).indexOf('đã gửi') >= 0 ? 'co' : 'khong');
    step('nutGuiTay', idoc.querySelector('button[onclick="nopCap(4)"]') ? 'co-nut' : 'khong');
    step('daiBienLai', bar().indexOf('Cấp 4 ·') >= 0 && bar().indexOf('Cấp 7 ·') >= 0 ? 'co-4-cap' : 'thieu');
    ketLuan(); return done();
  }
  if (P === 'nua-cap5') {
    C5 = lamCap(5, W[5], ${SO_CAU[5] - 1});
    step('nua5-lam', C5.so); step('nua5-tong', C5.tong);
    step('barCon', /Em còn [0-9]+ câu được chấm ở Cấp độ 5/.test(bar()) ? 'con-cau' : 'SAI-BAR');
    step('nutGuiTay', idoc.querySelector('button[onclick="nopCap(5)"]') ? 'co-nut-som' : 'khong');
    ketLuan(); return done();
  }
  if (P === 'mo-lai') {
    var kho = JSON.parse(iw.localStorage.getItem('${KHO}') || '{}');
    step('tenKho', idoc.getElementById('runner-name') ? idoc.getElementById('runner-name').textContent : '-');
    step('nopCap4TrongKho', kho.nopCap && kho.nopCap[4] ? 'co' : 'khong');
    step('baoCaoCap4TrongKho', kho.baoCaoCap && kho.baoCaoCap[4] ? 'co' : 'khong');
    step('ghichuPhucHoi', String(idoc.getElementById('resume-note').textContent).indexOf('giữ hộ em') >= 0 ? 'co' : 'khong');
    idoc.querySelector('#level-tabs button:nth-child(4)').click();
    step('banner', bar().indexOf('Cấp độ 4 đã gửi về bảng điểm') >= 0 ? 'co-banner' : 'khong-banner');
    step('nutGuiTay', idoc.querySelector('button[onclick="nopCap(4)"]') ? 'co-nut' : 'khong');
    var nut = idoc.querySelector('button[onclick="nopCap(4)"]');
    if (nut) nut.click();                       /* bản lỗi sẽ gửi trùng ngay tại đây */
    ketLuan(); return done();
  }
  if (P === 'on') {
    var r = lamCap(1, [], ${SO_CAU[1]});
    step('on-lam', r.so);
    step('barOn', bar().indexOf('không tính điểm và không gửi về thầy') >= 0 ? 'on-khong-gui' : 'SAI-BAR');
    step('tabOn', String(idoc.querySelector('#level-tabs button:nth-child(1)').textContent).indexOf('· ôn') >= 0 ? 'co' : 'khong');
    ketLuan(); return done();
  }
  if (P === 'chan-on') {
    moCong('Ban Mai');
    idoc.querySelector('#level-tabs button:nth-child(1)').click();
    iw.nopCap(1);                                /* cấp ôn đã kín câu ⇒ phải im lặng */
    step('nopCap1', iw.__posts.length);
    ketLuan(); return done();
  }
  if (P === 'du') {
    [5, 6, 7].forEach(function (i) {
      var r = lamCap(i, W[i]);
      step('lam' + i + '-so', r.so); step('lam' + i + '-dung', r.dung); step('lam' + i + '-tong', r.tong);
    });
    step('baoCao', an(idoc.getElementById('report-wrap')) ? 'an' : 'hien');
    var m = String(idoc.getElementById('report-wrap').textContent).match(/([0-9]+) sao trên tối đa ([0-9]+)/);
    step('reportSao', m ? m[1] + '/' + m[2] : 'khong-co');
    step('reportDong', String(idoc.getElementById('report-wrap').textContent).indexOf('Mỗi cấp đã gửi riêng một dòng') >= 0 ? 'du-bon' : 'thieu');
    step('reportAnh', String(idoc.getElementById('report-wrap').innerHTML).indexOf('src="undefined"') < 0 ? 'co-avatar' : 'VO-ANH');
    step('luyenTapAn', an(idoc.getElementById('practice-wrap')) ? 'an' : 'hien-loi');
    step('congTenAn', an(idoc.getElementById('name-gate')) ? 'an' : 'hien');
    ketLuan(); return done();
  }
  if (P === 'sau-nop') {
    step('baoCao', an(idoc.getElementById('report-wrap')) ? 'an' : 'hien');
    step('reportBonCap', String(idoc.getElementById('report-wrap').textContent).indexOf('Đã nộp 4 cấp') >= 0 ? 'co' : 'khong');
    step('reportDuBon', String(idoc.getElementById('report-wrap').textContent).indexOf('Mỗi cấp đã gửi riêng một dòng') >= 0 ? 'co' : 'khong');
    step('soDongBienLai', (String(idoc.getElementById('report-wrap').innerHTML).match(/<span>[0-9]+\\/[0-9]+ câu đúng<\\/span>/g) || []).length);
    ketLuan(); return done();
  }
  if (P === 'doi-ban') {
    var nut = idoc.querySelector('button[onclick="backToGate()"]');
    if (!nut) throw new Error('khong co nut "Ghi tên bạn khác"');
    nut.click();
    step('sauDoi.congTen', an(idoc.getElementById('name-gate')) ? 'VAN-AN' : 'hien');
    step('sauDoi.kho', iw.localStorage.getItem('${KHO}') ? 'con-kho' : 'xoa-sach');
    idoc.getElementById('name-input').value = 'Gialinh';
    idoc.querySelector('button[onclick="startPractice()"]').click();
    C4 = lamCap(4, []);
    step('gl-so', C4.so);
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
    sua: [['if (daXongCap(levelIdx)) nopCap(levelIdx);', 'if (false) nopCap(levelIdx);']] },
  { ten: 'M2-dong-van-tinh-ca-bai', mo: 'dòng Sheet vẫn tính cả 16 câu của bốn cấp', phase: ['sach', 'cap4'],
    sua: [['      const keys = keysCuaCap(lvlIdx);', '      const keys = gradedKeys();']] },
  { ten: 'M3-mo-lai-gui-trung', mo: 'mở lại trang là gửi trùng cấp', phase: ['sach', 'cap4', 'nua-cap5', 'mo-lai'],
    sua: [['      capDaNop[lvlIdx] = true; // dán dấu TRƯỚC khi gửi: mạng chập chờn cũng không gửi trùng', '']] },
  { ten: 'M4-dong-que-cot-Cap', mo: 'cột "Cấp" trên Sheet bị bỏ trống', phase: ['sach', 'cap4'],
    sua: [['        cap: String(lvlIdx)', "        cap: ''"]] },
  { ten: 'M5-cap-on-bi-gui', mo: 'cấp ôn 1·2·3 cũng bị gửi thành dòng', phase: ['sach', 'on', 'chan-on'],
    /* ba lớp phòng thủ cùng phải sập thì cấp ôn mới thật sự gửi:
       (1) câu ôn không ghi vào attempts, (2) daXongCap đòi isGradedLevel, (3) nopCap đòi isGradedLevel */
    sua: [['if (!runState || !isGradedLevel(lvlIdx) || capDaNop[lvlIdx] || !daXongCap(lvlIdx)) return false;', 'if (!runState || capDaNop[lvlIdx] || !daXongCap(lvlIdx)) return false;'],
          ['function daXongCap(lvlIdx) { return isGradedLevel(lvlIdx) && conCauCuaCap(lvlIdx) === 0; }', 'function daXongCap(lvlIdx) { return conCauCuaCap(lvlIdx) === 0; }'],
          ['      const graded = isGradedLevel(levelIdx);', '      const graded = true;']] },
  { ten: 'M6-tong-ket-post-them', mo: 'màn tổng kết POST thêm dòng thứ năm', phase: ['sach', 'cap4', 'nua-cap5', 'mo-lai', 'on', 'du'],
    sua: [['      submitted = true;\n      baoCaoDaNop = rec;',
           '      submitted = true;\n      sendResult(payloadCuaCap(4, runState.attempts));\n      baoCaoDaNop = rec;']] },
  { ten: 'AM-TINH-doi-chu-dai-bien-lai', mo: 'chỉ đổi chữ trên đầu dải biên lai — phải KHÔNG cháy hàng nào', phase: P_ALL,
    sua: [['Đã về bảng điểm thầy', 'Đã gửi về bảng điểm thầy']] },
];

const cache = {};
function dungBien(d) {
  const thu = path.join(os.tmpdir(), 'bai1-nop-cap-' + d.ten);
  const profile = path.join(os.tmpdir(), 'bai1-nop-cap-profile-' + d.ten);
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
  const avt = path.join(__dirname, '..', 'anh-avatar');
  if (fs.existsSync(avt)) fs.cpSync(avt, path.join(thu, 'anh-avatar'), { recursive: true });
  cache[d.ten] = { thu: thu, profile: profile };
}

function docPhase(d, p) {
  const u = urlOf(path.join(cache[d.ten].thu, 'driver.html')) + '?p=' + p;
  const r = spawnSync(CHROME, ['--headless=new', '--disable-gpu', '--no-sandbox',
    '--allow-file-access-from-files', '--user-data-dir=' + cache[d.ten].profile,
    '--virtual-time-budget=30000', '--dump-dom', u], { encoding: 'utf8', maxBuffer: 1 << 26 });
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
/* Một dòng Sheet của cấp i: Tổng = số câu cấp i, Đúng ≤ Tổng−1, Sao/Tỉ lệ suy từ Đúng÷Tổng cấp đó. */
function hangDongPost(L, o, p, k, i, dung) {
  const tong = SO_CAU[i];
  postHang(L, o, p, k, 'form', 'dung-form');
  postHang(L, o, p, k, 'charset', 'UTF-8/co-utf8');
  postHang(L, o, p, k, 'soEntry', '9');
  postHang(L, o, p, k, 'cap', String(i));
  postHang(L, o, p, k, 'ngay', 'dd/MM-HH:mm');
  postHang(L, o, p, k, 'tong', String(tong));
  postHang(L, o, p, k, 'dung', String(dung), function (v) { return +v >= 0 && +v <= tong - 1; });
  postHang(L, o, p, k, 'sao', 'trong cap', function (v) { return +v === saoTu(+o['post' + k + '.dung'], tong); });
  postHang(L, o, p, k, 'phanTram', 'trong cap', function (v) { return v === Math.round((+o['post' + k + '.dung']) / tong * 100) + '%'; });
  postHang(L, o, p, k, 'loiSaiNgoaiCap', '0');
  postHang(L, o, p, k, 'dapAnNgoaiCap', '0');
  postHang(L, o, p, k, 'dapAnDong', String(tong));
  postHang(L, o, p, k, 'loiSaiDong', 'khop so cau sai', function (v) {
    const d = +o['post' + k + '.dung'], sai = tong - d;
    return String(v) === String(sai) || (sai === 0 && String(v) === '1');
  });
}

function bang(kq) {
  const L = [];
  const s = kq.sach || {}, c4 = kq.cap4 || {}, n5 = kq['nua-cap5'] || {}, ml = kq['mo-lai'] || {},
    on = kq.on || {}, co = kq['chan-on'] || {}, du = kq.du || {}, sn = kq['sau-nop'] || {}, db = kq['doi-ban'] || {};
  Object.keys(kq).forEach(function (p) { if (kq[p]['LOI-DRIVER']) hang(L, p, 'driver', kq[p]['LOI-DRIVER'], 'chay duoc'); });

  if (kq.sach) {
    hang(L, 'sach', 'congTen', s['congTen'], 'hien');
    hang(L, 'sach', 'kho', s['kho'], 'khong');
    hang(L, 'sach', 'postsTruocKhiCham', s['postsTruocKhiCham'], '0');
    hang(L, 'sach', 'posts', s['posts'], '0');
  }
  /* L1+L2+L3 */
  if (kq.cap4) {
    hang(L, 'cap4', 'cap4-so', c4['cap4-so'], '3');
    hang(L, 'cap4', 'posts', c4['posts'], '1');
    hang(L, 'cap4', 'banner', c4['banner'], 'co-banner');
    hang(L, 'cap4', 'tabDauGhi', c4['tabDauGhi'], 'co');
    hang(L, 'cap4', 'nutGuiTay', c4['nutGuiTay'], 'khong');
    hang(L, 'cap4', 'daiBienLai', c4['daiBienLai'], 'co-4-cap');
    hangDongPost(L, c4, 'cap4', 0, 4, +c4['cap4-dung']);
    hang(L, 'cap4', 'post0.ten', c4['post0.ten'], 'Ban Mai');
  }
  if (kq['nua-cap5']) {
    hang(L, 'nua-cap5', 'posts', n5['posts'], '0');
    hang(L, 'nua-cap5', 'barCon', n5['barCon'], 'con-cau');
    hang(L, 'nua-cap5', 'nutGuiTay', n5['nutGuiTay'], 'khong');
  }
  /* L5 */
  if (kq['mo-lai']) {
    hang(L, 'mo-lai', 'tenKho', ml['tenKho'], 'Ban Mai');
    hang(L, 'mo-lai', 'nopCap4TrongKho', ml['nopCap4TrongKho'], 'co');
    hang(L, 'mo-lai', 'baoCaoCap4TrongKho', ml['baoCaoCap4TrongKho'], 'co');
    hang(L, 'mo-lai', 'ghichuPhucHoi', ml['ghichuPhucHoi'], 'co');
    hang(L, 'mo-lai', 'banner', ml['banner'], 'co-banner');
    hang(L, 'mo-lai', 'nutGuiTay', ml['nutGuiTay'], 'khong');
    hang(L, 'mo-lai', 'posts', ml['posts'], '0');
  }
  /* L4 */
  if (kq.on) {
    hang(L, 'on', 'posts', on['posts'], '0');
    hang(L, 'on', 'barOn', on['barOn'], 'on-khong-gui');
    hang(L, 'on', 'tabOn', on['tabOn'], 'co');
  }
  if (kq['chan-on']) {
    hang(L, 'chan-on', 'nopCap1', co['nopCap1'], '0');
    hang(L, 'chan-on', 'posts', co['posts'], '0');
  }
  /* L2/L3/L7: đủ bốn cấp ⇒ đúng ba dòng nữa (5,6,7), tổng kết chỉ vẽ */
  if (kq.du) {
    hang(L, 'du', 'posts', du['posts'], '3');
    [5, 6, 7].forEach(function (i, k) {
      hangDongPost(L, du, 'du', k, i, +du['lam' + i + '-so'] - 1);
      hang(L, 'du', 'post' + k + '.ten', du['post' + k + '.ten'], 'Ban Mai');
    });
    const tongSao = [4, 5, 6, 7].reduce(function (a, i) {
      const dung = i === 4 ? +c4['cap4-dung'] : +du['lam' + i + '-so'] - 1;
      return a + saoTu(dung, SO_CAU[i]);
    }, 0);
    hang(L, 'du', 'baoCao', du['baoCao'], 'hien');
    hang(L, 'du', 'reportSao', du['reportSao'], tongSao + '/12');
    hang(L, 'du', 'reportDong', du['reportDong'], 'du-bon');
    hang(L, 'du', 'reportAnh', du['reportAnh'], 'co-avatar');
    hang(L, 'du', 'luyenTapAn', du['luyenTapAn'], 'an');
    hang(L, 'du', 'congTenAn', du['congTenAn'], 'an');
  }
  if (kq['sau-nop']) {
    hang(L, 'sau-nop', 'posts', sn['posts'], '0');
    hang(L, 'sau-nop', 'baoCao', sn['baoCao'], 'hien');
    hang(L, 'sau-nop', 'reportBonCap', sn['reportBonCap'], 'co');
    hang(L, 'sau-nop', 'reportDuBon', sn['reportDuBon'], 'co');
    hang(L, 'sau-nop', 'soDongBienLai', sn['soDongBienLai'], '4');
  }
  /* L6 */
  if (kq['doi-ban']) {
    hang(L, 'doi-ban', 'sauDoi.congTen', db['sauDoi.congTen'], 'hien');
    hang(L, 'doi-ban', 'sauDoi.kho', db['sauDoi.kho'], 'xoa-sach');
    hang(L, 'doi-ban', 'gl-so', db['gl-so'], '3');
    hang(L, 'doi-ban', 'posts', db['posts'], '1');
    hang(L, 'doi-ban', 'post0.ten', db['post0.ten'], 'Gia Linh');
    hang(L, 'doi-ban', 'post0.cap', db['post0.cap'], '4');
    hang(L, 'doi-ban', 'post0.tong', db['post0.tong'], '3');
  }
  return L;
}

/* ---------------- CHẠY ---------------- */
console.log('ĐO TRÊN FILE GIAO: ' + path.relative(path.join(__dirname, '..', '..'), BAI) +
  ' (' + Buffer.byteLength(goc, 'utf8') + ' byte · ' + P_ALL.length + ' phase cho bản gốc)');
console.log('— 9 cột Form: Cấp=' + E.cap + ' · kho=' + KHO + ' —');
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
    L.forEach(function (r) { if (process.env.VEKB || !r.dat) console.log('  ' + (r.dat ? '✓' : '✕') + ' ' + r.hang + ' = ' + r.giaTri + '  (mong ' + r.mong + ')'); });
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
