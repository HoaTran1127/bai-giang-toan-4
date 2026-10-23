/* =============================================================================
   probe-giu-bai.js — cửa kiểm "giữ bài dở" của bài 2 (Đổi đơn vị đo lường)
     node bai-giang-doi-don-vi/.parts/probe-giu-bai.js

   Vì sao phải là N process Chrome riêng, mỗi phase một process: `localStorage` chỉ
   sống giữa các lần nạp nếu dùng chung một `--user-data-dir`, và "mở lại trang" chỉ
   là mở lại THẬT khi trình duyệt bị đóng hẳn giữa hai phase — reload trong cùng một
   script không chứng minh được gì (đó đúng là chỗ bài 2 từng sai: điện thoại giải
   phóng tab giữa cấp là mất trắng 11 câu đã làm).

   Vì sao chặn submit: cửa này nộp bài THẬT về Google Form nếu để yên. Ghi đè
   `HTMLFormElement.prototype.submit` trong iframe ngay sau khi bài nạp ⇒ chụp đủ
   9 field rồi DỪNG, không có request nào ra ngoài ⇒ Sheet của thầy không thêm dòng
   rác. Prototype phải bọc sau lúc nạp: same-origin navigation dựng lại global mới,
   gắn shim trước đó là bị xoá sạch.

   Exit 0 khi mọi hàng đạt VÀ cả 5 mutation đều bị bắt (kèm 1 hàng âm tinh chứng minh cửa
   không hỏng ăn lung tung). Tìm Chrome từng chỗ như bài 4 đã làm.
   ============================================================================= */
const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const BAI = path.join(__dirname, '..', 'index.html');
const KHO = 'bg4-giu-bai-doi-don-vi';
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

const THUDIR = path.join(os.tmpdir(), 'bai2-giu-bai');
const PROFILE = path.join(os.tmpdir(), 'bai2-giu-bai-profile');
fs.rmSync(THUDIR, { recursive: true, force: true });
fs.mkdirSync(THUDIR, { recursive: true });
/* Profile cũ mang theo nháp của lần chạy trước ⇒ xoá trước khi đo, nếu không phase
   "sạch" mở lên đã thấy bài của người khác. */
fs.rmSync(PROFILE, { recursive: true, force: true });
const goc = fs.readFileSync(BAI, 'utf8');
const banSao = path.join(THUDIR, 'index.html');
fs.writeFileSync(banSao, goc);
const anh = path.join(__dirname, '..', 'anh-avatar');
if (fs.existsSync(anh)) fs.cpSync(anh, path.join(THUDIR, 'anh-avatar'), { recursive: true });
if (fs.readFileSync(banSao, 'utf8') !== goc) throw new Error('Bản sao khác file giao — đo làm gì nữa');

function url(f) { return 'file:///' + path.resolve(f).replace(/\\/g, '/'); }
function chrome(dom, budget) {
  const r = spawnSync(CHROME, ['--headless=new', '--disable-gpu', '--no-sandbox',
    '--allow-file-access-from-files', '--user-data-dir=' + PROFILE,
    '--enable-logging=stderr', '--v=0',
    '--virtual-time-budget=' + (budget || 14000), '--dump-dom', dom],
    { encoding: 'utf8', maxBuffer: 1 << 26 });
  return { dom: (r.stdout || '').replace(/\r/g, ''), loi: (r.stderr || '').replace(/\r/g, '') };
}

/* ---------------- DRIVER ----------------
   Một trang, chín phase chọn bằng ?p=. Mỗi phase in các hàng "ten= giaTri". */
