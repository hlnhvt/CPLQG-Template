import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srsDir = path.join(__dirname, 'SRS');

function writeFile(filename, content) {
    fs.writeFileSync(path.join(srsDir, filename), content, 'utf8');
    console.log(`Updated ${filename}`);
}

const srs85 = `## A.I.7_Diễn đàn chính sách pháp luật

### A.I.7.CPLQG-VI-085 - Xem danh sách diễn đàn mới

#### Mục đích

Cho phép người dùng xem danh sách các diễn đàn chính sách pháp luật được cập nhật gần nhất. Chức năng này được thể hiện dưới dạng Tab "Mới cập nhật" trong trang Danh sách Diễn đàn (UC87). Mục tiêu là giúp người dùng nhanh chóng khám phá những diễn đàn đang có hoạt động mới dể theo dõi hoặc tham gia.

##### a. Phân quyền

- Chức năng hoàn toàn công khai, không yêu cầu đăng nhập.
- Tất cả người dùng đều có thể xem danh sách diễn đàn.
- Nút "Theo dõi" hoạt động tuỳ thuộc trạng thái đăng nhập; yêu cầu đăng nhập nếu người dùng chưa có phiên làm việc.

##### b. Điều kiện thực hiện

- Người dùng truy cập trang Danh sách Diễn đàn và chọn tab "Mới cập nhật".

---

#### CPLQG-VI-085.MH01 – Trang Danh sách Diễn đàn – Tab "Mới cập nhật"

##### Màn hình

Trang Danh sách Diễn đàn – Tab "Mới cập nhật": Hiển thị danh sách diễn đàn, phần tìm kiếm, khối sự kiện phát trực tuyến, khối tạo chủ đề và bộ lọc phân trang.

##### Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| --- | --- | --- | --- | --- |
| Header Banner | Phần đầu trang | Có | Có | Chứa ảnh nền, logo, tiêu đề "Diễn đàn pháp luật" và thanh tìm kiếm. |
| Thanh tìm kiếm | Ô nhập văn bản | Có | Có | Thanh tìm kiếm chung theo tên hoặc từ khóa diễn đàn, đi kèm nút "Tìm kiếm". |
| Khối Buổi phát trực tuyến | Danh sách | Có | Có | Nằm ở thanh bên trái (desktop), hiển thị banner rực rỡ hướng người dùng đến danh sách các sự kiện trực tuyến. |
| Khối Tạo chủ đề | Danh sách | Có | Có | Nằm dưới khối sự kiện, cung cấp nút tĩnh "Tạo chủ đề" dẫn đến trang tạo mới chủ đề. |
| Tab bar | Tab bar | Có | Tab "Tất cả diễn đàn" | Thanh tab ngang gồm: "Tất cả diễn đàn", "Mới cập nhật" (đang kích hoạt), "Xu hướng", "Đang theo dõi". |
| Lưới thẻ diễn đàn | Danh sách thẻ | Có | Có | Danh sách thẻ diễn đàn hiển thị dạng lưới 2 cột trên desktop. Sắp xếp các diễn đàn có hoạt động mới nhất. |
| Ảnh đại diện (Thumbnail) | Ảnh | Có | Có | Ảnh minh họa cho diễn đàn nằm ở góc trái thẻ diễn đàn, có hiệu ứng phóng to khi rê chuột (zoom hover). |
| Nút Theo dõi | Nút | Có | "Theo dõi" | Trạng thái "Theo dõi" (chưa theo dõi) hoặc "Đang theo dõi" (đã theo dõi). Chuyển trạng thái khi click. |
| Tên diễn đàn | Text | Có | Có | Tên đầy đủ, nổi bật. Nhấn điều hướng sang trang Danh sách Chủ đề của diễn đàn (UC90). |
| Mô tả ngắn | Text | Không | Có | Mô tả nội dung chính của diễn đàn, giới hạn 3 dòng (line-clamp-3). |
| Danh sách thẻ (Tags) | Danh sách nhãn | Không | Không | Các thẻ (#tag) gắn với diễn đàn, hiển thị định dạng nhãn màu xám con. |
| Số chủ đề | Số nguyên | Có | Có | Hiển thị kèm biểu tượng tin nhắn, thể hiện số lượng chủ đề trong diễn đàn. |
| Số thành viên theo dõi | Số nguyên | Có | Có | Hiển thị kèm biểu tượng người dùng, thể hiện số thành viên đang quan tâm diễn đàn. |
| Link chuyển trang | Biểu tượng | Có | Có | Biểu tượng mũi tên sang phải nằm ở góc phải phía dưới, dẫn vào trang danh sách chủ đề. |
| Bộ chọn số bản ghi / trang | Danh sách thả xuống | Có | 10 | Bố trí cuối danh sách, cho phép chọn `4`, `6`, `10`, hoặc `20` bản ghi trên một trang. |
| Phân trang | Thanh phân trang | Không | Có | Thanh điều hướng trang với các nút trang trước, trang sau và số trang. |

##### Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| --- | --- | --- | --- |
| 1 | Xem danh sách diễn đàn mới cập nhật | Danh sách thẻ | Hệ thống hiển thị các diễn đàn được sắp xếp dựa trên thời gian cập nhật. |
| 2 | Tìm kiếm diễn đàn | Ô nhập văn bản + Nút | Gõ từ khoá rồi nhấn "Tìm kiếm" để lọc các diễn đàn phù hợp ở tất cả các tab theo tên. |
| 3 | Chuyển trang chi tiết diễn đàn | Click vào tên/biểu tượng | Người dùng nhấn vào thẻ diễn đàn, tiêu đề, hoặc nút ở góc phải để vào danh sách chủ đề của diễn đàn đó. |
| 4 | Theo dõi/Hủy theo dõi diễn đàn | Nút "Theo dõi" | Trạng thái chuyển đổi ngay lập tức trên UI. Lưu thông tin theo dõi vào tài khoản người dùng nếu đã đăng nhập. |
| 5 | Thay đổi số lượng bản ghi hiển thị | Danh sách thả xuống | Thay đổi số bản ghi / trang. Khi thay đổi, hệ thống đặt currentPage về 1. |
| 6 | Điều hướng luồng tạo chủ đề | Nút "Tạo chủ đề" | Chọn nút trên thanh bên trái để vào form Tạo chủ đề diễn đàn mới. |

---

*Tài liệu được cập nhật tự động – Ngày: 2026-03-17*
`;

