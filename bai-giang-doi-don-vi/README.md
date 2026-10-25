# Bài giảng "Thang 10 và Thang 100" — Đổi đơn vị đo lường, Toán lớp 4–5

Một file HTML độc lập + thư mục `anh-avatar/` (3 PNG avatar của học sinh): double-click là chạy, **không CDN, không build, không cần mạng** (font dùng hệ thống).

Nguồn: gộp thiết kế bài do Gemini Canvas xuất (`thang_10_v_thang_100_i_n_v_o.html`) với bộ máy chấm của
phiên bản trước, thêm **bảng đơn vị hàng ngang** và các mô hình trực quan đang thiếu.

## Bảy mục của bài

| Mục | Nội dung | Cơ chế trực quan |
|---|---|---|
| 1 | Ba **bảng đơn vị bé tự dựng** | Bảng dựng ra **Ô TRỐNG**, không hiện sẵn đáp số. Bé thả thẻ số của đề vào đúng cột của nó, rồi cầm ếch 🐸 **kéo từng cú nhảy sang cột kề** — mỗi lần qua một cột: đi **xuống** ⇒ viết THÊM chữ số 0, đi **ngược lên** ⇒ XOÁ chữ số 0. Bảng độ dài · khối lượng **1 chữ số/cột**, diện tích **2 chữ số/cột** nên mỗi cú thêm/bớt 2 số. Đi lên mà cột còn chữ số khác 0 ⇒ trang **từ chối** (vẽ cung đỏ + ghi vào sổ sai), vì lớp 4 chưa học số thập phân — nhưng dòng chỉ dẫn vẫn ghi rõ "thực chất là chia cho 10". Có bộ đếm `Nhảy 2/3 bước`, **↶ Bỏ cú vừa nhảy**, **▶ Cô làm mẫu** (máy nhảy từng cột, bé bấm bất cứ đâu là giành lại quyền), **🧽 Làm lại**. Ba lối điều khiển ngang nhau: kéo–thả · bấm-chạm · bàn phím (`Enter` nhận, `Escape` huỷ), kèm `aria-live` đọc to từng bước. Phía trên là 5 chip ví dụ `5 km → m` · `3 tấn → kg` · `4 m² → dm²` · `5 000 m → km` · `500 dm² → m²` |
| 2 | Đi hàng ngang · máy ×10 | Cùng bộ cột với Mục 1, xếp ngang 7 · 7 · 4 cột trong **khung kẻ**, giữa hai cột là nhãn `→×10` / `→×100`; bấm 2 cột → "km → m: 3 cột · ×1 000 — thêm 3 chữ số 0" + chiều ngược. Nút **▶ Đi hết hàng ngang** chạy hết chuỗi nhảy từng cột kèm số lũy kế, **↺ Về đầu**reset. Thêm **Máy nhân / chia 10 — 100 — 1 000**: ô 0 mới rơi từng cái vào bên phải, ô bị xoá gạch bỏ dần từ phải sang trái, note đổi theo từng bước. Kèm **máy đổi nhanh** tự kiểm tra đáp số |
| 3 | Đi xuống · đi lên (hệ 10) | Hộp "Dự đoán" + **Ếch nhảy 3 cung ×10** (SVG chạy lặp) + 4 ví dụ chia 3 bước |
| 4 | Vuông trong vuông (hệ 100) | Stepper 3 bước: thước 10 vạch → **lưới 10×10 tô dần, đếm 0→100 ô** → so sánh cạnh nhau. + hộp "Dự đoán" + 4 ví dụ |
| 5 | Số đo kép tính từng bước | 4 mẫu (4 m 25 cm · 3 tấn 8 kg · 23 dm² 12 cm² · 2 km 5 hm), bảng 3 cột sáng từng ô + **chuỗi từng bậc**: mỗi nối ×10 vẽ đúng 1 hàng 10 ô, ×100 vẽ lưới 10×10, và hình đổi theo từng bước |
| 6 | Ngoài hệ 10 | Mặt đồng hồ **60 vạch**, thẻ so sánh "1 m = 10 dm" với "1 giờ = 60 phút", nhánh lớp 5 (ha, km²) |
| 7 | Luyện tập 7 cấp | Cổng ghi tên → Cấp 1·2·3 ôn, **Cấp 4·5·6·7 = 16 câu chấm** → sao → nộp về Google Form. Làm xong mở **hướng dẫn**: đúng ⇒ khung xanh, sai ⇒ khung **đỏ chỉ từng chỗ**, và câu nào đổi được bằng thang bước nhảy thì **kèm sơ đồ nhảy** — mỗi nhánh đề là một chuỗi `→1 →2 →3`, ghi rõ qua mấy cột ⇒ viết thêm / xoá mấy chữ số 0, thực chất là ×10 hay ÷10, rồi "cộng lại khi hai số đã đứng cùng một cột" (23/28 câu trong ngân hàng có sơ đồ; 5 câu còn lại là 4 câu ghi nhớ tên đơn vị và câu `2 giờ = … phút` ngoài hệ 10 nên không vẽ được cung nhảy) |

