// Doi chieu 27 clip tro-giang (ASR) voi chu that in tren index.html ban da push (ea3c15e).
// Chay: node .parts/doi-chieu-tieng.js
//
// Bang duoi day ghi tay tu 28 loi trong index.html, VA file nay do lai rang
// moi chu trong bang xuat hien DUNG NGUYEN VAN trong index.html — neu trang doi loi
// ma bang khong bao, script in loi va exit 1 (khong de bang gia co).
//
// NGUON ASR: C:/tmp/asr-co-giao.json — faster-whisper (small, CPU) doc 27 file mp3 trong
// tro-giang/ cua ban "the nam trong de" (phien bien tap khac), ffmpeg giai PCM 16k mono.
// File mp3 KHONG nam trong repo; toan bo chu clip nghe duoc da chep vao JSON sinh ra
// (`clip_noi_theo_asr`) nen bang chung doc lap duoc khong can tai lai audio.
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "index.html");
const ASR = "C:/tmp/asr-co-giao.json";
const OUT = path.join(__dirname, "heo-tieng-2026-10-22.json");

const src = fs.readFileSync(SRC, "utf8");
const clips = JSON.parse(fs.readFileSync(ASR, "utf8"));

const TREN_TRANG = {
  "ten-sai-dai": "Ơ, chưa đúng rồi em. Thanh dài là của bạn nhiều hơn, thanh ngắn là của bạn ít hơn. Em kéo lại tên nhé.",
  "ten-sai-nguoi": "Ơ, chưa đúng rồi em. Thanh dài là của người nhiều hơn, thanh ngắn là của người ít hơn. Em đổi lại tên nhé.",
  "ten-sai-thanh": "Tên này chưa đúng thanh rồi. Em xem thanh nào dài hơn, thanh nào ngắn hơn, rồi kéo tên lên đúng đầu thanh nhé.",
  "nhan-ten": "Ở đây mình chỉ ghi tên thôi em nhé. Số thì em kéo xuống đoạn cam, đó là HIỆU, hoặc lên ngoặc tím, đó là TỔNG.",
  "nhan-ten-khung": "Ở đây mình chỉ ghi tên thôi em nhé. Số thì em kéo xuống khung tính ở dưới hai thanh.",
  "o-so": "Ô này để ghi số, không phải ghi tên đâu em. Em kéo tên lên nhãn ở đầu hai thanh nhé.",
  "o-hieu": "Ô này là HIỆU, tức là phần hơn. Em kéo thẻ HIỆU vào đây nhé, đừng kéo tên.",
  "o-tong": "Ô này là TỔNG, tức là cả hai gộp lại. Em kéo thẻ TỔNG vào đây nhé, đừng kéo tên.",
  "nham-tong": "Suýt đúng rồi em. Số này là TỔNG, tức là cả hai gộp lại, nên nó phải nằm trong ngoặc tím. Em kéo sang đó nhé.",
  "nham-hieu": "Gần đúng rồi em. Số này là HIỆU, tức là phần hơn, nên nó nằm ở đoạn cam tô màu. Em kéo lại nhé.",
  "kiem-hieu": "Chưa đúng đâu em. Em đọc lại đề, tìm chỗ nói hơn hoặc kém nhé. Phần hơn đó chính là HIỆU, mình kéo vào đoạn cam.",
  "kiem-tong": "Chưa đúng đâu em. Em tìm trong đề chỗ nói tất cả, hoặc cả hai nhé. Số đó mới là TỔNG.",
  "keo-dung-cho": "Chỗ này chưa đúng rồi. Ô trước dấu là TỔNG, ô sau dấu là HIỆU. Em nhìn lại rồi kéo cho đúng nhé.",
  "keo-du-kien": "Chưa đúng vị trí rồi em. Em thử lại nhé: tên lên đầu thanh, HIỆU xuống đoạn cam, TỔNG vào ngoặc tím.",
  "du-kien-sai": "Dữ kiện này chưa đúng chỗ rồi em. Tên thì ở đầu thanh, HIỆU ở đoạn cam, còn TỔNG ở ngoặc tím. Em kéo lại nhé.",
  "the-ten": "Thẻ tên chỉ đi lên nhãn ở đầu hai thanh thôi em. Kéo xuống khung tính là không vào được đâu.",
  "khung-tong": "Ô này thuộc khung TỔNG, hai số cộng lại. Thẻ em đang cầm là của khung HIỆU, mình làm khung TỔNG trước nhé.",
  "khung-hieu": "Ô này thuộc khung HIỆU, số lớn trừ số bé. Thẻ em đang cầm là của khung TỔNG, mình ghép khung TỔNG trước nhé.",
  "khung-hieu-thu-tu": "Khung HIỆU là số lớn trừ số bé, nên ô này phải là số lớn hơn. Em nhìn lại đề rồi kéo đúng số nhé.",
  "doc-lai-de": "Số này không đứng ở ô đó đâu. Em đọc lại đề nhé, xem số nào đứng trước, số nào đứng sau, rồi kéo lại.",
  "hai-so-khac": "Hai ô của khung TỔNG phải là hai số khác nhau em nhé. Mỗi số trong đề chỉ dùng một lần thôi.",
  "dung-roi": "Đúng rồi, giỏi quá!",
  "co-doi-em": "Cô đang nghe em làm bài. Kéo sai chỗ nào, cô nhắc chỗ đó nhé!",
  "cong-thuc-xong": "Hai công thức xong rồi, giỏi quá. Em điền đáp số vào ô bên dưới nhé.",
  "san-du": "Sơ đồ đủ rồi, cô khóa lại nhé. Em cuộn xuống phần công thức bên dưới.",
  "san-du-ten": "Sơ đồ đủ hai tên, TỔNG và HIỆU rồi. Em kéo tiếp dữ kiện vào hai công thức nhé.",
  "khoa-so-do": "Sơ đồ đủ rồi, cô khóa lại nhé. Em điền đáp số bên dưới.",
  "khoa-so-do-b2": "Sơ đồ đủ rồi, cô khóa lại nhé. Bây giờ em điền bước hai.",
};

