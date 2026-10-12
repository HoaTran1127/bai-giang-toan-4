# Bài giảng Toán lớp 4 — HTML trực quan

Mỗi bài là **một file HTML độc lập**, mở bằng cách double-click, không cần cài đặt, không cần build.

## Danh sách bài

| Bài | File | Nội dung |
|---|---|---|
| Cộng trừ nhẩm qua 10 & dấu chấm nhớ | [`bai-giang-cong-tru-nham/index.html`](bai-giang-cong-tru-nham/index.html) | Cặp Bạn Thân 10 → trừ nhẩm → cộng nhẩm → đặt tính cột dọc với dấu chấm (•) → luyện tập 7 cấp độ |

## Cách dùng trên lớp

1. Mở file HTML bằng Chrome / Edge (khuyến nghị) hoặc Cốc Cốc.
2. Trang dùng Tailwind CDN + Google Fonts, cần mạng cho **lần mở đầu**; các lần sau dùng cache. Muốn chạy hoàn toàn offline thì inline CSS (xem mục Hạn chế).
3. Giáo viên chạy lần lượt Mục 1 → 4; Mục 5 mỗi học sinh **làm một lần rồi nộp**, kết quả tự gửi về bảng điểm của thầy.

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

## Nơi nhận kết quả (đã cài xong 12/10/2026)

Form và Sheet đang sống, thuộc tài khoản `minhtien07118904@gmail.com`:

| Thành phần | Địa chỉ |
|---|---|
| Bảng điểm (Google Sheet) | `Bảng điểm Cộng trừ nhẩm qua 10 — lớp 4 (Câu trả lời)` — mở từ tab **Câu trả lời** của form, nút "Xem trong Trang tính" |
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

Trang được bật **GitHub Pages**, học sinh chỉ cần bấm link:

```
https://hoatran1127.github.io/bai-giang-toan-4/bai-giang-cong-tru-nham/
```

Sửa trực tiếp trên GitHub: vào file → nút bút chì → sửa → **Commit** (thoả thuận `separate review commits`), Pages cập nhật trong ~1 phút.

## Kiểm định đã chạy

Toàn bộ đáp số được dò tự động trong trình duyệt: 11 bài đặt tính (bảng chẩn đoán khớp đáp số lưu trong file và khớp kết quả thật), 4 mẫu trừ nhẩm, 4 mẫu cộng nhẩm, 5 bài tính nhanh cấp độ 7 — cả 16 câu được chấm đều khớp phép tính độc lập.

Luồng Mục 5 đã chạy thật trong trình duyệt (bản 12/10/2026): tên sai bị chặn; alias "giang" → Trà Giang; ghi nhận đủ 16/16; bấm lại câu đã chấm không đổi điểm; câu để trống không mất lượt; 15/16 → 3★; báo cáo không còn ô nhập; không tràn ngang; console sạch (chỉ còn cảnh báo Tailwind CDN). **POST được kiểm chứng bằng máy chủ giả**: request gửi đi chứa đủ `_charset_=UTF-8` + 8 field `entry.*`, dấu tiếng Việt (`Trà Giang`, `−`) nguyên vẹn.

**Đã bắn thật vào Google Form** (12/10/2026): một POST ẩn danh từ `curl` (không cookie, không đăng nhập) trả về 200 và Sheet nhận đúng 1 dòng — "Câu trả lời 1" — với cả 8 ô khớp cột: `KIEM THU curl` · `12/10/2026, 24:10` · `14` · `16` · `2` · `Bai L.5.1: 72314-38658 em ghi 33657, dung 33656` · `88%` · `Bai L.4.1=27 (D) | Bai L.5.1=33657 (S)`. **Xoá dòng "KIỂM THỬ" này trước khi cho học sinh làm.**

## Hạn chế đã biết

- Level 4–6 chỉ luyện **trừ** cột dọc; chưa có **cộng** cột dọc.
- Phụ thuộc `cdn.tailwindcss.com`: mở khi mất mạng và chưa cache thì giao diện vỡ.
- File tĩnh không xác nhận được Google đã nhận hay chưa, và không khoá được học sinh làm lại lần hai.
