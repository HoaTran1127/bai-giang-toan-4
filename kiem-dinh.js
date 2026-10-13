// Bộ kiểm định độc lập bài giảng Cộng trừ nhẩm qua 10.
// Chạy:  node kiem-dinh.js   (hoặc: node kiem-dinh.js duong/dan/index.html)
// Làm gì: nạp <script> của trang bằng vm (không cần trình duyệt), rồi TÍNH LẠI mọi đáp số,
//         đối chiếu từng bước của 3 mẫu đặt tính, dựng bảng chẩn đoán cho 11 bài cột dọc,
//         kiểm thang sao, cổng tên, 8 field gửi về Google Form.
// Exit code 0 = sạch, khác 0 = in ra danh sách lỗi.
const fs = require('fs');
const vm = require('vm');

const FILE = process.argv[2] || require('path').join(__dirname, 'bai-giang-cong-tru-nham', 'index.html');
const html = fs.readFileSync(FILE, 'utf8');

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
if (scripts.length !== 1) throw new Error('expected 1 inline script, got ' + scripts.length);
const src = scripts[0] + '\n;globalThis.__X = {levelData, colProblems, colNames, buildSubtractionDiagnostic, ROSTER, GRADED_LEVELS, normalizeName, findRoster, starsFor, gradedKeys, isGradedLevel, TOTAL_GRADED, deBang, mistakeLines, answerLines, ENTRY, FORM_ENDPOINT, SEND_READY, ngayLamBai, draftStore, captureDrafts, clearDrafts, answerRowHtml, pressEnter};';

function el() {
  return {
    innerText: '', innerHTML: '', className: '', value: '', id: '', name: '', type: '',
    classList: { add() {}, remove() {}, contains() { return false; } },
    appendChild() {}, remove() {}, querySelectorAll() { return []; },
  };
}
const STUB = {}; // id -> element giả, cho phép test từng hàm theo DOM dựng sẵn
const sandbox = {
  console, Math, JSON, String, Number, Object, Array, parseInt, parseFloat, isNaN, Date, RegExp, Error, Set,
  document: { getElementById: id => STUB[id] || el(), createElement: el, body: { appendChild() {} } },
  window: { addEventListener() {} },
};
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const X = sandbox.__X;

const fails = [];
const notes = [];
const check = (name, ok, detail) => { if (!ok) fails.push(name + (detail ? ' :: ' + detail : '')); };
const deacc = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
const stripTags = s => String(s).replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ');
// "1 000" -> "1000"
const tight = s => { let t = s; while (/(\d)[ \u00a0]+(\d{3})(\b)/.test(t)) t = t.replace(/(\d)[ \u00a0]+(\d{3})(\b)/g, '$1$2$3'); return t; };
const plain = s => tight(deacc(stripTags(s)).replace(/[−–]/g, '-')).replace(/\s+/g, ' ');
const digitsToInt = arr => Number(arr.filter(x => x !== '').join(''));
function exprValue(str) {
  const s = String(str).replace(/\s+/g, '');
  if (!/^\d+([+\-]\d+)+$/.test(s)) return null;
  const tk = s.match(/\d+|[+\-]/g);
  let acc = Number(tk[0]);
  for (let i = 1; i < tk.length; i += 2) acc = tk[i] === '+' ? acc + Number(tk[i + 1]) : acc - Number(tk[i + 1]);
  return acc;
}

console.log('File: ' + FILE + '  (' + Buffer.byteLength(html) + ' bytes)');

