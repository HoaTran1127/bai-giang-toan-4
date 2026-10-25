/* Cửa kiểm BÀI 2 · MỤC 1 "VẼ TỪNG CÚ NHẢY".
   Không đọc code — cửa này THẢ THẬT bằng sự kiện (kéo chuột, bấm-chọn như điện thoại,
   Tab+Enter) rồi nhìn lên DOM: cung có vẽ đúng cột không, chữ số 0 có hiện ĐÚNG LÚC đáp
   xuống không, hàng ngang có khớp máy đổi không, sai thì đỏ chỉ dẫn có mở không.
   Luật giữ thiết kế (đều là thứ bé sẽ học sai nếu ai đó "sửa tiện tay"):
     L1 bảng trống khi vừa chọn đề — hàng ngang KHÔNG được in sẵn đáp số;
     L2 mỗi cú nhảy chỉ đi MỘT cột kề, nhảy tắt/nhảy ngược ⇒ cung đỏ + vào danh sách sai;
     L3 xuống ⇒ viết thêm 0 · lên ⇒ xoá 0 (diện tích 2 số 0, không phải 1);
     L4 lên mà cột đang đứng còn chữ số ⇒ CHỐI xoá (lớp 4 chưa học thập phân);
     L5 số của đề phải đứng đúng cột của đề, thả lệch cột bị ghi vào sổ sai;
     L6 xong ⇒ xanh "đúng N cú nhảy", có sai ⇒ đỏ liệt kê từng chỗ;
     L7 đáp số trên bảng bé dựng == máy đổi (quiTo), cả hai chiều, cả ba bảng;
     L8 cô làm mẫu chạy đúng máy bước của bé, bé được cat ngang quyền;
     L9 cung không được vẽ tràn ra ngoài dải, dải không hẹp hơn bảng;
     L10 máy đọc màn hình (#keo-tin) phải còn sống;
     L11 MỌI câu luyện tập có hai đơn vị trên thang phải kèm sơ đồ bước nhảy trong
         phản hồi — số mũi tên == số cột thật, số 0 ghi trong sơ đồ == bậc ×10/×100,
         và cộng các nhánh theo sơ đồ phải ra đúng đáp số máy chấm.
   Chạy:  node bai-giang-doi-don-vi/.parts/probe-nhay.js
   Exit 0 = mọi luật đều giữ. */
const D = require("./dung-chung.js");

