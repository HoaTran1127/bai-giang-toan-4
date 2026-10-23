/* =============================================================================
   probe-a11y.js — cửa kiểm "máy đọc màn hình + ô sáng viền" của bài 4
     node bai-giang-tong-ti/.parts/probe-a11y.js
   Hai phần, chạy trên CHÍNH file ../index.html (không phải bản cắt):
     1) PROBE TRANG THẬT: nạp bài trong iframe cùng gốc, bấm Enter / kéo chuột / Escape
        thật trên sơ đồ MỤC 1, đo số ô sáng + chữ trong #keo-tin + ô đã đổ thật chưa.
     2) DOT BIEN: phá từng mảnh của tính năng (CSS .drop.nham, oNham ở dragstart, ghi #keo-tin
        ở thaDung, markup vùng live, phân loại ô, boNham ở boChonKeo, ô đã đổ vẫn sáng,
        chonKeo không sáng) — mỗi mảnh phải khiến tuKiem() BÁO ĐÚNG một lỗi. Probe im lặng = cửa hỏng.
        M9 là đột biến ÂM TINH: chỉ bỏ nhịp nhấp nháy, selector vẫn còn ⇒ trang PHẢI XANH,
        chứng minh luật không bắt lỗi những thứ không phải lỗi (phát nông).
   Exit 0 khi tất cả đạt (11/11 trang thật · 9/9 đột biến). Chrome headless được tìm từng chỗ như bài 3 từng làm.
   ============================================================================= */
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BAI = path.join(__dirname, '..', 'index.html');
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
  throw new Error('Khong tim thay Chrome — dat bien truong CHROME=<duong dan chrome.exe>');
})();

const THUDIR = path.join(os.tmpdir(), 'bai4-a11y');
fs.rmSync(THUDIR, { recursive: true, force: true });
fs.mkdirSync(THUDIR, { recursive: true });
const goc = fs.readFileSync(BAI, 'utf8');
fs.writeFileSync(path.join(THUDIR, 'index.html'), goc);
const anh = path.join(__dirname, '..', 'anh-avatar');
if (fs.existsSync(anh)) fs.cpSync(anh, path.join(THUDIR, 'anh-avatar'), { recursive: true });

function url(f) { return 'file:///' + path.resolve(f).replace(/\\/g, '/'); }
/* --enable-logging=stderr: Chrome in thẳng "Uncaught Error: ..." ra stderr, kể cả lỗi nảy sinh
   bên trong một event listener (dispatchEvent nuốt, window.onerror của frame cha thì bị xoá
   sạch vì same-origin navigation reset global). Đây là chỗ duy nhất nhìn thấy loại lỗi đó. */
function chrome2(dom, budget) {
  const r = spawnSync(CHROME, ['--headless=new', '--disable-gpu', '--no-sandbox',
    '--allow-file-access-from-files', '--enable-logging=stderr', '--v=0',
    '--virtual-time-budget=' + (budget || 12000), '--dump-dom', dom],
    { encoding: 'utf8', maxBuffer: 1 << 26 });
  return { dom: (r.stdout || '').replace(/\r/g, ''), loi: (r.stderr || '').replace(/\r/g, '') };
}
function demLoi(log) { return (String(log).match(/Uncaught/g) || []).length; }

/* ---------------- 1 · PROBE TRANG THAT ---------------- */
const PROBE = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>p4</title></head><body>
<div id="out">PENDING</div><iframe id="f" style="width:760px;height:1400px"></iframe>
<script>
var L=[];function step(n,v){L.push(n+'='+(typeof v==='object'?JSON.stringify(v):String(v)));}
function done(){document.getElementById('out').textContent='@KQ@ '+L.join(' @|@ ')+' @END@';}
var f=document.getElementById('f'),iw,idoc;
/* iframe nạp cùng gốc ⇒ đọc được DOM bên trong mà vẫn giữ file:// (không cần server).
   Tên bài nạp vào do cửa ghi, thay vào ô dấu ngoặc ở cuối trang (split/join, không dùng replace:
   replace chỉ thay lần ĐẦU, mà lần đầu lại là ngay dòng chú thích này ⇒ iframe loading sai file,
   probe treo, mọi hàng "trang thật" báo "(không đo được)" mà errors vẫn xanh giả). */
