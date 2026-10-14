# Bài giảng Toán lớp 4 — HTML trực quan

Repo chung, **mỗi bài một thư mục**. Mỗi bài là một file HTML độc lập, mở bằng cách double-click hoặc bấm link Pages, không cần cài đặt, không cần build.

Trang cổng của repo: [`index.html`](index.html) — học sinh mở link này rồi chọn bài.

## Danh sách bài

| Bài | File | Nội dung | Kiểm định |
|---|---|---|---|
| 1. Cộng trừ nhẩm qua 10 & dấu chấm nhớ | [`bai-giang-cong-tru-nham/index.html`](bai-giang-cong-tru-nham/index.html) | Cặp Bạn Thân 10 → trừ nhẩm → cộng nhẩm → đặt tính cột dọc với dấu chấm (•) → luyện tập 7 cấp độ | `node kiem-dinh.js` (bên ngoài, xem mục Kiểm định) |
| 2. Thang 10 và Thang 100 — Đổi đơn vị đo lường | [`bai-giang-doi-don-vi/index.html`](bai-giang-doi-don-vi/index.html) | Bản đồ tư duy → 3 thang đo tương tác → đi xuống/đi lên hệ 10 → vuông trong vuông (hệ 100) → số đo kép → ngoài hệ 10 → luyện tập 7 cấp độ. **Không CDN, chạy cả khi ngắt mạng** | `selfTest()` chạy ngay khi mở trang |
| *(không phải trang học)* | [`kiem-dinh.js`](kiem-dinh.js) | Chạy `node kiem-dinh.js` sau mỗi lần sửa **bài 1**: tính lại toàn bộ đáp số, soi dấu chấm từng bước, thang sao, cổng tên, 8 field gửi về Sheet. Bộ kiểm định này viết riêng cho bài 1 — bài 2 tự kiểm bằng `selfTest()` trong trang. | — |

Chi tiết bài 2 (7 mục, 3 lỗi sư phạm đã sửa so với bản gốc, cách chỉnh) nằm trong [`bai-giang-doi-don-vi/README.md`](bai-giang-doi-don-vi/README.md).

## Cách dùng trên lớp

1. Mở file HTML bằng Chrome / Edge (khuyến nghị) hoặc Cốc Cốc.
2. Bài 1 dùng Tailwind CDN + Google Fonts, cần mạng cho **lần mở đầu**; các lần sau dùng cache. Bài 2 không cần mạng.
3. Giáo viên chạy lần lượt Mục 1 → 4; Mục 5 (bài 1) mỗi học sinh **làm một lần rồi nộp**, kết quả tự gửi về bảng điểm của thầy.

## Cấu trúc bài "Cộng trừ nhẩm qua 10"

| Mục | Nội dung | Cơ chế |
|---|---|---|
| 1 | Bảng 5 Cặp Bạn Thân 10 (1–9, 2–8, 3–7, 4–6, 5–5) | 5 thẻ số đối xứng |
| 2 | Trừ qua 10: phân tích bằng sơ đồ 3 bước | 4 ví dụ đổi được: 16−8, 15−7, 13−9, 14−6 |
| 3 | Cộng qua 10: tách số bù tròn chục | 4 ví dụ đổi được: 6+8, 7+9, 5+8, 8+7 |
| 4 | Đặt tính cột dọc — dấu chấm (•) đặt **ngay sát chân chữ số trừ** ở cột bên trái | 3 mẫu có nút lùi/tới theo cột: 53−28, 432−178, 1000−347 |
| 5 | Luyện tập 7 cấp độ, 30 câu — **chấm điểm 16 câu cấp 4·5·6·7, mỗi bạn chỉ làm 1 lần** | Gõ tên (Mai / Gia Linh / Trà Giang) → làm → nộp → **kết quả tự gửi về bảng điểm của thầy**; chỉ còn hiện điểm + lời sai |

## Quy tắc sư phạm cốt lõi