// ============ 1. DOC LAI TOAN BO DAM SO ============
const parsers = [
  { re: /^(\d+)\s*\+\s*\?\s*=\s*(\d+)$/, calc: (a, b) => b - a },
  { re: /^(\d+)\s*\+\s*(\d+)\s*=\s*\?$/, calc: (a, b) => a + b },
  { re: /^(\d+)\s*[−–-]\s*(\d+)\s*=\s*\?$/, calc: (a, b) => a - b },
  { re: /^(.*?)\s*=\s*\?$/, calc: v => exprValue(v) },
];
let total = 0, graded = 0, ungradable = 0;
for (const lvl of Object.keys(X.levelData)) {
  X.levelData[lvl].questions.forEach((q, i) => {
    total++;
    if (X.isGradedLevel(Number(lvl))) graded++;
    const tag = 'L' + lvl + '.' + (i + 1);
    let expected;
    if (q.type === 'column') {
      expected = Number(q.top.replace(/\s+/g, '')) - Number(q.bot.replace(/\s+/g, ''));
      check(tag + ' so bi tru <= so tru', expected > 0);
    } else {
      const text = q.q.replace(/[−–]/g, '-').replace(/\s+/g, ' ').trim();
      let found = null;
      for (const p of parsers) {
        const m = text.match(p.re);
        if (m) { found = p.calc(...m.slice(1).map(v => (/^\d+$/.test(v) ? Number(v) : v))); if (found !== null) break; }
      }
      expected = found;
    }
    if (expected === null || expected === undefined || Number.isNaN(expected)) {
      ungradable++;
      check(tag + ' KHONG DOC DUOC PHEP TINH de doi chieu', false, JSON.stringify(q.q || (q.top + ' - ' + q.bot)));
      return;
    }
    check(tag + ' DAP SO SAI (ans=' + q.ans + ', tinh lai=' + expected + ')', expected === q.ans);
  });
}
notes.push('So cau: ' + total + ' | duoc cham: ' + graded + ' | doc duoc phep tinh: ' + (total - ungradable));

// ============ 2. LOI GIANG expText CUA CAP 1-3 (tai lap co che) ============
for (const lvl of ['1', '2', '3']) {
  X.levelData[lvl].questions.forEach((q, i) => {
    const tag = 'L' + lvl + '.' + (i + 1);
    const t = plain(q.expText);
    check(tag + ' expText khonh chua dap so ' + q.ans, new RegExp('(^|[^\\d])' + q.ans + '([^\\d]|$)').test(t));
    [...t.matchAll(/ban (?:than )?cua (\d+) la (\d+)/g)].forEach(m =>
      check(tag + ' "ban cua ' + m[1] + ' la ' + m[2] + '" KHONG TRON 10', Number(m[1]) + Number(m[2]) === 10));
    [...t.matchAll(/(?:can|bu) (\d+) (?![\d])/g)].forEach(m => { });
    [...t.matchAll(/so (\d+) can (\d+)/g)].forEach(m =>
      check(tag + ' "so ' + m[1] + ' can ' + m[2] + '" KHONG TRON 10', Number(m[1]) + Number(m[2]) === 10));
    [...t.matchAll(/tach (?:so )?(\d+) = (\d+) \+ (\d+)/g)].forEach(m =>
      check(tag + ' "tach ' + m[1] + ' = ' + m[2] + ' + ' + m[3] + '" SAI', Number(m[1]) === Number(m[2]) + Number(m[3])));
    [...t.matchAll(/(?:lay |them )?(\d+) ([+\-]) (\d+) = (\d+)/g)].forEach(m => {
      const a = +m[1], b = +m[3], c = +m[4];
      check(tag + ' phuong trinh loi giai sai: ' + m[0], (m[2] === '+' ? a + b : a - b) === c);
    });
  });
}
// cap 2: kiem tra dung mo hinh "ban than + so le"
X.levelData[2].questions.forEach((q, i) => {
  const m = q.q.match(/(\d+)\s*[−-]\s*(\d+)/);
  const tail = +m[1] - 10, buddy = 10 - (+m[2]);
  check('L2.' + (i + 1) + ' co che ban-than+so-le khong ra ' + q.ans, buddy + tail === q.ans, 'buddy=' + buddy + ' tail=' + tail);
});
// cap 3: mo hinh "tach so nho bu tron 10"
X.levelData[3].questions.forEach((q, i) => {
  const m = q.q.match(/(\d+)\s*\+\s*(\d+)/);
  const big = Math.max(+m[1], +m[2]), small = Math.min(+m[1], +m[2]);
  const buddy = 10 - big, remain = small - buddy;
  check('L3.' + (i + 1) + ' co che bo 10 + phan con lai khong ra ' + q.ans, 10 + remain === q.ans, 'big=' + big + ' buddy=' + buddy + ' remain=' + remain);
  check('L3.' + (i + 1) + ' so nho ' + small + ' khong du bu ' + buddy, small >= buddy);
});
// cap 7: moi cap nhom trong loi giai phai la so that cua phep tinh
X.levelData[7].questions.forEach((q, i) => {
  const t = plain(q.expText);
  const terms = (q.q.match(/\d+/g) || []).map(Number);
  check('L7.' + (i + 1) + ' loi giai khong chua dap so ' + q.ans, t.includes(String(q.ans)));
  [...t.matchAll(/\( (\d+) \+ (\d+) \) = (\d+)/g)].forEach(m => {
    check('L7.' + (i + 1) + ' nhom ( ' + m[1] + ' + ' + m[2] + ' ) khong phai 2 so trong de bai',
      terms.includes(+m[1]) && terms.includes(+m[2]));
    check('L7.' + (i + 1) + ' nhom ' + m[1] + ' + ' + m[2] + ' = ' + m[3] + ' SAI', +m[1] + +m[2] === +m[3]);
  });
});