const srs86 = `## A.I.7_Diễn đàn chính sách pháp luật

### A.I.7.CPLQG-VI-086 - Xem danh sách diễn đàn nhiều người tham gia

#### Mục đích

Cho phép người dùng xem danh sách các diễn đàn thu hút nhiều thành viên tham gia để nhanh chóng nhận diện nơi có cộng đồng sôi nổi nhất. Chức năng tương ứng với Tab "Xu hướng" trong trang Danh sách Diễn đàn (UC87).

##### a. Phân quyền

- Công khai, không yêu cầu đăng nhập.
- Nút "Theo dõi" trên thẻ diễn đàn sẽ yêu cầu quyền tương tác của người dùng (nếu chưa đăng nhập).

##### b. Điều kiện thực hiện

- Người dùng truy cập trang Danh sách Diễn đàn (UC87) và chọn tab "Xu hướng".

---

#### CPLQG-VI-086.MH01 – Trang Danh sách Diễn đàn – Tab "Xu hướng"

##### Màn hình

Trang Danh sách Diễn đàn – Tab "Xu hướng": Giao diện kế thừa hoàn toàn cấu trúc lưới chuẩn của trang diễn đàn, nhưng danh sách được sắp xếp và lấy dữ liệu ngầm theo số lượng thành viên tham gia.

##### Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| --- | --- | --- | --- | --- |
| Tab bar | Tab bar | Có | Tab "Xu hướng" | Thanh tab trong đó tab "Xu hướng" (kèm icon mũi tên đi lên) đang được chọn. |
| Lưới thẻ diễn đàn | Danh sách thẻ | Có | Có | Hiển thị thông tin diễn đàn giống hệt tab "Trong tất cả diễn đàn", nhưng danh sách được hệ thống tự động sắp xếp theo lượng người theo dõi từ cao xuống thấp. |
| (Các cấu phần thẻ diễn đàn giống MH01 ở UC85) | Các trường | Có | Có | Bao gồm thumbnail, nút theo dõi, tên diễn đàn, mô tả, nhãn tag, lượng chủ đề/thành viên. |

##### Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| --- | --- | --- | --- |
| 1 | Xem danh sách diễn đàn nổi bật/nhiều người tham gia | Danh sách thẻ | Tự động sắp xếp (sort gầm) mảng dữ liệu diễn đàn theo thuộc tính số lượng người theo dõi giảm dần và hiển thị dưới dạng lưới. |
| 2 | Các chức năng tiêu chuẩn của diễn đàn | Nhiều loại | Tìm kiếm, Theo dõi, Phân trang, bộ chọn số bản ghi trên trang và liên kết vào danh sách chủ đề hoạt động y hệt như trang mặc định. |

---

*Tài liệu được cập nhật tự động – Ngày: 2026-03-17*
`;

