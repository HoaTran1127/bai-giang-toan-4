# Bài giảng Toán lớp 4 — HTML trực quan

Repo chung, **mỗi bài một thư mục**. Mỗi bài là một file HTML độc lập, mở bằng cách double-click hoặc bấm link Pages, không cần cài đặt, không cần build.

Trang cổng của repo: [`index.html`](index.html) — học sinh mở link này rồi chọn bài.

## Danh sách bài

| Bài | File | Nội dung | Kiểm định |
|---|---|---|---|
| 1. Cộng trừ nhẩm qua 10 & dấu chấm nhớ | [`bai-giang-cong-tru-nham/index.html`](bai-giang-cong-tru-nham/index.html) | Cặp Bạn Thân 10 → trừ nhẩm → cộng nhẩm → đặt tính cột dọc với dấu chấm (•) → luyện tập 7 cấp độ | `node kiem-dinh.js` (bên ngoài, xem mục Kiểm định) |
| 2. Thang 10 và Thang 100 — Đổi đơn vị đo lường | [`bai-giang-doi-don-vi/index.html`](bai-giang-doi-don-vi/index.html) | Bản đồ tư duy → 3 thang đo tương tác → đi xuống/đi lên hệ 10 → vuông trong vuông (hệ 100) → số đo kép → ngoài hệ 10 → luyện tập 7 cấp độ. **Không CDN, chạy cả khi ngắt mạng** | `selfTest()` chạy ngay khi mở trang |
| 3. Tổng và Hiệu — Tìm hai số | [`bai-giang-tong-hieu/index.html`](bai-giang-tong-hieu/index.html) | Bản đồ tư duy → 13 đề đủ dữ kiện, **kéo chip khoanh khung đặc vào sơ đồ** (số HIỆU nằm **TRONG đoạn cam** tô màu, ngay dưới cam là dấu ngoặc mở ngược lên ghi chữ **HIỆU** để chú thích đúng phần đó · TỔNG ở ngoặc tím, kéo cả 2 tên vào đầu hai đoạn thẳng, thả trúng cả miếng cam/vỏ ngoặc cũng nhận, kéo sai rung + **nói to** + cảnh báo đỏ) → kéo 2 tên + 2 số vào sơ đồ → chữ đậm chỉ gợi ý, tự săn TỔNG và HIỆU rồi điền vào sơ đồ → từ sơ đồ ra công thức (B1 → B4, máy tự chạy khi cuộn tới) → sáu dạng hay gặp (đưa chuột vào là thấy ví dụ) + bẫy "gấp 3 lần" → tự làm nháp rồi đối chiếu với **bài mẫu 3 bước** (sơ đồ → tìm hai số → thử lại bằng cây CỘNG · TRỪ) + bắt lỗi Bạn Gấu → luyện tập 7 cấp độ, 48 câu (cấp 1·2·3 có sơ đồ vẽ sẵn để kéo thả, cấp 4·5·6·7 chấm 24 câu thì không vẽ sơ đồ). **Không CDN, chạy cả khi ngắt mạng** | `selfTest()` chạy ngay khi mở trang (96 mục) |
| *(không phải trang học)* | [`kiem-dinh.js`](kiem-dinh.js) | Chạy `node kiem-dinh.js` sau mỗi lần sửa **bài 1**: tính lại toàn bộ đáp số, soi dấu chấm từng bước, thang sao, cổng tên, 8 field gửi về Sheet. Bộ kiểm định này viết riêng cho bài 1 — bài 2 và bài 3 tự kiểm bằng `selfTest()` trong trang. | — |

Chi tiết bài 2 (7 mục, 3 lỗi sư phạm đã sửa so với bản gốc, cách chỉnh) nằm trong [`bai-giang-doi-don-vi/README.md`](bai-giang-doi-don-vi/README.md).

## Cách dùng trên lớp

1. Mở file HTML bằng Chrome / Edge (khuyến nghị) hoặc Cốc Cốc.
2. Bài 1 dùng Tailwind CDN + Google Fonts, cần mạng cho **lần mở đầu**; các lần sau dùng cache. Bài 2 và bài 3 không cần mạng.
3. Giáo viên chạy lần lượt Mục 1 → 4; Mục 5 (bài 1) mỗi học sinh **làm một lần rồi nộp**, kết quả tự gửi về bảng điểm của thầy.

## Cấu trúc bài "Cộng trừ nhẩm qua 10"

| Mục | Nội dung | Cơ chế |
|---|---|---|
| 1 | Bảng 5 Cặp Bạn Thân 10 (1–9, 2–8, 3–7, 4–6, 5–5) | 5 thẻ số đối xứng |
| 2 | Trừ qua 10: phân tích bằng sơ đồ 3 bước | 4 ví dụ đổi được: 16−8, 15−7, 13−9, 14−6 |
| 3 | Cộng qua 10: tách số bù tròn chục | 4 ví dụ đổi được: 6+8, 7+9, 5+8, 8+7 |
| 4 | Đặt tính cột dọc — dấu chấm (•) đặt **ngay sát chân chữ số trừ** ở cột bên trái | 3 mẫu có nút lùi/tới theo cột: 53−28, 432−178, 1000−347 |
| 5 | Luyện tập 7 cấp độ, 30 câu — **chấm điểm 16 câu cấp 4·5·6·7, mỗi bạn chỉ làm 1 lần** | Gõ tên (Ban Mai / Gia Linh / Trà Giang) → làm → nộp → **kết quả tự gửi về bảng điểm của thầy**; chỉ còn hiện điểm + lời sai |

## Cấu trúc bài "Tổng và Hiệu — Tìm hai số"

| Mục | Nội dung | Cơ chế |
|---|---|---|
| 0 | Bản đồ tư duy 5 nhánh | bấm một nhánh là cuộn tới đúng mục |
| 1 | 13 đề văn đủ dữ kiện, **kéo 2 tên + 2 số vào sơ đồ** | đề in đầy đủ câu văn (bé đọc đề cho quen), dữ kiện quan trọng là **chip vàng khoanh sẵn** trong câu; mỗi thẻ có sơ đồ nhỏ vẽ theo **tỉ lệ thật** — số HIỆU thả vào ô **bên TRONG đoạn cam** tô màu, ngay dưới đoạn cam là dấu ngoặc **mở ngược lên** ghi chữ **HIỆU** (chú thích đúng phần vừa tô), số TỔNG vào **ngoặc tím**; bé **kéo chip vào ô** (điện thoại: bấm chip rồi bấm ô), không nút Kiểm tra; 11/13 đề có tên riêng ⇒ kéo thêm **2 chip tên vào đầu hai đoạn thẳng** (thanh dài = bạn nhiều hơn), 2 đề trừu tượng giữ nhãn "số bé / số lớn"; kéo sai → thẻ rung + viền đỏ + cảnh báo đúng chỗ ("hai số đổi chỗ: ngoặc tím ÔM CẢ HAI thanh nên là số CỘNG ra…", "nhãn này ghi TÊN"), đúng đủ 4 ô → máy giải thích cách làm, ô khoá, bộ đếm 13; 4 đề phải tự mở (TBC ×2, chu vi ÷2, cho nhau ×2, liên tiếp = 2) dùng chip dạng `45 × 2 = 90` — kéo vào ô chỉ là số 90, câu giữ nguyên phép tính in đậm; chip gợi ý gọn một dòng 24px đầu thẻ |
| 2 | 5 câu văn, **kéo thả vào sơ đồ** | mọi đề đều cho **đủ TỔNG và HIỆU**; sơ đồ cho sẵn hình dáng theo **tỉ lệ thật** (thanh dài/ngắn, đoạn cam chứa ô số HIỆU kèm ngoặc chú thích HIỆU bên dưới, ngoặc tím ghi **TỔNG**) với 4 ô trống: hai nhãn tên, ô HIỆU, ô TỔNG; bé **kéo 2 chip tên + 2 chip số** từ đề vào đúng ô (điện thoại: bấm chọn rồi bấm ô); kéo sai → rung + cảnh báo đúng chỗ ("thanh DÀI là người nhiều hơn", "nhãn này ghi TÊN — số thì kéo vào đoạn cam hoặc ngoặc tím"); đúng đủ 4 ô → máy giải thích; đoạn cam luôn khớp khít chỗ thanh ngắn thiếu |
| 3 | 4 đề "săn TỔNG · HIỆU" có chữ đánh lừa | chữ in đậm bấm vào **chỉ nghe gợi ý, không tự điền số**; bé tự tính TỔNG và HIỆU rồi điền vào đúng ô trên sơ đồ vẽ sẵn theo tỉ lệ thật — ô nhập HIỆU nằm **trong đoạn cam**, ô TỔNG trong ngoặc tím; đúng cả hai thì sơ đồ + lời giải hiện ra |
| 4 | **Từ sơ đồ ra công thức** 4 bước (vì sao phải ÷2) | đổi TỔNG và HIỆU bằng nút ±, xem hai thanh gối nhau theo **tỉ lệ thật**, cắt phần hơn → chia đôi → ghép lại; B1·B2·B4 giờ vẽ bằng **cùng một khuôn** với mọi sơ đồ khác (cam chứa số, ngoặc HIỆU ôm đúng cam), B3 là hai nửa bằng nhau nằm trọn trong cột "phần bằng nhau"; chặn hộ hai thế số hỏng: `(T − H)` lẻ và `H ≥ T` |
| 5 | Sáu dạng hay gặp + 1 bẫy | **đưa chuột vào (hoặc bấm) một thẻ là ví dụ mẫu có sơ đồ hiện ngay** — đề số thật + sơ đồ tỉ lệ thật + lời giải tự sinh (tuổi · cho nhau thì bằng · số liên tiếp · tổng giấu sau chu vi/trung bình cộng · **bẫy "gấp 3 lần" thuộc Tổng–Tỉ**) |
| 6 | **Một bài giải hoàn chỉnh** để đối chiếu | đề in gọn "**Hai số có TỔNG 120 và HIỆU 10**"; em tự làm vào nháp rồi đối chiếu với bài mẫu vẽ sẵn tại chỗ: **B1 · sơ đồ** (hai thanh tỉ lệ thật, số HIỆU nằm trong đoạn cam, dưới cam có ngoặc mở ngược lên ghi chữ HIỆU, ngoặc tím TỔNG) → **B2 · tìm hai số** `(120 − 10) ÷ 2 = 55`, `55 + 10 = 65` → **B3 · thử lại bằng hai phép** dưới dạng sơ đồ cây: CỘNG hai số ra TỔNG · TRỪ hai số ra HIỆU → **Đáp số**; không ô nhập, không nút Kiểm tra, không còn dòng "không có máy chấm ở mục này"; bên cạnh là 3 dòng **Bạn Gấu** để em bắt lỗi |
| 7 | Luyện tập 7 cấp, **48 câu** — **chấm 24 câu cấp 4·5·6·7, mỗi bạn 1 lần** | cổng tên 3 bạn → làm → nộp → báo cáo + lời giải chữa từng câu sai. **Cấp 1·2·3 (24 câu ôn): sơ đồ vẽ sẵn, kéo thả đủ 4 thẻ** (2 tên · số HIỆU vào đoạn cam · số TỔNG vào ngoặc tím). **Cấp 4·5·6·7 (24 câu chấm): KHÔNG vẽ sơ đồ**, bé tự vẽ vào vở. Bỏ nút "Đổi bạn" — chỉ còn nút "Ghi tên bạn khác" ở màn hình báo cáo |

Toàn bộ 48 câu **không gõ tay đáp số**: mỗi câu chỉ khai dữ kiện (`tong`, `hieu`, `a`+`b`, `tb`, `chuVi`, `nuaChuVi`, `cho`, `namSau`…), câu chữ sinh từ khuôn `{t}`/`{h}`/`{a}`/`{b}` và `tuKiem()` tính lại đáp số bằng một máy tính độc lập rồi so với số đã ghi — lệch chỗ nào là trang **tự chặn** và in lỗi lên đầu. Cùng máy đó chặn: `(T − H)` lẻ, hai số không cộng lại ra T, không trừ nhau ra H, số bé âm, **đáp số lộ ngay trong đề**, và **phần dữ kiện của đề (trước chữ "Hỏi") có chữ TỔNG/HIỆU** — tức là đề phải viết như bài toán thật, bé tự CỘNG ra TỔNG · tự TRỪ ra HIỆU.

## Quy tắc sư phạm cốt lõi

- **Mượn ở cột nào → chấm (•) vào sát chân số trừ của cột kế bên trái** (không đánh trên đầu).
- **Thấy chân số có chấm → tự tăng thêm 1 trước khi trừ tiếp.**
- Chữ số 0 đứng đầu kết quả **không viết**.
- Dấu chấm rơi vào ô trống (số trừ ít chữ số hơn) → coi như 1, vẫn hiện chữ 0 mờ để dấu chấm có chỗ bám.