// --- bang CO_FILE trong trang (khoa -> file mp3) ---
const khoaTrongFile = [...new Set([...src.matchAll(/^\s*'([a-z0-9-]+)':\s*'[a-z0-9-]+\.mp3',?\s*$/gm)].map(m => m[1]))];

// --- CHU: moi chu trong bang phai nam nguyen van trong index.html ---
const bangLech = Object.entries(TREN_TRANG).filter(([k, t]) => !src.includes(t)).map(([k]) => k);
const khoaThieu = khoaTrongFile.filter(k => !TREN_TRANG[k]);

// --- do lech HAI CHIEU: tu clip khong co trong trang + tu trang khong co trong clip ---
// (chieu thu hai moi bat duoc "clip noi thieu ca" — la loi cua ban khac, khong phai ASR nghe sai)
const chuan = t => String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
const WORDS = t => chuan(t).split(" ").filter(w => w.length > 1);
const TU_THUA = new Set(["thi", "day", "nay", "do", "do", "no", "va", "co", "khi", "voi", "lan", "thoi", "nhe", "roi", "em", "anh"]);
function soSanh(clip, trang) {
  const A = new Set(WORDS(trang)), B = new Set(WORDS(clip));
  const clipKhongCo = [...B].filter(w => !A.has(w));
  const trangKhongCo = [...A].filter(w => !B.has(w) && !TU_THUA.has(w));
  const tyLe = Math.round(100 * (B.size - clipKhongCo.length) / B.size);
  return { ty_le: tyLe, clip_thieu: clipKhongCo, trang_thua: trangKhongCo };
}

const rows = clips.map(c => {
  const trang = TREN_TRANG[c.file] || null;
  const d = trang ? soSanh(c.noi, trang) : { ty_le: null, clip_thieu: [], trang_thua: [] };
  return {
    khoa: c.file,
    clip_noi_theo_asr: c.noi,
    trang_in: trang,
    ty_le_giong_nhau: d.ty_le,
    clip_noi_ma_trang_khong_ghi: d.clip_thieu,
    trang_ghi_ma_clip_khong_noi: d.trang_thua,
    ket_luan: !trang ? "khong co chu tren trang"
      : d.clip_thieu.length || d.trang_thua.length ? "LECH" : "KHOP SAN — clip noi dung chu nay",
  };
});