- **Mượn ở cột nào → chấm (•) vào sát chân số trừ của cột kế bên trái** (không đánh trên đầu).
- **Thấy chân số có chấm → tự tăng thêm 1 trước khi trừ tiếp.**
- Chữ số 0 đứng đầu kết quả **không viết**.
- Dấu chấm rơi vào ô trống (số trừ ít chữ số hơn) → coi như 1, vẫn hiện chữ 0 mờ để dấu chấm có chỗ bám.

## Quy tắc chấm điểm Mục 5

- Cổng vào duy nhất là **ô ghi tên**; nhận đúng ba bạn Mai / Gia Linh / Trà Giang (không dấu cũng được, "giang" → Trà Giang).
- Cấp 1·2·3 là **ôn**, bấm Kiểm tra bao nhiêu lần cũng được, không lưu.
- Cấp 4·5·6·7 = **16 câu được chấm**; mỗi câu chỉ **ghi nhận lần đầu** — bấm lại không đổi điểm, để trống thì chưa mất lượt.
- Nộp bài khi đủ 16 câu → trang dựng một **form ẩn POST thẳng về Google Form**, kết quả đổ vào Google Sheet. Sau đó chỉ còn điểm + sao + lời sai (kèm bảng chẩn đoán cột dọc), không có ô nhập.
- Sao: 3★ từ 85% (≥14/16) · 2★ từ 60% (≥10) · 1★ từ 30% (≥5) · dưới 5 câu = 0★.
- Không còn khoá máy: tin vào **thầy nhận được kết quả**. Trang chỉ báo "✅ Đã gửi" khi đã bắn request đi, chứ file tĩnh **không đọc được phản hồi** của Google nên không thể xác nhận chắc chắn.
- Muốn một bạn làm lại: thầy **xoá dòng của bạn đó** trên Sheet (hoặc ghi chú đã kiểm tra). Học sinh tải lại trang là làm lại được — đây là giới hạn cố hữu của file tĩnh không có server.

## Nơi nhận kết quả của bài 1 (đã cài xong 12/10/2026)

Form và Sheet đang sống, thuộc tài khoản `minhtien07118904@gmail.com`:

| Thành phần | Địa chỉ |
|---|---|
| Bảng điểm (Google Sheet) | `https://docs.google.com/spreadsheets/d/1Q5c0MV8llijNuxoEqPesKdcTovaueHlYmo6btrT9C4E/edit` — tên tab: *Bảng điểm Cộng trừ nhẩm qua 10 — lớp 4 (Câu trả lời)* |
| Form nhận bài | `https://docs.google.com/forms/d/e/1FAIpQLSec0WtGr1znhnYgEFJio5BM0iMpqSVr7EOLb9VSxff6QeMy_g/viewform` |
| Endpoint bài giảng POST về | chính link trên, đổi `/viewform` → `/formResponse` |

8 cột trong Sheet, đúng thứ tự, kèm `entry.*` đã gắn trong `index.html`:

| Cột | entry | Kiểu |
|---|---|---|
| Tên em | `entry.2005620554` | trả lời ngắn |
| Ngày làm bài | `entry.509135542` | trả lời ngắn |
| Số câu đúng | `entry.2028471663` | trả lời ngắn |
| Tổng số câu được chấm | `entry.275147971` | trả lời ngắn |
| Số sao | `entry.1045781291` | trả lời ngắn |
| Lời sai của em | `entry.1065046570` | đoạn |
| Tỉ lệ % | `entry.1166974658` | trả lời ngắn |
| Đáp án em đã ghi | `entry.839337160` | đoạn |

**Ba chế độ cài đặt phải giữ nguyên**, nếu không học sinh nộp sẽ âm thầm mất:

- **Thu thập địa chỉ email = Không thu thập.**
- **Giới hạn ở 1 lần trả lời = TẮT.** Bật lên là Google chặn người chưa đăng nhập, POST trả 401 và Sheet không có dòng nào.
- Câu hỏi **không được đổi thành Trắc nghiệm / Hộp kiểm / Xếp hạng** (form chỉ nhận dạng văn bản), và **không bật xác thực phản hồi** kiểu Email/Số — từng có câu "Số sao" mang xác thực email làm bài bị từ chối.

