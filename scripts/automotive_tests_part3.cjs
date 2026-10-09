module.exports = [
  {
    id: 16,
    title: "Bài 16: Hệ Thống Giám Sát Người Lái (DMS & Eye Gaze Tracking)",
    badge: "DMS & Eye Tracking",
    category: "auto",
    description: "Camera hồng ngoại giám sát mắt, phát hiện ngủ gật (Drowsiness), xao nhãng nhìn điện thoại, quy định Euro NCAP DMS và bảo mật hình ảnh cá nhân.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Hệ thống DMS (Driver Monitoring System) sử dụng công nghệ quang học nào để theo dõi khuôn mặt tài xế trong bóng tối?",
        options: [
          "A. Đèn flash chiếu sáng chói mắt như máy ảnh.",
          "B. Camera cảm biến ánh sáng hồng ngoại gần (Near-Infrared - NIR) kết hợp đèn LED hồng ngoại bước sóng 850nm hoặc 940nm (vô hình với mắt người) chiếu sáng đều khuôn mặt cả ngày lẫn đêm.",
          "C. Dùng đèn laser công suất cao.",
          "D. Chỉ dùng camera màu thông thường ban ngày."
        ],
        answer: 1,
        explanation: "Ánh sáng hồng ngoại NIR không thể nhìn thấy bằng mắt thường nên không gây chói mắt hay phân tâm tài xế trong đêm, nhưng giúp camera nhìn rõ từng cử động chớp mắt và hướng nhìn qua cả kính râm."
      },
      {
        id: 2,
        question: "Chỉ số 'PERCLOS' (Percentage of Eye Closure) trong thuật toán DMS được tính toán để phát hiện trạng thái sinh lý nào?",
        options: [
          "A. Tỷ lệ % thời gian mắt người lái bị nhắm lại từ 80% trở lên trong một khoảng thời gian xác định (ví dụ 1 phút), là thước đo vàng phát hiện tình trạng buồn ngủ và ngủ gật.",
          "B. Tỷ lệ phần trăm thời gian tài xế mỉm cười.",
          "C. Đo độ giãn của con ngươi khi nhìn gái đẹp.",
          "D. Đếm số lần chớp mắt khi đang ăn uống."
        ],
        answer: 0,
        explanation: "PERCLOS là tiêu chuẩn khoa học được chấp nhận toàn cầu để đo độ buồn ngủ: Nếu trong 1 phút mà thời gian mắt nhắm nghiền chiếm trên 12-15%, tài xế đang trong trạng thái vi giấc ngủ (Micro-sleep) cực kỳ nguy hiểm."
      },
      {
        id: 3,
        question: "Hệ thống DMS phát hiện hành vi 'Sử dụng điện thoại khi lái xe' (Cell Phone Distraction) dựa trên dấu hiệu nhận diện nào?",
        options: [
          "A. Đo sóng vi ba của ăng-ten điện thoại.",
          "B. Phát hiện hướng nhìn của ánh mắt (Eye gaze) và góc cúi đầu (Head pose) hướng xuống lòng dưới quá 2-3 giây liên tục, kết hợp nhận diện hình dáng bàn tay cầm vật thể gần vô lăng.",
          "C. Tự động ngắt sóng điện thoại của toàn bộ xe.",
          "D. Bắt buộc tài xế phải nộp phạt qua tài khoản ngân hàng."
        ],
        answer: 1,
        explanation: "Thuật toán thị giác máy tính theo dõi góc hạ đầu và ánh mắt nhìn xuống đùi (vùng đặt điện thoại quen thuộc). Nếu mắt rời khỏi mặt đường hướng xuống đùi trên 2 giây, DMS lập tức phát chuông cảnh báo xao nhãng."
      },
      {
        id: 4,
        question: "Chuỗi phản hồi cảnh báo buồn ngủ (Drowsiness Alert Level) trên HMI thường gồm những hình thức nào?",
        options: [
          "A. Phun khói vào cabin xe.",
          "B. Cấp 1: Hiển thị biểu tượng tách cà phê 'Take a Break' kèm âm thanh nhắc nhở; Cấp 2: Rung giật dây đai an toàn (Haptic seatbelt pretensioner), hạ nhiệt độ điều hòa và phát chuông báo động dồn dập.",
          "C. Tự động tăng tốc độ xe lên tối đa để tài xế tỉnh ngủ.",
          "D. Tự động phóng ghế lái ra khỏi xe."
        ],
        answer: 1,
        explanation: "Biểu tượng tách cà phê là quy ước kinh điển. Khi phát hiện dấu hiệu buồn ngủ nặng, hệ thống siết nhẹ đai an toàn và thổi luồng gió mát vào mặt để kích thích thần kinh tài xế tấp vào lề nghỉ ngơi."
      },
      {
        id: 5,
        question: "Tại sao camera DMS bắt buộc phải có khả năng nhìn xuyên qua kính râm chống tia UV của tài xế?",
        options: [
          "A. Để chụp ảnh chân dung tài xế gửi lên mạng xã hội.",
          "B. Vì rất nhiều tài xế có thói quen đeo kính mát khi lái xe ban ngày; công nghệ chiếu sáng NIR cho phép sóng hồng ngoại xuyên qua mắt kính râm để theo dõi chính xác vị trí đồng tử và giác mạc bên trong.",
          "C. Để đo độ cận thị của mắt kính.",
          "D. Kính râm bị cấm hoàn toàn khi lái xe."
        ],
        answer: 1,
        explanation: "Hầu hết các tròng kính râm chống tia cực tím (UV) vẫn trong suốt đối với bước sóng hồng ngoại 940nm. Nhờ đó, camera DMS vẫn thấy rõ đồng tử chuyển động đằng sau tròng kính đen."
      },
      {
        id: 6,
        question: "Quy định Euro NCAP và Luật An toàn Chung Châu Âu (GSR - General Safety Regulation) quy định thế nào về hệ thống DMS từ năm 2024-2026?",
        options: [
          "A. Là trang bị tùy chọn có trả phí cho dòng xe siêu sang.",
          "B. Bắt buộc trang bị tiêu chuẩn (Mandatory fitment) trên toàn bộ các xe ô tô mới bán ra, xe phải có khả năng nhận diện xao nhãng và buồn ngủ theo thời gian thực để đạt chứng nhận an toàn.",
          "C. Bị cấm hoàn toàn do lo ngại vi phạm bản quyền.",
          "D. Chỉ áp dụng cho các xe đua thể thao."
        ],
        answer: 1,
        explanation: "Châu Âu đã biến DMS từ tính năng xa xỉ thành bắt buộc trên mọi dòng xe mới bán ra nhằm xóa sổ thói quen vừa lái xe vừa lướt mạng xã hội trên điện thoại."
      },
      {
        id: 7,
        question: "Khái niệm 'Gaze-based Interaction' (Tương tác bằng ánh nhìn) trong buồng lái thông minh hoạt động kết hợp với DMS như thế nào?",
        options: [
          "A. Khiến tài xế bị mỏi mắt sau 5 phút.",
          "B. Tài xế chỉ cần liếc mắt vào gương chiếu hậu bên ngoài rồi gạt ngón tay trên vô-lăng để chỉnh gương, hoặc nhìn vào màn hình phụ để đánh thức ứng dụng mà không cần chạm tay vào màn hình.",
          "C. Bắt buộc tài xế phải nhắm mắt một bên khi lái xe.",
          "D. Dùng mắt để điều khiển chân phanh."
        ],
        answer: 1,
        explanation: "Gaze + Input: Ánh mắt chọn mục tiêu, nút bấm trên vô lăng xác nhận thao tác. Ví dụ: nhìn gương bên trái thì nút chỉnh tự hiểu là chỉnh gương trái, giảm tải số thao tác bấm nút trung gian."
      },
      {
        id: 8,
        question: "Vấn đề bảo mật dữ liệu hình ảnh cá nhân (Privacy) của camera DMS được giải quyết như thế nào để tuân thủ GDPR và Nghị định 13?",
        options: [
          "A. Tự động tải toàn bộ video quay khuôn mặt tài xế lên dịch vụ đám mây công cộng.",
          "B. Xử lý cục bộ tại rìa (Edge Computing on-chip): Hình ảnh chỉ được xử lý tạm thời trong bộ nhớ RAM của chip xử lý để xuất ra tọa độ vectơ mắt, không bao giờ ghi hình, không lưu ảnh tĩnh hay truyền phát video ra bên ngoài xe.",
          "C. Bắt buộc tài xế phải ký giấy từ bỏ quyền riêng tư trước khi mua xe.",
          "D. Che kín ống kính camera bằng băng dính đen."
        ],
        answer: 1,
        explanation: "Edge processing & Zero-storage: Camera DMS đạt chuẩn chỉ tính toán các điểm mốc toán học (facial landmarks) trong vài mili-giây rồi hủy ngay dữ liệu hình ảnh thô, cam kết không ghi hình đời tư của người lái."
      },
      {
        id: 9,
        question: "Hiện tượng 'Nystagmus' (Rung giật nhãn cầu) được phát hiện bởi DMS có thể cảnh báo tình trạng nguy hiểm nào của tài xế?",
        options: [
          "A. Tài xế đang suy nghĩ về toán học.",
          "B. Dấu hiệu của sự nhiễm độc cồn/ma túy (Drunk driving) hoặc rối loạn tiền đình thần kinh nghiêm trọng.",
          "C. Tài xế đang nghe nhạc rock cổ điển.",
          "D. Đôi mắt đang tập thể dục."
        ],
        answer: 1,
        explanation: "Rung giật nhãn cầu không tự chủ là biểu hiện kinh điển khi nồng độ cồn trong máu cao hoặc dùng chất kích thích. DMS thế hệ mới có thể phát hiện dấu hiệu này để khóa khởi động xe."
      },
      {
        id: 10,
        question: "Hệ thống 'Cabin Occupant Monitoring' (OMS / Giám sát toàn bộ khoang cabin) mở rộng từ DMS có tính năng nhân văn quan trọng nào?",
        options: [
          "A. Đo chiều cao của mọi người để bán vé vào cổng.",
          "B. Phát hiện trẻ em hoặc thú cưng bị bỏ quên trên xe dưới trời nắng nóng (Child Left Behind / CPD - Child Presence Detection) nhờ cảm biến radar nhịp thở siêu nhạy, từ đó kích hoạt điều hòa và còi báo động cứu sống đứa trẻ.",
          "C. Tự động lấy tiền trong ví hành khách.",
          "D. Ghi âm các cuộc trò chuyện riêng tư của gia đình."
        ],
        answer: 1,
        explanation: "Mỗi năm có hàng chục trẻ nhỏ tử vong do bị bỏ quên trong xe đóng kín dưới trời nắng. Hệ thống CPD sử dụng sóng radar 60GHz phát hiện chuyển động lồng ngực thở của em bé sơ sinh để kích hoạt còi xe và hạ kính cửa sổ cứu nạn."
      },
      {
        id: 11,
        question: "Vị trí đặt cụm cảm biến camera DMS trong cabin xe hơi thường là ở đâu để có góc nhìn tối ưu nhất?",
        options: [
          "A. Dưới ghế ngồi của hành khách.",
          "B. Trên cột lái (Steering Column) ngay sau vô-lăng, trên đỉnh cụm đồng hồ Cluster hoặc tích hợp ẩn tinh tế trong gương chiếu hậu trung tâm nhìn thẳng về mặt tài xế.",
          "C. Trong ống xả của xe.",
          "D. Ở tay nắm cửa bên ngoài xe."
        ],
        answer: 1,
        explanation: "Cột lái hoặc đỉnh bảng đồng hồ cho góc nhìn trực diện không bị góc nghiêng, giúp đo đạc góc mở mí mắt và khóe miệng chính xác nhất kể cả khi tài xế đánh lái."
      },
      {
        id: 12,
        question: "Hiện tượng camera DMS bị che khuất tạm thời (DMS Occlusion) thường xảy ra do nguyên nhân công thái học nào?",
        options: [
          "A. Do tài xế mở cửa xe.",
          "B. Do vành vô-lăng hoặc bàn tay tài xế che khuất tầm nhìn của camera khi vào cua gắt, hoặc do tài xế chỉnh vô-lăng ở vị trí quá cao/thấp.",
          "C. Do xe chạy qua đường hầm tối.",
          "D. Do tiếng còi xe bên ngoài."
        ],
        answer: 1,
        explanation: "Khi đánh lái hoặc chỉnh góc vô lăng, nan vô lăng có thể che mất tầm nhìn của camera. HMI thông minh sẽ có bộ lọc tạm hoãn vài giây chứ không lập tức báo lỗi 'Camera bị che' gây phiền toái."
      },
      {
        id: 13,
        question: "Hệ thống DMS phân biệt giữa 'Nhìn gương chiếu hậu hợp lệ' và 'Xao nhãng nhìn sang bên đường' bằng tiêu chí nào?",
        options: [
          "A. Chỉ dựa vào màu sắc của cảnh vật bên ngoài.",
          "B. Bản đồ vùng nhìn (Gaze Zone Mapping): Gương chiếu hậu nằm trong vùng quan sát lái xe an toàn với thời gian dừng mắt hợp lệ (0.5 - 1.5s); nếu mắt nhìn chằm chằm ra ngoài kính phụ quá 3 giây không lý do, hệ thống mới tính là xao nhãng.",
          "C. Bắt buộc tài xế chỉ được nhìn thẳng 100% thời gian.",
          "D. Không thể phân biệt được."
        ],
        answer: 1,
        explanation: "Thuật toán HMI định nghĩa các vùng không gian an toàn (Safe gaze zones: kính lái, gương trái, gương phải, bảng đồng hồ). Liếc gương là hành vi lái xe đúng chuẩn, chỉ khi nhìn ngoài các vùng này quá lâu mới bị kích hoạt cảnh báo."
      },
      {
        id: 14,
        question: "Tính năng 'Cá nhân hóa tự động theo khuôn mặt' (Driver Profile Facial Recognition) kết hợp cùng DMS mang lại tiện ích gì khi tài xế bước lên xe?",
        options: [
          "A. Chụp ảnh thẻ căn cước công dân.",
          "B. Tự động nhận diện danh tính người lái chỉ sau 1 giây, tự động điều chỉnh ghế ngồi, gương chiếu hậu, nhiệt độ điều hòa ưa thích và đồng bộ danh bạ/tài khoản Spotify của người đó mà không cần chọn thủ công.",
          "C. Tự động trừ tiền phạt nguội trong tài khoản.",
          "D. Khóa cửa không cho người khác vào xe."
        ],
        answer: 1,
        explanation: "Tài xế ngồi vào xe, camera nhận diện mặt là chiếc xe lập tức biến hóa không gian đúng theo ý thích của cá nhân đó, mang lại cảm giác chiếc xe thông minh hiểu rõ chủ nhân."
      },
      {
        id: 15,
        question: "Cách xử lý giao diện HMI khi người dùng muốn hiệu chỉnh (Calibration) độ nhạy của hệ thống cảnh báo ngủ gật DMS:",
        options: [
          "A. Không cho phép điều chỉnh bất kỳ thông số nào.",
          "B. Cung cấp các mức độ nhạy trong menu cài đặt: 'Sớm' (Early), 'Bình thường' (Standard) và 'Muộn' (Late) để người dùng tự điều chỉnh theo thể trạng cơ địa của mình mà vẫn tuân thủ giới hạn an toàn tối thiểu.",
          "C. Chỉ cho phép tắt bằng cách tháo cầu chì xe.",
          "D. Bắt buộc tài xế phải nộp tiền bản quyền mỗi khi đổi độ nhạy."
        ],
        answer: 1,
        explanation: "Người có đôi mắt híp tự nhiên hoặc hay nheo mắt dễ bị báo động giả nếu để độ nhạy quá cao. Tùy chọn mức độ nhạy giúp cá nhân hóa thuật toán phù hợp với từng dáng mắt mà không gây báo động rác."
      }
    ]
  },
  {
    id: 17,
    title: "Bài 17: An Toàn Chức Năng Phần Mềm HMI Ô Tô (ISO 26262 & SOTIF)",
    badge: "Functional Safety",
    category: "auto",
    description: "Tiêu chuẩn ISO 26262 ASIL (A/B/C/D), SOTIF (ISO 21448), tách biệt phần cứng bằng Hypervisor, và cơ chế bảo vệ giao diện khi màn hình gặp sự cố.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Tiêu chuẩn An toàn chức năng ISO 26262 phân cấp mức độ nguy cơ ASIL (Automotive Safety Integrity Level) từ thấp đến cao theo thứ tự nào?",
        options: [
          "A. ASIL 1 → ASIL 2 → ASIL 3 → ASIL 4",
          "B. QM (Quality Management - Thấp nhất) → ASIL A → ASIL B → ASIL C → ASIL D (Cao nhất)",
          "C. ASIL D → ASIL C → ASIL B → ASIL A",
          "D. ISO Level 0 → ISO Level 5"
        ],
        answer: 1,
        explanation: "Hệ thống ASIL đi từ QM (mức chất lượng thông thường không rủi ro sinh mạng, như nghe nhạc) lên tới ASIL D (mức an toàn cao nhất, có nguy cơ gây tử vong nếu hỏng hóc, như hệ thống phanh và túi khí)."
      },
      {
        id: 2,
        question: "Màn hình hiển thị cụm đồng hồ lái (Instrument Cluster) thường yêu cầu các thành phần phần mềm HMI hiển thị đèn báo nguy hiểm và tốc độ đạt chuẩn an toàn mức nào?",
        options: [
          "A. Chỉ cần mức QM là đủ.",
          "B. Tối thiểu ASIL B (hoặc ASIL C/D cho các mạch giám sát lỗi hiển thị phần cứng).",
          "C. Không cần tuân thủ bất kỳ tiêu chuẩn nào.",
          "D. Tiêu chuẩn áp dụng cho trò chơi điện tử gia đình."
        ],
        answer: 1,
        explanation: "Đèn cảnh báo lỗi phanh hoặc chỉ số tốc độ xe thuộc cấp độ ASIL B: Nếu màn hình bị đơ mà kim tốc độ vẫn chỉ 0km/h trong khi xe đang chạy 100km/h, tai nạn thảm khốc sẽ xảy ra."
      },
      {
        id: 3,
        question: "Công nghệ 'Type-1 Embedded Hypervisor' (như QNX Hypervisor hoặc Green Hills INTEGRITY) đóng vai trò gì trong kiến trúc buồng lái số hiện đại?",
        options: [
          "A. Giúp tăng tốc độ kết nối Bluetooth của điện thoại.",
          "B. Cho phép chạy đồng thời cả hệ điều hành an toàn cao (RTOS chuẩn ASIL B cho cụm đồng hồ) và hệ điều hành mở (Android Automotive mức QM cho giải trí) trên cùng một con chip SoC duy nhất mà không sợ Android bị treo làm sụp đổ bảng đồng hồ.",
          "C. Thay thế hoàn toàn bộ vi xử lý đồ họa GPU.",
          "D. Dùng để đào tiền ảo trên xe hơi."
        ],
        answer: 1,
        explanation: "Hypervisor tạo ra các bức tường lửa phần cứng (Hardware isolation). Dù ứng dụng xem phim Android có bị crash đơ hay nhiễm virus, cụm đồng hồ tốc độ chạy trên phân vùng RTOS bên cạnh vẫn hoạt động trơn tru 100%."
      },
      {
        id: 4,
        question: "Cơ chế 'Tell-Tale Hardware Freeze Detection' (Phát hiện màn hình bị treo kim/đèn báo) trên cụm đồng hồ ô tô hoạt động bằng phương pháp nào?",
        options: [
          "A. Nhờ tài xế đập tay vào màn hình để kiểm tra.",
          "B. Một chip phần cứng an toàn độc lập (Safety MCU) liên tục so sánh mã kiểm tra CRC của vùng bộ nhớ đệm khung hình (Framebuffer) hiển thị các biểu tượng an toàn; nếu khung hình bị đóng băng không thay đổi, nó sẽ kích hoạt đèn LED cơ học dự phòng.",
          "C. Tắt nguồn điện toàn bộ xe.",
          "D. Đổi phông chữ hiển thị sang màu đen."
        ],
        answer: 1,
        explanation: "Safety Controller giám sát luồng pixel của GPU. Nếu phát hiện GPU bị đứng hình (Freeze) khiến đèn báo túi khí bị mất hoặc kim tốc độ bị đơ, nó lập tức kích hoạt đèn LED cảnh báo vật lý độc lập."
      },
      {
        id: 5,
        question: "Tiêu chuẩn an toàn SOTIF (Safety of the Intended Functionality - ISO 21448) giải quyết vấn đề rủi ro nào của HMI ô tô?",
        options: [
          "A. Sự cố do linh kiện phần cứng bị đứt dây cáp hoặc chập điện.",
          "B. Rủi ro mất an toàn do 'Hạn chế về mặt chức năng và nhận thức' ngay cả khi hệ thống KHÔNG HỀ có lỗi phần cứng hay lỗi phần mềm (ví dụ: cảm biến camera bị mù do tuyết hoặc người dùng hiểu sai giao diện gây ra thao tác nhầm).",
          "C. Trục trặc do đổ nhầm loại dầu máy.",
          "D. Lỗi do sơn xe bị bong tróc."
        ],
        answer: 1,
        explanation: "Khác với ISO 26262 giải quyết lỗi hỏng hóc kỹ thuật (Faults), SOTIF giải quyết các tình huống hệ thống hoạt động hoàn toàn đúng code nhưng vẫn gây nguy hiểm do giới hạn môi trường hoặc thiết kế HMI gây hiểu lầm cho con người."
      },
      {
        id: 6,
        question: "Thời gian khởi động an toàn (Safe Boot Time) của cụm đồng hồ tốc độ và camera lùi kể từ lúc bật khóa xe được quy định:",
        options: [
          "A. Sau 2 đến 3 phút chờ máy tính Windows tải xong.",
          "B. Cụm đồng hồ và hình ảnh Camera lùi (theo quy định FMVSS 111 của Mỹ) phải hiển thị đầy đủ trong vòng không quá 2.0 giây kể từ khi người lái vào số lùi hoặc bật xe.",
          "C. Nửa tiếng đồng hồ.",
          "D. Không có giới hạn thời gian khởi động."
        ],
        answer: 1,
        explanation: "FMVSS 111 bắt buộc màn hình lùi phải sáng rõ trong dưới 2 giây. Nếu hệ điều hành khởi động chậm 15-20 giây, tài xế đã lùi xe ra khỏi chuồng xong xuôi, làm mất hoàn toàn tác dụng bảo vệ trẻ nhỏ phía sau."
      },
      {
        id: 7,
        question: "Khái niệm 'Watchdog Timer' (Mạch định thời giám sát) trong phần mềm HMI ô tô có nhiệm vụ gì?",
        options: [
          "A. Đo thời lượng pin của đồng hồ đeo tay tài xế.",
          "B. Một bộ đếm thời gian phần cứng liên tục chờ tín hiệu 'Tôi vẫn sống' (Heartbeat/Kick) từ phần mềm HMI; nếu phần mềm bị đơ vòng lặp và không gửi tín hiệu kịp thời, Watchdog sẽ tự động cưỡng chế khởi động lại hệ thống trong vài mili-giây.",
          "C. Đếm ngược số ngày đến hạn đăng kiểm xe.",
          "D. Giám sát tiếng chó sủa quanh xe."
        ],
        answer: 1,
        explanation: "Watchdog là người gác cổng an toàn tối cao: Nếu luồng hiển thị HMI bị treo (Deadlock), mạch Watchdog sẽ reset lại chip đồ họa ngay lập tức để khôi phục giao diện, ngăn chặn màn hình bị tê liệt vĩnh viễn."
      },
      {
        id: 8,
        question: "Yêu cầu an toàn đối với kính bảo vệ màn hình cảm ứng trong cabin ô tô (Cover Glass Impact Resistance) theo quy chuẩn an toàn va chạm là gì?",
        options: [
          "A. Phải dùng kính mỏng dễ vỡ để làm giảm trọng lượng xe.",
          "B. Bắt buộc phải là kính cường lực được dán màng an toàn (Laminated / Shatterproof) để khi túi khí bung đập vào mặt màn hình hoặc đầu người va chạm vào, kính không được vỡ thành các mảnh sắc nhọn gây đứt mạch máu.",
          "C. Phải làm bằng mica trong suốt giá rẻ.",
          "D. Màn hình phải tự động thu gọn xuống gầm sàn khi va chạm."
        ],
        answer: 1,
        explanation: "Kính ô tô phải đạt bài kiểm tra va đập đầu người (Headform impact test FMVSS 201). Màng ép an toàn giữ các mảnh vỡ dính liền với nhau, loại bỏ nguy cơ mảnh kính văng vào mắt hành khách khi xảy ra tai nạn."
      },
      {
        id: 9,
        question: "Cơ chế 'Fail-Operational' khác biệt gì so với 'Fail-Safe' trong kiến trúc điều khiển HMI xe tự hành?",
        options: [
          "A. Fail-Operational tự động gọi xe cứu hộ ngay lập tức.",
          "B. 'Fail-Safe' là khi gặp lỗi hệ thống sẽ ngắt hoàn toàn về trạng thái an toàn thụ động (tắt máy/dừng xe); còn 'Fail-Operational' đòi hỏi có phần cứng/phần mềm dự phòng kép (Redundancy) để hệ thống vẫn tiếp tục duy trì khả năng điều khiển lái xe an toàn ngay cả khi nhánh chính bị hỏng.",
          "C. Hai khái niệm này hoàn toàn đồng nghĩa.",
          "D. Fail-Operational chỉ áp dụng cho máy bay phản lực."
        ],
        answer: 1,
        explanation: "Xe tự hành đang chạy 120km/h trên cao tốc không thể 'Fail-Safe' bằng cách tắt ngấm máy tính giữa làn. Nó bắt buộc phải là 'Fail-Operational': Kênh dự phòng thứ 2 lập tức tiếp quản để tiếp tục lái xe tấp vào lề đường an toàn."
      },
      {
        id: 10,
        question: "Nguyên tắc 'Single Point of Failure' (Điểm hỏng hóc đơn lẻ) trong thiết kế hệ thống HMI an toàn đòi hỏi:",
        options: [
          "A. Mọi tính năng chỉ nên dựa vào đúng một con chip duy nhất để dễ sửa.",
          "B. Tuyệt đối không được phép tồn tại bất kỳ linh kiện hay đường dây cáp đơn lẻ nào mà nếu nó gặp sự cố sẽ làm tê liệt toàn bộ khả năng hiển thị các thông tin an toàn tối quan trọng của xe.",
          "C. Chỉ thuê một lập trình viên duy nhất viết toàn bộ mã nguồn.",
          "D. Cho phép hệ thống ngừng hoạt động khi đứt 1 cầu chì."
        ],
        answer: 1,
        explanation: "Hệ thống an toàn ASIL D yêu cầu thiết kế chống điểm hỏng đơn (No Single Point of Failure) thông qua nguồn điện kép, đường truyền mạng CAN/Ethernet dự phòng và hai vi điều khiển chạy chéo giám sát nhau."
      },
      {
        id: 11,
        question: "Hội chứng 'Flicker / Strobe Effect' của màn hình LED nội thất ở tần số điều chế độ rộng xung (PWM) thấp có thể gây ra nguy cơ sức khỏe nào cho tài xế?",
        options: [
          "A. Khiến tài xế bị rụng tóc.",
          "B. Gây mỏi mắt dữ dội, đau đầu kinh niên và có thể kích hoạt các cơn co giật động kinh quang học (Photosensitive epileptic seizures) khi lái xe ban đêm.",
          "C. Làm cho xe bị rung giật gầm máy.",
          "D. Làm tăng nhiệt độ trong khoang hành khách."
        ],
        answer: 1,
        explanation: "PWM tần số thấp (< 200Hz) làm mắt nhận thấy màn hình bị nhấp nháy ngầm, gây căng thẳng tế bào thị giác và kích thích não bộ dẫn tới co giật. Màn hình ô tô chất lượng cao bắt buộc dùng PWM tần số siêu cao (> 20.000Hz) hoặc làm mờ DC Dimming."
      },
      {
        id: 12,
        question: "Thuật ngữ 'Safety Integrity Level Allocation' (Phân bổ mức an toàn) cho giao diện người dùng xe hơi được thực hiện ở giai đoạn nào của dự án?",
        options: [
          "A. Sau khi chiếc xe đã được bán ra thị trường 1 năm.",
          "B. Ngay từ giai đoạn định nghĩa Kiến trúc hệ thống và Phân tích mối nguy hiểm (HARA - Hazard Analysis and Risk Assessment) trước khi viết bất kỳ dòng code nào.",
          "C. Do các đại lý bán lẻ tự quyết định.",
          "D. Chỉ thực hiện khi có khách hàng khiếu nại."
        ],
        answer: 1,
        explanation: "HARA xác định mức độ nghiêm trọng (Severity), tần suất phơi nhiễm (Exposure) và khả năng kiểm soát (Controllability) để gán nhãn ASIL cho từng chức năng ngay từ bản vẽ sơ đồ kiến trúc ban đầu."
      },
      {
        id: 13,
        question: "Khi đèn báo lỗi túi khí an toàn (Airbag Warning Lamp) trên bảng đồng hồ HMI bật sáng liên tục màu đỏ, điều đó đồng nghĩa với việc:",
        options: [
          "A. Túi khí đang chuẩn bị tự động nổ trong 5 phút tới.",
          "B. Hệ thống túi khí hoặc cảm biến va chạm đang gặp trục trặc kỹ thuật, túi khí có thể sẽ KHÔNG BUNG ra khi xảy ra tai nạn thực tế, tài xế cần đưa xe đi kiểm tra kỹ thuật ngay lập tức.",
          "C. Trong xe có quá nhiều bụi bẩn.",
          "D. Ghế xe đang ở chế độ sưởi ấm."
        ],
        answer: 1,
        explanation: "Đèn báo lỗi túi khí sáng đỏ là cảnh báo nguy cơ mất mạng: Trong trường hợp va chạm, đai an toàn và túi khí có thể bị vô hiệu hóa hoàn toàn do lỗi mạch điều khiển."
      },
      {
        id: 14,
        question: "Yêu cầu về 'Phông chữ an toàn' (Safety Fonts / Bitmap Fallback) trong phần mềm HMI ô tô nhằm mục đích gì?",
        options: [
          "A. Đảm bảo chữ viết luôn có hoa văn trang trí nghệ thuật.",
          "B. Đảm bảo các con số chỉ vận tốc và biểu tượng cảnh báo luôn hiển thị được bằng bộ font tĩnh được lưu cứng trong ROM (Bitmap/Rasterized) ngay cả khi engine kết xuất đồ họa vector (TrueType/OpenType) bị lỗi treo bộ nhớ.",
          "C. Giảm dung lượng thẻ nhớ của máy nghe nhạc.",
          "D. Để dịch văn bản sang 100 thứ tiếng tự động."
        ],
        answer: 1,
        explanation: "Font render engine phức tạp có thể bị tràn bộ nhớ (Out-of-memory). Font số bitmap tĩnh được nạp thẳng vào bộ đệm đảm bảo con số tốc độ không bao giờ bị mất hoặc hiển thị thành ký tự ô vuông vô nghĩa."
      },
      {
        id: 15,
        question: "Quy trình kiểm thử 'Fault Injection Testing' (Thử nghiệm tiêm lỗi) đối với phần mềm HMI ô tô được thực hiện như thế nào?",
        options: [
          "A. Cho virus máy tính phá hoại phần mềm mà không sao lưu.",
          "B. Chủ động cố tình ngắt các gói tin dữ liệu CAN bus, làm nghẽn bộ nhớ GPU hoặc giả lập cảm biến tốc độ bị mất tín hiệu để kiểm chứng xem màn hình HMI có phát hiện lỗi và hiển thị cảnh báo chính xác theo đúng kịch bản an toàn hay không.",
          "C. Kiểm tra xem màn hình có chống được nước sôi hay không.",
          "D. Cho các kỹ sư bấm phím ngẫu nhiên trên bàn phím."
        ],
        answer: 1,
        explanation: "Tiêm lỗi chủ động là bài kiểm tra bắt buộc của ISO 26262 để chứng minh: Khi có điều tồi tệ xảy ra trong mạng xe, màn hình HMI không được im lặng hay treo đơ mà phải lập tức phát hiện và thông báo chuẩn xác cho người lái."
      }
    ]
  },
  {
    id: 18,
    title: "Bài 18: An Ninh Mạng & Quyền Riêng Tư Xe Hơi (Cybersecurity & Privacy)",
    badge: "Cybersecurity HMI",
    category: "auto",
    description: "Tiêu chuẩn an ninh mạng UN ECE R155, ISO/SAE 21434, giao diện cập nhật phần mềm qua mạng (OTA Updates) và bảo vệ dữ liệu hành trình theo Nghị định 13/GDPR.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Quy chuẩn quốc tế bắt buộc về An ninh mạng phương tiện giao thông UN ECE R155 (và chuẩn ISO/SAE 21434) yêu cầu gì đối với các mẫu xe ô tô kết nối mạng xuất xưởng mới?",
        options: [
          "A. Cấm tuyệt đối xe hơi kết nối mạng 4G/5G.",
          "B. Bắt buộc nhà sản xuất phải có Hệ thống quản lý an ninh mạng (CSMS - Cybersecurity Management System) bao phủ toàn bộ vòng đời xe từ thiết kế, phát triển phần mềm, cập nhật OTA đến xử lý lỗ hổng bảo mật.",
          "C. Chỉ cho phép các chuyên gia máy tính được lái xe.",
          "D. Miễn trừ trách nhiệm cho hãng xe nếu xe bị tin tặc tấn công."
        ],
        answer: 1,
        explanation: "UN ECE R155 là luật bắt buộc tại Châu Âu, Nhật Bản và nhiều quốc gia: Nếu không chứng minh được quy trình an ninh mạng khép kín đạt chuẩn, chiếc xe sẽ bị từ chối cấp phép lưu hành trên thị trường."
      },
      {
        id: 2,
        question: "HMI của tính năng Cập nhật phần mềm qua mạng (OTA - Over-The-Air Software Updates) cần thông báo cho người dùng những thông tin cốt lõi nào TRƯỚC KHI bắt đầu cài đặt?",
        options: [
          "A. Số dòng code mà lập trình viên đã viết.",
          "B. Bản tóm tắt các tính năng mới/bản vá bảo mật (Release notes), thời gian dự kiến cài đặt (ví dụ: 'Mất khoảng 25 phút') và cảnh báo quan trọng: 'Chiếc xe sẽ không thể lái được trong suốt quá trình nâng cấp'.",
          "C. Danh sách các bài hát bị xóa khỏi bộ nhớ.",
          "D. Mã số thẻ tín dụng của chủ xe."
        ],
        answer: 1,
        explanation: "Nếu tài xế bấm cập nhật rồi 5 phút sau cần lái xe đi cấp cứu thì sẽ bị mắc kẹt vì xe đang nạp firmware. HMI phải nêu rõ thời gian dừng xe và yêu cầu người dùng xác nhận đỗ xe an toàn trước khi bấm 'Bắt đầu'."
      },
      {
        id: 3,
        question: "Khi chiếc xe đang trong quá trình nạp phần mềm OTA Firmware (Flashing ECUs), màn hình HMI cần hiển thị trạng thái gì?",
        options: [
          "A. Tắt ngấm đen thui màn hình không hiển thị gì.",
          "B. Màn hình hiển thị thanh tiến trình % rõ ràng, thông báo trạng thái hiện tại và nhắc nhở không được rút nguồn điện hay cố gắng khởi động xe, kèm đồng hồ đếm ngược thời gian hoàn thành.",
          "C. Cho phép người dùng chơi game đua xe.",
          "D. Tự động mở cửa kính sổ trời."
        ],
        answer: 1,
        explanation: "Minh bạch tiến trình OTA giúp chủ xe không bị hoảng loạn tưởng xe bị sập nguồn hay hỏng máy, đồng thời ngăn chặn các hành vi can thiệp thô bạo làm lỗi bộ nhớ ECU (Brick xe)."
      },
      {
        id: 4,
        question: "Cơ chế 'A/B Partitioning / Dual-Bank Memory' trong quy trình cập nhật phần mềm HMI đảm bảo điều gì khi gặp sự cố mất điện giữa chừng?",
        options: [
          "A. Giúp xe chạy nhanh gấp đôi.",
          "B. Hệ thống nạp bản cập nhật mới vào phân vùng B trong khi phân vùng A vẫn đang chạy bình thường; nếu quá trình cài đặt phân vùng B bị lỗi hoặc mất điện, xe sẽ tự động quay trở lại (Rollback) khởi động an toàn từ phân vùng A.",
          "C. Xóa sạch toàn bộ dữ liệu người dùng để giải phóng bộ nhớ.",
          "D. Tự động đưa xe về xưởng dịch vụ."
        ],
        answer: 1,
        explanation: "Kiến trúc Dual-bank A/B ngăn chặn triệt để tình trạng 'biến xe thành cục gạch' (Bricking). Luôn luôn có một bản firmware hoạt động hoàn hảo sẵn sàng dự phòng để xe không bao giờ bị chết máy."
      },
      {
        id: 5,
        question: "Khi người dùng bán lại chiếc xe điện của mình cho chủ mới, tính năng 'Factory Reset / Data Wipe' trên HMI xe cần thực hiện nhiệm vụ gì?",
        options: [
          "A. Làm trầy xước màn hình hiển thị.",
          "B. Xóa vĩnh viễn và an toàn toàn bộ dữ liệu cá nhân (Lịch sử định vị GPS, danh bạ điện thoại, mã số mở cổng gara nhà riêng, tài khoản Netflix/Spotify, video camera hành trình và chìa khóa số kỹ thuật số).",
          "C. Tự động rút hết sạch điện trong bình pin.",
          "D. Đổi mã số khung xe VIN."
        ],
        answer: 1,
        explanation: "Xe thông minh lưu trữ lượng thông tin đời tư khổng lồ. Quy định bảo vệ dữ liệu (GDPR/NĐ 13) bắt buộc xe phải có nút khôi phục cài đặt gốc xóa sạch sẽ mọi dấu vết cá nhân trước khi sang tên đổi chủ."
      },
      {
        id: 6,
        question: "Giao diện 'Quản lý quyền riêng tư & Đồng ý xử lý dữ liệu' (Privacy & Consent Settings) trên màn hình xe hơi theo chuẩn Nghị định 13/2023/NĐ-CP bắt buộc phải:",
        options: [
          "A. Tự động tích chọn đồng ý ngầm định tất cả các điều khoản mà không cần người dùng thao tác.",
          "B. Cung cấp các nút bật/tắt (Toggle) rõ ràng cho từng mục đích cụ thể: Chia sẻ định vị cho điều hướng, Thu thập dữ liệu camera huấn luyện AI, Gửi dữ liệu chẩn đoán từ xa; người dùng có quyền thu hồi sự đồng ý bất kỳ lúc nào.",
          "C. Bắt buộc người dùng phải đồng ý thì xe mới cho nổ máy.",
          "D. Viết điều khoản bảo mật bằng tiếng nước ngoài phức tạp."
        ],
        answer: 1,
        explanation: "Nghị định 13 và GDPR nghiêm cấm ô tích chọn sẵn (Pre-ticked box). Sự đồng ý phải rõ ràng, tự nguyện và có thể rút lại dễ dàng trong menu cài đặt quyền riêng tư bất kỳ lúc nào."
      },
      {
        id: 7,
        question: "Cảnh báo an ninh mạng HMI khi phát hiện có thiết bị lạ cắm vào cổng OBD-II (On-Board Diagnostics) dưới chân tài xế khi xe đang di chuyển:",
        options: [
          "A. Không cần cảnh báo vì cổng OBD-II không có nguy hiểm.",
          "B. Hiển thị thông báo an ninh: 'Phát hiện thiết bị kết nối ngoài tại cổng chẩn đoán OBD-II. Hành vi này có thể đe dọa an toàn điều khiển xe', cảnh báo tài xế kiểm tra nguồn gốc thiết bị.",
          "C. Tự động kích nổ túi khí ghế lái.",
          "D. Đổi toàn bộ màn hình sang màu xanh lá cây."
        ],
        answer: 1,
        explanation: "Cổng OBD-II nối trực tiếp vào mạng nội bộ CAN bus của xe. Cắm các thiết bị trôi nổi (dongle theo dõi, thiết bị hack) có thể bị tin tặc lợi dụng để gửi mã độc can thiệp vào hệ thống phanh hoặc ga."
      },
      {
        id: 8,
        question: "Chức năng 'Sentry Mode / Security Camera' (Chế độ giám sát chống trộm khi đỗ xe) hiển thị thông báo gì trên màn hình trung tâm để răn đe kẻ gian?",
        options: [
          "A. Phát video hài kịch hoạt hình.",
          "B. Hiển thị hình ảnh một con mắt đỏ kiểu 'HAL 9000' rực sáng cùng dòng chữ cảnh báo lớn: 'Hệ thống camera an ninh đang ghi hình xung quanh xe', báo hiệu mọi hành vi phá hoại đều bị lưu lại bằng chứng.",
          "C. Tắt toàn bộ màn hình để giả vờ xe bị hỏng.",
          "D. Phát âm thanh tiếng chim hót nhẹ nhàng."
        ],
        answer: 1,
        explanation: "Hiển thị thông điệp răn đe thị giác (Visual deterrence) ngay khi kẻ gian tiếp cận gần xe khiến chúng từ bỏ ý định cạy gương hay vẽ bậy lên xe vì biết mặt mình đang bị ghi hình độ nét cao."
      },
      {
        id: 9,
        question: "Xác thực hai yếu tố (Two-Factor Authentication / 2FA) hoặc mã PIN khởi động lái xe (PIN to Drive) trên màn hình HMI giúp chống lại chiêu thức trộm xe nào?",
        options: [
          "A. Chống trộm bằng cách cẩu xe lên xe tải.",
          "B. Chống lại cuộc tấn công khuếch đại sóng chìa khóa thông minh (Relay Attack) của tin tặc: Dù kẻ trộm có bắt được sóng chìa khóa để mở cửa xe, chúng vẫn không thể nổ máy xe nếu không nhập đúng mã PIN trên màn hình cảm ứng.",
          "C. Chống lại việc xe bị thủng lốp.",
          "D. Chống lại mưa đá làm vỡ kính."
        ],
        answer: 1,
        explanation: "Relay Attack dùng thiết bị thu phát kích sóng chìa khóa thông minh từ phòng ngủ chủ xe ra cửa xe để mở khóa trong 10 giây. Tính năng PIN to Drive là chốt chặn cuối cùng ngăn chặn hoàn toàn việc xe bị lái đi mất."
      },
      {
        id: 10,
        question: "Khi kết nối điện thoại thông minh với hệ thống xe (qua Apple CarPlay / Android Auto / Bluetooth), HMI cần hiển thị hộp thoại xin phép quyền truy cập (Permission Dialog) đối với:",
        options: [
          "A. Mật khẩu tài khoản ngân hàng của người dùng.",
          "B. Đồng bộ danh bạ cuộc gọi, tin nhắn SMS và lịch sử cuộc gọi gần đây, kèm tùy chọn 'Chỉ sạc pin / Không chia sẻ dữ liệu' khi cắm cáp USB lạ.",
          "C. Toàn bộ hình ảnh trong album riêng tư.",
          "D. Dấu vân tay của người dùng."
        ],
        answer: 1,
        explanation: "Cắm nhờ dây sạc trên xe người lạ hoặc xe thuê tự lái có thể vô tình làm lộ sạch danh bạ và tin nhắn riêng tư nếu hệ thống tự ý đồng bộ. HMI phải luôn hỏi rõ quyền truy cập trước khi nạp dữ liệu."
      },
      {
        id: 11,
        question: "Tại sao việc cô lập mạng (Network Segmentation) giữa hệ thống giải trí IVI (có kết nối Wi-Fi/4G) và mạng điều khiển khung gầm xe (CAN bus động cơ/phanh) lại là yêu cầu an ninh mạng sống còn?",
        options: [
          "A. Để giảm số lượng dây điện trong xe.",
          "B. Ngăn chặn tin tặc sau khi xâm nhập vào ứng dụng nghe nhạc hoặc trình duyệt web trên màn hình giải trí có thể gửi tiếp các lệnh điều khiển giả mạo sang hệ thống đánh lái và phanh của xe.",
          "C. Giúp âm thanh nghe nhạc to hơn.",
          "D. Để xe có thể kết nối được với nhiều điện thoại cùng lúc."
        ],
        answer: 1,
        explanation: "Vụ hack xe Jeep Cherokee khét tiếng năm 2015 chứng minh tin tặc có thể từ đài radio can thiệp sang phanh xe. Kiến trúc an ninh hiện đại sử dụng Gateway bảo mật (Hardware Security Module) ngăn chặn triệt để dòng dữ liệu trái phép này."
      },
      {
        id: 12,
        question: "Cơ chế 'Secure Boot' (Khởi động an toàn) trong chuỗi phần mềm HMI ô tô đảm bảo điều gì mỗi khi xe khởi động?",
        options: [
          "A. Kiểm tra xem người lái đã thắt dây an toàn chưa.",
          "B. Kiểm tra chữ ký mật mã kỹ thuật số (Cryptographic Signature) của từng tầng phần mềm (Bootloader, Kernel, Ứng dụng HMI); nếu phát hiện phần mềm bị chỉnh sửa trái phép hoặc bị cài mã độc, chip bảo mật sẽ từ chối khởi động.",
          "C. Đo tốc độ gió ngoài trời.",
          "D. Kiểm tra áp suất lốp xe."
        ],
        answer: 1,
        explanation: "Secure Boot là chuỗi tin cậy bắt đầu từ gốc phần cứng (Root of Trust). Không một đoạn mã tùy tiện nào chưa được nhà sản xuất ký số điện tử hợp pháp có thể chạy được trên cụm điều khiển xe."
      },
      {
        id: 13,
        question: "Thông báo cảnh báo 'Certificate Expired' (Chứng chỉ bảo mật hết hạn) trên HMI của xe kết nối có thể ảnh hưởng đến những tính năng nào?",
        options: [
          "A. Làm tắt máy xe ngay trên cao tốc.",
          "B. Các dịch vụ trực tuyến kết nối đám mây (Bản đồ giao thông thời gian thực, điều khiển xe qua app điện thoại, cập nhật OTA) tạm thời bị gián đoạn cho đến khi xe được cập nhật chứng chỉ mới.",
          "C. Làm hỏng lốp xe ô tô.",
          "D. Đổi màu ghế nội thất."
        ],
        answer: 1,
        explanation: "Chứng chỉ SSL/TLS hết hạn ngăn chặn xe kết nối với máy chủ đám mây do rủi ro tấn công mạo danh (Man-in-the-middle). Các chức năng lái xe cơ bản vẫn hoạt động nhưng dịch vụ kết nối mạng sẽ tạm dừng."
      },
      {
        id: 14,
        question: "Chính sách quản lý 'Bug Bounty' (Chương trình thưởng tìm lỗ hổng bảo mật) của các hãng xe hiện đại khuyến khích điều gì?",
        options: [
          "A. Khuyến khích người dùng tự phá hủy màn hình xe.",
          "B. Mời các chuyên gia an ninh mạng độc lập (Hacker mũ trắng) tìm kiếm và báo cáo các lỗ hổng phần mềm trên hệ thống HMI/Connected Car một cách có trách nhiệm để nhận tiền thưởng, giúp hãng kịp thời vá lỗi trước khi bị kẻ gian khai thác.",
          "C. Tặng xe miễn phí cho ai lái xe giỏi nhất.",
          "D. Phạt tiền những ai phát hiện ra lỗi phần mềm."
        ],
        answer: 1,
        explanation: "An ninh mạng là cuộc chiến không ngừng nghỉ. Các hãng xe hàng đầu (Tesla, GM, VinFast) đều có cổng tiếp nhận báo cáo lỗ hổng bảo mật công khai để liên tục nâng cấp độ an toàn cho người dùng."
      },
      {
        id: 15,
        question: "Quyền 'Rút lại dữ liệu / Xóa tài khoản' (Right to Erasure / Account Deletion) của chủ xe theo tiêu chuẩn pháp lý phải thực hiện được:",
        options: [
          "A. Chỉ có thể thực hiện khi đến trực tiếp trụ sở chính của hãng ở nước ngoài.",
          "B. Trực tiếp ngay trên menu cài đặt quyền riêng tư của HMI màn hình xe hoặc qua ứng dụng di động chính thức với quy trình minh bạch, hoàn tất trong vòng thời gian quy định.",
          "C. Bắt buộc phải có chữ ký của thẩm phán tòa án.",
          "D. Dữ liệu một khi đã nạp vào xe thì vĩnh viễn không thể xóa được."
        ],
        answer: 1,
        explanation: "Tuân thủ quyền được lãng quên (Right to be Forgotten) theo GDPR và Nghị định 13: Chủ xe phải có quyền yêu cầu xóa sạch hồ sơ cá nhân và lịch sử hành trình khỏi hệ thống máy chủ chỉ bằng vài thao tác trực tuyến."
      }
    ]
  },
  {
    id: 19,
    title: "Bài 19: Hệ Điều Hành & Khung Phát Triển HMI Ô Tô (AAOS, Kanzi, 3D Engines)",
    badge: "OS & Frameworks",
    category: "auto",
    description: "So sánh Android Automotive OS (AAOS) vs Android Auto, Apple CarPlay thế hệ mới, các công cụ chuyên dụng (Kanzi, Qt Automotive, Unreal/Unity 3D) và Flutter Embedded.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Sự khác biệt bản chất sâu sắc nhất giữa 'Android Auto' (chiếu màn hình điện thoại) và 'Android Automotive OS' (AAOS) là gì?",
        options: [
          "A. Cả hai là cùng một phần mềm duy nhất, chỉ khác tên gọi.",
          "B. Android Auto là ứng dụng chạy trên điện thoại chiếu hình ảnh lên xe qua cáp/Wi-Fi; còn Android Automotive OS là Hệ điều hành độc lập hoàn chỉnh được cài đặt trực tiếp trên phần cứng của chiếc xe, điều khiển cả hệ thống điều hòa, cảm biến và trạng thái pin.",
          "C. Android Auto chỉ dùng được trên xe tải.",
          "D. Android Automotive OS không hỗ trợ màn hình cảm ứng."
        ],
        answer: 1,
        explanation: "AAOS là Full In-Vehicle OS: Chiếc xe tự nó là một thiết bị Android độc lập, không cần cắm điện thoại vẫn có Google Maps, Spotify và có quyền truy cập trực tiếp vào hệ thống xe (Vehicle Property Service) để chỉnh nhiệt độ, mở cốp."
      },
      {
        id: 2,
        question: "Khung kiến trúc 'GAS' (Google Automotive Services) đi kèm trên Android Automotive OS cung cấp những dịch vụ bản quyền cốt lõi nào?",
        options: [
          "A. Dịch vụ bán xăng dầu giảm giá.",
          "B. Bộ ứng dụng chính hãng gồm: Google Maps tối ưu cho xe điện, Cửa hàng ứng dụng Google Play Store dành riêng cho ô tô và Trợ lý giọng nói Google Assistant tích hợp sâu vào điều khiển xe.",
          "C. Dịch vụ sửa chữa động cơ cơ khí tự động.",
          "D. Trò chơi điện tử đua xe bắn súng."
        ],
        answer: 1,
        explanation: "Các hãng xe như Polestar, Volvo, Renault sử dụng AAOS kèm gói GAS để người dùng có trải nghiệm bản đồ Google Maps chỉ đường siêu mượt mà không cần hãng phải tự xây dựng lại từ đầu."
      },
      {
        id: 3,
        question: "Apple CarPlay Thế hệ mới (Next-Generation CarPlay công bố năm 2022-2024) có tham vọng mở rộng giao diện sang những màn hình nào của xe?",
        options: [
          "A. Chỉ hiển thị trên một góc nhỏ của màn hình trung tâm.",
          "B. Chiếm quyền kiểm soát hiển thị toàn bộ hệ thống màn hình trong buồng lái: từ màn hình trung tâm, cụm đồng hồ tốc độ Cluster phía sau vô-lăng cho tới các màn hình phụ ghế phụ và điều khiển điều hòa nhiệt độ.",
          "C. Chỉ hiển thị trên kính chiếu hậu chống chói.",
          "D. Chiếu lên trần xe phía sau."
        ],
        answer: 1,
        explanation: "Apple Next-Gen CarPlay biến toàn bộ cụm đồng hồ xe hơi thành phong cách đồ họa của Apple (hiển thị tốc độ, vòng tua, mức xăng/pin của xe trực tiếp theo ngôn ngữ thiết kế iOS)."
      },
      {
        id: 4,
        question: "Phần mềm chuyên dụng 'Kanzi UI' (của Rightware) được các hãng xe hàng đầu (Audi, BMW) tin dùng trong phát triển Digital Cluster nhờ ưu thế kỹ thuật nào?",
        options: [
          "A. Là phần mềm miễn phí mã nguồn mở.",
          "B. Tối ưu hóa cực cao cho đồ họa thời gian thực trên chip ô tô có cấu hình giới hạn, khả năng tách biệt luồng UI an toàn đạt chuẩn ISO 26262 ASIL và quy trình chuyển giao liền mạch từ bản vẽ thiết kế sang mã C++ nhúng.",
          "C. Cho phép người dùng chỉnh sửa code trực tiếp trên xe.",
          "D. Chỉ dùng để vẽ tranh 2D đơn giản."
        ],
        answer: 1,
        explanation: "Kanzi là công cụ tiêu chuẩn ngành công nghiệp ô tô chuyên dụng: đồ họa 3D lộng lẫy nhưng ngốn rất ít RAM và CPU, khởi động dưới 1 giây và đạt chứng chỉ an toàn chức năng cho cụm đồng hồ lái."
      },
      {
        id: 5,
        question: "Khung phát triển giao diện 'Qt for Automotive' (Qt Quick / QML) sở hữu đặc tính nổi bật nào giúp rút ngắn thời gian phát triển HMI?",
        options: [
          "A. Bắt buộc lập trình viên phải viết mã bằng ngôn ngữ hợp ngữ Assembly.",
          "B. Ngôn ngữ khai báo QML trực quan, dễ kết nối với backend C++ hiệu năng cao, hỗ trợ đa nền tảng (chạy được trên Linux, QNX, VxWorks, Android) và hệ sinh thái thư viện phong phú.",
          "C. Không hỗ trợ kết nối mạng can bus.",
          "D. Chỉ chạy được trên máy tính để bàn Windows."
        ],
        answer: 1,
        explanation: "Qt là 'xương sống' của hàng triệu màn hình ô tô trên thế giới. Ngôn ngữ QML giúp các kỹ sư UX/UI tạo ra giao diện chuyển động mượt mà, kết hợp với backend C++ xử lý dữ liệu cảm biến siêu tốc."
      },
      {
        id: 6,
        question: "Việc đưa các Công cụ Đồ họa Game 3D bom tấn như 'Unreal Engine' và 'Unity' vào thiết kế HMI ô tô (như trên Hummer EV, Lotus Eletre) nhằm mục đích gì?",
        options: [
          "A. Biến chiếc xe thành máy chơi game PlayStation di động.",
          "B. Tạo ra hình ảnh mô phỏng xe 3D chân thực theo thời gian thực (Photorealistic Real-time 3D Rendering), hiệu ứng ánh sáng đổ bóng động tuyệt đẹp khi chuyển chế độ lái và đồ họa môi trường ADAS sống động.",
          "C. Làm cho xe tăng tốc nhanh hơn 100 km/h.",
          "D. Giảm giá thành sản xuất tấm nền màn hình."
        ],
        answer: 1,
        explanation: "Game engine đem lại trải nghiệm thị giác ngoạn mục: Mô hình xe 3D xoay lật mượt mà 60fps, bề mặt sơn phản chiếu ánh sáng môi trường thực tế tạo nên cảm giác công nghệ tương lai xa xỉ."
      },
      {
        id: 7,
        question: "Thách thức kỹ thuật lớn nhất khi triển khai Unreal Engine hoặc Unity 3D trên hệ thống nhúng của ô tô là:",
        options: [
          "A. Kính xe quá dày không hiển thị được đồ họa.",
          "B. Mức tiêu thụ tài nguyên phần cứng (CPU, GPU, RAM) cực lớn, thời gian khởi động (Boot time) có thể bị chậm và tỏa nhiều nhiệt năng trong điều kiện môi trường cabin khắc nghiệt.",
          "C. Không thể đổi màu sơn của mô hình 3D.",
          "D. Luật an toàn giao thông cấm sử dụng đồ họa 3D."
        ],
        answer: 1,
        explanation: "Game engine rất nặng nề. Kỹ sư HMI phải tối ưu hóa mô hình 3D (giảm số lượng đa giác Polygon, nén vân bề mặt Texture) để đảm bảo hệ thống không bị nóng máy, tụt fps hoặc khởi động quá 2 giây."
      },
      {
        id: 8,
        question: "Khung phát triển 'Flutter Embedded for Automotive' (do Google và Toyota hợp tác) mang lại lợi thế chiến lược nào?",
        options: [
          "A. Bắt buộc xe phải dùng động cơ lai Hybrid.",
          "B. Cho phép lập trình một lần duy nhất bằng ngôn ngữ Dart, hiệu năng kết xuất đồ họa mượt mà 60fps nhờ engine Impeller/Skia, cơ chế Hot-reload giúp thử nghiệm giao diện siêu nhanh và chi phí phát triển tối ưu.",
          "C. Chỉ chạy được trên điện thoại thông minh.",
          "D. Không thể kết nối với mạng nội bộ xe."
        ],
        answer: 1,
        explanation: "Toyota chọn Flutter vì trải nghiệm phát triển hiện đại: Nhà thiết kế và lập trình viên có thể lặp vòng thử nghiệm tính năng nhanh chóng, đồ họa mượt mà và tận dụng kho thư viện mã nguồn mở khổng lồ."
      },
      {
        id: 9,
        question: "Giao thức 'VHAL' (Vehicle Hardware Abstraction Layer) trong Android Automotive OS giữ vai trò kết nối nào?",
        options: [
          "A. Kết nối các lốp xe với mặt đường.",
          "B. Là lớp trừu tượng hóa phần cứng, đóng vai trò làm cầu nối trung gian chuyển đổi các tín hiệu mạng xe phức tạp (CAN bus, LIN, MOST, Ethernet) thành các thuộc tính chuẩn hóa (Vehicle Properties) mà ứng dụng Android có thể đọc/ghi dễ dàng.",
          "C. Kết nối hệ thống âm thanh với radio vệ tinh.",
          "D. Điều khiển hệ thống phun xăng điện tử."
        ],
        answer: 1,
        explanation: "VHAL che giấu sự phức tạp của phần cứng bên dưới. Lập trình viên giao diện chỉ cần gọi hàm đơn giản `getProperty(GEAR_SELECTION)` để biết xe đang ở số nào mà không cần biết mạng CAN bus gửi byte nào."
      },
      {
        id: 10,
        question: "Khái niệm 'Design System cho Ô tô' (Automotive Design System) có điểm khắt khe nào vượt trội so với Design System web thông thường?",
        options: [
          "A. Chỉ được phép dùng 2 màu sắc duy nhất.",
          "B. Quy định nghiêm ngặt về kích thước tối thiểu của điểm chạm (Hit target ≥ 60px), độ tương phản ánh sáng mặt trời cao, giới hạn số bước thao tác, tối ưu hóa kích thước chữ cho khoảng cách đọc 70cm và thư viện biểu tượng chuẩn ISO 2575.",
          "C. Không cho phép sử dụng hình ảnh động.",
          "D. Mọi nút bấm phải có hình vuông."
        ],
        answer: 1,
        explanation: "Design System ô tô phải tích hợp các ràng buộc an toàn giao thông vào từng component: từ quy định chống xao nhãng, bộ icon chuẩn hóa quốc tế đến khả năng thích ứng với cảm biến ánh sáng tự động."
      },
      {
        id: 11,
        question: "Bộ tiêu chuẩn biểu tượng 'ISO 2575' (Road vehicles - Symbols for controls, indicators and tell-tales) quy định điều gì cho HMI ô tô?",
        options: [
          "A. Quy định mẫu tem dán bảo hành của bình ắc quy.",
          "B. Chuẩn hóa hình dáng đồ họa và màu sắc của toàn bộ các biểu tượng đèn báo an toàn (như bình dầu, ắc quy, phanh ABS, đèn pha, áp suất lốp) để người lái nhận biết đồng nhất trên mọi chiếc xe trên toàn thế giới.",
          "C. Quy định mẫu logo của các thương hiệu xe.",
          "D. Quy định biển số xe của các quốc gia."
        ],
        answer: 1,
        explanation: "ISO 2575 đảm bảo tính nhất quán toàn cầu (External consistency): Dù bạn lái chiếc xe Toyota, Mercedes hay VinFast, biểu tượng đèn phanh tay hay đèn báo dầu luôn có hình dáng quen thuộc không thể nhầm lẫn."
      },
      {
        id: 12,
        question: "Hệ điều hành thời gian thực 'BlackBerry QNX Neutrino RTOS' chiếm lĩnh thị phần khổng lồ trên hơn 235 triệu ô tô toàn cầu nhờ vào:",
        options: [
          "A. Khả năng chơi game 3D trực tuyến.",
          "B. Độ tin cậy gần như tuyệt đối, kiến trúc vi nhân (Microkernel) siêu an toàn, đạt chứng nhận an toàn chức năng cao nhất ISO 26262 ASIL D và độ trễ thời gian thực xác định (Deterministic real-time latency).",
          "C. Miễn phí hoàn toàn không mất tiền mua bản quyền.",
          "D. Cho phép người dùng tự do cài đặt ứng dụng APK ngoài."
        ],
        answer: 1,
        explanation: "Kiến trúc Microkernel của QNX chạy từng tiến trình trong không gian bộ nhớ cách ly hoàn toàn. Nếu trình phát nhạc bị lỗi, nó tự hồi phục mà không làm ảnh hưởng đến luồng điều khiển lái và cụm đồng hồ an toàn."
      },
      {
        id: 13,
        question: "Cơ chế 'Hot Reloading' trong quá trình thiết kế HMI mang lại lợi ích gì cho các nhà thiết kế UX/UI ô tô?",
        options: [
          "A. Làm nóng cabin xe khi trời lạnh.",
          "B. Cho phép nhà thiết kế chỉnh sửa màu sắc, bố cục, hiệu ứng hoạt họa trên máy tính và nhìn thấy ngay kết quả thay đổi trên màn hình buồng lái thực tế trong tích tắc mà không cần mất 15 phút biên dịch lại toàn bộ phần mềm.",
          "C. Tự động sạc pin cho xe ô tô.",
          "D. Giúp xe khởi động nhanh hơn khi nổ máy."
        ],
        answer: 1,
        explanation: "Hot reload rút ngắn chu kỳ lặp thiết kế (Design iteration) từ hàng giờ xuống vài giây. Nhà thiết kế có thể ngồi trong xe tinh chỉnh kích thước nút bấm và độ tương phản ngay dưới ánh nắng thực tế một cách trực quan."
      },
      {
        id: 14,
        question: "Công nghệ 'Virtualization / GPU Sharing' trên chip SoC ô tô cho phép điều gì về mặt kết xuất đồ họa?",
        options: [
          "A. Cho phép màn hình hiển thị không cần cắm điện.",
          "B. Cho phép một bộ xử lý đồ họa GPU vật lý duy nhất chia sẻ tài nguyên kết xuất đồ họa đồng thời cho cả màn hình Cluster, màn hình IVI và màn hình HUD với quyền ưu tiên phân bổ khung hình nghiêm ngặt cho cụm an toàn.",
          "C. Tự động nâng cấp độ phân giải từ HD lên 8K.",
          "D. Biến màn hình ô tô thành máy chiếu phim ngoài trời."
        ],
        answer: 1,
        explanation: "GPU Virtualization giúp các nhà sản xuất xe tiết kiệm hàng trăm USD chi phí phần cứng trên mỗi chiếc xe bằng cách dùng chung 1 chip SoC mạnh mẽ thay vì phải gắn 3 con chip rời rạc cho 3 màn hình."
      },
      {
        id: 15,
        question: "Khái niệm 'OTA App Store' dành riêng cho ô tô (như Mercedes-Benz MB.OS Store hay Android Automotive Play Store) phải tuân thủ quy trình kiểm duyệt (App Review) khắt khe nào?",
        options: [
          "A. Ứng dụng phải có nhiều quảng cáo pop-up để kiếm tiền.",
          "B. Mọi ứng dụng tải lên xe bắt buộc phải vượt qua các bài kiểm tra nghiêm ngặt về xao nhãng tài xế (Driver Distraction Guidelines), không được phép phát video khi xe đang chạy và phải tự động khóa tính năng nhập văn bản tự do.",
          "C. Ứng dụng chỉ được phép viết bằng tiếng Anh.",
          "D. Không cần kiểm duyệt, ai cũng có thể tự do xuất bản."
        ],
        answer: 1,
        explanation: "App Store trên xe hơi không giống App Store trên smartphone: Một ứng dụng vi phạm quy tắc an toàn (ví dụ hiện thông báo nhảy tưng tưng khi xe đang chạy 100km/h) có thể bị cấm cửa vĩnh viễn vì đe dọa sinh mạng con người."
      }
    ]
  },
  {
    id: 20,
    title: "Bài 20: Công Nghệ AR-HUD Nâng Cao (Augmented Reality HUD)",
    badge: "AR-HUD Advanced",
    category: "auto",
    description: "Trường nhìn FOV, Hộp thị kính Eyebox, Khoảng cách chiếu ảo (VID 7-15m), Phủ thông tin lên mặt đường thực tế và chống rung lắc quang học.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Sự khác biệt vượt trội căn bản nhất giữa 'AR-HUD' (Thực tế tăng cường) và 'HUD truyền thống' nằm ở yếu tố nào?",
        options: [
          "A. AR-HUD có giá thành rẻ hơn nhiều.",
          "B. HUD truyền thống chỉ chiếu thông số 2D cố định lơ lửng trên kính lái (cách mắt 2-2.5m); còn AR-HUD chiếu các mũi tên dẫn đường và cảnh báo 3D neo trực tiếp (Anchored) chính xác lên mặt đường và vật thể thực tế ở khoảng cách ảo xa từ 7 đến 15 mét.",
          "C. AR-HUD chỉ hiển thị được màu đen trắng.",
          "D. HUD truyền thống không cần kính chắn gió."
        ],
        answer: 1,
        explanation: "HUD truyền thống là màn hình số phẳng treo trước mắt. AR-HUD hòa trộn thế giới số với thế giới thực: Mũi tên dẫn đường được 'dán' thẳng lên mặt đường tại đúng ngã rẽ thực tế, giúp tài xế không bao giờ rẽ nhầm làn."
      },
      {
        id: 2,
        question: "Khái niệm 'VID' (Virtual Image Distance / Khoảng cách ảnh ảo) trong AR-HUD tối ưu nên đạt cự ly bao nhiêu mét và tại sao?",
        options: [
          "A. 10 centimet sát trước mắt tài xế.",
          "B. Tối thiểu từ 7.5 đến 15 mét (hoặc vô cực) để trùng khớp với khoảng cách nhìn tự nhiên của mắt tài xế khi quan sát xe phía trước, triệt tiêu hoàn toàn thời gian điều tiết tiêu cự của thể mi mắt.",
          "C. 500 mét xa ngoài tầm mắt.",
          "D. Không có khái niệm khoảng cách ảnh ảo."
        ],
        answer: 1,
        explanation: "Ở khoảng cách 10 mét, mắt tài xế nhìn xe trước và nhìn đồ họa AR-HUD ở cùng một mặt phẳng tiêu cự. Não bộ tiếp nhận thông tin tức thời mà mắt không phải co giãn đổi tiêu cự từ xa về gần."
      },
      {
        id: 3,
        question: "Thông số 'FOV' (Field of View / Trường nhìn) của AR-HUD được đo bằng đơn vị góc nào và kích thước tiêu chuẩn cho AR-HUD lớn là khoảng bao nhiêu?",
        options: [
          "A. Đo bằng Kilomet (km).",
          "B. Đo bằng Độ góc nhìn (Degrees: Ngang x Dọc), một AR-HUD xuất sắc thường đạt từ 10° x 4° hoặc 12° x 5° trở lên để bao quát trọn vẹn nhiều làn đường phía trước.",
          "C. Đo bằng Decibel (dB).",
          "D. Đo bằng Hertz (Hz)."
        ],
        answer: 1,
        explanation: "FOV càng rộng thì diện tích mặt đường được phủ đồ họa ảo càng lớn. Một trường nhìn 10°x5° cho phép chiếu mũi tên dẫn đường sang cả làn đường rẽ bên cạnh và bao quát người đi bộ bên lề đường."
      },
      {
        id: 4,
        question: "Khái niệm 'Eyebox' (Hộp thị kính) trong công nghệ HUD ô tô đại diện cho điều gì?",
        options: [
          "A. Chiếc hộp đựng kính mát của tài xế.",
          "B. Vùng không gian 3 chiều (đo bằng milimet, ví dụ 130mm x 80mm x 100mm) tại vị trí đầu của tài xế mà trong phạm vi đó mắt tài xế có thể di chuyển lên/xuống/trái/phải mà vẫn nhìn thấy trọn vẹn toàn bộ hình ảnh HUD mà không bị cắt góc hay mờ nhòe.",
          "C. Ống kính máy ảnh chụp mắt.",
          "D. Hộp chứa cầu chì của hệ thống đèn pha."
        ],
        answer: 1,
        explanation: "Nếu Eyebox quá nhỏ, tài xế chỉ cần nhích đầu 2cm là hình ảnh biến mất. Eyebox rộng đảm bảo tài xế cao hay thấp, ngồi thẳng hay nghiêng người nhẹ vẫn nhìn thấy hình ảnh rõ ràng."
      },
      {
        id: 5,
        question: "Bộ phận quang học 'PGU' (Picture Generation Unit / Khối tạo ảnh) trong AR-HUD ô tô hiện đại thường sử dụng công nghệ hiển thị nào?",
        options: [
          "A. Máy chiếu phim cuộn nhựa cổ điển.",
          "B. Công nghệ vi gương DLP (Digital Light Processing) của Texas Instruments, Micro-LED, TFT-LCD siêu sáng chuyên dụng hoặc công nghệ quét chùm tia Laser (LBS).",
          "C. Đèn dầu hỏa chiếu bóng.",
          "D. Màn hình plasma thế hệ cũ."
        ],
        answer: 1,
        explanation: "PGU là trái tim của HUD. Công nghệ DLP với hàng triệu vi gương siêu nhỏ hoặc Micro-LED mang lại độ sáng cực đại (trên 15.000 nits) và độ tương phản tuyệt vời để hình ảnh hiển thị sắc nét dưới trời nắng gắt."
      },
      {
        id: 6,
        question: "Hiện tượng 'Parallax Error' (Lỗi thị sai / Lệch vị trí ảnh) trong AR-HUD xảy ra do nguyên nhân nào?",
        options: [
          "A. Do tài xế mở đài radio quá to.",
          "B. Do vị trí đầu của tài xế di chuyển lệch khỏi tâm Eyebox hoặc do độ cong không đều của kính chắn gió khiến mũi tên ảo bị trôi lệch khỏi vị trí ngã rẽ thực tế trên mặt đường.",
          "C. Do xe chạy vào bóng râm.",
          "D. Do lốp xe bị thiếu hơi."
        ],
        answer: 1,
        explanation: "Thị sai làm mất đi tính chính xác của AR: Mũi tên ảo chỉ vào ngõ rẽ A nhưng tài xế lại nhìn thấy nó lệch sang ngõ rẽ B. Thuật toán theo dõi vị trí mắt (DMS eye-tracking) được áp dụng để bù trừ thị sai theo thời gian thực."
      },
      {
        id: 7,
        question: "Cơ chế 'Bù trừ rung lắc khung gầm' (Chassis Pitch/Roll Compensation) trên AR-HUD hoạt động thế nào khi xe đi qua gờ giảm tốc?",
        options: [
          "A. Tắt ngấm HUD ngay lập tức khi xe rung lắc.",
          "B. Cảm biến con quay hồi chuyển (IMU) đo góc nghiêng và độ nảy của xe theo chu kỳ vài mili-giây, máy tính lập tức dịch chuyển đồ họa ảo ngược chiều với độ rung của xe để mũi tên dẫn đường giữ nguyên vị trí cố định vững chắc trên mặt đường.",
          "C. Làm cho kính lái rung theo xe.",
          "D. Xe tự động phanh dừng lại."
        ],
        answer: 1,
        explanation: "Nếu không có thuật toán bù rung lắc (Ego-motion compensation), mỗi khi xe đi qua ổ gà, mũi tên ảo sẽ nhảy tưng tưng trên kính lái khiến tài xế bị hoa mắt chóng mặt và buồn nôn."
      },
      {
        id: 8,
        question: "Hiệu ứng 'Thảm ảo dẫn đường' (Virtual Navigation Carpet / Green Ribbon) trên AR-HUD trực quan hóa lộ trình như thế nào?",
        options: [
          "A. Trải một tấm thảm vải nhung ra ngoài mặt đường.",
          "B. Vẽ một dải ruy-băng ánh sáng ảo uốn lượn phủ khít theo đúng làn đường và khúc cua phía trước, chỉ dẫn chính xác tài xế cần bám theo làn nào để chuyển hướng an toàn.",
          "C. Chiếu phim quảng cáo du lịch lên kính lái.",
          "D. Chỉ hiển thị một dấu chấm đỏ duy nhất."
        ],
        answer: 1,
        explanation: "Thay vì chỉ là một mũi tên khô khốc, dải thảm ảo trải dài trên làn đường tạo cảm giác như có một dải lụa dẫn đường uốn lượn trước đầu xe, loại bỏ hoàn toàn việc phân vân chọn làn khi vào bùng binh phức tạp."
      },
      {
        id: 9,
        question: "Tính năng 'Cảnh báo chướng ngại vật nổi bật' (Obstacle Highlighting) của AR-HUD tăng cường an toàn ban đêm bằng cách nào?",
        options: [
          "A. Bắn tia laser đốt cháy chướng ngại vật.",
          "B. Phủ một vòng hào quang phát sáng màu đỏ hoặc vàng neo trực tiếp dưới chân người đi bộ hoặc con vật đang băng qua đường tối mù, giúp tài xế phát hiện mối nguy trước 2-3 giây.",
          "C. Tắt toàn bộ đèn pha xe.",
          "D. Phát âm thanh còi xe liên tục."
        ],
        answer: 1,
        explanation: "Người đi bộ mặc đồ đen trong đêm tối rất khó nhìn thấy. AR-HUD khoanh vùng phát sáng dưới chân họ, lập tức kích hoạt sự chú ý của tài xế từ khoảng cách hàng trăm mét."
      },
      {
        id: 10,
        question: "Thách thức về 'Kính chắn gió dạng nêm' (Wedge-shaped Windshield PVB Interlayer) trong sản xuất HUD bắt nguồn từ hiện tượng quang học nào?",
        options: [
          "A. Kính chắn gió quá nặng làm xe tốn xăng.",
          "B. Hiện tượng 'Bóng ma' (Ghosting/Double Image) do ánh sáng phản chiếu đồng thời ở cả bề mặt trong và bề mặt ngoài của tấm kính; lớp phim dán ở giữa phải vát chéo dạng hình nêm để gộp hai tia phản xạ thành một hình ảnh duy nhất.",
          "C. Kính chắn gió làm cản sóng điện thoại di động.",
          "D. Kính chắn gió bị đổi màu khi ra nắng."
        ],
        answer: 1,
        explanation: "Kính lái gồm 2 lớp kính ép lại. Nếu dùng kính phẳng thông thường, tài xế sẽ nhìn thấy 2 hình ảnh mờ lồng vào nhau (Ghosting). Lớp keo PVB vát góc hình nêm (Wedge angle) là bí quyết quang học triệt tiêu bóng ma."
      },
      {
        id: 11,
        question: "Độ sáng tối đa yêu cầu đối với hệ thống AR-HUD (Peak Luminance) để đọc rõ khi lái xe trên mặt đường tuyết trắng dưới nắng gắt buổi trưa là:",
        options: [
          "A. 100 nits",
          "B. Tối thiểu 10.000 đến 15.000 nits phát ra từ PGU để hình ảnh sau khi phản xạ qua kính chắn gió vẫn đạt độ tương phản tối thiểu 1.5:1 đến 3:1 trên nền trắng chói lóa.",
          "C. 500 nits",
          "D. 1.000 nits"
        ],
        answer: 1,
        explanation: "Mặt đường phủ tuyết dưới ánh nắng có độ chói lên tới hàng chục nghìn nits và kính lái chỉ phản xạ khoảng 15-20% ánh sáng HUD. PGU bắt buộc phải có công suất phát sáng siêu khủng mới chống chọi được."
      },
      {
        id: 12,
        question: "Khái niệm 'Dual-Plane AR-HUD' (AR-HUD hai mặt phẳng tiêu cự) trên các dòng xe sang (như Mercedes S-Class) phân chia thông tin thế nào?",
        options: [
          "A. Một mặt phẳng chiếu lên trần xe, một mặt phẳng chiếu xuống sàn xe.",
          "B. Mặt phẳng gần (Cự ly ảo ~3m): Hiển thị thông số tĩnh (Tốc độ xe, biển báo, đèn ADAS); Mặt phẳng xa (Cự ly ảo ~10-15m): Hiển thị đồ họa thực tế tăng cường động (Mũi tên dẫn đường neo trên mặt đường, cảnh báo bám đuôi xe).",
          "C. Một mặt phẳng dành cho người lái, một mặt phẳng cho người đi bộ đối diện xem.",
          "D. Không có sự khác biệt giữa hai mặt phẳng."
        ],
        answer: 1,
        explanation: "Dual-plane giải quyết trọn vẹn bài toán HMI: Số tốc độ luôn sắc nét ở cự ly gần cố định, trong khi mũi tên dẫn đường và cảnh báo va chạm bay lơ lửng ở cự ly xa hòa nhập vào dòng xe cộ."
      },
      {
        id: 13,
        question: "Hiện tượng 'Quá tải thị giác và Che khuất tầm nhìn' (Visual Clutter & Occlusion) trong thiết kế đồ họa AR-HUD bị các chuyên gia công thái học cảnh báo điều gì?",
        options: [
          "A. Càng nhiều đồ họa 3D hiển thị trước kính lái thì xe chạy càng an toàn.",
          "B. Nghiêm cấm việc vẽ đồ họa đặc màu che khuất vật thể thực tế; đồ họa AR-HUD phải có độ trong suốt (Transparency/Outlined lines) tinh tế để không vô tình che mất một đứa trẻ hay hòn đá nhỏ trên mặt đường.",
          "C. Nên chiếu toàn bộ bộ phim hoạt hình lên kính lái.",
          "D. Bắt buộc đồ họa phải che kín 100% kính chắn gió."
        ],
        answer: 1,
        explanation: "Nguyên tắc sống còn của AR-HUD: Đồ họa tăng cường không bao giờ được phép che giấu thực tế. Nếu mũi tên đồ họa vẽ màu đặc kín đặc che mất một chiếc xe đạp đang qua đường, nó sẽ biến công nghệ an toàn thành công cụ gây tai nạn."
      },
      {
        id: 14,
        question: "Kích thước thể tích khoang quang học (Package Volume) của cụm máy chiếu AR-HUD dưới bảng táp-lô thường là bao nhiêu lít và là thách thức gì cho kỹ sư xe hơi?",
        options: [
          "A. Chỉ nhỏ bằng bao diêm (0.1 lít).",
          "B. Chiếm thể tích khổng lồ từ 10 đến 15 lít (hoặc 20 lít) dưới táp-lô, cạnh tranh không gian khốc liệt với cụm quạt gió điều hòa, hệ thống lái và khung gia cường an toàn xe.",
          "C. Lớn bằng cả khoang hành lý 500 lít.",
          "D. Không chiếm thể tích nào."
        ],
        answer: 1,
        explanation: "Để có trường nhìn FOV rộng và khoảng cách ảo xa, hệ thống thấu kính và gương cầu lõm của AR-HUD rất to lớn (10-15 lít), đòi hỏi các kỹ sư khung gầm phải tái cấu trúc toàn bộ táp-lô để nhét vừa nó."
      },
      {
        id: 15,
        question: "Cơ chế 'Bảo vệ nhiệt khỏi ánh nắng mặt trời' (Solar Thermal Protection / Sun Trap) trong hộp máy chiếu HUD ngăn chặn thảm họa gì?",
        options: [
          "A. Ngăn không cho xe bị hết pin ắc quy.",
          "B. Ngăn chặn ánh nắng mặt trời chiếu ngược qua kính lái vào thấu kính cầu lõm của HUD (hoạt động như kính lúp hội tụ nhiệt độ lên tới hàng trăm độ C) thiêu cháy màn hình PGU bên trong hộp HUD.",
          "C. Làm cho táp-lô luôn luôn mát lạnh như tủ lạnh.",
          "D. Giúp xe tự động sạc pin bằng năng lượng mặt trời."
        ],
        answer: 1,
        explanation: "Gương cầu lõm của HUD khuếch đại hình ảnh ra kính lái, nhưng cũng hội tụ ánh nắng mặt trời chiếu ngược vào như một kính lúp đốt cháy chip quang học. Kỹ sư phải thiết kế kính lọc phân cực và cửa trập tự động để bảo vệ máy chiếu."
      }
    ]
  }
];

console.log('Automotive tests part 3 prepared.');