const lech = rows.filter(r => r.ket_luan === "LECH").length;
// Lech ve CAU TRUC = trang ghi >=3 tu ma clip khong noi -> clip thieu ca ve, khong the doi cho ASR nghe sai.
const lechCauTruc = rows.filter(r => r.trang_ghi_ma_clip_khong_noi.length >= 3).map(r => r.khoa);
const ra = {
  ngay: "2026-10-22",
  han_che: "Ty le so tu bi nhieu doi cho ASR nghe sai dau/chu (nhe→nhat, tong→tung, so→xo). Vi vay file nay ghi RUI danh sach tu lech hai chieu de doc lai, va tam = 'lech cau truc' (trang ghi >=3 tu clip khong noi) — loai nay khong the giai thich bang ASR: clip thieu ca ve.",
  lech_cau_truc_so_khoa: lechCauTruc.length,
  lech_cau_truc: lechCauTruc,
  muc_dich: "Bang chung minh bo clip tro-giang trong may THUOC BAN KHAC (ban the nam trong de — cua phien bien tap khac), khong phai ban da push. Dung khi nao thu lai hoac ship clip.",
  ban_da_push: "ea3c15e (merge) + b0afc3f (probe) — Pages dang phuc vu; tro-giang/ KHONG nam trong repo",
  index_bytes: fs.statSync(SRC).size,
  phuong_phap: "ASR faster-whisper small tren CPU (ffmpeg giai PCM 16k mono). Moi khoa so voi chu THAT trong index.html; chu trong bang duoc do lai nguyen van nen bang khong the gia co. Ty le = so tu cua clip co mat trong chu tren trang.",
  so_khoa_trong_CO_FILE: khoaTrongFile.length,
  so_clip_asr: clips.length,
  bang_khop_nguyen_van_index_html: Object.keys(TREN_TRANG).length - bangLech.length + "/" + Object.keys(TREN_TRANG).length,
  lech: lech,
  khoa_chua_co_trong_bang: khoaThieu,
  bang_lech_khi_trang_doi_loi: bangLech,
  thieu_clip_trong_nguon: ["ten-sai-nguoi.mp3 — trang con dung khoa nay (2 khung ten: MUC 2 thanh dai/ngan, MUC 3 nguoi nhieu hon/it hon) nhung may khong con file; ban khac da gộp ve ten-sai-dai"],
  clip_thua_khong_dung: ["khen-2.mp3", "khen-3.mp3", "khen-4.mp3", "khen-5.mp3", "khen-6.mp3"],
  ket_luan_ship: "KHONG ship tro-giang/ cung ban nay: " + lech + "/" + clips.length + " clip lech loi tren trang, trong do " + lechCauTruc.length + " clip noi THIEU CA VE ma trang in ra (khong phai ASR nghe sai) -> bong hoa va tieng doc mau thuan, pham luat 'loi bong hoa phai khop dung chu da thu'. Trang tu doc bang speechSynthesis tieng Viet (vi-VN), van chay; muon co tieng thu thi phai thu lai theo loi ban nay.",
  doi: rows,
};
fs.writeFileSync(OUT, JSON.stringify(ra, null, 1));

for (const r of rows) {
  console.log((r.ket_luan.indexOf("KHOP") === 0 ? "✓ " : r.ket_luan === "LECH" ? "✕ " : "? ") +
    r.khoa.padEnd(19) + (r.ty_le_giong_nhau === null ? "   —" : " " + r.ty_le_giong_nhau + "%") + "  " + r.ket_luan +
    (r.clip_noi_ma_trang_khong_ghi.length ? "  [clip noi ≠ trang] " + r.clip_noi_ma_trang_khong_ghi.join(", ") : "") +
    (r.trang_ghi_ma_clip_khong_noi.length ? "  [trang ghi, clip thiếu: " + r.trang_ghi_ma_clip_khong_noi.join(", ") + "]" : ""));
  console.log("      clip : " + r.clip_noi_theo_asr);
  console.log("      trang: " + (r.trang_in || "(khong co)"));
}
console.log("\nLECH " + lech + "/" + rows.length + " · bang khop nguyen van " + ra.bang_khop_nguyen_van_index_html +
  " · " + khoaTrongFile.length + " khoa trong CO_FILE" + (khoaThieu.length ? " · CHUA lay duoc: " + khoaThieu.join(", ") : ""));
console.log("Ghi ra " + OUT.replace(/\\/g, "/"));
if (bangLech.length) { console.log("✕ Bang loi khong nam trong index.html: " + bangLech.join(", ") + " — trang da doi loi, cap nhat bang."); process.exit(1); }