Muốn thêm bài mới thì **nhân bản form này**, rồi mở `/viewform` để lấy `entry.*` mới (mỗi lần thêm/xoá câu, id sẽ đổi).

## Mở bằng link (không cần tải file)

Repo bật **GitHub Pages**, mỗi bài một thư mục. Gửi cho học sinh link cổng rồi để em chọn bài:

```
https://hoatran1127.github.io/bai-giang-toan-4/                 (trang cổng, chọn bài)
https://hoatran1127.github.io/bai-giang-toan-4/bai-giang-cong-tru-nham/   (bài 1)
https://hoatran1127.github.io/bai-giang-toan-4/bai-giang-doi-don-vi/      (bài 2)
```

Bài 2 trước đây ở repo riêng `bai-giang-doi-don-vi`; từ 14/10/2026 bản **mới nhất (79 970 byte, sửa 13/10) đã chuyển vào đây**, repo cũ không còn là bản gốc nữa.

Sửa trực tiếp trên GitHub: vào file → nút bút chì → sửa → **Commit** (thoả thuận `separate review commits`), Pages cập nhật trong ~1 phút.

## Bài 2 (Đổi đơn vị đo lường) còn thiếu gì

- **Chưa nối bảng điểm**: `FORM_ENDPOINT` và `ENTRY` trong `bai-giang-doi-don-vi/index.html` đang để trống, nên trang chấm ra điểm + sao nhưng **không gửi về Sheet**. Cơ chế gửi của bài 2 là `fetch(..., mode: 'no-cors')` + `FormData`, khác bài 1 (dựng form ẩn POST). Muốn nối: nhân bản form bài 1, lấy 8 `entry.*` của bản mới, điền rồi chạy lại.
- Trang vẫn hiện nút Nộp bài và báo cáo điểm bình thường khi endpoint trống (`SEND_READY` kiểm tra chuỗi bắt đầu bằng `http`).

## Kiểm định đã chạy

### Bài 1 — `node kiem-dinh.js`

**Bộ kiểm định tự động nằm trong repo: `node kiem-dinh.js`** (cần Node; chạy xong in `KHONG PHAT HIEN LOI` và exit 0). Nó nạp `<script>` của trang bằng `vm` (không cần trình duyệt) rồi tính lại mọi thứ **bằng đường riêng**, không đọc đáp số trong file để so với chính nó:

- **30/30 câu**: mỗi đề bài được đọc lại thành phép tính rồi tính lại; cả 16 câu chấm điểm đều khớp.
- **Lời giải mẫu (expText)**: mọi câu "Bạn thân của X là Y" phải đủ 10, mọi câu "Tách Z = A + B" phải đúng tổng, cấp 2 phải ra theo công thức *bạn thân + số lẻ*, cấp 3 theo *10 + phần còn lại*.
- **3 mẫu Mục 4**: từng bước phải hiện đúng các chữ số đã tính (chữ số 0 đứng đầu không viết) và **dấu chấm phải rơi đúng vào các cột mà phép mượn thực tế cần**; mọi phương trình trong lời giải bước đều đúng.
- **11 bài đặt tính cấp 4·5·6·7**: dựng bảng chẩn đoán, đọc lại từng ô → kết quả hiển thị khớp đáp số và khớp hiệu số thật; **số dấu chấm bằng đúng số lần mượn**; lời giải phải bắt đầu từ *Cột Đơn vị*.
- **Thang sao**: 14/16 → 3★, 13 → 2★, 10 → 2★, 9 → 1★, 5 → 1★, 4 → 0★, 16 → 3★ (không bao giờ vượt 3).
- **Cổng tên**: nhận `Mai/mai/ MAI `, `gialinh/Gia Linh/Linh`, `Trà Giang/tra giang/giang`; chặn `An`, `Trang`, `Mai Linh`, `Linh Giang`, tên rỗng.
- **8 field gửi về Sheet**: khớp tên miền `entry.*`, không trùng id, endpoint đúng dạng `formResponse`.
- **Ô trả lời**: số em đã gõ nhưng chưa bấm Kiểm tra phải được **lưu lại** khi trang dựng lại danh sách (và khi đổi cấp độ), ô chưa gõ thì không được gắn giá trị lạ; mỗi ô có nhánh `Enter`; giá trị lưu bị lọc còn chữ số; đổi sang bạn khác thì màn hình **sạch hoàn toàn**.
- **Cột "Ngày làm bài"**: luôn ra dạng `dd/MM/yyyy HH:mm` (không phụ thuộc ngôn ngữ trình duyệt của từng máy).

