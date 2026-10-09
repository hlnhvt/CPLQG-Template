module.exports = [
  {
    id: 21,
    title: "Bài 21: Trợ Lý Giọng Nói & AI Đàm Thoại Trên Xe (VUI & In-Vehicle LLMs)",
    badge: "Voice & AI Assistants",
    category: "auto",
    description: "Giao diện giọng nói VUI, tích hợp mô hình ngôn ngữ lớn LLMs trong xe, micro đa vùng (Multi-zone beamforming) và xử lý ngoại tuyến Offline.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Giao diện người dùng bằng giọng nói (VUI - Voice User Interface) trong ô tô giải quyết triệt để hai dạng xao nhãng nguy hiểm nào của người lái?",
        options: [
          "A. Xao nhãng về thính giác và xao nhãng về tài chính.",
          "B. Xao nhãng thị giác (Visual Distraction - mắt vẫn nhìn đường) và Xao nhãng thao tác tay chân (Manual Distraction - hai tay vẫn giữ chắc vô-lăng).",
          "C. Loại bỏ hoàn toàn sự rung lắc của khung gầm xe.",
          "D. Giúp xe tự động vượt đèn đỏ an toàn."
        ],
        answer: 1,
        explanation: "VUI thực thi triết lý cốt tử 'Eyes on the road, Hands on the wheel': Người lái chỉ cần nói khẩu lệnh tự nhiên để điều chỉnh nhiệt độ hay chọn điểm đến mà không cần rời mắt cúi nhìn màn hình."
      },
      {
        id: 2,
        question: "Công nghệ micro định hướng đa vùng (Multi-Zone Beamforming Microphone Array) trên xe hơi thông minh có khả năng nhận biết điều gì quan trọng?",
        options: [
          "A. Nhận biết độ ẩm trong hơi thở của hành khách.",
          "B. Định vị chính xác vị trí ghế của người đang nói (Ghế lái, Ghế phụ, hoặc Ghế sau bên trái/phải) để chỉ thực thi lệnh cho đúng vị trí đó (ví dụ: 'Bật sưởi ghế' thì chỉ bật đúng ghế của người ra lệnh).",
          "C. Nhận biết người nói đang mặc áo màu gì.",
          "D. Tự động ghi âm cuộc gọi để gửi về tổng đài."
        ],
        answer: 1,
        explanation: "Multi-zone micro giải quyết sự hỗn loạn âm thanh: Khi người ngồi ghế sau nói 'Tôi thấy hơi lạnh', hệ thống chỉ tăng nhiệt độ vùng điều hòa phía sau mà không làm thay đổi điều hòa ghế lái phía trước."
      },
      {
        id: 3,
        question: "Sự khác biệt lớn nhất giữa Trợ lý giọng nói truyền thống dựa trên mẫu lệnh cứng (Command-and-Control) và Trợ lý AI thế hệ mới tích hợp LLM (như ChatGPT/Gemini trên xe hơi) là:",
        options: [
          "A. Trợ lý LLM nói giọng đều đều như robot cổ điển.",
          "B. Trợ lý tích hợp LLM có khả năng hiểu ngữ cảnh đàm thoại tự nhiên, suy luận ý định phức tạp (ví dụ: 'Tôi đang thấy hơi đói và thèm đồ ăn Nhật' -> tự tìm nhà hàng sushi gần nhất) thay vì bắt người dùng phải học thuộc lòng các câu lệnh cứng nhắc.",
          "C. Trợ lý LLM chỉ hiểu được tiếng Latinh cổ.",
          "D. Trợ lý LLM bắt buộc phải có màn hình phụ riêng."
        ],
        answer: 1,
        explanation: "LLM phá vỡ rào cản 'học thuộc lòng cú pháp': Người dùng nói chuyện tự nhiên như nói với một người trợ lý ngồi ghế phụ, xe tự hiểu ý định ngầm và thực thi chuỗi tác vụ thông minh."
      },
      {
        id: 4,
        question: "Tại sao hệ thống VUI trên xe hơi BẮT BUỘC phải hỗ trợ kiến trúc lai Hybrid (kết hợp cả xử lý Cục bộ Offline on-edge và Đám mây Cloud)?",
        options: [
          "A. Để tốn nhiều dung lượng bộ nhớ hơn.",
          "B. Đảm bảo các khẩu lệnh an toàn cốt lõi (Bật gạt nước, chỉnh điều hòa, sấy kính, gọi cứu hộ) vẫn hoạt động tức thời trong 0.2s ngay cả khi xe đi vào vùng hẻo lánh, đường hầm mất sóng 4G/5G hoàn toàn.",
          "C. Để xe có thể tự động nâng cấp động cơ.",
          "D. Để lưu trữ các tệp video chất lượng cao."
        ],
        answer: 1,
        explanation: "Nếu mất sóng điện thoại mà xe không hiểu lệnh 'Mở gạt nước' hay 'Hạ cửa kính' thì là thảm họa. Kiến trúc Hybrid xử lý lệnh xe cơ bản ngay trên chip cục bộ (On-device NPU) và chỉ đẩy các câu hỏi tri thức phức tạp lên Cloud."
      },
      {
        id: 5,
        question: "Từ khóa đánh thức (Wake Word - như 'Hey Mercedes', 'Hi VinFast', 'Hey Google') trong thiết kế HMI có vai trò gì?",
        options: [
          "A. Là mật khẩu bảo vệ tài khoản ngân hàng của tài xế.",
          "B. Đóng vai trò là tín hiệu kích hoạt có chủ ý: Đánh thức hệ thống lắng nghe lệnh và bảo vệ quyền riêng tư (ngăn chặn xe liên tục ghi âm các cuộc trò chuyện thông thường trong cabin khi chưa có lệnh).",
          "C. Làm cho còi xe kêu to hơn.",
          "D. Đổi màu đèn pha của xe."
        ],
        answer: 1,
        explanation: "Wake word là cánh cổng kiểm soát quyền riêng tư. Xe chỉ bắt đầu phân tích âm thanh khi nghe đúng từ khóa kích hoạt, bảo đảm các câu chuyện riêng tư trên xe không bị ghi lại tùy tiện."
      },
      {
        id: 6,
        question: "Tính năng 'Barge-In / Interruptibility' (Cho phép ngắt lời) trong tương tác VUI mang lại sự tiện lợi nào cho người dùng?",
        options: [
          "A. Cho phép xe tự động ngắt lời người lái khi họ nói dài.",
          "B. Cho phép người dùng nói chen ngang để ra lệnh mới ngay lập tức mà không cần phải kiên nhẫn chờ trợ lý ảo đọc hết một đoạn văn bản trả lời dài dòng.",
          "C. Khiến hệ thống tự động tắt nguồn điện.",
          "D. Tự động chuyển cuộc gọi sang chế độ chờ."
        ],
        answer: 1,
        explanation: "Nếu trợ lý ảo đang đọc dông dài danh sách 5 quán ăn mà người lái đã thấy quán ưng ý, tính năng Barge-in cho phép họ nói ngay 'Chọn quán số 1' để dừng câu nói của trợ lý, tiết kiệm thời gian quý báu."
      },
      {
        id: 7,
        question: "Phản hồi xác nhận trực quan (Visual Voice Feedback) trên màn hình khi trợ lý giọng nói đang lắng nghe thường hiển thị dưới dạng nào?",
        options: [
          "A. Màn hình tự động tắt đen thui.",
          "B. Một khối cầu ánh sáng động (Orb), dải sóng âm nhấp nháy (Waveform) hoặc thanh ánh sáng LED nội thất nhấp nhịp theo giọng nói, xác nhận hệ thống đang lắng nghe và hiểu tín hiệu.",
          "C. Hiện bức ảnh chụp chân dung lập trình viên.",
          "D. Đổi phông chữ của toàn bộ màn hình sang màu đỏ."
        ],
        answer: 1,
        explanation: "Visual confirmation khép kín vòng lặp phản hồi: Nhìn thấy quả cầu ánh sáng uốn lượn theo âm lượng giọng mình, tài xế biết chắc chắn xe đang tiếp nhận khẩu lệnh và không bị điếc tiếng."
      },
      {
        id: 8,
        question: "Thuật ngữ 'Voice Latency' (Độ trễ phản hồi giọng nói) trên xe hơi cần đạt ngưỡng thời gian nào để cuộc trò chuyện diễn ra tự nhiên?",
        options: [
          "A. Khoảng 30 giây đến 1 phút.",
          "B. Dưới 1.0 giây (lý tưởng là 300 - 600 mili-giây) từ khi người nói dứt câu cho đến khi hệ thống bắt đầu phản hồi hoặc thực thi hành động.",
          "C. Nửa ngày.",
          "D. Không cần quan tâm tới thời gian phản hồi."
        ],
        answer: 1,
        explanation: "Trong giao tiếp người - người, khoảng lặng giữa hai câu nói thường chỉ 200-500ms. Nếu trợ lý giọng nói im lặng quá 1.5 giây, người lái sẽ tưởng xe bị đơ và lặp lại câu lệnh gây rối loạn hệ thống."
      },
      {
        id: 9,
        question: "Cơ chế khử tiếng ồn khoang lái (Acoustic Echo Cancellation - AEC & Noise Suppression) trong VUI xe hơi phải xử lý những tạp âm phức tạp nào?",
        options: [
          "A. Chỉ có tiếng thở nhẹ của tài xế.",
          "B. Tiếng nhạc phát ra từ chính loa của xe (vòng lặp hồi âm), tiếng gió rít khi mở cửa sổ, tiếng lốp xe gầm rú trên cao tốc và tiếng trẻ em nô đùa ở hàng ghế sau.",
          "C. Sóng điện thoại di động.",
          "D. Ánh sáng mặt trời chiếu vào cabin."
        ],
        answer: 1,
        explanation: "Thuật toán AEC trừ khử chính xác tín hiệu âm nhạc đang phát từ dàn loa trong xe ra khỏi tín hiệu thu từ micro, chỉ giữ lại giọng nói thuần khiết của tài xế để nhận diện chính xác 99%."
      },
      {
        id: 10,
        question: "Khái niệm 'Proactive In-Car Voice Assistance' (Trợ lý giọng nói chủ động theo ngữ cảnh) thể hiện qua tình huống nào?",
        options: [
          "A. Liên tục nói chuyện huyên thuyên không ngừng nghỉ suốt chuyến đi.",
          "B. Chủ động đưa ra gợi ý ngắn gọn đúng thời điểm dựa trên cảm biến và thói quen (ví dụ: 'Nhiệt độ ngoài trời vừa giảm xuống 2°C, bạn có muốn bật sưởi vô-lăng không?' hoặc 'Đoạn đường phía trước đang tắc 20 phút, có gợi ý tuyến đường tránh nhanh hơn').",
          "C. Tự động gọi điện làm phiền bạn bè của tài xế.",
          "D. Đọc to tất cả các tin nhắn cá nhân mà không hỏi trước."
        ],
        answer: 1,
        explanation: "Chủ động thông minh (Proactive assistance) dự đoán trước nhu cầu của tài xế trước khi họ kịp nghĩ tới, chỉ với 1 câu hỏi ngắn và tài xế chỉ cần nói 'Có' hoặc 'Không' để hoàn thành."
      },
      {
        id: 11,
        question: "Thiết kế 'Giọng nói nhân tạo' (TTS Voice Persona) của xe hơi nên hướng tới đặc tính âm học nào để tài xế cảm thấy tin cậy?",
        options: [
          "A. Giọng nói the thé chói tai như phim hoạt hình.",
          "B. Âm sắc trầm ấm, tốc độ nói vừa phải, phát âm tròn vành rõ chữ, tự nhiên và giàu cảm xúc nhưng giữ phong thái điềm tĩnh, chuyên nghiệp và đáng tin cậy.",
          "C. Giọng quát tháo giận dữ để tài xế sợ hãi.",
          "D. Giọng nói thì thầm không nghe rõ."
        ],
        answer: 1,
        explanation: "Tâm lý học âm thanh: Giọng nói điềm tĩnh, ấm áp giúp giải tỏa căng thẳng khi kẹt xe và mang lại cảm giác an tâm như có một người hoa tiêu chuyên nghiệp đồng hành bên cạnh."
      },
      {
        id: 12,
        question: "Khi người dùng ra một câu lệnh giọng nói mơ hồ (ví dụ: 'Gọi cho anh Nam' trong khi danh bạ có 3 người tên Nam), HMI giải quyết như thế nào?",
        options: [
          "A. Tự động xóa số điện thoại của cả 3 người.",
          "B. Trợ lý phản hồi ngắn gọn: 'Bạn muốn gọi cho Nam Honda, Nam Viettel hay Nam Em họ?' kèm hiển thị danh sách 3 người trên màn hình để tài xế có thể chọn bằng giọng nói hoặc chạm 1 chạm.",
          "C. Tự động quay số ngẫu nhiên cho một người lạ.",
          "D. Im lặng không trả lời."
        ],
        answer: 1,
        explanation: "Quy trình giải quyết sự mơ hồ (Disambiguation dialog): Trợ lý đưa ra các tùy chọn cụ thể một cách ngắn gọn, cho phép người dùng chọn phương án chính xác nhất mà không gây bực bội."
      },
      {
        id: 13,
        question: "Cơ chế 'Implicit Confirmation' (Xác nhận ngầm) trong VUI xe hơi ưu việt hơn 'Explicit Confirmation' (Xác nhận rõ ràng) ở điểm nào?",
        options: [
          "A. Không bao giờ cho người dùng biết kết quả.",
          "B. Thay vì hỏi lại dài dòng: 'Bạn có chắc chắn muốn chỉnh điều hòa lên 24 độ không?', hệ thống thực hiện ngay và thông báo ngắn gọn: 'Nhiệt độ đã đặt 24 độ' kèm tiếng bíp nhẹ, rút ngắn thời gian tương tác.",
          "C. Bắt buộc người dùng phải ký cam kết.",
          "D. Tự động đổi hướng xe."
        ],
        answer: 1,
        explanation: "Với các tác vụ đơn giản, ít rủi ro (đổi nhạc, chỉnh nhiệt độ), xác nhận ngầm thực hiện lệnh ngay lập tức và chỉ thông báo ngắn, giúp tài xế không phải mất công trả lời 'Có, tôi đồng ý' phiền toái."
      },
      {
        id: 14,
        question: "Hạn chế tương tác giọng nói đối với các tác vụ có tính bảo mật cao (như chuyển tiền ngân hàng, đọc mật mã cá nhân) trên xe hơi vì lý do an toàn nào?",
        options: [
          "A. Vì trợ lý ảo không biết làm toán.",
          "B. Nguy cơ rò rỉ thông tin cá nhân do hành khách ngồi cùng xe nghe thấy (Eavesdropping), hoặc bị nhận diện nhầm khẩu lệnh do tiếng ồn môi trường.",
          "C. Vì xe không có kết nối Bluetooth.",
          "D. Do luật giao thông cấm nói chuyện trong xe."
        ],
        answer: 1,
        explanation: "Nói to mật khẩu hay số thẻ ngân hàng trong xe có người lạ đi cùng là rủi ro bảo mật nghiêm trọng. Các tác vụ nhạy cảm bắt buộc phải chuyển sang giao diện riêng tư hoặc xác thực qua điện thoại."
      },
      {
        id: 15,
        question: "Tính năng 'Voice Profiles / Voice Biometrics' (Sinh trắc học giọng nói) trên xe thông minh có khả năng làm gì?",
        options: [
          "A. Đo độ rung thanh quản để hát karaoke.",
          "B. Nhận diện giọng nói độc bản của từng thành viên trong gia đình (Voice ID) để tự động tải hồ sơ cá nhân tương ứng và ngăn chặn người lạ dùng giọng nói để mở khóa xe trái phép.",
          "C. Bắt buộc mọi người phải đổi giọng nói giống nhau.",
          "D. Không có giá trị thực tế."
        ],
        answer: 1,
        explanation: "Voice ID phân biệt giọng của bố, mẹ hay con cái: Khi người bố ra lệnh 'Mở cốp sau', xe nhận diện đúng giọng chủ nhân mới mở khóa; trẻ con nói đùa xe sẽ từ chối mở tính năng an toàn."
      }
    ]
  },
  {
    id: 22,
    title: "Bài 22: Phản Hồi Đa Giác Quan: Haptics & Đèn Nội Thất Tương Tác",
    badge: "Multisensory HMI",
    category: "auto",
    description: "Phản hồi xúc giác cơ học Haptics trên vô-lăng, bàn đạp ga phản hồi lực (Force Feedback Pedal) và hệ thống đèn viền LED nội thất tương tác thông minh.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Vô-lăng có phản hồi xúc giác (Haptic Steering Wheel) truyền tải cảnh báo nguy hiểm đến tài xế qua cơ chế vật lý nào?",
        options: [
          "A. Bắn tia nước nóng vào tay tài xế.",
          "B. Mô-tơ rung lệch tâm (ERM) hoặc cơ cấu truyền động cộng hưởng tuyến tính (LRA) tạo ra các nhịp rung giật xung lực có định hướng (rung bên trái hoặc bên phải vô-lăng) tương ứng với phía có nguy cơ va chạm.",
          "C. Tự động xoay tít vô-lăng 360 độ.",
          "D. Làm mát vô-lăng xuống 0 độ C."
        ],
        answer: 1,
        explanation: "Rung định hướng bên trái khi lấn làn trái hoặc có xe vượt trái kích hoạt phản xạ cơ bắp tức thì của đôi tay (Muscle reflex) giúp tài xế giật mình chỉnh lại tay lái trong dưới 150 mili-giây."
      },
      {
        id: 2,
        question: "Bàn đạp ga phản hồi lực (Active / Haptic Accelerator Pedal - như trên Porsche, Nissan) mang lại ưu thế HMI nào về mặt an toàn và tiết kiệm năng lượng?",
        options: [
          "A. Tự động gãy rời khi tài xế đạp quá mạnh.",
          "B. Tạo ra lực đẩy cơ học ngược lại vào lòng bàn chân (Force resistance / Counter-force) khi tài xế chạy quá tốc độ giới hạn, hoặc tạo nhịp gõ nhẹ nhắc tài xế nhấc chân ga để chuẩn bị chạy trớn tiết kiệm pin/xăng.",
          "C. Làm cho bàn đạp ga luôn luôn trơn trượt.",
          "D. Đổi màu bàn đạp ga sang màu tím."
        ],
        answer: 1,
        explanation: "Chân ga haptic giao tiếp trực tiếp với bàn chân: Khi xe trước phanh gấp, bàn đạp ga tự động 'nảy nhẹ' đẩy chân tài xế lên, giúp họ chuyển chân sang bàn đạp phanh nhanh hơn 0.3 giây."
      },
      {
        id: 3,
        question: "Dây đai an toàn có phản hồi rung xúc giác (Haptic Seatbelt Pretensioner) được kích hoạt trong kịch bản nào?",
        options: [
          "A. Khi tài xế nghe một bài hát có nhịp điệu nhanh.",
          "B. Kéo giật nhẹ đai an toàn ôm sát người để đánh thức tài xế khi hệ thống DMS phát hiện họ ngủ gật, hoặc siết chặt giữ chặt cơ thể trước vài giây khi xe phát hiện va chạm sắp xảy ra không thể tránh khỏi.",
          "C. Khi xe dừng lại nạp điện.",
          "D. Tự động nới lỏng đai an toàn ra hết cỡ."
        ],
        answer: 1,
        explanation: "Siết đai an toàn tạo ra kích thích xúc giác mạnh mẽ vào lồng ngực người lái, ngay lập tức kéo sự chú ý trở lại thực tại và đặt cơ thể vào tư thế an toàn tối ưu trước khi túi khí bung."
      },
      {
        id: 4,
        question: "Đèn viền nội thất tương tác thông minh (Smart Interactive Ambient Lighting - như trên Mercedes EQS, BMW i7) vượt trội hơn đèn trang trí đổi màu thông thường ở chức năng nào?",
        options: [
          "A. Chỉ dùng để chụp ảnh check-in mạng xã hội.",
          "B. Hoạt động như một kênh giao diện cảnh báo trực quan: Dải LED chạy dọc táp-lô và cánh cửa sẽ chạy luồng ánh sáng đỏ cảnh báo khi có xe vượt trong điểm mù, nhấp nháy đỏ khi sắp va chạm, hoặc chạy dải sáng xanh khi điều chỉnh nhiệt độ điều hòa.",
          "C. Làm cho kính cửa sổ tự động tối màu lại.",
          "D. Tiêu thụ toàn bộ điện năng của xe."
        ],
        answer: 1,
        explanation: "Đèn Ambient không chỉ làm đẹp, nó là một 'màn hình hiển thị ánh sáng ngoại vi': Luồng ánh sáng đỏ quét nhanh dọc cửa xe báo hiệu người mở cửa có xe máy sắp lao tới từ phía sau (Exit Warning)."
      },
      {
        id: 5,
        question: "Tính năng Cảnh báo mở cửa an toàn (Safe Exit Warning) sử dụng dải đèn LED nội thất và âm thanh cảnh báo hành khách trong tình huống nào?",
        options: [
          "A. Khi trời bắt đầu đổ mưa lớn.",
          "B. Khi người trong xe kéo lẫy mở cửa xe nhưng radar phát hiện có người đi xe đạp, xe máy hoặc ô tô đang lao tới từ phía sau trong vùng điểm mù, dải đèn trên cửa lập tức chuyển đỏ rực và khóa chốt cửa điện tử trong tích tắc.",
          "C. Khi xe đang rửa trong tiệm tự động.",
          "D. Khi hành khách quên thắt dây an toàn."
        ],
        answer: 1,
        explanation: "Tai nạn do mở cửa xe bất cẩn (Dooring accident) gây thương vong cực kỳ lớn cho người đi xe máy. Hệ thống Safe Exit kết hợp đèn viền đỏ nhấp nháy ngăn chặn hành vi mở cửa chết người này."
      },
      {
        id: 6,
        question: "Công nghệ 'Localized Haptics' (Xúc giác cục bộ) trên màn hình cảm ứng ô tô sử dụng bộ truyền động nào để tạo cảm giác bấm phím thực?",
        options: [
          "A. Mô-tơ rung đồ chơi trẻ em.",
          "B. Cảm biến áp điện (Piezoelectric Actuators) hoặc nam châm điện từ siêu tốc đặt trực tiếp dưới bề mặt kính, tạo ra xung lực nảy cơ học chính xác tại đúng tọa độ đầu ngón tay chạm vào thay vì làm rung toàn bộ cả táp-lô.",
          "C. Phun khí nén vào ngón tay.",
          "D. Đốt nóng bề mặt kính."
        ],
        answer: 1,
        explanation: "Piezo actuators phản ứng siêu tốc (dưới 5ms), tạo ra một tiếng click cơ học đanh gọn giả lập hoàn hảo cảm giác nhấn nút bấm vật lý thực sự, mang lại sự tin cậy tuyệt đối cho người lái."
      },
      {
        id: 7,
        question: "Đệm ghế lái có tích hợp các mô-tơ rung xúc giác đa vùng (Haptic Seat Vibration - như trên GM Safety Alert Seat) cung cấp phản hồi thông tin gì?",
        options: [
          "A. Báo hiệu tài xế vừa tăng cân.",
          "B. Rung mông bên trái khi xe lấn làn trái, rung mông bên phải khi có nguy cơ va chạm bên phải, và rung cả hai bên đệm ghế khi có nguy cơ va chạm trực diện phía trước.",
          "C. Tự động đẩy tài xế bay lên trần xe.",
          "D. Chỉ dùng để massage thư giãn."
        ],
        answer: 1,
        explanation: "Rung đệm ghế là phương thức cảnh báo riêng tư và trực giác xuất sắc: Không làm phiền các hành khách khác bằng tiếng chuông bíp chói tai, nhưng tài xế cảm nhận rõ mồn một hướng nguy hiểm qua xúc giác cơ thể."
      },
      {
        id: 8,
        question: "Tại sao phản hồi xúc giác (Haptic feedback) được đánh giá là kênh thông tin an toàn vượt trội hơn cảnh báo âm thanh trong môi trường cabin ồn ào?",
        options: [
          "A. Vì xúc giác không bao giờ bị 'che lấp' bởi tiếng nhạc to, tiếng trẻ con khóc hay tiếng còi xe bên ngoài và không gây ô nhiễm tiếng ồn cho những người khác đang ngủ trên xe.",
          "B. Vì chi phí làm rung ghế rẻ hơn loa đài.",
          "C. Vì người đi xe ô tô không có tai nghe.",
          "D. Xúc giác chỉ hoạt động được khi xe đứng yên."
        ],
        answer: 0,
        explanation: "Âm thanh có thể bị át đi khi tài xế bật nhạc Rock âm lượng lớn, nhưng xúc giác rung qua vô lăng và đệm ghế thì không thể bị bỏ sót, trực tiếp truyền thẳng vào hệ thần kinh cảm giác."
      },
      {
        id: 9,
        question: "Khi điều chỉnh tăng/giảm nhiệt độ điều hòa bằng phím ảo, dải đèn LED nội thất tương tác thông minh thường phản hồi màu sắc như thế nào?",
        options: [
          "A. Nhấp nháy màu xanh lá cây liên tục.",
          "B. Chạy hiệu ứng ánh sáng màu Đỏ ấm áp khi tăng nhiệt độ sưởi và chuyển luồng ánh sáng màu Xanh dương mát lạnh khi giảm nhiệt độ làm mát, xác nhận trực quan lệnh điều khiển.",
          "C. Tắt toàn bộ đèn nội thất trong 5 phút.",
          "D. Đổi màu kính chiếu hậu ngoài trời."
        ],
        answer: 1,
        explanation: "Ánh xạ màu sắc tự nhiên (Natural color mapping): Màu đỏ là nóng, màu xanh là lạnh. Luồng ánh sáng chạy dọc bảng điều khiển xác nhận hành động trực quan mà tài xế chỉ cần liếc mắt ngoại vi là nhận biết được."
      },
      {
        id: 10,
        question: "Độ trễ phản hồi xúc giác (Haptic Latency) kể từ thời điểm ngón tay chạm vào kính cảm ứng cho tới khi xung lực nẩy phát ra cần đạt:",
        options: [
          "A. Dưới 20 mili-giây để não bộ cảm nhận cảm giác bấm cơ học liền mạch như công tắc cơ thực.",
          "B. Khoảng 5 giây.",
          "C. 1 phút.",
          "D. Không cần quan tâm độ trễ."
        ],
        answer: 0,
        explanation: "Xúc giác đòi hỏi thời gian thực tức thì (<20ms). Nếu trễ trên 50ms, ngón tay đã kịp nhấc lên khỏi mặt kính mới thấy màn hình rung giật, tạo ra trải nghiệm cực kỳ giả tạo và khó chịu."
      },
      {
        id: 11,
        question: "Cơ chế 'Force-Sensing Touch' (Cảm ứng lực nhấn) kết hợp Haptics giải quyết nhược điểm nào của màn hình cảm ứng điện dung thông thường?",
        options: [
          "A. Giúp màn hình không bị bám dấu vân tay.",
          "B. Ngăn chặn triệt để hiện tượng chạm hờ vô tình (Accidental brush/touch): Lệnh chỉ được kích hoạt khi tài xế cố ý ấn một lực nhất định (ví dụ lực ấn > 1.5 Newton) kèm xung rung phản hồi.",
          "C. Giảm trọng lượng của màn hình.",
          "D. Tự động sạc pin cho xe."
        ],
        answer: 1,
        explanation: "Khi xe rung lắc, tài xế với tay dễ quẹt trúng các nút bên cạnh. Màn hình cảm ứng lực chỉ ăn lệnh khi có lực ấn dứt khoát, loại bỏ hoàn toàn việc vô tình kích hoạt chức năng ngoài ý muốn."
      },
      {
        id: 12,
        question: "Hệ thống 'Khuếch tán mùi hương tương tác' (Active In-Cabin Fragrance / Mood Scents) kết hợp cùng HMI nhằm phục vụ trải nghiệm nào?",
        options: [
          "A. Xua đuổi muỗi và gián trong xe.",
          "B. Tăng cường trải nghiệm thư giãn đa giác quan (Wellness / Relax mode): Tự động khuếch tán mùi hương bạc hà/cam chanh sảng khoái kết hợp nhạc êm dịu và đèn sáng ấm để xua tan mệt mỏi cho tài xế.",
          "C. Che giấu mùi khói thuốc lá trái phép.",
          "D. Tiết kiệm nhiên liệu cho xe."
        ],
        answer: 1,
        explanation: "Trải nghiệm đa giác quan (Multisensory wellness): Mùi hương bạc hà hoặc cam quýt tự nhiên được chứng minh lâm sàng có tác dụng kích thích vùng não bộ tỉnh táo, hỗ trợ chống buồn ngủ hiệu quả."
      },
      {
        id: 13,
        question: "Các nút bấm bề mặt thông minh 'Smart Surfaces / In-Mold Electronics' (IME) ẩn dưới lớp da hoặc ốp gỗ nội thất hoạt động ra sao?",
        options: [
          "A. Là các hình dán đồ chơi trang trí.",
          "B. Khi xe tắt máy bề mặt phẳng lì như một tấm gỗ hoặc da liền mạch sang trọng; khi tay người lại gần (Proximity sensor), các biểu tượng nút bấm mới phát sáng xuyên qua lớp gỗ và cung cấp phản hồi xúc giác khi bấm.",
          "C. Không thể sử dụng được.",
          "D. Chỉ dùng để gắn đèn pin."
        ],
        answer: 1,
        explanation: "Smart Surfaces là tương lai của nội thất xe sang: Loại bỏ hoàn toàn sự lộn xộn của các nút nhựa rẻ tiền, biến mọi bề mặt ốp gỗ, vải nỉ thành giao diện cảm ứng ma thuật chỉ xuất hiện khi cần."
      },
      {
        id: 14,
        question: "Hiệu ứng xúc giác bằng sóng siêu âm trong không trung (Mid-air Ultrasonic Haptics) hoạt động theo nguyên lý nào?",
        options: [
          "A. Làm rung chuyển toàn bộ kính xe.",
          "B. Mảng phát sóng siêu âm tập trung các chùm sóng âm hội tụ áp suất lên lòng bàn tay lơ lửng trong không trung, tạo cảm giác như đang chạm vào một nút bấm ảo vô hình khi điều khiển bằng cử chỉ.",
          "C. Phát ra âm thanh chói tai làm điếc tai người nghe.",
          "D. Dùng để siêu âm sức khỏe người ngồi trong xe."
        ],
        answer: 1,
        explanation: "Mid-air haptics khắc phục nhược điểm lớn nhất của điều khiển cử chỉ tay (Gesture control): Giúp người dùng cảm nhận được 'vật thể chạm ảo' trong lòng bàn tay mà không cần sờ vào màn hình."
      },
      {
        id: 15,
        question: "Mức độ chiếu sáng tối đa của đèn Ambient nội thất ban đêm (Night-time Dimming) phải được giới hạn để tránh rủi ro an toàn nào?",
        options: [
          "A. Tránh làm nóng chảy các chi tiết nhựa cửa xe.",
          "B. Ngăn chặn hiện tượng phản chiếu ánh sáng đèn LED lên kính cửa sổ hông và kính chắn gió che khuất tầm nhìn ra gương chiếu hậu và mặt đường tối bên ngoài xe.",
          "C. Tiết kiệm pin cho chìa khóa thông minh.",
          "D. Tránh làm chói mắt máy bay trên trời."
        ],
        answer: 1,
        explanation: "Nếu ban đêm đèn viền cửa sáng quá chói, bóng của nó in lên cửa kính sẽ che khuất hoàn toàn gương chiếu hậu bên ngoài. HMI phải tự động hạ độ sáng đèn viền xuống dưới 10-20% khi xe lăn bánh ban đêm."
      }
    ]
  },
  {
    id: 23,
    title: "Bài 23: Màn Hình Hành Khách Phụ & Giải Trí Ghế Sau (Passenger Displays & RSE)",
    badge: "Passenger & RSE HMI",
    category: "auto",
    description: "Màn hình ghế phụ (Front Passenger Display), công nghệ lọc góc nhìn chống xao nhãng tài xế (Privacy Filter), hệ thống giải trí ghế sau (RSE) và chia sẻ đa màn hình.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Màn hình giải trí dành riêng cho ghế phụ phía trước (Front Passenger Display) mang lại lợi ích trải nghiệm nào?",
        options: [
          "A. Cho phép hành khách ghế phụ trực tiếp đánh lái xe thay cho tài xế.",
          "B. Cho phép người ngồi bên thưởng thức phim ảnh, nghe nhạc cá nhân qua tai nghe Bluetooth hoặc hỗ trợ tài xế tìm kiếm địa điểm dẫn đường rồi gửi sang màn hình chính mà không làm phiền tài xế.",
          "C. Tự động kiểm tra hành lý của hành khách.",
          "D. Chỉ hiển thị đồng hồ xem giờ."
        ],
        answer: 1,
        explanation: "Màn hình ghế phụ biến người đồng hành thành một 'phụ tá' đắc lực: Họ có thể tra cứu trạm xăng, quán ăn và bấm nút 'Gửi sang màn hình lái' (Send to Navigation), giúp tài xế không phải bận tâm thao tác."
      },
      {
        id: 2,
        question: "Công nghệ 'Màn che góc nhìn chủ động' (Active Privacy Filter / Switchable Privacy Display) trên màn hình ghế phụ BẮT BUỘC theo luật an toàn giao thông nhằm mục đích gì?",
        options: [
          "A. Không cho hành khách ghế phụ xem phim.",
          "B. Ngăn chặn hoàn toàn việc tài xế liếc mắt sang nhìn thấy video chuyển động đang phát bên màn hình ghế phụ (góc nhìn từ ghế lái chỉ thấy một màn hình đen hoặc tĩnh), loại bỏ triệt để nguy cơ xao nhãng thị giác chết người.",
          "C. Giảm độ phân giải của phim.",
          "D. Bảo vệ màn hình khỏi bị trầy xước."
        ],
        answer: 1,
        explanation: "Các cơ quan an toàn (như NHTSA và UNECE) nghiêm cấm việc tài xế có thể nhìn thấy video giải trí khi đang lái xe. Bộ lọc thị sai quang học chỉ cho phép ánh sáng truyền thẳng vào mắt người ngồi ghế phụ, góc nhìn từ ghế lái bị chặn hoàn toàn."
      },
      {
        id: 3,
        question: "Tính năng 'Chia sẻ đa màn hình bằng thao tác vuốt' (Cross-Display Content Flicking / Sharing) giữa các màn hình trong cabin cho phép người dùng:",
        options: [
          "A. Làm vỡ kính cả hai màn hình cùng lúc.",
          "B. Dùng ngón tay vuốt một thẻ bài hát, video hoặc lộ trình điều hướng từ màn hình ghế phụ hoặc ghế sau sang màn hình trung tâm của xe một cách trực quan và mượt mà.",
          "C. Tự động tắt máy xe khi vuốt màn hình.",
          "D. Đổi vị trí ghế ngồi của hành khách."
        ],
        answer: 1,
        explanation: "Thao tác vuốt chia sẻ màn hình tạo ra sự kết nối liền mạch giữa các thành viên trong gia đình: Con ngồi ghế sau tìm thấy bài hát yêu thích trên màn hình tựa đầu chỉ cần vuốt tay lên trên là bài hát phát ra dàn loa xe."
      },
      {
        id: 4,
        question: "Hệ thống Giải trí Hàng ghế sau (RSE - Rear Seat Entertainment) hiện đại chuyển dịch từ các màn hình gắn cố định truyền thống sang xu hướng nào?",
        options: [
          "A. Bỏ hoàn toàn không cần giải trí phía sau.",
          "B. Sử dụng màn hình rạp chiếu phim gập từ trần xe (như màn hình 31-inch 8K Theatre Screen của BMW 7-Series) hoặc tích hợp giá đỡ thông minh cho máy tính bảng cá nhân (BYOD - Bring Your Own Device) kèm cổng sạc công suất lớn.",
          "C. Chỉ cho phép hành khách đọc sách giấy.",
          "D. Bắt buộc hành khách phải nhìn ra cửa sổ."
        ],
        answer: 1,
        explanation: "Xu hướng hiện đại chia làm hai thái cực: Biến khoang sau thành rạp chiếu phim siêu sang với màn hình trần khổng lồ, hoặc tối ưu hóa cho máy tính bảng cá nhân của hành khách kết nối qua hệ sinh thái mở."
      },
      {
        id: 5,
        question: "Cơ chế 'Khóa trẻ em kỹ thuật số cho màn hình sau' (Rear Screen Parental Control) từ màn hình ghế lái cho phép cha mẹ làm gì?",
        options: [
          "A. Khóa cứng không cho trẻ em thở trong xe.",
          "B. Giám sát nội dung con đang xem, giới hạn thời gian sử dụng màn hình, điều chỉnh âm lượng từ xa và khóa các nút bấm điều khiển ghế/điều hòa phía sau để tránh trẻ nghịch ngợm gây mất an toàn.",
          "C. Tự động tắt điều hòa hàng ghế sau.",
          "D. Không có chức năng quản lý."
        ],
        answer: 1,
        explanation: "Parental Controls mang lại sự yên tâm cho các bậc phụ huynh: Tài xế có thể tắt màn hình phía sau chỉ bằng một nút bấm trên màn hình chính khi đến giờ trẻ cần ngủ hoặc tập trung."
      },
      {
        id: 6,
        question: "Hệ thống âm thanh đa vùng độc lập (Multi-Zone Sound Architecture) giải quyết vấn đề xung đột âm thanh trong xe như thế nào khi ghế sau xem phim còn ghế trước nghe tin tức?",
        options: [
          "A. Bắt buộc toàn bộ người trong xe phải đeo nút bịt tai.",
          "B. Kết nối tai nghe không dây độc lập cho hàng ghế sau (qua Bluetooth/Wi-Fi Direct) hoặc sử dụng công nghệ loa định hướng tạo chùm âm thanh riêng biệt cho từng vị trí ghế mà không làm lẫn tiếng sang ghế lái.",
          "C. Mở tất cả các nguồn âm thanh cùng một lúc ở mức âm lượng tối đa.",
          "D. Tự động ngắt hệ thống dẫn đường của xe."
        ],
        answer: 1,
        explanation: "Ghế trước nghe chỉ dẫn bản đồ và đàm thoại công việc, ghế sau đeo tai nghe xem phim hoạt hình Disney, mỗi người thưởng thức không gian âm thanh riêng mà không ai làm phiền ai."
      },
      {
        id: 7,
        question: "Màn hình điều khiển tích hợp trên bệ tỳ tay hàng ghế sau (Rear Armrest Touch Controller) thường điều khiển các tính năng tiện nghi nào?",
        options: [
          "A. Điều khiển chân ga và bàn đạp phanh của xe.",
          "B. Độ ngả của ghế thương gia, chế độ massage, sưởi/làm mát ghế, rèm che nắng kính cửa sổ, hệ thống điều hòa riêng biệt và ánh sáng đọc sách cá nhân.",
          "C. Bật đèn pha chiếu xa bên ngoài xe.",
          "D. Tự động mở nắp bình xăng."
        ],
        answer: 1,
        explanation: "Bệ tỳ tay phía sau biến hàng ghế 'ông chủ' thành trung tâm điều khiển tiện nghi đẳng cấp: Chạm nhẹ màn hình nhỏ gọn để ngả phẳng ghế nghỉ lưng và bật chế độ massage đá nóng."
      },
      {
        id: 8,
        question: "Khi xe đang dừng đỗ (ở số P), màn hình ghế phụ có còn bị áp dụng bộ lọc góc nhìn chống xao nhãng (Privacy filter) hay không?",
        options: [
          "A. Vẫn bị chặn vĩnh viễn không bao giờ tắt được.",
          "B. Hệ thống có thể tự động vô hiệu hóa bộ lọc thị sai quang học, cho phép cả tài xế và hành khách ghế phụ cùng xem chung một bộ phim trên màn hình lớn khi xe đang dừng chờ hoặc sạc điện.",
          "C. Màn hình tự động rơi xuống gầm sàn.",
          "D. Xe tự động khóa các cửa ra vào."
        ],
        answer: 1,
        explanation: "Công nghệ Switchable Privacy: Khi xe di chuyển, bộ lọc điện tử bật lên chặn góc nhìn tài xế; khi về số P dừng xe, bộ lọc tự động tắt đi mở rộng góc nhìn 178° để cả hai cùng xem phim chung thoải mái."
      },
      {
        id: 9,
        question: "Khái niệm 'Cabin Intercom / Driver Speech In-Car Amplification' (Hệ thống đàm thoại nội bộ trong khoang lái) hỗ trợ điều gì trên các dòng xe 7 chỗ hoặc SUV cỡ lớn?",
        options: [
          "A. Phát thông điệp cảnh báo cho người ngoài đường.",
          "B. Micro ghế lái thu giọng nói của tài xế và khuếch đại nhẹ nhàng qua loa trần hàng ghế thứ 3 phía sau, giúp tài xế nói chuyện với người ngồi sau cùng mà không cần phải quay đầu lại hay hét to tiếng.",
          "C. Tự động ghi âm các cuộc cãi vã gia đình.",
          "D. Dùng để hát đồng ca trong xe."
        ],
        answer: 1,
        explanation: "Trên xe SUV 3 hàng ghế dài 5 mét, tài xế nói chuyện ra sau thường phải ngoái đầu hét lớn rất nguy hiểm. Hệ thống Intercom khuếch đại giọng nói êm ái ra loa sau giúp cuộc đối thoại diễn ra tự nhiên mà tài xế vẫn nhìn thẳng mặt đường."
      },
      {
        id: 10,
        question: "Cổng kết nối HDMI hoặc cổng USB-C truyền dữ liệu DisplayPort (DP Alt Mode) trang bị cho hàng ghế sau cho phép hành khách làm gì?",
        options: [
          "A. Sạc bình ắc quy xe tải.",
          "B. Cắm trực tiếp máy chơi game cá nhân (như Nintendo Switch, PlayStation) hoặc máy tính xách tay để làm việc và giải trí trên màn hình lớn của xe trong các chuyến đi dài.",
          "C. Tải mã độc vào hệ thống điều khiển lái.",
          "D. Làm tăng tốc độ tối đa của xe."
        ],
        answer: 1,
        explanation: "Khả năng cắm trực tiếp máy chơi game qua HDMI biến chiếc xe thành phòng chơi game di động lý tưởng cho trẻ nhỏ trong các hành trình du lịch xuyên việt dài ngày."
      },
      {
        id: 11,
        question: "Giao diện người dùng cho trẻ em trên hệ thống giải trí ghế sau (Kids Mode UI) cần tuân thủ nguyên tắc thiết kế nào?",
        options: [
          "A. Nhiều văn bản dài phức tạp và phông chữ nhỏ.",
          "B. Biểu tượng đồ họa to bản, màu sắc tươi vui, điều hướng trực quan bằng hình ảnh nhân vật hoạt hình, giới hạn nội dung phù hợp lứa tuổi và không có các tùy chọn cài đặt hệ thống phức tạp.",
          "C. Bắt buộc trẻ em phải nhập mật khẩu mỗi lần chọn phim.",
          "D. Sử dụng ngôn ngữ lập trình mã nguồn mở."
        ],
        answer: 1,
        explanation: "Trẻ nhỏ chưa biết đọc chữ cần giao diện dạng thẻ hình ảnh trực quan lớn, bấm vào hình chuột Mickey là mở phim ngay mà không bị lạc vào các menu cài đặt kỹ thuật rắc rối."
      },
      {
        id: 12,
        question: "Hiện tượng say xe (Motion Sickness) của hành khách khi nhìn vào màn hình giải trí ghế sau khi xe vào cua dốc bắt nguồn từ xung đột giác quan nào?",
        options: [
          "A. Do màn hình quá sáng.",
          "B. Sự xung đột giữa hệ tiền đình ở tai trong (cảm nhận cơ thể đang lắc lư, tăng tốc khi vào cua) và mắt (nhìn vào một màn hình tĩnh cố định trong xe báo hiệu cơ thể đang đứng yên).",
          "C. Do âm thanh trong xe bị rè.",
          "D. Do ghế ngồi quá êm ái."
        ],
        answer: 1,
        explanation: "Sensory conflict: Tai trong cảm nhận xe đang chao liệng dữ dội nhưng mắt dán vào màn hình tĩnh lại thấy không có chuyển động, não bộ suy diễn cơ thể bị trúng độc và kích hoạt phản xạ nôn ói gây say xe."
      },
      {
        id: 13,
        question: "Tính năng HMI mới (như Motion Cues trên Apple iOS 18 hoặc trên xe hiện đại) giúp giảm say xe khi xem màn hình bằng cách nào?",
        options: [
          "A. Tắt ngấm màn hình ngay khi xe bắt đầu lăn bánh.",
          "B. Hiển thị các chấm chuyển động nhỏ động ở mép màn hình di chuyển đồng bộ với gia tốc thực tế của xe (xe cua trái chấm trôi sang phải, xe phanh chấm trôi tới trước) giúp mắt và tai trong đồng nhất cảm nhận chuyển động.",
          "C. Phun nước đá vào mặt hành khách.",
          "D. Bắt buộc hành khách phải nhắm mắt."
        ],
        answer: 1,
        explanation: "Các đốm chuyển động động (Motion Cues) ở rìa tầm nhìn ngoại vi cung cấp cho não bộ tín hiệu chuyển động khớp hoàn hảo với cảm nhận của tai trong, triệt tiêu xung đột giác quan và giảm say xe tới 80%."
      },
      {
        id: 14,
        question: "Cơ chế 'Chống kẹt an toàn' (Anti-Pinch / Obstacle Detection) của màn hình trần tự động gập điện đảm bảo điều gì?",
        options: [
          "A. Đảm bảo màn hình không bị rơi xuống sàn.",
          "B. Tự động dừng lại và đảo chiều gập lên ngay lập tức nếu phát hiện chạm vào đầu hoặc tay của hành khách khi đang hạ xuống, tránh gây chấn thương kẹp cổ hoặc đầu.",
          "C. Làm cho màn hình gập nhanh gấp đôi.",
          "D. Tự động phát chuông báo cháy."
        ],
        answer: 1,
        explanation: "Quy chuẩn an toàn cơ điện ô tô bắt buộc mọi chi tiết chuyển động bằng mô-tơ trong tầm với con người (cửa sổ, cửa sổ trời, màn hình trần) phải có cảm biến lực chống kẹp an toàn."
      },
      {
        id: 15,
        question: "Ứng dụng điều khiển xe trên điện thoại thông minh dành cho hành khách (Passenger Companion App) cho phép họ làm gì từ xa?",
        options: [
          "A. Bấm còi xe để trêu chọc tài xế.",
          "B. Tự điều chỉnh nhiệt độ điều hòa vùng ngồi của mình, chọn danh sách phát nhạc yêu thích, hoặc theo dõi thời gian dự kiến tới nơi (ETA) của chuyến đi mà không cần hỏi tài xế.",
          "C. Thay đổi tốc độ giới hạn của xe.",
          "D. Mở khóa nắp ca-pô khi xe đang chạy."
        ],
        answer: 1,
        explanation: "Hành khách tự chủ không gian tiện nghi cá nhân qua điện thoại mà không cần với tay lên bảng điều khiển hay làm phiền người đang tập trung cầm lái."
      }
    ]
  },
  {
    id: 24,
    title: "Bài 24: Thiết Kế HMI Cho Điều Kiện Khắc Nghiệt (Extreme Environments)",
    badge: "Extreme Conditions",
    category: "auto",
    description: "Thách thức ánh nắng gắt (100.000 lux), kính mát phân cực, mùa đông âm 40 độ C, thao tác bằng găng tay dày và chống sốc nhiệt (Thermal Shock).",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Thách thức ánh sáng ngoài trời cực đại (Direct Sunlight lên tới 100.000 Lux chiếu thẳng vào xe) đòi hỏi tấm nền màn hình ô tô phải đạt tỷ lệ tương phản tương đối (Ambient Contrast Ratio - ACR) tối thiểu là:",
        options: [
          "A. 1:1 (hoàn toàn không thấy gì).",
          "B. Tối thiểu từ 5:1 đến 10:1 trong điều kiện chiếu sáng gắt để văn bản và biểu tượng đồ họa vẫn đọc được rõ ràng mà không bị mờ nhạt biến thành màn hình đen tuyền.",
          "C. 1.000.000:1.",
          "D. Không cần quan tâm tới độ tương phản."
        ],
        answer: 1,
        explanation: "ACR tính toán độ sáng màn hình so với ánh sáng phản xạ từ môi trường. Nếu phản xạ quá lớn, màn hình biến thành một chiếc gương soi; tỷ lệ ACR ≥ 5:1 đảm bảo mắt người vẫn nhận biết được mặt số tốc độ."
      },
      {
        id: 2,
        question: "Công nghệ dán quang học 'Optical Bonding' (dán keo quang học OCA/OCR giữa tấm kính bảo vệ và tấm nền hiển thị) mang lại bước nhảy vọt nào cho HMI ô tô?",
        options: [
          "A. Giúp giảm chi phí sản xuất xuống mức thấp nhất.",
          "B. Loại bỏ hoàn toàn lớp không khí ở giữa (Air gap), giảm thiểu 60-70% hiện tượng khúc xạ phản chiếu ánh sáng bên trong, tăng độ bền va đập và ngăn chặn bụi bẩn/hơi ẩm đọng sương làm ố màn hình.",
          "C. Làm cho màn hình tự động uốn cong.",
          "D. Tự động sạc pin cho màn hình."
        ],
        answer: 1,
        explanation: "Khe không khí truyền thống phản xạ ánh sáng nhiều lần làm màn hình xám xịt dưới nắng gắt. Optical bonding ép liền kính với tấm nền thành một khối đồng nhất trong suốt, đem lại màu đen sâu thẳm và khả năng chống chói đỉnh cao."
      },
      {
        id: 3,
        question: "Lớp phủ 'Anti-Reflective' (AR) và 'Anti-Glare' (AG) trên bề mặt kính màn hình ô tô khác nhau ở cơ chế quang học nào?",
        options: [
          "A. Cả hai lớp phủ là một, không có điểm khác biệt.",
          "B. AG (Anti-Glare) làm nhám mịn bề mặt kính để tán xạ ánh sáng chói thành ánh sáng khuếch tán mờ; còn AR (Anti-Reflective) sử dụng các lớp màng quang học giao thoa triệt tiêu sóng ánh sáng phản xạ tới mắt người.",
          "C. AR dùng để chống nước mưa, AG dùng để chống bụi bẩn.",
          "D. Lớp phủ AR chỉ hoạt động được vào ban đêm."
        ],
        answer: 1,
        explanation: "Màn hình ô tô cao cấp luôn kết hợp cả hai: Lớp khắc axit AG tán xạ các đốm sáng gắt của mặt trời, kết hợp lớp phủ đa tầng AR giảm phản xạ bề mặt từ 8% xuống dưới 1%, giúp hiển thị trong vắt."
      },
      {
        id: 4,
        question: "Khi nhiệt độ môi trường rơi xuống mức cực đoan âm 30°C đến âm 40°C vào mùa đông tuyết giá, màn hình tinh thể lỏng LCD truyền thống gặp phải trục trặc vật lý nào?",
        options: [
          "A. Màn hình tự động bốc cháy.",
          "B. Các phân tử tinh thể lỏng bị đông đặc sệt lại khiến thời gian chuyển đổi điểm ảnh (Response time) bị chậm dữ dội từ vài mili-giây lên tới hàng trăm mili-giây, gây hiện tượng bóng mờ (Ghosting) nặng nề và làm cảm ứng bị liệt tạm thời.",
          "C. Màn hình tự động tăng độ sáng lên cực đại.",
          "D. Phông chữ tự động chuyển sang tiếng Nga."
        ],
        answer: 1,
        explanation: "Độ nhớt của tinh thể lỏng tăng vọt ở nhiệt độ âm sâu làm kim đồng hồ quay chậm rì như phim quay chậm. Màn hình ô tô chuyên dụng chuẩn Automotive Grade (-40°C đến +85°C) phải tích hợp điện trở sưởi ấm màn hình (Heater pad) hoặc chuyển sang OLED."
      },
      {
        id: 5,
        question: "Màn hình OLED (Organic Light Emitting Diode) trong xe hơi ô tô có ưu thế vượt trội gì ở môi trường băng giá so với LCD?",
        options: [
          "A. Giá thành rẻ hơn màn hình thông thường.",
          "B. Điểm ảnh OLED tự phát quang ở trạng thái rắn (Solid-state) nên thời gian phản hồi điểm ảnh gần như tức thì (< 0.1ms) và hoạt động hoàn hảo ở nhiệt độ âm 40°C mà không hề bị bóng mờ hay giật lag.",
          "C. Không cần kết nối dây điện.",
          "D. Tự động sưởi ấm cabin xe."
        ],
        answer: 1,
        explanation: "OLED không dùng chất lỏng nên không sợ bị đông đặc. Dù ở Bắc Cực âm 40°C, màn hình OLED vẫn chuyển động mượt mà 60fps ngay khi mở cửa xe mà không cần chờ sưởi ấm."
      },
      {
        id: 6,
        question: "Thao tác trên màn hình cảm ứng ô tô khi người lái đeo găng tay len dày hoặc găng tay da mùa đông đòi hỏi công nghệ cảm ứng (Touch Controller) hỗ trợ chế độ nào?",
        options: [
          "A. Bắt buộc tài xế phải tháo găng tay cắn răng chịu lạnh.",
          "B. Chế độ 'Glove Mode' (Chế độ găng tay): Tự động tăng độ nhạy cảm biến điện dung (Capacitive Sensitivity) và thuật toán nhận diện trường điện từ ở khoảng cách xa hơn để bắt trọn tín hiệu chạm qua lớp vải/da dày.",
          "C. Chỉ cho phép chạm bằng mũi.",
          "D. Tự động chuyển sang điều khiển bằng bàn chân."
        ],
        answer: 1,
        explanation: "Găng tay ngăn cản ngón tay tiếp xúc trực tiếp với kính. Chip điều khiển cảm ứng chuyên dụng ô tô (như Synaptics, Microchip) có thuật toán Glove Mode tự động tăng cường độ nhạy để nhận diện cử chỉ mượt mà."
      },
      {
        id: 7,
        question: "Hiện tượng giọt nước mưa hoặc tuyết tan đọng trên bề mặt màn hình cảm ứng ô tô (Water Droplet False Touches) được chip điều khiển giải quyết bằng thuật toán nào?",
        options: [
          "A. Tự động phóng tia lửa điện để làm bốc hơi giọt nước.",
          "B. Thuật toán phân biệt điện dung tương hỗ và tự thân (Mutual vs Self Capacitance): Nhận diện hình dạng tĩnh của giọt nước để loại bỏ hoàn toàn các điểm chạm ma (Ghost touches) và chỉ kích hoạt khi có lực ấn thực của ngón tay.",
          "C. Tắt toàn bộ màn hình khi trời mưa.",
          "D. Đổi phông chữ sang màu xanh nước biển."
        ],
        answer: 1,
        explanation: "Nước là chất dẫn điện dễ kích hoạt cảm ứng nhầm. Chip ô tô phân tích điện tích đa chiều để 'nhìn thấy' đâu là vũng nước đọng tĩnh và đâu là ngón tay người thực tế đang di chuyển."
      },
      {
        id: 8,
        question: "Quy chuẩn độ bền nhiệt độ 'Automotive Grade AEC-Q100 Grade 2 / Grade 1' đối với linh kiện vi xử lý HMI ô tô yêu cầu dải nhiệt độ hoạt động khắc nghiệt là bao nhiêu?",
        options: [
          "A. 0°C đến 40°C (chuẩn phòng máy lạnh gia đình).",
          "B. Từ -40°C đến +105°C (hoặc +125°C cho khoang máy), đảm bảo chiếc xe nổ máy an toàn cả giữa sa mạc nắng gắt 50°C lẫn mùa đông lạnh giá ở Siberia.",
          "C. Trên 1.000°C.",
          "D. Chỉ hoạt động ở nhiệt độ phòng 25°C."
        ],
        answer: 1,
        explanation: "Mùa hè phơi xe ngoài nắng, nhiệt độ táp-lô có thể vọt lên 85-90°C biến khoang xe thành lò thiêu. Chip điện thoại thông thường sẽ sập nguồn bảo vệ ngay lập tức; chip ô tô bắt buộc phải chịu được 105°C liên tục."
      },
      {
        id: 9,
        question: "Lớp phủ 'Anti-Fingerprint / Oleophobic' (Chống bám vân tay và dầu mỡ) trên kính màn hình cảm ứng ô tô giúp ích gì cho khả năng quan sát dưới trời nắng?",
        options: [
          "A. Giúp kính màn hình không bao giờ bị vỡ.",
          "B. Ngăn chặn các vệt dầu mồ hôi tay in hằn trên kính; các vết dầu mỡ này dưới ánh nắng mặt trời chiếu vào sẽ tán xạ thành một lớp sương mù trắng xóa che khuất hoàn toàn nội dung hiển thị bên dưới.",
          "C. Làm cho ngón tay có mùi thơm.",
          "D. Giảm lượng tiêu thụ điện của đèn nền."
        ],
        answer: 1,
        explanation: "Dấu vân tay bám đầy trên màn hình kính bóng là thủ phạm số 1 gây lóa mắt khi có nắng rọi vào. Lớp phủ kỵ dầu (Oleophobic) giúp dầu mỡ không bám dính và dễ dàng lau sạch chỉ bằng một lần quẹt khăn."
      },
      {
        id: 10,
        question: "Thách thức hiện tượng 'Lưu ảnh vĩnh viễn' (Burn-in) của màn hình OLED trên ô tô đối với các biểu tượng an toàn tĩnh (như vạch pin, đồng hồ tốc độ) được HMI khắc phục bằng kỹ thuật nào?",
        options: [
          "A. Không bao giờ hiển thị đồng hồ tốc độ.",
          "B. Kỹ thuật dịch chuyển điểm ảnh vi mô (Pixel Shifting theo chu kỳ vài phút), làm mờ cục bộ các biểu tượng tĩnh khi không đổi trạng thái và thuật toán cân bằng bù trừ độ suy thoái của điểm ảnh theo thời gian thực.",
          "C. Tắt màn hình sau mỗi 10 giây sử dụng.",
          "D. Đổi toàn bộ màn hình sang màu trắng sáng."
        ],
        answer: 1,
        explanation: "Biểu tượng pin hay số 0 km/h sáng cố định hàng nghìn giờ dễ làm cháy điểm ảnh hữu cơ OLED. Pixel Shifting âm thầm dịch chuyển đồ họa đi 1-2 pixel mà mắt không nhận ra, chia đều tải phát quang cho các cell xung quanh."
      },
      {
        id: 11,
        question: "Trong điều kiện bão cát sa mạc hoặc bụi công trường xây dựng, tiêu chuẩn bảo vệ chống bụi và nước (Ingress Protection - IP Rating) cho màn hình cụm điều khiển xe công trình/bán tải thường yêu cầu tối thiểu là:",
        options: [
          "A. IP00 (không có bảo vệ gì).",
          "B. Tối thiểu IP65 cho bề mặt trước (chống bụi cát xâm nhập tuyệt đối 100% và chống được tia nước xịt áp lực khi công nhân vệ sinh nội thất xe).",
          "C. IP20.",
          "D. Không có tiêu chuẩn đo lường."
        ],
        answer: 1,
        explanation: "Bụi cát lọt vào khe màn hình có thể gây kẹt cảm ứng và mài mòn vi mạch. Tiêu chuẩn IP65 mặt trước đảm bảo xe off-road lội bùn hoặc rửa xe bằng vòi xịt nước không bị chập cháy."
      },
      {
        id: 12,
        question: "Hiện tượng sốc nhiệt (Thermal Shock) xảy ra khi nào đối với màn hình ô tô và đòi hỏi giải pháp thiết kế gì?",
        options: [
          "A. Khi người lái xe bị cảm sốt.",
          "B. Khi chiếc xe đỗ ngoài trời tuyết -20°C rồi người lái bật sưởi cực đại khiến nhiệt độ cabin tăng vọt lên +30°C trong 10 phút; vật liệu kính và khung nhôm phải có hệ số giãn nở nhiệt (CTE) đồng điệu để không bị nứt vỡ kính do chênh lệch co ngót.",
          "C. Khi xe chạy qua đường hầm.",
          "D. Khi mở đài radio quá to."
        ],
        answer: 1,
        explanation: "Co ngót không đều giữa khung kim loại và mặt kính khi nhiệt độ thay đổi đột ngột có thể làm nứt toác tấm kính cường lực đắt tiền. Kỹ sư phải dùng keo dán đàn hồi hấp thụ biến dạng nhiệt."
      },
      {
        id: 13,
        question: "Chế độ hiển thị 'High Contrast Mode' (Chế độ tương phản siêu cao) trên HMI ô tô được kích hoạt khi nào để hỗ trợ người lái?",
        options: [
          "A. Khi xe chuẩn bị hết pin.",
          "B. Khi cảm biến ánh sáng phát hiện xe đang đi trong điều kiện bão tuyết trắng trời (Whiteout) hoặc sương mù dày đặc; giao diện chuyển sang phông chữ nét đậm đen trên nền vàng tương phản cực đại để mắt dễ nhận diện.",
          "C. Chỉ dùng khi chơi game trên xe.",
          "D. Bắt buộc tài xế phải nộp tiền để mở khóa."
        ],
        answer: 1,
        explanation: "Tầm nhìn trắng xóa do bão tuyết làm mắt bị mỏi và giảm khả năng phân biệt sắc độ xám. Chế độ tương phản cao tối ưu hóa thị giác giúp thông tin cứu sinh nổi bật rõ ràng."
      },
      {
        id: 14,
        question: "Màn hình ô tô trang bị tấm nền phân cực tròn (Circular Polarizer) giải quyết triệt để vấn đề gì cho tài xế đeo kính râm phân cực?",
        options: [
          "A. Giúp kính mát không bị rơi khi phanh gấp.",
          "B. Ánh sáng phát ra từ màn hình được xoắn tròn quang học, giúp tài xế nghiêng đầu sang trái hay sang phải ở bất kỳ góc độ nào đều nhìn thấy màn hình sáng rõ 100%, không bao giờ bị hiện tượng 'màn hình đen thui' như tấm phân cực tuyến tính.",
          "C. Làm cho kính mát biến thành kính 3D.",
          "D. Tự động lau sạch kính mát của tài xế."
        ],
        answer: 1,
        explanation: "Phân cực tròn (Circular Polarization) là tiêu chuẩn vàng của màn hình ô tô hiện đại: Bất kể tài xế đeo loại kính mát phân cực nào hay nghiêng đầu góc bao nhiêu, hình ảnh vẫn luôn sáng rõ tuyệt đối."
      },
      {
        id: 15,
        question: "Tác động của bức xạ tia cực tím mặt trời (UV Degradation) lên chất liệu nhựa và màn hình HMI sau 10 năm phơi nắng được kiểm soát bằng cách:",
        options: [
          "A. Dán giấy báo lên che màn hình khi đỗ xe.",
          "B. Tích hợp các chất ổn định ánh sáng amine cản trở (HALS) và phụ gia hấp thụ tia UV trực tiếp vào lớp kính bảo vệ bên ngoài, ngăn chặn hiện tượng ố vàng, giòn gãy nhựa và thoái hóa quang học của tấm nền hiển thị.",
          "C. Đưa xe vào ga-ra tối vĩnh viễn.",
          "D. Sơn một lớp sơn đen lên mặt kính."
        ],
        answer: 1,
        explanation: "Tia UV mặt trời bẻ gãy các liên kết polyme của nhựa và keo dán màn hình sau vài năm nắng nóng. Lớp hấp thụ UV trong kính cường lực bảo vệ nội thất xe bền đẹp suốt vòng đời 15-20 năm."
      }
    ]
  },
  {
    id: 25,
    title: "Bài 25: Trải Nghiệm HMI Khi Dừng Đỗ & Chế Độ Đặc Biệt (Parked Modes)",
    badge: "Stationary & Camp Modes",
    category: "ev",
    description: "Các chế độ chuyên biệt của xe điện: Camp Mode (Cắm trại), Dog/Pet Mode (Bảo vệ thú cưng), Car Wash Mode (Rửa xe) và phòng làm việc di động (Mobile Office).",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Chế độ 'Dog Mode / Pet Mode' (Chế độ thú cưng) trên xe điện giải quyết bài toán nhân văn và an toàn nào khi chủ xe cần rời xe trong chốc lát?",
        options: [
          "A. Huấn luyện chó biết tự lái xe đi dạo.",
          "B. Duy trì hệ thống điều hòa nhiệt độ mát mẻ an toàn trong cabin cho thú cưng, đồng thời hiển thị thông điệp chữ lớn trên màn hình trung tâm cho người đi đường nhìn thấy: 'Chủ nhân tôi sẽ quay lại sớm. Nhiệt độ trong xe đang rất dễ chịu: 21°C' để họ không hoảng sợ đập vỡ kính xe cứu hộ.",
          "C. Tự động phát tiếng chó sủa qua loa ngoài.",
          "D. Khóa thú cưng vào cốp xe phía sau."
        ],
        answer: 1,
        explanation: "Mỗi năm có rất nhiều vụ đập vỡ kính xe cứu chó vì người ngoài tưởng thú cưng bị ngạt thở trong xe đóng kín. Thông báo Dog Mode trên màn hình giải tỏa hiểu lầm và bảo vệ mạng sống cho vật nuôi."
      },
      {
        id: 2,
        question: "Khi kích hoạt 'Camp Mode' (Chế độ cắm trại qua đêm) trên xe điện, hệ thống HMI sẽ cấu hình các tính năng trong cabin như thế nào?",
        options: [
          "A. Tự động tắt ngấm toàn bộ điện và khóa cứng tất cả cửa sổ.",
          "B. Duy trì luồng gió điều hòa nhiệt độ êm dịu suốt đêm từ pin cao áp, cấp điện liên tục cho các cổng USB/ổ cắm 12V/220V, tắt màn hình sáng chói (hoặc chuyển sang màn hình lò sưởi ấm áp), và giữ cho xe không tự động tắt máy.",
          "C. Tự động dựng một chiếc lều bạt trên nóc xe.",
          "D. Bật đèn pha chiếu xa liên tục suốt đêm."
        ],
        answer: 1,
        explanation: "Xe điện là chiếc lều cắm trại 5 sao: Không có khí thải CO độc hại như xe xăng nên có thể ngủ trong xe bật điều hòa cả đêm. Camp mode giữ nhiệt độ hoàn hảo và tắt các đèn gây chói mắt để bạn ngủ ngon."
      },
      {
        id: 3,
        question: "Chế độ 'Car Wash Mode' (Chế độ rửa xe tự động) chuẩn bị chiếc xe trước khi đi vào dây chuyền rửa xe tự động chỉ với 1 chạm bằng cách:",
        options: [
          "A. Tự động phun bọt xà phòng từ trong xe ra ngoài.",
          "B. Đóng kín toàn bộ cửa kính và cửa sổ trời, khóa nắp cổng sạc, tắt cần gạt nước tự động (tránh gạt nước bị chổi cọ quét gãy), tắt cảm biến đỗ xe (tránh chuông kêu inh ỏi) và cho phép xe về số N (Mo) trượt tự do trên băng chuyền.",
          "C. Tự động mở toang tất cả các cánh cửa xe.",
          "D. Tăng công suất động cơ lên tối đa."
        ],
        answer: 1,
        explanation: "Nếu quên tắt gạt nước tự động khi vào hầm rửa xe, chổi cọ quét ngang sẽ giật gãy ngay cần gạt; quên đóng nắp sạc thì nước xịt vào cổng điện. Car Wash Mode 1 chạm hoàn thành 10 thao tác an toàn chỉ trong 1 giây."
      },
      {
        id: 4,
        question: "Tính năng 'Romance Mode / Lò sưởi ảo' trên màn hình Tesla hoặc xe điện hiện đại mang lại giá trị trải nghiệm gì?",
        options: [
          "A. Tự động kết nối ứng dụng hẹn hò Tinder.",
          "B. Hiển thị hình ảnh ngọn lửa lò sưởi bập bùng với tiếng củi cháy tí tách qua dàn loa và điều hòa phả ra luồng gió ấm áp, tạo nên không gian lãng mạn, ấm cúng khi dừng đỗ nghỉ ngơi cùng người thương.",
          "C. Đốt lửa thật trong cabin xe.",
          "D. Tự động đổi màu sơn ngoại thất xe."
        ],
        answer: 1,
        explanation: "Một tính năng vui nhộn mang đậm cảm xúc (Emotional design): Biến chiếc xe thành một căn nhà gỗ ấm cúng giữa trời đông tuyết giá, đem lại niềm vui và sự thích thú cho chủ xe."
      },
      {
        id: 5,
        question: "Trải nghiệm 'Gaming in Car' (Chơi game trong xe bằng vô-lăng và bàn đạp thực tế) đòi hỏi biện pháp an toàn phần mềm HMI nào?",
        options: [
          "A. Cho phép chơi game khi xe đang chạy 100 km/h trên cao tốc.",
          "B. Tính năng game chỉ được phép khởi chạy DUY NHẤT khi xe đang ở trạng thái đỗ P (Parking) và ngắt kết nối hoàn toàn bánh xe vật lý (Steer-by-wire disconnect) để việc vần vô lăng chơi game không làm mòn lốp xe hay di chuyển xe trên thực tế.",
          "C. Bắt buộc tài xế phải tháo rời vô-lăng mang ra ngoài.",
          "D. Chỉ được chơi game khi xe đã hết sạch pin."
        ],
        answer: 1,
        explanation: "Khóa an toàn phần mềm tuyệt đối: Xe bắt buộc phải ở số P. Hệ thống lái ngắt liên kết cơ học với bánh trước để tài xế có thể đánh lái kịch liệt trong game đua xe mà bánh xe thực tế dưới gầm không hề bị nghiến mòn mặt đường."
      },
      {
        id: 6,
        question: "Chế độ 'Mobile Office / Trạm làm việc di động' trên xe điện hỗ trợ người dùng làm việc trong xe qua những tiện ích HMI nào?",
        options: [
          "A. In các tập hồ sơ tài liệu ra giấy tự động.",
          "B. Bàn làm việc gập mở, kết nối Wi-Fi 5G tốc độ cao, camera góc rộng trên gương phục vụ họp trực tuyến Zoom/Teams trên màn hình trung tâm, và nguồn điện 220V sạc laptop công suất cao.",
          "C. Tự động gửi thư từ qua đường bưu điện.",
          "D. Đổi ghế lái thành máy photocopy."
        ],
        answer: 1,
        explanation: "Khoang cabin xe điện cách âm hoàn hảo biến thành phòng họp di động riêng tư nhất thế giới: Bạn có thể vừa sạc xe vừa họp trực tuyến qua màn hình lớn với hình ảnh và âm thanh sắc nét chuyên nghiệp."
      },
      {
        id: 7,
        question: "Cơ chế 'Clean Screen Mode / Chế độ lau chùi màn hình' trên giao diện HMI có tác dụng gì?",
        options: [
          "A. Phun nước rửa kính từ trong màn hình ra ngoài.",
          "B. Tạm thời vô hiệu hóa toàn bộ khả năng nhận diện cảm ứng và làm tối màn hình trong 30 giây để người dùng dùng khăn lau sạch dấu vân tay và bụi bẩn mà không vô tình kích hoạt các nút bấm trên màn hình.",
          "C. Làm cho màn hình tự động quay vòng tròn.",
          "D. Xóa sạch toàn bộ hệ điều hành của xe."
        ],
        answer: 1,
        explanation: "Nếu không có chế độ này, khi bạn lấy khăn lau màn hình, chiếc khăn sẽ bấm loạn xạ vào các nút gọi điện, đổi điều hòa hay mở cốp xe. Khóa cảm ứng 30 giây giúp lau sạch màn hình thoải mái."
      },
      {
        id: 8,
        question: "Tính năng 'Jack Mode / Chế độ kích xe thay lốp' trên xe trang bị hệ thống treo khí nén (Air Suspension) được kích hoạt qua HMI nhằm mục đích:",
        options: [
          "A. Tự động biến xe thành chiếc máy bay.",
          "B. Khóa cứng và vô hiệu hóa van tự động cân bằng của hệ thống treo khí nén, ngăn không cho xe tự động bơm hơi hạ gầm khi thợ sửa chữa đang dùng kích nâng một góc xe lên để thay lốp (tránh làm lật xe khỏi kích).",
          "C. Tự động vá lốp xe bằng keo dán.",
          "D. Tăng tốc độ quay của bánh xe."
        ],
        answer: 1,
        explanation: "Khi kích xe lên, cảm biến tưởng xe bị nghiêng nên sẽ tự động xả hoặc bơm bóng hơi để lấy lại thăng bằng, khiến chiếc xe bị trượt khỏi kích gây sập gầm đè bẹp thợ sửa. Jack Mode khóa chặt bóng hơi để nâng xe an toàn."
      },
      {
        id: 9,
        question: "Chế độ 'Transport Mode / Chế độ vận chuyển' trên xe ô tô được các hãng sản xuất kích hoạt trong tình huống nào?",
        options: [
          "A. Khi chở hành khách đi du lịch.",
          "B. Khi chiếc xe được vận chuyển bằng tàu biển hoặc xe chuyên dụng từ nhà máy đến đại lý: Hệ thống ngắt hầu hết các cảm biến và mạch điện tử tiêu thụ ngầm để bảo toàn bình ắc quy không bị chết sau nhiều tháng lênh đênh trên biển.",
          "C. Khi xe tham gia giải đua tốc độ.",
          "D. Để xe có thể tự động bơi dưới nước."
        ],
        answer: 1,
        explanation: "Transport mode đưa chiếc xe vào trạng thái 'ngủ đông sâu' (Deep sleep): Màn hình tắt, chìa khóa thông minh tạm ngưng hoạt động để dòng rò ắc quy về gần bằng 0, đảm bảo khi đến tay đại lý xe vẫn đề nổ bình thường."
      },
      {
        id: 10,
        question: "Ứng dụng 'Karaoke trong xe' (như CaraCoKe trên xe điện hiện đại) cần tuân thủ quy tắc an toàn hiển thị nào khi xe chuyển bánh?",
        options: [
          "A. Vẫn hiển thị lời bài hát chữ chạy to rõ cho tài xế vừa lái vừa đọc hát theo.",
          "B. Khi xe lăn bánh (vận tốc > 0 km/h), chữ chạy lời bài hát (Lyrics) trên màn hình trung tâm của tài xế BẮT BUỘC phải bị ẩn đi hoặc làm mờ, chỉ cho phép hiển thị lời trên màn hình ghế phụ hoặc ghế sau.",
          "C. Tắt toàn bộ micro không dây của hành khách.",
          "D. Bắt buộc tài xế phải hát đúng cao độ."
        ],
        answer: 1,
        explanation: "Đọc lời karaoke khi đang lái xe là hành vi xao nhãng thị giác chết người. Chức năng an toàn tự động tắt lời bài hát trên màn hình lái khi xe chạy, chỉ cho phép hành khách hát theo lời trên màn hình của họ."
      },
      {
        id: 11,
        question: "Khi xe đang sạc pin công cộng ngoài trời mưa gió, tính năng 'Cabin Pre-conditioning via App' (Bật điều hòa từ xa trước khi ra xe) mang lại lợi ích trải nghiệm vượt trội nào?",
        options: [
          "A. Làm sạch bùn đất bám ngoài lốp xe.",
          "B. Người dùng bật sưởi ghế, sưởi ấm vô-lăng và sấy tan băng tuyết trên kính lái từ trong nhà ấm áp qua điện thoại; khi bước ra xe không gian đã ấm áp hoàn hảo và kính trong suốt sẵn sàng lăn bánh ngay.",
          "C. Tự động thanh toán tiền bảo hiểm xe.",
          "D. Tự động rửa sạch gầm xe."
        ],
        answer: 1,
        explanation: "Vào mùa đông, cạo băng tuyết trên kính lái mất 15 phút buốt cóng tay. Bật điều hòa trước qua app dùng chính nguồn điện lưới của trụ sạc để làm tan băng và ấm ghế, không tốn 1 giọt pin dự trữ của xe."
      },
      {
        id: 12,
        question: "Chế độ 'Showroom Mode / Chế độ trưng bày đại lý' trên xe ô tô có đặc điểm phần mềm nào?",
        options: [
          "A. Cho phép khách hàng lái thử xe đâm xuyên tường đại lý.",
          "B. Cho phép khách hàng khám phá toàn bộ màn hình, nghe nhạc thử loa và trải nghiệm giao diện HMI nhưng vô hiệu hóa hoàn toàn khả năng nổ máy, gài số di chuyển xe và khóa chức năng mua hàng trực tuyến.",
          "C. Tự động phát video quảng cáo của đối thủ cạnh tranh.",
          "D. Tắt toàn bộ đèn chiếu sáng trong xe."
        ],
        answer: 1,
        explanation: "Tại showroom trưng bày, hàng trăm khách hàng và trẻ em trèo lên xe bấm nghịch. Showroom mode đảm bảo dù có đạp chân ga hay bấm nút khởi động thì xe cũng không thể lao về phía trước gây tai nạn."
      },
      {
        id: 13,
        question: "Tính năng 'Frunk & Trunk Remote Pop' (Mở cốp trước và cốp sau từ xa) trên HMI ứng dụng di động hiển thị đồ họa cảnh báo an toàn nào?",
        options: [
          "A. Không cần cảnh báo an toàn.",
          "B. Hiển thị hình ảnh mô phỏng mở nắp cốp theo thời gian thực và yêu cầu thao tác nhấn giữ (Long-press) hoặc trượt để xác nhận, tránh việc người dùng vô tình chạm nhầm mở toang cốp xe khi đang để xe ngoài trời mưa.",
          "C. Tự động chụp ảnh đồ đạc trong cốp gửi lên mạng.",
          "D. Phát âm thanh tiếng nổ lớn."
        ],
        answer: 1,
        explanation: "Thao tác mở cốp từ xa phải dùng cơ chế chống chạm nhầm (Press and hold / Slide to open). Nếu chỉ chạm 1 lần vô tình trong túi quần mà cốp sau tự mở toang giữa trời mưa bão thì toàn bộ đồ đạc sẽ bị ướt sũng."
      },
      {
        id: 14,
        question: "Chế độ 'Towing Mode / Chế độ kéo rơ-moóc / cứu hộ' trên màn hình xe điện cấu hình những hệ thống nào?",
        options: [
          "A. Tự động tháo rời các bánh xe.",
          "B. Vô hiệu hóa cảm biến lùi phía sau (tránh chuông báo động do rơ-moóc cản trở), mở khóa phanh tay điện tử cho phép bánh xe quay tự do trên sàn xe cứu hộ, và điều chỉnh thuật toán ước tính quãng đường DTE theo tải trọng kéo nặng.",
          "C. Tăng công suất âm thanh loa ngoài lên gấp ba.",
          "D. Khóa cứng toàn bộ hệ thống lái."
        ],
        answer: 1,
        explanation: "Kéo theo rơ-moóc hoặc cẩu xe cứu hộ đòi hỏi tắt các cảm biến cảnh báo phía sau và ngắt phanh điện tử để xe lăn bánh lên sàn xe tải mà không làm cháy mô-tơ điện."
      },
      {
        id: 15,
        question: "Trải nghiệm 'Relaxation Mode / Ghế không trọng lực' (Zero Gravity Seat) khi xe dừng nghỉ kích hoạt chuỗi tác vụ HMI nào chỉ với 1 chạm?",
        options: [
          "A. Đẩy ghế lái dựng đứng 90 độ.",
          "B. Ghế lái tự động trượt lùi về sau, nâng bệ đỡ bắp chân, ngả lưng ghế tạo góc 120-130° mô phỏng tư thế phi hành gia không trọng lực của NASA, đồng thời hạ rèm che nắng, phát nhạc thiền êm dịu và giảm độ sáng màn hình.",
          "C. Tự động mở cửa xe bên ngoài.",
          "D. Tắt máy xe vĩnh viễn."
        ],
        answer: 1,
        explanation: "Tư thế Zero Gravity giúp phân bổ đều trọng lượng cơ thể, giải phóng áp lực lên cột sống và khớp gối. HMI đồng bộ chuyển động cơ học của ghế với âm thanh và ánh sáng tạo nên giấc ngủ trưa hồi phục năng lượng hoàn hảo."
      }
    ]
  },
  {
    id: 26,
    title: "Bài 26: Phương Pháp Đo Lường & Kiểm Thử HMI Ô Tô (Testing & Validation)",
    badge: "Testing & Validation",
    category: "auto",
    description: "Kiểm thử trên buồng lái mô phỏng (Driving Simulators), Occlusion Test ISO 16673, Eye-tracking metrics, NASA-TLX và đánh giá Heuristic chuyên gia.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Thiết bị buồng lái mô phỏng chuyển động hoàn chỉnh (High-Fidelity Motion Driving Simulator) mang lại giá trị kiểm thử HMI vượt trội nào so với thử nghiệm trên đường thực tế?",
        options: [
          "A. Chi phí mua buồng lái rẻ hơn một chiếc xe đạp.",
          "B. Cho phép thử nghiệm an toàn tuyệt đối các tình huống cực kỳ nguy hiểm (ngủ gật, phanh khẩn cấp trước người đi bộ, lỗi phần mềm đột ngột) với khả năng tái lặp 100% kịch bản môi trường giao thông và đo đạc dữ liệu chuẩn xác từng mili-giây.",
          "C. Không cần có người tham gia thử nghiệm.",
          "D. Bắt buộc phải thử nghiệm ngoài trời mưa."
        ],
        answer: 1,
        explanation: "Bạn không thể mạo hiểm cho người dùng vừa lái xe thật ở 100km/h trên đường cao tốc vừa thử bấm một menu lỗi để xem họ có đâm xe hay không. Buồng lái mô phỏng tái tạo độ rung lắc chân thực nhưng an toàn tuyệt đối cho con người."
      },
      {
        id: 2,
        question: "Phương pháp 'Occlusion Method' theo chuẩn ISO 16673 quy định chỉ số TSOT (Total Shutter Open Time) tối đa cho một tác vụ trên màn hình ô tô để được coi là đạt chuẩn là:",
        options: [
          "A. Dưới 60 giây.",
          "B. Dưới 12.0 giây (và trung bình số lần liếc nhìn R (Total Number of Glances) không vượt quá 8 lần).",
          "C. Không giới hạn thời gian.",
          "D. Phải mất đúng 5 phút."
        ],
        answer: 1,
        explanation: "Chuẩn ISO 16673 và NHTSA: Một tác vụ đòi hỏi người lái mở mắt nhìn màn hình tích lũy vượt quá 12 giây trong bài test kính chớp mắt Occlusion bị xếp loại là nguy hiểm và không được phép đưa vào xe thương mại."
      },
      {
        id: 3,
        question: "Chỉ số 'Mean Single Glance Duration' (Thời lượng trung bình của một lần liếc mắt) của tài xế vào màn hình HMI khi xe đang chạy theo tiêu chuẩn an toàn phải:",
        options: [
          "A. Không được vượt quá 1.6 đến 2.0 giây cho mỗi lần liếc nhìn.",
          "B. Càng lâu càng tốt (trên 10 giây).",
          "C. Phải mất ít nhất 30 giây để đọc kỹ văn bản.",
          "D. 0.001 mili-giây."
        ],
        answer: 0,
        explanation: "Mỗi lần liếc nhìn quá 2.0 giây làm tăng nguy cơ tai nạn lên gấp 24 lần. Giao diện xe hơi chuẩn phải được thiết kế dạng 'Glanceable UI' để tài xế nắm bắt thông tin chỉ trong 0.5 - 1.2 giây mỗi lần liếc."
      },
      {
        id: 4,
        question: "Thiết bị kính đeo theo dõi chuyển động mắt (Eye-Tracking Glasses) trong nghiên cứu HMI ô tô ghi lại những chỉ số hành vi then chốt nào?",
        options: [
          "A. Độ dài của lông mi tài xế.",
          "B. Bản đồ nhiệt vùng chú ý (Heatmap), Tọa độ điểm nhìn cố định (Fixations), Chuyển động nhảy mắt nhanh (Saccades), và Tỷ lệ phần trăm thời gian nhìn ra mặt đường (Percent Road Center - PRC).",
          "C. Nhịp thở của hành khách ngồi ghế phụ.",
          "D. Độ ẩm của không khí trong xe."
        ],
        answer: 1,
        explanation: "Eye-tracking bóc trần sự thật khách quan: Kỹ sư biết chính xác mắt tài xế nhìn vào nút bấm trong bao nhiêu mili-giây, có bị lạc mắt tìm kiếm (Saccade searching) không và tỷ lệ tập trung vào tâm làn đường PRC có bị suy giảm không."
      },
      {
        id: 5,
        question: "Thử nghiệm 'Lane Change Test' (LCT - ISO 26022) đánh giá sự xao nhãng của HMI dựa trên thước đo hiệu suất lái xe nào?",
        options: [
          "A. Số lít xăng tiêu thụ trong bài test.",
          "B. Độ sai lệch trung bình so với quỹ đạo chuyển làn chuẩn (Mean Deviation - MDEV) và Khoảng cách phản ứng từ lúc nhìn thấy biển báo chuyển làn đến lúc bắt đầu đánh lái.",
          "C. Độ mòn của lốp xe sau 10 vòng chạy.",
          "D. Số lần người tham gia bấm còi."
        ],
        answer: 1,
        explanation: "Nếu một giao diện HMI tồi tệ làm người lái phân tâm, họ sẽ nhìn thấy biển báo chuyển làn muộn hơn, đánh lái giật cục và quỹ đạo xe bị uốn lượn sai lệch lớn so với đường chuẩn (MDEV tăng cao)."
      },
      {
        id: 6,
        question: "Thang đo tải nhận thức chủ quan 'NASA-TLX' (Task Load Index) sau khi người dùng thực hiện một tác vụ HMI ô tô đo lường 6 khía cạnh nào?",
        options: [
          "A. Chiều cao, cân nặng, huyết áp, nhóm máu, tuổi tác và giới tính.",
          "B. Yêu cầu trí óc (Mental Demand), Yêu cầu thể chất (Physical), Áp lực thời gian (Temporal), Hiệu suất tự đánh giá (Performance), Nỗ lực bỏ ra (Effort) và Mức độ bực bội/ức chế (Frustration).",
          "C. 6 bài hát được nghe nhiều nhất trong tuần.",
          "D. 6 hãng xe ô tô nổi tiếng nhất thế giới."
        ],
        answer: 1,
        explanation: "NASA-TLX cho biết cảm nhận bên trong não bộ của tài xế: Liệu tác vụ chỉnh bản đồ vừa rồi có làm họ cảm thấy căng thẳng trí óc, vội vã về thời gian hay bực bội ức chế (Frustration cao) hay không."
      },
      {
        id: 7,
        question: "Phương pháp 'Wizard of Oz' trong thử nghiệm nguyên mẫu HMI sơ khai (Early Prototype Testing) có nghĩa là gì?",
        options: [
          "A. Mời các ảo thuật gia đến biểu diễn cho tài xế xem.",
          "B. Một kỹ sư ngồi bí mật ở ghế sau hoặc phòng điều khiển từ xa đóng vai làm 'trí tuệ nhân tạo' tự động bấm nút phản hồi kịch bản cho người dùng trải nghiệm thực tế trước khi đội ngũ lập trình bắt tay vào viết code thực sự tốn kém.",
          "C. Kiểm thử phần mềm bằng trí tuệ nhân tạo hoàn toàn.",
          "D. Chỉ thử nghiệm trên xe mô hình đồ chơi trẻ em."
        ],
        answer: 1,
        explanation: "Wizard of Oz giúp kiểm chứng trải nghiệm người dùng với chi phí cực rẻ: Kỹ sư đóng giả làm trợ lý giọng nói để xem người dùng phản ứng ra sao với các câu thoại trước khi đầu tư hàng triệu USD phát triển AI."
      },
      {
        id: 8,
        question: "Quy tắc của Jakob Nielsen về số lượng người tham gia thử nghiệm khả dụng (Usability Testing Sample Size) áp dụng cho HMI ô tô khuyến nghị bao nhiêu người trong một nhóm đối tượng đại diện?",
        options: [
          "A. 1 người duy nhất.",
          "B. Khoảng 5 đến 8 người dùng đại diện cho mỗi nhóm nhân khẩu học chính để phát hiện ra trên 85% các lỗi thiết kế nghiêm trọng nhất.",
          "C. Phải có ít nhất 1.000.000 người tham gia.",
          "D. Không cần thử nghiệm trên con người."
        ],
        answer: 1,
        explanation: "Thử nghiệm với 5 người dùng đại diện phát hiện ra phần lớn các lỗi giao diện then chốt. Thay vì dồn tiền thử 50 người 1 lần, hãy chia nhỏ thành nhiều đợt thử nghiệm 5 người để lặp vòng cải tiến liên tục."
      },
      {
        id: 9,
        question: "Hiện tượng 'Simulator Sickness' (Say buồng lái mô phỏng) của người tham gia thử nghiệm HMI xảy ra do nguyên nhân công nghệ nào?",
        options: [
          "A. Do ghế ngồi quá cứng.",
          "B. Độ trễ hình ảnh (Visual Latency) giữa vô-lăng và màn hình chiếu lớn hơn 20-30ms, hoặc buồng lái tĩnh không chuyển động trong khi mắt nhìn thấy cảnh vật đường phố trôi vút qua, gây xung đột tiền đình.",
          "C. Do phòng thí nghiệm quá lạnh.",
          "D. Do tiếng ồn của máy tính."
        ],
        answer: 1,
        explanation: "Say buồng lái mô phỏng là kẻ thù của nghiên cứu HMI: Nếu độ trễ kết xuất đồ họa bị chậm vài chục mili-giây so với cú đánh lái, người tham gia sẽ bị chóng mặt, toát mồ hôi hột và nôn nao sau 10 phút lái xe."
      },
      {
        id: 10,
        question: "Chỉ số 'SUS' (System Usability Scale) sau khi người dùng đánh giá hệ thống HMI xe hơi đạt điểm số bao nhiêu thì được coi là đạt chuẩn 'Tốt / Xuất sắc' (Good to Excellent)?",
        options: [
          "A. Dưới 40 điểm.",
          "B. Trên 68 điểm là mức trung bình chuẩn, trên 80 điểm được xếp loại Tốt và trên 85 điểm là Xuất sắc (Top 10% thế giới).",
          "C. Đúng 10 điểm.",
          "D. Thang điểm SUS không có điểm số tối đa."
        ],
        answer: 1,
        explanation: "Mốc 68 điểm là chuẩn ngành (Benchmark). Một hệ thống HMI xe hơi mới xuất xưởng nếu có điểm SUS dưới 68 điểm bị coi là dưới mức trung bình và cần được thiết kế lại giao diện."
      },
      {
        id: 11,
        question: "Phương pháp đánh giá chuyên gia 'Heuristic Evaluation' áp dụng cho HMI xe hơi cần được thực hiện bởi ai?",
        options: [
          "A. Các em học sinh tiểu học.",
          "B. Từ 3 đến 5 chuyên gia công thái học và chuyên gia UX/UI độc lập có am hiểu sâu sắc về các tiêu chuẩn an toàn ô tô (như ISO 15005, NHTSA) kiểm tra chéo hệ thống dựa trên bộ nguyên tắc khả dụng chuẩn.",
          "C. Bất kỳ ai đi ngang qua nhà máy.",
          "D. Chỉ do giám đốc điều hành của hãng xe tự chấm điểm."
        ],
        answer: 1,
        explanation: "Đánh giá Heuristic của chuyên gia giúp quét sạch 70% lỗi xao nhãng cơ bản trước khi đưa hệ thống ra thử nghiệm tốn kém trên người dùng thực tế."
      },
      {
        id: 12,
        question: "Chỉ số 'Time-to-First-Glance' (Thời gian đến cái liếc mắt đầu tiên) trong nghiên cứu HMI cảnh báo khẩn cấp đo lường điều gì?",
        options: [
          "A. Thời gian từ lúc mua xe đến lúc người lái rửa xe lần đầu.",
          "B. Khoảng thời gian từ khi hệ thống kích hoạt cảnh báo nguy hiểm (ví dụ đèn báo điểm mù sáng lên) đến khi mắt của tài xế chuyển hướng nhìn tới thành phần cảnh báo đó, phản ánh mức độ nổi bật (Salience) của tín hiệu.",
          "C. Tốc độ quay của bánh xe trước.",
          "D. Thời gian mở máy của camera lùi."
        ],
        answer: 1,
        explanation: "Nếu cảnh báo sáng lên mà 3 giây sau mắt tài xế mới chú ý nhìn tới (Time-to-first-glance quá dài), tín hiệu đó đã thất bại trong việc thu hút sự chú ý và không đủ điều kiện an toàn phản ứng khẩn cấp."
      },
      {
        id: 13,
        question: "Quy trình thử nghiệm 'Drive-by-Wire Hardware-in-the-Loop' (HIL) kết hợp HMI giúp ích gì trước khi sản xuất hàng loạt?",
        options: [
          "A. Giúp giảm chi phí mua dây điện thoại.",
          "B. Kết nối màn hình hiển thị HMI thực tế với máy tính mô phỏng toàn bộ phần cứng cảm biến, động cơ và mạng xe thời gian thực để kiểm chứng khả năng xử lý hàng triệu gói tin dữ liệu mà không bị treo đơ hay giật khung hình.",
          "C. Dùng để in hướng dẫn sử dụng xe ra giấy.",
          "D. Chỉ dùng để kiểm tra độ bóng của vỏ xe."
        ],
        answer: 1,
        explanation: "HIL testing kiểm tra độ bền bỉ của phần mềm HMI trước hàng nghìn tình huống giả lập cực đoan của mạng xe (mất kết nối cảm biến, sốc điện) để đảm bảo màn hình không bao giờ bị đứng hình khi ra đời thực."
      },
      {
        id: 14,
        question: "Trong kiểm thử khả năng đọc lướt (Glanceability Test), phương pháp 'Tachistoscopic Presentation' (Trình chiếu chớp nhoáng) kiểm tra điều gì?",
        options: [
          "A. Kiểm tra xem người tham gia có bị giật mình bởi tiếng sấm sét không.",
          "B. Bật một màn hình HMI trong thời gian cực ngắn (ví dụ đúng 500 mili-giây) rồi tắt đen ngay lập tức, sau đó hỏi người dùng có nhận diện được biển báo tốc độ hay biểu tượng cảnh báo vừa xuất hiện hay không.",
          "C. Đếm số lượng bóng đèn LED trên xe.",
          "D. Đo độ mòn của chìa khóa xe."
        ],
        answer: 1,
        explanation: "Nếu chỉ chớp mắt 0.5s mà người dùng không thể nói được tốc độ xe đang chạy bao nhiêu, bố cục giao diện đó bị coi là quá rối rắm và cần được tối giản hóa đồ họa."
      },
      {
        id: 15,
        question: "Mục đích tối cao của toàn bộ quy trình kiểm thử và đánh giá trải nghiệm HMI cho ngành ô tô và xe điện là:",
        options: [
          "A. Giúp hãng xe bán được các gói phần mềm trả phí hàng tháng đắt đỏ nhất.",
          "B. Đảm bảo sự cân bằng hoàn hảo giữa 'Công nghệ hiện đại thông minh' và 'An toàn tính mạng tuyệt đối', bảo vệ người lái khỏi sự xao nhãng nguy hiểm, mang lại sự tự tin, an tâm và niềm vui trọn vẹn trên mọi hành trình.",
          "C. Giúp chiếc xe trông giống như phi thuyền không gian trong phim viễn tưởng.",
          "D. Loại bỏ hoàn toàn sự can thiệp của con người khỏi xã hội."
        ],
        answer: 1,
        explanation: "Đích đến cuối cùng của kỹ sư HMI ô tô là sự an toàn và niềm hạnh phúc của con người: Mỗi mili-giây giảm bớt sự rời mắt khỏi mặt đường, mỗi nút bấm trực quan chuẩn xác chính là một mạng sống được bảo vệ an toàn trở về nhà cùng gia đình."
      }
    ]
  }
];

console.log('Automotive tests part 4 prepared.');
