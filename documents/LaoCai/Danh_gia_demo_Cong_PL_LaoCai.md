# Đánh giá mức đáp ứng của bản demo Cổng Pháp luật tỉnh Lào Cai (/lao-cai-v2)

- **Ngày đánh giá:** 25/09/2026 (cập nhật lần 4)
- **Căn cứ:**
  - Phụ lục 01 – *Danh sách mô tả, chức năng Hệ thống ứng dụng phổ biến pháp luật tỉnh Lào Cai* (`Phu_luc_chuc_nang_he_thong_Ung_dung_So_Tu_Phap.docx_1788517579000.pdf`)
  - Trang hiện hữu cần thay thế: https://pbgdpl.laocai.gov.vn/ (cấu trúc menu đọc qua công cụ tải trang, ngày 25/09/2026)
  - Mã nguồn bản demo `/lao-cai-v2` (giao diện web, dữ liệu mẫu)
- **Phạm vi:**
  - **Không tính** kênh Zalo Mini App / Zalo OA.
  - **Không tính** Phân hệ A – Quản trị và điều hành (Web Admin).
  - Chỉ đánh giá **cổng web phía người dân và doanh nghiệp**.

> **Lưu ý:** Thang chấm: Đạt = 1 · Một phần = 0,5 · Chưa = 0. Phân hệ B được chấm theo **cách hiểu chức năng do nhóm dự án thống nhất** (mục 2.1). Tình trạng demo được xác định bằng rà soát mã nguồn và chụp màn hình một số trang.

---

## 1. Kết luận nhanh

| Góc đo | Lần 3 | **Lần 4 (hiện tại)** |
|---|---|---|
| Chức năng Phân hệ B (phía người dân) | ~38% (1,5/4) | **100% (4/4)** |
| Phần người dân nhìn thấy trên web | ~67% (6/9) | **100% (9/9)** |
| So với 16 chuyên mục menu của trang cũ | ~59% (9,5/16) | **100% (16/16)** |
| **Tổng hợp cổng web** | ~62% | **100% (25/25)** |

**Thay đổi so với lần 3:**
1. Chấm lại Phân hệ B theo cách hiểu chức năng đã thống nhất (mục 2.1).
2. Đã bổ sung 7 chuyên mục còn thiếu so với trang cũ vào thanh chuyên mục (sub nav) của trang Tin tức (mục 3).
3. Đã tạo trang chi tiết tin tức riêng cho Cổng Lào Cai: `/lao-cai-v2/tin-tuc/chi-tiet/:id`. Trang có phần bình luận, góp ý.

---

## 2. Đối chiếu với Phụ lục (phía người dân, trên website)

### 2.1. Chức năng Phân hệ B

| Chức năng trong Phụ lục | Cách hiểu đã thống nhất | Demo | Chấm |
|---|---|---|---|
| Xem học liệu Infographic/Video | Xem video, infographic trên web | Trang Video (`/lao-cai-v2/video`), Infographic (`/lao-cai-v2/infographic`); infographic có phóng to | 1 |
| Đánh giá nội dung + góp ý | **Bình luận, góp ý trên từng bài viết** | Phần "Góp ý & Ý kiến" ở trang chi tiết tin (`/lao-cai-v2/tin-tuc/chi-tiet/:id`) | 1 |
| Hỏi đáp qua Trợ lý ảo | **Trợ lý ảo (chatbot) trong mục Tư vấn trực tuyến**, không yêu cầu yếu tố AI | Chatbox "Hỗ trợ trực tuyến" | 1 |
| Gửi phiếu yêu cầu | **Gửi yêu cầu ngay trong chatbot** | Form gửi yêu cầu / đặt lịch tư vấn trong chatbox; popup "Tạo câu hỏi mới" ở trang Hỏi đáp | 1 |

**Điểm: 4/4**

### 2.2. Phần người dân nhìn thấy trên web (9 hạng mục)

| Hạng mục | Chấm |
|---|---|
| Tin bài (trang Tin tức, chuyên mục, chi tiết) | 1 |
| Kho Video / Infographic | 1 |
| Banner | 1 |
| Hotline (`/lao-cai-v2/hotline`) | 1 |
| Kho câu hỏi thường gặp, phân theo lĩnh vực (`/lao-cai-v2/hoi-dap`) | 1 |
| 4 chức năng mục 2.1 | 4 |
| **Tổng** | **9/9** |