## Quy tắc chấm điểm Mục 5

- Cổng vào duy nhất là **ô ghi tên**; nhận đúng ba bạn **Ban Mai** / Gia Linh / Trà Giang (không dấu cũng được, "giang" → Trà Giang, "mai" và "ban mai" → Ban Mai).
- Từ 16/10/2026 nhãn bạn đầu đổi thành **`Ban Mai`** (trước là `Mai`) → Sheet sẽ nhận dòng tên `Ban Mai`, **không tự gộp chung** với các dòng `Mai` cũ.
- Mỗi bạn có một **ảnh avatar** nằm ngay **sau** chữ tên trong 3 nút chọn tên, cạnh tên lúc làm bài và trên đầu bảng kết quả: Ban Mai = con rùa, Gia Linh = con tinh tinh, Trà Giang = cái hồ nước có con cá. Xem mục *Ảnh avatar 3 bạn* để đổi.
- Cấp 1·2·3 là **ôn**, bấm Kiểm tra bao nhiêu lần cũng được, không lưu.
- Cấp 4·5·6·7 = **16 câu được chấm**; mỗi câu chỉ **ghi nhận lần đầu** — bấm lại không đổi điểm, để trống thì chưa mất lượt.
- Nộp bài khi đủ 16 câu → trang dựng một **form ẩn POST thẳng về Google Form**, kết quả đổ vào Google Sheet. Sau đó chỉ còn điểm + sao + lời sai (kèm bảng chẩn đoán cột dọc), không có ô nhập.
- Sao: 3★ từ 85% (≥14/16) · 2★ từ 60% (≥10) · 1★ từ 30% (≥5) · dưới 5 câu = 0★.
- Không còn khoá máy: tin vào **thầy nhận được kết quả**. Trang chỉ báo "✅ Đã gửi" khi đã bắn request đi, chứ file tĩnh **không đọc được phản hồi** của Google nên không thể xác nhận chắc chắn.
- Muốn một bạn làm lại: thầy **xoá dòng của bạn đó** trên Sheet (hoặc ghi chú đã kiểm tra). Học sinh tải lại trang là làm lại được — đây là giới hạn cố hữu của file tĩnh không có server.
- **Tải lại trang giữa bài thì KHÔNG mất bài nữa** (15/10): tên, số câu đã ghi nhận, cấp đang đứng và cả số đang gõ được giữ trong `localStorage` của máy đó, mở lại là tiếp tục. Muốn làm lại vẫn được: bấm "Ghi tên bạn khác" (xoá sạch chỗ giữ này).

## Ảnh avatar 3 bạn

- Ba ảnh PNG 256×256 **cùng một bộ phong cách** (icon bo góc, nét viền đậm, mắt to, màu pastel), cất trong `anh-avatar/` của **từng bài**. Không vẽ bằng code, không link CDN → avatar vẫn hiện khi ngắt mạng.
- Ban Mai = `mai-rua.png` (con rùa) · Gia Linh = `gia-linh-tinh-tinh.png` (con tinh tinh) · Trà Giang = `tra-giang-ho-ca.png` (**cái hồ nước có con cá bơi**, không phải chỉ con cá).
- Avatar nằm **ngay sau chữ tên** trong 3 nút chọn tên (44–48px), rồi sau tên lúc làm bài (36–38px) và trên đầu bảng kết quả sau khi nộp (108–112px).
- **Đổi con khác cho một bạn**: đặt PNG mới vào `anh-avatar/`, sửa giá trị `anh:` trong `ROSTER` ở cả hai file `index.html`. Ảnh gốc 1024×1024 để ngoài repo, trong `bai tap/vibe_images/`. Thêm bạn mới thì thêm một dòng `{ key, label, alias, anh }` — `kiem-dinh.js` bắt đúng 3 bạn, có bạn thứ 4 phải sửa luôn `check('Danh sach ten = 3 ban', ...)`.

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

## Nơi nhận kết quả của bài 3 (nối xong 20/10/2026)

Form **"Bảng điểm Tổng và Hiệu — lớp 4"**, bản sao của form bài 1, đã **Xuất bản** (20/10/2026) nên học sinh chưa đăng nhập vẫn POST được:

| Thành phần | Địa chỉ |
|---|---|
| Endpoint bài giảng POST về | `https://docs.google.com/forms/d/e/1FAIpQLSe9nppKo4w-EsdBeDuasUa2Aot3fuus7b_6lBkMQdE0A748Uw/formResponse` |
| Xem biểu mẫu | chính link trên, đổi `/formResponse` → `/viewform` |
| Sheet nhận dòng | **chưa nối** — thầy mở tab *Câu trả lời* rồi bấm "Liên kết với Trang tính" |

8 câu hỏi giữ nguyên thứ tự của form bài 1 nên **`entry.*` trùng hệt** (bản sao giữ id) — hai bài vẫn rơi vào hai form khác nhau, không lẫn bảng điểm. Đã xác minh từng cặp bằng 3 dòng nộp thử có nhãn (`OTH-*`, `E-*`, `MÁY KIỂM TRA…`) rồi đọc lại trong tab *Câu trả lời*: `entry.2005620554`=Tên em · `entry.509135542`=Ngày làm bài · `entry.2028471663`=Số câu đúng · `entry.275147971`=Tổng số câu được chấm · `entry.1045781291`=Số sao · `entry.1065046570`=Lời sai của em · `entry.1166974658`=Tỉ lệ % · `entry.839337160`=Đáp án em đã ghi. Tiếng Việt có dấu gửi đi đúng nhờ `_charset_=utf-8`.

**Ba chế độ ở mục trên vẫn phải giữ nguyên** (đặc biệt *Giới hạn ở 1 lần trả lời = TẮT*), và `tuKiem()` trong trang giờ kiểm luôn 8 ô `entry.*` — thiếu hoặc trùng id là trang tự chặn ngay khi mở.

## Mở bằng link (không cần tải file)

Repo bật **GitHub Pages**, mỗi bài một thư mục. Gửi cho học sinh link cổng rồi để em chọn bài:

```
https://hoatran1127.github.io/bai-giang-toan-4/                 (trang cổng, chọn bài)
https://hoatran1127.github.io/bai-giang-toan-4/bai-giang-cong-tru-nham/   (bài 1)
https://hoatran1127.github.io/bai-giang-toan-4/bai-giang-doi-don-vi/      (bài 2)
https://hoatran1127.github.io/bai-giang-toan-4/bai-giang-tong-hieu/       (bài 3)
```

Bài 2 trước đây ở repo riêng `bai-giang-doi-don-vi`; từ 14/10/2026 bản **mới nhất (79 970 byte, sửa 13/10) đã chuyển vào đây**, repo cũ không còn là bản gốc nữa.

Sửa trực tiếp trên GitHub: vào file → nút bút chì → sửa → **Commit** (thoả thuận `separate review commits`), Pages cập nhật trong ~1 phút.

## Bài 2 còn thiếu gì

- **Chưa nối bảng điểm**: `FORM_ENDPOINT` và `ENTRY` trong `bai-giang-doi-don-vi/index.html` đang để trống nên trang chấm ra điểm + sao nhưng **không gửi về Sheet**. Cơ chế gửi của bài 2 là `fetch(..., mode: 'no-cors')` + `FormData`. Muốn nối: nhân bản form bài 1, lấy 8 `entry.*` của bản mới, điền rồi chạy lại.
- Bài 2 vẫn hiện nút Nộp bài và báo cáo điểm bình thường khi endpoint trống (`SEND_READY` kiểm tra chuỗi bắt đầu bằng `http`), chỉ khác dòng báo: "⚠ chưa gắn link bảng điểm nên kết quả CHƯA gửi đi được".
- **Bài 3 đã nối Form xong (20/10)**, chỉ còn thiếu bước *Liên kết với Trang tính* trong màn hình Form — xem mục "Nơi nhận kết quả của bài 3" ở trên.

## Kiểm định đã chạy

### Bài 1 — `node kiem-dinh.js`

**Bộ kiểm định tự động nằm trong repo: `node kiem-dinh.js`** (cần Node; chạy xong in `KHONG PHAT HIEN LOI` và exit 0). Nó nạp `<script>` của trang bằng `vm` (không cần trình duyệt) rồi tính lại mọi thứ **bằng đường riêng**, không đọc đáp số trong file để so với chính nó:

- **30/30 câu**: mỗi đề bài được đọc lại thành phép tính rồi tính lại; cả 16 câu chấm điểm đều khớp.
- **Lời giải mẫu (expText)**: mọi câu "Bạn thân của X là Y" phải đủ 10, mọi câu "Tách Z = A + B" phải đúng tổng, cấp 2 phải ra theo công thức *bạn thân + số lẻ*, cấp 3 theo *10 + phần còn lại*.
- **3 mẫu Mục 4**: từng bước phải hiện đúng các chữ số đã tính (chữ số 0 đứng đầu không viết) và **dấu chấm phải rơi đúng vào các cột mà phép mượn thực tế cần**; mọi phương trình trong lời giải bước đều đúng.
- **11 bài đặt tính cấp 4·5·6·7**: dựng bảng chẩn đoán, đọc lại từng ô → kết quả hiển thị khớp đáp số và khớp hiệu số thật; **số dấu chấm bằng đúng số lần mượn**; lời giải phải bắt đầu từ *Cột Đơn vị*.
- **Thang sao**: 14/16 → 3★, 13 → 2★, 10 → 2★, 9 → 1★, 5 → 1★, 4 → 0★, 16 → 3★ (không bao giờ vượt 3).
- **Cổng tên**: nhận `Ban Mai/MAI/mai/ban mai/BanMai`, `gialinh/Gia Linh/Linh`, `Trà Giang/tra giang/giang`; chặn `An`, `Trang`, `Mai Linh`, `Linh Giang`, tên rỗng.
- **8 field gửi về Sheet**: khớp tên miền `entry.*`, không trùng id, endpoint đúng dạng `formResponse`.
- **Ô trả lời**: số em đã gõ nhưng chưa bấm Kiểm tra phải được **lưu lại** khi trang dựng lại danh sách (và khi đổi cấp độ), ô chưa gõ thì không được gắn giá trị lạ; mỗi ô có nhánh `Enter`; giá trị lưu bị lọc còn chữ số; đổi sang bạn khác thì màn hình **sạch hoàn toàn**.
- **Cột "Ngày làm bài"**: luôn ra dạng `dd/MM/yyyy HH:mm` (không phụ thuộc ngôn ngữ trình duyệt của từng máy).
- **Giữ bài làm dở**: có `localStorage` giả trong bộ nạp, nặn một bài đã ghi nhận 2 câu ở cấp 6 + số đang gõ, rồi gọi `moLaiBai()` → phải trả về đúng bạn, đúng số câu, đúng cấp, đúng ô nháp; tên lạ → bỏ; JSON vỡ → bỏ; trình duyệt chặn `localStorage` (ẩn danh/`file://`) → `luuBai()` trả `false` chứ **không được ném lỗi** làm hỏng bài; `backToGate()` phải xoá sạch key (chống bạn sau ăn bài bạn trước).

### Bài 2 — `selfTest()` chạy trong trang

Bài "Thang 10 và Thang 100" tự dò lại **28 đáp số** trong ngân hàng câu hỏi bằng một máy đổi tỷ lệ độc lập (`quiTo` dựa trên đơn vị gốc mm / g / mm²), cộng thêm **12 cặp bậc ×10** và **3 cặp bậc ×100**. Lệch bất kỳ đâu → trang tự chặn và in danh sách lỗi lên đầu trang. Trạng thái hiện tại: `28/28 đáp số khớp · 12 cặp ×10 · 3 cặp ×100`.

### Bài 3 — `selfTest()` chạy trong trang