## Ba lỗi sư phạm đã sửa so với bản Gemini

1. **kg → g không phải "ngoại lệ ×1 000"**. Bảng đầy đủ là tấn · tạ · yến · kg · hg · dag · g, mỗi bậc ×10;
   kg → g chỉ là **3 bậc** nên ×1 000. Bài dạy đúng một quy tắc duy nhất: **đếm bậc**.
2. **Lưới 10×10 không tô cờ vua nữa** (50 ô cam / 50 ô trống làm bé hiểu thành "một nửa"). Lưới giờ tô
   lần lượt từng ô, đếm 0 → 100 và chốt hàng — đúng thông điệp "10 hàng × 10 cột".
3. **ha và km² rời khỏi thang ×100**. 1 ha = 10 000 m² nên đặt ha cạnh m² sẽ phá quy tắc; hai đơn vị này
   chuyển xuống nhánh lớp 5 và chỉ nằm trong máy đổi nhanh.

## Kiểm định đã chạy

**Cổng trong trang** — `selfTest()` chạy ngay khi mở: 28 đáp số trong ngân hàng câu hỏi được dò lại bằng
**máy đổi tỷ lệ độc lập** (`quiTo` dựa trên đơn vị gốc mm / g / mm²), cộng thêm 12 cặp bậc ×10, 3 cặp bậc ×100,
**480 ô của phương pháp "thêm chữ số 0"** ở Mục 1 (mọi cặp cột × mọi chiều × 5 số mẫu, kể cả trường hợp
lệch phải bị bảng tự nhận là "không chẵn"), và **4 chuỗi ở Mục 5** — chuỗi đi từng bậc phải cho đúng số
`quiTo` đổi ra, mỗi nối chỉ được là ×10 hoặc ×100 (vì đó là hai cỡ ô duy nhất vẽ được), phần nhỏ của mẫu
phải đã cùng đơn vị đích. Vòng này cổng còn giữ thêm hai luật của thiết kế mới:

- Mục 1 dựng **đúng ba bảng**, **không ô nào được điền sẵn** (bảng tự dựng thì bé phải tự ra đáp số,
  không được đọc đáp số có trước), và mỗi bảng đủ bộ điều khiển: thẻ nhảy · bỏ cú vừa nhảy · làm lại ·
  cô làm mẫu · bộ đếm bước · dải cung · bảng chỉ dẫn.
- **Cộng từng nhánh của sơ đồ bước nhảy** trong phần hướng dẫn (mỗi nhánh nhân/chia `10^(cột × số ô)`)
  phải ra **đúng đáp số mà máy chấm đang chấm**, cho cả 28 câu (23 câu có sơ đồ; 5 câu không vẽ là
  4 câu ghi nhớ tên đơn vị và câu `2 giờ = … phút` ngoài hệ 10) — sửa đơn vị mà quên sửa sơ đồ là đỏ ngay.

Lệch bất kỳ đâu → trang tự chặn và in danh sách lỗi lên đầu trang.

Trạng thái hiện tại: `Tự kiểm: 28/28 đáp số khớp · 12 cặp ×10 · 3 cặp ×100 · 480 ô bảng Mục 1 · 4 chuỗi Mục 5 · 23/28 câu có sơ đồ bước nhảy · trang chạy ổn`.

