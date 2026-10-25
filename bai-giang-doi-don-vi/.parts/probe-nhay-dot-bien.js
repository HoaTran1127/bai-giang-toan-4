/* CỬA ĐỘT BIẾN cho MỤC 1 "VẼ TỪNG CÚ NHẢY" + sơ đồ bước nhảy của BÀI 2.
   Mỗi hàng CẤY MỘT lỗi vào bản sao trong thư mục tạm (không đụng file giao — bài này
   hay bị phiên khác ghi đè giữa vòng), rồi chạy lại probe-nhay.js bằng QC_SRC.
   Luật: lỗi thật ⇒ probe-nhay PHẢI CHÁY và cháy ĐÚNG luật ghi ở cột `luat`;
        hàng ÂM TINH (không đụng luật) ⇒ probe-nhay PHẢI CÒN XANH.
   Chạy: node bai-giang-doi-don-vi/.parts/probe-nhay-dot-bien.js
   Cửa này còn bắt cả "neo không còn trong nguồn" — sửa code mà quên sửa đột biến là báo liền. */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const D = require("./dung-chung.js");

const NGUON = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

const DOT = [
  { ten: "M1 cho phép nhảy tắt 2 cột", luat: "L2",
    neo: "    if (Math.abs(di) > 1) {", thay: "    if (false && Math.abs(di) > 1) {" },
  { ten: "M2 cho phép nhảy ngược hướng", luat: "L2",
    neo: "    if (di * huong() <= 0) {", thay: "    if (false && di * huong() <= 0) {" },
  { ten: "M3 số lẻ vẫn xoá được (lớp 4 chưa học)", luat: "L4",
    neo: "      if (!chu || !/^0+$/.test(chu)) {", thay: "      if (false) {" },
  { ten: "M4 diện tích chỉ thêm 1 chữ số 0", luat: "L3",
    neo: "  area: { title: '⬜ DIỆN TÍCH', units: AREA, slots: 2,",
    thay: "  area: { title: '⬜ DIỆN TÍCH', units: AREA, slots: 1," },
  { ten: "M5 không đánh dấu ô vừa xoá", luat: "L3",
    neo: "    else { ghiO(tu, ''); st.node.o[tu].classList.add('xoa'); }",
    thay: "    else { ghiO(tu, ''); }" },
  { ten: "M6 viết thêm 0 nhưng không làm nổi bật chữ số mới", luat: "L3",
    neo: "    if (huong() > 0) ghiO(den, zeros(slots), 'moi');",
    thay: "    if (huong() > 0) ghiO(den, zeros(slots));" },
  { ten: "M7 có chỗ sai vẫn báo XANH", luat: "L6",
    neo: "      st.node.dan.className = 'huong-dan sai';\n      st.node.dan.innerHTML = 'Em đổi xong",
    thay: "      st.node.dan.className = 'huong-dan';\n      st.node.dan.innerHTML = 'Em đổi xong" },
  { ten: "M8 thả số lệch cột vẫn được nhận", luat: "L5",
    neo: "      if (cot !== st.src) {", thay: "      if (false) {" },
  { ten: "M9 dải cung không được cấp chiều rộng từ đầu", luat: "L9",
    neo: "    baoRong(lo, st.node.tuan);\n    if (!st.datSo) return;",
    thay: "    if (!st.datSo) return;" },
  { ten: "M10 mất máy đọc màn hình", luat: "L10",
    neo: 'id="keo-tin" role="status" aria-live="polite"',
    thay: 'id="keo-tin" role="status"' },
  { ten: "M11 phản hồi câu không còn sơ đồ bước nhảy", luat: "L11",
    neo: "  if (!qq.parts || !qq.target) return '';", thay: "  return '';" },
  { ten: "M12 sơ đồ vẽ sai số cột (trừ 1 bậc)", luat: "L11",
    neo: "        n = Math.abs(L.den - L.tu), dem = 0,", thay: "        n = Math.max(0, Math.abs(L.den - L.tu) - 1), dem = 0," },
  { ten: "Âm tinh · chỉ đổi chữ câu cô khen, không đụng luật", luat: "", tinh: true,
    neo: "coNoi('m1-xong', 'Giỏi quá! '", thay: "coNoi('m1-xong', 'Chính xác! '" },
];

const probe = path.join(__dirname, "probe-nhay.js");
/* File giao xuống dòng CRLF, nguồn UTF-8 — neo chứa \n phải đổi thành \r\n mới khớp,
   không thì cửa báo "neo 0 lần" dù code vẫn còn nguyên. */
const ve = t => t.replace(/\r?\n/g, "\r\n");
let chet = 0;
DOT.forEach(function (x, i) {
  const neo = ve(x.neo), thay = ve(x.thay);
  const n = NGUON.split(neo).length - 1;
  if (n !== 1) {
    console.log("✕ " + x.ten + " — neo xuất hiện " + n + " lần (cần đúng 1): " + x.neo.slice(0, 56));
    chet++; return;
  }
  const file = path.join(D.TMP, "dot-" + process.pid + "-" + i + ".html");
  fs.writeFileSync(file, NGUON.replace(neo, thay), "utf8");
  const r = spawnSync(process.execPath, [probe], {
    env: Object.assign({}, process.env, { QC_SRC: file }), encoding: "utf8", maxBuffer: 1 << 26
  });
  const out = (r.stdout || "") + (r.stderr || "");
  const loi = (out.match(/• (.+)/g) || []).map(s => s.slice(2).trim());
  const chay = r.status !== 0;
  if (x.tinh) {
    if (chay) { console.log("✕ " + x.ten + " — hàng âm tinh mà probe CHÁY (probe phát nông)"); console.log("     " + loi.slice(0, 3).join("\n     ")); chet++; }
    else console.log("✓ " + x.ten + " → probe vẫn ĐẠT (đúng, không phát nông)");
    return;
  }
  if (!chay) { console.log("✕ " + x.ten + " → probe IM LẶNG ✕ (luật " + x.luat + " không được giữ)"); chet++; return; }
  const dung = loi.some(l => l.indexOf(x.luat + " ✗") === 0);
  console.log((dung ? "✓ " : "△ ") + x.ten + " → cháy " + loi.length + " luật" +
    (dung ? " · đúng luật " + x.luat : " · NHƯNG không phải " + x.luat + ": " + (loi[0] || "").slice(0, 70)));
  if (!dung) chet++;
});
console.log(chet ? "KẾT LUẬN: " + chet + "/" + DOT.length + " hàng đột biến KHÔNG đạt"
                 : "KẾT LUẬN: " + DOT.length + "/" + DOT.length + " hàng đạt — mọi luật Mục 1 đều có người giữ");
process.exit(chet ? 1 : 0);