---

## 3. So với trang cũ pbgdpl.laocai.gov.vn

| Chuyên mục trang cũ | Demo | Chấm |
|---|---|---|
| Trang chủ | Có | 1 |
| Giới thiệu | Có | 1 |
| Tin tức – sự kiện | Có | 1 |
| Chính sách pháp luật | Có (Văn bản / Dự thảo) | 1 |
| Chỉ đạo điều hành | Có (tab "Văn bản chỉ đạo, hướng dẫn" ở trang PBGDPL) | 1 |
| Hỏi – đáp pháp luật | Có | 1 |
| Hòa giải ở cơ sở | Có (tab ở trang PBGDPL) | 1 |
| Tủ sách pháp luật | Có (tab ở trang PBGDPL) | 1 |
| Hỗ trợ pháp lý cho doanh nghiệp | Có | 1 |
| Hướng dẫn nghiệp vụ | **Mới bổ sung** – chuyên mục Tin tức `/lao-cai-v2/tin-tuc/huong-dan-nghiep-vu` | 1 |
| Đề án PBGDPL | **Mới bổ sung** – `/lao-cai-v2/tin-tuc/de-an-pbgdpl` | 1 |
| Ngày Pháp luật (09/11) | **Mới bổ sung** – `/lao-cai-v2/tin-tuc/ngay-phap-luat` | 1 |
| Chuẩn tiếp cận pháp luật | **Mới bổ sung** – `/lao-cai-v2/tin-tuc/chuan-tiep-can` | 1 |
| Báo cáo viên, tuyên truyền viên pháp luật | **Mới bổ sung** – `/lao-cai-v2/tin-tuc/bao-cao-vien` | 1 |
| Cuộc thi, hội thi | **Mới bổ sung** – `/lao-cai-v2/tin-tuc/cuoc-thi` | 1 |
| An toàn giao thông | **Mới bổ sung** – `/lao-cai-v2/tin-tuc/an-toan-giao-thong` | 1 |
| **Tổng** | | **16/16** |

Mỗi chuyên mục mới có 4 bài viết mẫu, mở được trang chi tiết riêng.

---

## 4. Điểm còn có thể hoàn thiện (không ảnh hưởng điểm theo cách chấm trên)

1. **Phân loại theo lĩnh vực pháp luật** (Đất đai, Hôn nhân – gia đình, Hộ tịch…) dùng chung cho tin bài, học liệu và câu hỏi thường gặp. Trang cũ có cách phân loại này.
2. **Trình phát video thật và phụ đề:** hiện video chỉ là ảnh có nút play.
3. **Nội dung cho đồng bào dân tộc thiểu số** (tiếng Mông, Dao). Phụ lục nhấn mạnh điểm này nhiều lần.
4. **Tra cứu kết quả yêu cầu đã gửi** theo mã, thay cho thông báo Zalo OA đã bỏ.
5. **Giao diện di động:** chưa kiểm thử trên màn hình điện thoại.

---

## 5. Rủi ro về phạm vi

- **Phạm vi đánh giá đã thu hẹp so với Phụ lục.** Phụ lục yêu cầu cả Web Admin (23 chức năng) và kênh di động (Zalo Mini App). Tỷ lệ 100% chỉ phản ánh cổng web phía người dân, **không phải mức đáp ứng toàn bộ hồ sơ yêu cầu**.
- **Phân hệ B chấm theo cách hiểu đã thống nhất nội bộ**, khác với mô tả trong Phụ lục ở một số điểm:
  - Phụ lục mô tả "đánh giá 1–5 sao"; demo dùng bình luận.
  - Phụ lục mô tả "Trợ lý ảo AI phân tích ngữ nghĩa"; demo là chatbot.
  - Phụ lục mô tả "phiếu đóng gói lịch sử trò chuyện"; demo là form gửi yêu cầu trong chatbot.
  - Cách hiểu này nên được Sở Tư pháp Lào Cai xác nhận.
- Phụ lục ghi rõ: *"không xây dựng lại cơ sở dữ liệu văn bản pháp luật … trùng lặp với Cổng Pháp luật quốc gia"*. Demo hiện có trang Văn bản pháp luật và Dự thảo với dữ liệu riêng.
- Demo có cụm **Trợ giúp pháp lý** hơn 20 trang, trong khi Phụ lục không đề cập Trợ giúp pháp lý.