// ============ 3. BA MAU DAT TINH MUC 4 ============
function dotsAtStep(topStr, botStr, activeCol) {
  const t = topStr.replace(/\s+/g, ''), b = botStr.replace(/\s+/g, '');
  const n = Math.max(t.length, b.length);
  const T = t.padStart(n, '0').split('').map(Number);
  const B = b.padStart(n, '0').split('').map(Number);
  const dots = [];
  let carry = false;
  for (let i = n - 1; i >= activeCol; i--) {
    const eff = B[i] + (carry ? 1 : 0);
    if (T[i] < eff) { carry = true; if (i - 1 >= 0) dots.push(i - 1); } else carry = false;
  }
  return dots.sort((x, y) => x - y);
}
for (const key of Object.keys(X.colProblems)) {
  const p = X.colProblems[key];
  const topS = p.top.join(''), botS = p.bot.join('').trim();
  const diff = Number(topS) - Number(botS);
  const n = p.top.length;
  check('MAU ' + key + ' so bi tru <= so tru', diff > 0);
  p.steps.forEach((st, si) => {
    const tag = 'MAU ' + key + ' buoc ' + (si + 1);
    const full = String(diff).padStart(n, '0');
    const lead = n - String(diff).length;
    const want = full.split('').map((d, i) => (i >= st.activeCol && !(i < lead)) ? d : '');
    check(tag + ' dang so khong khop (' + st.result.join('') + ' vs ' + want.join('') + ')',
      st.result.join('|') === want.join('|'), JSON.stringify(st.result));
    const expDots = dotsAtStep(topS, botS, st.activeCol);
    check(tag + ' DAU CHAM LECH: hien ' + JSON.stringify(st.dotCols) + ' - dang ly ' + JSON.stringify(expDots),
      JSON.stringify(st.dotCols.slice().sort((a, b) => a - b)) === JSON.stringify(expDots));
    const lineTxt = plain(st.lines.join(' '));
    [...lineTxt.matchAll(/ban than cua (\d+) la (\d+)/g)].forEach(m =>
      check(tag + ' ban than sai: ' + m[0], +m[1] + +m[2] === 10));
    [...lineTxt.matchAll(/(\d+) ([+\-]) (\d+) = (\d+)/g)].forEach(m =>
      check(tag + ' phep tinh trong loi giai sai: ' + m[0], (m[2] === '+' ? +m[1] + +m[3] : +m[1] - +m[3]) === +m[4]));
    [...lineTxt.matchAll(/so (\d+) co cham o chan thanh (\d+)/g)].forEach(m =>
      check(tag + ' "so ' + m[1] + ' co cham thanh ' + m[2] + '" SAI (phai +1)', +m[2] === +m[1] + 1));
    [...lineTxt.matchAll(/[Kk]et qua chung: (\d+)/g)].forEach(m =>
      check(tag + ' ket qua chung ' + m[1] + ' != ' + diff, +m[1] === diff));
    if (si === p.steps.length - 1) check(tag + ' buoc cuoi khong noi ket qua chung', /[Kk]et qua chung/.test(lineTxt));
  });
}