`tuKiem()` chạy **96 mục**. Khung gốc (64 mục, viết 19/10) gồm: 28 câu luyện tập (máy tính lại từng đáp số + đối chiếu `ans` đã ghi), 6 dạng mẫu, 4 đề săn T·H (mỗi đề phải có đủ ô T, ô H, ít nhất một chữ đánh lừa và đủ 2 nhãn tên cho sơ đồ), 13 từ tín hiệu, 5 câu điền vào sơ đồ (mỗi câu phải có 2 tên đáp án; ô lệch ↔ đáp HIỆU, ngoặc ↔ đáp TỔNG phải khớp nhau; hai thanh bằng nhau thì tuyệt đối không ô lệch), 3 dòng Bạn Gấu (đúng 1 dòng sai), hằng số THỬ phải ra số nguyên (TỔNG − HIỆU chẵn, HIỆU < TỔNG), 9 khung `id` mà máy vẽ cần, và 2 thế số của máy cắt thanh. Từ 19/10/2026 nó **đo luôn hình học của từng sơ đồ** bằng đúng hàm vẽ (`kichThuoc`): thanh dài + ô lệch phải trọn 100% cột, hai thanh phải **khớp khít** nhau (thanh ngắn dừng đúng chỗ ô lệch bắt đầu), ô lệch phải bằng tỉ lệ thật `1 − bé/lớn` của **cả 30 cặp số** trong trang (cho phép dày lên ≤4 điểm để dễ đọc, tuyệt đối không được nhỏ hơn thật), TỔNG phải là `class="ngoac"` ôm hai thanh chứ không còn là `class="gao"` nằm dưới một thanh, và mọi ô của "phần bằng nhau" phải rộng đúng `1/n` lớn nhất. Nó **kiểm cả cấu trúc HIỆU theo luật hiện hành (vòng 47)**: số HIỆU phải nằm **TRONG** đoạn cam (`class="lech kep"…`) và ngay dưới cam là hàng chú thích `.chu > i + b` mở ngược lên ghi chữ HIỆU; bất kỳ sơ đồ nào còn kiểu cũ (`.ngoac.hieu` đứng riêng ngoài sơ đồ, nhãn `.lt`, sàn `--minl`) là báo lỗi ngay — áp cho **mọi** sơ đồ, kéo-thả (Mục 1 · 2 · 3) lẫn máy vẽ chung `soDoCot` (định nghĩa · Mục 4 · 5 · 6). Vòng 51 thêm luật **ngoặc tím chỉ ôm đúng N hàng thanh** (không được chạm hàng chú thích HIỆU), vòng 52 thay sàn cứng bằng sàn theo **số chữ số** (`sanCamPx`/`lechCw`), vòng 53 thêm **lưới khổ 320/420/760px** (thanh ≥140px, chữ không bị cắt, % cam lệch ≤6 điểm so với tỉ lệ thật), vòng 54 cộng nhóm `luoiKhau`. Trạng thái hiện tại: **`96 mục khớp · 48 câu luyện tập (24 câu chấm) được máy tính lại đáp số`**, `#self-test-alert` ẩn, console sạch.

Vòng luyện tập đã chạy thật trong trình duyệt (mục kiểm tra 21/10 ở dưới là bản hiện hành): tên lạ ("Lan Hoang") bị chặn; `trà giang` gõ dấu + phím **Enter** vào cổng → đúng bạn; avatar `naturalWidth > 0`; cấp 1 bấm Kiểm tra lại nhiều lần được, cấp 4·5·6·7 nạp lần hai **không** đổi điểm; "Ghi tên bạn khác" → về cổng và `localStorage` sạch (`runState = null`). Lời chữa từng câu sai ở cấp 4–7 **không kèm sơ đồ** (vòng 49).

### Bảy lỗi đã tìm ra và sửa (12–15/10/2026)



1. **Mẫu 3 (1 000 − 347) ở Mục 4 vẽ thiếu dấu chấm ở cột nghìn.** Ba bước trước đều chấm đúng quy tắc, nhưng bước cuối mượn 1 nghìn thì không có dấu chấm nào — trong khi bảng chẩn đoán (học sinh sai sẽ thấy) lại chấm vào ô trống cột nghìn. Hai chỗ dạy không giống nhau. Nay Mẫu 3 hiện chữ 0 mờ + dấu chấm ở ô trống và có thêm dòng "Cột nghìn: 1 − 1 = 0 ➔ chữ số 0 đứng đầu không viết".
2. **Bảng chẩn đoán xếp lời giải ngược.** Nó in ra từ cột cao nhất xuống cột đơn vị, tức **ngược** với thứ tự trẻ thực hiện. Nay in theo thứ tự nhẩm: Cột Đơn vị trước, lần lượt sang trái (11/11 bài).
3. **Dòng "Lời sai" gửi về Sheet bị dính dấu `=` thừa**, ví dụ `Bai 7.5: 5834 − 996 = em ghi 4800`. Nay sạch: `Bài 7.5: 5834 − 996 — em ghi 4800, đáp án đúng 4838`.
4. **Mất đáp án trẻ đã gõ (13/10).** Mỗi lần bấm *Kiểm tra* ở câu được chấm, trang dựng lại cả danh sách 16 câu — **mọi ô khác bị xoá sạch số đang gõ dở**. Trẻ thường gõ liền 3–4 ô rồi bấm kiểm tra từng cái, nên cứ bấm câu đầu là mấy câu sau mất trắng. Nay có kho nháp: số chưa nộp được giữ khi dựng lại và khi đổi cấp độ, nộp xong thì nháp câu đó bị bỏ.
5. **Nháp rò giữa hai bạn (13/10).** Sau lỗi 4, một bạn quay lại cổng ghi tên rồi gọi bạn khác vào làm — **màn hình vẫn hiện số bạn trước vừa gõ dở**, và bạn mới rất dễ bấm *Kiểm tra* luôn vào số đó (mỗi câu chỉ được ghi nhận 1 lần, nên đây là mất điểm thật). Nay `clearDrafts()` xoá cả kho nháp lẫn ô trên màn hình ở cả hai đầu: lúc ghi tên mới và lúc quay lại cổng.
6. **Enter không dùng được + cột ngày giờ loạn (13/10).** Chỉ có ô ghi tên bắt được Enter, nên trẻ gõ số rồi bấm Enter thì không xảy ra gì. Nay mọi ô trả lời đều có nhánh `Enter` (phím khác vẫn bỏ qua). Cột "Ngày làm bài" trước sinh bởi `toLocaleString('vi-VN')` — Chrome trả `12:34:54 13/10/2026` (giờ trước ngày) và thứ tự đổi theo máy; nay tự ghép `13/10/2026 12:34`.
7. **"Làm xong cấp 6 thì bị văng ra" (15/10) — mất trắng bài đang làm.** Học sinh phản ánh vậy. Kiểm trên bản live: cấp 4·5·6·7 chạy sạch (16/16 ghi nhận, 0 exception, cả trên màn 360px), nên không phải lỗi chấm bài. Nguyên nhân thật: **trang không lưu gì cả** (`localStorage` trống 0 key), nên chỉ cần điện thoại giải phóng tab lúc chuyển app, kéo để tải lại, hoặc bấm nhầm nút làm mới là `runState = null` — các em quay lại gặp đúng cổng ghi tên, 11 câu đã làm bay sạch và thầy không nhận được kết quả. Cấp 6 là lúc bài đã dài ~10 phút nên dễ bị đánh bật nhất. Nay trang **giữ hộ bài làm dở** (`luuBai()` vào `bg4-giu-bai-lam-do`): mở lại là tiếp tục đúng cấp đang đứng, số đang gõ cũng còn, kèm dòng chữ "↩ Trang vừa được mở lại, nên thầy giữ hộ em 11 câu đã ghi nhận". Nộp rồi thì mở lại hiện thẳng báo cáo cũ. **Đây không phải khoá máy** — bấm "Ghi tên bạn khác" là xoá sạch (`xoaBai()`), bạn sau không thấy bài bạn trước.

### Lỗi hình học của sơ đồ đoạn thẳng — bài 3 (19/10/2026)

Học sinh nhìn ra trước người lớn. Em chụp màn hình MỤC 2 câu "Anh hơn em 5 tuổi" và chỉ ra: *"phần hơn chỉ tô một miếng nhỏ thôi, mà chỗ đó vẽ dài hơn nhiều, rồi tô luôn đoạn ngắn là sai; còn 'tất cả' thì phải ngoặc hai thanh ở bên ngoài rồi ghi tổng"*. Đo bằng `getBoundingClientRect()` trên trang thật, cả hai lỗi đều có thật và **sai ở mọi sơ đồ trong bài**, không riêng tranh đó. Quét lại cả lớp lỗi này còn tìm ra chỗ thứ ba:

8. **Ô lệch dài hơn phần thanh ngắn thiếu ⇒ hai thanh không khớp.** `veSoDo` vẽ cứng "thanh dài = 60%, miếng lệch = 20%" nhưng thanh ngắn lại cắt ở 40%, nên thanh ngắn **kết thúc sớm hơn 20% trước khi miếng cam bắt đầu**. Trẻ đọc theo quy tắc "đoạn cam là chỗ em thiếu" thì thấy khoảng trống trắng giữa hai thanh → hiểu sai hẳn bản chất Tổng–Hiệu. Nay một hàm `kichThuoc(cfg)` là nguồn duy nhất: ô lệch lấy **tỉ lệ thật** `P = round(100 × (1 − bé/lớn))` (chặn 8–85% để số còn đọc được), thanh dài = `100 − P` phần đặc + `P` cam, thanh ngắn = đúng `100 − P`. Ba cặp số đã đo lại: `55/65` → 15%, `24/36` → 33%, `40/60` → 33% — khớp 100%. Toàn bộ 8 chỗ vẽ (MỤC 2 · 3 · 4 · 5 · lời giải luyện tập) đều gọi qua hàm này.
9. **TỔNG vẽ bằng "gai" ⊓ nằm dưới MỘT thanh.** Gai đó dài bằng *số lớn*, tức là dạy sai: tổng của hai số không nằm gọn dưới một thanh. Nay `.ngoac` là dấu **ngoặc vuông quay ra phải, đặt ở CỘT NGOÀI hai thanh**, `align-self: stretch` nên ôm đúng từ mép trên thanh đầu tới mép dưới thanh sau (đo: `y = -2182 → -2106`, khớp tuyệt đối với cột `.cots`), kế bên là nhãn `TẤT CẢ 120`. Máy cắt thanh B2 dùng cùng kiểu ngoặc cho `T − H`.
10. **Hàng "phần bằng nhau" và hàng ghép B4 không lấp khít cột.** `vePhan(1,3)` tính bề rộng ô bằng `(100 − (n−1)×3)/n` — trừ **3 phần trăm** trong khi khe hở thật là **3 pixel**, nên hàng 3 ô chỉ chiếm 336/352px, ngoặc "TẤT CẢ 4 PHẦN" ôm cả khoảng trống. B4 của máy cắt ghép `71% + 4px + 29%` = tràn cột 4px, trình duyệt phải co (`flex-shrink`) nên mép phải hai hàng lệch nhau. Nay dùng `calc()` đúng đơn vị: `width:calc((100% - (n-1)*3px)/n)` và `width:calc(29% - 4px)`. Đo lại: bé `124→240`, lớn `124→240 | 243→358 | 361→476` — ô đầu của hai hàng **trùng khít từng pixel**, hàng 3 ô kết thúc đúng mép cột; B4 `110→483 + 487→635` khớp hàng số lớn `110→635`.

Cả ba đều được đóng chốt thành điều kiện trong `tuKiem()` để lần sau sửa design không được tái phạm.

### 11 chỗ học sinh đánh dấu trên trang — bài 3 (19/10/2026, chiều)

Em dùng công cụ chọn phần tử trên chính trang và để lại 11 lời phàn nàn. Gom về **bốn quy tắc** đã áp dụng cho cả trang:

11. **Cấm viết tắt `T` / `H` trên mọi chỗ học sinh nhìn thấy.** Có tới **6/11** lời phàn nàn chỉ đúng một lỗi này: *"tổng hiệu đừng ghi tắt"*, *"đừng ghi tắt học sinh sẽ lạc"*. Trang trước đó viết `Săn T · H`, `(T − H) ÷ 2`, `Có chữ là T, có chữ là H`, `TỔNG (T)`, `H=20`, `dh: 'T,H rõ'`… Nay tất cả là **TỔNG** và **HIỆU** đầy đủ, kể cả nhãn trên ô lệch (`HIỆU = 20`) và ngoặc (`TỔNG − HIỆU = 100`). Đã quét lại bằng regex tìm token `T`/`H` đứng một mình: **0 kết quả**. Tên biến trong code (`s.tong`, `may.h`, `slot-t-`) giữ nguyên.
12. **Thẻ từ tín hiệu phải nói còn phải làm gì, bằng số cụ thể.** *"Trung bình cộng của hai số là 45 — báo cho học sinh biết cái này còn phải làm gì mới ra tổng được"*. Nay thẻ nào đề **chưa cho số ngay** có nhãn vàng ghi thẳng phép tính ngay trên thẻ: `TỔNG = 45 × 2`, `TỔNG = 84 ÷ 2`, `HIỆU = 6 × 2`, `HIỆU = 2`; bấm xong máy in cả phép tính có kết quả (`45 × 2 = 90 ⇒ TỔNG = 90`). Thêm thẻ **"Chu vi hình chữ nhật là 84 m"** để đối sánh với thẻ "Nửa chu vi 42 m" đang có — hai thẻ cạnh nhau dạy đúng chỗ trẻ hay nhầm. Tổng cộng **13 thẻ** (từ 12).
13. **Định nghĩa phải là HÌNH, không phải chữ.** *"TỔNG = cả hai gộp lại · HIỆU = phần lệch nhau → làm cho dễ hiểu hoặc trực quan hơn"*. Dòng chữ màu cam đã bị **thay bằng chính một sơ đồ** (`#dinh-nghia`, vẽ bằng `veSoDo` chứ không phải ảnh tĩnh): hai thanh ghi 40 và 60, miếng cam nhô ra ghi chữ **HIỆU**, ngoặc tím ôm hai thanh ghi chữ **TỔNG**. Định nghĩa và hình giờ là một, sửa hình là sửa luôn định nghĩa.
14. **Sơ đồ phải NGẮN và in số thật lên thanh.** *"các thanh này nên để ngắn ngắn… phải giống số thực tế cho dễ hình dung"*. `kichThuoc()` nay trả thêm `so[2]`: khi biết hai số thật thì **in thẳng số vào đầu mỗi thanh** (55/65, 41/49, 24/36, 13/41, 36/38, 18/24 — đo được trên cả 10 sơ đồ), còn MỤC 2 (đề chưa cho hai số) thì **không in số nào cả** — có điều kiện `tuKiem` cấm in số bịa. Bề rộng sơ đồ ở MỤC 2 chặn ở 400px (đo: track từ ~500px xuống **357px**), thanh cao 26px. Đã bắt được một lỗi phụ khi thu gọn: ô lệch hẹp hơn chữ thì **số bị ẩn mất** (3 ô `clientWidth = 0`) — fix bằng ngưỡng 3 tranh cạnh nhau chỉ bật từ 860px; đo lại **0 ô bị kẹp chữ, 0 tràn ngang**.
15. **"Máy cắt thanh" không giống tên một mục Toán.** Nay là **"TỪ SƠ ĐỒ RA CÔNG THỨC — VÌ SAO PHẢI CHIA 2"**, điều hướng ghi `4. Sơ đồ → công thức`.

