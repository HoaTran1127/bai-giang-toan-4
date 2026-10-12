# Bài giảng Toán lớp 4 — HTML trực quan

Mỗi bài là **một file HTML độc lập**, mở bằng cách double-click, không cần cài đặt, không cần build.

## Danh sách bài

| Bài | File | Nội dung |
|---|---|---|
| Cộng trừ nhẩm qua 10 & dấu chấm nhớ | [`bai-giang-cong-tru-nham/index.html`](bai-giang-cong-tru-nham/index.html) | Cặp Bạn Thân 10 → trừ nhẩm → cộng nhẩm → đặt tính cột dọc với dấu chấm (•) → luyện tập 7 cấp độ |

## Cách dùng trên lớp

1. Mở file HTML bằng Chrome / Edge (khuyến nghị) hoặc Cốc Cốc.
2. Trang dùng Tailwind CDN + Google Fonts, cần mạng cho **lần mở đầu**; các lần sau dùng cache. Muốn chạy hoàn toàn offline thì inline CSS (xem mục Hạn chế).
3. Giáo viên chạy lần lượt Mục 1 → 5; học sinh tự làm ở Mục 5.

## Cấu trúc bài "Cộng trừ nhẩm qua 10"

| Mục | Nội dung | Cơ chế |
|---|---|---|
| 1 | Bảng 5 Cặp Bạn Thân 10 (1–9, 2–8, 3–7, 4–6, 5–5) | 5 thẻ số đối xứng |
| 2 | Trừ qua 10: phân tích bằng sơ đồ 3 bước | 4 ví dụ đổi được: 16−8, 15−7, 13−9, 14−6 |
| 3 | Cộng qua 10: tách số bù tròn chục | 4 ví dụ đổi được: 6+8, 7+9, 5+8, 8+7 |
| 4 | Đặt tính cột dọc — dấu chấm (•) đặt **ngay sát chân chữ số trừ** ở cột bên trái | 3 mẫu có nút lùi/tới theo cột: 53−28, 432−178, 1000−347 |
| 5 | Luyện tập 7 cấp độ, 30 câu | Tự nhập đáp án; sai → mở bảng chẩn đoán từng cột đúng chuẩn Mục 4 |

## Quy tắc sư phạm cốt lõi

- **Mượn ở cột nào → chấm (•) vào sát chân số trừ của cột kế bên trái** (không đánh trên đầu).
- **Thấy chân số có chấm → tự tăng thêm 1 trước khi trừ tiếp.**
- Chữ số 0 đứng đầu kết quả **không viết**.
- Dấu chấm rơi vào ô trống (số trừ ít chữ số hơn) → coi như 1, vẫn hiện chữ 0 mờ để dấu chấm có chỗ bám.

## Kiểm định đã chạy

Toàn bộ đáp số được dò tự động trong trình duyệt: 11 bài đặt tính (bảng chẩn đoán khớp đáp số lưu trong file và khớp kết quả thật), 4 mẫu trừ nhẩm, 4 mẫu cộng nhẩm, 5 bài tính nhanh cấp độ 7. Không có lỗi console.

## Hạn chế đã biết

- Level 4–6 chỉ luyện **trừ** cột dọc; chưa có **cộng** cột dọc.
- Phụ thuộc `cdn.tailwindcss.com`: mở khi mất mạng và chưa cache thì giao diện vỡ.