**Cửa `.parts/` — Chrome headless, đo trên ĐÚNG file giao `index.html`** (bản cấy lỗi ghi trong thư mục
tạm của hệ thống qua `QC_SRC`, không bao giờ đụng file giao):

| Lệnh | Luật nó giữ | Số đo chốt vòng này |
|---|---|---|
| `node bai-giang-doi-don-vi/.parts/probe-nhay.js` | 91 lát cắt tương tác Mục 1 + hướng dẫn: **L1** bảng trống · **L2** mỗi cú nhảy đi đúng MỘT cột và đúng chiều (nhảy tắt / nhảy ngược ⇒ cung đỏ + vào sổ sai, ô nguồn còn nguyên chữ số của đề) · **L3** qua một cột viết thêm / xoá đúng `slots` chữ số 0, diện tích 2 số · **L4** cột còn chữ số khác 0 thì xoá không hết · **L5** thả số lệch cột bị từ chối · **L6** xong thì bảng xanh chốt số cú nhảy, có sai thì **đỏ liệt kê từng chỗ** · **L7** hàng ngang bé tự dựng đọc ra đúng số `quiTo` · **L8** ▶ Cô làm mẫu nhảy từng cột, bé bấm vào là giành lại quyền · **L9** dải cung không bao giờ hẹp hơn bảng, cung không vẽ tràn · **L10** kéo–thả = bấm-chạm = bàn phím, `aria-live` đọc từng bước · **L11** sơ đồ bước nhảy khớp đáp số cả 28 câu | ✓ **0/91 luật vỡ** · 28 câu · 23 sơ đồ · dải cung 530/529 px · `5 km = 5 000 m` · `3 tấn = 3 000 kg` · `4 m² = 400 dm²` · `5000 m = 5 km` · `500 dm² = 5 m²` |
| `node bai-giang-doi-don-vi/.parts/probe-nhay-dot-bien.js` | 12 lỗi cấy vào bản sao (cho nhảy tắt, cho nhảy ngược, cho xoá số lẻ, diện tích còn 1 chữ số, bỏ dấu ô vừa xoá, bỏ làm nổi bật số mới, có chỗ sai vẫn báo xanh, thả lệch cột vẫn nhận, dải cung không được cấp bề rộng, mất `aria-live`, sơ đồ biến mất, sơ đồ trừ 1 bậc) — mỗi lỗi PHẢI làm cháy **đúng luật ghi ở cột `luat`**; 1 hàng **âm tinh** (chỉ đổi chữ câu cô khen, không đụng luật) phải còn xanh | ✓ **13/13 hàng đạt** |
| `node bai-giang-doi-don-vi/.parts/probe-giu-bai.js` | chống "bị văng ra": giữ nháp, xoá bài khi đổi bạn, `Enter` nộp, ngày tự ghép | ✓ 42/42 hàng đạt · đột biến 6/6 |
| `node bai-giang-doi-don-vi/.parts/chup-anh.js` | 9 ảnh trạng thái Mục 1 + ảnh phản hồi đỏ/xanh từng câu để xem bằng mắt, dựng bằng chính lối bấm của bé | ảnh nằm trong thư mục tạm, không vào repo |

Các mục khác vẫn chạy đúng: hàng ngang **▶ Đi hết hàng ngang** đếm đúng 6 cột = ×1 000 000 cho độ dài ·
khối lượng và 3 cột = ×1 000 000 cho diện tích; máy ×10 rơi đúng số ô 0 mới, máy ÷ gạch đúng số ô từ phải
sang trái và báo "không có đủ chữ số 0" khi chia lẻ; gõ số hoặc bấm cột giữa chừng sẽ dừng animation và
xóa sạch nét gạch; lưới Mục 4 tô đủ 100/100 ô; máy đổi nhanh quét 342 cặp đơn vị không ra chuỗi hỏng;
làm sai câu `3 tạ = … kg` hiện bảng chẩn đoán + bẫy Mèo, đủ 16 câu hiện nút Nộp bài và báo cáo sao.

## Chỉnh sửa nhanh