const DRIVER = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>gb</title></head><body>
<div id="out">PENDING</div><iframe id="f" style="width:760px;height:1600px"></iframe>
<script>
var P=(location.search.match(/p=([a-z0-9-]+)/)||[])[1]||'draft';
var L=[];function step(n,v){L.push(n+'='+(typeof v==='object'?JSON.stringify(v):String(v)));}
function done(){document.getElementById('out').textContent='@KQ@ '+L.join(' @|@ ')+' @END@';}
var f=document.getElementById('f'),iw,idoc,nap=0;
f.onload=function(){
  nap++;
  iw=f.contentWindow; idoc=iw.document;
  if (nap===1 && (P==='doi-sinh-vien'||P==='sai-ten')) {   /* phase cần cổng tên sạch */
    try { iw.localStorage.removeItem('${KHO}'); } catch (e) {}
    f.src='index.html?again=1'; return;
  }
  try { chay(); } catch (e) { step('LOI-DRIVER', (e&&e.message)||e); done(); }
};
function chay(){
  /* chặn đường gửi TRƯỚC mọi tương tác: prototype của frame cha bị reset khi nạp bài */
  iw.__posts=[];
  iw.HTMLFormElement.prototype.submit=function(){
    var o={action:this.action,target:this.target,cs:this.acceptCharset,fields:[]};
    [].forEach.call(this.querySelectorAll('input'),function(i){o.fields.push(i.name+'~'+i.value);});
    iw.__posts.push(o);
  };
  var $=function(s){return idoc.querySelector(s);};
  var $$=function(s){return [].slice.call(idoc.querySelectorAll(s));};
  var an=(function(el){return !el||el.classList.contains('hidden');});
  function goTen(label){var i=idoc.getElementById('name-input');i.value=label;
    i.dispatchEvent(new iw.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));}
  function sangCap(cap){var t=$$('#level-tabs .lv');if(t[cap-1])t[cap-1].click();}
  function go(key,gia){var el=idoc.getElementById('in-'+key);if(!el||el.disabled)return false;
    el.value=gia;el.dispatchEvent(new iw.Event('input',{bubbles:true}));return true;}
  function enter(key){var el=idoc.getElementById('in-'+key);if(!el||el.disabled)return false;
    el.dispatchEvent(new iw.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));return true;}
  function ans(key){var p=key.split('-');return String(iw.LEVELS[+p[1]].qs[+p[2]].ans);}
  function kho(){try{return iw.localStorage.getItem('${KHO}');}catch(e){return 'LOI-DOC';}}
  /* rut() trả VỀ OBJECT (hoặc null) chứ không phải chuỗi: step() đã tự JSON.stringify
     một lần, đưa chuỗi vào là dấu " bị thoát thành \\" và mọi regex kỳ vọng hỏng hết. */
  function rut(){var s=kho(); if(s===null||s==='LOI-DOC')return s; var o;
    try{o=JSON.parse(s);}catch(e){return 'LOI-PARSE';} if(!o)return null;
    return {banCau:o.banCau,key:o.key,cap:o.cap,nop:o.nop,
      attempts:Object.keys(o.attempts).length,attemptsKeys:Object.keys(o.attempts).sort().join(','),
      nhap:Object.keys(o.nhap||{}).sort().join(','),
      baoCao:o.baoCao?{correct:o.baoCao.correct,total:o.baoCao.total,stars:o.baoCao.stars,pct:o.baoCao.pct}:null};}
  function soNop(){return $$('button').filter(function(b){return b.textContent.trim()==='Nộp bài';}).length;}

  if (P==='draft') {
    goTen('ban mai');
    step('cay', an(idoc.getElementById('name-gate'))&&!an(idoc.getElementById('practice-wrap'))?'vo-bai':'CON-CONG');
    sangCap(1);
    var a0=idoc.getElementById('in-lvl-1-0'); a0.value=ans('lvl-1-0');
    a0.dispatchEvent(new iw.Event('input',{bubbles:true}));
    step('nhap-truoc-enter', Object.keys(iw.nhap).join(','));
    enter('lvl-1-0');
    step('enter-ghi', {disabled:!!idoc.querySelector('#in-lvl-1-0[disabled]'),
      nhapSau:Object.keys(iw.nhap).join(','), attempts:Object.keys(iw.runState.attempts).join(',')});
    go('lvl-1-1','x');                       /* để dở, KHÔNG bấm Enter */
    sangCap(2); go('lvl-2-0','7');           /* đổi cấp lúc đang gõ dở */
    step('kho', rut());
    step('posts', iw.__posts.length);
  }
  else if (P==='resume') {
    step('cong', an(idoc.getElementById('name-gate'))?'an':'HIEN');
    step('ten', idoc.getElementById('runner-name').textContent);
    step('trang', {curLevel:iw.curLevel, nhap:Object.keys(iw.nhap).sort().join(','),
      attempts:Object.keys(iw.runState.attempts).sort().join(',')});
    step('o-gio-do', {cap2:$('#level-tabs .lv.active').textContent,
      giaTri:(idoc.getElementById('in-lvl-2-0')||{value:'(khong co o)'}).value});
    sangCap(1);                               /* ô dở nằm ở cấp 1 ⇒ phải bấm sang mới thấy */
    step('o-cap-1', {giaTri1:(idoc.getElementById('in-lvl-1-1')||{value:'(khong co o)'}).value,
      daGhi:(idoc.querySelector('#in-lvl-1-0[disabled]')?'ung':'mo'),
      feedback:(idoc.querySelector('#fb-lvl-1-0 .okmsg')?'co':'(khong)')});
    step('line', (idoc.getElementById('progress-line').textContent||'').slice(0,190));
    step('posts', iw.__posts.length);
  }
  else if (P==='danh-nhap') {
    var so=0; ['lvl-1-1','lvl-2-0'].forEach(function(k){
      var p=k.split('-'); sangCap(+p[1]);
      var el=idoc.getElementById('in-'+k); if(el){el.value=ans(k);el.dispatchEvent(new iw.Event('input',{bubbles:true}));
        enter(k); so++;}});
    step('danh', {nhapCon:Object.keys(iw.nhap).length, attempts:Object.keys(iw.runState.attempts).length,
      daDanh:so});
    step('kho', rut());
    step('posts', iw.__posts.length);
  }
  else if (P==='mo-khong-go') {
    step('line', (idoc.getElementById('progress-line').textContent||'').slice(0,190));
    step('go-do', /gõ dở|đang gõ/.test(idoc.getElementById('progress-line').textContent||'')?'CON-THUA':'sach');
    step('posts', iw.__posts.length);
  }
  else if (P==='nop') {
    var keys=[]; [4,5,6,7].forEach(function(l){ iw.LEVELS[l].qs.forEach(function(q,i){keys.push('lvl-'+l+'-'+i);}); });
    var thieu=0;
    keys.forEach(function(k){ var p=k.split('-'); sangCap(+p[1]);
      if (!idoc.getElementById('in-'+k)) { return; }
      if (!go(k, ans(k))) { thieu++; return; }
      enter(k); });
    step('du-16', {tongKeys:keys.length, daGhi:Object.keys(iw.runState.attempts).length, thieu:thieu});
    step('nut-nop', soNop());
    var btn=$$('#submit-bar button').filter(function(b){return b.textContent.trim()==='Nộp bài';})[0];
    if (btn) btn.click(); else step('nut-nop','KHONG-CO-NUT');
    step('posts', iw.__posts.length);
    var p0=iw.__posts[0]||null;
    /* "rong" liệt kê TÊN CỘT có ô rỗng chứ không đếm số: máy trả lời đúng cả 16 câu nên cột
       "Câu sai" rỗng là ĐÚNG, còn một cột số bị rỗng mới là mất dòng trên Sheet. */
    step('post', p0?{action:p0.action.slice(0,58),target:p0.target,cs:p0.cs,n:p0.fields.length,
      rong:p0.fields.map(function(s){var i=s.indexOf('~');return s.slice(0,i)+'@'+(s.slice(i+1)===''?'RONG':'co');})
        .filter(function(s){return /@RONG$/.test(s);}).map(function(s){return s.split('@')[0];}).join(',')}:'khong-co');
    /* Cột phải đúng thứ tự ENTRY của trang: một cột sai tên là Form nhận mà Sheet không hiện,
       mất không báo hiệu. In đủ 9 tên cột để mắt đọc được, không chỉ đếm. */
    step('post-cot', p0?p0.fields.map(function(s){return s.split('~')[0];}).join(','):'khong-co');
    var ngayF=p0?p0.fields.filter(function(s){return /^entry\\.2047066992$/.test(s.split('~')[0]);})[0]:null;
    step('ngay', ngayF?ngayF.split('~')[1]:'(thieu-cot-ngay)');
    var pct=p0?p0.fields.filter(function(s){return s.indexOf('entry.553305782~')===0;})[0]:null;
    step('phanTram', pct?pct.split('~')[1]:'(khong co)');
    step('sau-nop', {submitBar:(idoc.getElementById('submit-bar').innerHTML||'').length, nut:soNop(),
      nop:rut().nop, baoCao:rut().baoCao});
  }
  else if (P==='after') {
    step('cong', an(idoc.getElementById('name-gate'))?'an':'HIEN');
    step('bao-cao', /report/.test(idoc.getElementById('report-wrap').innerHTML)?'hien-lai':'(trang)');
    step('status', (idoc.getElementById('send-status').textContent||'').slice(0,120));
    step('posts', iw.__posts.length);
    step('an', {tabs:an(idoc.getElementById('level-tabs')), quiz:an(idoc.getElementById('quiz-container'))});
    step('nut-nop', soNop());
    step('tuKiem', (idoc.getElementById('footer-stamp').textContent||'').slice(0,60));
    f.style.width='320px';
    setTimeout(function(){var de=idoc.documentElement;
      step('ngang-320',{sw:de.scrollWidth,cw:de.clientWidth,tran:de.scrollWidth>de.clientWidth+1?'TRAN':'ok'});
      done();},400);
    return;
  }
  else if (P==='doi-ban') {
    var db=idoc.getElementById('doi-ban');
    if (!db) { step('doi-ban','KHONG-CO-NUT-TU-BAO-CAO'); }
    else { db.click();
      step('doi-ban', {kho:rut(), cong:an(idoc.getElementById('name-gate'))?'an':'HIEN',
        baoCao:(idoc.getElementById('report-wrap').innerHTML||'').length,
        runState:String(iw.runState), submitted:String(iw.submitted),
        oTen:(idoc.getElementById('name-input').value||'').length, nhapGo:Object.keys(iw.nhap).length}); }
    step('posts', iw.__posts.length);
  }
  else if (P==='doi-sinh-vien') {
    goTen('ban mai'); sangCap(1); go('lvl-1-0','999');
    var tr=rut();
    step('mai', {key:tr.key, nhap:tr.nhap});
    var chip=$$('#roster-chips .chip').filter(function(b){return /Gia Linh/.test(b.textContent);})[0];
    chip.click();
    step('gia-linh', {kho:rut(),
      oTrong:$$('#quiz-container input').filter(function(e){return e.value!=='';}).length,
      ten:idoc.getElementById('runner-name').textContent, attempts:Object.keys(iw.runState.attempts).length});
    step('posts', iw.__posts.length);
  }
  else if (P==='sai-ten') {
    step('ban-dau', {kho:kho()===null?'trong':'CON', cong:an(idoc.getElementById('name-gate'))?'an':'HIEN'});
    goTen('Lan Hoang');
    step('lan-hoang', {err:(idoc.getElementById('gate-error').textContent||'').slice(0,60),
      cong:an(idoc.getElementById('name-gate'))?'an':'HIEN',
      practice:an(idoc.getElementById('practice-wrap'))?'an':'HIEN', kho:kho()===null?'trong':'CON'});
    step('posts', iw.__posts.length);
  }
  else { step('PHASE-LA', P); done(); return; }
  done();
}
f.src='index.html?'+P;
<\/script></body></html>`;

const driverFile = path.join(THUDIR, 'driver.html');
fs.writeFileSync(driverFile, DRIVER);

/* ---------------- BẢNG KỲ VỌNG ----------------
   Mỗi hàng đọc từ MỘT process Chrome riêng — cột "phase" in đúng thứ tự chạy. */
const DONG = [
  ['draft', 'cay', 'vo-bai', 'gõ tên + Enter là vào được bài (cổng tên ẩn, phần luyện hiện ra)'],
  ['draft', 'nhap-truoc-enter', 'lvl-1-0', 'gõ một ô thì nháp vào ngay, không đợi bấm Kiểm tra'],
  ['draft', 'enter-ghi', /"disabled":true,"nhapSau":"","attempts":"lvl-1-0"/, 'Enter ghi nhận câu + xoá nháp của câu đó (đúng một lần chấm)'],
  ['draft', 'kho', /"banCau":1,"key":"mai","cap":2,"nop":false,"attempts":1,"attemptsKeys":"lvl-1-0","nhap":"lvl-1-1,lvl-2-0"/, 'kho cất {banCau, key, cap, attempts, nhap} — đổi cấp lúc đang gõ KHÔNG mất nháp'],
  ['draft', 'posts', '0', 'chưa nộp thì không có POST nào'],
  ['resume', 'cong', 'an', 'mở lại là vào thẳng bài, em không phải ghi tên lại'],
  ['resume', 'ten', 'Ban Mai', 'đúng bạn đang làm dở'],
  ['resume', 'trang', /"curLevel":2,"nhap":"lvl-1-1,lvl-2-0","attempts":"lvl-1-0"/, 'dựng lại đúng cấp đang đứng + nháp + số đã ghi nhận'],
  ['resume', 'o-gio-do', /"cap2":"Cấp 2","giaTri":"7"/, 'đúng cấp em đang đứng khi bị văng ra + chữ số gõ dở hiện lại trong ô'],
  ['resume', 'o-cap-1', /"giaTri1":"x","daGhi":"ung","feedback":"co"/, 'về cấp 1: nháp "x" còn nguyên, câu đã ghi nhận vẫn bị khoá + lời giải thích dựng lại từ attempts'],
  ['resume', 'line', /giữ hộ em 1 câu đã ghi nhận và 2 câu em đang gõ dở/, 'dòng ↩ đếm theo attempts (cấp ôn không chấm cũng được tính) + nói đủ cả nháp'],
  ['resume', 'posts', '0', 'mở lại trang KHÔNG tự gửi'],
  ['danh-nhap', 'danh', /"nhapCon":0,"attempts":3,"daDanh":2/, 'Enter hai ô gõ dở ⇒ nháp sạch, attempts 3'],
  ['danh-nhap', 'kho', /"attempts":3,"attemptsKeys":"lvl-1-0,lvl-1-1,lvl-2-0","nhap":"","baoCao":null/, 'kho cất đúng 3 câu đã ghi nhận và nháp đã xoá sạch, chưa có báo cáo'],
  ['danh-nhap', 'posts', '0', 'ghi nhận từng câu không gửi gì cả'],
  ['mo-khong-go', 'go-do', 'sach', 'hết nháp thì dòng ↩ không còn thừa chữ "và … câu gõ dở"'],
  ['mo-khong-go', 'line', /giữ hộ em 3 câu đã ghi nhận\.$/, 'chỉ nói số câu đã ghi nhận khi không còn gì gõ dở'],
  ['mo-khong-go', 'posts', '0', 'mở lại lần hai vẫn im lặng'],
  ['nop', 'du-16', /"tongKeys":16,"daGhi":19,"thieu":0/, 'đủ 16 câu chấm (cộng 3 câu ôn đã ghi) — không câu nào thiếu ô'],
  ['nop', 'nut-nop', '1', 'làm đủ 16 câu chấm thì nút Nộp bài hiện ra'],
  ['nop', 'posts', '1', 'một lần bấm Nộp = đúng MỘT POST (đường goto: iframe ẩn, không request ra Google)'],
  ['nop', 'post', /"target":"th-gui","cs":"UTF-8","n":9,"rong":"entry\.1281776812"/, 'form ẩn POST, target iframe, _charset_ + 8 entry.* — ô rỗng duy nhất là cột "Câu sai" vì máy trả lời đúng cả 16 câu'],
  ['nop', 'post-cot', /^_charset_,entry\.1275828399,entry\.2047066992,entry\.553019836,entry\.2082998465,entry\.1687659485,entry\.1281776812,entry\.553305782,entry\.1915954631$/, 'đúng 9 cột mà Sheet của bài 2 thật sự có — sai một tên là Form nhận mà bảng điểm không hiện'],
  ['nop', 'ngay', /^\d\d\/\d\d\/\d\d\d\d \d\d:\d\d$/, 'ngày tự ghép dd/MM/yyyy HH:mm (không phải toLocaleString đảo thứ tự theo máy)'],
  ['nop', 'phanTram', /^\d+%$/, 'cột % có dấu %'],
  ['nop', 'sau-nop', /"submitBar":0,"nut":0,"nop":true,"baoCao":\{"correct":\d+,"total":16,"stars":[0-3],"pct":\d+\}/, 'sau khi nộp: submit-bar rỗng, không còn nút Nộp, kho đánh dấu nop:true + cất báo cáo'],
  ['after', 'cong', 'an', 'mở lại sau khi nộp: vào thẳng, không qua cổng'],
  ['after', 'bao-cao', 'hien-lai', 'báo cáo dựng lại từ kho, em thấy đúng kết quả của mình'],
  ['after', 'status', /đã nộp lúc \d\d\/\d\d\/\d\d\d\d \d\d:\d\d.*KHÔNG gửi lại lần nữa/, 'nói thẳng là mở lại sẽ KHÔNG gửi lần hai'],
  ['after', 'posts', '0', 'BẰNG CHỨNG QUAN TRỌNG NHẤT: mở lại trang sau khi nộp không gửi lại'],
  ['after', 'an', /"tabs":true,"quiz":true/, 'tab cấp + khung câu hỏi bị ẩn khi đang xem báo cáo'],
  ['after', 'nut-nop', '0', 'toàn trang 0 nút "Nộp bài" — hết đường bấm lần hai'],
  ['after', 'tuKiem', /28\/28 đáp số khớp/, 'selfTest() vẫn xanh trên bản có giữ bài dở'],
  ['after', 'ngang-320', /"tran":"ok"/, 'khổ 320px không tràn ngang'],
  ['doi-ban', 'doi-ban', /"kho":null,"cong":"HIEN","baoCao":0,"runState":"null","submitted":"false","oTen":0,"nhapGo":0/, 'Ghi tên bạn khác ⇒ kho SẠCH + về cổng + báo cáo cũ xoá sạch + ô tên trống (không cất rác của bạn trước)'],
  ['doi-ban', 'posts', '0', 'bấm "Ghi tên bạn khác" không gửi gì thêm'],
  ['doi-sinh-vien', 'mai', /"key":"mai","nhap":"lvl-1-0"/, 'Ban Mai gõ dở ⇒ nháp nằm trong kho của bạn Mai'],
  ['doi-sinh-vien', 'gia-linh', /"kho":\{"banCau":1,"key":"gia-linh","cap":1,"nop":false,"attempts":0,"attemptsKeys":"","nhap":"","baoCao":null\},"oTrong":0/, 'sang bạn khác ⇒ kho ghi đè bằng key mới, attempts 0, cap 1 và KHÔNG còn ô nào mang số của bạn trước'],
  ['doi-sinh-vien', 'posts', '0', 'đổi bạn không gửi gì'],
  ['sai-ten', 'ban-dau', /"kho":"trong","cong":"HIEN"/, 'vào phase với cổng tên sạch'],
  ['sai-ten', 'lan-hoang', /"err":"Tên chưa đúng.*"cong":"HIEN","practice":"an","kho":"trong"/, 'tên ngoài ROSTER ⇒ bị chặn, không vào bài, và KHÔNG cất nháp của người chưa được vào'],
  ['sai-ten', 'posts', '0', 'tên sai thì không có gì được gửi'],
];
/* Bảng kỳ vọng — mỗi hàng đọc từ MỘT process Chrome riêng, chạy theo đúng thứ tự PHASES. */

const PHASES = ['draft', 'resume', 'danh-nhap', 'mo-khong-go', 'nop', 'after', 'doi-ban', 'doi-sinh-vien', 'sai-ten'];
const gocLF = goc.replace(/\r\n/g, '\n');
function moPhases(list) {
  const kq = {};
  list.forEach(function (p) {
    const r = chrome(url(driverFile) + '?p=' + p, 16000);
    const m = r.dom.match(/<div id="out">([\s\S]*?)<\/div>/);
    const hang = m ? m[1].replace(/@KQ@ | @END@/g, '').split(' @|@ ') : [];
    const dat = {};
    hang.forEach(function (d) { const i = d.indexOf('='); dat[d.slice(0, i)] = d.slice(i + 1); });
    dat['__loiJS'] = String((r.loi.match(/Uncaught/g) || []).length);
    kq[p] = dat;
    console.log('  ' + p.padEnd(14) + ' → ' + Object.keys(dat).length + ' hàng đo' +
      (Object.keys(dat).length < 2 ? '  (DRIVER TREO / khong do duoc)' : ''));
  });
  return kq;
}
function danh(kq, p, ten) {
  const row = DONG.filter(function (d) { return d[0] === p && d[1] === ten; })[0];
  if (!row) throw new Error('Bảng kỳ vọng không có hàng ' + p + ' · ' + ten);
  const co = kq[p] ? kq[p][ten] : undefined;
  return co !== undefined && (typeof row[2] === 'string' ? co.indexOf(row[2]) >= 0 : row[2].test(co));
}
console.log('— 9 process Chrome riêng, chung một --user-data-dir (mỗi phase = một lần mở trang THẬT) —');
const ketqua = moPhases(PHASES);

let dat = 0, hong = [];
console.log('— KỲ VỌNG —');
DONG.forEach(function (d) {
  const [p, ten, mong, moTa] = d;
  const co = ketqua[p] ? ketqua[p][ten] : undefined;
  const ok = danh(ketqua, p, ten);
  if (ok) dat++; else { hong.push(p + ' · ' + ten); }
  console.log('  ' + (ok ? 'ĐẠT ✓ ' : 'HỎNG ✕') + ' [' + p + '] ' + ten.padEnd(13) + ' → ' +
    (co === undefined ? '(không đo được)' : (ok ? co.slice(0, 96) : co)) + (ok ? '' : '\n           mong: ' + mong + '  ·  ' + moTa));
});
let loiJS = 0;
PHASES.forEach(function (p) { if (ketqua[p] && ketqua[p].__loiJS !== '0') loiJS++; });
console.log('  ' + (loiJS ? 'LỖI ✕ ' : 'SẠCH ✓ ') + 'lỗi JS rơi ra stderr ở ' + loiJS + '/' + PHASES.length + ' phase');

/* ---------------- ĐỘT BIẾN ----------------
   Cửa chạy xanh một mình không chứng minh được gì: phải phá từng điều khoản giữ bài dở
   và xem cửa CÓ THẤY không. Mỗi hàng = một lỗi thật hay xảy ra (quên luuBai, quên xoá
   nháp, quên dựng lại nháp khi mở lại, quên cờ đã nộp, quên xoá kho khi đổi bạn).
   Prefix là chuỗi phase tối thiểu để đưa kho về đúng trạng thái hàng đó đo ⇒ chạy lại cả
   chuỗi từ đầu với profile sạch, vì localStorage là mạch nối. */
const DOT_BIEN = [
  ['M1 · gõ vào ô nhưng không cất nháp', ['draft'], "nhap[k] = el.value; luuBai();", 'nhap[k] = el.value;', 'draft', 'kho', false],
  ['M2 · ghi nhận câu rồi mà quên xoá nháp', ['draft'], 'delete nhap[k];', '', 'draft', 'enter-ghi', false],
  ['M3 · mở lại không dựng lại chỗ đang gõ dở', ['draft', 'resume'], 'nhap = o.nhap || {};', 'nhap = {};', 'resume', 'o-gio-do', false],
  ['M4 · mở lại quên là bài đã nộp', ['draft', 'nop', 'after'], 'submitted = !!o.nop;', '', 'after', 'bao-cao', false],
  ['M5 · "Ghi tên bạn khác" không xoá kho cũ', ['draft', 'nop', 'doi-ban'],
    "onclick = function () {\n    xoaBai();", 'onclick = function () {', 'doi-ban', 'doi-ban', false],
  ['ÂM TINH · chỉ đổi chữ trong lời khen, không đụng máy giữ bài', ['draft'], "<span>Chính xác! '", "<span>Đúng rồi! '", 'draft', 'kho', true],
];
let cay = 0, mutHong = [];
console.log('— ĐỘT BIẾN (5 lỗi cấy vào máy giữ bài phải bị bắt + 1 hàng âm tinh) —');
DOT_BIEN.forEach(function (d) {
  const [ten, prefix, neo, thay, p, hang, amTinh] = d;
  const so = gocLF.split(neo).length - 1;
  if (so !== 1) { mutHong.push(ten + ' (NEO CHET: khớp ' + so + ' lần)'); console.log('  HỎNG ✕ ' + ten + ' → neo khớp ' + so + ' lần'); return; }
  fs.writeFileSync(banSao, gocLF.replace(neo, thay));
  fs.rmSync(PROFILE, { recursive: true, force: true });
  const kq = moPhases(prefix);
  const treTre = !kq[p] || Object.keys(kq[p]).length < 2;
  const co = !treTre && danh(kq, p, hang);
  const ok = amTinh ? co : !co;
  if (ok) cay++; else mutHong.push(ten);
  console.log('  ' + (ok ? 'BẮT ĐƯỢC ✓ ' : 'TRƯỢT ✕    ') + ten + ' → hàng [' + p + ' · ' + hang + '] ' +
    (treTre ? 'DRIVER TREO' : (co ? 'vẫn ĐẠT' : 'đã HỎNG')) + (amTinh ? '  (mong: vẫn ĐẠT)' : '  (mong: HỎNG)'));
});
fs.writeFileSync(banSao, goc);
if (fs.readFileSync(banSao, 'utf8') !== goc) throw new Error('Không khôi phục được bản sạch trong thư mục đo');
console.log('  ' + (loiJS === 0 && mutHong.length === 0 ? 'SẠCH ✓ ' : 'LỖI ✕ ') + 'bản sạch đo lại khớp · file giao không bị đột biến chạm tới');
console.log('KẾT LUẬN: ' + dat + '/' + DONG.length + ' hàng đạt' +
  (hong.length ? ' · HỎNG: ' + hong.join(' | ') : '') + (loiJS ? ' · có lỗi JS' : '') +
  ' · đột biến ' + cay + '/' + DOT_BIEN.length + (mutHong.length ? ' · TRƯỢT: ' + mutHong.join(' | ') : ''));
process.exit(dat === DONG.length && loiJS === 0 && cay === DOT_BIEN.length ? 0 : 1);
