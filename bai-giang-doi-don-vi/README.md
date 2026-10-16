# Bài giảng "Thang 10 và Thang 100" — Đổi đơn vị đo lường, Toán lớp 4–5

Một file HTML độc lập + thư mục `anh-avatar/` (3 PNG avatar của học sinh): double-click là chạy, **không CDN, không build, không cần mạng** (font dùng hệ thống).

Nguồn: gộp thiết kế bài do Gemini Canvas xuất (`thang_10_v_thang_100_i_n_v_o.html`) với bộ máy chấm của
phiên bản trước, thêm **bảng đơn vị hàng ngang** và các mô hình trực quan đang thiếu.

## Bảy mục của bài

| Mục | Nội dung | Cơ chế trực quan |
|---|---|---|
| 1 | Ba **bảng đơn vị hàng ngang** | Đúng cái bảng trẻ vẽ ở lớp: gõ số vào cột đơn vị của nó, bấm cột muốn đổi ra → số 0 tự mọc trên các cột đi qua. Bảng độ dài · khối lượng **1 ô số/cột**, bảng diện tích **2 ô số/cột** (vạch chia giữa ô) nên thêm 2 chữ số 0. Có cả chiều ngược: chữ số dàn sang trái, cột bên phải đích phải toàn 0 mới chẵn. Mỗi bảng có **▶ Xem làm mẫu từng bước** (marker nhảy từng cột, ô 0 rơi từng cái, dòng khung dưới bảng thuyết minh Bước 1·2·3) + **🧽 Xóa bảng**; phía trên là dải **3 bước làm** và 5 chip ví dụ bấm là chạy (`5 km → m` · `3 tấn → kg` · `4 m² → dm²` · `5 000 m → km` · `500 dm² → m²`) |
| 2 | Đi hàng ngang · máy ×10 | Cùng bộ cột với Mục 1, xếp ngang 7 · 7 · 4 cột trong **khung kẻ**, giữa hai cột là nhãn `→×10` / `→×100`; bấm 2 cột → "km → m: 3 cột · ×1 000 — thêm 3 chữ số 0" + chiều ngược. Nút **▶ Đi hết hàng ngang** chạy hết chuỗi nhảy từng cột kèm số lũy kế, **↺ Về đầu**reset. Thêm **Máy nhân / chia 10 — 100 — 1 000**: ô 0 mới rơi từng cái vào bên phải, ô bị xoá gạch bỏ dần từ phải sang trái, note đổi theo từng bước. Kèm **máy đổi nhanh** tự kiểm tra đáp số |
| 3 | Đi xuống · đi lên (hệ 10) | Hộp "Dự đoán" + **Ếch nhảy 3 cung ×10** (SVG chạy lặp) + 4 ví dụ chia 3 bước |
| 4 | Vuông trong vuông (hệ 100) | Stepper 3 bước: thước 10 vạch → **lưới 10×10 tô dần, đếm 0→100 ô** → so sánh cạnh nhau. + hộp "Dự đoán" + 4 ví dụ |
| 5 | Số đo kép tính từng bước | 4 mẫu (4 m 25 cm · 3 tấn 8 kg · 23 dm² 12 cm² · 2 km 5 hm), bảng 3 cột sáng từng ô + **chuỗi từng bậc**: mỗi nối ×10 vẽ đúng 1 hàng 10 ô, ×100 vẽ lưới 10×10, và hình đổi theo từng bước |
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
độc lập** (`quiTo` dựa trên đơn vị gốc mm / g / mm²), cộng thêm 12 cặp bậc ×10, 3 cặp bậc ×100,
**480 ô của phương pháp "thêm chữ số 0"** ở Mục 1 (mọi cặp cột × mọi chiều × 5 số mẫu, kể cả trường hợp
lệch phải bị bảng tự nhận là "không chẵn"), và **4 chuỗi ở Mục 5** — chuỗi đi từng bậc phải cho đúng số
`quiTo` đổi ra, mỗi nối chỉ được là ×10 hoặc ×100 (vì đó là hai cỡ ô duy nhất vẽ được), phần nhỏ của mẫu
phải đã cùng đơn vị đích.
Lệch bất kỳ đâu → trang tự chặn và in danh sách lỗi lên đầu trang.

Trạng thái hiện tại: `Tự kiểm: 28/28 đáp số khớp · 12 cặp ×10 · 3 cặp ×100 · 480 ô bảng Mục 1 · 4 chuỗi Mục 5 · trang chạy ổn`.

Đã test tương tác thật trong browser (dùng harness chặn `setTimeout` để bắt từng khung của animation):
5 chip ví dụ ở Mục 1 chạy đến khung cuối đều ra đúng `5 km = 5 000 m`, `3 tấn = 3 000 kg`,
`4 m² = 400 dm²`, `5000 m = 5 km`, `500 dm² = 5 m²`; hàng ngang **▶ Đi hết hàng ngang** đếm đúng
6 cột = ×1 000 000 cho độ dài · khối lượng và 3 cột = ×1 000 000 cho diện tích; máy ×10 rơi đúng
số ô 0 mới, máy ÷ gạch đúng số ô từ phải sang trái và báo "không có đủ chữ số 0" khi chia lẻ.
Gõ số hoặc bấm cột giữa chừng sẽ dừng animation và xóa sạch nét gạch (không để lại trạng thái dở).
Lưới Mục 4 vẫn tô đủ 100/100 ô; máy đổi nhanh quét 342 cặp đơn vị không ra chuỗi hỏng;
làm sai câu `3 tạ = … kg` hiện bảng chẩn đoán + bẫy Mèo, đủ 16 câu hiện nút Nộp bài và báo cáo sao.
Thử cố ý làm hỏng `fillRow` (thêm 1 chữ số 0 già) → `selfTest()` lập tức chặn trang, chứng tỏ cổng kiểm
định còn tác dụng.

## Chỉnh sửa nhanh

| Muốn đổi | Sửa ở |
|---|---|
| Danh sách học sinh được chấm | `ROSTER` (thêm `{ key, label, alias, anh }`, nhãn bấm tự sinh) |
| Ảnh avatar 3 bạn | PNG trong `anh-avatar/` + trường `anh` ở `ROSTER` (avatar nằm ngay **sau** chữ tên trong nút chọn) |
| Nơi nhận điểm | `FORM_ENDPOINT` + `ENTRY` — xem mục dưới |
| Câu hỏi / đáp số | `LEVELS`, và **cập nhật `PURE`** để `selfTest()` vẫn dò độc lập |
| Mẫu ở Mục 5 | `SAMPLES` — chỉ ghi số và đơn vị của đề; tiêu đề, tên cột, phép tính, kết quả và **số ô trong hình** đều tự sinh, không có field đáp án nào để gõ tay |
| Bảng đơn vị + hàng ngang Mục 1·2 | `UFAM` (nhãn, `units`, `slots` = số ô chữ số mỗi cột, `seed` = ví dụ mở trang) — Mục 1 và Mục 2 đọc chung một nguồn, sửa một lần là cả hai đổi |
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
- Bảng 7 cột rộng ~400px: trên điện thoại Mục 1 và hàng ngang Mục 2 nằm trong khung kéo ngang
  (`.utab-wrap` / `.hrow`), không tự nén cột.
- Bảng Mục 1 chỉ nhận **số tự nhiên**. Đổi lên mà không chẵn (5 dm → m) trang báo "lớp 5 mới học số
  thập phân" thay vì hiện 0,5 — đúng ý đồ, nhưng giáo viên muốn dạy số thập phân thì phải bỏ chặn này.