| Muốn đổi | Sửa ở |
|---|---|
| Danh sách học sinh được chấm | `ROSTER` (thêm `{ key, label, alias, anh }`, nhãn bấm tự sinh) |
| Ảnh avatar 3 bạn | PNG trong `anh-avatar/` + trường `anh` ở `ROSTER` (avatar nằm ngay **sau** chữ tên trong nút chọn) |
| Nơi nhận điểm | `FORM_ENDPOINT` + `ENTRY` — xem mục dưới |
| Câu hỏi / đáp số | `LEVELS`, và **cập nhật `PURE`** để `selfTest()` vẫn dò độc lập |
| Mẫu ở Mục 5 | `SAMPLES` — chỉ ghi số và đơn vị của đề; tiêu đề, tên cột, phép tính, kết quả và **số ô trong hình** đều tự sinh, không có field đáp án nào để gõ tay |
| Bảng đơn vị + hàng ngang Mục 1·2 | `UFAM` (nhãn, `units`, `slots` = số ô chữ số mỗi cột, `seed` = ví dụ mở trang) — Mục 1 và Mục 2 đọc chung một nguồn, sửa một lần là cả hai đổi |
| Lời cô giáo nói | `coNoi(khoa, câu, 'ok'\|'bad')` ở nơi phát sinh thao tác · **chưa thu clip** nên `CO_FILE = {}` và cô đọc bằng giọng máy đọc của trình duyệt; thu xong thì thêm `khoa: 'tên-file.mp3'` vào `CO_FILE` và đặt file trong `tro-giang/`, **không đổi chữ trên màn hình** |
| Sơ đồ bước nhảy trong hướng dẫn | **không có field nào để gõ tay** — `soDoNhay()` tự sinh từ `parts` + `target` của câu trong `LEVELS`, dùng đúng `units`/`slots` của `UFAM`; thêm câu mà thiếu `parts`/`target` thì câu đó không có sơ đồ (cổng L11 đếm và in ra `23/28`) |
| Nhãn đơn vị | `LEN` / `MASS` / `AREA` ở đầu script |
| Hệ số giữa hai bậc | `BASE` (mm, g, mm²) |

## Nơi nhận kết quả (Google Form) — làm 1 lần

`FORM_ENDPOINT` + 8 khoá `ENTRY` **đã nối** từ 23/10 — bài này có **form riêng và Sheet riêng** (điểm nộp
bài 2 không nằm lẫn vào bảng của bài khác). Xoá `FORM_ENDPOINT` thì trang vẫn chạy đủ, chỉ không gửi.
Muốn trỏ sang form khác (ví dụ thêm câu hỏi), làm lại 4 bước:

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
- **Cô giáo chưa thu giọng riêng cho bài này** — `CO_FILE = {}` nên mọi câu cô nói do giọng máy đọc của
  trình duyệt đọc (chất lượng phụ thuộc máy; Chrome/Windows thường ra giọng "rô-bốt"). Thu clip là một
  vòng riêng: thu theo đúng chữ trên màn hình, đặt vào `tro-giang/`, thêm khoá vào `CO_FILE`, rồi chạy
  cổng audio như bài Tổng–Hiệu (F0 · nhịp · ASR 100% cho câu ngắn).
- Bảng 7 cột rộng **530 px** (đo thật): trên điện thoại Mục 1 và hàng ngang Mục 2 nằm trong khung kéo
  ngang (`.utab-wrap` / `.hrow`), không tự nén cột. Dải cung vẽ trên đầu bảng luôn được cấp bề rộng theo
  bảng, cả khi chưa có cú nhảy nào, và vẽ lại khi xoay máy thay cỡ chữ (chống cung lệch hàng).
- Bảng Mục 1 **chỉ cho đi từng cột một** và chỉ xoá được cột toàn chữ số 0: đổi lên mà không chẵn
  (5 dm → m) trang vẽ cung đỏ, ghi vào sổ sai và nói "cột … còn số nên xoá không hết — bài này lớp 4
  chưa học em ạ", thay vì hiện 0,5. Ở máy đổi Mục 2 lời nhắn là "ra số thập phân, lớp 5 mới học".
  Đúng ý đồ (lớp 4 chưa học thập phân), nhưng giáo viên muốn dạy số thập phân thì phải bỏ chặn này.