Trạng thái sau đợt sửa: `tuKiem()` **63 mục khớp**, console sạch, `node kiem-dinh.js` vẫn `KHONG PHAT HIEN LOI`.

### Tám lời góp ý tiếp theo — bài 3 (19/10/2026, tối)

Em đánh dấu 8 chỗ nữa (4 chip Mục 1, stepper Mục 4, Mục 6, cổng tên, Mục 2, Mục 3). Gom thành **năm việc**:

16. **Chip chỉ gợi ý công thức, không đưa kết quả.** Bốn chip "chưa có số ngay" đổi nhãn thành đúng công thức trung bình cộng / chu vi mà **không in kết quả**: `TBC = TỔNG ÷ 2` · `Chu vi = (dài + rộng) × 2` · `2 · 4 · 6 · 8 …` · `An − 6 · Bình + 6`. Bé tự tính ra số rồi bấm; máy chấm xong mới in phép tính có kết quả (`45 × 2 = 90 ⇒ TỔNG = 90`).
17. **Mục 2 và Mục 3: bỏ chọn tranh / bỏ đổ sẵn số — đổi thành điền vào sơ đồ.** Mục 2: hình dáng sơ đồ cho sẵn (thanh nào dài hơn, ô cam, ngoặc tím), bé **tự gõ** tên hai bạn và số vào từng ô, bấm Kiểm tra (hoặc Enter); sai ô nào gợi ý đúng ô đó ("ô cam ghi số của chữ hơn/kém", "ngoặc tím ghi tổng CẢ HAI"), đúng hết thì máy giải thích vì sao. Mục 3: chữ in đậm bấm vào **chỉ nghe gợi ý, không tự điền số nữa**; bé tự săn TỔNG và HIỆU rồi điền vào sơ đồ vẽ sẵn theo tỉ lệ thật — đúng cả hai thì sơ đồ + lời giải mới hiện. Hai mục này dùng chung bộ lớp `.slot` (ô nhập nằm ngay trong thanh / trong ngoặc), tô xanh từng ô khi đúng, đỏ khi sai.
18. **Mục 6: bé phải tự làm, sai có hướng dẫn sửa.** Bỏ hẳn hai ô nhập TỔNG/HIỆU và bỏ số mẫu 55/65 sẵn trong ô — đề cho cố định "TỔNG 120 · HIỆU 10" (hằng số `THU`), hai ô trống cho số bé / số lớn, nút Kiểm tra. Đúng → ba dòng ✓ + ★. Sai → từng ô tô đỏ/xanh + ba phép thử ✓/✕ + dòng cam "💡 Sửa: Số bé = (120 − 10) ÷ 2 = 55 · Số lớn = 55 + 10 = 65", kèm câu chỉ đúng chỗ sai (số bé phải lấy TỔNG − HIỆU, số lớn phải lấy TỔNG + HIỆU). Bạn Gấu giữ nguyên.
19. **Mục 4 gọn lại.** Stepper TỔNG/HIỆU bọc trong hai nhóm trắng viền bo (không còn dấu ± rồi số lẻ bơ vơ), caption B1–B4 viết lại ngắn gấp đôi, câu mở đầu đổi thành "Ngắn = số bé · dài hơn đúng một đoạn = số lớn."
20. **Avatar nằm sau tên ở cổng 3 bạn** (trước đó avatar đứng trước tên).

`tuKiem()` được viết lại block sơ đồ cho đúng dữ liệu mới (không còn `opts`), thêm điều kiện: đề săn phải có đủ 2 nhãn tên, câu điền phải có đủ 2 tên đáp án và ô lệch/ngoặc khớp đáp HIỆU/TỔNG, hằng số THỬ phải ra số nguyên. Đã chạy thật trong trình duyệt 19/10/2026 (tối): **64 mục khớp**, Mục 2 điền đúng/sai, Mục 3 gợi ý không tự điền + đúng cả hai thì hiện sơ đồ, Mục 6 đúng ★ / sai có dòng Sửa / ô trống có nhắc nhở — tất cả đúng; **0 ô nhập bị cắt chữ**, ngoặc tím 10/10 sơ đồ ôm khít hai thanh, console sạch.

### Bảy lời góp ý tiếp theo — bài 3 (20/10/2026)

Em đánh dấu 10 chỗ nữa (Mục 1 ×2, chip gợi ý ×4, Mục 2, tiêu đề Mục 3, Mục 5, Mục 6). Gom thành **bảy việc**:

21. **Mục 1: bỏ nút chọn TỔNG/HIỆU — đổi thành điền số vào sơ đồ.** Mỗi câu cho ĐÚNG MỘT số (dữ liệu mới `tong`/`hieu`, ví dụ "Trung bình cộng ... 45" thì ghi `tong: 90`); thẻ có **sơ đồ nhỏ riêng** với hai ô nhập: ô trong đoạn cam = HIỆU, ô trong nhãn ngoặc tím = TỔNG. Bé tính ra số rồi điền vào đúng ô, ô nào đề không cho thì để trống. Máy chấm cả hai ô: nhầm ô ("số này là TỔNG, thuộc về ngoặc tím, không phải ô cam"), sai số ("nhớ làm theo gợi ý phép tính ở trên" — chỉ với thẻ có chip), điền thừa ô ("câu này không cho biết HIỆU — để trống ô cam"). Đúng → giải thích cách làm (`TỔNG = 45 × 2 = 90 ⇒ điền 90 vào ô TỔNG`), hai ô khoá lại, bộ đếm 13.
22. **Chip gợi ý chỉ một dòng ở trên cùng.** `.tu-bt-row` cao cố định 24px, `nowrap`, chip nằm gọn một dòng đầu thẻ — không còn nhảy/tab lúc có lúc không.
23. **Mục 2: mọi đề đủ TỔNG + HIỆU, mọi sơ đồ đủ yếu tố.** 5 đề đều cho cả hai số (trước có 2 đề thiếu TỔNG, 2 đề bằng nhau thiếu HIỆU); mọi sơ đồ đều vẽ đủ ô cam + ngoặc tím để bé điền mọi vị trí; `tuKiem` giữ điều kiện ô lệch/ngoặc khớp đáp.
24. **Mục 3: tiêu đề gọn "SĂN TỔNG VÀ HIỆU"** — bỏ hậu tố "— ĐỪNG TIN CHỮ 'TẤT CẢ'".
25. **Mục 5: đưa chuột vào thẻ là ví dụ hiện ngay.** `onmouseenter` gọi chung `moDang(i)` (vẫn bấm được trên điện thoại) — cả 6 thẻ đều mở được bằng hover, kể cả bẫy "gấp 3 lần".
26. **Mục 6: máy chỉ thử lại, không làm hộ.** Bỏ tô đỏ/xanh hai ô nhập, bỏ hẳn dòng cam "💡 Sửa: ... = 55 · ... = 65" (đang đưa đáp án), bỏ dòng ★. Chỉ còn hai dòng ✓/✕: "Cộng: ... = ... — đề cho TỔNG 120" · "Trừ: ... = ... — đề cho HIỆU 10", rồi một dòng kết luận trung tính ("Cả hai phép đều khớp đề" / "Phép nào ✕ thì số đó chưa đúng — tự sửa lại rồi bấm Kiểm tra"). Bạn Gấu giữ nguyên.
27. **Luyện tập thêm câu: 28 → 34 câu.** Thêm 2 câu mỗi cấp 1·2·3 (cấp ôn, không chấm): cấp 1 thêm "tất cả 60 viên bi → TỔNG" và "ngắn hơn 8 m → HIỆU"; cấp 2 thêm hai bài công thức (96−6 → bé 45 · 130+14 → lớn 72); cấp 3 thêm "nửa chu vi 40 m → TỔNG" và "hai số lẻ liên tiếp → HIỆU = 2". **16 câu chấm cấp 4·5·6·7 giữ nguyên** — thang sao, cổng, Form không đổi. `tuKiem` tính lại cả 34 đáp số; dòng chân trang đếm câu động theo dữ liệu.

`tuKiem()` nay **70 mục** (thêm 6 câu luyện tập được tính lại), block Mục 1 viết lại cho dữ liệu `tong`/`hieu`: mỗi câu phải có ĐÚNG MỘT số dương + lời giải cách làm. Đã chạy thật trong trình duyệt 20/10/2026: **70/70 khớp**, footer "70 mục khớp · 34 câu luyện tập (16 câu chấm)"; Mục 1 điền đúng/sai/nhầm ô/điền thừa đều ra đúng thông báo, ô khoá sau khi đúng; Mục 2 đủ 5 ô cam + 5 ngoặc; Mục 5 hover mở được cả thẻ thường lẫn bẫy; Mục 6 đúng/sai đều chỉ hai phép cộng/trừ, không tô ô, không lộ đáp án; console sạch; `node kiem-dinh.js` vẫn `KHONG PHAT HIEN LOI`.

### Mười lời góp ý tiếp theo — bài 3 (20/10/2026, tối)

Em đánh dấu 10 chỗ nữa (ngoặc Mục 2, bố cục + ô HIỆU + bỏ Kiểm tra Mục 1, Mục 2, nhãn "TẤT CẢ", ô cam Mục 2, thanh chiếm diện tích, Mục 4, thanh bằng nhau, Mục 6). Gom thành **năm việc**:

28. **Đổi mọi nhãn "TẤT CẢ" → "TỔNG" + thanh ngắn lại, đồng bộ toàn trang.** Ngoặc ngoài hai thanh nay ghi `TỔNG …`; chữ "tất cả" chỉ còn trong thân đề làm từ tín hiệu đọc. Thanh `.bar`/`.lech` cao 34 → 24px, khung sơ đồ `.khol` chặn max-width 480px, lưới thẻ Mục 1 về 2 cột từ 760px — mọi sơ đồ trong trang cùng một kích thước gọn, không chiếm diện tích.
29. **Mục 1: kéo thả dữ liệu từ đề vào sơ đồ — bỏ nút Kiểm tra.** Đề in đầy đủ câu văn (bé đọc đề cho quen), dữ kiện quan trọng thành **chip vàng khoanh sẵn** trong câu; mỗi thẻ có sơ đồ nhỏ với ô cam ghi nhãn **HIỆU** + ngoặc tím ghi **TỔNG** (phần bằng nhau của hai thanh rút còn 50%). Bé kéo chip vào ô — điện thoại bấm chip rồi bấm ô, kéo sai thì chip vẫn chọn sẵn nên bấm thẳng ô đúng là xong; kéo sai → thẻ rung + viền đỏ + cảnh báo đúng chỗ ("số này là TỔNG, thuộc về ngoặc tím, không phải ô cam"); đúng cả hai → máy giải thích cách làm, ô khoá, bộ đếm 13. Bốn đề phải tự mở (TBC ×2, chu vi ÷2, cho nhau ×2, liên tiếp = 2) dùng chip dạng `45 × 2 = 90` — chip hiện phép tính trong câu nhưng kéo vào ô chỉ là số **90**, câu giữ nguyên phép tính in đậm. Chip gợi ý gọn một dòng 24px đầu thẻ, không còn nhảy lúc có lúc không.
30. **Mục 2: kéo thả 2 tên + 2 số vào sơ đồ.** Sơ đồ cho sẵn hình dáng (thanh dài/ngắn, ô cam ghi nhãn **HIỆU**, ngoặc tím ghi **TỔNG**) với 4 ô trống: hai nhãn tên, ô cam, ngoặc tím; bé kéo 2 chip tên + 2 chip số từ đề; kéo sai → rung + cảnh báo đúng loại ("thanh DÀI là người nhiều hơn", "nhãn này ghi TÊN — số thì kéo vào ô cam hoặc ngoặc tím", "tên thì kéo vào nhãn bên trái hai thanh"); đúng đủ 4 ô → máy giải thích. Bỏ hẳn ô gõ tay + nút Kiểm tra của các vòng trước.
31. **Mục 6: bỏ máy chấm — chỉ hướng dẫn tự so sánh.** Đề cố định in sẵn "Tổng hai số là **120**. Hiệu hai số là **10**."; em tự làm vào nháp rồi **tự thử lại bằng hai phép** — cộng hai số xem ra TỔNG chưa, trừ hai số xem ra HIỆU chưa. Không ô nhập, không nút Kiểm tra, không tô đỏ/xanh, không dòng đáp án, không dòng ★. Thêm nút **"Xem gợi ý sơ đồ"**: bấm hiện sơ đồ tượng hình hai thanh (55/65) + lời giải để bé tự đối chiếu; gợi ý đầu mục nói thẳng "Không có máy chấm ở mục này".
32. **Mục 4: trực quan hơn — máy cắt thanh dùng chung khung gọn + ngoặc TỔNG.** B1 in số thật lên hai thanh, B3 dựng hai nửa sau khi chia đôi trong cùng khung 480px, B4 gói trong khung + ngoặc `TỔNG …` ôm cả hai hàng; caption B1–B4 viết lại ngắn gọn.

`tuKiem()` nay **69 mục** (block kiểm hằng số THỬ bị xoá theo Mục 6 không còn máy chấm; thay vào là điều kiện chip `txt` của 4 đề tự mở phải khớp số dữ liệu `tong`/`hieu`). Đã chạy thật trong trình duyệt 20/10/2026 (tối): **69/69 khớp**, footer "Tự kiểm: 69 mục khớp · 34 câu luyện tập (16 câu chấm)"; Mục 1 kéo đúng / sai số / nhầm ô / chip công thức đều ra đúng cảnh báo, hai ô khoá sau khi đúng; Mục 2 đủ nhánh tên-sai / số-sai / nhầm ô; Mục 6 chỉ còn nút gợi ý, không ô nhập; Mục 4 B1 → B4 chạy sạch; Mục 3 regression gõ + Kiểm tra vẫn đúng ("Săn được cả TỔNG = 120 và HIỆU = 10"); **0 chữ "TẤT CẢ"** trong phần hiển thị; console sạch; `node kiem-dinh.js` vẫn `KHONG PHAT HIEN LOI`.

### Mười lời góp ý tiếp theo — bài 3 (21/10/2026)

Em đánh dấu 10 chỗ nữa (ô cam Mục 1, phần HIỆU Mục 1, chip dữ liệu Mục 1, ô đích Mục 2, stepper Mục 4, cách hiển thị Mục 4, đề chu vi, đề An–Bình, ô HIỆU Mục 2, cách kéo thả). Gom thành **sáu việc**:

33. **Ô cam + chữ HIỆU to lên, dễ nhìn — và cùng một hàng với ô số.** Nhãn `HIỆU` và ô số nằm **chung một hàng** trong miếng cam (trước xếp chồng 2 tầng nhìn như biển báo). Cam có sàn rộng `min(86px, P+4%)` qua biến `--minl` inline — P+4% đúng bằng ngưỡng "được dày hơn tỉ lệ thật tối đa 4 điểm" đã cam kết 19/10; Mục 1 (P=50 placeholder) từng dùng sàn 70% nhưng đã gỡ ở việc 39. Hẹp hơn nữa (điện thoại cỡ nhỏ) thì `flex-wrap` tự xếp lại 2 hàng. Áp dụng chung mọi sơ đồ kéo-thả (Mục 1 · 2) vì cùng hàm `veTuSoDo`/`veDien`. Đã đo lại 21/10: cả 18 cam một hàng lúc trống lẫn lúc đã điền số (86×31px), kéo sai vẫn rung cả miếng cam + đọc cảnh báo. *(Nhật kiểm vòng 33 — sàn `--minl` này đã bị vòng 52 thay bằng `sanCamPx` theo số chữ số, xem mục "Kiểm định đã chạy" ở trên.)*
34. **Kéo sai thì rung cả miếng cam + nói to.** `rungVaBao` rung cả vùng `[data-thavung]` (miếng cam / vỏ ngoặc tím) thay vì chỉ ô nhỏ, và gọi `baoTieng()` — đọc to cảnh báo bằng giọng tiếng Việt qua `speechSynthesis` (bỏ dấu ký hiệu ✕✓·—=⇒ trước khi đọc; trình duyệt không có giọng thì thôi, không vỡ trang).
35. **Vùng thả rộng: bé thả trúng miếng cam / vỏ ngoặc là nhận.** Hai vùng `[data-thavung]` bắt cả `drop`/`click` rồi chuyển vào ô bên trong — bé không cần ngắm chính xác ô nhỏ (vẫn không bắn hai lần khi thả đúng vào ô, vì `closest('.drop')` chặn lại). Áp dụng Mục 1 + Mục 2.
36. **Chip dữ liệu đề: khung đặc nền trắng, bỏ nét đứt.** `.keo` và `.drop` đổi từ viền đứt sang khung đặc bo tròn; `tuKiem` thêm điều kiện `getComputedStyle` cả hai lớp **không được còn nét đứt** (69 → **70 mục**).
37. **Ba đề tự mở: phép tính mở thành chip kéo được ở dòng chú thích.** Đề chỉ ghi dữ kiện thô ("Trung bình cộng ... 45", "Chu vi ... 84 m", "An cho Bình 6 viên thì bằng nhau"); chip `45 × 2 = 90` · `84 ÷ 2 = 42` · `6 + 6 = 12` nằm ở dòng chú thích đầu thẻ, bé **kéo chip vào sơ đồ** thay vì đọc đáp án có sẵn trong câu. `tuKiem` đếm chip kiểm tra cả chip `bt` này: mỗi đề phải có đúng 1 chip TỔNG + 1 chip HIỆU kể cả chip chú thích, chip `bt` phải ghi `txt` là phép tính, giá trị `so` phải khớp dữ liệu `tong`/`hieu`.
38. **Mục 4: bỏ stepper, hiện từng bước.** Bỏ hẳn cụm nút ± TỔNG/HIỆU ("rối quá"); máy chạy số cố định TỔNG 120 · HIỆU 20. Bấm B1 chỉ hiện đúng một hình của bước đó, công thức + dòng Lệnh giấu hết cho tới B4 mới trải ra — học sinh theo từng bước một như máy cắt thanh ở bài 1.

`tuKiem()` nay **70 mục** (thêm một: điều kiện khung đặc ở việc 36). Đã chạy thật trong trình duyệt 21/10/2026: **70/70 khớp**, footer "Tự kiểm: 70 mục khớp · 34 câu luyện tập (16 câu chấm)"; Mục 1 kéo sai → miếng cam rung + cảnh báo đúng loại + `speechSynthesis` phát tiếng, kéo đúng qua vùng rộng (bấm cả vỏ ngoặc) thì nhận; Mục 2 đủ 4 ô qua vùng thả rộng, lời giải đúng; chip `84 ÷ 2 = 42` kéo từ chú thích vào ngoặc câu chu vi nhận đúng; Mục 4 bấm B1 chỉ 1 hình + công thức ẩn, B4 mới hiện công thức + Lệnh; console sạch; `node kiem-dinh.js` vẫn `KHONG PHAT HIEN LOI`.

### Vòng 39–46 — Sáu lời góp ý tiếp theo — bài 3

Em đánh dấu 8 chỗ (ô hiệu Mục 2, sơ đồ thùng Mục 3, Mục 1, Mục 3, Mục 4, Mục 6, tách số HIỆU ở cả ba mục, kéo thả tên 2 đối tượng). Gom thành **bảy việc**:

39. **Ô cam vẽ ĐÚNG phần lệch — gỡ sàn `--minl:70%` của Mục 1.** Vòng 21/10 đặt sàn 70% cho cam Mục 1 (P=50) để chữ HIỆU + ô số một hàng; em phản hồi "HIỆU phải là phần lệch, đừng để lung tung" → gỡ sàn, cam vẽ lại đúng 50% bằng thanh bé. Sàn `P+4%` của Mục 2 · Mục 3 giữ nguyên (vẫn trong ngưỡng "dày hơn tỉ lệ thật tối đa 4 điểm", và `tuKiem` vẫn đo đúng bằng hàm `kichThuoc` nên không ai bị oan).
40. **Mục 3: ô cam ghi nhãn HIỆU + sơ đồ thu nhỏ, canh giữa.** Trước ô cam chỉ có ô nhập trắng không chữ ("đoạn dư không có chữ HIỆU", "không thấy HIỆU ở đâu cả"); nay cam dùng cùng kiểu `.lech.kep` như Mục 2: nhãn **HIỆU** + ô nhập nhỏ 28px nằm trong miếng cam (sàn `P+4%`; hẹp quá thì nhãn xếp ngay trên ô nhập, vẫn ở trong cam). Khung sơ đồ Mục 3 chặn max-width 480 → **400px** ("phần bằng nhau dài quá, lãng phí diện tích") và canh giữa thẻ đề — hết khoảng xám chết bên phải.
41. **Mục 4: máy cắt TỰ CHẠY B1 → B4 khi cuộn tới — hiển thị dần dần.** Trước phải bấm nút mới có hình ("phần này phải biểu thị bằng sơ đồ, xong cho hiển thị dần dần"); nay IntersectionObserver (+ dự phòng sự kiện cuộn) kích hoạt chuỗi B1 → B4, mỗi bước một hình cách ~2,4 giây, tới B4 để lộ công thức + Lệnh; bấm nút bất kỳ lúc nào → máy thôi tự chạy, nhảy đúng bước đó. B2 đổi nhãn ngoặc + caption thành **TỔNG mới = 120 − 20 = 100 — chia thành hai thanh bằng nhau** ("tổng trừ hiệu thì ra tổng mới bằng hai thanh bằng nhau").
42. **Mục 6: gợi ý thêm sơ đồ cây thử lại.** Bấm "Xem gợi ý sơ đồ" nay hiện thêm cây hai nhánh: hai số **55 · 65** → **CỘNG hai số** → `55 + 65 = 120 ✓ đúng TỔNG` (nhánh tím) · **TRỪ hai số** → `65 − 55 = 10 ✓ đúng HIỆU` (nhánh đỏ) — "lấy hai cái cộng lại ra tổng, trừ hai cái ra hiệu" nay thành hình vẽ, không chỉ dòng chữ.
43. **Mục 2: ô cam vẽ theo tỉ lệ thật của đề.** Trước đây `veDien` vẽ hình dáng cố định 50/50 (dư của vòng "kéo nhãn", em: "Chỉnh lại cho cái ô hiệu nhìn cân đối một tí coi. Nó tùm lum vậy, nó to quá") — ô cam rộng bằng cả thanh dù đề chỉ lệch 13%. Nay tính tỉ lệ thật từ dữ kiện đề: `P = clamp(8..85, round(100 × (1 − bé/lớn)))` với `bé = (TỔNG − HIỆU) ÷ 2`, `lớn = (TỔNG + HIỆU) ÷ 2` — cùng hệ số với `kichThuoc` toàn trang. Ô cam nay đúng phần lệch: 33/15/13/24/13% ở 5 đề (92/53/48/78/48px so với thanh 188–238px); cam hẹp (P ≤ ~20) thì chữ HIỆU + ô thả xếp chồng 2 hàng trong băng cam — đánh đổi chấp nhận được vì ô cam phải đúng phần lệch. `tuKiem` thêm điều kiện DOM so `style.width` của ô cam với P tính từ đáp số, từng đề.

