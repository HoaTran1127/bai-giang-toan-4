# Bài giảng Toán lớp 4 — HTML trực quan

Mỗi bài là **một file HTML độc lập**, mở bằng cách double-click, không cần cài đặt, không cần build.

## Danh sách bài

| Bài | File | Nội dung |
|---|---|---|
| Cộng trừ nhẩm qua 10 & dấu chấm nhớ | [`bai-giang-cong-tru-nham/index.html`](bai-giang-cong-tru-nham/index.html) | Cặp Bạn Thân 10 → trừ nhẩm → cộng nhẩm → đặt tính cột dọc với dấu chấm (•) → luyện tập 7 cấp độ |

## Cách dùng trên lớp

1. Mở file HTML bằng Chrome / Edge (khuyến nghị) hoặc Cốc Cốc.
2. Trang dùng Tailwind CDN + Google Fonts, cần mạng cho **lần mở đầu**; các lần sau dùng cache. Muốn chạy hoàn toàn offline thì inline CSS (xem mục Hạn chế).
3. Giáo viên chạy lần lượt Mục 1 → 4; Mục 5 mỗi học sinh **làm một lần rồi nộp**, kết quả tự gửi về bảng điểm của cô.

## Cấu trúc bài "Cộng trừ nhẩm qua 10"

| Mục | Nội dung | Cơ chế |
|---|---|---|
| 1 | Bảng 5 Cặp Bạn Thân 10 (1–9, 2–8, 3–7, 4–6, 5–5) | 5 thẻ số đối xứng |
| 2 | Trừ qua 10: phân tích bằng sơ đồ 3 bước | 4 ví dụ đổi được: 16−8, 15−7, 13−9, 14−6 |
| 3 | Cộng qua 10: tách số bù tròn chục | 4 ví dụ đổi được: 6+8, 7+9, 5+8, 8+7 |
| 4 | Đặt tính cột dọc — dấu chấm (•) đặt **ngay sát chân chữ số trừ** ở cột bên trái | 3 mẫu có nút lùi/tới theo cột: 53−28, 432−178, 1000−347 |
| 5 | Luyện tập 7 cấp độ, 30 câu — **chấm điểm 16 câu cấp 4·5·6·7, mỗi bạn chỉ làm 1 lần** | Gõ tên (Mai / Gia Linh / Trà Giang) → làm → nộp → **kết quả tự gửi về bảng điểm của cô**; chỉ còn hiện điểm + lời sai |

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
- Không còn khoá máy: tin vào **cô nhận được kết quả**. Trang chỉ báo "✅ Đã gửi" khi đã bắn request đi, chứ file tĩnh **không đọc được phản hồi** của Google nên không thể xác nhận chắc chắn.
- Muốn một bạn làm lại: cô **xoá dòng của bạn đó** trên Sheet (hoặc ghi chú đã kiểm tra). Học sinh tải lại trang là làm lại được — đây là giới hạn cố hữu của file tĩnh không có server.

## Cài nơi nhận kết quả (một lần, ~3 phút)

1. Tạo Google Form với **8 câu Short answer**, đúng thứ tự và tên:
   `ten` · `ngay` · `dung` · `tong` · `sao` · `phanTram` · `loiSai` · `dapAnCuaEm`
2. Form → **Send** → biểu tượng link → copy URL dạng `https://docs.google.com/forms/d/e/XXXX/viewform`, đổi đuôi thành `/formResponse`.
3. Mở form ở chế độ nhập, F12, tìm `name="entry.123456789"` của từng câu theo đúng thứ tự trên.
4. Sửa 2 chỗ trong `bai-giang-toan-4/bai-giang-cong-tru-nham/index.html` (sửa ngay trên GitHub bằng nút pencil cũng được):

```js
const FORM_ENDPOINT = 'https://docs.google.com/forms/d/e/XXXX/formResponse';
const ENTRY = { ten:'entry.NNN', ngay:'entry.NNN', dung:'entry.NNN', tong:'entry.NNN',
                sao:'entry.NNN', phanTram:'entry.NNN', loiSai:'entry.NNN', dapAnCuaEm:'entry.NNN' };
```

Chỉ cần đổi `FORM_ENDPOINT` (bắt đầu bằng `http`) là nút gửi bật sáng; để nguyên chuỗi `DÁN_LINK_FORM_VAO_DAY` thì trang vẫn làm được và chỉ báo "chưa gửi".

## Mở bằng link (không cần tải file)

Trang được bật **GitHub Pages**, học sinh chỉ cần bấm link:

```
https://hoatran1127.github.io/bai-giang-toan-4/bai-giang-cong-tru-nham/
```

Sửa trực tiếp trên GitHub: vào file → nút bút chì → sửa → **Commit** (thoả thuận `separate review commits`), Pages cập nhật trong ~1 phút.

## Kiểm định đã chạy

Toàn bộ đáp số được dò tự động trong trình duyệt: 11 bài đặt tính (bảng chẩn đoán khớp đáp số lưu trong file và khớp kết quả thật), 4 mẫu trừ nhẩm, 4 mẫu cộng nhẩm, 5 bài tính nhanh cấp độ 7 — cả 16 câu được chấm đều khớp phép tính độc lập.

Luồng Mục 5 đã chạy thật trong trình duyệt (bản 12/10/2026): tên sai bị chặn; alias "giang" → Trà Giang; ghi nhận đủ 16/16; bấm lại câu đã chấm không đổi điểm; câu để trống không mất lượt; 15/16 → 3★; báo cáo không còn ô nhập; không tràn ngang; console sạch (chỉ còn cảnh báo Tailwind CDN). **POST được kiểm chứng bằng máy chủ giả**: request gửi đi chứa đủ `_charset_=UTF-8` + 8 field `entry.*`, dấu tiếng Việt (`Trà Giang`, `−`) nguyên vẹn.

## Hạn chế đã biết

- Level 4–6 chỉ luyện **trừ** cột dọc; chưa có **cộng** cột dọc.
- Phụ thuộc `cdn.tailwindcss.com`: mở khi mất mạng và chưa cache thì giao diện vỡ.
- File tĩnh không xác nhận được Google đã nhận hay chưa, và không khoá được học sinh làm lại lần hai.
