# Bài giảng "Thang 10 và Thang 100" — Đổi đơn vị đo lường, Toán lớp 4–5

Một file HTML độc lập: double-click là chạy, **không CDN, không build, không cần mạng** (font dùng hệ thống).

Nguồn: gộp thiết kế bài do Gemini Canvas xuất (`thang_10_v_thang_100_i_n_v_o.html`) với bộ máy chấm của
phiên bản trước, thêm **bản đồ tư duy** và các mô hình trực quan đang thiếu.

## Bảy mục của bài

| Mục | Nội dung | Cơ chế trực quan |
|---|---|---|
| 1 | Bản đồ tư duy của bài | SVG 5 nhánh (độ dài / khối lượng / diện tích / thời gian / 3 bước làm), **bấm nhánh để nhảy tới mục học** |
| 2 | Ba thang đo tương tác | 7 bậc độ dài · 7 bậc khối lượng · 4 bậc diện tích; bấm 2 bậc bất kỳ → hiện hệ số. Kèm **máy đổi nhanh** tự kiểm tra đáp số |
| 3 | Đi xuống · đi lên (hệ 10) | Hộp "Dự đoán" + **Ếch nhảy 3 cung ×10** (SVG chạy lặp) + 4 ví dụ chia 3 bước |
| 4 | Vuông trong vuông (hệ 100) | Stepper 3 bước: thước 10 vạch → **lưới 10×10 tô dần, đếm 0→100 ô** → so sánh cạnh nhau. + hộp "Dự đoán" + 4 ví dụ |
| 5 | Số đo kép tính từng bước | 4 mẫu (4 m 25 cm · 3 tấn 8 kg · 23 dm² 12 cm² · 2 km 5 hm), bảng 3 cột sáng từng ô + khối đơn vị "bùng nổ" thành 100 ô |
| 6 | Ngoài hệ 10 | Mặt đồng hồ **60 vạch**, thẻ so sánh "1 m = 10 dm" với "1 giờ = 60 phút", nhánh lớp 5 (ha, km²) |
| 7 | Luyện tập 7 cấp | Cổng ghi tên → Cấp 1·2·3 ôn, **Cấp 4·5·6·7 = 16 câu chấm** → sao → nộp về Google Form |

## Ba lỗi sư phạm đã sửa so với bản Gemini

1. **kg → g không phải "ngoại lệ ×1 000"**. Bảng đầy đủ là tấn · tạ · yến · kg · hg · dag · g, mỗi bậc ×10;
   kg → g chỉ là **3 bậc** nên ×1 000. Bài dạy đúng một quy tắc duy nhất: **đếm bậc**.
2. **Lưới 10×10 không tô cờ vua nữa** (50 ô cam / 50 ô trống làm bé hiểu thành "một nửa"). Lưới giờ tô
   lần lượt từng ô, đếm 0 → 100 và chốt hàng — đúng thông điệp "10 hàng × 10 cột".
3. **ha và km² rời khỏi thang ×100**. 1 ha = 10 000 m² nên đặt ha cạnh m² sẽ phá quy tắc; hai đơn vị này
   chuyển xuống nhánh lớp 5 và chỉ nằm trong máy đổi nhanh.

## Kiểm định đã chạy

`selfTest()` chạy ngay khi mở trang: 28 đáp số trong ngân hàng câu hỏi được dò lại bằng **máy đổi tỷ lệ
độc lập** (`quiTo` dựa trên đơn vị gốc mm / g / mm²), cộng thêm 12 cặp bậc ×10 và 3 cặp bậc ×100.
Lệch bất kỳ đâu → trang tự chặn và in danh sách lỗi lên đầu trang.

Trạng thái hiện tại: `Tự kiểm: 28/28 đáp số khớp · 12 cặp ×10 · 3 cặp ×100 · trang chạy ổn`.

Đã test tương tác thật trong browser: lưới tô đủ 100/100 ô, máy đổi nhanh
ra `3 km = 3 000 m (×1 000 — thêm 3 chữ số 0)`, làm sai câu `3 tạ = … kg` hiện bảng chẩn đoán + bẫy Mèo,
đủ 16 câu hiện nút Nộp bài và báo cáo sao.

## Chỉnh sửa nhanh

| Muốn đổi | Sửa ở |
|---|---|
| Danh sách học sinh được chấm | `ROSTER` (thêm `{ key, label, alias }`, nhãn bấm tự sinh) |
| Nơi nhận điểm | `FORM_ENDPOINT` + `ENTRY` — xem mục dưới |
| Câu hỏi / đáp số | `LEVELS`, và **cập nhật `PURE`** để `selfTest()` vẫn dò độc lập |
| Nhãn đơn vị | `LEN` / `MASS` / `AREA` ở đầu script |
| Hệ số giữa hai bậc | `BASE` (mm, g, mm²) |

## Nơi nhận kết quả (Google Form) — làm 1 lần

`FORM_ENDPOINT` đang để trống, trang vẫn chạy đủ, chỉ không gửi điểm.

1. Trong Google Drive, **nhân bản** form "Bảng điểm Cộng trừ nhẩm qua 10" (giữ 8 câu hỏi).
2. Mở `/viewform` của form mới → View source → lấy 8 mã `entry.*` theo tiêu đề câu.
3. Điền `FORM_ENDPOINT` (đổi `/viewform` → `/formResponse`) và 8 khoá `ENTRY`, commit.
4. Giữ nguyên: không thu email · **tắt** giới hạn 1 lần trả lời · không đổi kiểu câu hỏi.

## Mở bằng link cho học sinh

Repo đã bật **GitHub Pages** (Settings → Pages → Deploy from branch → `main` → `/root`):

```
https://hoatran1127.github.io/bai-giang-doi-don-vi/
```

## Hạn chế còn biết

- File tĩnh không xác nhận Google đã nhận điểm, và không khoá được việc làm lần hai.
- Cấp 4·5·6·7 chỉ có 16 câu; muốn thêm câu phải cập nhật cả `PURE` để tự kiểm không bỏ sót.
- Sơ đồ tư duy rộng 960px: trên điện thoại phải kéo ngang trong khung của Mục 1.