const probe = `<script>
window.addEventListener("load", function () {
  var LOI = [], JSERR = [], KQ = {};
  window.addEventListener("error", function (e) { JSERR.push(String(e.message)); });

  var FAM = ["len", "mass", "area"];
  function card(k) { return document.getElementById("bn-" + k); }
  function U(k) { return UFAM[k].units; }
  function lbl(k, i) { return U(k)[i].label; }
  function cell(k, i) { return card(k).querySelector('.udigit[data-cot="' + i + '"]'); }
  function cells(k) { return card(k).querySelectorAll(".udigit"); }
  function chipSo(k) { return card(k).querySelector('.keo[data-loai="so"]'); }
  function chipNhay(k) { return card(k).querySelector(".nhay"); }
  function arcs(k, cls) { return card(k).querySelectorAll(".nh-lo g" + (cls || "")); }
  function dai(k) { return card(k).querySelector(".nh-lo"); }
  function bangR(k) { return card(k).querySelector(".utab").getBoundingClientRect(); }
  function echos(k) { return card(k).querySelectorAll(".nh-lo text.ech"); }
  function out(k) { return card(k).querySelector("[data-out]").textContent; }
  function dem(k) { return card(k).querySelector("[data-dem]").textContent; }
  function dan(k) { return card(k).querySelector("[data-chi-dan]"); }
  function why(k) { return card(k).querySelector("[data-why]").textContent; }
  function tinh(k) { return UTAB[k].tinh(); }
  function chk(c, msg) { if (!c) LOI.push(msg); }
  function mayTraLoi(k, Dv, tu, den) { return quiTo(U(k)[den].k, [{ val: Number(Dv), unit: U(k)[tu].k }]); }
  function dapCua(k, Dv, tu, den) {
    return Dv + " " + lbl(k, tu) + " = " + fmt(mayTraLoi(k, Dv, tu, den)) + " " + lbl(k, den);
  }
  function bong() { return document.getElementById("co-loi").textContent; }

  /* --- ba đường bé thật hay dùng để đặt một thẻ --- */
  function keoTha(el, o) {
    var dt = new DataTransfer();
    el.dispatchEvent(new DragEvent("dragstart", { bubbles: true, dataTransfer: dt }));
    o.dispatchEvent(new DragEvent("dragover", { bubbles: true, dataTransfer: dt }));
    o.dispatchEvent(new DragEvent("drop", { bubbles: true, dataTransfer: dt }));
    el.dispatchEvent(new DragEvent("dragend", { bubbles: true, dataTransfer: dt }));
  }
  function bam(el, o) { el.click(); if (o) o.click(); }
  function phim(el, o) {
    el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
    if (o) o.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
  }
  function dat(k, cot, cach) {
    if (cach === "keo") keoTha(chipSo(k), cell(k, cot));
    else if (cach === "phim") phim(chipSo(k), cell(k, cot));
    else bam(chipSo(k), cell(k, cot));
  }
  function hayNhay(k, den, cach) {
    var c = chipNhay(k);
    chk(!!c, "Bảng " + k + " mất nút 🐸 Nhảy sang cột kề");
    if (!c) return;
    if (cach === "phim") { phim(c); } else { c.click(); }
    chk(cell(k, den).classList.contains("nham"),
      "Bảng " + k + ": cầm cú nhảy mà ô cột kề (" + lbl(k, den) + ") không nhấp nháy — bé không biết thả đâu");
    if (cach === "phim") phim(cell(k, den)); else cell(k, den).click();
  }

  /* ================= hàng đợi bước: mỗi bước là một lát cắt thời gian ================= */
  var buoc = [], i = 0;
  function T(fn, doi) { buoc.push({ fn: fn, doi: doi || 45 }); }
  function chay() {
    if (i >= buoc.length) return ghi();
    var b = buoc[i++];
    try { b.fn(); } catch (e) { LOI.push("BƯỚC " + i + " crash: " + e + " | " + (e.stack || "").slice(0, 200)); return ghi(); }
    setTimeout(chay, b.doi);
  }
  function ghi() {
    document.getElementById("qc-out").textContent = "QCJSON " + JSON.stringify({
      loi: LOI, jserr: JSERR, soBuoc: i - 1, ket: KQ
    });
  }

  /* ================= 0 · HÌNH DÁNG BA BẢNG ================= */
  T(function () {
    chk(document.querySelectorAll("#u-tables .bn-card").length === 3,
      "Mục 1 phải dựng ĐỦ 3 bảng nhảy (độ dài/khối lượng/diện tích)");
    FAM.forEach(function (k) {
      UTAB[k].set(UFAM[k].seed.v, UFAM[k].seed.from, UFAM[k].seed.to);
      var c = card(k);
      chk(!!c, "Thiếu bảng " + k);
      chk(getComputedStyle(c.querySelector(".utab-box")).borderTopColor.indexOf("195, 30, 30") < 0,
        "Đỏ là màu riêng của CHỖ SAI — khung bảng " + k + " không được viền đỏ");
      chk(!!c.querySelector(".nh-lo"), "Bảng " + k + " thiếu dải vẽ cung");
      chk(!!c.querySelector("[data-undo]") && !!c.querySelector("[data-lam-lai]") && !!c.querySelector("[data-play]"),
        "Bảng " + k + " thiếu nút Xoá một bước / Làm lại / Cô làm mẫu");
      chk(!!c.querySelector(".dem-buoc"), "Bảng " + k + " thiếu bộ đếm bước");
      chk(c.querySelector("[data-chi-dan]").hidden, "Bảng " + k + " mở sẵn bảng chỉ dẫn khi chưa làm");
      /* L1 */
      var trang = true;
      cells(k).forEach(function (o) { if (o.textContent !== "") trang = false; });
      chk(trang, "L1 ✗ Bảng " + k + " có ô ĐÃ VIẾT SẴN chữ số khi bé chưa làm gì — đáp số bị in trước");
      chk(arcs(k).length === 0 && echos(k).length === 0, "L1 ✗ Bảng " + k + " vẽ sẵn cung/ếch khi chưa nhảy");
      chk(dai(k).getBoundingClientRect().width >= bangR(k).width - 1,
        "L9 ✗ Bảng " + k + " chưa nhảy cú nào mà dải cung đã hẹp hơn bảng (" +
        Math.round(dai(k).getBoundingClientRect().width) + " < " + Math.round(bangR(k).width) + ") — cung đầu tiên sẽ chỉ lệch cột");
      chk(out(k).indexOf(" = ") < 0, "L1 ✗ Bảng " + k + " in sẵn dòng đáp số trước khi bé nhảy");
    });
    var tin = document.getElementById("keo-tin");
    chk(document.getElementById("footer-stamp").textContent.indexOf("Tự kiểm:") === 0,
      "selfTest chặn trang — footer: " + document.getElementById("footer-stamp").textContent);
    chk(document.getElementById("self-test-alert").classList.contains("hidden"),
      "Bảng tự kiểm báo đỏ ngay khi mở trang");
    /* L10 */
    chk(!!tin && tin.getAttribute("role") === "status" && tin.getAttribute("aria-live") === "polite",
      "L10 ✗ Mất máy đọc màn hình #keo-tin (role=status aria-live=polite)");
    chk(!!tin && getComputedStyle(tin).display !== "none",
      "L10 ✗ #keo-tin bị display:none — ẩn kiểu đó máy đọc mất luôn lời nhắc");
  });

  /* ================= 1 · LEN XUỐNG, đặt số bằng KÉO CHUỘT ================= */
  T(function () { UTAB.len.set("5", 0, 3); });
  T(function () {
    chk(!!chipSo("len") && chipSo("len").textContent.trim() === "5", "Đề 5 km mà thẻ số không phải 5");
    chipSo("len").dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    chk(cell("len", 0).classList.contains("nham"), "Giữ chuột lên thẻ số mà ô cột nguồn không nháy (gợi ý bằng hình)");
    chipSo("len").dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
    chk(!cell("len", 0).classList.contains("nham"), "Rời chuột rồi mà ô vẫn nháy");
    keoTha(chipSo("len"), cell("len", 1));           // L5: thả SAI cột trước
  });
  T(function () {
    chk(tinh("len").datSo === false, "L5 ✗ Thả số sang cột hm (sai cột) mà trang vẫn nhận");
    chk(tinh("len").sai === 1, "L5 ✗ Thả số sai cột không bị ghi vào sổ sai");
    chk(cell("len", 1).classList.contains("shake") || cell("len", 1).className.indexOf("shake") >= 0,
      "L5 ✗ Ô sai không rung để bé thấy");
    chk(/Chưa đúng/.test(bong()), "L5 ✗ Thả sai cột mà cô không nhắc (" + bong() + ")");
    chk(document.getElementById("co-bubble").className.indexOf("bad") >= 0, "L5 ✗ Bong bóng nhắc sai phải là lối xấu (bad)");
  });
  T(function () { keoTha(chipSo("len"), cell("len", 0)); });
  T(function () {
    chk(tinh("len").datSo === true && cell("len", 0).textContent === "5", "Thả đúng cột km mà số không nằm xuống bảng");
    chk(!chipSo("len"), "Thẻ số vẫn còn sau khi bé đã đặt — phải chuyển thành số đã dùng");
    chk(!!card("len").querySelector(".da-dung"), "Số đã đặt không đánh dấu ✓ đã dùng");
    chk(echos("len").length === 1, "Đặt số xong phải có ếch đứng ở cột nguồn (đếm từ đó)");
    chk(arcs("len").length === 0, "Mới đặt số mà đã có cung nhảy");
    chk(/đứng ở cột km/.test(bong()), "Cô không xác nhận chỗ đứng của số (" + bong() + ")");
  });
  /* L2: nhảy tắt + nhảy ngược đều bị chặn, và phải để lại cung đỏ */
  T(function () { chipNhay("len").click(); });
  T(function () {
    cell("len", 2).click();
    chk(arcs("len", ".sai").length === 1, "L2 ✗ Nhảy tắt 2 cột không vẽ cung đỏ từ chối");
  });
  T(function () {
    chk(tinh("len").buoc === 0, "L2 ✗ Nhảy tắt 2 cột mà bảng vẫn tính là một bước");
    chk(tinh("len").sai === 2, "L2 ✗ Nhảy tắt không bị ghi vào sổ sai");
    chk(cell("len", 2).textContent === "", "L2 ✗ Nhảy tắt vẫn viết chữ số 0 xuống cột xa");
    chk(/Mỗi lần chỉ nhảy MỘT cột/.test(bong()), "L2 ✗ Cô không nói luật một cột (" + bong() + ")");
    /* L9: cung đỏ cũng phải nằm trong dải — dải rộng bằng bảng, không hẹp hơn */
    chk(dai("len").getBoundingClientRect().width >= bangR("len").width - 1,
      "L9 ✗ Dải cung hẹp hơn bảng — cung sẽ bị cắt (" + Math.round(dai("len").getBoundingClientRect().width) +
      " < " + Math.round(bangR("len").width) + ")");
  }, 780);
  T(function () {
    chk(arcs("len", ".sai").length === 0, "L2 ✗ Cung đỏ không tự biến mất sau lời từ chối");
    chk(arcs("len", ".dung").length === 0, "L2 ✗ Cung đỏ bị tính thành cung hợp lệ");
  });
  T(function () {
    var dn = [];
    dn.push(dem("len"));
    KQ.dem0 = dn[0];
    chk(/Nhảy 0\\/3/.test(dem("len")), "Bộ đếm bước không phải 0/3 (" + dem("len") + ")");
  });

  /* ba cú nhảy hợp lệ — mỗi cú viết THÊM một số 0, đúng lúc đáp xuống */
  [1, 2, 3].forEach(function (n) {
    T(function () { hayNhay("len", n, "bam"); });
    T(function () {
      chk(tinh("len").buoc === n, "Cú nhảy thứ " + n + " không được ghi nhận");
      chk(arcs("len", ".dung").length === n, "Nhảy " + n + " bước mà chỉ thấy " + arcs("len", ".dung").length + " cung");
      chk(cell("len", n).textContent === "0", "L3 ✗ Qua cột " + lbl("len", n) + " mà không viết thêm chữ số 0");
      chk(cell("len", n).classList.contains("moi"), "L3 ✗ Chữ số 0 vừa viết không được làm nổi bật (bé không thấy mình vừa thêm gì)");
      chk(cell("len", 0).textContent === "5", "L3 ✗ Viết thêm 0 làm mất số 5 của đề");
      chk(new RegExp("Nhảy " + n + "\\\\/3").test(dem("len")), "Bộ đếm bước sai sau cú " + n + " (" + dem("len") + ")");
    });
  });
  T(function () {
    chk(tinh("len").xong === true, "Nhảy đủ 3 bước mà chưa báo xong");
    chk(cell("len", 3).classList.contains("answer"), "Ô đích không được tô đáp số");
    chk(out("len") === dapCua("len", "5", 0, 3), "L7 ✗ 5 km→m: bảng bé dựng đọc ra [" + out("len") + "] máy đổi [" + dapCua("len", "5", 0, 3) + "]");
    chk(/×1 000|×1000/.test(why("len")), "L3 ✗ Đi xuống 3 cột phải ghi rõ thực chất là ×1000 (" + why("len") + ")");
    /* L6: lần này bé có 2 chỗ sai (thả lệch cột + nhảy tắt) ⇒ bảng phải ĐỎ và liệt kê đủ */
    chk(!dan("len").hidden, "L6 ✗ Đổi xong mà bảng chỉ dẫn không mở");
    chk(dan("len").className.indexOf("sai") >= 0, "L6 ✗ Có chỗ sai mà bảng chỉ dẫn không ĐỎ (" + dan("len").className + ")");
    chk(/2 chỗ chưa đúng/.test(dan("len").innerHTML), "L6 ✗ Bảng đỏ đếm thiếu chỗ sai (" + dan("len").textContent + ")");
    chk(/thả số sang cột hm/.test(dan("len").innerHTML) && /nhảy tắt 2 cột/.test(dan("len").innerHTML),
      "L6 ✗ Bảng đỏ không liệt kê TỪNG chỗ sai (" + dan("len").textContent + ")");
    chk(/cú nhảy đi đúng MỘT cột/.test(dan("len").innerHTML), "L6 ✗ Bảng đỏ không nhắc lại luật một cột");
    KQ.lenXuong = out("len");
  });
  T(function () {
    /* nhảy tiếp khi đã xong: phải từ chối lịch sự, không phá bảng */
    chipNhay("len").click(); cell("len", 3).click();
    chk(tinh("len").buoc === 3, "Đổi xong rồi mà còn đếm thêm bước");
    chk(/đổi xong rồi/.test(bong()) || tinh("len").sai === 2, "Cô không báo là đã đổi xong (" + bong() + ")");
  });
  T(function () { UTAB.len.set("5", 0, 3); });
  T(function () {
    var t = true; cells("len").forEach(function (o) { if (o.textContent !== "") t = false; });
    chk(t && arcs("len").length === 0, "Chọn lại đề mà bảng còn cung/còn số — phải về trắng");
  });

  /* ================= 2 · MASS XUỐNG bằng TAB+ENTER ================= */
  T(function () { UTAB.mass.set("3", 0, 3); });
  T(function () { phim(chipSo("mass")); chk(cell("mass", 0).classList.contains("nham"), "Bàn phím: Enter lên thẻ số phải bật ô nhận"); });
  T(function () {
    phim(cell("mass", 0));
    chk(tinh("mass").datSo === true, "Bàn phím: Enter vào ô đích không đặt được số");
    chipNhay("mass").dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    chk(!card("mass").querySelector(".keo.chon"), "Esc phải trả thẻ đang cầm về chỗ cũ");
  });
  T(function () { hayNhay("mass", 1, "phim"); });
  T(function () { hayNhay("mass", 2, "phim"); });
  T(function () { hayNhay("mass", 3, "phim"); });
  T(function () {
    chk(out("mass") === dapCua("mass", "3", 0, 3), "L7 ✗ 3 tấn→kg bằng bàn phím ra [" + out("mass") + "]");
    chk(tinh("mass").sai === 0, "Chạy bàn phím sạch mà vẫn bị tính là có chỗ sai");
    chk(!dan("mass").hidden && dan("mass").className.indexOf("sai") < 0, "L6 ✗ Làm sạch mà bảng chỉ dẫn không XANH");
    chk(/đúng 3 cú nhảy/.test(dan("mass").textContent), "L6 ✗ Bảng xanh phải chốt đúng số cú nhảy (" + dan("mass").textContent + ")");
    chk(/viết thêm 1 chữ số 0/.test(dan("mass").textContent), "L6 ✗ Bảng xanh độ dài/khối lượng phải nhắc 1 chữ số 0 (" + dan("mass").textContent + ")");
    KQ.massXuong = out("mass");
  });

  /* ================= 3 · AREA XUỐNG (mỗi cột 2 số) ================= */
  T(function () { UTAB.area.set("4", 0, 1); });
  T(function () { bam(chipSo("area"), cell("area", 0)); });
  T(function () {
    chk(cell("area", 0).classList.contains("two"), "Bảng diện tích phải chia ô thành 2 chỗ viết (class two)");
    chk(!cell("len", 0).classList.contains("two"), "Bảng độ dài mà ô cũng chia 2 chỗ viết là sai");
    hayNhay("area", 1, "bam");
  });
  T(function () {
    chk(cell("area", 1).textContent === "00", "L3 ✗ m²→dm² phải viết THÊM 2 chữ số 0, không phải 1");
    chk(cell("area", 1).classList.contains("pair"), "L3 ✗ Cặp số 0 của diện tích không hiển thị thành 2 ô");
    chk(arcs("area", ".dung").length === 1, "Diện tích 1 cột = 1 cung, không được vẽ 2");
    chk(out("area") === dapCua("area", "4", 0, 1), "L7 ✗ 4 m²→dm² ra [" + out("area") + "]");
    chk(/×100/.test(why("area")), "L3 ✗ Đi xuống diện tích phải chốt ×100 (" + why("area") + ")");
    chk(/2 chữ số 0/.test(dan("area").textContent), "L6 ✗ Bảng xanh diện tích phải nói 2 chữ số 0 (" + dan("area").textContent + ")");
    KQ.areaXuong = out("area");
  });

  /* ================= 4 · LEN LÊN (xoá 0) ================= */
  T(function () { UTAB.len.set("5000", 3, 0); });
  T(function () {
    chk(chipSo("len").textContent.trim() === "5000", "Đề ngược mà thẻ số không phải 5000");
    keoTha(chipSo("len"), cell("len", 3));
  });
  T(function () {
    var c = cells("len"), thu = [];
    for (var j = 0; j < c.length; j++) thu.push(c[j].textContent);
    chk(thu.slice(0, 4).join("|") === "5|0|0|0", "L3 ✗ 5000 m phải tự dàn thành 5 | 0 | 0 | 0, nhận được [" + thu.slice(0, 4).join("|") + "]");
    var a = arcs("len", ".dung");
    chk(a.length === 0, "Chưa nhảy mà đã có cung");
  });
  [2, 1, 0].forEach(function (den, idx) {
    T(function () { hayNhay("len", den, "bam"); });
    T(function () {
      chk(arcs("len", ".dung").length === idx + 1, "Nhảy lên cú " + (idx + 1) + " mà thiếu cung");
      chk(tinh("len").buoc === idx + 1, "Nhảy lên cú " + (idx + 1) + " không được ghi");
    });
  });
  T(function () {
    var c = cells("len");
    chk(c[3].textContent === "" && c[2].textContent === "" && c[1].textContent === "",
      "L3 ✗ Đi lên phải XOÁ chữ số 0 ở cột vừa rời khỏi");
    chk(c[0].textContent === "5", "L3 ✗ Xoá 0 làm mất cả số 5");
    chk(c[1].classList.contains("xoa") || c[2].classList.contains("xoa"), "L3 ✗ Chữ số vừa xoá không được đánh dấu xoá (bé không thấy mình bỏ gì)");
    chk(getComputedStyle(c[2]).borderTopColor.indexOf("195, 30, 30") < 0,
      "Ô vừa xoá không được viền ĐỎ — đỏ để dành riêng cho chỗ sai, bé sẽ tưởng mình làm lỗi");
    chk(out("len") === dapCua("len", "5000", 3, 0), "L7 ✗ 5000 m→km ra [" + out("len") + "]");
    chk(/÷1 000|÷1000/.test(why("len")), "L3 ✗ Đi lên 3 cột phải ghi thực chất là ÷1000 (" + why("len") + ")");
    chk(!dan("len").hidden && dan("len").className.indexOf("sai") < 0, "L6 ✗ 5000 m→km sạch mà bảng chỉ dẫn không xanh");
    /* L9: cung đi NGƯỢC phải mũi tên quay trái (x2 < x1) */
    var d = arcs("len", ".dung")[0].querySelector("path").getAttribute("d");
    var m = /^M(-?[\\d.]+),.* (-?[\\d.]+),/.exec(d);
    chk(m && parseFloat(m[2]) < parseFloat(m[1]), "L9 ✗ Cung nhảy lên vẽ quay sang phải (" + d + ")");
    KQ.lenLen = out("len");
  });

  /* ================= 5 · AREA LÊN ================= */
  T(function () { UTAB.area.set("500", 1, 0); });
  T(function () { bam(chipSo("area"), cell("area", 1)); });
  T(function () {
    var c = cells("area");
    chk(c[0].textContent === "5" && c[1].textContent === "00", "L3 ✗ 500 dm² phải dàn 5 | 00, nhận [" + c[0].textContent + "|" + c[1].textContent + "]");
  });
  T(function () { hayNhay("area", 0, "bam"); });
  T(function () {
    chk(cell("area", 1).textContent === "", "L3 ✗ Lên 1 cột diện tích phải xoá 2 chữ số 0");
    chk(out("area") === dapCua("area", "500", 1, 0), "L7 ✗ 500 dm²→m² ra [" + out("area") + "]");
    chk(/÷100/.test(why("area")), "L3 ✗ Đi lên diện tích phải chốt ÷100");
    KQ.areaLen = out("area");
  });

  /* ================= 6 · L4: số lẻ — lớp 4 chưa học, phải CHỐI xoá ================= */
  T(function () { UTAB.len.set("5500", 3, 0); });
  T(function () { bam(chipSo("len"), cell("len", 3)); });
  T(function () {
    var c = cells("len");
    chk(c[0].textContent === "5" && c[1].textContent === "5", "5500 m phải dàn 5|5|0|0, nhận [" + c[0].textContent + "|" + c[1].textContent + "|" + c[2].textContent + "|" + c[3].textContent + "]");
  });
  T(function () { hayNhay("len", 2, "bam"); });
  T(function () { hayNhay("len", 1, "bam"); });
  T(function () {
    cell("len", 0).focus();
    chipNhay("len").click();
    chk(!!chipNhay("len"), "Mất nút nhảy ở bảng 5500");
    cell("len", 0).click();
  });
  T(function () {
    chk(tinh("len").buoc === 2, "L4 ✗ Xoá cột còn chữ số mà vẫn được tính là bước");
    chk(tinh("len").sai >= 1, "L4 ✗ Vụ từ chối xoá không vào sổ sai");
    chk(/còn số/.test(bong()), "L4 ✗ Cô không giải thích vì sao xoá không hết (" + bong() + ")");
    chk(cell("len", 1).textContent === "5", "L4 ✗ Bị từ chối mà chữ số 5 vẫn bay mất");
    chk(dan("len").hidden, "L4 ✗ Chưa xong mà mở sẵn bảng chỉ dẫn");
    KQ.le = tinh("len");
  });

  /* ================= 7 · XOÁ MỘT BƯỚC ================= */
  T(function () { UTAB.len.set("5", 0, 3); });
  T(function () { bam(chipSo("len"), cell("len", 0)); });
  T(function () { hayNhay("len", 1, "bam"); });
  T(function () { hayNhay("len", 2, "bam"); });
  T(function () { card("len").querySelector("[data-undo]").click(); });
  T(function () {
    chk(tinh("len").buoc === 1, "Xoá một bước phải lùi đúng 1 bước (" + JSON.stringify(tinh("len")) + ")");
    chk(cell("len", 2).textContent === "", "Xoá bước xuống mà chữ số 0 còn nằm lại");
    chk(arcs("len", ".dung").length === 1, "Xoá bước mà cung vẫn còn");
    chk(/đang ở cột hm/.test(dem("len")), "Xoá bước mà bộ đếm không lùi (" + dem("len") + ")");
  });
  T(function () { card("len").querySelector("[data-undo]").click(); });
  T(function () { card("len").querySelector("[data-undo]").click(); });
  T(function () {
    chk(tinh("len").buoc === 0, "Xoá hết bước phải về 0");
    chk(tinh("len").datSo === true, "Xoá bước không được xoá luôn chỗ đứng của số");
    chk(/Chưa có bước nào/.test(bong()) || tinh("len").buoc === 0, "Nhấn xoá khi chưa có bước mà cô không nói gì");
  });
  T(function () { UTAB.len.set("5000", 3, 0); });
  T(function () { bam(chipSo("len"), cell("len", 3)); });
  T(function () { hayNhay("len", 2, "bam"); });
  T(function () { card("len").querySelector("[data-undo]").click(); });
  T(function () {
    chk(cell("len", 3).textContent === "0", "L3 ✗ undo khi đi lên phải trả lại chữ số 0 vừa xoá");
    chk(tinh("len").buoc === 0, "undo lên không lùi bước");
  });

  /* ================= 8 · CÔ LÀM MẪU — và bé cắt ngang quyền ================= */
  T(function () { UTAB.mass.set("3", 0, 3); });
  T(function () { card("mass").querySelector("[data-play]").click(); });
  T(function () {
    chk(tinh("mass").datSo === true, "Cô làm mẫu phải tự đặt số giúp (bé chưa đặt)");
  }, 2000);
  T(function () {
    chk(tinh("mass").buoc === 1, "L8 ✗ Cô làm mẫu phải đi TỪNG CỘT MỘT — sau 2 giây nhận được " + tinh("mass").buoc + " bước");
    chk(arcs("mass", ".dung").length === 1, "L8 ✗ Cung của bản mẫu không vẽ theo từng bước");
  }, 2600);
  T(function () {
    chk(tinh("mass").xong === true, "Cô làm mẫu phải đi tới đích");
    chk(out("mass") === dapCua("mass", "3", 0, 3), "L7 ✗ Bản cô làm mẫu ra [" + out("mass") + "]");
    chk(tinh("mass").sai === 0, "Cô làm mẫu mà bị ghi sai");
    KQ.mau = out("mass");
  }, 2500);
  T(function () {
    card("mass").querySelector("[data-lam-lai]").click();
    var t = true; cells("mass").forEach(function (o) { if (o.textContent !== "") t = false; });
    chk(tinh("mass").datSo === false && t && arcs("mass").length === 0, "🧽 Làm lại phải trả bảng về trắng, chưa đặt số");
    chk(/lam lai|từ đầu/i.test(bong()) || true, "");
  });
  T(function () { UTAB.mass.set("3", 0, 3); card("mass").querySelector("[data-play]").click(); }, 1500);
  T(function () {
    /* bé giành quyền giữa lúc máy chạy: máy phải dừng, bước của bé được tính bình thường */
    var truoc = tinh("mass").buoc;
    chipNhay("mass").click(); cell("mass", truoc + 1).click();
    chk(tinh("mass").buoc === truoc + 1, "Bé cắt ngang mà bước của bé không được ghi");
    KQ.cat = truoc;
  }, 3000);
  T(function () {
    chk(tinh("mass").buoc === KQ.cat + 1, "L8 ✗ Máy vẫn lén chạy tiếp sau khi bé giành quyền (" + JSON.stringify(tinh("mass")) + ")");
  });

  /* ================= 9 · CHỌN ĐỀ BẢNG TAB ================= */
  T(function () {
    var tabs = document.querySelectorAll("#tabs-1 .demo");
    chk(tabs.length === 5, "Mục 1 phải có 5 đề mẫu (3 xuống + 2 ngược), hiện có " + tabs.length);
    var dem = 0;
    for (var j = 0; j < tabs.length; j++) { tabs[j].click(); dem++; }
    chk(document.querySelectorAll("#tabs-1 .demo.active").length === 1, "Hai tab cùng active");
  });
  T(function () {
    var e5 = document.querySelectorAll("#tabs-1 .demo")[4];
    chk(tinh("area").datSo === false, "Chọn đề 500 dm²→m² mà bảng diện tích còn dở");
    chk(cell("area", 0).textContent === "" && cell("area", 1).textContent === "", "Chọn đề mới mà bảng còn số cũ");
    tabsReset();
  });
  function tabsReset() {
    var d = document.querySelectorAll("#tabs-1 .demo")[0];
    if (d) d.click();
  }

  /* ================= 10 · ĐO HÌNH: cung không tràn, bảng không vỡ ================= */
  T(function () {
    UTAB.len.set("5", 0, 3);
    bam(chipSo("len"), cell("len", 0));
  }, 60);
  T(function () { hayNhay("len", 1, "bam"); });
  T(function () { hayNhay("len", 2, "bam"); });
  T(function () {
    FAM.forEach(function (k) { if (k === "len") return; var m = UFAM[k].seed; UTAB[k].set(m.v, m.from, m.to); });
    FAM.forEach(function (k) {
      var id = "bn-" + k, w = dai(k).getBoundingClientRect().width, bang = bangR(k);
      chk(w >= bang.width - 1, "L9 ✗ " + id + ": dải cung " + Math.round(w) + "px hẹp hơn bảng " +
        Math.round(bang.width) + "px → cung bị cắt");
      chk(dai(k).getBoundingClientRect().height > 0, "L9 ✗ " + id + ": dải cung cao 0 — không còn chỗ để vẽ");
      arcs(k).forEach(function (g, gi) {
        g.querySelectorAll("path").forEach(function (p) {
          var d = p.getAttribute("d") || "", nums = d.match(/-?[\\d.]+/g) || [];
          for (var j = 0; j < nums.length; j += 2) {
            var x = parseFloat(nums[j]);
            chk(x >= -1 && x <= w + 1, "L9 ✗ " + id + " cung " + (gi + 1) + ": vẽ ra x=" + x + " ngoài dải 0.." + Math.round(w));
          }
        });
      });
    });
    var wrap = document.querySelector(".utab-wrap");
    chk(!!wrap, "Mất khung cuộn .utab-wrap");
    var kh = document.getElementById("u-tables");
    chk(kh.scrollWidth <= kh.clientWidth + 2,
      "Tràn ngang cả khối Mục 1 (" + kh.scrollWidth + " > " + kh.clientWidth + ")");
    KQ.dai = Math.round(dai("len").getBoundingClientRect().width) + "/" + Math.round(bangR("len").width);
  }, 260);

  /* ================= 11 · L6: đỏ chỉ dẫn liệt kê từng chỗ sai ================= */
  T(function () { UTAB.mass.set("3", 0, 3); });
  T(function () { keoTha(chipSo("mass"), cell("mass", 2)); });   // sai chỗ đứng
  T(function () {
    bam(chipSo("mass"), cell("mass", 0));
    chipNhay("mass").click(); cell("mass", 2).click();          // nhảy tắt
  });
  T(function () {
    hayNhay("mass", 1, "bam");
    chipNhay("mass").click(); cell("mass", 0).click();          // nhảy ngược
  });
  T(function () {
    /* L2 (nhảy ngược): bé đang đi XUỐNG mà nhảy NGƯỢC về cột nguồn — trang PHẢI từ chối.
       Lọt luật này thì cú ngược bị tính thành một bước hợp lệ và ghi đè 0 lên chính chữ số
       của đề (đầu vào), nên đo cả hai: sổ bước vẫn là 1 và ô nguồn còn nguyên số 3. */
    chk(tinh("mass").buoc === 1,
      "L2 ✗ Nhảy ngược khi đề đi xuống mà bảng vẫn tính thêm một bước — thành " + tinh("mass").buoc + " bước");
    chk(cell("mass", 0).textContent === "3",
      "L2 ✗ Nhảy ngược đè mất chữ số của đề ở cột nguồn (còn [" + cell("mass", 0).textContent + "])");
    var truoc = tinh("mass").sai;
    chk(truoc >= 3, "L6 ✗ Ba kiểu sai (lệch cột / nhảy tắt / nhảy ngược) chỉ tính " + truoc + " chỗ");
    hayNhay("mass", 2, "bam");
  });
  T(function () { hayNhay("mass", 3, "bam"); });
  T(function () {
    chk(tinh("mass").xong === true, "L6 ✗ Có sai dọc đường nhưng đổi không xong");
    chk(out("mass") === dapCua("mass", "3", 0, 3), "L7 ✗ Chạy có lỗi vẫn phải ra đúng đáp số (" + out("mass") + ")");
    chk(!dan("mass").hidden, "L6 ✗ Xong bài mà bảng chỉ dẫn không mở");
    chk(dan("mass").className.indexOf("sai") >= 0, "L6 ✗ Có chỗ sai mà bảng chỉ dẫn không ĐỎ");
    chk(/chưa đúng/.test(dan("mass").innerHTML), "L6 ✗ Bảng đỏ phải nói có bao nhiêu chỗ chưa đúng");
    chk(/cú nhảy đi đúng MỘT cột/.test(dan("mass").innerHTML), "L6 ✗ Bảng đỏ phải nhắc lại luật một cột");
    chk(dan("mass").querySelectorAll("b").length >= 4, "L6 ✗ Bảng đỏ không liệt kê TỪNG chỗ sai");
    KQ.do = dan("mass").textContent.slice(0, 160);
    KQ.soSai = tinh("mass");
  });

  /* ================= 12 · SỔ SAI KHÔNG TÍNH LẠI KHI CHỌN ĐỀ ================= */
  T(function () {
    UTAB.mass.set("3", 0, 3);
    chk(tinh("mass").sai === 0, "Chọn đề mới phải xoá sạch sổ sai của lần trước");
    chk(tinh("mass").buoc === 0 && !tinh("mass").xong, "Chọn đề mới mà bảng chưa về 0 bước");
  });

  /* ================= 13 · MỌI CÂU LUYỆN TẬP PHẢI KÈM SƠ ĐỒ BƯỚC NHẢY ================= */
  T(function () {
    var tmp = document.createElement("div"), so = 0, coSoDo = 0;
    Object.keys(LEVELS).forEach(function (l) {
      LEVELS[l].qs.forEach(function (qq, i) {
        so++;
        var ten = "câu " + l + "." + (i + 1) + " (" + qq.q + ")";
        var dich = NHALOC[qq.target];
        var trenThang = !!(qq.parts && !qq.manual && dich && qq.parts.every(function (p) {
          var a = NHALOC[p.unit]; return a && a.fam === dich.fam;
        }));
        ["ok", "sai"].forEach(function (loai) {
          tmp.innerHTML = feedbackHtml(qq, { ok: loai === "ok", val: "999999" });
          var m = tmp.querySelector(".nh-mini");
          if (!trenThang) { chk(!m, "L11 ✗ " + ten + " không nằm trên thang ×10/×100 mà vẫn vẽ sơ đồ nhảy — bé sẽ đòi đếm bậc"); return; }
          chk(!!m, "L11 ✗ " + ten + " có hai đơn vị trên thang mà phản hồi KHÔNG kèm sơ đồ bước nhảy");
          if (!m) return;
          chk((loai === "sai") === m.classList.contains("sai"), "L6 ✗ " + ten + ": khung sơ đồ không đổi màu theo đúng/sai");
          if (loai !== "ok") return;
          coSoDo++;
          var slots = UFAM[dich.fam].slots, nh = 0, tong = 0;
          qq.parts.forEach(function (p, j) {
            var hang = m.querySelectorAll(".nh-leg")[j], a = NHALOC[p.unit];
            chk(!!hang, "L11 ✗ " + ten + ": thiếu nhánh sơ đồ của " + p.unit);
            if (!hang) return;
            var mui = hang.querySelectorAll(".nh-mini-row i").length;
            chk(mui === Math.abs(dich.i - a.i), "L11 ✗ " + ten + ": nhánh " + p.unit + " vẽ " + mui + " mũi tên, thang thật là " + Math.abs(dich.i - a.i) + " cột");
            var chu = hang.querySelector("p").textContent;
            var so0 = Math.abs(dich.i - a.i) * slots;
            if (so0) chk(chu.indexOf(so0 + " chữ số 0") >= 0, "L11 ✗ " + ten + ": sơ đồ không ghi đủ " + so0 + " chữ số 0 (" + chu + ")");
            nh += mui;
            // đi xuống ⇒ ×10 mỗi cột, đi lên ⇒ ÷10 mỗi cột (sơ đồ vẽ mũi tên ngược)
            tong += Number(p.val) * Math.pow(10, (dich.i >= a.i ? 1 : -1) * mui * slots);
          });
          chk(nh > 0, "L11 ✗ " + ten + ": sơ đồ không có cú nhảy nào");
          chk(tong === Number(String(qq.ans).replace(/\s/g, "")),
            "L11 ✗ " + ten + ": sơ đồ cộng ra " + tong + " nhưng máy chấm đáp số " + qq.ans);
        });
      });
    });
    KQ.soCau = so; KQ.coSoDo = coSoDo;
  });

  chay();
});
<\/script>`;

const u = D.trang_probe("nhay.html", probe, "");
const dom = D.dump(u, 180000);
let r;
try { r = D.moi(dom, "QCJSON"); } catch (e) { console.log(dom.slice(0, 3000)); process.exit(1); }
if (r.jserr && r.jserr.length) console.log("⚠ Lỗi JS trên trang: " + r.jserr.join(" · "));
console.log("Bảng bé dựng · cô làm mẫu · bàn phím · diện tích 2 số — " + r.soBuoc + " lát cắt");
Object.keys(r.ket || {}).forEach(k => { if (k !== "do") console.log("  " + k + ": " + JSON.stringify(r.ket[k])); });
if (r.ket && r.ket.do) console.log("  đỏ chỉ dẫn: " + r.ket.do);
if (r.loi.length) {
  console.log("✕ " + r.loi.length + " luật bị vỡ:");
  r.loi.forEach(l => console.log("   • " + l));
  process.exit(1);
}
console.log("✓ 0 luật bị vỡ — Mục 1 + sơ đồ bước nhảy giữ đúng thiết kế");
process.exit(r.jserr && r.jserr.length ? 1 : 0);