const srs87 = `## A.I.7_Diễn đàn chính sách pháp luật

### A.I.7.CPLQG-VI-087 - Xem danh sách diễn đàn

#### Mục đích

Cung cấp trang tổng quan liệt kê tất cả diễn đàn hiện có trên hệ thống, kèm bộ tính năng tìm kiếm và phân loại chi tiết (tab), cho phép người dùng tùy chọn và thay đổi thiết lập hiển thị (phân trang, số dòng). Đây là màn hình chính (Tab "Tất cả diễn đàn") của khu vực Diễn đàn.

##### a. Phân quyền

- Xem không yêu cầu đăng nhập. Các thao tác tương tác (Theo dõi, Tạo chủ đề mới) cần có tài khoản đóng vai trò tương ứng.

##### b. Điều kiện thực hiện

- Vào Trang chủ diễn đàn.

---

#### CPLQG-VI-087.MH01 – Trang Danh sách Diễn đàn Toàn diện

##### Màn hình

Trang Danh sách Diễn đàn – Tab "Tất cả diễn đàn": Là màn hình tải mặc định bao gồm đầy đủ banner, điều hướng sidebar (livestream, nút đăng chủ đề) và lưới thông tin.

##### Mô tả thông tin trên màn hình

| Trường thông tin | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả |
| --- | --- | --- | --- | --- |
| Header Banner | Phần đầu trang | Có | Có | Khối lớn với nền trống đồng, Tiêu đề, thông điệp và Form Tìm kiếm toàn phần. |
| Cột thanh bên (Sidebar) | Layout tĩnh | Có | Có | Hiển thị 2 khối chức năng tĩnh: Buổi phát trực tuyến (background đỏ cam rực rỡ) và Tạo chủ đề mới (background xanh). Không có danh sách lọc theo chủ đề xổ dọc. |
| Bộ chọn Tab | Tab bar | Có | Tab "Tất cả diễn đàn" | Bốn tab phân loại chức năng (Tất cả diễn đàn, Mới cập nhật, Xu hướng, Đang theo dõi). |
| Danh sách Diễn đàn | Danh sách thẻ | Có | Có | Thẻ hiển thị hình ảnh, tên, tóm tắt, nhãn, dữ liệu định lượng (số lượng topic, số lượt thích) và nút THEO DÕI. |
| Lọc số bản ghi trên màn hình | Danh sách thả xuống | Có | 10 bản ghi/trang | Góc dưới danh sách có text "Hiển thị" + chọn 4/6/10/20 bản ghi trên trang. |
| Pagination | Thanh phân trang | Không | Có | Hiện phân trang khi số lượng diễn đàn tổng quát vượt quá giới hạn thiết lập của danh sách thả xuống. |

##### Chức năng trên màn hình

| STT | Tên chức năng | Định dạng | Mô tả |
| --- | --- | --- | --- |
| 1 | Khởi tạo dữ liệu mặc định | Chức năng ngầm | Mới vào trang tải Tab "Tất cả diễn đàn", không có filter search. Trang lấy bản ghi đầu tiên tuỳ theo số ItemPerPage (mặc định 10). |
| 2 | Tìm kiếm diễn đàn | Ô nhập văn bản + Nút | Tìm kiếm theo tên hoặc chủ đề vào ô tìm kiếm ở banner. Chỉ hiển thị diễn đàn thoả mãn điều kiện logic match chuỗi. Trang phân trang tự reset lại 1. |
| 3 | Chuyển đổi qua lại giữa các tab | Tab bar | Nhấn vào tab để chọn loại danh sách lọc ("Đang theo dõi" sẽ lọc ra những diễn đàn user có đánh dấu \`isFollowing\`). |
| 4 | Hiệu ứng điều hướng trực quan | Chức năng ngầm | Trên nút đăng kí "Buổi livestream" và khi trỏ vào thẻ diễn đàn, UI hỗ trợ viền zoom-in, đổ bóng làm mượt trải nghiệm khách hàng. |

---

*Tài liệu được cập nhật tự động – Ngày: 2026-03-17*
`;

writeFile('85.Xem danh sách diễn đàn mới_SRS_AI_Generated.md', srs85);
writeFile('86.Xem danh sách diễn đàn nhiều người tham gia_SRS_AI_Generated.md', srs86);
writeFile('87.Xem danh sách diễn đàn_SRS_AI_Generated.md', srs87);
