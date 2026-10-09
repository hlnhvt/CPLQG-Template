const fs = require('fs');
const path = require('path');

// We will create the complete 26-test suite (Tests 1-6 from previous, and Tests 7-26 for Automotive & EV)
// Total 26 tests * 15 questions = 390 questions!

const automotiveTests = [
  {
    id: 7,
    title: "Bài 7: Kiến Trúc Màn Hình & Phân Vùng Buồng Lái Ô Tô",
    badge: "Automotive Architecture",
    category: "auto",
    description: "Phân bổ chức năng giữa Digital Cluster (Đồng hồ lái), IVI (Màn hình trung tâm), HUD và màn hình điều hòa chuyên dụng.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Cụm đồng hồ kỹ thuật số (Digital Instrument Cluster) phía sau vô-lăng có vai trò cốt lõi và giới hạn thiết kế nghiêm ngặt nào?",
        options: [
          "A. Là nơi phát video ca nhạc và lướt mạng xã hội cho tài xế.",
          "B. Hiển thị thông tin an toàn vận hành thời gian thực (tốc độ, cảnh báo nguy hiểm, trạng thái ADAS) và bị nghiêm cấm chứa các nội dung giải trí gây phân tâm.",
          "C. Chỉ được phép hiển thị dưới dạng kim đồng hồ cơ học cổ điển.",
          "D. Không được phép kết nối với hệ thống dây dẫn của xe."
        ],
        answer: 1,
        explanation: "Digital Cluster là màn hình an toàn bậc 1 (Safety-critical), được quản lý bởi tiêu chuẩn an toàn ISO 26262. Nó ưu tiên tuyệt đối cho tốc độ, đèn báo lỗi hệ thống phanh, động cơ/pin và cảnh báo khoảng cách."
      },
      {
        id: 2,
        question: "Màn hình thông tin giải trí trung tâm (IVI - In-Vehicle Infotainment) thường được bố trí ở vùng không gian nào của cabin?",
        options: [
          "A. Dưới sàn xe gần bàn đạp phanh.",
          "B. Trung tâm bảng táp-lô (Center Stack), trong tầm với tay thuận tiện của cả người lái và hành khách phía trước.",
          "C. Phía sau lưng ghế lái.",
          "D. Trên trần xe sát cửa sổ trời."
        ],
        answer: 1,
        explanation: "Center Stack IVI nằm ở giữa bảng điều khiển trung tâm, nằm trong vùng với tay thuận tiện (Comfort reach zone) của cả tài xế và hành khách ghế phụ, dùng cho điều hướng, media, cài đặt tiện nghi xe."
      },
      {
        id: 3,
        question: "Màn hình điều khiển điều hòa độc lập (Dedicated HVAC Screen) mang lại ưu thế tương tác nào so với việc nhét tính năng điều hòa vào menu sâu của màn hình chính?",
        options: [
          "A. Giúp giảm chi phí sản xuất xe xuống mức tối thiểu.",
          "B. Giữ các chức năng chỉnh nhiệt độ, tốc độ gió và sấy kính luôn sẵn sàng 1 chạm (Always accessible), tránh việc tài xế phải thoát khỏi bản đồ điều hướng để chỉnh điều hòa.",
          "C. Bắt buộc phải khởi động lại máy tính mỗi khi đổi nhiệt độ.",
          "D. Tăng thời gian phản hồi của hệ thống làm mát."
        ],
        answer: 1,
        explanation: "Điều hòa và sấy kính là các chức năng thường dùng và ảnh hưởng đến tầm nhìn an toàn (kính mờ do sương). Một màn hình hoặc thanh phím tắt điều hòa cố định giúp người lái thao tác 1 chạm mà không làm mất bản đồ dẫn đường trên IVI."
      },
      {
        id: 4,
        question: "Xu hướng 'Pillar-to-Pillar Display' (Màn hình trải dài từ cột A bên trái sang cột A bên phải) đặt ra thách thức HMI lớn nhất nào?",
        options: [
          "A. Kính xe không đủ chỗ để lắp ráp.",
          "B. Nguy cơ xao nhãng thị giác cực lớn do quá nhiều thông tin động trải dài trong tầm mắt và khó khăn trong việc phân tách ranh giới tập trung của tài xế.",
          "C. Không thể sử dụng được vào ban ngày.",
          "D. Xe không đủ điện ắc quy để khởi động."
        ],
        answer: 1,
        explanation: "Màn hình kéo dài nguyên bảng táp-lô dễ tạo ra 'bão thông tin thị giác' (visual overload). HMI phải giải quyết bằng cách áp dụng công nghệ lọc góc nhìn bảo mật (Privacy filter) để tài xế không nhìn thấy video bên ghế phụ."
      },
      {
        id: 5,
        question: "Vùng tương tác ưu tiên trên màn hình trung tâm xe tay lái thuận bên trái (LHD - Left Hand Drive như tại Việt Nam) nên đặt ở đâu?",
        options: [
          "A. Nửa bên phải sát cửa phụ.",
          "B. Nửa bên trái sát người lái và dải thanh công cụ (Dock bar) sát mép trái hoặc mép dưới để tối thiểu hóa tầm với tay của tài xế.",
          "C. Góc trên cùng bên phải xa nhất.",
          "D. Hoàn toàn ngẫu nhiên."
        ],
        answer: 1,
        explanation: "Trên xe LHD, tài xế ngồi bên trái; các nút bấm quan trọng (Home, Menu điều hướng, phím tắt nhanh) phải nằm ở mép trái màn hình để khoảng cách di chuyển tay (Fitts's Law) là ngắn nhất."
      },
      {
        id: 6,
        question: "Màn hình hiển thị trên kính lái (HUD - Head-Up Display) thuộc nhóm hiển thị thông tin loại nào theo phân loại an toàn?",
        options: [
          "A. Cấp 3 - Giải trí đa phương tiện nâng cao.",
          "B. Cấp 1 - Thông tin lái xe thiết yếu trong tầm mắt tức thời (Primary Driving Information).",
          "C. Màn hình phụ cho người ngồi hàng ghế thứ hai.",
          "D. Thiết bị định vị độc lập."
        ],
        answer: 1,
        explanation: "HUD là giao diện bậc 1 ngay trong tầm nhìn trực diện (Line-of-sight), chỉ hiển thị thông số sống còn: Tốc độ hiện tại, giới hạn tốc độ đường, mũi tên rẽ tiếp theo và cảnh báo người đi bộ."
      },
      {
        id: 7,
        question: "Khái niệm 'Contextual Dock' (Thanh điều hướng theo ngữ cảnh) trong HMI ô tô hiện đại có nghĩa là gì?",
        options: [
          "A. Thanh menu luôn cố định 100% không bao giờ thay đổi.",
          "B. Thanh phím tắt thông minh tự động thay đổi các nút chức năng phù hợp theo trạng thái xe (Ví dụ: khi lùi xe sẽ hiện camera 360; khi dừng đèn đỏ sẽ hiện nút mở cốp/sạc).",
          "C. Thanh công cụ chỉ hiện khi xe chạy trên 150 km/h.",
          "D. Nơi hiển thị các quảng cáo thương mại."
        ],
        answer: 1,
        explanation: "Contextual Dock giảm thiểu số thao tác tìm kiếm bằng cách đưa các tính năng sát với hành vi hiện tại của tài xế ra ngay màn hình chính đúng thời điểm cần thiết."
      },
      {
        id: 8,
        question: "Tại sao trong thiết kế HMI ô tô, các nút bấm 'Home' và 'Back' ảo luôn phải giữ nguyên vị trí cố định trên toàn bộ các ứng dụng con?",
        options: [
          "A. Vì luật sở hữu trí tuệ yêu cầu.",
          "B. Để xây dựng thói quen phản xạ cơ bắp (Muscle memory), giúp tài xế chạm vào nút thoát hiểm/về trang chủ một cách vô thức mà không cần liếc mắt tìm kiếm.",
          "C. Để giảm dung lượng bộ nhớ RAM của phần mềm.",
          "D. Để ngăn chặn việc khách hàng tự cài thêm ứng dụng ngoài."
        ],
        answer: 1,
        explanation: "Muscle memory là yếu tố sống còn khi lái xe. Nếu mỗi ứng dụng đặt nút Back ở một góc khác nhau, tài xế sẽ phải rời mắt khỏi đường 1-2 giây để tìm kiếm, làm tăng vọt nguy cơ tai nạn."
      },
      {
        id: 9,
        question: "Hiện tượng phản chiếu bóng bảng táp-lô lên kính lái (Windshield Reflection) được các kỹ sư HMI và CMF giải quyết bằng giải pháp nào?",
        options: [
          "A. Dán kính chắn gió màu đen tuyền.",
          "B. Sơn bề mặt táp-lô bằng vật liệu tối màu không bóng (Matte/Anti-reflective finish) và thiết kế mái che (Hood/Binnacle) trên cụm đồng hồ.",
          "C. Tắt toàn bộ đèn nội thất.",
          "D. Lắp quạt thông gió thổi thẳng vào kính lái."
        ],
        answer: 1,
        explanation: "Vật liệu bóng trên táp-lô dưới ánh nắng gắt sẽ in bóng ngược lên kính lái che khuất tầm nhìn đường. Thiết kế HMI vật lý bắt buộc dùng vật liệu nhám mờ hấp thụ quang học và có mái che cho màn hình Cluster."
      },
      {
        id: 10,
        question: "Tần số làm tươi (Refresh Rate) của màn hình cụm đồng hồ lái xe hơi khuyến nghị tối thiểu là bao nhiêu để kim tốc độ mượt mà?",
        options: [
          "A. 15 Hz",
          "B. Tối thiểu 60 Hz (hoặc 120 Hz) với độ trễ khung hình dưới 30ms.",
          "C. 5 Hz",
          "D. Không cần quan tâm tần số."
        ],
        answer: 1,
        explanation: "Nếu kim đồng hồ tốc độ hoặc đồ thị ADAS bị giật lag (dưới 30fps), tài xế sẽ bị say chuyển động (motion blur) và phán đoán sai gia tốc tức thời của xe. Chuẩn tối thiểu phải là 60fps mượt mà."
      },
      {
        id: 11,
        question: "Màn hình hiển thị kỹ thuật số thay cho gương chiếu hậu bên ngoài (Digital Side Mirrors / Camera Monitor System - CMS) có ưu điểm HMI gì?",
        options: [
          "A. Cho phép tài xế chụp ảnh phong cảnh hai bên đường.",
          "B. Tối ưu khí động học, loại bỏ điểm mù góc rộng và tự động tăng độ sáng, khử sương mù/chống lóa đèn pha phía sau vào ban đêm.",
          "C. Giảm trọng lượng lốp xe.",
          "D. Thay thế hoàn toàn cảm biến radar."
        ],
        answer: 1,
        explanation: "Camera Monitor Systems (CMS) thay thế gương cơ học giúp mở rộng góc quan sát, loại bỏ điểm mù và xử lý hình ảnh qua ISP để nhìn rõ người đi bộ trong đêm tối hoặc mưa bão mù mịt."
      },
      {
        id: 12,
        question: "Vị trí đặt màn hình CMS hiển thị camera gương chiếu hậu trong cabin cần tuân thủ nguyên tắc công thái học nào?",
        options: [
          "A. Đặt sát chân ga.",
          "B. Bố trí ở chân cột A gần vị trí của gương chiếu hậu truyền thống nhất có thể, để tài xế không phải thay đổi thói quen liếc mắt đã hình thành qua nhiều năm.",
          "C. Đặt trên trần xe phía sau gáy người lái.",
          "D. Ghép chung vào màn hình giải trí trung tâm."
        ],
        answer: 1,
        explanation: "Tài xế có phản xạ liếc sang góc cột A để nhìn gương. Đặt màn hình CMS ngay chân cột A tôn trọng mô hình tinh thần có sẵn, hạn chế tối đa thời gian làm quen và bối rối."
      },
      {
        id: 13,
        question: "Khái niệm 'Cards / Widgets UI' trên màn hình chính của xe hơi (Home Screen) giúp ích gì cho trải nghiệm người lái?",
        options: [
          "A. Cho phép chơi bài trực tuyến.",
          "B. Cho phép xem nhanh đồng thời nhiều khối thông tin cốt lõi (Bản đồ thu nhỏ, Trình phát nhạc, Áp suất lốp) trên cùng một màn hình mà không cần chuyển đổi tab.",
          "C. Giúp xe chạy nhanh hơn trên đường cao tốc.",
          "D. Tiết kiệm dung lượng pin chì 12V."
        ],
        answer: 1,
        explanation: "Giao diện dạng thẻ (Cards/Widgets) mang lại cái nhìn tổng quan đa luồng (Glanceable multi-information). Tài xế chỉ cần liếc 0.5s là vừa thấy ngã rẽ bản đồ vừa thấy bài hát đang phát."
      },
      {
        id: 14,
        question: "Tại sao tỷ lệ màn hình siêu dài (Ultra-wide aspect ratio như 32:9 hoặc 24:9) ngày càng được ưa chuộng trên bảng táp-lô ô tô?",
        options: [
          "A. Vì nhà máy sản xuất kính màn hình bị thừa phôi cắt.",
          "B. Màn hình rộng theo chiều ngang giúp hiển thị nhiều nội dung dàn trải theo tầm mắt mà không ăn vào chiều cao thẳng đứng, không cản trở góc nhìn ra kính chắn gió phía trước.",
          "C. Để lắp được nhiều loa hơn dưới sàn xe.",
          "D. Để bắt buộc người dùng chỉ dùng 1 ứng dụng."
        ],
        answer: 1,
        explanation: "Màn hình quá cao theo phương đứng sẽ nhô lên cản trở tầm nhìn ra mặt đường của kính lái. Màn hình dẹt siêu rộng nằm trọn bên dưới đường chân trời quan sát (Beltline), vừa giàu thông tin vừa giữ an toàn thị giác."
      },
      {
        id: 15,
        question: "Phím tắt vật lý 'Hazard Warning Light' (Đèn khẩn cấp tam giác đỏ) trên xe hơi có quy định HMI bắt buộc nào?",
        options: [
          "A. Bắt buộc phải là nút cảm ứng nằm trong menu ứng dụng bảo trì.",
          "B. Bắt buộc phải là nút cơ học vật lý chuyên dụng, vị trí dễ thấy và dễ bấm tức thời bởi cả người lái và hành khách phía trước trong mọi tình huống khẩn cấp.",
          "C. Chỉ được kích hoạt bằng giọng nói.",
          "D. Phải có khóa mật mã để tránh bấm nhầm."
        ],
        answer: 1,
        explanation: "Quy chuẩn an toàn quốc tế (ECE R48/FMVSS) bắt buộc nút đèn cảnh báo nguy hiểm (Hazard) phải là phím vật lý độc lập, màu đỏ có biểu tượng tam giác, kích hoạt được ngay cả khi xe tắt máy hoàn toàn."
      }
    ]
  },
  {
    id: 8,
    title: "Bài 8: Công Thái Học Buồng Lái & Tầm Nhìn (Cockpit Ergonomics)",
    badge: "Ergonomics & Vision",
    category: "auto",
    description: "Khái niệm H-Point, Eyellipse (Elip mắt), góc nhìn Sightlines, vùng với tay Reach zones và chuyển động mắt của tài xế.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Điểm 'H-Point' (Hip Point / Điểm hông) theo chuẩn SAE J826 có vai trò nền tảng gì trong thiết kế công thái học buồng lái ô tô?",
        options: [
          "A. Là điểm lắp đặt máy điều hòa nhiệt độ.",
          "B. Là trục bản lề nối giữa đùi và thân người ngồi của người lái, đóng vai trò là điểm mốc tọa độ gốc để tính toán tầm nhìn, khoảng duỗi chân và vùng với tay tới màn hình HMI.",
          "C. Là vị trí đặt biển số xe phía sau.",
          "D. Là tâm điểm của trục bánh xe trước."
        ],
        answer: 1,
        explanation: "H-Point là tọa độ tham chiếu cốt tử của ngành công thái học ô tô. Mọi kích thước không gian cabin từ khoảng cách mắt đến kính lái, góc với tay tới màn hình đều lấy mốc xuất phát từ H-Point."
      },
      {
        id: 2,
        question: "Khái niệm 'Eyellipse' (SAE J941 - Vùng elip mắt người lái) được định nghĩa là gì?",
        options: [
          "A. Một loại kính mắt đặc biệt dùng để lái xe ban đêm.",
          "B. Một khối hình học elip đại diện cho sự phân bố không gian thống kê của vị trí mắt của toàn bộ quần thể tài xế (từ nữ 5th percentile đến nam 95th percentile) khi ngồi trên ghế lái.",
          "C. Ống kính camera chụp ảnh người vi phạm giao thông.",
          "D. Thiết bị đo nồng độ cồn qua giác mạc."
        ],
        answer: 1,
        explanation: "Eyellipse là hình elip bao trọn các vị trí mắt có thể có của đa số tài xế. Kỹ sư HMI căn cứ vào Eyellipse để định vị kính lái, gương chiếu hậu và góc nghiêng màn hình để 95% người lái không bị che khuất tầm nhìn."
      },
      {
        id: 3,
        question: "Góc hạ mắt (Down-angle of view) từ đường chân trời tự nhiên xuống màn hình hiển thị trung tâm nên giới hạn trong khoảng nào để đảm bảo an toàn?",
        options: [
          "A. Khoảng 60° đến 80° sát gầm xe.",
          "B. Không nên vượt quá 15° đến 30° so với trục nhìn thẳng về phía trước để giảm thiểu thời gian điều tiết mắt.",
          "C. Đúng 90° vuông góc với đùi.",
          "D. Càng sâu xuống dưới càng tốt để tránh chói nắng."
        ],
        answer: 1,
        explanation: "Nếu góc hạ mắt lớn hơn 30°, tài xế phải gục cả đầu xuống để nhìn màn hình, làm mất hoàn toàn tầm nhìn bao quát mặt đường phía trước. Giữ góc hạ mắt < 30° giúp tài xế vẫn nhận biết được chuyển động xe phía trước bằng thị giác ngoại vi."
      },
      {
        id: 4,
        question: "Khái niệm 'Primary Reach Zone' (Vùng với tay sơ cấp) của người lái xe được xác định như thế nào?",
        options: [
          "A. Khoảng cách người lái phải rướn người và nhấc lưng ra khỏi tựa ghế mới chạm tới được.",
          "B. Vùng không gian mà tay người lái có thể dễ dàng chạm tới khi lưng vẫn tựa sát thoải mái vào lưng ghế lái.",
          "C. Vùng ngăn đựng đồ dưới cốp sau.",
          "D. Vùng ghế hành khách phía sau."
        ],
        answer: 1,
        explanation: "Primary Reach Zone là vùng tay với tới tự nhiên mà không cần nhấc lưng khỏi ghế. Tất cả các nút bấm và màn hình tương tác quan trọng khi xe đang chạy bắt buộc phải nằm gọn trong vùng này."
      },
      {
        id: 5,
        question: "Góc quay đầu (Head Turn Angle) tối đa của tài xế khi nhìn vào màn hình trung tâm IVI không nên vượt quá:",
        options: [
          "A. 90° sang hẳn bên phải.",
          "B. Khoảng 20° đến 30° so với hướng nhìn thẳng lái xe.",
          "C. 180° quay ra sau xe.",
          "D. 0° tuyệt đối không được quay đầu."
        ],
        answer: 1,
        explanation: "Quay đầu quá 30° khiến tài xế mất hoàn toàn thị giác ngoại vi đối với làn đường phía trước. HMI ô tô phải bố trí màn hình hơi xoay nhẹ về phía ghế lái (Driver-oriented angle) để tài xế chỉ cần liếc mắt kết hợp lắc đầu nhẹ là nhìn thấy."
      },
      {
        id: 6,
        question: "Góc nghiêng của bề mặt màn hình hiển thị (Display Tilt Angle) hướng về phía người lái mang lại lợi ích công thái học gì?",
        options: [
          "A. Khiến hành khách bên cạnh không thể xem được phim.",
          "B. Tối ưu góc nhìn vuông góc (Perpendicular viewing angle), giảm độ méo màu của tấm nền và giảm thiểu phản chiếu ánh sáng mặt trời từ cửa sổ bên hông.",
          "C. Làm cho xe chạy êm hơn trên đường gồ ghề.",
          "D. Giảm độ phân giải của hình ảnh."
        ],
        answer: 1,
        explanation: "Màn hình hơi nghiêng góc 8° - 15° hướng về mắt tài xế giúp tăng độ tương phản hiển thị, màu sắc không bị biến dạng và giảm độ chói phản xạ từ kính xe."
      },
      {
        id: 7,
        question: "Cơ chế điều tiết mắt (Accommodation) của tài xế diễn ra như thế nào khi chuyển đổi giữa nhìn mặt đường và nhìn màn hình trong xe?",
        options: [
          "A. Mắt không cần điều tiết tiêu cự.",
          "B. Thể mi mắt phải thay đổi độ cong của thủy tinh thể để chuyển đổi tiêu cự từ vô cực (mặt đường xa) về cự ly gần (màn hình cách mắt khoảng 60-80cm), mất khoảng 0.2 - 0.5 giây đối với người trẻ và lâu hơn ở người lớn tuổi.",
          "C. Mắt tự động đổi màu giác mạc.",
          "D. Thủy tinh thể co cứng lại hoàn toàn."
        ],
        answer: 1,
        explanation: "Thời gian điều tiết tiêu cự (Accommodative delay) khiến tài xế bị mất tập trung tạm thời. Đây chính là lý do công nghệ AR-HUD chiếu ảnh ảo ở khoảng cách 7-10 mét được đánh giá là an toàn vượt trội vì mắt không cần đổi tiêu cự."
      },
      {
        id: 8,
        question: "Độ chênh lệch chiếu sáng giữa môi trường ngoài trời nắng gắt (khoảng 10.000 nits) và màn hình hiển thị trong xe đòi hỏi độ sáng màn hình ô tô (Automotive Display Brightness) phải đạt:",
        options: [
          "A. Tối đa 100 nits là đủ.",
          "B. Tối thiểu 800 đến 1.500 nits (hoặc cao hơn với HUD) kèm lớp phủ chống chói (Anti-Glare) và chống phản chiếu (Anti-Reflective).",
          "C. 50 nits để tiết kiệm điện.",
          "D. 1.000.000 nits."
        ],
        answer: 1,
        explanation: "Màn hình điện thoại thông thường (400-600 nits) sẽ bị đen xì không đọc được khi ánh nắng chiếu thẳng vào xe. Màn hình ô tô đạt chuẩn phải có độ sáng cực cao từ 800 - 1500 nits kết hợp cảm biến điều chỉnh tự động."
      },
      {
        id: 9,
        question: "Hiện tượng mỏi cơ cánh tay khi thao tác màn hình cảm ứng ô tô trong thời gian dài bắt nguồn từ nguyên nhân công thái học nào?",
        options: [
          "A. Ghế lái không có đệm sưởi.",
          "B. Thiếu điểm tựa cơ học cho cổ tay hoặc cẳng tay (Palm/Wrist rest), khiến toàn bộ trọng lượng cánh tay phải gồng lơ lửng trong không gian khi xe rung lắc.",
          "C. Màn hình hiển thị quá nhiều màu xanh.",
          "D. Bàn đạp chân ga quá cứng."
        ],
        answer: 1,
        explanation: "Khi xe di chuyển trên đường xóc, việc giơ tay không điểm tựa khiến ngón tay bị rung giật và cơ vai mỏi nhừ. Các thiết kế HMI xuất sắc (như bệ tỳ tay có touchpad của Lexus hay núm iDrive của BMW) luôn có chỗ tỳ cổ tay cố định."
      },
      {
        id: 10,
        question: "Khái niệm 'Knee Clearance' (Khoảng trống đầu gối) và bảng táp-lô ảnh hưởng thế nào đến bố trí cụm nút điều khiển HMI bên dưới?",
        options: [
          "A. Không có liên quan nào giữa đầu gối và nút bấm.",
          "B. Cụm nút bấm và màn hình phụ phía dưới không được nhô ra quá mức gây va đập chấn thương đầu gối khi va chạm giao thông hoặc làm cản trở chân chuyển giữa bàn đạp ga và phanh.",
          "C. Đầu gối tài xế dùng để bật đèn xi-nhan.",
          "D. Dùng để chứa dây cáp sạc điện thoại."
        ],
        answer: 1,
        explanation: "Quy chuẩn an toàn va chạm (FMVSS 201) yêu cầu khu vực đầu gối phải bằng phẳng, không có cạnh sắc nhọn hoặc cụm nút nhô ra có thể gây gãy xương khi xảy ra va chạm trước."
      },
      {
        id: 11,
        question: "Độ rung chấn cơ học của xe (Vehicle Vibration Spectrum) ảnh hưởng tiêu cực như thế nào đến khả năng đọc thông số trên màn hình HMI?",
        options: [
          "A. Làm màn hình tự động đổi ngôn ngữ.",
          "B. Gây rung nhòe hình ảnh trên võng mạc, làm giảm 30-50% khả năng đọc các phông chữ nhỏ và các đường kẻ mảnh của người lái.",
          "C. Làm cháy bóng đèn LED nền.",
          "D. Tăng độ phân giải của màn hình."
        ],
        answer: 1,
        explanation: "Độ rung tần số 2-10Hz của khung gầm xe làm mắt và màn hình chuyển động lệch pha. Vì vậy, chữ số trên màn hình ô tô bắt buộc phải có nét chữ dày dặn (bold), kích thước lớn hơn 20-30% so với trên điện thoại."
      },
      {
        id: 12,
        question: "Thiết kế vô-lăng kiểu vát đáy (Flat-bottom steering wheel) hoặc kiểu phi thuyền (Yoke steering) có tác động gì đến tầm nhìn vào cụm đồng hồ Cluster?",
        options: [
          "A. Giúp xe bay lên khỏi mặt đất.",
          "B. Cải thiện khoảng trống duỗi chân của tài xế và mở rộng trường nhìn trực diện vào màn hình đồng hồ tốc độ mà không bị vành trên của vô-lăng che khuất.",
          "C. Tiết kiệm năng lượng cho mô-tơ trợ lực lái.",
          "D. Làm tăng đường kính quay vòng của bánh xe."
        ],
        answer: 1,
        explanation: "Vành vô-lăng tròn truyền thống thường che mất nửa trên của cụm đồng hồ. Thiết kế vát cạnh hoặc hạ thấp vành vô lăng (như i-Cockpit của Peugeot) giúp tài xế nhìn thẳng vào bảng đồng hồ phía trên vô-lăng rất thoáng mắt."
      },
      {
        id: 13,
        question: "Kích thước tối thiểu khuyến nghị của các biểu tượng cảm ứng (Touch Target Size) trên màn hình trung tâm ô tô là:",
        options: [
          "A. 5 mm x 5 mm",
          "B. Tối thiểu 14 mm x 14 mm (khoảng 60x60 pixel trở lên) và khoảng cách giữa các nút tối thiểu 3-5mm.",
          "C. 1 mm x 1 mm",
          "D. To bằng cả màn hình 15 inch."
        ],
        answer: 1,
        explanation: "Do xe liên tục rung lắc và tài xế phải vừa nhìn đường vừa bấm, kích thước nút cảm ứng trên ô tô phải lớn hơn đáng kể so với smartphone (chuẩn ISO khuyến nghị nút quan trọng đạt từ 14-20mm)."
      },
      {
        id: 14,
        question: "Tại sao tài xế đeo kính mát phân cực (Polarized Sunglasses) thường gặp hiện tượng màn hình ô tô bị đen thui không đọc được?",
        options: [
          "A. Kính mát làm hết pin màn hình.",
          "B. Do góc phân cực của tấm phim phân cực trên màn hình LCD bị xung đột góc 90° với trục phân cực của tròng kính mát, triệt tiêu hoàn toàn ánh sáng phát ra.",
          "C. Kính mát làm giảm tốc độ truyền sóng Bluetooth.",
          "D. Do người lái xe nhắm mắt."
        ],
        answer: 1,
        explanation: "Kính mát phân cực ngăn ánh sáng phân cực ngang để chống chói mặt đường. Nếu màn hình LCD ô tô cũng phân cực ngang, ánh sáng sẽ bị chặn 100%. Các màn hình ô tô chuẩn phải dùng tấm phân cực xiên 45° hoặc màn hình OLED không dùng phân cực tuyến tính."
      },
      {
        id: 15,
        question: "Vùng nhìn 'Blind Spot' (Điểm mù thị giác sinh học) của mắt người tại nơi dây thần kinh thị giác nối vào võng mạc nhắc nhở thiết kế HMI điều gì?",
        options: [
          "A. Luôn chỉ đặt thông báo ở rìa ngoài cùng bên trái.",
          "B. Không được dựa vào một biểu tượng tĩnh duy nhất; các cảnh báo va chạm nguy cấp phải có hiệu ứng nhấp nháy chuyển động hoặc kết hợp âm thanh để kích hoạt phản xạ thị giác đa điểm.",
          "C. Yêu cầu tài xế chỉ nhìn bằng 1 mắt.",
          "D. Không cần quan tâm tới điểm mù."
        ],
        answer: 1,
        explanation: "Mắt người có điểm mù sinh lý tự nhiên. Nếu cảnh báo nguy hiểm chỉ là một đốm màu tĩnh nằm đúng điểm mù của góc nhìn, tài xế sẽ hoàn toàn không thấy nó. Tín hiệu chuyển động/nhấp nháy sẽ phá vỡ điểm mù này."
      }
    ]
  },
  {
    id: 9,
    title: "Bài 9: Xao Nhãng Tài Xế & Tiêu Chuẩn An Toàn Quốc Tế",
    badge: "Driver Safety Standards",
    category: "auto",
    description: "Tiêu chuẩn ISO 15005, ISO 16673, Hướng dẫn NHTSA, Liên minh AAM và quy định bắt buộc phím bấm cơ học của Euro NCAP 2026.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Tiêu chuẩn quốc tế ISO 15005 (Road vehicles - Ergonomic aspects of transport information and control systems) đưa ra nguyên tắc cốt lõi nào cho giao diện xe hơi?",
        options: [
          "A. Hệ thống HMI phải đảm bảo tài xế có thể chơi trò chơi điện tử khi kẹt xe.",
          "B. Hệ thống thông tin trong xe phải được thiết kế sao cho việc sử dụng chúng không làm suy giảm sự kiểm soát an toàn của tài xế đối với phương tiện và không gây quá tải nhận thức.",
          "C. Xe hơi phải có ít nhất 10 màn hình cảm ứng.",
          "D. Giao diện xe phải thay đổi giao diện hàng ngày."
        ],
        answer: 1,
        explanation: "ISO 15005 đặt ra các nguyên tắc đối thoại an toàn: thông tin phải phù hợp với tác vụ lái xe, không làm gián đoạn việc điều khiển phương tiện và tài xế luôn có thể ngắt quãng tác vụ HMI bất kỳ lúc nào."
      },
      {
        id: 2,
        question: "Tiêu chuẩn ISO 16673 định nghĩa phương pháp 'Occlusion Method' (Phương pháp chớp mắt mô phỏng) để đánh giá độ xao nhãng như thế nào?",
        options: [
          "A. Đo độ sáng của đèn pha xe đối diện.",
          "B. Người tham gia thử nghiệm đeo kính chớp ngắt quãng (1.5s mở mắt nhìn màn hình, 1.5s nhắm mắt) để đo lường xem một tác vụ HMI cần bao nhiêu lần mở mắt tích lũy (Total Shutter Open Time - TSOT) để hoàn thành.",
          "C. Đếm số lượng hành khách ngồi trên xe.",
          "D. Đo độ mờ của kính lái khi trời mưa."
        ],
        answer: 1,
        explanation: "Phương pháp Occlusion mô phỏng chân thực hành vi lái xe: tài xế chỉ có thể liếc nhìn màn hình 1.5 giây rồi phải nhìn lại mặt đường. Nếu một tác vụ cần TSOT vượt quá ngưỡng cho phép (thường > 12s), tác vụ đó bị coi là quá phức tạp và mất an toàn."
      },
      {
        id: 3,
        question: "Theo quy chuẩn Euro NCAP có hiệu lực từ năm 2026, để đạt điểm đánh giá an toàn tối đa 5 sao, các hãng xe BẮT BUỘC phải:",
        options: [
          "A. Bỏ hoàn toàn vô-lăng và thay bằng cần điều khiển joystick.",
          "B. Trang bị phím bấm cơ học vật lý độc lập cho 5 chức năng thiết yếu: Đèn xi-nhan, Cảnh báo nguy hiểm (Hazard), Cần gạt nước, Còi xe và Cuộc gọi khẩn cấp eCall.",
          "C. Tắt toàn bộ màn hình khi xe đạt tốc độ 50 km/h.",
          "D. Bắt buộc lắp màn hình 50 inch trên kính lái."
        ],
        answer: 1,
        explanation: "Euro NCAP 2026 chính thức trừng phạt việc lạm dụng màn hình cảm ứng. Năm chức năng an toàn sống còn nêu trên bắt buộc phải dùng nút bấm cơ học để tài xế thao tác ngay tức khắc mà không cần rời mắt khỏi mặt đường tìm menu."
      },
      {
        id: 4,
        question: "Khái niệm 'TEORT' (Total Eyes-Off-Road Time - Tổng thời gian rời mắt khỏi mặt đường) theo hướng dẫn của NHTSA khuyến nghị không được vượt quá:",
        options: [
          "A. 60 giây",
          "B. Tối đa 12 giây tổng cộng cho một tác vụ tương tác hoàn chỉnh.",
          "C. 5 phút",
          "D. Không giới hạn thời gian."
        ],
        answer: 1,
        explanation: "NHTSA quy định một tác vụ (ví dụ tìm bài hát, chỉnh địa chỉ bản đồ) không được làm tài xế rời mắt khỏi đường tổng cộng quá 12 giây (tích lũy qua các lần liếc mắt ≤ 2.0s mỗi lần)."
      },
      {
        id: 5,
        question: "Hướng dẫn của Liên minh các nhà sản xuất ô tô AAM (Alliance of Automobile Manufacturers) đưa ra quy tắc tương tác nào cho các tác vụ điều khiển HMI khi đang lái xe?",
        options: [
          "A. Mỗi tác vụ không được đòi hỏi quá 4 đến 5 bước tương tác/thao tác chạm.",
          "B. Mỗi tác vụ phải có ít nhất 20 bước để bảo mật.",
          "C. Cho phép tài xế soạn thảo email tự do khi xe dừng đèn đỏ.",
          "D. Bắt buộc tài xế phải chạm cả 10 đầu ngón tay."
        ],
        answer: 0,
        explanation: "Quy tắc '24-second / 4-to-5 touches rule' của AAM giới hạn một tác vụ tương tác khi lái xe không được vượt quá 4-5 lần nhấn chạm rời rạc để tránh tình trạng phân tán nhận thức kéo dài."
      },
      {
        id: 6,
        question: "Tính năng 'Voice Text-to-Speech' đọc to tin nhắn đến có hoàn toàn loại bỏ được xao nhãng tài xế không?",
        options: [
          "A. Có, loại bỏ 100% mọi nguy cơ tai nạn.",
          "B. Không, mặc dù loại bỏ xao nhãng thị giác (Visual) và tay chân (Manual), nhưng nó vẫn gây ra 'Xao nhãng nhận thức' (Cognitive Distraction) do não bộ phải tập trung xử lý nội dung thông điệp.",
          "C. Khiến động cơ xe tự động ngắt truyền động.",
          "D. Làm tăng tiêu hao nhiên liệu của xe."
        ],
        answer: 1,
        explanation: "Nghiên cứu của AAA Foundation chỉ ra rằng việc nghe và phản hồi tin nhắn giọng nói vẫn duy trì mức độ xao nhãng nhận thức cao (High Cognitive Workload) trong suốt 15-27 giây sau khi cuộc trò chuyện kết thúc."
      },
      {
        id: 7,
        question: "Kỹ thuật 'Chunking Text' (Ngắt nhỏ văn bản hiển thị) trên màn hình xe hơi quy định thế nào về độ dài nội dung đọc?",
        options: [
          "A. Cho phép hiển thị một bài báo dài 2000 từ để tài xế đọc khi tắc đường.",
          "B. Giới hạn văn bản hiển thị tĩnh không quá 4 đến 6 dòng ngắn hoặc một khối thông điệp dưới 30-40 ký tự để có thể quét mắt trong 1 giây.",
          "C. Luôn hiển thị mã code nhị phân 0 và 1.",
          "D. Bắt buộc chữ phải chạy cuộn ngang với tốc độ cực nhanh."
        ],
        answer: 1,
        explanation: "Hiển thị các đoạn văn dài buộc mắt tài xế phải dừng lại đọc (Fixation dài), gây nguy hiểm thảm khốc. Nội dung trên xe chỉ được hiển thị dưới dạng cụm từ cô đọng, thông báo ngắn gọn dưới 5-7 từ."
      },
      {
        id: 8,
        question: "Hiệu ứng chữ chạy cuộn ngang liên tục (Marquee / Scrolling Text) trên màn hình xe hơi bị các tổ chức an toàn giao thông đánh giá thế nào?",
        options: [
          "A. Rất khuyến khích vì nhìn sinh động và hiện đại.",
          "B. Bị nghiêm cấm hoặc hạn chế tối đa khi xe đang chạy, vì mắt tài xế sẽ bị thu hút một cách vô thức theo chuyển động của chữ để chờ đọc hết câu, gây rời mắt khỏi đường quá 2 giây.",
          "C. Giúp tài xế tỉnh ngủ khi lái xe đêm.",
          "D. Là tính năng bắt buộc của mọi xe ô tô."
        ],
        answer: 1,
        explanation: "Chữ cuộn liên tục (như tên bài hát chạy dài) kích hoạt phản xạ theo dõi chuyển động (Optokinetic reflex) của mắt người, khiến tài xế 'dán mắt' vào màn hình chờ chữ chạy hết thay vì nhìn đường. NHTSA khuyến cáo cắt ngắn bằng dấu '...' thay vì cuộn chữ."
      },
      {
        id: 9,
        question: "Tiêu chuẩn đánh giá 'Lane Change Test' (LCT - ISO 26022) dùng để đo lường điều gì trong phòng thí nghiệm HMI?",
        options: [
          "A. Đo độ mòn của lốp xe khi chuyển làn.",
          "B. Đo mức độ suy giảm khả năng điều khiển lái xe (độ lệch làn, thời gian phản ứng trước biển báo chuyển làn) của tài xế khi vừa lái xe vừa thực hiện tác vụ HMI phụ trợ.",
          "C. Kiểm tra độ êm của hệ thống treo khí nén.",
          "D. Đo lượng khí xả CO2 khi chuyển làn."
        ],
        answer: 1,
        explanation: "LCT là bài test tiêu chuẩn hóa: tài xế lái trên đường mô phỏng và phải chuyển làn theo biển báo ngẫu nhiên. Nếu khi chỉnh radio mà xe bị chệch làn đường hoặc phản ứng chuyển làn chậm trễ, giao diện đó bị đánh giá là kém an toàn."
      },
      {
        id: 10,
        question: "Trong kiểm thử xao nhãng, 'DVE Metrics' (Driver-Vehicle-Environment Metrics) bao gồm các thông số nào?",
        options: [
          "A. Giá xăng, giá dầu và phí cầu đường.",
          "B. Thời gian rời mắt khỏi đường (Eyes-off-road), độ biến thiên góc lái (Steering wheel reversal rate) và độ lệch chuẩn vị trí làn đường (Standard Deviation of Lane Position - SDLP).",
          "C. Nhiệt độ dầu bôi trơn và áp suất lốp.",
          "D. Số lần rửa xe trong một tháng."
        ],
        answer: 1,
        explanation: "SDLP và Steering Wheel Reversal Rate là các chỉ số vàng phản ánh sự ổn định tay lái. Khi tài xế bị xao nhãng nhận thức, xe sẽ bắt đầu lạng lách nhẹ và tài xế phải giật vô lăng liên tục để sửa sai."
      },
      {
        id: 11,
        question: "Các nhà sản xuất hạn chế việc nhập địa chỉ điều hướng bằng bàn phím gõ tay (Virtual Keyboard Lockout) khi xe đang di chuyển và thay thế bằng:",
        options: [
          "A. Bắt buộc tài xế phải xuống xe đẩy bộ.",
          "B. Nhận diện giọng nói (Voice Input), gợi ý địa chỉ lưu sẵn gần đây (Recent destinations) hoặc gửi vị trí từ ứng dụng điện thoại lên xe từ trước khi khởi hành.",
          "C. Sử dụng mã Morse qua còi xe.",
          "D. Yêu cầu tài xế gọi điện cho tổng đài cứu hộ."
        ],
        answer: 1,
        explanation: "Gõ bàn phím QWERTY ảo trên màn hình cảm ứng ô tô khi xe chạy là một trong những hành vi nguy hiểm nhất (đòi hỏi trung bình 20-30 giây rời mắt). HMI hiện đại chuyển hướng sang nhập giọng nói hoặc đẩy lộ trình từ điện thoại."
      },
      {
        id: 12,
        question: "Phương pháp 'Occlusion Vision Goggles' trong thử nghiệm công thái học xe hơi hoạt động bằng công nghệ gì?",
        options: [
          "A. Kính hồng ngoại nhìn ban đêm.",
          "B. Kính có tròng tinh thể lỏng (PLZT / LCD) có khả năng đóng/mở quang học siêu tốc trong vài mili-giây được điều khiển bằng máy tính.",
          "C. Kính thực tế ảo xem phim hoạt hình.",
          "D. Kính râm thông thường."
        ],
        answer: 1,
        explanation: "Kính Occlusion sử dụng thấu kính LCD chớp sáng/tối tự động để kiểm soát chính xác 100% thời gian mở mắt của người tham gia thử nghiệm theo chuẩn ISO 16673."
      },
      {
        id: 13,
        question: "Tại sao việc thiết kế phản hồi âm thanh (Audio Cues) cho việc chạm nút bấm trên xe hơi lại cần được cân bằng âm lượng kỹ lưỡng?",
        options: [
          "A. Để cạnh tranh âm lượng với còi xe tải bên ngoài.",
          "B. Âm thanh phản hồi phải đủ nghe rõ trên nền tiếng ồn động cơ/tiếng gió nhưng không được quá chói tai hoặc quá gay gắt gây giật mình, hoảng loạn cho tài xế.",
          "C. Để làm nhạc đệm cho người trong xe hát karaoke.",
          "D. Không cần thiết lập âm lượng."
        ],
        answer: 1,
        explanation: "Âm thanh click trên ô tô cần ở tần số dịu tai (khoảng 800-1500Hz) với âm lượng tự động bù trừ theo tốc độ xe và tiếng ồn cabin (Speed-compensated volume), xác nhận lệnh êm ái mà không gây khó chịu."
      },
      {
        id: 14,
        question: "Nguyên tắc 'Task Resumability' (Khả năng tiếp tục tác vụ bị ngắt quãng) trong HMI ô tô đòi hỏi:",
        options: [
          "A. Nếu tài xế dừng bấm màn hình để nhìn đường 5 giây rồi quay lại, hệ thống phải giữ nguyên đúng trạng thái màn hình đang dang dở chứ không được tự động nhảy về trang chủ làm họ phải bấm lại từ đầu.",
          "B. Hệ thống phải tự động xóa toàn bộ dữ liệu người dùng sau 10 giây không chạm.",
          "C. Xe tự động tấp vào lề đường mỗi khi tài xế ngưng thao tác.",
          "D. Hệ thống bắt buộc phải khởi động lại."
        ],
        answer: 0,
        explanation: "Tài xế tương tác với xe theo từng nhịp ngắt quãng (Interrupted interaction). Nếu vừa ngẩng lên nhìn đường xong cúi xuống thấy màn hình đã tự động thoát ra ngoài, tài xế sẽ phải thao tác lại từ đầu, làm tăng gấp đôi thời gian xao nhãng."
      },
      {
        id: 15,
        question: "Hành vi 'Touch Target Hunting' (Săn tìm điểm chạm) trên màn hình ô tô dẫn đến rủi ro nào?",
        options: [
          "A. Làm trầy xước màn hình kính cường lực.",
          "B. Tài xế phải giữ mắt nhìn cố định vào màn hình trong thời gian dài để căn chỉnh đầu ngón tay chạm trúng nút nhỏ, làm mất hoàn toàn nhận thức tình huống giao thông phía trước.",
          "C. Màn hình tự động giảm độ sáng.",
          "D. Làm tăng lượng tiêu thụ điện năng của xe."
        ],
        answer: 1,
        explanation: "Khi nút bấm quá bé hoặc bố trí lộn xộn, tài xế không thể 'liếc nhanh rồi bấm', mà phải chăm chú nhìn chằm chằm vào màn hình (Target Hunting) kéo dài trên 3-4 giây, nguyên nhân trực tiếp dẫn tới các vụ đâm va chết người."
      }
    ]
  },
  {
    id: 10,
    title: "Bài 10: HMI Xe Điện (EV) Cơ Bản: Quản Lý Pin & Range Anxiety",
    badge: "EV Fundamentals",
    category: "ev",
    description: "Trạng thái sạc SoC (State of Charge), tuổi thọ pin SoH, giải tỏa nỗi sợ hết pin (Range Anxiety) và ước tính quãng đường còn lại (DTE).",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Khái niệm 'Range Anxiety' (Nỗi sợ hết pin giữa đường) của người dùng xe điện là gì và HMI đóng vai trò giải quyết như thế nào?",
        options: [
          "A. Nỗi sợ xe chạy quá nhanh trên đường cao tốc.",
          "B. Sự bất an tâm lý của tài xế rằng năng lượng pin sẽ cạn kiệt trước khi đến được điểm sạc tiếp theo; HMI giải tỏa nỗi sợ này bằng cách cung cấp thông tin dự báo quãng đường minh bạch, chính xác và chủ động đề xuất trạm sạc.",
          "C. Nỗi sợ xe điện bị nhiễm điện giật người ngồi trong.",
          "D. Nỗi sợ pin xe điện bị chuột cắn đứt dây."
        ],
        answer: 1,
        explanation: "Range Anxiety là rào cản tâm lý lớn nhất khi chuyển từ xe xăng sang xe điện. HMI phải biến sự mập mờ thành sự an tâm bằng các mô hình dự báo năng lượng tin cậy theo thời gian thực."
      },
      {
        id: 2,
        question: "Chỉ số 'SoC' (State of Charge - Mức năng lượng pin khả dụng) nên được hiển thị theo hình thức HMI nào là trực quan nhất cho người lái?",
        options: [
          "A. Chỉ hiển thị mã số điện áp cực đại (ví dụ: '392.4 Volts').",
          "B. Kết hợp đồng thời phần trăm pin cụ thể (%), thanh đo đồ họa biến thiên màu sắc và con số ước tính quãng đường còn lại tính bằng Kilomet (DTE).",
          "C. Dùng một bóng đèn sợi đốt nhấp nháy.",
          "D. Chỉ gửi thông báo qua thư điện tử email."
        ],
        answer: 1,
        explanation: "Người dùng không quan tâm đến Vôn hay Ampe. Họ cần biết chính xác: Còn bao nhiêu % pin và con số đó chạy được khoảng bao nhiêu km trong điều kiện lái xe thực tế."
      },
      {
        id: 3,
        question: "Chỉ số 'DTE' (Distance to Empty / Quãng đường còn lại đến khi cạn pin) tính toán bởi thuật toán HMI thông minh cần tích hợp những yếu tố nào thay vì chỉ lấy năng lượng chia cho định mức danh định?",
        options: [
          "A. Chỉ dựa vào vận tốc tối đa của xe theo giấy xuất xưởng.",
          "B. Phong cách lái xe của tài xế, độ dốc địa hình phía trước, nhiệt độ môi trường bên ngoài, tải trọng xe và mức tiêu thụ điện của hệ thống điều hòa nhiệt độ.",
          "C. Giá cổ phiếu của công ty sản xuất xe.",
          "D. Giờ hoàng đạo của ngày khởi hành."
        ],
        answer: 1,
        explanation: "Xe điện leo dốc hoặc bật sưởi mùa đông ở 0°C có thể sụt 30-40% quãng đường. Một HMI dự báo DTE tốt phải tính toán địa hình bản đồ (Elevation profile) và thời tiết thực tế để đưa ra con số tin cậy tuyệt đối."
      },
      {
        id: 4,
        question: "Hiện tượng đồng hồ ước tính quãng đường nhảy số thất thường không ổn định (được cộng đồng gọi là 'Guess-O-Meter' - GOM) gây ra trải nghiệm tiêu cực gì cho người dùng xe điện?",
        options: [
          "A. Khiến xe sạc pin nhanh hơn dự kiến.",
          "B. Làm xói mòn niềm tin của người dùng vào chiếc xe, khiến tài xế luôn trong trạng thái hoang mang không biết số km hiển thị có đúng hay không.",
          "C. Giúp tài xế tiết kiệm tiền bảo dưỡng.",
          "D. Làm tăng độ ồn của động cơ điện."
        ],
        answer: 1,
        explanation: "Nếu vừa nổ máy hiện 300km, đi 2km sau tụt xuống 250km, tài xế sẽ bị sốc tâm lý. HMI xe điện hiện đại phải làm mượt thuật toán dự báo (Filtering/Smoothing) và giải thích nguyên nhân sụt pin (ví dụ 'Tiêu thụ do bật điều hòa cực đại')."
      },
      {
        id: 5,
        question: "HMI của xe điện nên hiển thị trạng thái sức khỏe của pin (SoH - State of Health / Battery Degradation) như thế nào để minh bạch và nhân văn?",
        options: [
          "A. Giấu kín hoàn toàn không cho người dùng biết.",
          "B. Cung cấp báo cáo dung lượng tối đa còn lại rõ ràng trong menu bảo trì xe, kèm các mẹo thói quen sạc thông minh giúp làm chậm quá trình chai pin (ví dụ khuyến cáo chỉ sạc tới 80% khi đi hàng ngày).",
          "C. Phát chuông báo động mỗi ngày để nhắc nhở pin đang già đi.",
          "D. Đổi toàn bộ màn hình sang màu đỏ khi pin chai 5%."
        ],
        answer: 1,
        explanation: "Minh bạch SoH giúp chủ xe an tâm về giá trị bán lại và hiểu rõ tuổi thọ pin. HMI chủ động hướng dẫn tài xế cài đặt ngưỡng sạc 80% (Charge limit) để bảo vệ các cell pin lithium."
      },
      {
        id: 6,
        question: "Tính năng 'EV Smart Trip Routing' (Lên lộ trình thông minh cho xe điện) trên bản đồ HMI vượt trội hơn bản đồ xe xăng truyền thống ở điểm then chốt nào?",
        options: [
          "A. Tự động chọn những con đường có cảnh quan đẹp nhất.",
          "B. Tự động tính toán lượng pin sẽ còn lại tại từng điểm dừng, chủ động chèn các trạm sạc thích hợp vào lộ trình và báo trước thời gian cần cắm sạc tại mỗi trạm để hoàn thành chuyến đi.",
          "C. Luôn dẫn xe đi vào các con đường đất hiểm trở.",
          "D. Tự động tắt máy khi gặp trạm sạc đối thủ."
        ],
        answer: 1,
        explanation: "Xe điện cần lên kế hoạch trạm sạc trên lộ trình dài. Bản đồ HMI xe điện (như Tesla Route Planner) tự tính toán: Đến trạm A còn 12% pin, cắm sạc 25 phút lên 70% rồi đi tiếp đến trạm B, giúp tài xế không phải tính toán thủ công."
      },
      {
        id: 7,
        question: "Khi mức pin xe điện tụt xuống dưới ngưỡng nguy cấp (dưới 5% hoặc dưới 10%), HMI xe điện nên chuyển sang trạng thái cảnh báo như thế nào?",
        options: [
          "A. Tự động tắt ngấm toàn bộ xe ngay lập tức khi đang chạy giữa đường cao tốc.",
          "B. Chuyển thanh pin sang màu vàng/đỏ nổi bật, tự động hiển thị danh sách các trạm sạc gần nhất chỉ với 1 chạm điều hướng, đồng thời đề xuất kích hoạt chế độ tiết kiệm năng lượng (Eco/Turtle mode).",
          "C. Khóa cứng vô-lăng không cho tài xế đánh lái.",
          "D. Tự động gọi điện cho cảnh sát giao thông."
        ],
        answer: 1,
        explanation: "Khi sắp cạn pin, HMI phải đóng vai trò là trợ lý cứu nạn: giữ bình tĩnh cho tài xế, chỉ rõ trạm sạc khả thi gần nhất trong tầm với và tối ưu công suất xe để bò về tới trạm an toàn."
      },
      {
        id: 8,
        question: "Biểu tượng 'Con rùa' (Turtle Mode Icon) xuất hiện trên cụm đồng hồ xe điện thông báo trạng thái gì?",
        options: [
          "A. Xe phát hiện có động vật hoang dã băng qua đường.",
          "B. Xe đã vào chế độ giới hạn công suất động cơ khẩn cấp (Limp-home mode) do pin gần cạn kiệt hoặc nhiệt độ bộ pin quá cao/quá lạnh, xe chỉ chạy được ở tốc độ thấp để bảo vệ cell pin.",
          "C. Chế độ lái xe ngắm cảnh thư giãn.",
          "D. Hệ thống phanh tái sinh bị hỏng."
        ],
        answer: 1,
        explanation: "Biểu tượng Con rùa là quy ước chuẩn của xe điện toàn cầu: Xe bị bóp công suất để cứu lấy những giọt điện cuối cùng hoặc bảo vệ pin đang quá nhiệt, tài xế cần tấp vào lề hoặc di chuyển ngay đến điểm sạc."
      },
      {
        id: 9,
        question: "Màn hình 'Phân bổ năng lượng' (Energy Flow / Consumption Breakdown) trên HMI xe điện thường trực quan hóa dữ liệu tiêu thụ điện theo những thành phần nào?",
        options: [
          "A. Số tiền đã nộp phạt vi phạm giao thông.",
          "B. Tỷ lệ % điện năng tiêu thụ cho: Động cơ dẫn động (Driving), Hệ thống sưởi/điều hòa (Climate), Hệ thống điện tử phụ trợ (Accessories) và Điều hòa nhiệt độ pin (Battery conditioning).",
          "C. Cân nặng của từng hành khách ngồi trên xe.",
          "D. Lượng rác thải sinh hoạt trong xe."
        ],
        answer: 1,
        explanation: "Biểu đồ phân bổ giúp người dùng nhận thức rõ vì sao hôm nay pin tụt nhanh (ví dụ: thấy hệ thống sưởi ghế và điều hòa ngốn tới 25% điện), từ đó chủ động điều chỉnh để tiết kiệm pin."
      },
      {
        id: 10,
        question: "Đơn vị đo lường hiệu suất năng lượng trên HMI xe điện tương đương với 'Lít/100km' của xe xăng thường là gì?",
        options: [
          "A. Mã lực (HP) hoặc Vòng/phút (RPM).",
          "B. Wh/km hoặc kWh/100km (tại Mỹ dùng MPGe hoặc mi/kWh).",
          "C. Bar hoặc PSI.",
          "D. Độ Richter."
        ],
        answer: 1,
        explanation: "kWh/100km (số kilowatt-giờ điện tiêu tốn để đi 100km) hoặc Wh/km là chỉ số vàng của xe điện. Chỉ số này càng thấp chứng tỏ chiếc xe và phong cách lái của tài xế càng tiết kiệm điện."
      },
      {
        id: 11,
        question: "Tính năng 'Giới hạn mức sạc hàng ngày' (Daily Charge Limit Slider) trên giao diện xe điện mang lại giá trị kỹ thuật gì?",
        options: [
          "A. Giúp người dùng tiết kiệm tiền mua xe.",
          "B. Cho phép chủ xe cài đặt mức dừng sạc (thường khuyến cáo 80% cho đi lại hàng ngày và 100% khi đi đường dài) để tối ưu hóa hóa học pin Lithium-ion NMC, kéo dài tuổi thọ của bộ pin.",
          "C. Ngăn không cho xe sạc quá 1 tiếng đồng hồ.",
          "D. Giới hạn tốc độ tối đa của xe khi sạc."
        ],
        answer: 1,
        explanation: "Pin Li-ion NMC rất nhạy cảm với việc sạc căng 100% rồi để qua đêm dưới trời nóng. Thanh trượt cài đặt 80% trên HMI kèm nhãn khuyến cáo 'Daily vs Trip' giúp người dùng bảo vệ tuổi thọ pin xe dễ dàng."
      },
      {
        id: 12,
        question: "HMI xe điện nên hiển thị thông tin về độ dốc địa hình (Elevation Profile) trên lộ trình như thế nào?",
        options: [
          "A. Không cần hiển thị vì độ dốc không ảnh hưởng đến pin.",
          "B. Đồ thị mặt cắt độ cao cho thấy đoạn nào leo dốc (pin sẽ sụt nhanh) và đoạn nào xuống dốc (pin sẽ được sạc bù nhờ phanh tái sinh), kèm dự báo % pin biến thiên liên tục theo từng mốc.",
          "C. Cảnh báo bằng cách rung lắc vô-lăng liên tục.",
          "D. Chuyển màn hình sang chế độ leo núi 3D."
        ],
        answer: 1,
        explanation: "Leo đèo có thể tiêu thụ điện gấp 3 lần bình thường nhưng khi xuống đèo pin lại sạc ngược lại 10-15%. HMI hiển thị rõ ràng đồ thị này giúp tài xế không bị hoảng hốt khi thấy pin tụt dốc lúc lên núi."
      },
      {
        id: 13,
        question: "Khái niệm 'Phantom Drain' / 'Vampire Drain' (Hiện tượng hao pin ma khi đỗ xe) được HMI theo dõi và giải thích cho người dùng như thế nào?",
        options: [
          "A. Xe bị ma ám trong bãi đỗ xe ban đêm.",
          "B. Lượng điện sụt giảm khi xe đang tắt máy đỗ qua đêm do các tính năng chạy ngầm (chế độ camera an ninh Sentry mode, duy trì kết nối 4G/LTE, làm mát pin khi trời nắng nóng).",
          "C. Do chuột cắn vào bình ắc quy phụ.",
          "D. Do màn hình bị quên không tắt."
        ],
        answer: 1,
        explanation: "Khi người dùng thấy đỗ xe qua đêm mất 2-3% pin, HMI phải có nhật ký tiêu thụ năng lượng khi đỗ xe (Parked Energy Log) chỉ rõ: '1.5% do camera an ninh Sentry, 0.8% do duy trì nhiệt độ pin', tránh hiểu nhầm pin bị hỏng."
      },
      {
        id: 14,
        question: "Khi sạc xe điện vào mùa đông giá rét (nhiệt độ dưới 0°C), HMI nên có thông báo gì về hiện tượng 'Cold Battery' (Pin lạnh)?",
        options: [
          "A. Thông báo pin sắp phát nổ do quá lạnh.",
          "B. Hiển thị biểu tượng bông tuyết bên cạnh thanh pin, giải thích rằng tốc độ sạc nhanh và khả năng phanh tái sinh tạm thời bị hạn chế cho đến khi hệ thống sưởi ấm pin (Preheating) đưa pin về nhiệt độ hoạt động lý tưởng.",
          "C. Đổi phông chữ sang màu trắng xóa.",
          "D. Bắt buộc tài xế phải đổ nước sôi vào cổng sạc."
        ],
        answer: 1,
        explanation: "Pin lạnh không thể tiếp nhận dòng sạc cao hoặc phanh tái sinh mạnh (nguy cơ đoản mạch lithium plating). Biểu tượng bông tuyết cùng thanh phanh tái sinh bị gạch chéo giúp người lái hiểu cơ chế bảo vệ của xe."
      },
      {
        id: 15,
        question: "Thiết kế HMI cho chế độ 'Valet Mode' trên xe điện nhằm mục đích gì?",
        options: [
          "A. Cho phép nhân viên trông xe mở khóa toàn bộ dữ liệu cá nhân của chủ xe.",
          "B. Khóa bảo vệ hộp đựng găng tay, ẩn danh bạ/địa chỉ nhà riêng, giới hạn tốc độ tối đa của xe và công suất tăng tốc khi giao xe cho người lạ trông giữ hộ.",
          "C. Tự động bật nhạc sàn ở âm lượng lớn nhất.",
          "D. Tự động rửa xe trong bãi đỗ."
        ],
        answer: 1,
        explanation: "Xe điện có khả năng tăng tốc cực nhanh và lưu trữ nhiều dữ liệu cá nhân. Valet Mode khóa bằng mã PIN giúp bảo vệ dữ liệu riêng tư và ngăn nhân viên gửi xe phóng nhanh vượt ẩu."
      }
    ]
  }
];

// Export
console.log('Automotive tests structure prepared successfully.');
module.exports = automotiveTests;
