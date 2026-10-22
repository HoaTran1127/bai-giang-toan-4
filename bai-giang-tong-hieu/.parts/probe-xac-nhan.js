// PROBE ĐỘT BIẾN cho bậc phản hồi mới (cô chốt 22/10): tiếng tip mỗi thẻ · cô chỉ nói ở lần đầu
// của mỗi LOẠI Ô · lời khen chỉ ở mốc xong phần · hàng đợi giọng nói.
// Một luật tự kiểm chỉ có giá trị khi CÓ một cách phá làm nó hỏng thật. Probe này sửa ngay trong
// trang (định nghĩa lại hàm bằng eval), chạy tuKiem(), đòi đúng câu lỗi của luật đó, rồi phục hồi.
//   node bai-giang-tong-hieu/.parts/probe-xac-nhan.js
const D = require("./dung-chung.js");

const HAM = String.raw`function () {
  var CHU = {};            // nguồn gốc của từng hàm để phục hồi
  function nguon(ten) { if (!(ten in CHU)) CHU[ten] = String(window[ten]); return CHU[ten]; }
        function dat(ten, text) { (0, eval)('window.' + ten + ' = ' + text); }
        function phuc(ten) { dat(ten, nguon(ten)); }

  // [tên probe, hàm bị sửa, đoạn tìm (phải duy nhất), đoạn thay, câu lỗi luật phải báo]
  var don = [
    ['cau sai nuot hang doi loi day', 'coNoi',
     "if (loai === 'bad') { coPhat(khoa, chuSach, loai); return; }",
     "if (loai === 'bad') { coHangDai = []; coPhat(khoa, chuSach, loai); return; }",
     'nuốt lời dạy'],
    ['cau sai khong duoc coPhat noi ngay', 'coNoi',
     "if (loai === 'bad') { coPhat(khoa, chuSach, loai); return; }",
     "if (loai === 'bad') { return; }",
     'coPhat nói NGAY'],
    ['hang doi khong co nac tran', 'coNoi',
     'if (coHangDai.length < 5) coHangDai.push([khoa, chuSach, loai]);',
     'coHangDai.push([khoa, chuSach, loai]);',
     'nấc tràn'],
    ['cau ok cat ngang cau dang noi', 'coNoi',
     'var chuSach = coChuSach(chu);',
     'var chuSach = coChuSach(chu); coDungTieng();',
     'coNoi lại tự cắt'],
    ['hang doi khong bao gio rut', 'coRutHang',
     'var x = coHangDai.shift();',
     'var x = null;',
     'không bao giờ được phát'],
    ['tat tieng khong don hang doi', 'coDatTat',
     'if (CO_TAT) { coHangDai = []; coDungTieng(); }',
     'if (CO_TAT) { coDungTieng(); }',
     'coDatTat phải dọn coHangDai'],
    ['doi cap khong moi lai xac nhan', 'veDanhSach',
     '  daXacNhan = {};',
     '  ',
     'Đổi cấp phải mở lại'],
    ['khong danh dau da noi', 'thaDung',
     '    daXacNhan[nk] = 1;',
     '    ',
     'đánh dấu NGAY LÚC NHẬN LỜI'],
    ['the goi bang coNoiSau', 'thaDung',
     "coNoi(x[0], x[1], 'ok');",
     "coNoiSau(x[0], x[1], 'ok', 120);",
     'coNoiSau'],
    ['the dung khong co tieng tip', 'thaDung',
     "tipVang(nk === 'ten');",
     'void 0;',
     'quên tiếng tip'],
    ['co dung im khi be ghep dung', 'thaDung',
     "coDongTac('vui');",
     'void 0;',
     'cô phải CƯỜI bằng hình'],
    ['the dung lai khen tung the', 'thaDung',
     'var nk = loaiO(keo.loai, el);',
     'khenNgauNhien(); var nk = loaiO(keo.loai, el);',
     'thaDung lại khen từng thẻ'],
    ['tip khong ton trong nut tat', 'tipVang',
     '  if (CO_TAT) return;',
     '  ',
     'tôn trọng nút tắt tiếng'],
    ['tip dung file giong', 'tipVang',
     'var Lo = window.AudioContext || window.webkitAudioContext;',
     'var Lo = window.NewAudio;',
     'tự sinh âm bằng AudioContext'],
    ['co khong buon khi keo nham', 'coPhat',
     "coDongTac('buon');",
     'void 0;',
     'Cô chưa buồn'],
    ['moc khong khen', 'chucMungPhan',
     'var k = khenNgauNhien();',
     'var k = KHEN[0];',
     'Xong cả phần mà cô không nói lời khen'],
    ['loaiO gop dau vao voi ket qua', 'loaiO',
     "? l + '-dau-vao'",
     "? l",
     'phải ra loại "tong-dau-vao"'],
    ['loaiO tinh nham loai ten', 'loaiO',
     "if (l === 'ten') return 'ten';",
     "if (l === 'ten') return null;",
     'loaiO phải quy loại ngắn']
  ];

  var loi = [], goc = tuKiem();
  if ((goc.err || []).length) loi.push('baseline co ' + goc.err.length + ' loi: ' + goc.err[0]);

  var doDem = [];
  don.forEach(function (d) {
    var ten = d[0], fn = d[1], tim = d[2], thay = d[3], mongdoi = d[4];
    var s = nguon(fn);
    var so = s.split(tim).length - 1;
    doDem.push(ten + '=' + so + '/' + s.length);
    if (so !== 1) { loi.push(ten + ': doan tim xuat hien ' + so + ' lan trong ' + fn + ' (can 1)'); return; }
    dat(fn, s.replace(tim, thay));
    var err = tuKiem().err || [];
    phuc(fn);
    if (String(window[fn]) !== CHU[fn]) loi.push(ten + ': phuc hoi "' + fn + '" khong ve dung nguon goc');
    var co = err.filter(function (e) { return e.indexOf(mongdoi) >= 0; });
    if (!co.length) loi.push(ten + ': PHA "' + fn + '" ma tuKiem van im — luat khong co rang');
  });

  // BẢNG XÁC NHẬN: sửa trực tiếp đối tượng (luật đọc nội dung sống của XAC_NHAN).
  // Lúc phục hồi phải gán lại BẢN SAO, không gán tham chiếu trong xn — nếu gán tham chiếu thì
  // đột biến kế tiếp sửa luôn mảng gốc và làm hỏng bản sao (đo thật 22/10: 4 câu lỗi còn sót).
  var xn = JSON.parse(JSON.stringify(XAC_NHAN));
  function phucXN() {
    Object.keys(XAC_NHAN).forEach(function (k) { delete XAC_NHAN[k]; });
    Object.keys(xn).forEach(function (k) { XAC_NHAN[k] = [xn[k][0], xn[k][1]]; });
  }
  var bang = [
    ['loi xac nhan la loi khen', function () { XAC_NHAN.tong[1] = 'Đúng rồi, chuẩn rồi em!'; }, 'vẫn là lời khen trừu tượng'],
    ['loi xac nhan dai', function () { XAC_NHAN.ten[1] = 'Đây là tên của mỗi thanh vẽ trên sơ đồ đoạn thẳng mà em vừa ghép vào đầu thanh.'; }, 'quá dài'],
    ['thieu loi xac nhan cho mot loai o', function () { delete XAC_NHAN.hieu; }, 'Thiếu câu xác nhận cho loại ô'],
    ['hai loai o trung khoa tieng', function () { XAC_NHAN.hieu[0] = XAC_NHAN.tong[0]; }, 'dùng trùng khoá tiếng'],
    ['hai loai o trung chu', function () { XAC_NHAN.hieu[1] = XAC_NHAN.tong[1]; }, 'cùng một chữ'],
    ['khoa khong co trong CO_FILE', function () { XAC_NHAN.ten[0] = 'khong-ton-tai-abc'; }, 'không có trong CO_FILE']
  ];
  bang.forEach(function (b) {
    b[1]();
    var err = (tuKiem().err || []).filter(function (e) { return e.indexOf(b[2]) >= 0; });
    phucXN();
    if (!err.length) loi.push(b[0] + ': SUA BANG XAC NHAN ma tuKiem van im — luat khong co rang');
  });

  var cuoi = tuKiem();
  if ((cuoi.err || []).length) loi.push('phuc hoi xong van con loi: ' + cuoi.err[0]);
  return { soLuaChon: don.length + bang.length, loi: loi, n: cuoi.n, err: cuoi.err, dem: doDem };
}`;

const u = D.trang_probe("probe-xac-nhan.html", D.do_probe(HAM, 900));
const r = D.ket_qua(D.dump(u, 60000));
console.log("số mục tự kiểm = " + r.n + " · số đột biến đã thử = " + r.soLuaChon);
(r.err || []).forEach(l => console.log("  ✕ trang báo: " + l));
r.loi.forEach(l => console.log("  X " + l));
console.log("dem: " + r.dem.join(" · "));
console.log(r.loi.length ? "=== PROBE FIND LOI (" + r.loi.length + ") ===" : "=== MOI LUAT DEU CO RANG ===");
process.exitCode = r.loi.length ? 1 : 0;