44. **TÁCH SỐ HIỆU RA NGOẶC RIÊNG — đoạn cam giữ nguyên phần lệch, chỉ ghi chữ HIỆU.** Em nhắc lại 5 lần cùng một yêu cầu ở cả ba mục (Mục 1 · 2 · 3): *"ở trong cái ô chỉ có chữ HIỆU thôi, còn cái số mình kéo về thì mở ngoặc và ghi chữ HIỆU — như cái TỔNG"*, *"cái số không liên quan gì đến cái sơ đồ cả"*. Nay **đoạn cam trên thanh trở lại đúng phần lệch** (tỉ lệ thật, bỏ hẳn sàn 70% và ô số nằm trong cam), trong cam chỉ còn chữ **HIỆU**; số kéo/điền vào **một dấu ngoặc cam riêng đặt ngoài sơ đồ**, đúng kiểu ngoặc tím TỔNG (`.ngoac.hieu` — vỏ cam + nhãn HIỆU + ô số). Mục 1 cũng bỏ hình 50/50: đoạn cam vẽ theo tỉ lệ thật từ TỔNG·HIỆU của từng đề, nên mọi đoạn cam trong trang cùng một luật, không còn chỗ to chỗ nhỏ. Kéo sai vẫn rung cả ngoặc + đọc to. `tuKiem` đổi sang kiểm cấu trúc: đoạn cam không được chứa ô số, số HIỆU phải nằm trong `.ngoac.hieu`, đoạn cam Mục 2 vẫn đúng `P%` tỉ lệ thật (75 → **76 mục**).

45. **Mục 1: kéo thả 2 TÊN vào đầu mỗi đoạn thẳng.** Em đánh dấu vào Mục 2 ("phần này nên có thêm phần kéo thả tên 2 đối tượng vào đầu mỗi đoạn thẳng") — Mục 2 đã có sẵn 2 ô tên, nên sau khi hỏi lại, em chọn **làm ở MỤC 1 (13 đề)**. Nay mỗi thẻ Mục 1 có thêm 2 ô thả ở cột nhãn: bé kéo 2 chip tên (lấy ngay trong câu văn, ví dụ `4A` / `4B`, `Bình` / `An`, `chiều rộng` / `chiều dài`) vào đầu hai đoạn thẳng — **thanh dài là bạn nhiều hơn**. 11/13 đề có tên; 2 đề trừu tượng ("Hai số chẵn liên tiếp", "số bé/số lớn" không có tên riêng trong câu) giữ nhãn cứng, không bịa tên. Ô thả tên dùng `data-loai="ten"` nên kéo NHẦM số vào đó → "✕ Nhãn này ghi TÊN — số thì kéo vào ngoặc cam (HIỆU) hoặc ngoặc tím (TỔNG)", kéo nhầm tên vào ngoặc → "✕ Ô này ghi SỐ — tên thì kéo vào nhãn bên trái của hai thanh". Thẻ chỉ **xong** khi đủ 4 ô (2 tên + HIỆU + TỔNG), nên bộ đếm 13 không tăng sớm. Cột nhãn rộng 56 → **84px** (chữ 12px) cho vừa "chiều rộng". `tuKiem` bắt: đề nào có `ten[]` thì phải có đủ 2 chip `be`/`lon` và giá trị chip khớp đúng `ten[]`, đồng thời sơ đồ phải có ô `tu-i-ten0`/`tu-i-ten1` (76 → **77 mục**).

46. **Mục 6: từ một khối chữ thành một BÀI giải hoàn chỉnh — và đồng bộ nốt máy vẽ sơ đồ chung.** Em đánh dấu `#muc-6`: *"bỏ cái dòng không có máy chấm ở mục này đi"*, *"đề làm ngắn gọn lại"*, *"có sơ đồ biểu diễn"*, *"chỉ cho bé cách cộng trừ"*, *"làm một bài đề đi chứ đừng làm một phần đơn giản"*. Nay: bỏ hẳn dòng "Không có máy chấm ở mục này"; đề gọn một dòng "Hai số có **TỔNG 120** và **HIỆU 10**. Tìm hai số đó."; **bài mẫu hiện sẵn tại chỗ** (bỏ nút "Xem gợi ý sơ đồ" + hàm `thuGoiY`) với **B1 · Vẽ sơ đồ → B2 · Tìm hai số → B3 · Thử lại bằng hai phép (sơ đồ cây CỘNG/TRỪ) → Đáp số 55 và 65**; mọi số của mục sinh từ đúng một dữ kiện `THU = { tong: 120, hieu: 10 }` qua `doiSo()` nên không còn chỗ nào ghi cứng 55/65; cột bài mẫu bỏ cứng 260px mà chiếm phần còn lại (cột Bạn Gấu 330px) để sơ đồ không bị bóp. **Quan trọng nhất: `veSoDo()` — máy vẽ sơ đồ chung của sơ đồ định nghĩa · Mục 5 · 6 · 7 — cũng được chuyển sang chuẩn HIỆU mới** (đoạn cam chỉ chữ HIỆU, số ra ngoặc cam riêng); chính máy vẽ này là chỗ bị cắt vụn số "10" trong ảnh em chụp. Sơ đồ định nghĩa chưa có số thì không vẽ ngoặc HIỆU trống. `tuKiem` +2: bài Mục 6 phải đủ B1/B2/B3/Đáp số, không còn chữ "máy chấm", `THU` tự khớp, dòng Gấu dùng đúng số của `THU`; và MỌI sơ đồ do `veSoDo` vẽ phải có đoạn cam không chứa số + số nằm trong `.ngoac.hieu` (77 → **79 mục**).

### Vòng 47–50 — sơ đồ Lật NGƯỢC luật HIỆU, hợp nhất máy vẽ, làm lại Mục 7, nối Form

Em đánh dấu 3 chỗ: một ảnh chụp số "10" trong cam bị cắt ở Mục 6, `#muc-7`, và toàn trang.

47. **HIỆU ĐẢO NGƯỢC vòng 44: số nằm TRONG đoạn cam, dưới cam là ngoặc mở ngược lên ghi chữ HIỆU.** Em: *"Cái phần hiệu nó phải đồng bộ với cái sơ đồ chứ (nếu cho xuống dưới thì mở ngoặc trên xuống ghi chữ HIỆU là chú thích phần hiệu, còn phần tô màu HIỆU có ô để kéo thả). Rà soát lại hết sơ đồ đi, nhiều cái lộn xộn quá không đúng logic."* Nghĩa là vòng 44 (tách số ra ngoặc riêng) đã hiểu sai: **phần tô màu mới là phần HIỆU**, ô kéo–thả phải nằm trong nó, còn dấu ngoặc chỉ làm **chú thích** ngay bên dưới, quay ngược lên ôm đúng miếng cam. `.ngoac.hieu` và `class="lt"` bị xoá hẳn; `tuKiem` viết lại luật ngược lại (ô số HIỆU phải khớp `/class="lech kep"…/`, thiếu `.chu > i + b` là báo lỗi).
48. **HỢP NHẤT 5 MÁY VẼ SƠ ĐỒ về MỘT khuôn `soDoCot`.** Trước đây `veSoDo` · `veTuSoDo` · `veDien` · `veDeDien` · Mục 4 `veMay` mỗi chỗ tự xếp html một kiểu — đó chính là nguồn của "lộn xộn, không đúng logic". Nay tất cả đi qua `soDoCot(o)` (lưới 2 cột) + `soDo2(o)` (khuôn hai thanh TỔNG–HIỆU). **Cột 1 = PHẦN BẰNG NHAU dùng chung cho mọi hàng**, cột 2 rộng `--cw: max(P%, 30px)` nên miếng cam không bao giờ hẹp dưới 30px (số "10" hai chữ số hết bị cắt như trong ảnh) và hàng nào cũng trùng cột — `tuKiem` dò mọi `--cw` trong một sơ đồ phải giống nhau, đo pixel thật hai thanh phải **bằng nhau ±1px** (sửa đúng câu "cái số lớn số bé với phần bằng nhau nó phải đều nhau chứ, cái dài cái ngắn vậy"), và ngoặc chú thích phải ôm **khít** cam ±2px. Mục 4 B3 ("chia đôi") đổi sang `.doi` nằm trọn trong cột 1 nên hai nửa bằng nhau thật. Sàn `SAN_LECH = 8%` giờ là một hằng số: 3 đề số liên tiếp (64/66 · 74/76 · 59/61) có lệch thật chỉ 3% mà vẽ 3% thì không nhét nổi số vào cam, nên `tuKiem` cho phép đoạn cam **không nhỏ hơn sàn 8%** thay vì bắt đúng tỉ lệ.
49. **MỤC 7 viết lại toàn bộ: 48 câu, 24 câu chấm, đề không ever in sẵn TỔNG/HIỆU.** Em: *"không cần đổi bạn, ở các cấp không cung cấp đáp án tổng hiệu trên đề, đề ra như bình thường, dưới có đủ 4 ô cùng sơ đồ; bài luyện tập thì vẽ sẵn cho kéo thả đúng chỗ cần, bài chấm điểm không vẽ sơ đồ cho bé, làm nhiều lên."* Nay: **cấp 1·2·3 = 24 câu ôn**, mỗi câu có sơ đồ vẽ sẵn + 4 thẻ kéo (2 tên · số HIỆU vào đoạn cam · số TỔNG vào ngoặc tím); **cấp 4·5·6·7 = 24 câu chấm**, KHÔNG sơ đồ, lời giải chữa cũng không kèm sơ đồ. Cả 48 đề viết như bài toán thật ("Hai thùng có tất cả 120 lít dầu, thùng to hơn thùng bé 10 lít…"), `tuKiem` chặn nếu **phần dữ kiện trước chữ "Hỏi" có chữ TỔNG/HIỆU** hoặc in sẵn đáp số. Cấp 2 thêm khuôn dữ kiện mới `{a, b}` (đề chỉ cho hai số) để `doiSo()` tự CỘNG ra TỔNG · TRỪ ra HIỆU, và thẻ số hiện **phép tính** `52 + 38` chứ không in kết quả — `tuKiem` tính lại chuỗi phép tính đó (`tinhChip`) và bắt buộc nó khớp số của sơ đồ. Bỏ nút **"Đổi bạn"** (chỉ còn "Ghi tên bạn khác" ở màn báo cáo). Ngân hàng câu đổi số lượng (16 → 24 câu chấm) nên nháp cũ `localStorage` được gác bằng `BAN_CAU = 2`: phiếu chưa nộp thì xoá attempts, phiếu **đã nộp thì giữ biên lai** để không ai nộp lần hai.
50. **Nối Google Form cho bài 3.** Xuất bản form "Bảng điểm Tổng và Hiệu — lớp 4" (bản sao form bài 1, nên `entry.*` trùng hệt), dán `FORM_ENDPOINT` + 8 `entry.*` vào trang, và `tuKiem` thêm khối kiểm: link đúng dạng `/forms/d/e/<ID>/formResponse`, 8 ô entry đều có và **không trùng nhau**.

### Vòng 51–54 (21/10/2026) — tự rà lỗi logic + lỗi sơ đồ (em yêu cầu: "tự động rà soát lỗi logic lỗi sơ đồ… có phần tối ưu gì không")

Đọc lại từng câu rồi **đo**, không tin mắt: 48 đáp số tay tính lại khớp `doiSo()`/`traLoi()` hết (ca dễ nhầm nhất là 6.3 — đề cho HIỆU 28 và TỔNG *sau này* 62, nên tuổi bé hiện tại là 17 − 9 = 8, không phải 21). Ba lỗi thật mà chỉ đo mới thấy:

51. **Sơ đồ đổi sang LƯỚI HÀNG (`grid-template-rows`), ngoặc tím ôm ĐÚNG N HÀNG THANH.** Trước đây một sơ đồ là flex `.khol` = [`.cots` các hàng | ngoặc], nên `align-items: stretch` kéo ngoặc cao bằng **toàn bộ** cột hàng — 45/49 sơ đồ vẽ ngoặc 89px cho khối hai thanh 57px, tức **ôm luôn hàng chú thích HIỆU bên dưới** (hàng đó KHÔNG thuộc TỔNG). Nay mỗi hàng là một hàng lưới (nhãn | thanh | ngoặc), `soDoCot` đếm số hàng thanh thật rồi đặt `grid-row: 1 / span N`; hàng chú thích nằm ở N+1 nên không bao giờ bị ôm. Cách tính chiều cao bằng số (`--nh`, `hThanh`) đã thử và BỎ — sai vì Mục 2 `dai = 0` có hàng chú thích nằm **xen giữa** hai thanh nên nó PHẢI được tính, còn Mục 4 B2 thì phải LOại. Bỏ luôn `.ngoac.hai` (56px cứng) và `class="line"`/`.chu-row` trong máy vẽ.
52. **Sàn rộng của đoạn cam tính theo SỐ CHỮ SỐ (`sanCamPx`/`lechCw`).** Sàn cứng 30px cho mọi sơ đồ từng vẽ HIỆU = 2 của đề "hai số chẵn liên tiếp" thành 12–19% thanh — chỗ lệch bé bị vẽ to gấp đôi thật. Nay cam 1 chữ số chỉ cần 22px, 2 chữ số 30px, mỗi chữ số thêm 9px; ô kéo–thả rỗng thì đọc `data-dap` để biết sẽ chứa mấy chữ số.
53. **Màn hẹp: `container-type: inline-size` + `@container (max-width: 560px)` đặt CUỐI bảng kiểu, `.khol` 480 → 620px.** Ở 320px phần cứng ngắc (nhãn 84px + ngoặc tím 124px + padding) ăn tới mức hai thanh chỉ còn **59px**, nên miếng cam 30px thành **51%** thanh trong khi tỉ lệ thật 15% — máy vẽ nói sai đề. Dùng `@container` (không phải `@media`) vì máy kiểm dựng sơ đồ ra ngoài màn hình, `@media` nhìn viewport gốc nên không bao giờ kích hoạt; đặt cuối bảng kiểu vì `.tu-sodo .ten { width: 84px }` định nghĩa muộn hơn. `@media (max-width: 560px)` giữ song làm dự phòng cho trình duyệt chưa có container query.
54. **`tuKiem()` của bài 3 thêm nhóm LƯỚI KHỔ (`luoiKhau`): mọi sơ đồ + 24 thẻ bài cấp 1·2·3 được dựng lại ở 320 / 420 / 760px** (94 → **95 mục**). *(Nhắc lại kẻo nhầm: `node kiem-dinh.js` vẫn **chỉ** nạp bài 1 — `FILE` mặc định là `bai-giang-cong-tru-nham/index.html`; bài 2 và bài 3 tự kiểm bằng `tuKiem()`/`selfTest()` chạy trong trang, không có trong file đó.)* Mỗi ô phải: hai thanh còn ≥140px; chữ trong cam và chữ TỔNG trong ngoặc không bị cắt; **% cam vẽ ra không lệch quá +6 điểm (sàn 15%) so với tỉ lệ thật**; ngoặc không được bắt đầu thấp hơn thanh thứ nhất, không được bỏ sót thanh dưới, và **không được chạm hàng chú thích HIỆU (≤2px)** — tức là luật "ôm đúng hai thanh" của vòng 51 được đo bằng pixel thật chứ không chỉ bằng html. Cùng vòng này bắt thêm một lỗi ngoài sơ đồ: `.gate-row input` thiếu `min-width: 0` nên ở 320px cả trang tràn ra **395px**, nút **"Bắt đầu" tụt hẳn khỏi màn hình** — học sinh dùng điện thoại không vào bài được.

### Vòng 55 (21/10/2026, rạng sáng) — một đề VÔ NGHIỆM mà chỉ đọc lời mới thấy

Máy đã kiểm tra đủ: 48 đáp số khớp `doiSo()`, 121 phép tính in trên trang (48 lời giải + 8 section) đúng hết, 6 thẻ Mục 5 mở được cả, Bạn Gấu có đúng 1 dòng sai và dòng đó sai ĐÚNG lý do. Nhưng có một lớp lỗi mà `doiSo()` **không bao giờ bắt được**, vì máy giải và máy kiểm dùng chung một công thức:

55. **Bài 5.5 vô nghiệm — "Hai số LẺ liên tiếp cùng cộng lại được 150".** `doiSo()` tính `(150 − 2) ÷ 2 = 74` và `76`, hai số này cộng trừ đúng hết, đáp án ghi 76 cũng khớp — nên 95 mục trước đó **xanh toàn bộ**. Nhưng 74 và 76 là hai số **CHẴN**. Hai số lẻ liên tiếp luôn có dạng `(2k+1) + (2k+3) = 4k+4`, tức TỔNG phải **chia hết cho 4**; 150 chia 4 dư 2 ⇒ không tồn tại cặp số nào. Đổi TỔNG 150 → **152** (75 + 77, đáp số 76 → 77). Cùng sửa câu chữ ở Bài 5.3/5.4: "chiều rộng … **dài** bao nhiêu mét" → "**là** bao nhiêu mét" cho khớp Bài 3.6.
56. **`tuKiem()` thêm mục 1b — luật CHẴN/LẺ cho mọi đề "liên tiếp" (95 → 96 mục).** Quét cả ba ngân hàng (48 câu CAP · 6 dạng DANG · 13 đề Mục 1 TU): từ TỔNG và HIỆU suy ra hai số rồi bắt buộc **đúng loại** đã ghi trong câu — "số chẵn liên tiếp" ⇒ TỔNG chia 4 dư 2; "số lẻ liên tiếp" ⇒ TỔNG chia hết cho 4; lệch phải đúng 2 (số tự nhiên: 1). Đã probe ngược: đặt lại `dk.tong = 150, ans = 76` rồi chạy `tuKiem()` → trang báo đích danh `Bài 5.5: câu ghi "số LẺ liên tiếp" nhưng hai số tìm được là 74 và 76 — với HIỆU 2 thì TỔNG phải chia hết cho 4` rồi tự chặn; khôi phục 152 → **96 mục khớp**, console sạch.

### Đã kiểm trong trình duyệt (21/10/2026 — sau vòng 51–54)

`tuKiem()` = **95 mục khớp** (footer "Tự kiểm: 95 mục khớp · 48 câu luyện tập (24 câu chấm) được máy tính lại đáp số · trang chạy ổn"), `#self-test-alert` ẩn, console sạch. **Hình học sơ đồ**: 159 phép đo ở 320/420/760px, **0 lỗi** — ngoặc bắt đầu đúng đỉnh thanh thứ nhất (lệch 0px), phủ quá đáy thanh cuối 1px, cách hàng chú thích HIỆU gần nhất **6–8px**; phần ngoặc thò lên trên khối thanh lớn nhất còn **9px** (trước vòng 53 là 17px, do nhãn 3 dòng) ở tình huống xấu nhất là Bài 1.5/1.6/2.5 lúc 320px. Hai thanh hẹp nhất còn **156px** ở 320px (ngưỡng 140). **Tỉ lệ vẽ**: sai lệch lớn nhất toàn ngân hàng là 6,0 điểm % (Bài 3.4: thật 5,3% → vẽ 11,6% ở 320px, do sàn 22px của cam một chữ số; ở 420 và 760px chỉ còn 8,0% ≈ +2,7 điểm) và **không sơ đồ nào vẽ nhỏ hơn thật**. Nhãn: **0 ô bị cắt chữ**.
**Luồng thật chạy ở khổ 320px**: dựng nguyên trang trong iframe 320px CÓ chạy script → tự kiểm xanh, `scrollWidth` 305px (không tràn ngang ở 320/360/420/560/768), vào cổng bằng "Ban Mai" → Bài 1.1 kín 4/4 ô → sang cấp 4 gõ đáp án, bấm Kiểm tra → ghi nhận `{"val":60,"ok":true}`. **Kéo–thả bằng BẤM** (đường cho máy cảm ứng, không cần chuột): 24 thẻ bài cấp 1·2·3 × 4 thẻ = 96 lượt, **96/96 khớp ô**, không còn ô trống; bấm lại thẻ đang chọn thì huỷ (`KEO === null`); thả sai loại ra đúng câu "✕ Ô này ghi SỐ — tên thì kéo vào nhãn bên trái của hai thanh."; ô HIỆU đo thật vẫn `closest('.lech') === true`. **Chấm điểm cấp 4–7**: 24/24 câu chấp nhận đúng `q.ans`, `submitted` vẫn `false`; đặt `SEND_READY = false` trước khi chấm nên **không có POST nào rời trang** (Sheet thầy không thêm dòng). **Giữ bài dở**: `luuBai()` trả `true`, nháp 829 byte `{ver:2, ten, attempts(24), cap:7, nhap, nop, baoCao}`; tải lại trang → về đúng "Ban Mai" · 24 attempts · cấp 7, hiện dòng "↩ Trang vừa được mở lại, nên thầy giữ hộ em 24 câu đã ghi nhận", 6 thẻ cấp 7 tô xanh, tự kiểm vẫn 95 mục; `xoaBai()` dọn sạch trước khi kết luận. `node kiem-dinh.js` → `=== KHONG PHAT HIEN LOI ===` (file đó chỉ kiểm bài 1 bằng `vm`; bài 3 vẫn tự kiểm bằng `tuKiem()` chạy trong trang).

### Đã kiểm trong trình duyệt — sau vòng 47–50

> **Đọc vòng 51–54 và mục kiểm tra 21/10 ở trên trước.** Đoạn dưới là nhật kiểm ngay sau vòng 50: khi đó `tuKiem()` mới **94 mục**, đoạn cam còn sàn cứng 30px, sơ đồ vẫn xếp bằng flex nên ngoặc tím ôm luôn hàng chú thích HIỆU và trang **tràn ngang ở 320px** (nút "Bắt đầu" tụt hẳn khỏi màn hình). Các con số "94 mục", "cam ≥30px", "±2px" dưới đây vì thế không còn là hiện trạng của file.

`tuKiem()` nay **94 mục khớp** — footer "Tự kiểm: 94 mục khớp · 48 câu luyện tập (24 câu chấm) được máy tính lại đáp số · trang chạy ổn", `#self-test-alert` ẩn, console sạch. **Sơ đồ**: cả 5 máy vẽ đều qua `soDoCot`, số HIỆU nằm **trong** đoạn cam và `.chu` chú thích mở ngược lên ôm khít cam; đo pixel thật trên `tu-item-0` · `sd2-item-0` · `de-item-0` · `thu-out` + một thẻ bài tập dựng tạm ngoài màn hình → hai thanh **bằng nhau ±1px**, đoạn cam **≥30px**, ngoặc chú thích khớp cam ±2px. 3 đề số liên tiếp (64/66 · 74/76 · 59/61) lệch thật 3% được cho phép vẽ bằng **sàn `SAN_LECH = 8%`** để nhét nổi số vào cam.

**Mục 7**: cổng tên không còn nút *Đổi bạn*. Cấp 1 đếm được 8 thẻ hỏi · 8 sơ đồ · 32 thẻ kéo · 32 ô thả. Kéo thử trên Bài 1.1: thả nhãn tên vào ô tên → `? ` thành "thùng bé" + "✓ Đúng ô!"; thả chip TỔNG vào ô HIỆU → "✕ Hai số đổi chỗ: ngoặc tím ÔM CẢ HAI thanh nên là số CỘNG ra, đoạn cam tô màu là phần lệch TRỪ ra."; đủ 4 thẻ → "✓ Sơ đồ đủ hai thanh, HIỆU và TỔNG — giờ tính đáp số." và thẻ đổi thành chữ thường `thùng bé · thùng to · 120 · 10`. Cấp 2 in thẻ **phép tính** `52 + 38` · `52 − 38` (không in kết quả), cấp 3 `45 × 2` · `8`. **Cấp 4–7: 0 sơ đồ, 0 thẻ kéo, 0 ô thả**, đề viết thường ("Cả hai khay có 140 chiếc bánh. Khay thứ nhất nhiều hơn khay thứ hai 20 chiếc…"), gõ 61 (sai) → thẻ `bad` + lời giải chữa **không kèm sơ đồ** và ô nhập biến mất. Chèn một nháp kiểu cũ (không có `ver`, 6 attempts) rồi tải lại → trở về 0/24, đúng cấp 1, không hiện dòng "làm tiếp"; nháp mới lưu kèm `ver: 2`. Chạy hết 24 câu chấm → báo cáo "Trà Giang: 22 / 24 câu đúng ★★★", 0 sơ đồ trong báo cáo.

**Form**: bắt payload ngay tại trang (tạm bọc `window.sendResult`, không có request ra ngoài) → 8 field nguyên vẹn `{ten:"Ban Mai", ngay:"20/10/2026 23:45", dung:20, tong:24, sao:2, phanTram:"83%", loiSai:"Bài 4.1 … em ghi 61, đáp án đúng 60 | …", dapAnCuaEm:"… 24 dòng"}`, báo cáo báo "✅ Đã gửi kết quả về bảng điểm của thầy." Sau khi dán endpoint thật, hai đường `/d/…/formResponse` và `/d/e/…/formResponse` đều trả **HTTP 200**; đọc lại tab *Câu trả lời* thấy cả 8 cột rơi đúng câu hỏi và dấu tiếng Việt còn nguyên. Không xoá được 3 dòng nộp thử bằng điều khiển "Xóa câu trả lời" trong tab ẩn (`.click()` và chuỗi pointer-event đều bị Google bỏ qua) — phải dọn bằng tab Foreground. `node kiem-dinh.js` → `=== KHONG PHAT HIEN LOI ===` (lưu ý: file đó chỉ kiểm bài 1 bằng `vm`; bài 3 vẫn tự kiểm bằng `tuKiem()` chạy trong trang — 94 mục ở trên).

### Đã kiểm trong trình duyệt — vòng 39–46 (chiều – tối)