f.onload=function(){try{
iw=f.contentWindow;idoc=iw.document;
var $=function(s,g){return (g||idoc).querySelector(s);};
var $$=function(s,g){return [].slice.call((g||idoc).querySelectorAll(s));};
function enter(el){el.dispatchEvent(new iw.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));}
var vung=idoc.getElementById('keo-tin');
step('live',vung?(vung.getAttribute('role')+'/'+vung.getAttribute('aria-live')):'THIEU');
step('live-an',vung?(vung.getBoundingClientRect().left<-100?'ngoai-man-hinh':'HIEN-CA-TREN-TRANG'):'THIEU');
var item=$('.tu-item'),the=$$('.keo',item),o=$$('.drop',item);
step('muc1',{the:the.length,o:o.length});
enter(the[0]);
var sang=$$('.drop.nham',item);
step('nac-the',{sang:sang.length,trungLoai:sang.every(function(e){return e.getAttribute('data-loai')===the[0].getAttribute('data-loai');}),tin:(vung.textContent||'').slice(0,40)});
var idx=+item.id.replace('tu-',''),s1=iw.doiSo(iw.TU[idx]);
var giaCua=function(el){return /-r1$/.test(el.id)?String(s1.b):String(s1.a);};
enter(o[o.length-1]);
step('tha-sai',{cap:($('.cap',item).textContent||'').slice(0,30),tin:(vung.textContent||'').slice(0,30),
  daDo:!!(iw.tuDa[idx]&&(iw.tuDa[idx].r0||iw.tuDa[idx].r1)),conSang:$$('.drop.nham',item).length});
var dn=$('.keo.chon',item);if(dn)dn.dispatchEvent(new iw.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
var con=$$('.drop:not(.ok)',item),tm=$$('.keo',item),TD=null,OD=null;
for(var a=0;a<tm.length&&!TD;a++){var tr=con.filter(function(e){return giaCua(e)===tm[a].getAttribute('data-gia');});if(tr.length){TD=tm[a];OD=tr[0];}}
if(!TD){step('tha-dung','KHONG-TIM-DUOC-CAP');}
else{enter(TD);enter(OD);
 step('tha-dung',{daDo:!!(iw.tuDa[idx]&&(iw.tuDa[idx].r0||iw.tuDa[idx].r1)),oCon:$$('.drop',item).length,
   conSang:$$('.drop.nham',item).length,keoCon:$$('.keo',item).length,tin:(vung.textContent||'').slice(0,40)});}
var t2=$$('.keo',item);if(t2.length){enter(t2[0]);var st=$$('.drop.nham',item).length;
 t2[0].dispatchEvent(new iw.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
 step('escape',{sangTruoc:st,sangSau:$$('.drop.nham',item).length,tin:(vung.textContent||'').slice(0,25)});}
step('sot',{drop:$$('.drop.nham').length,vung:$$('[data-thavung].nham').length});
var it2=$$('.tu-item')[1],th2=$$('.keo',it2)[0];
th2.dispatchEvent(new iw.Event('dragstart',{bubbles:true}));
step('dragstart', {sang:$$('.drop.nham',it2).length,itemKhac:$$('.drop.nham',$$('.tu-item')[0]).length});
th2.dispatchEvent(new iw.Event('dragend',{bubbles:true}));
step('dragend',$$('.drop.nham').length);
f.style.width='320px';
setTimeout(function(){var de=idoc.documentElement;
 step('ngang-320',{sw:de.scrollWidth,cw:de.clientWidth,tran:de.scrollWidth>de.clientWidth+1?'TRAN':'ok'});
 step('tuKiem',(idoc.getElementById('footer-stamp').textContent||'').slice(0,50));
 done();},300);
}catch(e){step('LOI-PROBE',(e&&e.message)||e);done();}};
f.src='__SRC__';
<\/script></body></html>`;

/* 1a · bản THẬT: đo tương tác + đếm lỗi JS rơi ra stderr trong cùng một lần chạy */
const probeFile = path.join(THUDIR, 'probe.html');
function nap(src) { var s = PROBE.split('__SRC__').join(src); if (s.indexOf('__SRC__') >= 0) throw new Error('Không tìm thấy chỗ ghi tên bài trong probe'); return s; }
fs.writeFileSync(probeFile, nap('index.html?a11y=1'));
const lan = chrome2(url(probeFile));

/* 1b · CÂY ĐO TỰ KIỂM: nhét một lỗi THẬT vào listener của thaDung rồi cho chính cây đo
   chạy. Nếu stderr không hiện "Uncaught" thì hàng "errors" phía dưới là màu xanh giả. */
const gocLf0 = goc.replace(/\r\n/g, '\n');
const neoLoi = 'function thaDung(el, keo, cap) {\n  el.innerHTML = keo.gia;';
const coLoiGia = gocLf0.split(neoLoi).length === 2;
let loiCayDo = 0;
if (coLoiGia) {
  fs.writeFileSync(path.join(THUDIR, 'gio-loi.html'),
    gocLf0.replace(neoLoi, 'function thaDung(el, keo, cap) {\n  throw new Error("LOI-GIA-CAY-DO");'));
  fs.writeFileSync(path.join(THUDIR, 'probe-loi.html'), nap('gio-loi.html'));
  loiCayDo = demLoi(chrome2(url(path.join(THUDIR, 'probe-loi.html'))).loi);
}

const m = lan.dom.match(/<div id="out">([\s\S]*?)<\/div>/);
const kq = m ? m[1].replace(/@KQ@ | @END@/g, '').split(' @|@ ') : [];
const dat = {};
kq.forEach(function (d) { const i = d.indexOf('='); dat[d.slice(0, i)] = d.slice(i + 1); });
dat['errors'] = String(demLoi(lan.loi));

const doi = [
  ['live', 'status/polite', '#keo-tin phai role=status + aria-live=polite'],
  ['live-an', 'ngoai-man-hinh', 'vung aria-live khong duoc chiem cho tren man hinh'],
  ['nac-the', /"sang":2,"trungLoai":true/, 'Enter vao the phai sang 2 o cung loai'],
  ['tha-sai', /"daDo":false,"conSang":2/, 'tha sai khong duoc do o, van gi the dang nac'],
  ['tha-dung', /"daDo":true,"oCon":1,"conSang":0,"keoCon":1/, 'tha dung phai do o + tat sang + tieu the the'],
  ['escape', /"sangTruoc":\d+,"sangSau":0/, 'Escape dat the xuong thi kh duoc de lai vien sang'],
  ['sot', /"drop":0,"vung":0/, 'khong duoc con o sang roi vung sang sot lai tren trang'],
  ['dragstart', /"sang":2,"itemKhac":0/, 'dragstart (keo chuot) cung sang o va KHONG sang sang so khac'],
  ['dragend', '0', 'dragend phai tat toan bo vien sang'],
  ['ngang-320', /"tran":"ok"/, 'o sang khong duoc lam tran ngang 320px'],
  ['tuKiem', /107 mục khớp/, 'tuKiem() phai con 107 muc (chu "muc khop" chi in ra khi err.length = 0)'],
  ['errors', '0', 'khong duoc co loi JS nao khi bam Enter / keo chuot / Escape — loi trong listener bi dispatchEvent nuot im, nen trang tu "xanh" van co the an loi'],
];
let thatBai = 0;
console.log('— PHAN 1 · trang that (Chrome nap bai trong iframe cung goc) —');
doi.forEach(function (d) {
  const [ten, mong, moTa] = d;
  const co = dat[ten];
  const ok = co !== undefined && (typeof mong === 'string' ? co.indexOf(mong) >= 0 : mong.test(co));
  if (ok) thatBai++;
  console.log('  ' + (ok ? 'DAT ✓ ' : 'HONG ✕') + ' ' + ten.padEnd(10) + ' → ' + (co === undefined ? '(khong do duoc)' : co.slice(0, 90)) +
    (ok ? '' : '\n           mong: ' + mong + '  ·  ' + moTa));
});
/* Hàng "errors" chỉ có nghĩa nếu đúng cây đo đó THẤY được lỗi. Cho chạy bản nhét lỗi thật:
   nó phải báo ít nhất một dòng Uncaught. Không thấy = hàng errors xanh giả, cửa tự đánh lừa mình. */
const cayDoDat = coLoiGia && loiCayDo > 0;
console.log('  ' + (cayDoDat ? 'CÂY ĐO ✓ ' : 'CÂY ĐO ✕ ') + ' đo lỗi JS  → ' + (coLoiGia
  ? 'bản nhét lỗi thật báo ' + loiCayDo + ' dòng Uncaught (không báo gì = hàng errors là màu xanh giả)'
  : 'NEO CHET: khong tim thay thaDung de nhet loi'));

/* ---------------- 2 · DOT BIEN ---------------- */
const PHA = [
  ['M1 xoa CSS .drop.nham', '.drop.nham { border-color', '.drop.nhamKhongDung { border-color', 'KHÔNG có luật ".drop.nham"'],
  ['M2 bo oNham o dragstart', '      oNham(KEO.loai, root);\n      if (ev.dataTransfer)', '      if (ev.dataTransfer)', 'dragstart) không gọi oNham'],
  ['M3 thaDung khong ghi live', "  tin('✓ Đúng ô", "  baoTieng('✓ Đúng ô", 'thaDung không ghi vào #keo-tin'],
  ['M4 xoa markup #keo-tin', '<div id="keo-tin" class="keo-tin"', '<div id="keo-tinX" class="keo-tin"', 'Thiếu vùng #keo-tin'],
  ['M5 oNham khong phan loai', "    if ((ds[i].getAttribute('data-loai') || 'phan') !== loai) continue;", '    /* khong phan loai */', 'tô sáng không phân biệt loại'],
  ['M6 boChonKeo khong tat sang', "  if (c) c.classList.remove('chon');\n  boNham();", "  if (c) c.classList.remove('chon');", 'boChonKeo không tắt sáng'],
  ['M7 oNham khong bo o da do', "    if (ds[i].classList.contains('ok')) continue;", '    /* khong bo o da do */', 'Ô ĐÃ ĐỔ rồi vẫn sáng viền'],
  ['M8 chonKeo khong sang o', "  el.classList.add('chon');\n  oNham(KEO.loai, root);", "  el.classList.add('chon');", 'Đường BẤM / Enter (chonKeo) không làm sáng ô'],
  ['M9 (ÂM TINH) bo animation cua .drop.nham', ' .drop.nham { border-color: #F59E0B; background: #FFFBEB; animation: nhapNhan 1.2s ease-in-out infinite; }',
   ' .drop.nham { border-color: #F59E0B; background: #FFFBEB; }',
   'M9 la dot bien AM TINH: bo nhip nhap nho thi luat chi can selector ".drop.nham" van con dat, trang PHAI XANH. Trang bao loi = luat phat nong.']
];
const gocLf = goc.replace(/\r\n/g, '\n');
const mutant = path.join(THUDIR, 'do-bien.html');
console.log('— PHAN 2 · dot bien (moi manh phai khién tuKiem() bao DUNG loi) —');
let dotBienDat = 0, caChet = 0;
PHA.forEach(function (d) {
  const [ten, find, rep, mong] = d;
  const phan = gocLf.split(find);
  if (phan.length !== 2) { console.log('  NEO CHET ✕ ' + ten + ' (tim thay ' + (phan.length - 1) + ' lan)'); caChet++; return; }
  fs.writeFileSync(mutant, phan.join(rep));
  const o = chrome2(url(mutant), 9000).dom;
  const an = /id="self-test-alert" class="selftest hidden"/.test(o);
  const trang = o.replace(/\s+/g, ' ');
  if (ten.indexOf('M9') === 0) {
    // M9 la dot bien AM TINH: chi bo nhip nhap nho, selector ".drop.nham" van con trong stylesheet that,
    // nen tuKiem PHAI XANH. Neu trang bao loi thi luat dang phat nong no bat ca thu khong phai loi.
    const okM9 = an;
    if (okM9) dotBienDat++; else caChet++;
    console.log('  ' + (okM9 ? 'XANH ✓  ' : 'PHAT NONG ✕') + ' ' + ten + ' → ' + (an ? 'trang van xanh: luat khong bat nhip nhap' : 'trang bao loi khong co gi sai'));
    return;
  }
  const ok = !an && trang.indexOf(mong) >= 0;
  if (ok) dotBienDat++; else caChet++;
  console.log('  ' + (ok ? 'CHAY ✓  ' : 'IM LANG ✕') + ' ' + ten + (ok ? '' : ' → ' + (an ? 'trang XANH (khong phat hien)' : 'bao loi khac: ' + mong)));
});

console.log('KET LUAN: trang that ' + thatBai + '/' + doi.length + ' · cay do ' + (cayDoDat ? 'dat' : 'HONG') +
  ' · dot bien ' + dotBienDat + '/' + PHA.length +
  (caChet ? ' · ' + caChet + ' NEO CHET' : ''));
process.exit(thatBai === doi.length && cayDoDat && dotBienDat === PHA.length ? 0 : 1);
