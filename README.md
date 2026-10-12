# Bài giảng Toán lớp 4 — HTML trực quan

Mỗi bài là **một file HTML độc lập**, mở bằng cách double-click, không cần cài đặt, không cần build.

## Danh sách bài

| Bài | File | Nội dung |
|---|---|---|
| Cộng trừ nhẩm qua 10 & dấu chấm nhớ | [`bai-giang-cong-tru-nham/index.html`](bai-giang-cong-tru-nham/index.html) | Cặp Bạn Thân 10 → trừ nhẩm → cộng nhẩm → đặt tính cột dọc với dấu chấm (•) → luyện tập 7 cấp độ |

## Cách dùng trên lớp

1. Mở file HTML bằng Chrome / Edge (khuyến nghị) hoặc Cốc Cốc.
2. Trang dùng Tailwind CDN + Google Fonts, cần mạng cho **lần mở đầu**; các lần sau dùng cache. Muốn chạy hoàn toàn offline thì inline CSS (xem mục Hạn chế).
3. Giáo viên chạy lần lượt Mục 1 → 4; Mục 5 mỗi học sinh **chỉ làm một lần** (đã nộp là khoá trên máy đó).

## Cấu trúc bài "Cộng trừ nhẩm qua 10"

| Mục | Nội dung | Cơ chế |
|---|---|---|
| 1 | Bảng 5 Cặp Bạn Thân 10 (1–9, 2–8, 3–7, 4–6, 5–5) | 5 thẻ số đối xứng |
| 2 | Trừ qua 10: phân tích bằng sơ đồ 3 bước | 4 ví dụ đổi được: 16−8, 15−7, 13−9, 14−6 |
| 3 | Cộng qua 10: tách số bù tròn chục | 4 ví dụ đổi được: 6+8, 7+9, 5+8, 8+7 |
| 4 | Đặt tính cột dọc — dấu chấm (•) đặt **ngay sát chân chữ số trừ** ở cột bên trái | 3 mẫu có nút lùi/tới theo cột: 53−28, 432−178, 1000−347 |
| 5 | Luyện tập 7 cấp độ, 30 câu — **chấm điểm 16 câu cấp 4·5·6·7, mỗi bạn chỉ làm 1 lần** | Gõ tên (Mai / Gia Linh / Trà Giang) → làm → nộp → khoá; chỉ còn hiện điểm + lời sai |

## Quy tắc sư phạm cốt lõi

- **Mượn ở cột nào → chấm (•) vào sát chân số trừ của cột kế bên trái** (không đánh trên đầu).
- **Thấy chân số có chấm → tự tăng thêm 1 trước khi trừ tiếp.**
- Chữ số 0 đứng đầu kết quả **không viết**.
- Dấu chấm rơi vào ô trống (số trừ ít chữ số hơn) → coi như 1, vẫn hiện chữ 0 mờ để dấu chấm có chỗ bám.

## Quy tắc chấm điểm Mục 5

- Cổng vào duy nhất là **ô ghi tên**; nhận đúng ba bạn Mai / Gia Linh / Trà Giang (không dấu cũng được, "giang" → Trà Giang).
- Cấp 1·2·3 là **ôn**, bấm Kiểm tra bao nhiêu lần cũng được, không lưu.
- Cấp 4·5·6·7 = **16 câu chấm điểm**; mỗi câu chỉ **ghi nhận lần đầu**, ô nhập biến mất ngay sau khi bấm, bấm lại không đổi điểm.
- Nộp bài khi đủ 16 câu → **khoá vĩnh viễn**: chỉ còn điểm + sao + lời sai (kèm bảng chẩn đoán cột dọc), không có ô nhập, không có nút làm lại.
- Khoá ghi ở **2 nơi** (localStorage + IndexedDB); mỗi lần mở trang, nơi nào bị xoá sẽ được chép lại từ nơi còn lại → **tắt máy, mở lại, tải lại vẫn khoá**.
- Sao: 3★ từ 85% (≥14/16) · 2★ từ 60% (≥10) · 1★ từ 30% (≥5) · dưới 5 câu = 0★.
- **Máy chặn bộ nhớ thì không cho bắt đầu**: cổng ghi tên báo đỏ và khoá ô nhập — thà chưa làm còn hơn làm xong rồi làm lại được.
- Làm dở giữa chừng (chưa nộp) được giữ lại; tắt máy mở lại vẫn đúng các câu đã ghi nhận.
- Giới hạn còn lại của file tĩnh: xoá **cả hai** nơi lưu (Chrome: "Cookie và dữ liệu trang web được lưu"), hoặc mở bằng **máy khác / trình duyệt khác / cửa sổ ẩn danh** thì làm lại được. Muốn khoá tuyệt đối phải có server giữ điểm.

## Kiểm định đã chạy

Toàn bộ đáp số được dò tự động trong trình duyệt: 11 bài đặt tính (bảng chẩn đoán khớp đáp số lưu trong file và khớp kết quả thật), 4 mẫu trừ nhẩm, 4 mẫu cộng nhẩm, 5 bài tính nhanh cấp độ 7 — cả 16 câu được chấm đều khớp phép tính độc lập.

Luồng Mục 5 đã chạy thật trong trình duyệt: tên sai bị chặn; ghi nhận 16/16; bấm lại câu đã chấm không đổi điểm; câu để trống không mất lượt; nộp 13/16 → 2★, nộp 16/16 → 3★; **xoá sạch localStorage rồi tải lại → IndexedDB khôi phục khoá, vẫn chỉ xem được điểm**; tên thứ hai làm được bài mới; điểm toàn phần hiện khối "không sai câu nào"; báo cáo khoá không còn ô nhập; không tràn ngang; console sạch (chỉ còn cảnh báo Tailwind CDN).

## Hạn chế đã biết

- Level 4–6 chỉ luyện **trừ** cột dọc; chưa có **cộng** cột dọc.
- Phụ thuộc `cdn.tailwindcss.com`: mở khi mất mạng và chưa cache thì giao diện vỡ.
