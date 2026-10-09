module.exports = [
  {
    id: 11,
    title: "Bài 11: HMI Xe Điện (EV): Trải Nghiệm Sạc Điện (Charging Experience)",
    badge: "EV Charging HMI",
    category: "ev",
    description: "Trải nghiệm sạc AC/DC, Plug & Charge (ISO 15118), điều hòa pin (Preconditioning), tín hiệu đèn cổng sạc và ứng dụng theo dõi từ xa.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Tính năng 'Battery Preconditioning for Fast Charging' (Điều hòa nhiệt độ pin trước khi sạc) hoạt động trên HMI xe điện như thế nào?",
        options: [
          "A. Yêu cầu tài xế mở nắp ca-pô để thổi quạt vào pin.",
          "B. Khi tài xế chọn trạm sạc nhanh DC trên bản đồ điều hướng, hệ thống tự động sưởi ấm hoặc làm mát bộ pin về nhiệt độ tối ưu (khoảng 25-35°C) ngay trên đường di chuyển, hiển thị tiến trình trên màn hình để khi tới trạm pin nhận ngay công suất sạc cực đại.",
          "C. Tự động xả hết điện của xe trước khi cắm sạc.",
          "D. Là tính năng chỉ dùng khi xe đã hết sạch pin."
        ],
        answer: 1,
        explanation: "Pin lạnh hoặc quá nóng không thể tiếp nhận sạc nhanh (đường cong sạc bị bóp nghẹt). HMI chủ động điều hòa nhiệt độ pin trước khi đến trạm giúp rút ngắn thời gian sạc từ 45 phút xuống chỉ còn 20 phút."
      },
      {
        id: 2,
        question: "Tín hiệu đèn LED chỉ thị tại cổng sạc vật lý của xe điện (Charge Port LED Cues) thường được mã hóa màu sắc theo quy ước chuẩn nào?",
        options: [
          "A. Không bao giờ được dùng đèn LED ở cổng sạc.",
          "B. Trắng: Sẵn sàng cắm sạc; Xanh dương nhấp nháy: Đang bắt đầu kết nối; Xanh lá cây nhấp nháy: Đang sạc bình thường; Xanh lá cây sáng đứng: Đã sạc đầy 100%; Đỏ: Bị lỗi kết nối/chập điện.",
          "C. Màu tím phát sáng khi pin bị hỏng.",
          "D. Đèn LED chỉ nhấp nháy theo bài hát đang phát trong xe."
        ],
        answer: 1,
        explanation: "Mã hóa màu sắc cổng sạc trực quan giúp chủ xe đứng từ xa nhìn vào cổng sạc là biết ngay xe đã nhận sạc chưa, đang sạc hay đã sạc đầy mà không cần mở cửa xe hay mở điện thoại kiểm tra."
      },
      {
        id: 3,
        question: "Công nghệ 'Plug & Charge' (theo tiêu chuẩn quốc tế ISO 15118) mang lại bước đột phá gì cho trải nghiệm HMI sạc xe điện?",
        options: [
          "A. Cho phép xe tự động biến thành máy phát điện thoại.",
          "B. Loại bỏ hoàn toàn sự phiền toái của việc quẹt thẻ RFID, quét mã QR hay mở ứng dụng thanh toán; tài xế chỉ cần cắm cáp sạc vào xe, xe và trụ sạc tự động mã hóa xác thực tài khoản và thanh toán ngầm.",
          "C. Cho phép cắm sạc xe bằng dây cáp sạc điện thoại USB-C.",
          "D. Làm cho trụ sạc tự động di chuyển đến gần xe."
        ],
        answer: 1,
        explanation: "Plug & Charge giải quyết nỗi đau lớn nhất của sạc công cộng: không cần lúng túng mở 10 ứng dụng trạm sạc khác nhau hay quẹt thẻ từ; cắm sạc là xe tự nhận diện và bắt đầu sạc ngay lập tức."
      },
      {
        id: 4,
        question: "Khi xe đang cắm sạc tại trụ sạc nhanh DC, màn hình HMI trong xe và ứng dụng di động hiển thị thông số nào là quan trọng nhất cho người dùng?",
        options: [
          "A. Số vòng quay của quạt làm mát.",
          "B. Công suất sạc tức thời (kW), Tốc độ sạc quy đổi ra cự ly (km/h hoặc km/phút), Thời gian dự kiến đạt đến mức sạc mong muốn (Time to 80%) và chi phí tiền điện tích lũy.",
          "C. Địa chỉ MAC của bộ vi xử lý trên trụ sạc.",
          "D. Tên kỹ sư đang trực ca tại trạm điện lực."
        ],
        answer: 1,
        explanation: "Người dùng cần nắm được: Xe đang sạc nhanh hay chậm (công suất kW), thêm được bao nhiêu km trong 10 phút vừa qua và chính xác bao nhiêu phút nữa thì được rút sạc rời đi."
      },
      {
        id: 5,
        question: "Đường cong sạc pin (Charging Curve) của xe điện giảm mạnh tốc độ sau mốc 80% SoC. HMI xe điện nên hướng dẫn người dùng như thế nào tại các trạm sạc công cộng?",
        options: [
          "A. Cảnh báo pin sắp hỏng nếu không sạc đủ 100%.",
          "B. Chủ động hiển thị thông báo khuyến cáo: 'Từ 80% đến 100% tốc độ sạc sẽ chậm lại đáng kể để bảo vệ pin. Bạn đã có đủ năng lượng để tới điểm tiếp theo, nên rút sạc để tiết kiệm thời gian và nhường trụ cho người khác'.",
          "C. Khóa cứng cáp sạc không cho người dùng rút ra cho đến khi đạt 100%.",
          "D. Tự động tắt máy lạnh của xe."
        ],
        answer: 1,
        explanation: "Sạc từ 10% đến 80% chỉ mất 20 phút, nhưng từ 80% lên 100% có thể mất thêm 40 phút. HMI thông minh giúp người dùng tối ưu thời gian hành trình và tăng hiệu suất quay vòng của trạm sạc công cộng."
      },
      {
        id: 6,
        question: "Tính năng 'Lên lịch sạc giờ thấp điểm' (Scheduled Off-Peak Charging) trên HMI xe điện giúp mang lại lợi ích tài chính nào?",
        options: [
          "A. Tự động trừ tiền bảo hiểm xe hơi.",
          "B. Cho phép cắm sạc vào xe từ chập tối nhưng hệ thống hoãn việc sạc cho tới nửa đêm khi giá điện sinh hoạt rẻ nhất (Off-peak hours), hiển thị số tiền tiết kiệm được cho chủ xe.",
          "C. Bắt buộc xe phải sạc vào đúng 12 giờ trưa.",
          "D. Tự động mua điện từ sàn giao dịch chứng khoán."
        ],
        answer: 1,
        explanation: "Sạc đêm giờ thấp điểm giúp chủ xe tiết kiệm hàng triệu đồng mỗi tháng tiền điện. HMI trực quan cho phép kéo thanh thời gian cài đặt khung giờ vàng một cách dễ dàng."
      },
      {
        id: 7,
        question: "Khi phát hiện cổng sạc bị kẹt khóa cơ học (Charge Port Lock Stuck) không nhả được cáp sạc, HMI xe điện phải cung cấp giải pháp gì?",
        options: [
          "A. Bắt buộc tài xế phải lấy búa đập vỡ cổng sạc.",
          "B. Cung cấp hướng dẫn từng bước trên màn hình và chỉ rõ vị trí của lẫy kéo khẩn cấp bằng tay (Manual Release Cable) được bố trí trong khoang hành lý phía sau.",
          "C. Tự động kích hoạt còi xe báo trộm liên tục.",
          "D. Tắt hoàn toàn nguồn điện của xe."
        ],
        answer: 1,
        explanation: "Khi chốt khóa điện tử bị lỗi motor, xe điện luôn có dây cáp cơ kéo tay dự phòng. HMI hiển thị sơ đồ vị trí dây kéo trong cốp giúp người dùng tự giải cứu cáp sạc mà không phải hoảng loạn gọi xe cứu hộ."
      },
      {
        id: 8,
        question: "Công nghệ V2L (Vehicle-to-Load / Xe cấp điện cho thiết bị ngoài) yêu cầu giao diện HMI hiển thị và cài đặt các yếu tố nào?",
        options: [
          "A. Tự động xả hết sạch 100% pin xe ra ngoài mà không cần kiểm soát.",
          "B. Công suất tiêu thụ tức thời của thiết bị ngoại vi (Watts), công tắc kích hoạt và thanh trượt cài đặt 'Mức pin tối thiểu được phép xả' (ví dụ dừng xả khi pin còn 20% để xe vẫn còn điện chạy về nhà).",
          "C. Đo điện trở của mặt đất cắm trại.",
          "D. Chỉ cho phép cấp điện cho bóng đèn ngủ."
        ],
        answer: 1,
        explanation: "Tính năng V2L biến xe thành cục sạc dự phòng khổng lồ cho cắm trại hoặc cấp điện khi mất điện nhà. HMI phải có giới hạn an toàn để tránh việc thiết bị ngoài dùng kiệt pin khiến xe không thể nổ máy đi về."
      },
      {
        id: 9,
        question: "Thông báo lỗi 'Charging Interrupted' (Quá trình sạc bị ngắt quãng giữa chừng) nên truyền tải thông tin thế nào qua ứng dụng điện thoại kết nối với HMI xe?",
        options: [
          "A. Chỉ hiển thị thông báo chung chung 'Có lỗi xảy ra'.",
          "B. Gửi thông báo khẩn cấp giải thích nguyên nhân rõ ràng (ví dụ: 'Trụ sạc bị mất điện lưới', 'Nhiệt độ đầu sạc quá nóng' hoặc 'Có người nhấn nút dừng khẩn cấp trên trụ sạc') kèm lượng pin hiện tại.",
          "C. Tự động xóa tài khoản ứng dụng của người dùng.",
          "D. Không cần thông báo gì cho đến khi người dùng quay lại xe."
        ],
        answer: 1,
        explanation: "Nếu người dùng vào quán cà phê ăn trưa đinh ninh xe đang sạc, mà sạc bị ngắt sau 2 phút mà không có thông báo chi tiết, họ sẽ bị trễ cả hành trình. Thông báo kịp thời kèm lý do giúp họ quay lại xử lý ngay."
      },
      {
        id: 10,
        question: "Cơ chế 'Nắp cổng sạc đóng/mở tự động' (Motorized Charge Port Door) trên HMI tương tác qua những phương thức nào?",
        options: [
          "A. Chỉ có thể dùng tuốc-nơ-vít cạy mở.",
          "B. Chạm cảm ứng vào nắp, bấm nút trên màn hình trung tâm, điều khiển qua ứng dụng di động hoặc tự động mở khi bấm nút trên đầu sạc chính hãng.",
          "C. Chỉ mở khi xe đang chạy ở tốc độ 60 km/h.",
          "D. Mở bằng cách huýt sáo."
        ],
        answer: 1,
        explanation: "Đa dạng hóa phương thức mở nắp sạc mang lại trải nghiệm tiện nghi cao cấp, đặc biệt tính năng nắp tự đóng lại khi rút sạc ngăn ngừa việc tài xế quên đóng nắp rồi lái xe đi trong mưa."
      },
      {
        id: 11,
        question: "Cảnh báo an toàn HMI khi tài xế vô tình gài số (D hoặc R) trong khi cáp sạc vẫn đang cắm vào xe (Drive-off with cable plugged) được thiết kế:",
        options: [
          "A. Cho phép xe chạy và kéo đứt trụ sạc.",
          "B. Khóa liên động phần cứng/phần mềm (Interlock) ngăn chặn tuyệt đối việc chuyển số xe, đồng thời hiển thị cảnh báo đỏ toàn màn hình kèm âm thanh báo động nhắc nhở rút cáp sạc.",
          "C. Giảm công suất động cơ xuống một nửa.",
          "D. Tự động cắt đứt dây cáp sạc của trụ."
        ],
        answer: 1,
        explanation: "Hệ thống Interlock là bắt buộc trên mọi xe điện đạt chuẩn: xe không thể rời khỏi vị trí đỗ nếu cảm biến cổng sạc ghi nhận cáp sạc chưa được ngắt kết nối vật lý hoàn toàn."
      },
      {
        id: 12,
        question: "Tại sao bản đồ HMI xe điện cần tích hợp trạng thái trạm sạc thời gian thực (Real-time Charger Availability / Occupancy)?",
        options: [
          "A. Để tài xế biết có bao nhiêu người đang uống cà phê tại đó.",
          "B. Giúp tài xế biết chính xác trạm có bao nhiêu cổng sạc đang trống, bao nhiêu cổng đang có người sạc và có cổng nào bị hỏng (Offline) hay không trước khi quyết định lái xe tới đó.",
          "C. Để cạnh tranh với mạng xã hội chia sẻ vị trí.",
          "D. Không có giá trị thực tế."
        ],
        answer: 1,
        explanation: "Đến trạm sạc sau 30km lái xe chỉ để phát hiện tất cả các trụ sạc đều đang kín chỗ hoặc trụ bị hỏng là thảm họa trải nghiệm tồi tệ nhất của xe điện. Real-time data giúp tài xế chủ động điều hướng sang trạm khác."
      },
      {
        id: 13,
        question: "Tính năng 'Giới hạn dòng sạc AC' (AC Charging Current Limit) trên màn hình xe điện cho phép người dùng điều chỉnh nhằm mục đích gì?",
        options: [
          "A. Tăng tốc độ xe khi chạy trên cao tốc.",
          "B. Giảm dòng sạc (ví dụ từ 32A xuống 16A hoặc 10A) khi cắm sạc vào nguồn điện gia đình có đường dây cũ, tránh làm quá tải nhảy aptomat hoặc cháy chập ổ cắm gia dụng.",
          "C. Đổi màu ánh sáng đèn pha xe.",
          "D. Bật đài phát thanh FM."
        ],
        answer: 1,
        explanation: "Ổ cắm gia đình thường không chịu nổi dòng sạc liên tục ở công suất cực đại. Thanh trượt giảm dòng sạc trên HMI bảo vệ an toàn cháy nổ cho ngôi nhà của người sử dụng."
      },
      {
        id: 14,
        question: "Màn hình hướng dẫn 'Ghép nối cáp sạc' (First-time EV Onboarding UI) cho người dùng mới chuyển sang xe điện cần giải thích rõ sự khác biệt giữa hai chuẩn sạc nào?",
        options: [
          "A. Sạc USB và sạc cáp quang.",
          "B. Sạc chậm xoay chiều AC (Cổng Type 2 hoặc J1772) và Sạc siêu nhanh một chiều DC (Cổng CCS2 hoặc NACS có 2 chân pin công suất lớn phía dưới).",
          "C. Sạc pin tiểu AA và pin đại D.",
          "D. Sạc bằng tấm pin mặt trời và sạc bằng gió."
        ],
        answer: 1,
        explanation: "Người mới đi xe điện thường bối rối giữa đầu cắm tròn AC và đầu cắm to CCS2/NACS có nắp che chân DC phía dưới. Giao diện trực quan hóa đồ họa giúp họ thao tác chuẩn xác ngay lần đầu."
      },
      {
        id: 15,
        question: "Trải nghiệm 'In-Car Entertainment while Charging' (Giải trí trong xe khi chờ sạc) trên HMI xe điện thường kích hoạt những tiện ích nào khi xe ở trạng thái P (Parking) và đang sạc?",
        options: [
          "A. Tự động khóa toàn bộ màn hình không cho sử dụng.",
          "B. Cho phép xem các dịch vụ phát video trực tuyến (Netflix, Youtube), chơi trò chơi bằng vô-lăng thực hoặc lướt web trên màn hình trung tâm lớn kèm hệ thống âm thanh vòm.",
          "C. Khởi động động cơ đốt trong dự phòng.",
          "D. Tự động ngắt hệ thống điều hòa để tiết kiệm pin."
        ],
        answer: 1,
        explanation: "Trong 20-30 phút chờ sạc, khoang cabin biến thành phòng khách hoặc phòng chơi game mini. HMI kích hoạt các tính năng giải trí chất lượng cao biến thời gian chờ đợi thành khoảng thời gian thư giãn thú vị."
      }
    ]
  },
  {
    id: 12,
    title: "Bài 12: HMI Xe Điện (EV): Phanh Tái Sinh & One-Pedal Drive",
    badge: "Regen & One-Pedal",
    category: "ev",
    description: "Nguyên lý phanh tái sinh (Regenerative Braking), cảm giác lái 1 bàn đạp (One-Pedal Drive), lẫy chuyển số vô-lăng và trực quan hóa năng lượng thu hồi.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Phanh tái sinh (Regenerative Braking) trên xe điện hoạt động dựa trên nguyên lý tương tác năng lượng nào?",
        options: [
          "A. Dùng lực ma sát của má phanh ép vào đĩa phanh để sinh nhiệt.",
          "B. Chuyển đổi mô-tơ điện thành máy phát điện khi tài xế nhả chân ga hoặc đạp nhẹ phanh, vừa tạo lực hãm làm chậm xe vừa nạp ngược điện năng vào bộ pin.",
          "C. Bật quạt gió phía trước xe để cản gió làm dừng xe.",
          "D. Xả bớt điện áp ra môi trường xung quanh."
        ],
        answer: 1,
        explanation: "Mô-tơ điện có tính thuận nghịch: khi cấp điện nó quay sinh công, khi bị bánh xe kéo quay nó biến thành máy phát tạo ra lực cản điện từ hãm xe lại và sạc pin thu hồi năng lượng lãng phí."
      },
      {
        id: 2,
        question: "Chế độ lái 'One-Pedal Drive' (Lái xe một bàn đạp) trên xe điện thay đổi hành vi điều khiển của tài xế như thế nào?",
        options: [
          "A. Loại bỏ hoàn toàn bàn đạp phanh vật lý khỏi sàn xe.",
          "B. Cho phép tài xế tăng tốc khi nhấn chân ga, giảm tốc độ êm ái khi nhả dần chân ga và hãm dừng xe hoàn toàn tới 0 km/h khi nhấc hẳn chân ga mà không cần chuyển chân sang bàn đạp phanh trong điều kiện lái xe thông thường.",
          "C. Bắt buộc tài xế phải dùng tay ga như xe máy.",
          "D. Tự động phanh khẩn cấp mỗi khi tài xế chớp mắt."
        ],
        answer: 1,
        explanation: "One-Pedal Drive mang lại trải nghiệm mượt mà, giảm mỏi cơ chân khi đi phố tắc đường vì tài xế không phải liên tục nhấc chân đảo qua đảo lại giữa ga và phanh hàng trăm lần mỗi ngày."
      },
      {
        id: 3,
        question: "Thanh hiển thị trạng thái động cơ (Power / Charge Gauge) trên màn hình cụm đồng hồ xe điện phân biệt giữa Tăng tốc và Phanh tái sinh như thế nào?",
        options: [
          "A. Chỉ hiển thị một màu đen duy nhất.",
          "B. Nửa bên phải/trên biểu thị tiêu thụ năng lượng (Power Output - màu cam/xanh dương/trắng); nửa bên trái/dưới biểu thị dòng năng lượng thu hồi sạc vào pin (Regen / Charge - thường màu xanh lá cây đậm).",
          "C. Hiển thị bằng các ký tự chữ La-mã.",
          "D. Nhấp nháy số vòng tua máy RPM từ 0 đến 10.000."
        ],
        answer: 1,
        explanation: "Thanh đo chia đôi âm - dương (Power vs Charge) giúp tài xế cảm nhận trực quan: đạp ga thanh chạy sang bên xả điện, nhả ga thanh giật sang bên sạc điện xanh lá cây, khuyến khích thói quen lái xe tiết kiệm (Eco-driving)."
      },
      {
        id: 4,
        question: "Lẫy chuyển số sau vô-lăng (Paddle Shifters) trên nhiều dòng xe điện (như Hyundai Ioniq, Porsche Taycan) được lập trình chức năng HMI gì thay cho chuyển số hộp số?",
        options: [
          "A. Chỉnh âm lượng của đài FM.",
          "B. Điều chỉnh các cấp độ lực phanh tái sinh theo thời gian thực (từ Mức 0: xe chạy trớn tự do không cản, đến Mức 3: lực phanh tái sinh cực mạnh).",
          "C. Bật đèn pha chiếu xa và chiếu gần.",
          "D. Đóng mở cửa sổ trời."
        ],
        answer: 1,
        explanation: "Do xe điện đa phần dùng hộp số 1 cấp không có bánh răng số, hai lẫy sau vô-lăng được tận dụng thông minh để gẩy tăng/giảm lực ghì của phanh tái sinh ngay trong lúc đang lái xe mà không cần nhìn vào màn hình."
      },
      {
        id: 5,
        question: "Khi bộ pin xe điện đang được sạc đầy 100% hoặc khi nhiệt độ pin quá lạnh, hiện tượng gì sẽ xảy ra với phanh tái sinh và HMI phải báo cho tài xế thế nào?",
        options: [
          "A. Phanh tái sinh hoạt động mạnh gấp đôi.",
          "B. Hiệu ứng phanh tái sinh tạm thời bị triệt tiêu hoặc suy giảm đáng kể (do pin đầy không thể nạp thêm điện vào), HMI phải hiển thị cảnh báo để tài xế chủ động dùng bàn đạp phanh cơ học tránh bị bất ngờ vì xe không tự giảm tốc như thường lệ.",
          "C. Xe tự động bung túi khí an toàn.",
          "D. Xe bị mất phanh cơ khí."
        ],
        answer: 1,
        explanation: "Khi pin 100%, pin không còn chỗ chứa thêm điện nên xe không thể kích hoạt phanh tái sinh mạnh. Nếu không có cảnh báo HMI, tài xế nhả chân ga nhưng xe vẫn trôi băng băng rất dễ gây đâm đuôi xe phía trước."
      },
      {
        id: 6,
        question: "Chức năng 'Creep Mode' (Chế độ bò xe) trên menu cài đặt HMI xe điện mang lại trải nghiệm mô phỏng dòng xe nào?",
        options: [
          "A. Mô phỏng xe đua F1.",
          "B. Mô phỏng thói quen của xe số tự động truyền thống (ICE Automatic): khi nhả chân phanh mà chưa đạp ga, xe sẽ tự động trườn chậm về phía trước ở tốc độ 3-5 km/h giúp căn chỉnh khi đỗ xe.",
          "C. Mô phỏng xe lu làm đường.",
          "D. Mô phỏng xe máy số sàn."
        ],
        answer: 1,
        explanation: "Người mới chuyển từ xe xăng tự động qua xe điện rất quen với việc nhả phanh là xe tự nhích nhẹ. HMI cung cấp tùy chọn bật/tắt Creep mode giúp người dùng giữ nguyên thói quen cũ nếu muốn."
      },
      {
        id: 7,
        question: "Trong chế độ dừng xe 'Hold Mode' (Auto-Vehicle Hold) kết hợp với One-Pedal Drive, HMI hiển thị biểu tượng gì trên bảng đồng hồ khi xe đã dừng hẳn?",
        options: [
          "A. Biểu tượng hình chiếc mỏ neo.",
          "B. Biểu tượng vòng tròn có chữ '(H)' hoặc '(HOLD)' sáng lên, báo hiệu hệ thống phanh điện tử đã tự động khóa giữ xe đứng yên an toàn trên dốc mà tài xế không cần giữ chân phanh.",
          "C. Biểu tượng hình ngọn lửa.",
          "D. Biểu tượng nút nguồn tắt máy."
        ],
        answer: 1,
        explanation: "Biểu tượng chữ HOLD màu xanh lá xác nhận xe đã tự động khóa bánh vững chãi, tài xế có thể nhấc chân thư giãn hoàn toàn kể cả khi dừng giữa dốc nghiêng mà không sợ xe bị trôi."
      },
      {
        id: 8,
        question: "Tại sao đèn phanh phía sau xe (Brake Lights) BẮT BUỘC phải tự động sáng lên khi xe giảm tốc ở chế độ One-Pedal Drive dù tài xế KHÔNG hề đạp vào chân phanh?",
        options: [
          "A. Để làm đẹp cho đuôi xe vào ban đêm.",
          "B. Theo quy chuẩn an toàn giao thông quốc tế (UN ECE R13H): Khi lực hãm phanh tái sinh tạo ra mức giảm tốc (Deceleration) vượt quá 0.7 - 1.3 m/s², đèn phanh bắt buộc phải bật sáng để cảnh báo kịp thời cho các phương tiện phía sau.",
          "C. Do phần mềm bị chập mạch điện tử.",
          "D. Đèn phanh chỉ sáng khi xe đã dừng hẳn."
        ],
        answer: 1,
        explanation: "Dù tài xế chỉ nhấc chân ga, lực phanh tái sinh của xe điện có thể ghì xe lại rất mạnh tương đương một cú phanh gấp. Nếu đèn phanh không tự sáng, xe phía sau sẽ không kịp phản ứng và đâm sầm vào đuôi xe."
      },
      {
        id: 9,
        question: "Mô hình xe đồ họa 3D trên màn hình cụm đồng hồ hoặc màn hình trung tâm có thể phản ánh trạng thái đèn phanh của chính chiếc xe như thế nào?",
        options: [
          "A. Không bao giờ hiển thị được đèn xe của chính mình.",
          "B. Mô hình xe 3D thời gian thực tự động sáng đỏ cụm đèn hậu ảo mỗi khi hệ thống kích hoạt đèn phanh thực tế, giúp người lái kiểm chứng trạng thái an toàn của mình đối với xe phía sau.",
          "C. Luôn hiển thị đèn pha chiếu thẳng vào mắt tài xế.",
          "D. Chỉ hiển thị khi xe đang tắt máy."
        ],
        answer: 1,
        explanation: "Visual verification: Nhìn vào mô hình xe trên màn hình, tài xế biết chắc chắn đèn phanh sau xe đang sáng, giải tỏa mối lo lắng liệu xe sau có nhìn thấy mình đang giảm tốc độ hay không."
      },
      {
        id: 10,
        question: "Chế độ 'Roll Mode' (Trôi tự do không phanh) trên giao diện xe điện mang lại cảm giác vận hành nào?",
        options: [
          "A. Xe tự động lộn nhào trên đường ray.",
          "B. Tương tự như việc về số N (Mo) trên xe xăng: khi nhả chân ga, xe trôi hoàn toàn theo quán tính không hề có lực cản điện từ, thích hợp khi chạy trớn đường dài trên cao tốc phẳng.",
          "C. Xe chỉ lùi về phía sau.",
          "D. Tự động tắt hệ thống lái trợ lực điện."
        ],
        answer: 1,
        explanation: "Roll mode triệt tiêu lực ghì, cho phép xe lướt đi nhờ động năng thuần túy. Porsche chuộng triết lý này trên Taycan vì nó mang lại cảm giác lướt gió thể thao truyền thống."
      },
      {
        id: 11,
        question: "Thuật ngữ 'Blended Braking' (Phanh kết hợp thông minh) trong hệ thống HMI và điều khiển khung gầm xe điện có nghĩa là gì?",
        options: [
          "A. Xay trộn dầu phanh với nước mát động cơ.",
          "B. Hệ thống tự động phân bổ liền mạch lực hãm giữa phanh tái sinh bằng mô-tơ và phanh đĩa ma sát thủy lực khi tài xế đạp chân phanh, tối đa hóa lượng điện thu hồi mà bàn chân tài xế vẫn cảm nhận được lực đạp phanh tự nhiên, đồng nhất.",
          "C. Phanh bằng cả hai chân cùng một lúc.",
          "D. Tự động kéo phanh tay mỗi khi vào cua."
        ],
        answer: 1,
        explanation: "Blended braking giấu đi sự chuyển giao phức tạp giữa phanh điện từ và má phanh sắt. Người lái đạp phanh thấy bàn đạp rất đầm và tự nhiên, trong khi xe âm thầm dùng mô tơ để sạc thu hồi tối đa 90% năng lượng."
      },
      {
        id: 12,
        question: "Hiện tượng 'Head Bobbing' (Gật gù đầu / Say xe) ở hành khách ngồi trên xe điện chạy One-Pedal Drive thường do nguyên nhân thao tác nào và HMI khắc phục ra sao?",
        options: [
          "A. Do ghế ngồi quá mềm.",
          "B. Do tài xế chưa quen cách mớm ga nên nhấc chân ga quá đột ngột khiến xe giật khựng lại liên tục; HMI khắc phục bằng cách cung cấp chế độ phanh tái sinh êm dịu (Smooth/Low Regen) và hiển thị thanh phản hồi độ mượt chân ga.",
          "C. Do kính xe quá trong suốt.",
          "D. Do tiếng ồn của lốp xe trên đường nhựa."
        ],
        answer: 1,
        explanation: "Lực phanh tái sinh cực lớn khiến người lái mới nếu nhả ga như xe xăng sẽ làm hành khách bị giật chúi đầu về phía trước liên tục gây say xe dữ dội. HMI cho phép tinh chỉnh độ nhạy lực phanh mượt mà hơn."
      },
      {
        id: 13,
        question: "Màn hình 'Báo cáo chuyến đi' (Trip Summary UI) sau khi xe điện về số P thường vinh danh chỉ số nào của phanh tái sinh?",
        options: [
          "A. Số lần tài xế bấm còi trong suốt chuyến đi.",
          "B. Tổng lượng điện năng đã thu hồi được nhờ phanh tái sinh (ví dụ: '+2.4 kWh thu hồi - tăng thêm 15 km tầm vận hành miễn phí'), tạo động lực tích cực cho lối lái xe xanh.",
          "C. Số giọt dầu động cơ đã rò rỉ.",
          "D. Tốc độ gió trung bình thổi vào kính lái."
        ],
        answer: 1,
        explanation: "Gamification trong HMI: Nhìn thấy con số điện thu hồi và số km 'lời ra' sau chuyến đi đem lại niềm vui và cảm giác tự hào cho chủ xe điện, củng cố hành vi lái xe an toàn và bền vững."
      },
      {
        id: 14,
        question: "Tính năng 'Smart Regenerative Braking' dựa trên Radar phía trước (như trên Mercedes EQ hoặc Hyundai Ioniq) tự động làm gì?",
        options: [
          "A. Bắn sóng radar làm hỏng camera bắn tốc độ.",
          "B. Tự động tăng lực phanh tái sinh khi radar phát hiện có xe phía trước đang đi chậm lại hoặc khi xe sắp tới khúc cua dốc, và tự động thả trôi khi đường phía trước hoàn toàn thông thoáng.",
          "C. Tự động vượt xe phía trước bên phải.",
          "D. Phát âm thanh cảnh báo tới radar máy bay."
        ],
        answer: 1,
        explanation: "Phanh tái sinh thông minh giải phóng tài xế khỏi việc gẩy lẫy thủ công. Xe tự 'nhìn' đường: đường thoáng thì thả trôi lướt êm, có xe trước thì tự ghì phanh sạc pin giữ khoảng cách an toàn."
      },
      {
        id: 15,
        question: "Khi xe điện kích hoạt chế độ chạy trên đường trơn trượt có tuyết băng (Snow/Ice Mode), HMI sẽ tự động cấu hình phanh tái sinh như thế nào?",
        options: [
          "A. Đẩy phanh tái sinh lên mức tối đa cực đại.",
          "B. Giảm hoặc tắt phanh tái sinh mạnh, chuyển sang hãm phanh siêu nhẹ để tránh hiện tượng bánh xe bị bó cứng hoặc trượt văng đuôi xe trên bề mặt đường có độ bám dính thấp.",
          "C. Khóa cứng vi sai cầu trước.",
          "D. Tự động xả hết hơi trong lốp xe."
        ],
        answer: 1,
        explanation: "Trên mặt đường trơn trượt như băng tuyết hoặc bùn lầy, lực phanh tái sinh lớn đột ngột vào trục dẫn động có thể làm bánh xe mất độ bám ngang và văng xe. Snow Mode tự động làm dịu phanh tái sinh để xe lăn bánh an toàn."
      }
    ]
  },
  {
    id: 13,
    title: "Bài 13: Thiết Kế Âm Thanh & Cảnh Báo Xe Điện (AVAS & Soundscapes)",
    badge: "Acoustics & Sound",
    category: "ev",
    description: "Hệ thống âm thanh cảnh báo người đi bộ AVAS (UNECE R138), âm thanh giả lập khoang lái (Active Sound Design) và âm học nội thất xe điện.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Hệ thống AVAS (Acoustic Vehicle Alerting System - Âm thanh cảnh báo phương tiện cho người đi bộ) trên xe điện BẮT BUỘC theo luật quốc tế (UNECE R138 / FMVSS 141) vì lý do an toàn nào?",
        options: [
          "A. Để cạnh tranh âm lượng với các lễ hội ngoài đường.",
          "B. Do xe điện vận hành ở tốc độ thấp cực kỳ êm ái, người đi bộ khiếm thị, người già và trẻ em không thể nghe thấy tiếng động cơ tiếp cận, dẫn tới nguy cơ va chạm tăng vọt.",
          "C. Để phát nhạc quảng cáo cho hãng xe.",
          "D. Nhằm mục đích xua đuổi muỗi và côn trùng."
        ],
        answer: 1,
        explanation: "Ở dải tốc độ dưới 20-30 km/h, tiếng ồn lốp xe chưa đủ lớn và động cơ điện gần như im lặng tuyệt đối. AVAS bắt buộc phát ra âm thanh giả lập ra loa ngoài đầu xe để người đi đường nhận biết có xe đang tới gần."
      },
      {
        id: 2,
        question: "Theo quy chuẩn UNECE R138, hệ thống AVAS bắt buộc phải tự động phát âm thanh ở dải tốc độ nào của xe điện?",
        options: [
          "A. Khi xe chạy từ 100 km/h đến 200 km/h.",
          "B. Khi xe bắt đầu di chuyển từ 0 km/h đến tối thiểu 20 km/h (tại Mỹ là 30 km/h) và khi xe đang cài số lùi (R).",
          "C. Chỉ khi xe đã tắt máy đỗ trong ga-ra.",
          "D. Chỉ khi trời mưa bão lớn."
        ],
        answer: 1,
        explanation: "Trên 20-30 km/h, tiếng ma sát giữa lốp xe với mặt đường và tiếng gió cản khí động học đã đủ lớn để con người nghe thấy từ xa nên hệ thống AVAS được phép tự động ngắt âm thanh."
      },
      {
        id: 3,
        question: "Đặc tính âm học của âm thanh AVAS phải biến đổi như thế nào khi xe tăng tốc hoặc giảm tốc?",
        options: [
          "A. Giữ nguyên một tần số đơn điệu không thay đổi âm điệu.",
          "B. Cao độ âm thanh (Pitch) và âm lượng (Volume) phải biến thiên tỷ lệ thuận với tốc độ thực tế của xe (xe đi nhanh hơn thì âm thanh réo cao hơn và rõ hơn) để người nghe nhận thức được gia tốc của xe.",
          "C. Tự động đổi bài hát ngẫu nhiên mỗi 5 giây.",
          "D. Chuyển sang tiếng còi tàu hỏa khi xe tăng tốc."
        ],
        answer: 1,
        explanation: "Quy chuẩn yêu cầu tần số âm thanh phải dịch chuyển theo vận tốc xe (Frequency pitch shifting) để người đi bộ theo bản năng nhận biết được chiếc xe đang tăng tốc lao tới hay đang phanh chậm lại."
      },
      {
        id: 4,
        question: "Quy định an toàn có cho phép tài xế xe điện có nút bấm tắt hoàn toàn âm thanh AVAS (AVAS Pause Switch) hay không?",
        options: [
          "A. Cho phép tắt vĩnh viễn không giới hạn.",
          "B. Các quy định cập nhật mới nhất (như tại Châu Âu và Mỹ) nghiêm cấm lắp đặt công tắc tắt AVAS thủ công nhằm ngăn chặn việc tài xế vô hiệu hóa tính năng an toàn bảo vệ người đi bộ.",
          "C. Chỉ cho phép trẻ em ngồi ghế sau tắt.",
          "D. Cho phép tắt khi bật đài radio."
        ],
        answer: 1,
        explanation: "Trước đây một số xe có nút 'AVAS OFF' nhưng các cơ quan an toàn đã bãi bỏ hoàn toàn vì nhiều tài xế có thói quen tắt đi vì không thích nghe tiếng rè rè, gây mất an toàn cho người khiếm thị."
      },
      {
        id: 5,
        question: "Công nghệ 'Active Sound Design' (ASD / Âm thanh nội thất buồng lái chủ động) trên xe điện giải quyết bài toán trải nghiệm nào của người lái?",
        options: [
          "A. Làm rung kính cửa sổ để chống bám bụi.",
          "B. Cung cấp phản hồi thính giác giả lập tinh tế qua hệ thống loa trong xe tương ứng với độ nhấn chân ga và mô-men xoắn, bù đắp cho việc thiếu tiếng gầm động cơ đốt trong giúp tài xế cảm nhận tốc độ chân thực.",
          "C. Giả lập tiếng động vật trong rừng để người lái thư giãn.",
          "D. Bắt buộc người lái phải đeo tai nghe chống ồn."
        ],
        answer: 1,
        explanation: "Không có tiếng gầm động cơ, tài xế xe điện rất dễ đạp ga vọt lên 100 km/h mà không hề hay biết do thiếu phản hồi âm thanh. Âm thanh buồng lái (Soundscape) giúp tài xế kiểm soát tốc độ trực giác hơn."
      },
      {
        id: 6,
        question: "Xu hướng 'Branded Sound Design' (Âm thanh nhận diện thương hiệu) trên xe điện (ví dụ hợp tác giữa Hans Zimmer và BMW IconicSounds) thể hiện điều gì?",
        options: [
          "A. Bật các đoạn nhạc quảng cáo bán hàng mỗi khi mở cửa xe.",
          "B. Xây dựng bản sắc âm thanh tương lai độc bản cho từng chế độ lái (Comfort: âm thanh êm dịu vũ trụ; Sport: âm thanh cơ khí điện từ uy lực), tạo nên cá tính riêng biệt cho trải nghiệm xe điện.",
          "C. Buộc tất cả xe ô tô trên thế giới phải kêu tiếng giống hệt nhau.",
          "D. Tăng công suất của động cơ xe lên gấp đôi."
        ],
        answer: 1,
        explanation: "Mỗi hãng xe điện giờ đây có một 'DNA âm thanh' riêng (Audi e-sound, Porsche Electric Sport Sound, BMW IconicSounds) được sáng tác bởi các nhạc sĩ hàng đầu thế giới để tạo nên trải nghiệm cảm xúc đỉnh cao."
      },
      {
        id: 7,
        question: "Hiện tượng 'Cabin Acoustic Masking Effect' (Hiệu ứng mặt nạ âm học khoang lái) bị mất đi trên xe điện gây ra phiền toái gì cho người ngồi trong xe?",
        options: [
          "A. Xe chạy quá êm khiến tiếng động cơ không còn át đi các tiếng cót két của nhựa nội thất, tiếng gió rít qua khe cửa kính và tiếng lốp miết trên đường, làm các tạp âm này bộc lộ rõ mồn một.",
          "B. Người ngồi trong xe không thể nói chuyện được với nhau.",
          "C. Làm cho âm thanh loa xe bị méo tiếng.",
          "D. Khiến điều hòa xe không mát."
        ],
        answer: 0,
        explanation: "Động cơ xăng hoạt động như một lớp 'mặt nạ âm thanh' che lấp mọi tiếng ọt ẹt nhỏ trong xe. Khi chuyển sang xe điện siêu êm, tiếng cót két của ghế hay tiếng gió qua gương chiếu hậu trở nên cực kỳ khó chịu đối với tai người."
      },
      {
        id: 8,
        question: "Công nghệ 'Active Road Noise Cancellation' (RNC / Khử ồn đường chủ động) trong khoang lái xe điện hoạt động ra sao?",
        options: [
          "A. Yêu cầu công nhân rải thảm len lên mặt đường cao tốc.",
          "B. Cảm biến gia tốc đặt tại hệ thống treo đo đạc độ rung của mặt đường trong vài mili-giây, máy tính tính toán và phát ra sóng âm đảo pha 180° qua loa trần xe/tựa đầu để triệt tiêu tiếng ồn lốp xe trước khi tới tai người nghe.",
          "C. Tự động đóng chặt toàn bộ lỗ thông hơi của xe.",
          "D. Đổi phông chữ màn hình sang chế độ chống ồn."
        ],
        answer: 1,
        explanation: "RNC sử dụng thuật toán triệt tiêu sóng âm đối pha (Phase inversion tương tự tai nghe AirPods Pro) loại bỏ hoàn toàn tiếng ù rền tần số thấp của lốp xe dội từ mặt đường vào cabin."
      },
      {
        id: 9,
        question: "Âm thanh cảnh báo va chạm khẩn cấp (Emergency Collision Audio Warning) trên xe hơi cần tuân thủ dải tần số nào để kích hoạt phản xạ nhanh nhất?",
        options: [
          "A. Tần số siêu trầm dưới 20 Hz không nghe thấy bằng tai.",
          "B. Dải tần số trung-cao từ 2.000 Hz đến 4.000 Hz với chuỗi âm thanh ngắt quãng dồn dập (Staccato beeps), dải tần mà ốc tai con người nhạy cảm sinh học nhất.",
          "C. Tiếng chim hót líu lo êm dịu.",
          "D. Tần số siêu âm trên 50.000 Hz."
        ],
        answer: 1,
        explanation: "Tiến hóa sinh học khiến tai người phản xạ kích động mạnh nhất với âm thanh 2-4kHz (tương đương tiếng trẻ sơ sinh khóc hoặc tiếng thú dữ gầm). Âm báo khẩn cấp ở tần số này kích hoạt hệ thần kinh trong dưới 100ms."
      },
      {
        id: 10,
        question: "Tại sao việc thiết kế âm thanh xi-nhan (Turn Signal Click Sound) trên xe điện hiện đại vẫn mô phỏng tiếng 'tách - tạch' cơ học dù rơ-le cơ đã bị loại bỏ hoàn toàn?",
        options: [
          "A. Do vi điều khiển xe bị lỗi phần mềm.",
          "B. Tôn trọng mô hình tinh thần (Mental model) lâu đời của con người: tiếng lách cách mang lại phản hồi thính giác quen thuộc nhắc nhở tài xế tắt xi-nhan sau khi đã chuyển làn xong.",
          "C. Do các hãng sản xuất xe tiết kiệm chi phí lập trình.",
          "D. Là quy định bắt buộc của ngành bưu chính."
        ],
        answer: 1,
        explanation: "Xe điện hiện đại dùng bóng LED và chip bán dẫn hoàn toàn im lặng. Tiếng 'tách tạch' là âm thanh tổng hợp kỹ thuật số phát qua loa nhỏ để người lái biết xi nhan đang nháy mà không cần cúi đầu nhìn bảng đồng hồ."
      },
      {
        id: 11,
        question: "Cảnh báo âm thanh 'Auditory Fatigue' (Mệt mỏi thính giác) trong cabin ô tô xảy ra khi nào?",
        options: [
          "A. Khi bật bài hát yêu thích quá nhiều lần.",
          "B. Khi hệ thống HMI phát ra quá nhiều tiếng 'bíp' liên tục với âm lượng lớn và tần số chói tai cho mọi tương tác thông thường, khiến tài xế bị căng thẳng thần kinh và muốn tắt hết tính năng trợ lái.",
          "C. Khi loa xe bị cháy màng loa.",
          "D. Do tài xế mở cửa sổ khi chạy nhanh."
        ],
        answer: 1,
        explanation: "Nếu lấn làn nhẹ kêu bíp, xe sau đến gần kêu bíp, đổi bài hát kêu bíp, tài xế sẽ bị phát điên vì 'bão chuông báo' (Alert fatigue) và thường chọn cách tắt vĩnh viễn các tính năng an toàn ADAS."
      },
      {
        id: 12,
        question: "Chức năng 'Tùy biến âm thanh mở/khóa cửa' (Custom Lock Chime / Boombox Mode như trên Tesla) cho phép người dùng:",
        options: [
          "A. Tự động đổi màu sơn xe khi khóa cửa.",
          "B. Chọn tiếng âm thanh độc đáo (tiếng gõ gỗ, tiếng vịt kêu, tiếng lục lạc) khi bấm khóa xe từ xa, tạo nên trải nghiệm cá nhân hóa vui nhộn cho chủ xe.",
          "C. Làm cho chìa khóa xe tự động biến mất.",
          "D. Tự động mở cửa xe khi có người lạ chạm vào."
        ],
        answer: 1,
        explanation: "Cá nhân hóa âm thanh khóa xe là chi tiết vi mô mang tính kết nối cảm xúc thương hiệu sâu sắc, giúp chủ xe dễ dàng tìm thấy xe trong bãi đỗ rộng lớn qua âm thanh đặc trưng của riêng mình."
      },
      {
        id: 13,
        question: "Loa tựa đầu ghế lái (Headrest Speakers) mang lại ưu thế HMI thính giác vượt trội nào?",
        options: [
          "A. Làm rung tóc của tài xế để massage đầu.",
          "B. Phát thông báo điều hướng ngã rẽ và cuộc gọi điện thoại riêng tư kín đáo thẳng vào tai người lái mà không làm gián đoạn bài nhạc của các hành khách khác trong xe.",
          "C. Giảm tiêu thụ điện của ắc quy 12V.",
          "D. Thay thế hoàn toàn kính chiếu hậu."
        ],
        answer: 1,
        explanation: "Loa tựa đầu tạo ra vùng âm thanh cá nhân (Personal sound zone). Khi có cuộc gọi đến, chỉ tài xế nghe và trả lời riêng tư, nhạc trong xe chỉ giảm nhẹ âm lượng, các hành khách khác vẫn thưởng thức âm nhạc trọn vẹn."
      },
      {
        id: 14,
        question: "Độ trễ âm thanh (Audio Latency) tối đa cho phép đối với âm thanh phản hồi xúc giác khi chạm màn hình cảm ứng là:",
        options: [
          "A. Khoảng 5 giây sau khi chạm.",
          "B. Dưới 20 đến 50 mili-giây để não bộ con người đồng bộ hóa cảm giác ngón tay chạm và tai nghe thành một sự kiện vật lý duy nhất.",
          "C. Khoảng 1 phút.",
          "D. Không cần quan tâm độ trễ."
        ],
        answer: 1,
        explanation: "Nếu ngón tay bấm vào nút mà 100ms sau loa mới phát ra tiếng click, não bộ sẽ nhận ra sự lệch pha (Sensory desynchronization), tạo cảm giác giao diện bị lag và rẻ tiền."
      },
      {
        id: 15,
        question: "Tính năng 'Welcome & Departure Soundscape' (Âm thanh chào mừng và tạm biệt) khi mở/tắt xe điện có vai trò tâm lý học gì?",
        options: [
          "A. Để thông báo cho trộm biết chủ xe đã về nhà.",
          "B. Đóng vai trò là nghi thức tương tác xác nhận (Ceremony of activation): báo cho người lái biết hệ thống điện cao áp của xe đã sẵn sàng khởi động hoặc đã tắt nguồn an toàn trước khi rời xe.",
          "C. Giúp xe tự động khóa phanh bánh xe.",
          "D. Thay thế hoàn toàn còi chống trộm."
        ],
        answer: 1,
        explanation: "Vì xe điện không có tiếng nổ đề máy 'vrooom' của động cơ xăng, âm thanh khởi động nhẹ nhàng đóng vai trò khẳng định: 'Hệ thống đã sẵn sàng lăn bánh', giải tỏa băn khoăn liệu xe đã nổ máy chưa."
      }
    ]
  },
  {
    id: 14,
    title: "Bài 14: HMI Cho Hệ Thống Trợ Lái ADAS & Cảnh Báo An Toàn",
    badge: "ADAS HMI",
    category: "auto",
    description: "Trực quan hóa ACC, Giữ làn LKA, Cảnh báo điểm mù BSM, Phanh khẩn cấp tự động AEB và cơ chế phát hiện rảnh tay (Hands-on Detection).",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Mục tiêu tối thượng của việc thiết kế HMI cho hệ thống ADAS (Advanced Driver Assistance Systems) là gì?",
        options: [
          "A. Ru ngủ tài xế để họ có thể ngủ một giấc trên đường cao tốc.",
          "B. Xây dựng 'Mô hình tin cậy hiệu chuẩn' (Calibrated Trust): Giúp tài xế hiểu rõ khả năng và giới hạn thực tế của hệ thống, không nghi ngờ quá mức nhưng cũng không chủ quan phó mặc hoàn toàn cho máy móc.",
          "C. Thay thế hoàn toàn người lái xe bằng trí tuệ nhân tạo.",
          "D. Tối đa hóa số lượng biểu tượng hiển thị trên màn hình."
        ],
        answer: 1,
        explanation: "Nếu tin tưởng thái quá (Over-trust), tài xế sẽ buông tay ngủ gật gây tai nạn; nếu không tin tưởng (Under-trust), họ sẽ tắt tính năng đi. HMI chuẩn phải hiển thị chính xác những gì cảm biến xe 'thấy' và 'không thấy'."
      },
      {
        id: 2,
        question: "Màn hình trực quan hóa môi trường ADAS thời gian thực (như Tesla Full-Self-Driving Visualization) hiển thị các xe xung quanh, vạch kẻ đường và người đi bộ nhằm mang lại giá trị tâm lý nào?",
        options: [
          "A. Để người dùng chơi trò chơi điện tử mô phỏng lái xe.",
          "B. Tạo sự an tâm và minh bạch (Transparency): Cho tài xế thấy chiếc xe thực sự nhận biết được thế giới xung quanh, xác nhận rằng các radar/camera đang hoạt động chính xác.",
          "C. Tự động gửi video ghi hình về cho cảnh sát giao thông.",
          "D. Giảm lượng tiêu thụ điện của bộ vi xử lý AI."
        ],
        answer: 1,
        explanation: "Khi tài xế thấy chiếc xe tải bên cạnh xuất hiện chính xác trên màn hình, họ biết hệ thống đã 'nhìn' thấy nguy cơ và tự tin rằng chiếc xe sẽ không bất cẩn chuyển làn đâm vào xe tải đó."
      },
      {
        id: 3,
        question: "Hệ thống kiểm soát hành trình thích ứng (ACC - Adaptive Cruise Control) hiển thị thông số nào trên HMI để tài xế kiểm soát khoảng cách an toàn?",
        options: [
          "A. Cân nặng của xe phía trước.",
          "B. Tốc độ mục tiêu cài đặt (Set Speed) và Các vạch khoảng cách thời gian bám đuôi (Time-gap Bars: ví dụ 1 vạch = 1.0s, 3 vạch = 2.0s cách xe trước).",
          "C. Nhãn hiệu của chiếc xe đi phía trước.",
          "D. Số lít xăng còn lại trong bình xe phía trước."
        ],
        answer: 1,
        explanation: "Khoảng cách trong ACC tính bằng khoảng đệm thời gian (Time gap: giây). HMI hiển thị các vạch khoảng cách trực quan giúp tài xế tăng/giảm cự ly bám đuôi phù hợp với mật độ giao thông."
      },
      {
        id: 4,
        question: "Hệ thống Hỗ trợ giữ làn đường (LKA / Lane Centering) sử dụng mã màu quy ước chuẩn nào trên màn hình cụm đồng hồ để biểu thị trạng thái?",
        options: [
          "A. Đỏ: Hệ thống đang giữ làn tốt; Xanh: Hệ thống bị lỗi.",
          "B. Trắng/Xám: Hệ thống ở chế độ chờ (Standby) do chưa nhận diện đủ vạch kẻ đường; Xanh lá cây: Hệ thống đang chủ động đánh lái giữ xe ở giữa làn; Nhấp nháy Vàng/Đỏ: Xe bị chệch làn nguy cấp.",
          "C. Tím: Hệ thống đang nâng cấp phần mềm qua mạng.",
          "D. Luôn luôn hiển thị màu đen."
        ],
        answer: 1,
        explanation: "Quy ước chuẩn toàn cầu: Màu xám là sẵn sàng nhưng chưa kích hoạt, màu xanh lá cây là đang can thiệp lái tích cực (Active control), và màu vàng/đỏ là cảnh báo nguy cơ đè vạch."
      },
      {
        id: 5,
        question: "Hệ thống Cảnh báo điểm mù (BSM - Blind Spot Monitoring) đặt đèn báo hiệu trực quan ở vị trí nào là chuẩn công thái học tốt nhất?",
        options: [
          "A. Dưới sàn xe sát bàn đạp phanh.",
          "B. Ngay trên mặt gương chiếu hậu ngoài hoặc ở ốp nhựa chân cột A phía trong cabin, đúng hướng mắt tài xế liếc sang khi chuẩn bị chuyển làn.",
          "C. Trong hộc đựng đồ ghế phụ.",
          "D. Trên màn hình giải trí trung tâm cách xa tầm mắt."
        ],
        answer: 1,
        explanation: "Khi định chuyển làn, tài xế theo phản xạ sẽ liếc gương chiếu hậu. Đặt đèn tam giác vàng/đỏ ngay góc gương đảm bảo tài xế thấy cảnh báo tức thì ngay khi chuẩn bị đánh lái."
      },
      {
        id: 6,
        question: "Nếu tài xế bật xi-nhan xin chuyển làn sang bên trái trong khi hệ thống BSM đang phát hiện có xe máy lao tới trong điểm mù, HMI sẽ phản ứng nâng cấp cấp độ cảnh báo như thế nào?",
        options: [
          "A. Tự động tắt đèn báo điểm mù để tài xế tập trung.",
          "B. Chuyển từ đèn vàng sáng tĩnh sang đèn đỏ nhấp nháy dồn dập, đồng thời phát âm thanh cảnh báo 'bíp bíp' khẩn cấp và rung xúc giác vô-lăng bên trái để ngăn chặn cú đánh lái.",
          "C. Tự động mở cửa xe bên trái.",
          "D. Đổi nhạc phát trong xe sang bài hát buồn."
        ],
        answer: 1,
        explanation: "Đây là nguyên tắc cảnh báo theo cấp bậc (Tiered Alerts): Chỉ liếc gương thì đèn sáng tĩnh nhắc nhở; nhưng nếu bật xi nhan định rẽ (ý định nguy hiểm rõ rệt), hệ thống lập tức kích hoạt cảnh báo đa giác quan tối đa."
      },
      {
        id: 7,
        question: "Cơ chế 'Hands-On Steering Wheel Detection' (HOD / Phát hiện tay trên vô-lăng) sử dụng công nghệ cảm biến nào được đánh giá là ưu việt hơn cảm biến mô-men xoắn (Torque sensor)?",
        options: [
          "A. Cảm biến nhiệt độ đo độ ẩm mồ hôi tay.",
          "B. Cảm biến điện dung tích hợp quanh vành vô-lăng (Capacitive Touch Sensing), nhận diện sự chạm nhẹ của da tay người lái mà không bắt tài xế phải giật lắc vô-lăng liên tục.",
          "C. Bắt buộc tài xế phải bóp còi mỗi 30 giây.",
          "D. Cảm biến đo nhịp tim qua móng tay."
        ],
        answer: 1,
        explanation: "Cảm biến mô men xoắn đời cũ bắt tài xế phải ghì lắc vô lăng dù xe đang chạy thẳng tắp, gây phiền toái cực lớn. Vô lăng cảm ứng điện dung chỉ cần một ngón tay chạm nhẹ là xác nhận tài xế vẫn đang kiểm soát xe."
      },
      {
        id: 8,
        question: "Chuỗi cảnh báo nhắc nhở đặt tay lên vô-lăng (Hands-on Escalation Warning Sequence) trên xe hơi cấp độ 2 thường diễn ra theo trình tự nào?",
        options: [
          "A. Bung túi khí ngay lập tức sau 1 giây buông tay.",
          "B. Cấp 1 (Thị giác): Biểu tượng vô lăng nhấp nháy nhẹ → Cấp 2 (Thính giác): Chuông bíp cảnh báo → Cấp 3 (Cưỡng chế): Giật nhẹ phanh haptic, nếu tài xế vẫn không cầm lái xe sẽ bật đèn khẩn cấp và từ từ phanh dừng xe lại trong làn.",
          "C. Tắt máy xe và mở khóa tất cả các cửa.",
          "D. Tự động tăng tốc xe lên vận tốc tối đa."
        ],
        answer: 1,
        explanation: "Chuỗi cảnh báo leo thang (Escalation): Nhẹ nhàng nhắc nhở bằng hình ảnh trước, sau đó tới chuông báo, giật phanh và cuối cùng là tính năng dừng xe an toàn khẩn cấp (Emergency Stop Assistant) nếu tài xế bị ngất hoặc đột quỵ."
      },
      {
        id: 9,
        question: "Hệ thống Phanh khẩn cấp tự động (AEB - Autonomous Emergency Braking) hiển thị cảnh báo va chạm sớm (FCW - Forward Collision Warning) như thế nào trên HUD/Cluster?",
        options: [
          "A. Hiển thị một đoạn văn bản hướng dẫn lái xe an toàn.",
          "B. Chiếu biểu tượng xe màu đỏ chớp nháy cực lớn hoặc thanh đèn LED đỏ nhấp nháy trên kính lái (HUD HUD strobe) kèm chuông cảnh báo khẩn cấp chói tai đòi hỏi can thiệp phanh tức thì.",
          "C. Tự động tắt đèn pha phía trước.",
          "D. Đổi màn hình sang nền màu hồng."
        ],
        answer: 1,
        explanation: "FCW là cảnh báo tính mạng trong tích tắc (Time-to-collision < 1.5s). Biểu tượng xe màu đỏ to bản kết hợp dải LED đỏ chiếu hắt lên kính lái đập thẳng vào mắt tài xế cảnh báo đạp phanh khẩn cấp."
      },
      {
        id: 10,
        question: "Tại sao việc hiển thị lý do ngắt tính năng ADAS (System Disengagement Reason) lại là yêu cầu HMI bắt buộc?",
        options: [
          "A. Để công ty bảo hiểm thu thêm phí phạt.",
          "B. Giúp tài xế hiểu rõ nguyên nhân hệ thống tự động trả quyền lái (ví dụ: 'Camera bị sương mù che khuất', 'Vạch kẻ đường biến mất', 'Tốc độ xe vượt quá 130 km/h') thay vì để tài xế hoang mang tự hỏi xe bị hỏng hay không.",
          "C. Để xe tự động xóa lịch sử hành trình.",
          "D. Để lưu dữ liệu vào thẻ nhớ điện thoại."
        ],
        answer: 1,
        explanation: "Nếu hệ thống đột ngột tắt tính năng trợ lái mà chỉ kêu một tiếng bíp vô nghĩa, tài xế sẽ bối rối và mất niềm tin. Thông báo nguyên nhân rõ ràng giúp tài xế kịp thời cầm lái chủ động."
      },
      {
        id: 11,
        question: "Tính năng Hỗ trợ đỗ xe tự động (Park Assist / Auto Parking) cần giao diện HMI hiển thị những thông tin cốt lõi nào khi tìm kiếm chỗ đỗ?",
        options: [
          "A. Giá tiền đỗ xe của bãi xe theo giờ.",
          "B. Hiển thị mô hình camera 360°, đánh dấu khung chữ nhật màu xanh lá lên chỗ trống khả thi được cảm biến quét thấy, kèm nút bấm xác nhận 'Bắt đầu tự đỗ' và hướng dẫn nhả vô-lăng.",
          "C. Danh sách các bài hát trong danh bạ.",
          "D. Tên của người chủ chiếc xe bên cạnh."
        ],
        answer: 1,
        explanation: "Người dùng cần xác nhận: Chiếc xe có 'nhìn' thấy đúng khoảng trống đỗ xe mà mình mong muốn hay không trước khi bấm nút giao toàn bộ quyền đánh lái và phanh cho máy tính."
      },
      {
        id: 12,
        question: "Tính năng Giám sát phương tiện cắt ngang phía sau khi lùi xe (RCTA - Rear Cross-Traffic Alert) hiển thị mũi tên cảnh báo hướng xe tới ở đâu là tối ưu?",
        options: [
          "A. Trên trần xe sát gương chiếu hậu trung tâm.",
          "B. Ngay trên màn hình Camera lùi phía sau, vẽ mũi tên động màu đỏ trỏ đúng vào hướng phương tiện đang lao tới từ bên trái hoặc bên phải kèm âm thanh định hướng.",
          "C. Dưới bảng điều khiển chân ga.",
          "D. Chỉ gửi thông báo qua đồng hồ thông minh."
        ],
        answer: 1,
        explanation: "Khi lùi xe, mắt tài xế đang nhìn chằm chằm vào màn hình camera lùi. Hiển thị mũi tên đỏ động ngay trên luồng video camera chỉ rõ hướng nguy hiểm tiếp cận giúp tài xế phanh xe kịp thời."
      },
      {
        id: 13,
        question: "Khái niệm 'False Alarms' (Cảnh báo giả / Báo động nhầm) trong hệ thống ADAS gây ra hậu quả tâm lý tiêu cực nào cho tài xế?",
        options: [
          "A. Giúp tài xế tỉnh táo hơn khi lái xe.",
          "B. Dẫn đến hiệu ứng 'Cậu bé chăn cừu' (The Boy Who Cried Wolf): Tài xế mất hoàn toàn niềm tin vào hệ thống, coi thường các cảnh báo tiếp theo hoặc chủ động tắt tính năng an toàn đi.",
          "C. Làm cho xe chạy nhanh hơn bình thường.",
          "D. Giảm lượng tiêu thụ điện của ắc quy."
        ],
        answer: 1,
        explanation: "Nếu xe phanh khẩn cấp nhầm khi chỉ có một chiếc túi nilon bay qua đường, tài xế sẽ vừa hoảng sợ vừa bực mình. HMI và thuật toán ADAS phải cân bằng giữa độ nhạy và tỷ lệ báo động giả cực thấp."
      },
      {
        id: 14,
        question: "Chế độ hiển thị 'Night Vision Assist' (Hỗ trợ tầm nhìn ban đêm bằng hồng ngoại) trên HMI cụm đồng hồ xử lý việc làm nổi bật người đi bộ và động vật hoang dã như thế nào?",
        options: [
          "A. Tô màu đen toàn bộ màn hình để chống chói.",
          "B. Sử dụng thuật toán AI phát hiện nhiệt độ cơ thể sống, tự động khoanh khung viền màu vàng/đỏ nổi bật quanh người đi bộ và nhấp nháy đèn pha về phía họ để cảnh báo.",
          "C. Tự động tắt đèn pha của xe.",
          "D. Phát âm thanh tiếng chó sủa qua loa ngoài."
        ],
        answer: 1,
        explanation: "Hình ảnh camera hồng ngoại ban đêm thường mờ và xám xịt khó phân biệt. Thuật toán HMI tự động đóng khung chữ nhật vàng quanh vật thể sống giúp tài xế nhận ra người đi bộ từ khoảng cách 150-200 mét."
      },
      {
        id: 15,
        question: "Tính năng Nhận diện biển báo giao thông (TSR - Traffic Sign Recognition) hiển thị biển giới hạn tốc độ trên HMI cần cập nhật bổ sung thông tin gì?",
        options: [
          "A. Tên của người thợ đã cắm biển báo đó bên đường.",
          "B. Cảnh báo vượt tốc độ (biển báo nhấp nháy đỏ hoặc có viền đỏ bao quanh khi xe chạy quá tốc độ cho phép) và hiển thị biển báo phụ theo điều kiện thời tiết (ví dụ: '80 km/h khi trời mưa').",
          "C. Chiều cao và cân nặng của cột biển báo.",
          "D. Số điện thoại của cục đường bộ."
        ],
        answer: 1,
        explanation: "Chỉ hiện biểu tượng số '80' là chưa đủ. HMI phải so sánh tốc độ thực tế của xe với biển báo, cảnh báo viền đỏ nổi bật nếu tài xế vượt tốc độ và nhận diện các biển phụ theo thời tiết hoặc giờ trong ngày."
      }
    ]
  },
  {
    id: 15,
    title: "Bài 15: Chuyển Giao Quyền Lái & Cảnh Báo Xe Tự Hành (SAE Levels & TOR)",
    badge: "Autonomous Driving",
    category: "auto",
    description: "Phân cấp SAE Cấp độ 0-5, quy trình yêu cầu giành lại quyền lái TOR (Takeover Request), phản hồi đa giác quan và giải quyết khủng hoảng nhận thức.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Theo phân loại chuẩn quốc tế của Hiệp hội Kỹ sư Ô tô (SAE J3016), sự khác biệt căn bản nhất giữa Cấp độ 2 (Level 2) và Cấp độ 3 (Level 3) nằm ở trách nhiệm của ai?",
        options: [
          "A. Cấp độ 2 dành cho xe máy, Cấp độ 3 dành cho xe tải.",
          "B. Ở Cấp độ 2, con người là người giám sát chính liên tục (Human drives/supervises); ở Cấp độ 3, chiếc xe là người lái chính trong điều kiện cho phép và con người chỉ cần can thiệp khi có yêu cầu chuyển giao (TOR).",
          "C. Cấp độ 3 không cần có vô-lăng.",
          "D. Cấp độ 2 chỉ hoạt động khi trời nắng."
        ],
        answer: 1,
        explanation: "Bước nhảy từ L2 sang L3 là ranh giới pháp lý khổng lồ: Ở L2 tài xế luôn phải chịu trách nhiệm pháp lý; ở L3 khi xe kích hoạt tự lái, trách nhiệm giám sát thuộc về nhà sản xuất ô tô cho đến khi có cảnh báo TOR."
      },
      {
        id: 2,
        question: "Quy trình 'TOR' (Takeover Request - Yêu cầu giành lại quyền kiểm soát) trong xe tự hành Cấp độ 3 diễn ra khi nào?",
        options: [
          "A. Khi tài xế muốn nghe một bài hát mới.",
          "B. Khi chiếc xe sắp rời khỏi Miền thiết kế vận hành cho phép (ODD - Operational Design Domain: ví dụ gặp thời tiết bão tuyết mù mịt, sắp ra khỏi cao tốc, hoặc gặp công trường thi công phức tạp phía trước).",
          "C. Khi xe đã sạc đầy 100% pin.",
          "D. Khi hành khách ghế sau muốn mở cửa sổ."
        ],
        answer: 1,
        explanation: "Xe tự hành L3 chỉ hoạt động trong phạm vi ODD xác định (ví dụ cao tốc dưới 60km/h khi tắc đường). Khi ODD sắp kết thúc, xe phải gửi cảnh báo TOR để con người chuẩn bị tiếp nhận lại tay lái."
      },
      {
        id: 3,
        question: "Thời gian cảnh báo chuyển giao (Takeover Transition Time) tối thiểu mà hệ thống HMI xe tự hành L3 phải dành cho tài xế theo khuyến nghị an toàn là bao nhiêu?",
        options: [
          "A. 0.1 giây",
          "B. Khoảng 5 đến 10 giây (đủ để tài xế đang đọc sách hoặc xem phim kịp định thần nhận thức lại tình huống giao thông và đặt tay lên vô-lăng).",
          "C. 30 phút",
          "D. Không cần thời gian chuyển giao."
        ],
        answer: 1,
        explanation: "Nghiên cứu công thái học chỉ ra con người mất từ 3 đến 8 giây để 'tái nhập cuộc nhận thức' (Situation awareness re-acquisition) từ trạng thái lơ đãng sang trạng thái lái xe tập trung."
      },
      {
        id: 4,
        question: "Cảnh báo TOR hiệu quả BẮT BUỘC phải là cảnh báo đa giác quan đồng thời (Multimodal Alert) bao gồm những kênh nào?",
        options: [
          "A. Chỉ hiển thị một dòng chữ nhỏ ở góc màn hình.",
          "B. Kết hợp đồng thời: Thị giác (Đèn LED đổi màu trên vô lăng/HUD nhấp nháy đỏ), Thính giác (Chuông báo động âm lượng tăng dần) và Xúc giác (Rung đệm ghế lái hoặc rung vô lăng cực mạnh).",
          "C. Tự động xịt nước hoa vào mặt tài xế.",
          "D. Chỉ gửi email thông báo sau chuyến đi."
        ],
        answer: 1,
        explanation: "Tài xế có thể đang nhắm mắt hoặc đang xem video ghế phụ, nên chỉ dùng cảnh báo màn hình là vô dụng. Rung ghế và còi báo động đa giác quan đảm bảo đánh thức tài xế ngay lập tức trong tích tắc."
      },
      {
        id: 5,
        question: "Khái niệm 'Minimum Risk Maneuver' (MRM / Hành động dừng xe an toàn tối thiểu) sẽ được kích hoạt khi nào trong quy trình TOR?",
        options: [
          "A. Khi tài xế vừa đặt tay lên vô lăng.",
          "B. Khi thời gian TOR đã hết (ví dụ sau 10 giây) mà tài xế vẫn hoàn toàn bất tỉnh, ngủ gật hoặc không tiếp nhận quyền lái; xe sẽ tự động bật đèn khẩn cấp, giảm tốc an toàn và tấp vào lề đường dừng hẳn.",
          "C. Khi xe phát hiện có xe cảnh sát chạy phía sau.",
          "D. Khi xe đạt tốc độ tối đa."
        ],
        answer: 1,
        explanation: "MRM là phao cứu sinh an toàn bắt buộc của xe tự hành L3: nếu con người không phản hồi sau cảnh báo TOR, xe không được phép buông xuôi đâm vào vật cản mà phải tự động đưa xe về trạng thái an toàn tối thiểu (dừng xe bật hazard)."
      },
      {
        id: 6,
        question: "Hiện tượng suy giảm năng lực nhận thức 'Out-of-the-loop Performance Problem' (Vấn đề người vận hành ngoài vòng lặp) trên xe tự lái mô tả điều gì?",
        options: [
          "A. Chiếc xe bị mất kết nối mạng internet vệ tinh.",
          "B. Do máy tính tự lái quá lâu mà con người không phải làm gì, tài xế mất hoàn toàn cảm nhận về tốc độ, làn đường và bối cảnh xung quanh; khi bị ép nhận lại quyền lái đột ngột họ rất dễ đưa ra quyết định sai lầm.",
          "C. Bánh xe bị mòn lệch về một bên.",
          "D. Hệ thống định vị bản đồ GPS bị sai lệch."
        ],
        answer: 1,
        explanation: "Khi bị tách khỏi vòng lặp điều khiển (Out-of-the-loop), não bộ con người bị thụ động. HMI phải có các chỉ dẫn bối cảnh (Contextual briefing) khi chuyển giao: 'Đang chuyển quyền lái - Phía trước có xe tải đi chậm ở khoảng cách 50m'."
      },
      {
        id: 7,
        question: "Dải đèn LED trạng thái tích hợp trên vành vô-lăng (như Cadillac Super Cruise hoặc Mercedes Drive Pilot) sử dụng mã màu trực quan nào?",
        options: [
          "A. Xanh lục: Tự lái đang hoạt động an toàn; Xanh lam: Tài xế đang can thiệp nhẹ; Đỏ nhấp nháy: Yêu cầu tài xế lập tức giành lại quyền kiểm soát (TOR).",
          "B. Đỏ: Tự lái đang chạy tốt; Xanh: Hệ thống chuẩn bị nổ.",
          "C. Luôn luôn sáng màu tím hoa cà.",
          "D. Đèn LED chỉ nhấp nháy theo bài hát."
        ],
        answer: 0,
        explanation: "Dải LED trên vành vô-lăng nằm ngay trong tầm nhìn ngoại vi của mắt người. Mã màu Xanh lục (Active) và Đỏ nhấp nháy (TOR) giúp tài xế nhận thức trạng thái xe mà không cần liếc mắt đọc chữ."
      },
      {
        id: 8,
        question: "Khái niệm 'Mode Confusion' (Nhầm lẫn chế độ lái) trong HMI xe tự hành nguy hiểm như thế nào?",
        options: [
          "A. Tài xế nhầm lẫn giữa mở nhạc và mở đài radio.",
          "B. Tài xế đinh ninh rằng chiếc xe đang ở chế độ tự lái hoàn toàn (nên buông tay lơ đễnh), trong khi thực tế xe chỉ đang ở chế độ trợ lái thông thường hoặc hệ thống tự lái vừa bị ngắt kết nối.",
          "C. Nhầm lẫn giữa màu sơn ngoại thất của xe.",
          "D. Xe tự động đổi ngôn ngữ sang tiếng nước ngoài."
        ],
        answer: 1,
        explanation: "Mode Confusion là nguyên nhân của nhiều vụ tai nạn chết người trên xe tự lái. HMI phải có chỉ báo trạng thái cực kỳ rõ ràng, không thể nhầm lẫn để tài xế không bao giờ ảo tưởng rằng xe đang tự lái khi nó không hề bật."
      },
      {
        id: 9,
        question: "Trong xe tự hành Cấp độ 4 (SAE Level 4: Tự lái hoàn toàn trong khu vực địa giới xác định - Robotaxi như Waymo), giao diện HMI dành cho hành khách cần tập trung vào điều gì?",
        options: [
          "A. Bắt buộc hành khách phải ngồi im không được cử động.",
          "B. Hiển thị thông tin hành trình minh bạch, nút bấm 'Dừng xe khẩn cấp' (Emergency Pull-over), nút liên hệ nhân viên hỗ trợ từ xa 24/7 và giải thích hành vi xe (ví dụ 'Đang dừng chờ người đi bộ qua đường').",
          "C. Cung cấp vô-lăng ảo để hành khách tranh giành quyền lái với máy tính.",
          "D. Không cần có bất kỳ màn hình nào."
        ],
        answer: 1,
        explanation: "Hành khách đi Robotaxi không có tài xế ngồi trước thường cảm thấy lo lắng. HMI trên màn hình trần/tựa lưng hiển thị chi tiết xe đang 'nghĩ' gì và làm gì giúp người ngồi sau an tâm tuyệt đối."
      },
      {
        id: 10,
        question: "Cơ chế 'Dual-Confirmation' (Xác nhận hai bước) khi chuyển giao quyền lái ngược lại từ Máy tính sang Con người đòi hỏi điều gì?",
        options: [
          "A. Bắt buộc tài xế phải nhập mật khẩu 8 chữ số.",
          "B. Tài xế phải đồng thời nắm chặt vô-lăng và đạp nhẹ bàn đạp phanh hoặc ga (thể hiện ý định kiểm soát vật lý có ý thức), lúc đó hệ thống tự lái mới chính thức nhả quyền điều khiển.",
          "C. Yêu cầu tài xế phải ký tên vào biên bản bàn giao.",
          "D. Tự động tắt máy xe."
        ],
        answer: 1,
        explanation: "Tránh việc va chạm vô tình: nếu chỉ chạm nhẹ một ngón tay mà xe nhả tự lái ngay, xe có thể mất kiểm soát nếu tài xế chưa sẵn sàng. Cầm chắc vô-lăng kèm đệm nhẹ phanh là bằng chứng chắc chắn tài xế đã làm chủ phương tiện."
      },
      {
        id: 11,
        question: "Giao diện HMI bên ngoài xe (eHMI - External Human-Machine Interface) trên xe tự hành có nhiệm vụ giao tiếp với ai?",
        options: [
          "A. Giao tiếp với các vệ tinh ngoài không gian vũ trụ.",
          "B. Giao tiếp với người đi bộ, người đi xe đạp và các phương tiện xung quanh (bằng dải đèn LED mặt ca-lăng, chữ hiển thị kính lái: ví dụ báo hiệu 'Tôi đã thấy bạn, mời bạn qua đường trước').",
          "C. Phát loa bán hàng rong dọc đường.",
          "D. Chỉ dành cho cảnh sát kiểm tra giấy tờ."
        ],
        answer: 1,
        explanation: "Xe tự lái không có tài xế để giao tiếp bằng ánh mắt (Eye contact) hay vẫy tay nhường đường cho người đi bộ. Màn hình eHMI ngoài đầu xe thay thế cái gật đầu của tài xế, báo hiệu an toàn cho người qua đường."
      },
      {
        id: 12,
        question: "Khi xe tự hành Cấp độ 3 từ chối kích hoạt tính năng tự lái, HMI nên phản hồi như thế nào để tài xế không bực bội?",
        options: [
          "A. Phát tiếng chuông báo lỗi khó chịu mà không nói gì thêm.",
          "B. Đưa ra thông điệp từ chối thân thiện kèm nguyên nhân cụ thể (ví dụ: 'Chưa thể bật Drive Pilot: Mặt đường bị tuyết che phủ vạch kẻ' hoặc 'Cần gạt nước đang chạy ở tốc độ tối đa').",
          "C. Tự động khóa xe trong 24 giờ.",
          "D. Tắt máy xe ngay lập tức."
        ],
        answer: 1,
        explanation: "Minh bạch lý do từ chối (Rejection reasoning) giúp người dùng hiểu rằng hệ thống từ chối vì sự an toàn của chính họ chứ không phải do phần mềm bị lỗi ngớ ngẩn."
      },
      {
        id: 13,
        question: "Nghiên cứu về 'Bore-out & Sleep Inertia' (Quán tính giấc ngủ) của tài xế khi đi xe tự hành cảnh báo điều gì cho thiết kế HMI?",
        options: [
          "A. Giấc ngủ trên xe tự hành luôn làm tài xế thông minh hơn.",
          "B. Nếu tài xế ngủ gật trong lúc xe tự lái, khi bị đánh thức bởi cảnh báo TOR họ sẽ rơi vào trạng thái chuếnh choáng mất định hướng (Sleep inertia) trong 10-30 giây đầu tiên, không thể lái xe an toàn.",
          "C. Xe tự hành có khả năng chữa bệnh mất ngủ.",
          "D. Tài xế không bao giờ ngủ gật trên xe."
        ],
        answer: 1,
        explanation: "Chính vì hiện tượng 'Quán tính giấc ngủ', các hệ thống L3 hiện nay vẫn bắt buộc tài xế phải thức (không được ngủ), camera giám sát DMS sẽ nhắc nhở ngay nếu tài xế nhắm mắt quá lâu."
      },
      {
        id: 14,
        question: "Khái niệm 'Operational Design Domain' (ODD) hiển thị trên HMI giúp tài xế nhận biết điều gì?",
        options: [
          "A. Địa chỉ trang web của hãng xe.",
          "B. Giới hạn ranh giới điều kiện mà xe được phép tự lái (ví dụ: Tự lái khả dụng trên cao tốc từ km 10 đến km 80, thời tiết không mưa, vận tốc dưới 110 km/h).",
          "C. Danh sách các bài hát có bản quyền.",
          "D. Tên nhà mạng cung cấp SIM 4G."
        ],
        answer: 1,
        explanation: "ODD định nghĩa 'sân chơi' của hệ thống tự lái. HMI hiển thị thanh lộ trình báo trước: 'Còn 5 km nữa là hết đoạn đường cho phép tự lái', giúp tài xế chủ động đón nhận quyền điều khiển."
      },
      {
        id: 15,
        question: "Trong trường hợp cảm biến LIDAR/Radar của xe tự hành bị bùn đất hoặc băng tuyết che kín, HMI phải phản ứng theo quy chuẩn an toàn nào?",
        options: [
          "A. Tiếp tục chạy bình thường bằng cách đoán mò đường đi.",
          "B. Lập tức hiển thị cảnh báo 'Sensor Blocked' màu vàng/đỏ, chủ động hạ cấp hoặc ngắt tính năng tự hành an toàn và chuyển quyền kiểm soát cho tài xế kèm chỉ dẫn lau sạch cảm biến.",
          "C. Tự động phóng điện để làm tan bùn đất.",
          "D. Đổi phông chữ sang màu xám."
        ],
        answer: 1,
        explanation: "Cảm biến bị mù (Sensor blind) là rủi ro thảm khốc. HMI phải lập tức thông báo lỗi cảm biến và thoái lui an toàn (Graceful degradation) về chế độ lái thủ công truyền thống."
      }
    ]
  }
];

console.log('Automotive tests part 2 prepared.');