// ============ 4. BANG CHAN DOAN TU DONG ============
function diagCells(boardHtml) {
  return boardHtml.split('<div class="flex flex-col items-center px-0.5">').slice(1).map(col => {
    const cells = [...col.matchAll(/<div class="math-cell[^"]*">([\s\S]*?)<\/div>/g)].map(m => stripTags(m[1]).trim());
    return { top: cells[0], bot: cells[1], res: cells[cells.length - 1] };
  });
}
let diagN = 0;
for (const lvl of X.GRADED_LEVELS) {
  X.levelData[lvl].questions.forEach((q, i) => {
    if (q.type !== 'column') return;
    diagN++;
    const tag = 'CHAN DOAN L' + lvl + '.' + (i + 1) + ' (' + q.top + ' - ' + q.bot + ')';
    const d = X.buildSubtractionDiagnostic(q.top, q.bot);
    const cells = diagCells(d.boardHtml);
    const shown = digitsToInt(cells.map(c => c.res));
    check(tag + ' hien ra ' + shown + ' != ' + q.ans, shown === q.ans, cells.map(c => c.res).join(''));
    const n = cells.length;
    check(tag + ' so cot khong bang so chu so', n === Math.max(q.top.length, q.bot.length), n + '');
    check(tag + ' thieu log theo cot', d.stepLogs.length === n, d.stepLogs.length + '/' + n);
    check(tag + ' THU TU LOG DAO NGUOC (log dau tien = "' + plain(d.stepLogs[0]).slice(0, 16) + '")',
      /Cot .on vi/.test(plain(d.stepLogs[0])));
    // chu so tren/duoi phan hien dung de bai
    const tExp = q.top.padStart(n, '').split('');
    const bExp = q.bot.padStart(n, ' ').split('');
    cells.forEach((c, ci) => {
      if (tExp[ci].trim()) check(tag + ' chu so bi tru cot ' + ci + ' hien "' + c.top + '"', c.top === tExp[ci].trim());
      if (bExp[ci].trim()) check(tag + ' chu so tru cot ' + ci + ' hien "' + c.bot + '"', c.bot === bExp[ci].trim());
    });
    // moi lan muon phai co dung 1 dau cham o cot ben trai
    const t = q.top.padStart(n, '0').split('').map(Number);
    const b = q.bot.padStart(n, '0').split('').map(Number);
    let carry = false, expDots = 0;
    for (let k = n - 1; k >= 0; k--) {
      const eff = b[k] + (carry ? 1 : 0);
      if (t[k] < eff) { carry = true; if (k - 1 >= 0) expDots++; } else carry = false;
    }
    const gotDots = (d.boardHtml.match(/foot-dot/g) || []).length;
    check(tag + ' so dau cham ' + gotDots + ' != so lan muon ' + expDots, gotDots === expDots);
    // loi giai trong bang chan doan phai khop che ban-than-10
    [...d.stepLogs.map(plain).join(' ').matchAll(/ban than cua (\d+) la (\d+)/g)].forEach(m =>
      check(tag + ' ban than sai trong loi giai: ' + m[0], +m[1] + +m[2] === 10));
  });
}
const dz1000 = X.buildSubtractionDiagnostic('1000', '347');
check('CHAN DOAN 1000-347 khong hien chu 0 mo o cot nghin', /text-slate-300">0</.test(dz1000.boardHtml));
check('CHAN DOAN 1000-347 thieu gia thich dau cham roi vao o trong', /o trong/.test(plain(dz1000.stepLogs.join(' '))));
notes.push('So bai dat tinh co bang chan doan: ' + diagN);

// ============ 5. THANG SAO ============
const starRows = [];
for (let c = 0; c <= 16; c++) starRows.push(c + '->' + X.starsFor(c, 16) + '*');
notes.push('Thang sao x/16: ' + starRows.join(' '));
check('NGUONG 3 SAI: 14/16 phai 3sao', X.starsFor(14, 16) === 3 && X.starsFor(13, 16) === 2);
check('NGUONG 2 SAI: 10/16 phai 2sao', X.starsFor(10, 16) === 2 && X.starsFor(9, 16) === 1);
check('NGUONG 1 SAI: 5/16 phai 1sao', X.starsFor(5, 16) === 1 && X.starsFor(4, 16) === 0);
check(' toi da 3 sao', X.starsFor(16, 16) === 3);
check('diem 0 -> 0 sao', X.starsFor(0, 16) === 0);

// ============ 6. CONG TEN ============
[['Mai', 'Mai'], ['mai', 'Mai'], [' MAI ', 'Mai'], ['maI', 'Mai'], ['Mai ', 'Mai'],
['Gia Linh', 'Gia Linh'], ['gialinh', 'Gia Linh'], ['Linh', 'Gia Linh'], ['linh', 'Gia Linh'],
['GIA LINH', 'Gia Linh'], ['Trà Giang', 'Trà Giang'], ['tra giang', 'Trà Giang'],
['TrA GIANG', 'Trà Giang'], ['giang', 'Trà Giang'], ['Giang', 'Trà Giang'], ['TraGiang', 'Trà Giang'],
].forEach(([inp, want]) => {
  const r = X.findRoster(inp);
  check('CONG TEN tu choi "' + inp + '" (mong: ' + want + ')', !!r && r.label === want, r ? r.label : 'null');
});
['', '   ', 'An', 'Trang', 'Mai Linh', 'Giang Mai', 'Linh Giang', 'thay', 'Co Mai', 'abc', 'Mia', 'GiNg', 'tra', 'gi', 'mi']
  .forEach(inp => check('CONG TEN lech: chap nhan "' + inp + '" -> ' + (X.findRoster(inp) || {}).label, !X.findRoster(inp)));
check('Danh sach ten = 3 ban', X.ROSTER.length === 3);
notes.push('Ty le % khi 13/16 = ' + Math.round(13 / 16 * 100) + '% (3sao tu 14 cau)');

// ============ 7. CO CAU CHAM DIEM ============
check('TONG CAU DUOC CHAM = 16', X.TOTAL_GRADED === 16 && X.gradedKeys().length === 16, 'duoc ' + X.TOTAL_GRADED);
check('key cham diem khong trung', new Set(X.gradedKeys()).size === 16);
check('cap 1-3 la on luyen', [1, 2, 3].every(l => !X.isGradedLevel(l)));
check('du 4 cap cham diem', X.GRADED_LEVELS.join() === '4,5,6,7');
notes.push('So cau tung cap: ' + Object.keys(X.levelData).map(l => 'L' + l + '=' + X.levelData[l].questions.length).join(' '));
notes.push('Cap 5-6-7 co muon lien hoan: ' + X.levelData[5].questions.concat(X.levelData[6].questions).every(q => {
  const n = Math.max(q.top.length, q.bot.length);
  const t = q.top.padStart(n, '0').split('').map(Number), b = q.bot.padStart(n, '0').split('').map(Number);
  let carry = false, borrows = 0;
  for (let k = n - 1; k >= 0; k--) { const e = b[k] + (carry ? 1 : 0); if (t[k] < e) { carry = true; borrows++; } else carry = false; }
  return borrows >= 2;
}));

// ============ 8. NOI DUNG GUI VE SHEET ============
const attempts = {
  'lvl-4-0': { val: 23, ok: false }, 'lvl-4-1': { val: 257, ok: true }, 'lvl-4-2': { val: 258, ok: true },
  'lvl-5-0': { val: 33656, ok: true }, 'lvl-5-1': { val: 35656, ok: true }, 'lvl-5-2': { val: 33715, ok: true }, 'lvl-5-3': { val: 264569, ok: true },
  'lvl-6-0': { val: 5673, ok: true }, 'lvl-6-1': { val: 26316, ok: true }, 'lvl-6-2': { val: 44386, ok: true }, 'lvl-6-3': { val: 53725, ok: true },
  'lvl-7-0': { val: 2000, ok: true }, 'lvl-7-1': { val: 2000, ok: true }, 'lvl-7-2': { val: 1497, ok: true }, 'lvl-7-3': { val: 3466, ok: true }, 'lvl-7-4': { val: 4800, ok: false },
};
const ml = X.mistakeLines(attempts);
notes.push('loiSai -> ' + ml.join(' | '));
check('loiSai phai co 2 dong', ml.length === 2);
ml.forEach(l => {
  check('loiSai de dinh dau "=" roi ("' + l + '")', !/=\s*em ghi/.test(l));
  check('loiSai thieu dap an dung: ' + l, /, dap an dung \d+$/.test(deacc(l)));
  check('loiSai phai co ten bai dang "Bai 4.1": ' + l, /^Bai [4567]\.\d+: /.test(deacc(l)));
});
const al = X.answerLines(attempts);
check('dapAnCuaEm du 16 dong', al.length === 16);
check('dapAnCuaEm co danh bai', al.every(s => /^Bai [4567]\.\d+ = /.test(deacc(s))));
check('dapAnCuaEm ghi ro dung/sai bang tieng Viet', al.every(s => /\((dung|sai)\)$/.test(deacc(s))));
check('dapAnCuaEm khong con chu cai D/S tron', !al.some(s => / \([DS]\)$/.test(s)));
notes.push('dapAnCuaEm 2 dong dau -> ' + al.slice(0, 2).join(' | '));
const keysNeeded = ['ten', 'ngay', 'dung', 'tong', 'sao', 'phanTram', 'loiSai', 'dapAnCuaEm'];
check('8 khoa payload = 8 khoa ENTRY', keysNeeded.slice().sort().join() === Object.keys(X.ENTRY).slice().sort().join(), Object.keys(X.ENTRY).join());
check('FORM_ENDPOINT gan that', X.SEND_READY === true && /^https:\/\/docs\.google\.com\/forms\/d\/e\/[\w-]+\/formResponse$/.test(X.FORM_ENDPOINT));
check('entry.* khong trung lap', new Set(Object.values(X.ENTRY)).size === 8);
check('moi field dang ky entry.<so>', Object.values(X.ENTRY).every(v => /^entry\.\d+$/.test(v)));
// chu trong source khong duoc con placeholder
check('van dang con cho placeholder form', !/DAN_LINK_FORM_VAO_DAY|forms\/d\/e\/XXXX/.test(html));

// ============ 8b. GIU BAO CAU DA GO + NGAY THANG ============
// Tinh huong that: be go 4 o cap 4, bam Kiem tra cau 1 -> renderQuizList() dung lại
// entire danh sách. Nếu không có kho nháp thì 3 ô còn mất sạch.
for (const k of ['lvl-4-0', 'lvl-4-1', 'lvl-4-2']) delete X.draftStore[k];
const o1 = el(), o2 = el(), o3 = el();
o1.id = 'input-lvl-4-0'; o1.value = '23';
o2.id = 'input-lvl-4-1'; o2.value = '257';
o3.id = 'input-lvl-4-2'; o3.value = '';
const khung = el();
khung.querySelectorAll = () => [o1, o2, o3];
STUB['quiz-container'] = khung;
X.captureDrafts();
check('captureDrafts luu so da go cua cau 1', X.draftStore['lvl-4-0'] === '23', JSON.stringify(X.draftStore));
check('captureDrafts luu so da go cua cau 2', X.draftStore['lvl-4-1'] === '257');
check('captureDrafts khong luu o trong', !('lvl-4-2' in X.draftStore));
const rowHtml = X.answerRowHtml('lvl-4-0', 4, 0, false);
check('o tra loi phai duoc phat lai so be da go', /value="23"/.test(rowHtml), rowHtml.slice(0, 220));
check('o tra loi phai co Enter bam vao', /onkeydown="pressEnter\(event, 4, 0\)"/.test(rowHtml));
const rowHtmlRong = X.answerRowHtml('lvl-4-2', 4, 2, false);
check('o chua go khong bi gan gia tri lang can', /value=""/.test(rowHtmlRong), rowHtmlRong.slice(0, 220));
check('renderQuizList go captureDrafts truoc khi dung lai danh sach',
  /function renderQuizList\(\)\s*\{\s*captureDrafts\(\)/.test(src));
check('evaluateAnswer xoa nhap cua cau da ghi nhan', /delete draftStore\[qKey\]/.test(src));
check('startPractice lam sach kho nhap khi sang ban khac', /function startPractice\(\)[\s\S]{0,400}?clearDrafts\(\)/.test(src));
check('backToGate cung lam sach khi quay lai cong ten', /function backToGate\(\)[\s\S]{0,160}?clearDrafts\(\)/.test(src));

// Ro nhap giua hai ban (tai that trong trinh duyet): Mai go 123 roi quay lai cong,
// Gia Linh mo len phai khong con thay 123.
X.draftStore['lvl-1-0'] = '123';
khung.innerHTML = '<input id="input-lvl-1-0" value="123">';
X.clearDrafts();
check('clearDrafts xoa het kho nhap', Object.keys(X.draftStore).length === 0, JSON.stringify(X.draftStore));
check('clearDrafts xoa ca o dang hien tren man hinh', khung.innerHTML === '', khung.innerHTML);
check('keo phan hoi vao tam mat sau khi ghi nhan (khong trjot focus sang o khac)',
  /keoVaoTamai\('feedback-' \+ qKey\)/.test(src) && !/focusOtTraLoi/.test(src));

// gia tri nhap vao o bi loc ky tu la (o la type=number nhung van khong nen noi chu)
const oRac = el(); oRac.id = 'input-lvl-4-1'; oRac.value = '"><img src=x>';
khung.querySelectorAll = () => [oRac];
X.captureDrafts();
check('captureDrafts loc ky tu lac va khong luu chuoi rong', !('lvl-4-1' in X.draftStore), JSON.stringify(X.draftStore));
const oSo = el(); oSo.id = 'input-lvl-4-1'; oSo.value = '257';
khung.querySelectorAll = () => [oSo];
X.captureDrafts();
check('captureDrafts van luu so hop le sau khi loc', X.draftStore['lvl-4-1'] === '257');

// ngay thang: must be fixed dd/MM/yyyy HH:mm, not browser-locale dependent
const d = new Date(2026, 9, 13, 8, 5);
check('ngayLamBai ra dd/MM/yyyy HH:mm', X.ngayLamBai(d) === '13/10/2026 08:05', X.ngayLamBai(d));
check('payload ngay van dung toLocaleString (ph thuoc ngon ngu trinh duyet)', !/toLocaleString/.test(src));
check('loiSai van dung chu thieu dau', !/'Khong sai cau nao'|'bo trong'|'Bai '/.test(src));
notes.push('ngayLamBai mau -> ' + X.ngayLamBai(d));

// ============ 9. NAM NOI HTML <-> JS ============
const subIds = [...html.matchAll(/id="btn-sub-demo-([\d-]+)"/g)].map(m => m[1]);
const addIds = [...html.matchAll(/id="btn-add-demo-([\d-]+)"/g)].map(m => m[1]);
const subKeys = (src.match(/\['16-8', '15-7', '13-9', '14-6'\]/) || [null])[0];
const addKeys = (src.match(/\['6-8', '7-9', '5-8', '8-7'\]/) || [null])[0];
check('4 nut vi du tru co id dung voi mang key', subIds.sort().join() === ['13-9', '14-6', '15-7', '16-8'].join(), subIds.join());
check('4 nut vi du cong co id dung voi mang key', addIds.sort().join() === ['5-8', '6-8', '7-9', '8-7'].join(), addIds.join());
check('mang key phep tru thieu du 4 vi du', subKeys !== null);
check('mang key phep cong thieu du 4 vi du', addKeys !== null);
check('mo mac trang: sub-card-step3-math = "2 + 6 = 8"', /id="sub-card-step3-math">2 \+ 6 = 8</.test(html));
check('mo mac trang: add-card-step3-math = "10 + 4 = 14"', /id="add-card-step3-math">10 \+ 4 = 14</.test(html));
check('mo mac trang: sub-card-step3-final = 8 (16-8)', /id="sub-card-step3-final">8</.test(html));
check('mo mac trang: add-card-step3-final = 14 (6+8)', /id="add-card-step3-final">14</.test(html));
check('mo mac trang: sub-card-step2-math = "10 - 8 = 2"', /id="sub-card-step2-math">10 − 8 = 2</.test(html));
check('mo mac trang: add-card-step2-remain = 4', /id="add-card-step2-remain">4</.test(html));
// 5 cap ban than 10 trong Muc 1
const pairs = [...html.matchAll(/(\d) \+ (\d) = 10<\/div>/g)].map(m => [+m[1], +m[2]]);
check('MUC 1 co du 5 cap ban than', pairs.length === 5, JSON.stringify(pairs));
pairs.forEach(p => check('MUC 1 cap ' + p[0] + '+' + p[1] + ' != 10', p[0] + p[1] === 10));
// nguoi dung la thay Giao duc, khong con tu "co" chi nguoi dung
const coRefs = [...html.matchAll(/(?:^|\s)([Cc]ô)\s/g)].map(m => m[0]);
notes.push('Chu "Co" con trong file: ' + (coRefs.length ? coRefs.join(' ') : 'khong'));

console.log('=== GHI CHU ===');
notes.forEach(n => console.log('  - ' + n));
console.log('=== ' + (fails.length ? 'LOI (' + fails.length + ')' : 'KHONG PHAT HIEN LOI') + ' ===');
fails.forEach(f => console.log('  ! ' + f));
process.exitCode = fails.length ? 1 : 0;