### Bài 2 — `selfTest()` chạy trong trang

Bài "Thang 10 và Thang 100" tự dò lại **28 đáp số** trong ngân hàng câu hỏi bằng một máy đổi tỷ lệ độc lập (`quiTo` dựa trên đơn vị gốc mm / g / mm²), cộng thêm **12 cặp bậc ×10** và **3 cặp bậc ×100**. Lệch bất kỳ đâu → trang tự chặn và in danh sách lỗi lên đầu trang. Trạng thái hiện tại: `28/28 đáp số khớp · 12 cặp ×10 · 3 cặp ×100`.

### Sáu lỗi đã tìm ra và sửa (12–13/10/2026)

1. **Mẫu 3 (1 000 − 347) ở Mục 4 vẽ thiếu dấu chấm ở cột nghìn.** Ba bước trước đều chấm đúng quy tắc, nhưng bước cuối mượn 1 nghìn thì không có dấu chấm nào — trong khi bảng chẩn đoán (học sinh sai sẽ thấy) lại chấm vào ô trống cột nghìn. Hai chỗ dạy không giống nhau. Nay Mẫu 3 hiện chữ 0 mờ + dấu chấm ở ô trống và có thêm dòng "Cột nghìn: 1 − 1 = 0 ➔ chữ số 0 đứng đầu không viết".
2. **Bảng chẩn đoán xếp lời giải ngược.** Nó in ra từ cột cao nhất xuống cột đơn vị, tức **ngược** với thứ tự trẻ thực hiện. Nay in theo thứ tự nhẩm: Cột Đơn vị trước, lần lượt sang trái (11/11 bài).
3. **Dòng "Lời sai" gửi về Sheet bị dính dấu `=` thừa**, ví dụ `Bai 7.5: 5834 − 996 = em ghi 4800`. Nay sạch: `Bài 7.5: 5834 − 996 — em ghi 4800, đáp án đúng 4838`.
4. **Mất đáp án trẻ đã gõ (13/10).** Mỗi lần bấm *Kiểm tra* ở câu được chấm, trang dựng lại cả danh sách 16 câu — **mọi ô khác bị xoá sạch số đang gõ dở**. Trẻ thường gõ liền 3–4 ô rồi bấm kiểm tra từng cái, nên cứ bấm câu đầu là mấy câu sau mất trắng. Nay có kho nháp: số chưa nộp được giữ khi dựng lại và khi đổi cấp độ, nộp xong thì nháp câu đó bị bỏ.
5. **Nháp rò giữa hai bạn (13/10).** Sau lỗi 4, một bạn quay lại cổng ghi tên rồi gọi bạn khác vào làm — **màn hình vẫn hiện số bạn trước vừa gõ dở**, và bạn mới rất dễ bấm *Kiểm tra* luôn vào số đó (mỗi câu chỉ được ghi nhận 1 lần, nên đây là mất điểm thật). Nay `clearDrafts()` xoá cả kho nháp lẫn ô trên màn hình ở cả hai đầu: lúc ghi tên mới và lúc quay lại cổng.
6. **Enter không dùng được + cột ngày giờ loạn (13/10).** Chỉ có ô ghi tên bắt được Enter, nên trẻ gõ số rồi bấm Enter thì không xảy ra gì. Nay mọi ô trả lời đều có nhánh `Enter` (phím khác vẫn bỏ qua). Cột "Ngày làm bài" trước sinh bởi `toLocaleString('vi-VN')` — Chrome trả `12:34:54 13/10/2026` (giờ trước ngày) và thứ tự đổi theo máy; nay tự ghép `13/10/2026 12:34`.