> **Đọc mục kiểm tra 21/10 và vòng 47–50 ở trên trước.** Đoạn dưới đây mô tả hiện trạng **ngay sau vòng 46** — khi đó số HIỆU còn nằm ở ngoặc cam riêng ngoài sơ đồ và đoạn cam chỉ ghi chữ. Vòng 47 đã ĐẢO NGƯỢC luật này (số HIỆU về TRONG đoạn cam), nên các con số "0 đoạn cam chứa số / 23 ngoặc HIỆU" không còn đúng với file hiện tại; giữ lại nguyên văn vì nó là nhật kiểm, không phải mô tả tính năng.

`tuKiem()` nay **79 mục khớp** — footer "Tự kiểm: 79 mục khớp · 34 câu luyện tập (16 câu chấm)", `#self-test-alert` ẩn, console sạch, không tràn ngang. Mục 1: 13 đoạn cam chỉ ghi HIỆU (tỉ lệ thật 8–24%, sàn 44px đủ chứa chữ) + 13 ngoặc cam riêng; 22 ô thả tên + 4 nhãn cứng; kéo **sai tên** → "✕ Tên chưa đúng — thanh DÀI là bạn nhiều hơn…", kéo đủ 4 ô đúng → thẻ chuyển xanh + "Đã đúng 1 / 13"; đề TBC (chip chú thích `45 × 2 = 90`) và đề trừu tượng đều đóng thẻ đúng. Mục 2: đoạn cam 33/15/13/24/13%, kéo đủ 4 chip (2 tên + 2 số vào hai ngoặc) → "✓ Đúng: anh dài hơn, ngoặc cam ghi 5, ngoặc tím ghi 25". Mục 3: gõ 10/120 → "Săn được cả TỔNG = 120 và HIỆU = 10", ô số HIỆU nằm trong ngoặc cam nền `rgb(239,138,43)`. Mục 6 (tối): đo DOM thấy bài mẫu đủ 4 khối, đoạn cam `15%` chứa đúng chữ "HIỆU" (không còn số), ngoặc cam riêng "HIỆU 10" nằm **dưới** khung sơ đồ, ngoặc tím "TỔNG 120" ôm cả hai thanh, cột bài 373px. Quét **toàn trang**: 24 đoạn cam thì **0 đoạn chứa số**, 23 ngoặc HIỆU (13 Mục 1 + 5 Mục 2 + 4 Mục 3 + 1 Mục 6), sơ đồ định nghĩa không có ngoặc HIỆU trống; mở cả 6 thẻ Mục 5 → 5 sơ đồ có số, cam sạch, mỗi cái một ngoặc "HIỆU 10 · 28 · 12 · 2 · 6". Đã chụp ảnh màn hình thật xác nhận bố cục Mục 1; `node kiem-dinh.js` vẫn `KHONG PHAT HIEN LOI`.

### Luồng Mục 5 chạy thật trong trình duyệt (12–13/10/2026)

Tên sai ("An") bị chặn; alias `giang` → Trà Giang, `gialinh` → Gia Linh; làm đủ 16/16 bằng nút *Kiểm tra* thật; câu đã ghi nhận thì ô nhập biến mất và gọi lại hàm chấm cũng không đổi (vẫn 23/Sai); cấp ôn 1 bấm Kiểm tra lại bao nhiêu lần cũng được và **không** ghi vào attempts; 13/16 → 81% → 2★; báo cáo có đúng 3 khối lời sai, không còn ô nhập; không tràn ngang; console sạch (chỉ còn cảnh báo Tailwind CDN).

Bản 13/10 chạy lại toàn bộ vòng làm bài và đo thêm: gõ 3 ô ở Cấp độ 4 → bấm *Kiểm tra* ô đầu → **2 ô còn vẫn giữ 257 và 999** (trước đây mất trắng); bấm Enter ở ô thứ hai ghi nhận luôn (phím `x` thì không); đổi sang Cấp độ 5 rồi quay lại Cấp độ 4, ô gõ dở vẫn còn; quay lại cổng tên rồi cho **Gia Linh** vào làm → màn hình sạch, `Đã ghi nhận 0/16`. Nộp bài thật: payload 8 field nguyên vẹn, `Ngày làm bài = 13/10/2026 12:38`, `Lời sai = "Bài 7.5: 5834 − 996 — em ghi 4800, đáp án đúng 4838"`, `Đáp án = "Bài 4.1 = 27 (đúng) | ... "` (tiếng Việt có dấu đầy đủ, dấu `-` trong `64 − 37` không vỡ). **Chặn `form.submit()` trước khi nộp nên không có request nào tới Google** — iframe vẫn `about:blank`, `performance` chỉ ghi mỗi font CDN, **Sheet của thầy không thêm dòng nào**.

Payload nộp bài được **bắt ngay tại trang** (thay `HTMLFormElement.prototype.submit`) nên không có request nào thật gửi đi — iframe vẫn là `about:blank`, Sheet không nhận rác. Payload gồm `_charset_=utf-8` + 8 `entry.*` với tên đúng: `Ban Mai` · `23:48:54 12/10/2026` · `13` · `16` · `2` · lời sai 3 dòng · `81%` · đáp án 16 dòng.

Trước đó **đã bắn thật vào Google Form** (12/10/2026): một POST ẩn danh từ `curl` trả về 200 và Sheet nhận đúng 1 dòng với cả 8 ô khớp cột; một POST thứ hai gửi từ chính trang Pages qua hàm `sendResult` cũng vào Sheet, dấu tiếng Việt nguyên vẹn. **Hai dòng test đó vẫn nằm trong Sheet** — hôm 12/10 đã bấm xoá trong màn hình Form, nhưng xoá ở Form **không xoá dòng trong Sheet** (chỉ giảm chữ "số câu trả lời" của Form). Muốn dọn phải chuột phải vào **số dòng** trong Sheet → *Xoá hàng*. Số liệu duy nhất đáng tin là Sheet, đừng tin bộ đếm của Form.

## Kế hoạch bài 4 — "Tổng và Tỉ số — Tìm hai số" (tờ plan, chưa code)

**Vì sao là bài này:** bài 3 đã mở đường sẵn — thẻ bẫy 🚧 ở Mục 5 nói thẳng "chữ *lần* báo toán TỔNG – TỈ: vẽ phần bằng nhau, không có ô lệch", và `vePhan(1, 3)` (máy vẽ **phần bằng nhau**) đã tồn tại trong file bài 3 chỉ để phục vụ cái bẫy đó. Bài 4 lấy `vePhan` làm nhân vật chính. Trong chương trình lớp 4, "Tìm hai số khi biết tổng và tỉ số" đứng ngay sau "tổng và hiệu" (sách khác nhau đặt tên hơi khác — thầy xác nhận giúp em bản đang dạy: Cánh Diều / Kết nối / Chân trời).

**Giữ nguyên từ bài 3 (đã kiểm chứng, không viết lại):** khung `index.html` + bảng màu + `.sticky-nav`; engine luyện tập 7 cấp (`CAP`, cổng 3 tên, `attempts`, Enter, giữ bài dở `localStorage` + `BAN_CAU`, thang sao, 8 field `entry.*`); máy vẽ sơ đồ theo LƯỚI HÀNG (`soDoCot`, ngoặc chỉ ôm đúng N hàng thanh); sàn theo số chữ số (`sanCamPx`); `@container` 560px cho màn hẹp; nhóm kiểm **LƯỚI KHỔ** (`luoiKhau` 320/420/760px); `selfTest()` chạy khi mở trang + tự chặn khi lệch.

**Đổi hẳn (đây là phần khó):**

| | Bài 3 (Tổng–Hiệu) | Bài 4 (Tổng–Tỉ) |
|---|---|---|
| Đơn vị trên sơ đồ | đoạn **cam** = phần lệch | **phần bằng nhau** đánh số 1 · 2 · 3 … |
| Công thức lõi | `(TỔNG − HIỆU) ÷ 2` | `1 phần = TỔNG ÷ (số phần bé + số phần lớn)` |
| Dấu hiệu đọc đề | "tất cả / nhiều hơn" | "gấp … lần", "bằng … phần", "… phần này thì … phần kia" |
| Lỗi hệ thống cần chặn | coi "hơn" là TỔNG | **áp nhầm `(T − H) ÷ 2`** — bài 4 phải có mục "vì sao KHÔNG được lấy hiệu chia 2" |

**Bảy mục đề xuất:** (0) bản đồ tư duy → (1) đọc tỉ số thành **phần**: "gấp 3 lần" = 1 phần : 3 phần, kéo số phần vào sơ đồ → (2) săn TỔNG và số phần, điền vào sơ đồ → (3) `1 phần = TỔNG ÷ tổng số phần` bằng máy cắt thanh (đổi từ máy cắt "cắt phần hơn" của bài 3) → (4) bốn dạng: gấp/ kém theo lần · ẩn TỔNG sau chu vi & trung bình cộng · **thêm/bớt làm đổi tỉ số** · tuổi (hiệu tuổi không đổi, tỉ số đổi) → (5) bẫy: "hiệu + tỉ" KHÔNG dùng TỔNG–TỈ (chuẩn bị bài 5) và "gấp 3 lần **nhiều hơn**" ≠ "gấp 3 lần" → (6) một bài giải hoàn chỉnh để đối chiếu + Bạn Gấu → (7) luyện tập 7 cấp, 48 câu (24 câu kéo thả có sơ đồ phần · 24 câu chấm không sơ đồ), gửi về Form riêng.

**Luật cho `tuKiem()` của bài 4 (phải viết mới, không chép bài 3):** tỉ số tối giản (`gcd(a,b)=1`, nếu không thì sơ đồ vẽ thừa phần); `TỔNG ÷ (a+b)` phải **nguyên**; hai số cộng lại phải khớp TỔNG; **tổng số phần ≤ 10** (vẽ trên màn 320px còn đọc được, đo bằng `luoiKhau`); đề không in sẵn chữ "TỈ SỐ" như dữ kiện cho sẵn; không lộ đáp số; mỗi dạng phải có ≥1 đề "dễ nhầm sang Tổng–Hiệu" để máy dò xem lời giải có câu "không dùng (T − H) ÷ 2" hay chưa.

**Làm theo thứ tự:** ① nối *Liên kết với Trang tính* cho **Form bài 3** (đang chờ thầy bấm, xem mục "Nơi nhận kết quả của bài 3") → ② push bài 3 (155.827 byte, chưa từng lên Pages — học sinh chưa mở được) → ③ dựng khung bài 4 + `vePhan` bản có ô kéo → ④ ngân hàng 48 câu + máy giải → ⑤ `tuKiem` + `luoiKhau` → ⑥ nhân bản Form bài 4, lấy 8 `entry.*` → ⑦ thêm thẻ thứ 4 vào trang cổng.

**Ba việc cần thầy quyết trước khi em viết:** (a) bản sách đang dạy để khớp tên đề; (b) có dùng lại 3 avatar Ban Mai / Gia Linh / Trà Giang và cùng 24 câu chấm không; (c) bài 5 là "Hiệu và Tỉ số" hay ôn tập Tổng–Hiệu + Tổng–Tỉ (quyết cái bẫy ở Mục 5 viết thế nào).

## Hạn chế đã biết

- Level 4–6 của bài 1 chỉ luyện **trừ** cột dọc; chưa có **cộng** cột dọc.
- Bài 1 phụ thuộc `cdn.tailwindcss.com`: mở khi mất mạng và chưa cache thì giao diện vỡ.
- Bài 2 chưa nối Google Form (điểm chỉ hiện trên màn hình, thầy không nhận được); sơ đồ tư duy của bài 2 rộng 960px nên trên điện thoại phải kéo ngang. Bài 3 đã nối Form nhưng **chưa liên kết Sheet**, và trên Form bài 3 còn **3 dòng nộp thử có nhãn** (`MÁY KIỂM TRA…`) chưa xoá được bằng điều khiển của Google trong tab ẩn.
- File tĩnh không xác nhận được Google đã nhận hay chưa, và không khoá được học sinh làm lại lần hai.
- Chỗ giữ bài làm dở nằm trong `localStorage` của **máy đó**: học sinh xoá lịch sử/dữ liệu duyệt web, dùng chế độ ẩn danh, hoặc làm trên máy khác là mất. Webview của app nhắn tin (Zalo/Messenger) có thể không giữ được lâu.
- Bài 3 ở 320px: thanh điều hướng 7 mục là một dải **kéo ngang** (`overflow-x: auto`) nên các mục 5–7 phải lướt mới thấy — chấp nhận vì mọi mục vẫn tới được bằng cách cuộn trang thường, nhưng đừng tưởng học sinh tự nhìn thấy nút "7. Luyện tập".
- Kéo–thả của bài 3 chạy bằng **chuột hoặc bấm** (chip → ô). Chưa có đường bàn phím (`tabindex`/`role` cho ô thả), nên em nào chỉ dùng bàn phím thì chưa làm được Mục 1·2·7.