### Luồng Mục 5 chạy thật trong trình duyệt (12–13/10/2026)

Tên sai ("An") bị chặn; alias `giang` → Trà Giang, `gialinh` → Gia Linh; làm đủ 16/16 bằng nút *Kiểm tra* thật; câu đã ghi nhận thì ô nhập biến mất và gọi lại hàm chấm cũng không đổi (vẫn 23/Sai); cấp ôn 1 bấm Kiểm tra lại bao nhiêu lần cũng được và **không** ghi vào attempts; 13/16 → 81% → 2★; báo cáo có đúng 3 khối lời sai, không còn ô nhập; không tràn ngang; console sạch (chỉ còn cảnh báo Tailwind CDN).

Bản 13/10 chạy lại toàn bộ vòng làm bài và đo thêm: gõ 3 ô ở Cấp độ 4 → bấm *Kiểm tra* ô đầu → **2 ô còn vẫn giữ 257 và 999** (trước đây mất trắng); bấm Enter ở ô thứ hai ghi nhận luôn (phím `x` thì không); đổi sang Cấp độ 5 rồi quay lại Cấp độ 4, ô gõ dở vẫn còn; quay lại cổng tên rồi cho **Gia Linh** vào làm → màn hình sạch, `Đã ghi nhận 0/16`. Nộp bài thật: payload 8 field nguyên vẹn, `Ngày làm bài = 13/10/2026 12:38`, `Lời sai = "Bài 7.5: 5834 − 996 — em ghi 4800, đáp án đúng 4838"`, `Đáp án = "Bài 4.1 = 27 (đúng) | ... "` (tiếng Việt có dấu đầy đủ, dấu `-` trong `64 − 37` không vỡ). **Chặn `form.submit()` trước khi nộp nên không có request nào tới Google** — iframe vẫn `about:blank`, `performance` chỉ ghi mỗi font CDN, **Sheet của thầy không thêm dòng nào**.

Payload nộp bài được **bắt ngay tại trang** (thay `HTMLFormElement.prototype.submit`) nên không có request nào thật gửi đi — iframe vẫn là `about:blank`, Sheet không nhận rác. Payload gồm `_charset_=utf-8` + 8 `entry.*` với tên đúng: `Mai` · `23:48:54 12/10/2026` · `13` · `16` · `2` · lời sai 3 dòng · `81%` · đáp án 16 dòng.

Trước đó **đã bắn thật vào Google Form** (12/10/2026): một POST ẩn danh từ `curl` trả về 200 và Sheet nhận đúng 1 dòng với cả 8 ô khớp cột; một POST thứ hai gửi từ chính trang Pages qua hàm `sendResult` cũng vào Sheet, dấu tiếng Việt nguyên vẹn. **Hai dòng test đó vẫn nằm trong Sheet** — hôm 12/10 đã bấm xoá trong màn hình Form, nhưng xoá ở Form **không xoá dòng trong Sheet** (chỉ giảm chữ "số câu trả lời" của Form). Muốn dọn phải chuột phải vào **số dòng** trong Sheet → *Xoá hàng*. Số liệu duy nhất đáng tin là Sheet, đừng tin bộ đếm của Form.

## Hạn chế đã biết

- Level 4–6 của bài 1 chỉ luyện **trừ** cột dọc; chưa có **cộng** cột dọc.
- Bài 1 phụ thuộc `cdn.tailwindcss.com`: mở khi mất mạng và chưa cache thì giao diện vỡ.
- Bài 2 chưa nối Google Form (điểm chỉ hiện trên màn hình, thầy không nhận được) và sơ đồ tư duy rộng 960px nên trên điện thoại phải kéo ngang.
- File tĩnh không xác nhận được Google đã nhận hay chưa, và không khoá được học sinh làm lại lần hai.
