const fs = require('fs');
const path = require('path');

// 6 Tests x 15 Questions = 90 Questions
const testsData = [
  {
    id: 1,
    title: "Bài 1: Khái niệm Cốt lõi & Lịch sử Tiến hóa HMI",
    badge: "Nền tảng HMI",
    description: "Nắm vững bản chất của Giao diện Người - Máy, các nguyên lý của Don Norman, mô hình tương tác và bước chuyển từ CLI đến NUI.",
    timeLimit: 15, // minutes
    questions: [
      {
        id: 1,
        question: "Thuật ngữ HMI (Human-Machine Interface) có phạm vi và trọng tâm khác biệt lớn nhất so với UI/UX website tiêu chuẩn ở điểm nào?",
        options: [
          "A. HMI chỉ hiển thị dưới dạng phần mềm dòng lệnh không có giao diện đồ họa.",
          "B. HMI là cầu nối điều khiển & giám sát hai chiều giữa con người và máy móc/hệ thống vật lý (xe cộ, dây chuyền, thiết bị), đặc biệt đề cao tính an toàn và thời gian thực.",
          "C. HMI chỉ áp dụng cho người dùng phổ thông lướt web trên điện thoại di động.",
          "D. HMI không yêu cầu nghiên cứu hành vi và tâm lý của người vận hành."
        ],
        answer: 1,
        explanation: "HMI là giao diện kết nối trực tiếp giữa người vận hành và các thiết bị/hệ thống vật lý kỹ thuật (máy móc công nghiệp, buồng lái máy bay, ô tô). Khác với UI web thông thường chỉ tương tác dữ liệu số, sai sót trên HMI có thể dẫn đến tai nạn vật lý, hư hỏng thiết bị và mất an toàn tính mạng."
      },
      {
        id: 2,
        question: "Theo Don Norman trong 'The Design of Everyday Things', khái niệm 'Affordance' (Đặc tính gợi ý chức năng) được hiểu là:",
        options: [
          "A. Khả năng chi trả tài chính của người dùng khi mua thiết bị.",
          "B. Tốc độ xử lý phần cứng của màn hình cảm ứng.",
          "C. Mối quan hệ giữa đặc tính vật lý của một đồ vật và khả năng nhận biết của con người về cách thức có thể tương tác với nó.",
          "D. Khả năng thiết bị tự động sửa lỗi cho người dùng mà không cần thông báo."
        ],
        answer: 2,
        explanation: "Affordance là mối quan hệ giữa một vật thể và một tác nhân (người dùng). Ví dụ, một cái ghế có affordance để ngồi, một tay nắm cửa phẳng có affordance để đẩy, một núm xoay vật lý có affordance để xoay."
      },
      {
        id: 3,
        question: "Trong tương tác người - máy, sự bất đối xứng giữa 'Mental Model' (Mô hình tinh thần) và 'Conceptual Model' (Mô hình thiết kế) thường dẫn đến hậu quả gì?",
        options: [
          "A. Hệ thống hoạt động nhanh hơn mức bình thường.",
          "B. Người dùng dễ bị bối rối, thao tác nhầm, dự đoán sai hành vi hệ thống và gia tăng lỗi vận hành.",
          "C. Màn hình tự động giảm độ sáng để tiết kiệm năng lượng.",
          "D. Thiết bị tự động nâng cấp phần mềm điều khiển."
        ],
        answer: 1,
        explanation: "Mental Model là hình dung trong đầu người dùng về cách hệ thống vận hành. Conceptual Model là cấu trúc thực tế mà kỹ sư xây dựng. Nếu hai mô hình này không khớp nhau, người vận hành sẽ không hiểu máy móc đang làm gì và rất dễ gây ra sự cố."
      },
      {
        id: 4,
        question: "Theo chu trình hành động của Norman, 'Feedback' (Phản hồi) giải quyết câu hỏi cốt lõi nào của người vận hành?",
        options: [
          "A. 'Hệ thống này do công ty nào sản xuất?'",
          "B. 'Thiết bị này có giá bao nhiêu?'",
          "C. 'Hành động tôi vừa thực hiện đã thành công chưa và trạng thái hiện tại của hệ thống là gì?'",
          "D. 'Mật khẩu wifi của phòng điều khiển là gì?'"
        ],
        answer: 2,
        explanation: "Feedback cung cấp thông tin ngay lập tức về kết quả của hành động vừa thực hiện, giúp người dùng thu hẹp 'Khoảng cách đánh giá' (Gulf of Evaluation) để xác nhận hệ thống đã nhận lệnh và thay đổi trạng thái tương ứng."
      },
      {
        id: 5,
        question: "'Signifier' (Dấu hiệu chỉ dẫn) trong thiết kế HMI có vai trò chính là gì?",
        options: [
          "A. Đánh dấu bản quyền phần mềm hiển thị trên màn hình.",
          "B. Đóng vai trò là tín hiệu thị giác, âm thanh hoặc xúc giác rõ ràng nhằm báo cho người dùng biết hành động nào có thể thực hiện và ở đâu.",
          "C. Giảm dung lượng RAM mà ứng dụng HMI tiêu thụ.",
          "D. Là số seri phần cứng in bên dưới thân máy."
        ],
        answer: 1,
        explanation: "Trong khi Affordance xác định hành động nào có thể làm được, thì Signifier báo cho người dùng biết NƠI NÀO và LÀM THẾ NÀO để thực hiện hành động đó (ví dụ: gờ nổi trên nút bấm, biểu tượng mũi tên, vệt sáng)."
      },
      {
        id: 6,
        question: "Thứ tự tiến hóa chuẩn xác của các thế hệ giao diện người - máy là:",
        options: [
          "A. NUI (Tự nhiên) → CLI (Dòng lệnh) → GUI (Đồ họa)",
          "B. GUI (Đồ họa) → CLI (Dòng lệnh) → NUI (Tự nhiên)",
          "C. CLI (Command-Line) → GUI (Graphical UI) → NUI (Natural User Interface: Touch/Voice/Gesture)",
          "D. BCI (Não) → CLI → GUI"
        ],
        answer: 2,
        explanation: "Lịch sử tương tác đi từ giao diện dòng lệnh văn bản (CLI), sang giao diện đồ họa cửa sổ/chuột (GUI - WIMP), và tiến tới giao diện người dùng tự nhiên (NUI) sử dụng cảm ứng, giọng nói, ánh mắt và cử chỉ."
      },
      {
        id: 7,
        question: "Giao diện mô hình WIMP (Windows, Icons, Menus, Pointer) bộc lộ nhược điểm lớn nhất nào khi đưa vào môi trường HMI cảm ứng rung lắc (ví dụ xe tải, tàu thuyền)?",
        options: [
          "A. Không hiển thị được văn bản có dấu.",
          "B. Menu chuột phải và các nút bấm con trỏ chuột quá nhỏ, cản trở việc chạm chính xác bằng ngón tay khi có rung chấn.",
          "C. Tiêu tốn quá nhiều nhiên liệu của động cơ.",
          "D. Bắt buộc phải có kết nối Internet liên tục."
        ],
        answer: 1,
        explanation: "WIMP được thiết kế cho con trỏ chuột độ chính xác cấp độ pixel (1px). Khi chuyển sang màn hình cảm ứng trong môi trường rung lắc hoặc đeo găng tay, các menu thả xuống và icon nhỏ của WIMP gây ra tỷ lệ chạm trượt cực kỳ cao."
      },
      {
        id: 8,
        question: "Khái niệm 'Natural Mapping' (Ánh xạ tự nhiên) trong thiết kế điều khiển HMI thể hiện rõ nhất qua ví dụ nào?",
        options: [
          "A. Đặt 4 công tắc bếp gas thành một đường thẳng ngang trong khi 4 bếp nấu xếp thành hình vuông 2x2.",
          "B. Sắp xếp vị trí 4 nút bật bếp nấu trên bảng điều khiển tương ứng chính xác theo hình học không gian 2x2 của 4 bếp nấu thực tế.",
          "C. Đổi màu nút nguồn sang màu vàng chanh.",
          "D. Đặt tên nút bấm bằng tiếng La-tinh cổ."
        ],
        answer: 1,
        explanation: "Natural Mapping là sự tương đồng về mặt không gian giữa bộ điều khiển và thiết bị được điều khiển. Bố trí nút điều khiển hình vuông tương ứng vị trí 4 bếp giúp người dùng bật đúng bếp ngay lập tức mà không cần suy nghĩ."
      },
      {
        id: 9,
        question: "'Gulf of Execution' (Khoảng cách thực thi) trong mô hình của Don Norman mô tả:",
        options: [
          "A. Thời gian bảo hành của máy móc tính từ ngày xuất xưởng.",
          "B. Khoảng cách vật lý giữa phòng điều khiển và động cơ ngoài hiện trường.",
          "C. Mức độ khó khăn hoặc nỗ lực mà người dùng phải bỏ ra để chuyển ý định trong đầu thành các thao tác điều khiển mà hệ thống cho phép.",
          "D. Số lượng dòng code được biên dịch trong 1 giây."
        ],
        answer: 2,
        explanation: "Khoảng cách thực thi đo lường khoảng cách giữa mong muốn của người dùng ('tôi muốn hạ nhiệt độ lò') và các thao tác mà hệ thống bắt buộc họ phải làm. Nếu hệ thống thiết kế tệ, người dùng không biết phải bấm vào đâu để hạ nhiệt độ."
      },
      {
        id: 10,
        question: "'Gulf of Evaluation' (Khoảng cách đánh giá) phản ánh điều gì?",
        options: [
          "A. Mức độ khó khăn để người dùng nhận diện và giải thích trạng thái hiện tại của hệ thống sau khi đã thực hiện một tác vụ.",
          "B. Mức độ khó khăn trong việc thanh toán hóa đơn bản quyền phần mềm.",
          "C. Tỷ lệ phần trăm chip vi xử lý bị quá nhiệt.",
          "D. Số lượng nhân viên trực ca đêm tại phòng vận hành."
        ],
        answer: 0,
        explanation: "Khoảng cách đánh giá đo lường nỗ lực để người dùng hiểu được: 'Hệ thống đã chuyển sang trạng thái gì rồi? Nó có hoạt động như tôi mong muốn không?' Nếu phản hồi nghèo nàn, người dùng sẽ hoang mang không biết lệnh đã chạy chưa."
      },
      {
        id: 11,
        question: "Thiết kế 'Skeuomorphism' (mô phỏng chân thực vật lý - như hiệu ứng lật trang giấy, vân gỗ, nút nổi 3D) từng có ý nghĩa lịch sử quan trọng nào trong HMI?",
        options: [
          "A. Giúp giảm chi phí sản xuất linh kiện bán dẫn.",
          "B. Đóng vai trò làm cầu nối quen thuộc, giúp người dùng chuyển dịch từ thói quen tương tác thiết bị vật lý sang màn hình cảm ứng số mà không cần học lại từ đầu.",
          "C. Tăng tốc độ đường truyền mạng nội bộ LAN.",
          "D. Là tiêu chuẩn bắt buộc của quân đội NATO."
        ],
        answer: 1,
        explanation: "Trong thời kỳ đầu của smartphone và màn hình cảm ứng, Skeuomorphism giúp người dùng ngay lập tức hiểu rằng các ô chữ nhật có bóng đổ chính là 'nút bấm được', công tắc gạt có thể 'gạt qua lại', từ đó rút ngắn thời gian làm quen."
      },
      {
        id: 12,
        question: "'Zero UI' hoặc 'Ambient HMI' là xu hướng giao diện tương tác hướng tới điều gì?",
        options: [
          "A. Xóa bỏ hoàn toàn màn hình và máy tính khỏi đời sống xã hội.",
          "B. Tương tác dựa trên ngữ cảnh xung quanh, cảm biến tự động, cử chỉ và giọng nói mà không buộc người dùng phải nhìn chằm chằm vào màn hình thủy tinh cố định.",
          "C. Chỉ sử dụng màn hình hiển thị màu đen trắng đơn sắc.",
          "D. Không cho phép người dùng điều khiển thiết bị."
        ],
        answer: 1,
        explanation: "Zero UI là triết lý thiết kế mà giao diện trở nên vô hình, hòa vào môi trường xung quanh (Ambient computing), sử dụng AI và cảm biến nhận diện ý định của người dùng thông qua thói quen, giọng nói và chuyển động tự nhiên."
      },
      {
        id: 13,
        question: "Giao diện đa phương thức (Multimodal HMI) mang lại lợi ích an toàn then chốt nào trong các tình huống khẩn cấp?",
        options: [
          "A. Tăng giá bán của sản phẩm trên thị trường.",
          "B. Giảm tải cho một kênh giác quan duy nhất (ví dụ mắt đang bận lái xe) bằng cách bổ sung kênh âm thanh (audio) và xúc giác (haptic).",
          "C. Buộc người dùng phải sử dụng cả hai tay và hai chân cùng lúc.",
          "D. Loại bỏ hoàn toàn sự can thiệp của con người."
        ],
        answer: 1,
        explanation: "Khi kênh thị giác bị quá tải hoặc che khuất (như tài xế đang nhìn đường, hoặc khói mù trong nhà xưởng), thông tin cảnh báo qua âm thanh (Spatial audio) và rung xúc giác (Haptic alert) đảm bảo người vận hành vẫn tiếp nhận được cảnh báo sống còn."
      },
      {
        id: 14,
        question: "Theo tiêu chuẩn quốc tế ISO 9241-11, 'Usability' (Tính khả dụng) của một hệ thống HMI được định nghĩa dựa trên 3 trụ cột nào?",
        options: [
          "A. Tốc độ CPU, Dung lượng Pin và Kích thước màn hình.",
          "B. Hiệu quả (Effectiveness), Hiệu suất (Efficiency) và Sự hài lòng (Satisfaction) của người dùng trong ngữ cảnh sử dụng xác định.",
          "C. Màu sắc, Âm lượng chuông và Độ phân giải camera.",
          "D. Khả năng tương thích Windows, macOS và Android."
        ],
        answer: 1,
        explanation: "ISO 9241-11 định nghĩa Usability qua 3 thành tố: Hiệu quả (người dùng hoàn thành đúng mục tiêu), Hiệu suất (tiêu tốn ít thời gian và nỗ lực nhất), và Sự hài lòng (cảm nhận thoải mái, tin cậy khi sử dụng)."
      },
      {
        id: 15,
        question: "Trong các hệ thống HMI vận hành trọng yếu (Mission-Critical: hàng không, điện hạt nhân, y tế cấp cứu), mục tiêu tối thượng của thiết kế là gì?",
        options: [
          "A. Tối đa hóa số lượng hiệu ứng hoạt họa 3D bắt mắt.",
          "B. Giảm thiểu tối đa lỗi thao tác con người, đảm bảo nhận thức tình huống nhanh chóng và duy trì an toàn tuyệt đối.",
          "C. Thu hút người vận hành ngồi chơi game trong giờ giải lao.",
          "D. Đảm bảo giao diện có nhiều màu sắc sặc sỡ nhất có thể."
        ],
        answer: 1,
        explanation: "Trong môi trường Mission-Critical, mục tiêu hàng đầu là độ tin cậy, tốc độ nhận diện sự cố và ngăn chặn lỗi thao tác của con người (Zero Critical Human Error), tính thẩm mỹ hào nhoáng là thứ yếu so với sự an toàn."
      }
    ]
  },
  {
    id: 2,
    title: "Bài 2: Tâm lý học Nhận thức & Công thái học trong HMI",
    badge: "Cognitive Ergonomics",
    description: "Khám phá các quy luật tâm lý học nổi tiếng (Hick, Fitts, Miller, Gestalt), tải nhận thức, cơ chế chú ý và công thái học thị giác.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Định luật Hick-Hyman (Hick's Law) phát biểu rằng thời gian đưa ra quyết định của con người sẽ tăng lên theo tỷ lệ nào?",
        options: [
          "A. Tăng theo hàm logarit của số lượng lựa chọn (lựa chọn càng nhiều thì thời gian quyết định càng lâu).",
          "B. Giảm dần khi số lượng lựa chọn tăng lên.",
          "C. Luôn không đổi bất kể có bao nhiêu lựa chọn.",
          "D. Tăng tỷ lệ nghịch với độ sáng màn hình."
        ],
        answer: 0,
        explanation: "Hick's Law: T = b * log2(n + 1). Càng nhiều lựa chọn được bày ra cùng lúc, não bộ càng mất nhiều thời gian để quét và quyết định. Trong HMI khẩn cấp, cần hạn chế tối đa số nút bấm để người vận hành phản xạ tức thì."
      },
      {
        id: 2,
        question: "Định luật Fitts (Fitts's Law) chỉ ra rằng thời gian để di chuyển và chạm tới một mục tiêu phụ thuộc vào 2 yếu tố nào?",
        options: [
          "A. Màu sắc mục tiêu và phông chữ hiển thị.",
          "B. Khoảng cách tới mục tiêu (Distance) và Kích thước của mục tiêu (Target Size/Width).",
          "C. Nhiệt độ phòng và độ ẩm không khí.",
          "D. Độ sâu của menu cài đặt."
        ],
        answer: 1,
        explanation: "Định luật Fitts: Mục tiêu càng ở xa và kích thước càng nhỏ thì càng mất nhiều thời gian và dễ bấm trượt. Do đó, các nút thao tác khẩn cấp hoặc chức năng thường xuyên trong HMI phải to và nằm ở vị trí dễ chạm tới nhất."
      },
      {
        id: 3,
        question: "Quy luật con số 7 ± 2 của George Miller (Miller's Law) nhắc nhở các nhà thiết kế HMI điều gì về trí nhớ ngắn hạn (Working Memory)?",
        options: [
          "A. Không bao giờ được thiết kế HMI có quá 7 màn hình.",
          "B. Não người chỉ có thể duy trì trung bình từ 5 đến 9 'mẩu thông tin' (chunks) trong trí nhớ ngắn hạn cùng một lúc.",
          "C. Mọi nút bấm phải có kích thước đúng 7 centimet.",
          "D. Mỗi dự án chỉ cần đúng 7 ngày để hoàn thành thiết kế."
        ],
        answer: 1,
        explanation: "Bộ nhớ làm việc (Working Memory) của con người rất có hạn (7 ± 2 đơn vị thông tin). Khi thiết kế bảng điều khiển, cần gom nhóm dữ liệu (chunking) thành từng cụm logic (ví dụ nhóm theo hệ thống, nhóm số điện thoại theo từng cụm 3-4 số) để người vận hành không bị quá tải."
      },
      {
        id: 4,
        question: "Trong lý thuyết Tải nhận thức (Cognitive Load Theory), 'Extraneous Cognitive Load' (Tải nhận thức ngoại lai) là gì?",
        options: [
          "A. Nỗ lực não bộ cần thiết để học hiểu bản chất của một nghiệp vụ phức tạp.",
          "B. Lượng tải nhận thức lãng phí do thiết kế giao diện lộn xộn, rối rắm, hướng dẫn mù mờ và màu sắc gây nhiễu gây ra.",
          "C. Năng lượng điện mà màn hình tiêu thụ khi hiển thị màu trắng.",
          "D. Cân nặng của thiết bị phần cứng đo bằng kilogram."
        ],
        answer: 1,
        explanation: "Extraneous Load là tải nhận thức 'thừa thãi' do giao diện tồi tệ tạo ra (bắt người dùng phải căng mắt tìm nút, dịch nghĩa icon trừu tượng). Thiết kế HMI xuất sắc phải triệt tiêu tối đa Extraneous Load để não bộ dành tài nguyên xử lý tình huống thực tế."
      },
      {
        id: 5,
        question: "Theo quy luật Gestalt về 'Sự gần gũi' (Proximity), mắt người có xu hướng tự động gom nhóm các phần tử như thế nào?",
        options: [
          "A. Các phần tử nằm gần nhau trong không gian sẽ được coi là thuộc về cùng một nhóm hoặc có mối liên hệ chức năng với nhau.",
          "B. Các phần tử có cùng màu sắc luôn được ưu tiên hơn các phần tử nằm gần.",
          "C. Phần tử ở góc trên bên trái luôn quan trọng nhất.",
          "D. Các phần tử có hình tròn luôn được nhóm chung với hình tam giác."
        ],
        answer: 0,
        explanation: "Luật Proximity chỉ ra rằng các nút bấm hoặc chỉ số nằm sát cạnh nhau sẽ được não bộ tự động hiểu là cùng chung một cụm chức năng. Nếu đặt sai khoảng cách, người vận hành sẽ liên kết nhầm thông số của van A sang van B."
      },
      {
        id: 6,
        question: "Hiện tượng 'Change Blindness' (Mù thay đổi) trong giám sát HMI xảy ra khi nào?",
        options: [
          "A. Khi màn hình bị cháy điểm ảnh đen.",
          "B. Người vận hành hoàn toàn không nhận ra một thông số quan trọng đã thay đổi đột ngột vì thay đổi đó không kèm theo tín hiệu chuyển động hoặc điểm nhấn thị giác gây chú ý.",
          "C. Người dùng bị cận thị nhưng không đeo kính.",
          "D. Thiết bị tự động chuyển đổi sang giao diện tiếng Anh."
        ],
        answer: 1,
        explanation: "Mắt người cực kỳ nhạy với chuyển động cục bộ. Nếu một con số trên bảng điều khiển âm thầm nhảy từ 50 lên 100 mà không nhấp nháy, đổi màu hoặc có visual cue, người trực màn hình rất dễ bỏ sót do hiện tượng 'Mù thay đổi'."
      },
      {
        id: 7,
        question: "Khi người vận hành đối mặt với tình huống khủng hoảng/stress cao độ, hiện tượng 'Tunnel Vision' (Tầm nhìn hình ống) sẽ làm suy giảm nhận thức như thế nào?",
        options: [
          "A. Người vận hành chỉ nghe thấy âm thanh trầm mà không nghe thấy âm bổng.",
          "B. Tầm nhìn ngoại vi bị thu hẹp đáng kể, người vận hành chỉ chăm chú nhìn vào một điểm báo động trước mắt và bỏ sót hoàn toàn các chỉ số quan trọng khác xung quanh.",
          "C. Mắt người vận hành tự động điều tiết như kính hiển vi.",
          "D. Khả năng gõ bàn phím tăng nhanh gấp đôi."
        ],
        answer: 1,
        explanation: "Dưới áp lực sinh lý cực đại, cơ chế chú ý bị co lại thành tầm nhìn hình ống. HMI chuyên nghiệp phải tính toán đặt các cảnh báo khẩn cấp ngay trung tâm trường nhìn chính và bổ sung cảnh báo âm thanh/rung để phá vỡ hiệu ứng này."
      },
      {
        id: 8,
        question: "Hiệu ứng Stroop (Stroop Effect) cảnh báo điều gì trong thiết kế nhãn trạng thái HMI?",
        options: [
          "A. Không được dùng chữ viết hoa trong bảng điều khiển.",
          "B. Không được tạo ra sự xung đột ngữ nghĩa giữa nội dung chữ và màu sắc (ví dụ: chữ 'DỪNG / STOP' nhưng lại tô màu Xanh lá cây).",
          "C. Luôn phải đặt kích thước chữ nhỏ hơn 10px.",
          "D. Phải dùng phông chữ thư pháp để tạo cảm giác mềm mại."
        ],
        answer: 1,
        explanation: "Hiệu ứng Stroop chứng minh não bộ xử lý màu sắc và chữ viết qua hai kênh song song. Nếu chữ 'STOP' sơn màu xanh hoặc 'RUN' sơn màu đỏ, não bộ sẽ bị khựng lại vài trăm mili-giây để xử lý xung đột, dễ dẫn đến bấm nhầm trong tích tắc."
      },
      {
        id: 9,
        question: "Theo quy chuẩn công thái học về khả năng đọc (Readability), tỷ lệ tương phản màu sắc (Contrast Ratio) tối thiểu cho văn bản thông thường theo chuẩn WCAG 2.1 AA là:",
        options: [
          "A. 1.5:1",
          "B. 3.0:1",
          "C. 4.5:1",
          "D. 10:1"
        ],
        answer: 2,
        explanation: "WCAG 2.1 AA quy định độ tương phản tối thiểu giữa chữ và nền là 4.5:1 cho văn bản tiêu chuẩn (và 3:1 cho chữ lớn/đồ họa giao diện quan trọng). Tỷ lệ này đảm bảo người dùng đọc được rõ ràng ngay cả khi ánh sáng môi trường bị chói."
      },
      {
        id: 10,
        question: "Ngưỡng 'Doherty Threshold' trong công thái học tương tác phát biểu rằng để con người duy trì trạng thái tập trung cao độ (Flow state), phản hồi hệ thống nên đạt tốc độ:",
        options: [
          "A. Dưới 400 mili-giây (0.4s)",
          "B. Khoảng 5 đến 10 giây",
          "C. Chính xác 60 giây",
          "D. Không cần quan tâm độ trễ"
        ],
        answer: 0,
        explanation: "Nghiên cứu của Walter J. Doherty (IBM, 1982) chỉ ra rằng khi máy móc và con người tương tác qua lại với tốc độ phản hồi dưới 400ms (< 0.4 giây), năng suất của người dùng tăng vọt và sự chú ý không bị phân tán."
      },
      {
        id: 11,
        question: "Thói quen quét mắt của người dùng trên màn hình hiển thị bảng dữ liệu/nội dung chữ phương Tây thường tuân theo mô hình nào?",
        options: [
          "A. Mô hình hình tròn xoắn ốc (Spiral pattern)",
          "B. Mô hình chữ F (F-Pattern) hoặc chữ Z (Z-Pattern)",
          "C. Quét từ dưới đáy màn hình lên trên cùng",
          "D. Chỉ nhìn vào góc dưới cùng bên phải"
        ],
        answer: 1,
        explanation: "Các nghiên cứu Eye-tracking chỉ ra người dùng quét mắt từ trái sang phải, từ trên xuống dưới theo hình chữ F (khi đọc nội dung nhiều chữ) hoặc chữ Z (khi lướt trang tổng quan có các khối CTA rõ ràng)."
      },
      {
        id: 12,
        question: "Thang đo NASA-TLX (Task Load Index) được sử dụng rộng rãi trong HMI để đo lường yếu tố nào?",
        options: [
          "A. Tốc độ quay của tua-bin máy bay.",
          "B. Tải công việc chủ quan của con người (Mental workload) qua 6 tiêu chí: trí óc, thể chất, áp lực thời gian, hiệu quả tự đánh giá, nỗ lực và sự ức chế.",
          "C. Mức độ độc hại của khí thải động cơ.",
          "D. Lượng điện tiêu thụ của trạm vũ trụ."
        ],
        answer: 1,
        explanation: "NASA-TLX là công cụ đo lường tải nhận thức chuẩn mực nhất thế giới, giúp các chuyên gia HMI đánh giá xem một giao diện mới có làm người vận hành bị kiệt sức về mặt tinh thần hay không."
      },
      {
        id: 13,
        question: "Khoảng thị trường tối ưu (Optimal Visual Field) của mắt người khi nhìn thẳng mà không cần đảo đầu là khoảng bao nhiêu độ?",
        options: [
          "A. Khoảng 15° đến 30° quanh trục nhìn trung tâm.",
          "B. 180° toàn diện.",
          "C. Chỉ đúng 1° duy nhất.",
          "D. 360° xung quanh cơ thể."
        ],
        answer: 0,
        explanation: "Vùng nhìn sắc nét và nhận diện thông tin chuẩn xác nhất nằm trong phạm vi 15° - 30° tính từ đường ngắm trung tâm. Các thông số sống còn phải luôn được bố trí trong vùng vàng này."
      },
      {
        id: 14,
        question: "Công thái học nhân trắc học (Anthropometry) lưu ý điều gì khi thiết kế bảng điều khiển cảm ứng đứng cho công nhân?",
        options: [
          "A. Phải thiết kế theo chiều cao của người cao nhất trong nhà máy.",
          "B. Phải tính toán theo bách phân vị nhân trắc (ví dụ từ nữ giới 5th percentile đến nam giới 95th percentile) để đảm bảo góc với tay và tầm nhìn phù hợp cho 90-95% dân số lao động.",
          "C. Chỉ thiết kế cho người thuận tay trái.",
          "D. Luôn gắn cố định ở độ cao 2.2 mét."
        ],
        answer: 1,
        explanation: "Thiết kế chuẩn công thái học không bao giờ lấy giá trị trung bình (average), mà phải bao quát từ người vóc dáng nhỏ (5th percentile nữ) đến người vóc dáng lớn (95th percentile nam), cho phép điều chỉnh độ cao/góc nghiêng."
      },
      {
        id: 15,
        question: "Cơ chế 'Feedback loop' trễ (ví dụ bấm nút mà 2 giây sau đèn mới sáng) gây ra hiện tượng hành vi tiêu cực nào ở người dùng?",
        options: [
          "A. Người dùng sẽ kiên nhẫn chờ đợi mà không làm gì.",
          "B. Người dùng tưởng nút bị liệt nên liên tục bấm thêm nhiều lần (Double-tapping/Multi-clicking), dễ gây gửi trùng lặp lệnh nguy hiểm.",
          "C. Thiết bị tự động tắt nguồn.",
          "D. Người dùng lập tức rời khỏi vị trí làm việc."
        ],
        answer: 1,
        explanation: "Khi thiếu phản hồi tức thì (Instant acknowledgement), con người sẽ sinh ra phản xạ nghi ngờ hệ thống chưa nhận lệnh và liên tục nhấn liên hoàn nút bấm, có thể dẫn đến việc kích hoạt lệnh kép ngoài ý muốn."
      }
    ]
  },
  {
    id: 3,
    title: "Bài 3: HMI trong Công nghiệp & Tự động hóa (SCADA, ISA-101)",
    badge: "Industrial Automation",
    description: "Tiêu chuẩn ISA-101, triết lý High-Performance HMI, giải quyết hiện tượng Alarm Fatigue, phân cấp màn hình và nhận thức tình huống (Situation Awareness).",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Tiêu chuẩn quốc tế ISA-101 (HMI for Process Automation Systems) được ban hành với mục đích chủ đạo nào?",
        options: [
          "A. Buộc các kỹ sư phải vẽ đồ họa 3D chuyển động giống phim hoạt hình.",
          "B. Chuẩn hóa vòng đời thiết kế, triển khai và vận hành HMI công nghiệp nhằm tăng cường Nhận thức tình huống (Situation Awareness) và giảm thiểu tai nạn vận hành.",
          "C. Thay thế hoàn toàn người vận hành bằng robot tự hành.",
          "D. Hạn chế sử dụng màn hình máy tính trong nhà máy."
        ],
        answer: 1,
        explanation: "ISA-101 đưa ra khung chuẩn về toàn bộ vòng đời của HMI: từ triết lý thiết kế (Philosophy), phong cách hiển thị (Style Guide) đến vận hành bảo trì, tập trung vào việc giúp người vận hành nhận biết và xử lý bất thường nhanh nhất."
      },
      {
        id: 2,
        question: "Triết lý 'High-Performance HMI' (HMI Hiệu Năng Cao) của Bill Hollifield quy định màu nền chủ đạo của màn hình giám sát là gì và tại sao?",
        options: [
          "A. Nền đen hoàn toàn với đèn neon nhấp nháy để tạo phong cách cyberpunk.",
          "B. Nền xám trung tính (Light Muted Gray) để mắt không bị mỏi và làm nổi bật lập tức các màu sắc cảnh báo rực rỡ khi có sự cố.",
          "C. Nền đỏ tươi rực rỡ để kích thích thần kinh người vận hành thức suốt đêm.",
          "D. Nền xanh lá cây đậm để tượng trưng cho sự an toàn."
        ],
        answer: 1,
        explanation: "High-Performance HMI sử dụng nền xám nhạt trung tính. Khi mọi thứ bình thường, màn hình hoàn toàn phẳng lặng, đơn sắc. Chỉ khi có lỗi hoặc cảnh báo, các màu nổi bật (Đỏ, Vàng, Cam) mới xuất hiện, lập tức thu hút ánh nhìn của kỹ sư."
      },
      {
        id: 3,
        question: "Tại sao các giao diện SCADA truyền thống vẽ bồn bể 3D sống động, hiệu ứng đổ bóng và lửa cháy lại bị ISA-101 coi là 'thiết kế tồi'?",
        options: [
          "A. Vì chúng quá tốn điện năng màn hình.",
          "B. Vì các chi tiết đồ họa rườm rà tạo ra 'nhiễu thị giác' (visual clutter), che lấp các thông tin vận hành quan trọng và không cung cấp bối cảnh xu hướng của dữ liệu.",
          "C. Vì bản quyền đồ họa 3D quá đắt tiền.",
          "D. Vì người vận hành không thích nhìn tranh 3D."
        ],
        answer: 1,
        explanation: "Hình vẽ 3D bồn nước sống động chỉ cho thấy 'hình dáng bồn' chứ không trả lời được: Mức nước hiện tại có bình thường không? Tốc độ dâng nước thế nào? Có sắp tràn không? Nó gây phân tán sự chú ý vào đồ họa thay vì dữ liệu quan trọng."
      },
      {
        id: 4,
        question: "Hiện tượng 'Alarm Fatigue' (Mệt mỏi/Bão hòa vì cảnh báo) trong nhà máy nguy hại như thế nào?",
        options: [
          "A. Người vận hành bị đau tai do loa kêu to.",
          "B. Số lượng chuông báo động kích hoạt quá nhiều và liên tục (phần lớn là báo động rác), khiến người vận hành trở nên trơ lì cảm xúc, có thói quen bấm tắt chuông ngay lập tức và bỏ qua cảnh báo thảm họa thực sự.",
          "C. Hệ thống SCADA bị nghẽn mạng do gửi quá nhiều SMS.",
          "D. Nhà máy bị cắt điện do chuông kêu quá tải."
        ],
        answer: 1,
        explanation: "Alarm Fatigue là nguyên nhân hàng đầu của các thảm họa công nghiệp lớn (như vụ nổ nhà máy lọc dầu Texas City 2005). Khi có hàng trăm chuông kêu mỗi giờ, kỹ sư sẽ tắt chuông theo quán tính mà không thèm đọc nội dung."
      },
      {
        id: 5,
        question: "Theo tiêu chuẩn quản lý cảnh báo ISA-18.2, trong điều kiện vận hành bình thường, một kỹ sư vận hành có thể xử lý an toàn tối đa khoảng bao nhiêu cảnh báo trong 10 phút?",
        options: [
          "A. Khoảng 1 đến 2 cảnh báo.",
          "B. Khoảng 50 đến 100 cảnh báo.",
          "C. 500 cảnh báo.",
          "D. Không giới hạn số lượng."
        ],
        answer: 0,
        explanation: "ISA-18.2 khuyến nghị trong điều kiện vận hành ổn định, tỷ lệ báo động trung bình chỉ nên từ 1-2 cảnh báo trong 10 phút (~144 cảnh báo/ngày). Nếu vượt quá mức này, hệ thống cảnh báo bị coi là mất kiểm soát."
      },
      {
        id: 6,
        question: "Ba cấp độ của 'Nhận thức tình huống' (Situation Awareness - Mica Endsley) trong HMI là:",
        options: [
          "A. Mua máy → Lắp đặt → Khởi động",
          "B. Cấp 1: Nhận thức (Perception) → Cấp 2: Thấu hiểu (Comprehension) → Cấp 3: Dự phóng tương lai (Projection)",
          "C. Đọc sách → Thi trắc nghiệm → Cấp chứng chỉ",
          "D. Bật nguồn → Đăng nhập → Đổi mật khẩu"
        ],
        answer: 1,
        explanation: "Level 1: Nhận diện dữ liệu hiện tại (nhiệt độ 90 độ C). Level 2: Hiểu ý nghĩa (nhiệt độ 90 độ C là cao bất thường do van làm mát đang kẹt). Level 3: Dự phóng diễn biến (nếu không can thiệp, trong 5 phút nữa áp suất sẽ nổ tung lò)."
      },
      {
        id: 7,
        question: "Mô hình kiến trúc phân cấp màn hình chuẩn theo ISA-101 gồm 4 cấp (Levels). 'Màn hình Cấp 1' (Level 1 Display) là gì?",
        options: [
          "A. Màn hình sơ đồ đấu nối dây điện chi tiết của từng cảm biến.",
          "B. Màn hình tổng quan toàn bộ nhà máy/phân xưởng (Overview Display), cung cấp góc nhìn toàn cảnh về tình trạng hoạt động và các chỉ số KPI then chốt mà không cần cuộn trang.",
          "C. Màn hình cài đặt thông số card mạng Ethernet.",
          "D. Màn hình đăng nhập tài khoản Windows."
        ],
        answer: 1,
        explanation: "Level 1 Display là màn hình toàn cảnh tối thượng. Người quản lý chỉ cần liếc mắt 5 giây vào Level 1 là biết ngay toàn bộ nhà máy đang chạy ổn hay có cụm nào đang có nguy cơ bất thường."
      },
      {
        id: 8,
        question: "Kỹ thuật hiển thị 'Analog Trend & Moving Range' thay vì chỉ hiển thị một con số rời rạc (Digital Readout: ví dụ '78.5 bar') mang lại lợi thế gì?",
        options: [
          "A. Giúp giảm dung lượng ổ cứng lưu trữ.",
          "B. Giúp người vận hành lập tức thấy được bối cảnh: thông số đang trong dải an toàn hay tiệm cận ngưỡng nguy hiểm, xu hướng đang tăng hay giảm và tốc độ biến thiên ra sao.",
          "C. Làm cho giao diện nhìn giống đồng hồ đo điện thoại.",
          "D. Bắt buộc phải có kết nối Bluetooth."
        ],
        answer: 1,
        explanation: "Con số '78.5 bar' đứng một mình là dữ liệu chết (người vận hành không biết nó đang tăng vọt lên hay giảm xuống). Một đồ thị xu hướng nhỏ (Trend indicator) cho biết ngay nó vừa tăng từ 40 lên 78 trong 2 phút, báo hiệu nguy cơ khẩn cấp."
      },
      {
        id: 9,
        question: "Đối với Nút dừng khẩn cấp (E-Stop - Emergency Stop), quy định an toàn công nghiệp bắt buộc điều gì?",
        options: [
          "A. Chỉ được phép làm nút bấm ảo nằm trong menu cài đặt của màn hình cảm ứng.",
          "B. Bắt buộc phải là nút bấm cơ học vật lý hình nấm màu đỏ có chốt khóa, độc lập hoàn toàn với phần mềm HMI để đảm bảo ngắt mạch tức thì khi hệ điều hành bị treo.",
          "C. Nút E-stop phải có mật khẩu bảo vệ 6 chữ số.",
          "D. Chỉ được phép kích hoạt E-Stop qua ứng dụng điện thoại."
        ],
        answer: 1,
        explanation: "Tiêu chuẩn an toàn máy (ISO 13850) nghiêm cấm thay thế nút E-Stop cơ học bằng nút ảo trên màn hình. E-Stop phải là nút bấm vật lý ngắt điện tiếp điểm trực tiếp, để ngay cả khi màn hình HMI bị đứng đơ/cháy nổ vẫn có thể dừng máy lập tức."
      },
      {
        id: 10,
        question: "Trong quy trình thao tác điều khiển thiết bị nguy hiểm (mở van xả axit, bật lò đốt), kỹ thuật HMI nào được áp dụng để tránh chạm nhầm?",
        options: [
          "A. Bấm 1 lần là kích hoạt ngay lập tức.",
          "B. Quy trình xác nhận hai bước (Two-step confirmation: Select - Then - Confirm) hoặc cơ chế giữ nút trong 2-3 giây (Hold-to-activate) kèm hộp thoại hiển thị hậu quả rõ ràng.",
          "C. Tự động kích hoạt sau khi đếm ngược 1 giây.",
          "D. Bắt người dùng trả lời 1 câu hỏi đố vui."
        ],
        answer: 1,
        explanation: "Cơ chế 'Select-Before-Operate' hoặc Two-step verification ngăn chặn triệt để hiện tượng trượt tay vô tình quẹt trúng nút cảm ứng làm xả van nguy hiểm."
      },
      {
        id: 11,
        question: "Trong môi trường nhà xưởng có nhiều dầu mỡ và công nhân bắt buộc đeo găng tay dày, công nghệ màn hình cảm ứng nào thường được ưu tiên hơn?",
        options: [
          "A. Cảm ứng điện dung thông thường của smartphone (Projected Capacitive không có chip chống nước).",
          "B. Cảm ứng điện trở (Resistive) dựa trên áp lực vật lý hoặc cảm ứng điện dung công nghiệp hỗ trợ chế độ găng tay chuyên dụng kết hợp nút bấm cơ phụ trợ.",
          "C. Nhận diện giọng nói thì thầm.",
          "D. Màn hình quét mống mắt tầm xa."
        ],
        answer: 1,
        explanation: "Màn hình cảm ứng điện dung thông thường không nhận diện được găng tay vải/da dày hoặc bị loạn cảm ứng khi dính giọt nước/dầu. Màn hình điện trở nhận diện lực nén vật lý hoặc cảm ứng công nghiệp tuning nhạy cao mới đảm bảo hoạt động."
      },
      {
        id: 12,
        question: "Phân biệt lỗi con người: Khái niệm 'Slip' (Sơ suất/Trượt tay) khác gì so với 'Mistake' (Sai lầm trong nhận định)?",
        options: [
          "A. 'Slip' là do phần cứng hỏng, 'Mistake' là do mạng chậm.",
          "B. 'Slip' là ý định đúng nhưng thực hiện thao tác sai (ví dụ định bấm nút A nhưng ngón tay bấm chệch sang nút B); còn 'Mistake' là ý định ban đầu đã sai do phán đoán nhầm mô hình tình huống.",
          "C. Cả hai hoàn toàn giống nhau không có khác biệt.",
          "D. 'Mistake' chỉ xảy ra với người mới học việc."
        ],
        answer: 1,
        explanation: "Slip (trượt tay/lỗi thao tác thực thi): Bác sĩ định gõ liều 10mg nhưng gõ trúng phím 100mg. Mistake (lỗi tư duy): Bác sĩ tưởng bệnh nhân bị đau đầu nên chủ động kê liều 100mg (dù gõ phím rất chuẩn nhưng quyết định đã sai từ đầu)."
      },
      {
        id: 13,
        question: "Trong phòng điều khiển trung tâm vận hành 24/7 (24/7 Control Room), thiết kế HMI phải xử lý vấn đề mỏi mắt ban đêm như thế nào?",
        options: [
          "A. Tăng độ sáng màn hình lên 100% để chống buồn ngủ.",
          "B. Cung cấp chế độ Dark Mode/Night Mode với mức độ chói (Glare) được kiểm soát nghiêm ngặt và đồng bộ với hệ thống chiếu sáng sinh học của phòng.",
          "C. Tắt toàn bộ màn hình sau 12 giờ đêm.",
          "D. Đổi phông chữ sang màu đỏ neon chớp nháy."
        ],
        answer: 1,
        explanation: "Kỹ sư trực đêm nếu nhìn vào màn hình trắng chói mắt sẽ bị ức chế hormone Melatonin, gây mỏi mắt dữ dội và mất tập trung. Chế độ nền tối với tương phản dịu mắt bảo vệ nhịp sinh học và thị lực người vận hành."
      },
      {
        id: 14,
        question: "Để hỗ trợ người vận hành bị khiếm khuyết thị giác về màu sắc (mù màu), chỉ thị báo động trên HMI công nghiệp bắt buộc phải:",
        options: [
          "A. Không bao giờ được dùng màu sắc.",
          "B. Sử dụng 'Mã hóa dự phòng' (Redundant Coding): Kết hợp màu sắc đồng thời với Hình khối biểu tượng (Shape) và Chữ viết/Số thứ tự ưu tiên (Text label).",
          "C. Bắt buộc người vận hành phải đi chữa mắt trước khi làm việc.",
          "D. Chỉ phát âm thanh hú còi mà không cần hiển thị gì."
        ],
        answer: 1,
        explanation: "Redundant Coding: Báo động cấp 1 không chỉ là hình vuông màu đỏ, mà là Hình tam giác đỉnh nhọn + Số 1 + Viết hoa chữ 'CRITICAL'. Dù người dùng bị mù màu hoàn toàn, họ vẫn nhận ra tam giác số 1 là báo động nguy cấp nhất."
      },
      {
        id: 15,
        question: "Chỉ số MTTR (Mean Time to Respond / Mean Time to Resolve) trong đánh giá HMI công nghiệp phản ánh:",
        options: [
          "A. Thời gian trung bình máy chủ cập nhật bản vá Windows.",
          "B. Thời gian trung bình từ lúc sự cố xuất hiện trên giao diện đến khi người vận hành phát hiện, hiểu vấn đề và thực hiện hành động can thiệp thành công.",
          "C. Tuổi thọ trung bình của tấm nền LCD.",
          "D. Thời gian giải lao giữa các ca làm việc."
        ],
        answer: 1,
        explanation: "Một HMI được thiết kế tốt theo chuẩn High-Performance HMI giúp rút ngắn MTTR từ vài chục phút xuống còn vài chục giây, cứu doanh nghiệp hàng triệu USD thiệt hại do dừng máy đột ngột."
      }
    ]
  },
  {
    id: 4,
    title: "Bài 4: HMI Ô tô & Cabin Thông minh (Automotive & Cockpit)",
    badge: "Smart Cockpit",
    description: "Xao nhãng tài xế (Driver Distraction), quy tắc 2 giây của NHTSA, cụm đồng hồ Cluster, HUD, màn hình trung tâm IVI và tương tác đa phương thức trên xe hơi.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Cơ quan An toàn Giao thông Quốc gia Mỹ (NHTSA) phân loại xao nhãng tài xế (Driver Distraction) thành 3 dạng chính nào?",
        options: [
          "A. Xao nhãng ban ngày, ban đêm và lúc trời mưa.",
          "B. Thị giác (Visual: mắt rời mặt đường), Thao tác (Manual: tay rời vô lăng) và Nhận thức (Cognitive: tâm trí không tập trung vào lái xe).",
          "C. Tiếng ồn động cơ, tiếng gió và tiếng còi xe bên ngoài.",
          "D. Xao nhãng phần mềm, phần cứng và mạng 4G/5G."
        ],
        answer: 1,
        explanation: "Ba dạng xao nhãng: Visual (mắt nhìn vào màn hình giải trí), Manual (tay bấm tìm icon trên màn hình cảm ứng), Cognitive (đầu óc suy nghĩ hoặc nói chuyện qua menu phức tạp). Một HMI xe hơi tồi thường vi phạm cả 3 dạng cùng lúc."
      },
      {
        id: 2,
        question: "Theo hướng dẫn thiết kế HMI xe hơi của NHTSA, thời gian một lần liếc mắt (Glance Duration) của tài xế vào màn hình không được vượt quá:",
        options: [
          "A. 10 giây",
          "B. 5 giây",
          "C. 2.0 giây (và tổng thời gian rời mắt tích lũy cho một tác vụ không quá 12 giây)",
          "D. 30 giây"
        ],
        answer: 2,
        explanation: "Quy tắc 2 giây vàng: Ở tốc độ 100 km/h, xe chạy được gần 56 mét trong 2 giây mà tài xế hoàn toàn mù phía trước. Bất kỳ tác vụ HMI nào đòi hỏi tài xế nhìn liên tục quá 2 giây đều bị đánh giá là không an toàn."
      },
      {
        id: 3,
        question: "Màn hình HUD (Head-Up Display) và công nghệ AR-HUD mang lại ưu thế an toàn số một nào so với màn hình trung tâm?",
        options: [
          "A. Cho phép tài xế xem phim độ nét cao hơn.",
          "B. Chiếu thông tin quan trọng (tốc độ, mũi tên dẫn đường, cảnh báo va chạm) trực tiếp lên kính chắn gió vào trường nhìn vô cực, giúp tài xế không phải cúi đầu hoặc rời mắt khỏi mặt đường.",
          "C. Tự động lau sạch kính chắn gió khi trời mưa.",
          "D. Giảm lượng tiêu thụ xăng dầu của động cơ."
        ],
        answer: 1,
        explanation: "HUD giữ mắt tài xế luôn hướng về phía trước và loại bỏ thời gian điều tiết tiêu cự của mắt từ mặt đường xa vào màn hình cự ly gần (tiết kiệm khoảng 0.5 - 1.0 giây thời gian phản ứng trước chướng ngại vật)."
      },
      {
        id: 4,
        question: "Tại sao gần đây nhiều hãng xe và tổ chức an toàn (như Euro NCAP) bắt đầu yêu cầu đưa trở lại các 'Phím bấm vật lý' (Physical Buttons) cho các tính năng cơ bản thay vì nhồi nhét tất cả vào màn hình cảm ứng?",
        options: [
          "A. Vì màn hình cảm ứng đã lỗi thời.",
          "B. Vì phím vật lý cung cấp phản hồi xúc giác (Tactile feedback) và vị trí cơ học cố định, cho phép tài xế điều khiển 'mù' (Blind operation - không cần liếc mắt nhìn) các chức năng như xi-nhan, gạt nước, điều hòa.",
          "C. Vì chi phí sản xuất phím bấm cơ đắt hơn màn hình cảm ứng.",
          "D. Vì người lái xe không biết cách sử dụng ngón tay."
        ],
        answer: 1,
        explanation: "Màn hình cảm ứng phẳng lì không có cảm giác xúc giác cơ học; để bấm đúng nút, tài xế buộc phải cúi xuống nhìn (Eyes-off-road), gây mất an toàn nghiêm trọng. Phím vật lý có gờ nổi cho phép sờ và bấm mà mắt vẫn nhìn đường."
      },
      {
        id: 5,
        question: "Tiêu chuẩn An toàn chức năng ô tô ISO 26262 (ASIL) áp dụng cho màn hình cụm đồng hồ lái (Digital Instrument Cluster) đòi hỏi điều gì về mặt HMI?",
        options: [
          "A. Giao diện đồng hồ lái phải được phép đổi theme màu theo nhạc.",
          "B. Các biểu tượng cảnh báo an toàn then chốt (như phanh, áp suất lốp, túi khí, tốc độ thực) phải đảm bảo không bao giờ bị đơ, hiển thị sai hoặc bị che khuất bởi phần mềm giải trí (ASIL-B/D).",
          "C. Bắt buộc phải tích hợp mạng xã hội Facebook lên đồng hồ lái.",
          "D. Cụm đồng hồ phải hiển thị được ảnh selfie của người lái."
        ],
        answer: 1,
        explanation: "Cụm đồng hồ lái liên quan trực tiếp đến an toàn mạng sống. Hệ điều hành hiển thị Cluster thường chạy trên kiến trúc thời gian thực (như QNX, AUTOSAR) phân tách biệt lập hoàn toàn với Android giải trí để đảm bảo tốc độ xe và đèn báo lỗi phanh luôn hiển thị chính xác."
      },
      {
        id: 6,
        question: "Khái niệm 'Menu Depth' (Độ sâu của cây menu) trong HMI màn hình trung tâm ô tô khuyến nghị mức tối đa là bao nhiêu khi xe đang di chuyển?",
        options: [
          "A. Không quá 2 đến 3 tầng (Tối ưu là 1 chạm để truy cập tính năng cần thiết).",
          "B. Từ 7 đến 10 tầng để phân loại chi tiết.",
          "C. Càng sâu càng tốt để giấu các nút bấm.",
          "D. 15 tầng."
        ],
        answer: 0,
        explanation: "Nếu muốn bật sưởi ghế mà phải ấn: Menu → Cài đặt tiện nghi → Ghế ngồi → Ghế lái → Sưởi nhiệt (5 tầng), tài xế sẽ mất hơn chục giây liếc mắt, cực kỳ nguy hiểm. HMI xe hơi tốt luôn đưa các tính năng cốt lõi ra tầng 1 hoặc 2."
      },
      {
        id: 7,
        question: "Chính sách 'Driving Lockout' (Khóa tính năng theo tốc độ) trên hệ thống thông tin giải trí ô tô (IVI) sẽ tự động làm gì khi xe bắt đầu lăn bánh?",
        options: [
          "A. Tắt toàn bộ hệ thống âm thanh trên xe.",
          "B. Vô hiệu hóa các tính năng gây xao nhãng cao độ như: bàn phím ảo nhập văn bản tự do, xem video trực tuyến, đọc trang web dài hoặc ghép nối Bluetooth phức tạp.",
          "C. Khóa toàn bộ cửa kính xe không cho mở.",
          "D. Tự động tắt máy xe nếu tài xế chạm vào màn hình."
        ],
        answer: 1,
        explanation: "Khi xe di chuyển (tốc độ > 5 km/h), các tác vụ phức tạp đòi hỏi nhiều tương tác nhận thức (gõ bàn phím tìm địa chỉ, xem video Youtube) sẽ bị hệ thống tự động khóa lại để bảo vệ tài xế."
      },
      {
        id: 8,
        question: "Trong HMI xe hơi, công nghệ Điều khiển bằng giọng nói (Voice HMI) mang lại giá trị cốt lõi nào cho triết lý 'Eyes on the road, Hands on the wheel'?",
        options: [
          "A. Giúp tài xế tập luyện thanh nhạc trong xe.",
          "B. Cho phép điều khiển điều hòa, điều hướng bản đồ và thực hiện cuộc gọi mà không cần rời tay khỏi vô-lăng hay rời mắt khỏi mặt đường.",
          "C. Thay thế hoàn toàn động cơ đốt trong bằng động cơ điện.",
          "D. Cho phép xe tự động vượt đèn đỏ."
        ],
        answer: 1,
        explanation: "Voice HMI giảm thiểu triệt để Visual Distraction (mắt nhìn đường) và Manual Distraction (hai tay giữ chắc vô lăng), giải phóng các giác quan vật lý để tập trung xử lý mặt đường."
      },
      {
        id: 9,
        question: "Khi thiết kế Typography (Phông chữ và Kích thước) cho HMI trên màn hình xe hơi, nguyên tắc 'Legibility at a Glance' yêu cầu:",
        options: [
          "A. Dùng phông chữ viết tay cách điệu nghệ thuật.",
          "B. Sử dụng phông chữ Sans-serif đơn giản, nét chữ rõ ràng (như DIN, Frutiger), khoảng cách ký tự thoáng (kerning rộng), kích thước chữ tối thiểu từ 4.5mm đến 6mm ở cự ly ngồi lái.",
          "C. Cỡ chữ càng nhỏ càng tốt để hiển thị được nhiều nội dung hơn.",
          "D. Luôn in nghiêng và gạch chân tất cả các từ."
        ],
        answer: 1,
        explanation: "Phông chữ trên xe phải đọc được chỉ trong 200-300 mili-giây. Phông chữ Sans-serif với x-height cao, khoảng cách thoáng và nét đậm rõ ràng giúp tài xế đọc lướt thông số mà không cần nheo mắt đọc chữ."
      },
      {
        id: 10,
        question: "Trong xe tự hành cấp độ 3 (SAE Level 3 Autonomous Driving), thời điểm xe yêu cầu tài xế giành lại quyền lái khẩn cấp được gọi là gì?",
        options: [
          "A. Happy Hour Request",
          "B. Takeover Request (TOR) / Transition of Control",
          "C. System Reboot Notification",
          "D. Game Over Alert"
        ],
        answer: 1,
        explanation: "TOR (Takeover Request) là bài toán HMI hóc búa nhất của xe tự hành L3. Khi xe gặp tình huống vượt ngoài khả năng tự lái, HMI phải đánh thức tài xế (bằng âm thanh, rung ghế, nháy đèn vô lăng) và trao lại quyền kiểm soát trong khoảng thời gian an toàn (khoảng 5-10 giây)."
      },
      {
        id: 11,
        question: "Phản hồi xúc giác lực rung (Haptic Feedback) trên màn hình cảm ứng của ô tô cao cấp (như Porsche, Audi) được thiết kế nhằm mục đích gì?",
        options: [
          "A. Làm rung xe để người ngồi trong cảm thấy vui nhộn.",
          "B. Cung cấp một xung lực nảy cơ học chính xác vào đầu ngón tay giả lập cảm giác bấm phím vật lý thực, xác nhận lệnh đã ăn mà tài xế không cần nhìn màn hình.",
          "C. Giảm nhiệt độ của cabin xe.",
          "D. Sạc pin cho điện thoại không dây."
        ],
        answer: 1,
        explanation: "Màn hình haptic cơ học chỉ kích hoạt lệnh khi người dùng ấn một lực nhất định (Force Touch) và phản hồi lại bằng một xung rung giật tức thì, loại bỏ hoàn toàn hiện tượng chạm hờ vô tình kích hoạt chức năng."
      },
      {
        id: 12,
        question: "Cảnh báo âm thanh định vị không gian (Spatial 3D Audio Alerts) trên xe hơi giúp cải thiện phản xạ của tài xế như thế nào?",
        options: [
          "A. Tăng âm lượng loa siêu trầm của bài hát.",
          "B. Phát ra âm thanh cảnh báo phát ra chính xác từ hướng có nguy cơ va chạm (ví dụ: phát tiếng bíp ở loa cửa sau bên phải khi có xe máy vượt phải trong điểm mù).",
          "C. Khiến tài xế giật mình phanh gấp giữa đường.",
          "D. Thay thế tiếng còi xe bên ngoài."
        ],
        answer: 1,
        explanation: "Spatial Audio kích hoạt phản xạ định hướng tự nhiên của não bộ. Khi nghe thấy tiếng 'bíp' bên tai phải, tài xế theo bản năng sẽ lập tức chú ý gương chiếu hậu bên phải, rút ngắn thời gian xử lý nguy cơ."
      },
      {
        id: 13,
        question: "Tại sao việc thiết kế chuyển đổi chế độ Ngày/Đêm (Day/Night Mode) tự động theo cảm biến ánh sáng ngoài trời là bắt buộc đối với màn hình ô tô?",
        options: [
          "A. Để người ngồi trong xe chụp ảnh đẹp hơn.",
          "B. Ngăn chặn hiện tượng lóa mắt (Glare) và bảo vệ khả năng thích ứng bóng tối (Dark adaptation) của mắt tài xế khi lái xe vào ban đêm.",
          "C. Tiết kiệm dung lượng pin xe hơi 12V.",
          "D. Để phần mềm xe tự động cập nhật giờ quốc tế."
        ],
        answer: 1,
        explanation: "Nếu ban đêm mà màn hình trung tâm phát ra ánh sáng trắng chói lóa, đồng tử của tài xế sẽ co lại, làm mất khả năng nhìn thấy người đi bộ hay vật cản tối màu trên mặt đường thiếu sáng phía trước."
      },
      {
        id: 14,
        question: "Nút bấm điều khiển trên vô-lăng (Steering Wheel Controls) kết hợp nút cuộn xoay (Thumbwheels) thuộc loại tương tác nào?",
        options: [
          "A. Tương tác xúc giác mù (Eyes-free tactile controls) cho phép điều khiển âm lượng, bài hát và đàm thoại mà hai bàn tay vẫn nắm chặt vô-lăng.",
          "B. Tương tác cảm ứng màn hình phụ.",
          "C. Tương tác sóng não.",
          "D. Thiết bị định vị GPS phụ trợ."
        ],
        answer: 0,
        explanation: "Các nút điều khiển trên vô lăng cho phép ngón cái thao tác theo cảm giác ngón tay (Blind/Eyes-free operation), là phòng tuyến quan trọng giúp hạn chế tài xế phải với tay sang màn hình trung tâm."
      },
      {
        id: 15,
        question: "Khái niệm 'Cognitive Capture' (Bẫy nhận thức) trong buồng lái xảy ra khi:",
        options: [
          "A. Camera xe chụp ảnh khuôn mặt người lái.",
          "B. Tài xế tập trung quá mức vào việc giải mã một đồ họa hoặc thông điệp phức tạp trên màn hình giải trí đến mức 'mắt vẫn nhìn đường nhưng não không hề ghi nhận' tình huống giao thông trước mặt.",
          "C. Xe tự động ghi lại dữ liệu hành trình vào hộp đen.",
          "D. Bộ vi xử lý của xe bị treo."
        ],
        answer: 1,
        explanation: "Hiện tượng 'Looked But Failed to See' (Nhìn mà không thấy): Não bộ bị quá tải bởi tác vụ giải đố giao diện HMI phức tạp, khiến thông tin hình ảnh từ mặt đường truyền vào mắt nhưng không được vỏ não xử lý, gây tai nạn đâm đuôi xe trước."
      }
    ]
  },
  {
    id: 5,
    title: "Bài 5: Nguyên tắc Thiết kế & Khả năng tiếp cận (Accessibility & UX Standards)",
    badge: "UI/UX & Accessibility",
    description: "Kích thước vùng chạm (Touch targets), khoảng cách an toàn, thiết kế chống mù màu, phản hồi xúc giác vi mô, tiêu chuẩn WCAG và phân cấp thị giác.",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Theo khuyến nghị của chuẩn ISO 9241-9 cũng như các Design System hàng đầu (Apple HIG, Google Material Design), kích thước vùng chạm tối thiểu (Touch Target Size) cho ngón tay người là bao nhiêu?",
        options: [
          "A. 10 x 10 px (pixel)",
          "B. 48 x 48 dp / 44 x 44 pt (tương đương khoảng 9mm x 9mm)",
          "C. 100 x 100 mm",
          "D. 2 x 2 cm"
        ],
        answer: 1,
        explanation: "Đầu ngón tay người khi áp vào màn hình có diện tích tiếp xúc trung bình từ 8 - 10mm. Chuẩn 48x48dp (Google) hoặc 44x44pt (Apple) đảm bảo ngón tay chạm chính xác mà không bị hụt."
      },
      {
        id: 2,
        question: "Hiện tượng 'Fat Finger Problem' (Hội chứng ngón tay to) trong thiết kế màn hình cảm ứng được khắc phục hiệu quả nhất bằng cách nào?",
        options: [
          "A. Yêu cầu người dùng giảm cân để ngón tay thon lại.",
          "B. Tăng kích thước vùng bấm (Hit target), thêm khoảng đệm an toàn (Padding/Spacing) giữa các nút và mở rộng diện tích cảm ứng vô hình lớn hơn đồ họa hiển thị.",
          "C. Chỉ cho phép dùng bút stylus.",
          "D. Xóa bớt chữ trên nút bấm."
        ],
        answer: 1,
        explanation: "Giải pháp cho Fat Finger: Tăng kích thước bounding box bấm được, duy trì khoảng cách tối thiểu giữa 2 nút (thường ≥ 8-10dp) để dù ngón tay bấm hơi lệch cũng không bị kích hoạt nhầm nút lân cận."
      },
      {
        id: 3,
        question: "Nguyên tắc thiết kế tiếp cận số một về màu sắc (Color Accessibility) trong hướng dẫn WCAG là gì?",
        options: [
          "A. Chỉ được phép dùng hai màu trắng và đen.",
          "B. Tuyệt đối không bao giờ sử dụng màu sắc làm phương tiện duy nhất để truyền tải thông điệp, chỉ dẫn trạng thái hoặc phân biệt hành động.",
          "C. Tất cả nút bấm phải có màu tím than.",
          "D. Bắt buộc màn hình phải có độ sáng cực đại."
        ],
        answer: 1,
        explanation: "Khoảng 8% nam giới và 0.5% nữ giới trên thế giới bị khiếm khuyết thị giác màu sắc (mù màu). Nếu bạn chỉ đổi màu nút từ đỏ sang xanh mà không có icon dấu tick/chéo hoặc chữ đi kèm, người mù màu hoàn toàn không nhận biết được."
      },
      {
        id: 4,
        question: "Bệnh mù màu phổ biến nhất ở con người (Red-Green Color Blindness - Deuteranopia/Protanopia) gây khó khăn khi phân biệt hai màu nào?",
        options: [
          "A. Màu Đen và Màu Trắng.",
          "B. Màu Đỏ và Màu Xanh lá cây.",
          "C. Màu Vàng và Màu Tím.",
          "D. Màu Cam và Màu Nâu."
        ],
        answer: 1,
        explanation: "Mù màu Đỏ - Xanh lá là dạng phổ biến nhất. Trong HMI nếu dùng đèn tín hiệu đỏ/xanh đơn thuần mà không có nhãn hoặc biểu tượng hình học phân biệt, người bệnh sẽ nhìn thấy cả hai thành hai sắc thái nâu vàng xám giống hệt nhau."
      },
      {
        id: 5,
        question: "Nguyên tắc 'Progressive Disclosure' (Tiết lộ lũy tiến) giúp giảm tải nhận thức cho người dùng như thế nào?",
        options: [
          "A. Giấu toàn bộ chức năng đi và chỉ mở ra khi người dùng trả thêm tiền.",
          "B. Ban đầu chỉ hiển thị những thông tin và tùy chọn quan trọng, cốt lõi nhất; các cài đặt nâng cao hoặc chi tiết phức tạp chỉ xuất hiện khi người dùng chủ động yêu cầu mở rộng.",
          "C. Hiển thị tất cả 100 thông số kỹ thuật lên màn hình chính cùng một lúc.",
          "D. Tự động xóa dữ liệu sau 30 ngày."
        ],
        answer: 1,
        explanation: "Progressive Disclosure tránh làm người dùng 'choáng ngợp' bằng cách chia nhỏ thông tin. Màn hình chính luôn thanh thoát, chỉ hiện cái cần thiết nhất; ai muốn tinh chỉnh chuyên sâu mới bấm 'Nâng cao / Chi tiết'."
      },
      {
        id: 6,
        question: "Khái niệm 'Micro-interactions' (Tương tác vi mô) trong HMI bao gồm những chi tiết như thế nào?",
        options: [
          "A. Các bài thuyết trình dài 2 tiếng đồng hồ về sản phẩm.",
          "B. Các hiệu ứng chuyển động nhỏ, tinh tế (như nút hơi lún xuống khi nhấn, thanh gạt trượt êm ái, icon rung nhẹ xác nhận) kéo dài dưới 300ms nhằm mang lại phản hồi sinh động.",
          "C. Các linh kiện vi mạch siêu nhỏ gắn trên bo mạch chủ.",
          "D. Các cuộc gọi điện thoại ngắn giữa kỹ sư và sếp."
        ],
        answer: 1,
        explanation: "Micro-interactions tạo nên sự gắn kết cảm xúc và sự tự tin cho người dùng. Một hiệu ứng nảy nhẹ khi bấm nút giúp người dùng biết chắc chắn thiết bị đã nhận diện thao tác mà không cần chờ đợi."
      },
      {
        id: 7,
        question: "Trong quy chuẩn giao diện, sự khác biệt căn bản giữa 'Toggle Switch' (Công tắc gạt) và 'Checkbox' (Hộp kiểm) là gì?",
        options: [
          "A. Hoàn toàn không có điểm khác nhau.",
          "B. Toggle Switch dùng cho hành động có hiệu lực ngay lập tức (như bật/tắt đèn); Checkbox dùng để chọn giá trị trong danh sách và thường cần bấm nút 'Lưu / Áp dụng' sau cùng.",
          "C. Toggle Switch chỉ dùng trên điện thoại di động.",
          "D. Checkbox không thể hiển thị trên màn hình máy tính."
        ],
        answer: 1,
        explanation: "Toggle Switch mô phỏng công tắc điện vật lý: gạt là sáng đèn tức thì (Instant effect). Checkbox mang tính chất chọn mục (Selection state), người dùng có thể tích chọn nhiều ô rồi mới ấn Submit."
      },
      {
        id: 8,
        question: "Khi một tác vụ hệ thống tốn nhiều thời gian xử lý, khi nào BẮT BUỘC phải dùng 'Determinate Progress Bar' (Thanh tiến trình có % cụ thể) thay vì vòng tròn xoay tròn vô tận (Indeterminate Spinner)?",
        options: [
          "A. Khi tác vụ kéo dài trên 5 - 10 giây và có thể đo lường được khối lượng công việc hoàn thành.",
          "B. Chỉ khi tác vụ mất đúng 0.1 giây.",
          "C. Khi hệ thống bị mất kết nối internet.",
          "D. Luôn luôn chỉ dùng spinner xoay tròn."
        ],
        answer: 0,
        explanation: "Nếu người dùng phải chờ trên 5-10 giây mà chỉ nhìn thấy một vòng xoay vô tận, họ sẽ cảm thấy hoang mang vì không biết máy đang chạy hay đã bị treo. Một thanh % rõ ràng giúp họ dự đoán được thời gian chờ đợi."
      },
      {
        id: 9,
        question: "Thông báo lỗi (Error Messages) trong thiết kế HMI nhân văn và hiệu quả phải đáp ứng tiêu chuẩn nào?",
        options: [
          "A. Hiện mã lỗi trừu tượng như 'Error 0x80004005' và đổ lỗi cho người dùng.",
          "B. Diễn đạt bằng ngôn ngữ con người dễ hiểu, nêu rõ điều gì vừa xảy ra và đưa ra hướng dẫn cụ thể cách khắc phục hoặc nút bấm khôi phục (Undo/Retry).",
          "C. Tự động đóng ứng dụng ngay lập tức.",
          "D. Phát ra âm thanh còi hú inh ỏi."
        ],
        answer: 1,
        explanation: "Thông báo lỗi tốt không bao giờ làm người dùng cảm thấy ngu ngốc. Nó phải trả lời: (1) Đã có chuyện gì xảy ra? (2) Tại sao? (3) Làm thế nào để giải quyết ngay bây giờ?"
      },
      {
        id: 10,
        question: "Nguyên lý 'Visual Hierarchy' (Phân cấp thị giác) hướng dẫn người thiết kế sắp xếp bố cục như thế nào?",
        options: [
          "A. Tất cả các thành phần trên trang phải có cùng kích thước và độ đậm chữ bằng nhau.",
          "B. Sử dụng kích thước (Scale), độ tương phản (Contrast), màu sắc và khoảng trắng (Whitespace) để dẫn dắt mắt người nhìn vào thông tin quan trọng nhất trước, rồi mới tới thông tin thứ cấp.",
          "C. Xếp tất cả nút bấm thành một hàng dọc ở mép trái.",
          "D. Tô màu đỏ cho tất cả các đoạn văn bản."
        ],
        answer: 1,
        explanation: "Phân cấp thị giác tổ chức trang thông tin theo thứ bậc ưu tiên: Tiêu đề lớn nổi bật nhất → Chỉ số quan trọng → Nội dung giải thích phụ mờ hơn. Người nhìn có thể nắm bắt thông tin quan trọng chỉ trong 1 giây."
      },
      {
        id: 11,
        question: "Khái niệm 'Graceful Degradation' (Thoái lui mềm dẻo / Suy hao mượt mà) trong HMI có nghĩa là:",
        options: [
          "A. Thiết bị tự động giảm giá bán sau 1 năm sử dụng.",
          "B. Khi một cảm biến hoặc mô-đun phụ bị hỏng, hệ thống vẫn duy trì hoạt động an toàn ở chế độ cơ bản/dự phòng cốt lõi thay vì sụp đổ hoàn toàn toàn bộ giao diện.",
          "C. Màn hình tự động vỡ kính khi bị va đập.",
          "D. Người dùng bị giáng chức khi thao tác sai."
        ],
        answer: 1,
        explanation: "Nếu hệ thống định vị GPS bị mất sóng, HMI xe hơi vẫn phải hiển thị được la bàn và bản đồ ngoại tuyến cơ bản; giao diện không được phép crash đứng đơ làm tài xế mất luôn màn hình điều khiển."
      },
      {
        id: 12,
        question: "Tại sao khoảng trắng (White Space / Negative Space) lại là yếu tố sống còn trong thiết kế HMI buồng lái và phòng điều khiển?",
        options: [
          "A. Vì khoảng trắng giúp nhà sản xuất tiết kiệm mực in màn hình.",
          "B. Khoảng trắng tạo 'không gian thở' cho mắt, ngăn ngừa tình trạng quá tải thị giác, giúp người dùng phân biệt ranh giới giữa các nhóm chức năng nhanh chóng hơn.",
          "C. Khoảng trắng chỉ là khoảng trống do lập trình viên lười viết code.",
          "D. Bắt buộc màn hình phải được lấp kín 100% không để lại khe hở."
        ],
        answer: 1,
        explanation: "Nhét quá nhiều nút bấm san sát nhau không chừa một milimet khoảng trắng sẽ tạo ra mớ bòng bong thị giác hỗn loạn, làm tăng thời gian tìm kiếm thông tin của người vận hành lên gấp nhiều lần."
      },
      {
        id: 13,
        question: "Phân biệt giữa 'Internal Consistency' (Nhất quán nội bộ) và 'External Consistency' (Nhất quán bên ngoài) trong thiết kế HMI:",
        options: [
          "A. Internal là trong nước, External là ngoài nước.",
          "B. Internal là nhất quán về phong cách/quy ước giữa các màn hình trong cùng một hệ thống; External là phù hợp với các quy ước, tiêu chuẩn chung của cả ngành công nghiệp mà người dùng đã quen thuộc từ trước.",
          "C. Internal là thiết kế cho nhân viên, External là cho khách hàng.",
          "D. Cả hai khái niệm là một, không có điểm khác biệt."
        ],
        answer: 1,
        explanation: "Internal: Tất cả nút 'Hủy' trong app đều nằm bên trái và có màu xám. External: Biểu tượng kính lúp luôn là tìm kiếm, bánh răng luôn là cài đặt (tuân theo thói quen toàn cầu của nhân loại)."
      },
      {
        id: 14,
        question: "Tại sao việc thiết kế trạng thái 'Disabled' (Vô hiệu hóa) của nút bấm cần phải thận trọng trong HMI?",
        options: [
          "A. Vì nút disabled làm tiêu hao nhiều pin hơn nút bình thường.",
          "B. Nút xám mờ không bấm được mà không có tooltip giải thích 'Tại sao tôi không bấm được và cần làm gì để mở khóa nó' sẽ khiến người dùng cực kỳ ức chế và bế tắc.",
          "C. Nút disabled bị cấm theo luật pháp quốc tế.",
          "D. Người dùng sẽ tưởng màn hình bị cháy đèn LED."
        ],
        answer: 1,
        explanation: "Thay vì âm thầm làm nút bấm xám xịt khiến người dùng ấn liên tục không hiểu lý do, một thiết kế tốt sẽ hiển thị giải thích (ví dụ: 'Hãy điền đủ số điện thoại để tiếp tục') hoặc giữ nút bấm active và báo lỗi cụ thể khi click."
      },
      {
        id: 15,
        question: "Khái niệm 'Slump / Fatigue' do sử dụng cử chỉ tay trong không trung quá lâu (Gorilla Arm Syndrome) nhắc nhở các nhà thiết kế HMI điều gì khi làm giao diện không gian/màn hình cảm ứng dựng đứng?",
        options: [
          "A. Người dùng sẽ bị đau khớp cơ vai và mỏi rã rời nếu bắt họ phải giơ tay lơ lửng về phía trước liên tục trong thời gian dài.",
          "B. Người dùng sẽ biến thành khỉ đột nếu thao tác quá nhanh.",
          "C. Màn hình sẽ bị trầy xước bởi móng tay.",
          "D. Thiết bị sẽ bị nóng lên nhanh chóng."
        ],
        answer: 0,
        explanation: "Hội chứng 'Tay khỉ đột' (Gorilla Arm): Cánh tay người không được sinh ra để giơ ngang vai liên tục hàng chục phút. Thiết kế HMI cảm ứng hoặc AR/VR phải cho phép đặt tay thư giãn hoặc kết hợp nút điều khiển trên mặt bàn/tựa tay."
      }
    ]
  },
  {
    id: 6,
    title: "Bài 6: Đánh giá Usability & Xu hướng tương lai HMI",
    badge: "Testing & Future Trends",
    description: "Thang đo SUS, Heuristic Evaluation, Eye-tracking metrics, NASA-TLX, AR/VR/XR HMI, Giao diện thích ứng AI và BCI (Giao diện não - máy tính).",
    timeLimit: 15,
    questions: [
      {
        id: 1,
        question: "Thang đo SUS (System Usability Scale) của John Brooke là một bảng câu hỏi chuẩn hóa gồm bao nhiêu câu và điểm số trung bình chuẩn (Benchmark) là bao nhiêu?",
        options: [
          "A. Gồm 5 câu hỏi, điểm chuẩn trung bình là 50 điểm.",
          "B. Gồm 10 câu hỏi (xen kẽ tích cực và tiêu cực), thang điểm 0-100, với mốc điểm trung bình chuẩn trong ngành là 68 điểm.",
          "C. Gồm 100 câu hỏi, điểm chuẩn là 90 điểm.",
          "D. Gồm 20 câu hỏi trắc nghiệm kiến thức lập trình."
        ],
        answer: 1,
        explanation: "SUS có 10 câu hỏi đo lường tính khả dụng. Điểm số tính ra theo thang 100. Điểm 68 là mức trung bình chuẩn (Above average nếu > 68, đạt chuẩn 'Tốt' nếu > 80 điểm)."
      },
      {
        id: 2,
        question: "Phương pháp đánh giá chuyên gia 'Heuristic Evaluation' do Jakob Nielsen đề xuất dựa trên bộ bao nhiêu nguyên tắc khả dụng kinh điển?",
        options: [
          "A. 5 nguyên tắc",
          "B. 10 nguyên tắc khả dụng (10 Usability Heuristics)",
          "C. 20 nguyên tắc",
          "D. 100 nguyên tắc"
        ],
        answer: 1,
        explanation: "10 Heuristics nổi tiếng của Nielsen bao gồm: Hiển thị trạng thái hệ thống, Khớp với thế giới thực, Quyền tự do và kiểm soát của người dùng, Nhất quán và tiêu chuẩn, Phòng ngừa lỗi, Nhận biết hơn là nhớ lại, Linh hoạt và hiệu quả, Thiết kế tối giản, Hỗ trợ xử lý lỗi, Trợ giúp và tài liệu."
      },
      {
        id: 3,
        question: "Theo nghiên cứu nổi tiếng của Jakob Nielsen về thử nghiệm người dùng (Usability Testing), thử nghiệm với bao nhiêu người dùng là đủ để phát hiện ra khoảng 85% các lỗi khả dụng cốt lõi?",
        options: [
          "A. Đúng 1 người duy nhất.",
          "B. Khoảng 5 người dùng đại diện.",
          "C. Bắt buộc tối thiểu 10.000 người.",
          "D. Phải thử nghiệm với 100 kỹ sư phần mềm."
        ],
        answer: 1,
        explanation: "Đường cong ROI của Usability testing chỉ ra rằng thử nghiệm với 5 người dùng phát hiện được khoảng 85% lỗi khả dụng nghiêm trọng nhất. Người thứ 6 trở đi thường lặp lại các vấn đề đã tìm thấy."
      },
      {
        id: 4,
        question: "Phương pháp 'Think-Aloud Protocol' (Nghĩ thành tiếng) trong thử nghiệm HMI yêu cầu người tham gia làm gì?",
        options: [
          "A. Hát thật to một bài hát trong lúc làm việc.",
          "B. Liên tục nói to ra miệng tất cả những suy nghĩ, thắc mắc, băn khoăn và cảm xúc của mình trong suốt quá trình thao tác với hệ thống.",
          "C. Tranh luận nảy lửa với người quan sát.",
          "D. Giữ im lặng tuyệt đối không phát ra tiếng động."
        ],
        answer: 1,
        explanation: "Think-Aloud là 'máy quét suy nghĩ' tốt nhất. Khi người dùng nói: 'Ủa sao tôi bấm nút này mà không thấy đèn sáng nhỉ?', người nghiên cứu sẽ ngay lập tức bắt trọn khoảng trống phản hồi của hệ thống."
      },
      {
        id: 5,
        question: "Trong nghiên cứu Eye-tracking trên màn hình HMI, chỉ số 'Fixation Duration' (Thời lượng dừng mắt) phản ánh điều gì?",
        options: [
          "A. Tốc độ chớp mắt của người dùng.",
          "B. Thời gian mắt tập trung nhìn cố định vào một điểm/vùng cụ thể, chỉ ra mức độ chú ý hoặc mức độ phức tạp/khó hiểu của thành phần đó đối với người vận hành.",
          "C. Độ cận thị của người tham gia thử nghiệm.",
          "D. Số lần người dùng quay đầu sang hướng khác."
        ],
        answer: 1,
        explanation: "Fixation là lúc mắt dừng lại tiếp nhận thông tin. Thời gian dừng mắt quá dài tại một biểu tượng có thể báo hiệu biểu tượng đó quá khó hiểu, khiến người dùng phải căng mắt giải mã."
      },
      {
        id: 6,
        question: "Phương pháp 'Card Sorting' (Phân loại thẻ) thường được ứng dụng trong giai đoạn nào của thiết kế HMI?",
        options: [
          "A. Khi chuẩn bị thanh lý màn hình cũ.",
          "B. Giai đoạn nghiên cứu và thiết kế Kiến trúc thông tin (Information Architecture), nhằm tìm hiểu cách người dùng tự nhiên phân nhóm các tính năng và danh mục trong đầu họ.",
          "C. Khi viết tài liệu bảo hành thiết bị.",
          "D. Để phân chia ca làm việc cho công nhân."
        ],
        answer: 1,
        explanation: "Card Sorting cho người dùng xếp các tấm thẻ ghi tên chức năng vào các nhóm mà họ cho là hợp lý, giúp xây dựng cây menu HMI ăn khớp với mô hình tinh thần tự nhiên của người dùng."
      },
      {
        id: 7,
        question: "Giao diện không gian (Spatial Computing / XR HMI - như trên Apple Vision Pro, HoloLens) mang lại bước nhảy vọt nào cho kỹ sư bảo trì nhà máy?",
        options: [
          "A. Giúp kỹ sư xem video game trên trần nhà xưởng.",
          "B. Hiển thị thông số kỹ thuật số, sơ đồ mạch điện và hướng dẫn sửa chữa dạng 3D neo trực tiếp (Anchored) ngay trên thân máy móc thực tế theo thời gian thực.",
          "C. Làm cho máy móc tự động biến mất khỏi tầm mắt.",
          "D. Thay thế hoàn toàn cờ-lê và mỏ-lết bằng cử chỉ ảo."
        ],
        answer: 1,
        explanation: "AR HMI phủ dữ liệu số lên thế giới thực (Digital Twin). Kỹ sư chỉ cần nhìn vào đường ống là thấy ngay áp suất bên trong, nhiệt độ và vị trí van đang bị rò rỉ mà không cần đối chiếu vào tài liệu giấy."
      },
      {
        id: 8,
        question: "Xu hướng 'Adaptive HMI' (Giao diện thích ứng thông minh hỗ trợ bởi AI) là gì?",
        options: [
          "A. Giao diện tự động thay đổi ngôn ngữ sang tiếng Pháp mỗi tuần.",
          "B. Hệ thống tự động điều chỉnh cách hiển thị, độ ưu tiên của thông tin và đề xuất tác vụ dựa trên ngữ cảnh thực tế (mức độ khẩn cấp, điều kiện ánh sáng, tải công việc và thói quen của người vận hành).",
          "C. Giao diện tự động tắt máy khi thấy người vận hành mệt mỏi.",
          "D. Bắt buộc người dùng phải học thuộc lại giao diện mới mỗi ngày."
        ],
        answer: 1,
        explanation: "Adaptive HMI không cố định một giao diện duy nhất cho mọi tình huống. Khi trời mưa hoặc đường trơn trượt, nó chủ động đẩy cảnh báo khoảng cách lên trước; khi người lái đang thư thả, nó tối giản hóa để tạo không gian thoáng đãng."
      },
      {
        id: 9,
        question: "Giao diện Não - Máy tính (Brain-Computer Interface - BCI) hiện nay đang hướng tới những ứng dụng HMI tiên phong nào?",
        options: [
          "A. Thay thế hoàn toàn việc học tập của trẻ em.",
          "B. Giải mã tín hiệu sóng não (EEG) để hỗ trợ người khuyết tật/liệt vận động điều khiển xe lăn, cánh tay giả hoặc phát hiện trạng thái ngủ gật/mất tập trung của phi công và tài xế.",
          "C. Cho phép máy tính đọc trộm toàn bộ suy nghĩ thầm kín của con người.",
          "D. Tự động chuyển khoản tiền ngân hàng qua ý nghĩ."
        ],
        answer: 1,
        explanation: "BCI mang lại tiềm năng to lớn trong y tế phục hồi chức năng và an toàn giao thông: theo dõi mức độ buồn ngủ (drowsiness) qua sóng não để kích hoạt cảnh báo cứu nạn trước khi tài xế thiếp đi."
      },
      {
        id: 10,
        question: "Hiệu ứng 'Thung lũng kỳ lạ' (Uncanny Valley) trong thiết kế Trợ lý ảo/Hình nhân số (Digital Human / AI Avatar) trên HMI cảnh báo điều gì?",
        options: [
          "A. Robot càng rẻ tiền thì người dùng càng ghét.",
          "B. Khi một nhân vật ảo được tạo hình gần giống người thật nhưng các chuyển động cơ mặt hoặc ánh mắt chưa đạt tới mức hoàn hảo tự nhiên, nó sẽ gây ra cảm giác ghê sợ, rùng mình và xa lánh cho người tương tác.",
          "C. Không nên đặt màn hình ở những vùng thung lũng có đồi núi.",
          "D. Robot hình người sẽ sớm thống trị thế giới."
        ],
        answer: 1,
        explanation: "Uncanny Valley chỉ ra rằng đồ họa mô phỏng người thật nếu làm nửa vời (mắt đờ đẫn, cơ miệng lệch lạc) sẽ khiến người dùng rợn tóc gáy. Vì vậy, nhiều hãng chọn phong cách Stylized / Hoạt họa thân thiện thay vì cố làm giống người thật 100%."
      },
      {
        id: 11,
        question: "Trong đánh giá hiệu năng HMI theo ISO 9241, 'Task Completion Rate' (Tỷ lệ hoàn thành tác vụ) và 'Time on Task' (Thời gian thực hiện tác vụ) đại diện cho hai khía cạnh nào?",
        options: [
          "A. Tỷ lệ hoàn thành đại diện cho 'Hiệu quả' (Effectiveness); Thời gian thực hiện đại diện cho 'Hiệu suất' (Efficiency).",
          "B. Cả hai đều chỉ đo mức độ hài lòng của khách hàng.",
          "C. Đo lường tốc độ mạng cáp quang.",
          "D. Đo tuổi thọ của pin lithium."
        ],
        answer: 0,
        explanation: "Effectiveness (Hiệu quả): Người dùng có hoàn thành được mục tiêu không (Ví dụ: 95% làm được). Efficiency (Hiệu suất): Mất bao nhiêu tài nguyên/thời gian để hoàn thành mục tiêu đó (Ví dụ: mất 30 giây thay vì 5 phút)."
      },
      {
        id: 12,
        question: "Tại sao phương pháp A/B Testing trực tiếp trên môi trường thực tế (Live Environment) lại bị hạn chế hoặc cấm ngặt trong HMI buồng lái máy bay hay nhà máy hạt nhân?",
        options: [
          "A. Vì chi phí làm A/B testing quá rẻ.",
          "B. Vì tính nhất quán và thói quen phản xạ cơ bắp là yếu tố sống còn; việc thay đổi ngẫu nhiên vị trí nút bấm trên người vận hành thực tế có thể dẫn đến thao tác sai lầm chết người trong tình huống khẩn cấp.",
          "C. Vì phần mềm máy bay không hỗ trợ mạng internet.",
          "D. Vì các kỹ sư không biết thuật toán thống kê."
        ],
        answer: 1,
        explanation: "Trong hệ thống an toàn cao (Safety-critical), mọi thay đổi giao diện phải được huấn luyện bài bản qua hàng trăm giờ mô phỏng (Simulators). Bạn không thể A/B test nút dừng khẩn cấp trên một lò phản ứng hạt nhân đang chạy thật."
      },
      {
        id: 13,
        question: "Công nghệ nhận diện cử chỉ trong không gian (Touchless Air Gestures - như gạt tay để qua bài hát trên xe hơi) gặp phải rào cản Usability lớn nhất nào?",
        options: [
          "A. Cảm biến cử chỉ tiêu thụ quá nhiều xăng.",
          "B. Thiếu tính 'Discoverability' (người dùng không biết có những cử chỉ nào và khua tay thế nào cho đúng) và tỷ lệ nhận diện nhầm cử chỉ vô tình khi nói chuyện bình thường.",
          "C. Bắt buộc người dùng phải đeo găng tay điện tử.",
          "D. Cử chỉ chỉ hoạt động được khi trời mưa."
        ],
        answer: 1,
        explanation: "Cử chỉ trong không trung không có biển chỉ dẫn (Signifiers) hiển thị rõ ràng và rất dễ bị kích hoạt nhầm khi tài xế vung tay nói chuyện với người bên cạnh (False positives), khiến người dùng nhanh chóng tắt tính năng này."
      },
      {
        id: 14,
        question: "Khi tiến hành Usability Testing cho một hệ thống HMI công nghiệp mới, môi trường kiểm thử lý tưởng nhất nên là:",
        options: [
          "A. Một phòng họp yên tĩnh hoàn hảo không có tiếng động nào.",
          "B. Môi trường mô phỏng có độ chân thực cao (High-fidelity Simulator) tái hiện đầy đủ tiếng ồn xung quanh, độ rung lắc, ánh sáng phức tạp và áp lực thời gian của ca trực thực tế.",
          "C. Quán cà phê đông người qua lại.",
          "D. Chỉ gửi bảng câu hỏi qua Google Form mà không cần quan sát."
        ],
        answer: 1,
        explanation: "Một giao diện có thể chạy rất mượt trong phòng máy lạnh yên tĩnh, nhưng sẽ bộc lộ vô số nhược điểm chết người khi công nhân đeo găng tay đứng giữa nhà xưởng ồn 90dB và bị rung lắc. High-fidelity simulation là bắt buộc."
      },
      {
        id: 15,
        question: "Mục đích cao nhất của việc học tập, thiết kế và tối ưu trải nghiệm HMI (Human-Machine Interface) là gì?",
        options: [
          "A. Thay thế hoàn toàn vai trò của con người trong kỷ nguyên máy móc.",
          "B. Xây dựng sự cộng sinh hài hòa, an toàn và trực quan giữa con người và công nghệ, biến máy móc thành phần mở rộng tự nhiên của trí tuệ và năng lực con người.",
          "C. Đạt giải thưởng về thiết kế đồ họa nghệ thuật.",
          "D. Tăng thời gian người dùng dán mắt vào màn hình kỹ thuật số."
        ],
        answer: 1,
        explanation: "HMI xuất sắc không nhằm khoe khoang công nghệ mà tôn vinh con người: tăng cường năng lực nhận thức, giải phóng đôi tay và khối óc, ngăn chặn tai nạn rủi ro và đưa sự tương tác giữa người và máy đạt tới mức độ liền mạch, tự nhiên như một phần của cơ thể."
      }
    ]
  }
];

// HTML Template Builder
function generateHtml() {
  const jsonData = JSON.stringify(testsData);
  
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Khóa Học & Bộ Đề Kiểm Tra Trải Nghiệm HMI (Human-Machine Interface)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      --primary-light: #eff6ff;
      --secondary: #0ea5e9;
      --accent: #8b5cf6;
      --success: #10b981;
      --success-light: #ecfdf5;
      --danger: #ef4444;
      --danger-light: #fef2f2;
      --warning: #f59e0b;
      --warning-light: #fffbeb;
      --bg: #0f172a;
      --bg-card: #1e293b;
      --bg-surface: #334155;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --border: #334155;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-full: 9999px;
      --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
      --font-main: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    [data-theme="light"] {
      --bg: #f8fafc;
      --bg-card: #ffffff;
      --bg-surface: #f1f5f9;
      --text: #0f172a;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
      --primary-light: #eff6ff;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      transition: background-color 0.2s ease, border-color 0.2s ease;
    }

    body {
      font-family: var(--font-main);
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* Header */
    header {
      background: var(--bg-card);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 50;
      backdrop-filter: blur(12px);
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
    }

    .brand-icon {
      width: 42px;
      height: 42px;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 800;
      font-size: 1.25rem;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }

    .brand-title h1 {
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .brand-title p {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .btn-secondary {
      background: var(--bg-surface);
      color: var(--text);
      border: 1px solid var(--border);
      padding: 0.5rem 1rem;
      border-radius: var(--radius-sm);
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-secondary:hover {
      background: var(--border);
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--primary), var(--primary-hover));
      color: white;
      border: none;
      padding: 0.65rem 1.25rem;
      border-radius: var(--radius-sm);
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
    }

    .btn-primary:hover {
      opacity: 0.95;
      transform: translateY(-1px);
    }

    /* Container */
    main {
      flex: 1;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }

    /* Hero Banner */
    .hero {
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(139, 92, 246, 0.1));
      border: 1px solid rgba(37, 99, 235, 0.2);
      border-radius: var(--radius-lg);
      padding: 2.25rem;
      margin-bottom: 2rem;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 1.5rem;
      align-items: center;
      position: relative;
      overflow: hidden;
    }

    .hero-content h2 {
      font-size: 1.75rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }

    .hero-content p {
      color: var(--text-muted);
      font-size: 0.95rem;
      max-width: 650px;
    }

    .hero-stats {
      display: flex;
      gap: 1.5rem;
      background: var(--bg-card);
      padding: 1.25rem 1.75rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
    }

    .stat-item {
      text-align: center;
    }

    .stat-value {
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--primary);
      font-family: var(--font-mono);
    }

    .stat-label {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    /* Dashboard Grid of Tests */
    .section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.25rem;
    }

    .section-title h3 {
      font-size: 1.25rem;
      font-weight: 700;
    }

    .test-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.25rem;
      margin-bottom: 3rem;
    }

    .test-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      position: relative;
    }

    .test-card:hover {
      transform: translateY(-3px);
      border-color: var(--primary);
      box-shadow: var(--shadow);
    }

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .badge {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.65rem;
      border-radius: var(--radius-full);
      background: var(--bg-surface);
      color: var(--primary);
      border: 1px solid rgba(37, 99, 235, 0.2);
    }

    .status-pill {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.2rem 0.5rem;
      border-radius: var(--radius-full);
    }

    .status-pill.completed {
      background: var(--success-light);
      color: var(--success);
    }

    .status-pill.unattempted {
      background: var(--bg-surface);
      color: var(--text-muted);
    }

    .test-card h4 {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    .test-card p {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 1.25rem;
      flex: 1;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid var(--border);
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .score-badge {
      font-weight: 700;
      color: var(--success);
      font-family: var(--font-mono);
      font-size: 0.95rem;
    }

    /* Overall Summary Modal / View */
    .summary-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: var(--shadow);
    }

    .summary-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .summary-header h2 {
      font-size: 1.75rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
    }

    .final-score-display {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--bg-surface), var(--bg-card));
      border: 4px solid var(--primary);
      margin: 1.5rem auto;
      box-shadow: 0 0 25px rgba(37, 99, 235, 0.25);
    }

    .final-score-num {
      font-size: 2.5rem;
      font-weight: 800;
      font-family: var(--font-mono);
      color: var(--text);
    }

    .final-score-total {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .summary-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1.5rem;
      font-size: 0.9rem;
    }

    .summary-table th, .summary-table td {
      padding: 0.9rem 1rem;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }

    .summary-table th {
      background: var(--bg-surface);
      font-weight: 700;
      color: var(--text);
    }

    /* Quiz Taking View */
    .quiz-view {
      display: none;
    }

    .quiz-view.active {
      display: block;
    }

    .quiz-header {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      position: sticky;
      top: 5rem;
      z-index: 40;
      box-shadow: var(--shadow);
    }

    .quiz-info h3 {
      font-size: 1.25rem;
      font-weight: 700;
    }

    .quiz-info p {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .quiz-tracker {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }

    .progress-bar-container {
      width: 160px;
      height: 8px;
      background: var(--bg-surface);
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), var(--accent));
      width: 0%;
      transition: width 0.3s ease;
    }

    .timer-badge {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1rem;
      color: var(--warning);
      background: rgba(245, 158, 11, 0.1);
      padding: 0.4rem 0.8rem;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(245, 158, 11, 0.2);
    }

    /* Question Cards */
    .question-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .question-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 1.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      position: relative;
    }

    .question-card.answered {
      border-left: 4px solid var(--primary);
    }

    .question-card.correct-res {
      border-left: 4px solid var(--success);
    }

    .question-card.incorrect-res {
      border-left: 4px solid var(--danger);
    }

    .q-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    .q-number {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .q-text {
      font-size: 1.05rem;
      font-weight: 600;
      margin-bottom: 1.25rem;
      line-height: 1.5;
    }

    .options-grid {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .option-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 0.85rem 1rem;
      cursor: pointer;
      transition: all 0.15s ease;
      user-select: none;
    }

    .option-item:hover {
      border-color: var(--primary);
      background: rgba(37, 99, 235, 0.05);
    }

    .option-item input[type="radio"] {
      margin-top: 0.25rem;
      accent-color: var(--primary);
      cursor: pointer;
      width: 18px;
      height: 18px;
    }

    .option-text {
      font-size: 0.95rem;
      line-height: 1.45;
      flex: 1;
    }

    .option-item.selected {
      border-color: var(--primary);
      background: rgba(37, 99, 235, 0.12);
      font-weight: 600;
    }

    .option-item.correct {
      border-color: var(--success) !important;
      background: rgba(16, 185, 129, 0.15) !important;
    }

    .option-item.wrong {
      border-color: var(--danger) !important;
      background: rgba(239, 68, 68, 0.15) !important;
    }

    /* Explanation Box */
    .explanation-box {
      margin-top: 1.25rem;
      padding: 1rem 1.25rem;
      border-radius: var(--radius-sm);
      background: rgba(37, 99, 235, 0.05);
      border: 1px solid rgba(37, 99, 235, 0.2);
      font-size: 0.875rem;
      display: none;
    }

    .explanation-box.show {
      display: block;
      animation: fadeIn 0.3s ease;
    }

    .explanation-box strong {
      color: var(--primary);
      display: inline-block;
      margin-bottom: 0.25rem;
    }

    /* Actions Footer */
    .quiz-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      padding: 1.25rem 1.75rem;
      position: sticky;
      bottom: 1.5rem;
      z-index: 30;
      box-shadow: var(--shadow);
    }

    /* Modal / Result View */
    .result-modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(6px);
      z-index: 100;
      justify-content: center;
      align-items: center;
      padding: 1.5rem;
    }

    .result-modal.active {
      display: flex;
    }

    .result-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      max-width: 550px;
      width: 100%;
      padding: 2.25rem;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      animation: modalSlide 0.3s ease;
    }

    .result-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 1.25rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.25rem;
    }

    .result-icon.pass {
      background: var(--success-light);
      color: var(--success);
      border: 2px solid var(--success);
    }

    .result-icon.fail {
      background: var(--warning-light);
      color: var(--warning);
      border: 2px solid var(--warning);
    }

    .score-circle {
      font-size: 3rem;
      font-weight: 800;
      font-family: var(--font-mono);
      color: var(--primary);
      margin: 0.5rem 0;
    }

    .modal-actions {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      margin-top: 1.75rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes modalSlide {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero {
        grid-template-columns: 1fr;
        padding: 1.5rem;
      }
      .hero-stats {
        width: 100%;
        justify-content: space-around;
      }
      .test-grid {
        grid-template-columns: 1fr;
      }
      .quiz-header {
        position: static;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="header-container">
      <div class="brand" onclick="goHome()">
        <div class="brand-icon">HMI</div>
        <div class="brand-title">
          <h1>HMI Master Test Suite</h1>
          <p>Hệ thống Đánh Giá Năng Lực Trải Nghiệm Giao Diện Người - Máy</p>
        </div>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" onclick="toggleTheme()" id="themeBtn">🌙 Giao diện</button>
        <button class="btn-secondary" onclick="showOverallReport()">📊 Bảng Tổng Kết Khóa</button>
      </div>
    </div>
  </header>

  <main>
    <!-- VIEW 1: HOME DASHBOARD -->
    <div id="homeView">
      <div class="hero">
        <div class="hero-content">
          <h2>Chương Trình Đánh Giá Hiểu Biết Về Trải Nghiệm HMI</h2>
          <p>Bộ câu hỏi trắc nghiệm chuyên sâu gồm 6 bài test (tổng 90 câu) bao quát toàn diện từ nền tảng lý thuyết Don Norman, tâm lý học nhận thức, tiêu chuẩn SCADA/ISA-101 công nghiệp, buồng lái xe thông minh đến kiểm thử Usability chuẩn quốc tế.</p>
        </div>
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-value">6</div>
            <div class="stat-label">Bài Test</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">90</div>
            <div class="stat-label">Câu Hỏi</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" id="overallCompletion">0%</div>
            <div class="stat-label">Đã Hoàn Thành</div>
          </div>
        </div>
      </div>

      <div class="section-title">
        <h3>Danh Sách Các Bài Test</h3>
        <button class="btn-secondary" onclick="resetAllProgress()">🔄 Đặt lại tiến độ</button>
      </div>

      <div class="test-grid" id="testCardsContainer">
        <!-- Generated by JavaScript -->
      </div>
    </div>

    <!-- VIEW 2: QUIZ TAKING VIEW -->
    <div id="quizView" class="quiz-view">
      <div class="quiz-header">
        <div class="quiz-info">
          <button class="btn-secondary" style="margin-bottom: 0.5rem; padding: 0.3rem 0.6rem; font-size: 0.8rem;" onclick="goHome()">← Quay lại Dashboard</button>
          <h3 id="currentQuizTitle">Bài 1: Khái niệm Cốt lõi & Lịch sử Tiến hóa HMI</h3>
          <p id="currentQuizDesc">Nắm vững bản chất của Giao diện Người - Máy...</p>
        </div>
        <div class="quiz-tracker">
          <div class="progress-bar-container">
            <div class="progress-fill" id="quizProgressBar"></div>
          </div>
          <span style="font-size: 0.85rem; font-weight: 600;" id="quizProgressText">0/15 câu</span>
          <div class="timer-badge">
            ⏱️ <span id="timerText">15:00</span>
          </div>
        </div>
      </div>

      <div class="question-list" id="questionsContainer">
        <!-- Questions rendered here -->
      </div>

      <div class="quiz-footer">
        <button class="btn-secondary" onclick="goHome()">Hủy & Quay lại</button>
        <div id="submissionFooterActions">
          <button class="btn-primary" onclick="submitCurrentQuiz()" id="submitQuizBtn">Nộp Bài & Chấm Điểm 📝</button>
        </div>
      </div>
    </div>

    <!-- VIEW 3: OVERALL FINAL REPORT -->
    <div id="reportView" style="display: none;">
      <div class="summary-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <button class="btn-secondary" onclick="goHome()">← Quay lại Dashboard</button>
          <button class="btn-secondary" onclick="window.print()">🖨️ In Bảng Điểm</button>
        </div>
        <div class="summary-header">
          <h2>Bảng Tổng Kết Điểm Cuối Khóa HMI</h2>
          <p style="color: var(--text-muted);">Tổng hợp kết quả đánh giá 6 học phần chuyên đề trải nghiệm HMI</p>
          
          <div class="final-score-display">
            <div class="final-score-num" id="finalAvgScore">0.0</div>
            <div class="final-score-total">Thang điểm 10</div>
          </div>
          <h3 id="finalGradingRank" style="margin-top: 0.5rem; color: var(--primary);">Chưa hoàn thành</h3>
        </div>

        <table class="summary-table">
          <thead>
            <tr>
              <th>Học phần / Bài Test</th>
              <th>Số câu đúng</th>
              <th>Điểm số</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody id="summaryTableBody">
            <!-- Rendered by JS -->
          </tbody>
        </table>
      </div>
    </div>
  </main>

  <!-- RESULT MODAL -->
  <div class="result-modal" id="resultModal">
    <div class="result-card">
      <div class="result-icon pass" id="modalResultIcon">🎉</div>
      <h2 id="modalResultTitle">Hoàn Thành Bài Test!</h2>
      <p id="modalResultSubtitle" style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.25rem;">Kết quả học phần của bạn:</p>
      
      <div class="score-circle" id="modalScoreDisplay">14/15</div>
      <p id="modalPercentageDisplay" style="font-weight: 700; color: var(--success); font-size: 1.1rem;">Đạt 93.3%</p>
      <p id="modalEvaluationText" style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.5rem;">Xuất sắc! Bạn đã làm chủ vững vàng các kiến thức trong phần này.</p>
      
      <div class="modal-actions">
        <button class="btn-secondary" onclick="closeResultModal()">Xem Lời Giải Chi Tiết</button>
        <button class="btn-primary" onclick="goNextOrHome()">Tiếp Tục ➔</button>
      </div>
    </div>
  </div>

  <script>
    // DATA
    const testsData = ${jsonData};

    // STORAGE STATE
    let userAnswers = {}; // { [testId]: { [qId]: optionIndex } }
    let testResults = {}; // { [testId]: { score: number, total: number, submitted: boolean } }
    let currentActiveTestId = null;
    let timerInterval = null;
    let timeRemaining = 900; // 15 mins in sec

    // INIT
    function init() {
      loadSavedState();
      renderDashboard();
      updateOverallStats();
    }

    function loadSavedState() {
      try {
        const savedAns = localStorage.getItem('hmi_quiz_answers');
        const savedRes = localStorage.getItem('hmi_quiz_results');
        if (savedAns) userAnswers = JSON.parse(savedAns);
        if (savedRes) testResults = JSON.parse(savedRes);
      } catch (e) {
        console.error(e);
      }
    }

    function saveState() {
      try {
        localStorage.setItem('hmi_quiz_answers', JSON.stringify(userAnswers));
        localStorage.setItem('hmi_quiz_results', JSON.stringify(testResults));
      } catch (e) {
        console.error(e);
      }
    }

    function renderDashboard() {
      const container = document.getElementById('testCardsContainer');
      container.innerHTML = '';

      testsData.forEach(test => {
        const res = testResults[test.id];
        const isDone = res && res.submitted;
        const scoreText = isDone ? res.score + '/' + res.total + ' câu (' + ((res.score / res.total) * 10).toFixed(1) + 'đ)' : 'Chưa làm';

        const card = document.createElement('div');
        card.className = 'test-card';
        card.onclick = () => startTest(test.id);

        card.innerHTML = 
          '<div class="card-top">' +
            '<span class="badge">' + test.badge + '</span>' +
            '<span class="status-pill ' + (isDone ? 'completed' : 'unattempted') + '">' + (isDone ? '✓ Đã chấm điểm' : '15 câu hỏi') + '</span>' +
          '</div>' +
          '<h4>' + test.title + '</h4>' +
          '<p>' + test.description + '</p>' +
          '<div class="card-footer">' +
            '<span>⏱️ ' + test.timeLimit + ' phút</span>' +
            '<span class="score-badge">' + scoreText + '</span>' +
          '</div>';

        container.appendChild(card);
      });
    }

    function updateOverallStats() {
      let completedCount = 0;
      testsData.forEach(t => {
        if (testResults[t.id] && testResults[t.id].submitted) completedCount++;
      });
      const pct = Math.round((completedCount / testsData.length) * 100);
      document.getElementById('overallCompletion').innerText = pct + '%';
    }

    function startTest(testId) {
      currentActiveTestId = testId;
      const test = testsData.find(t => t.id === testId);
      if (!test) return;

      document.getElementById('homeView').style.display = 'none';
      document.getElementById('reportView').style.display = 'none';
      const qView = document.getElementById('quizView');
      qView.classList.add('active');

      document.getElementById('currentQuizTitle').innerText = test.title;
      document.getElementById('currentQuizDesc').innerText = test.description;

      renderQuestions(test);
      updateQuizProgress();

      // Timer
      clearInterval(timerInterval);
      timeRemaining = test.timeLimit * 60;
      updateTimerDisplay();
      
      const res = testResults[testId];
      if (res && res.submitted) {
        document.getElementById('submissionFooterActions').innerHTML = 
          '<button class="btn-secondary" onclick="retakeCurrentQuiz()">Làm lại bài này 🔄</button>';
      } else {
        document.getElementById('submissionFooterActions').innerHTML = 
          '<button class="btn-primary" onclick="submitCurrentQuiz()" id="submitQuizBtn">Nộp Bài & Chấm Điểm 📝</button>';
        timerInterval = setInterval(() => {
          timeRemaining--;
          updateTimerDisplay();
          if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert('Hết thời gian làm bài! Hệ thống sẽ tự động chấm điểm bài làm của bạn.');
            submitCurrentQuiz();
          }
        }, 1000);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateTimerDisplay() {
      const min = Math.floor(timeRemaining / 60);
      const sec = timeRemaining % 60;
      document.getElementById('timerText').innerText = 
        String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
    }

    function renderQuestions(test) {
      const container = document.getElementById('questionsContainer');
      container.innerHTML = '';

      const testAns = userAnswers[test.id] || {};
      const res = testResults[test.id];
      const isSubmitted = res && res.submitted;

      test.questions.forEach((q, idx) => {
        const selectedOpt = testAns[q.id];
        const card = document.createElement('div');
        card.className = 'question-card' + (selectedOpt !== undefined ? ' answered' : '');

        if (isSubmitted) {
          const isCorrect = selectedOpt === q.answer;
          card.classList.add(isCorrect ? 'correct-res' : 'incorrect-res');
        }

        let optionsHtml = '';
        q.options.forEach((optText, optIdx) => {
          let optClass = 'option-item';
          const isSelected = selectedOpt === optIdx;
          if (isSelected) optClass += ' selected';

          if (isSubmitted) {
            if (optIdx === q.answer) optClass += ' correct';
            else if (isSelected && optIdx !== q.answer) optClass += ' wrong';
          }

          optionsHtml += 
            '<label class="' + optClass + '">' +
              '<input type="radio" name="q_' + q.id + '" value="' + optIdx + '" ' + 
                (isSelected ? 'checked ' : '') + 
                (isSubmitted ? 'disabled ' : '') +
                'onchange="handleSelectOption(' + test.id + ', ' + q.id + ', ' + optIdx + ')">' +
              '<span class="option-text">' + optText + '</span>' +
            '</label>';
        });

        card.innerHTML = 
          '<div class="q-meta">' +
            '<span class="q-number">Câu hỏi ' + (idx + 1) + ' / 15</span>' +
            (isSubmitted ? (selectedOpt === q.answer ? '<span style="color:var(--success);font-weight:700;">✓ Đúng</span>' : '<span style="color:var(--danger);font-weight:700;">✗ Sai</span>') : '') +
          '</div>' +
          '<div class="q-text">' + q.question + '</div>' +
          '<div class="options-grid">' + optionsHtml + '</div>' +
          '<div class="explanation-box ' + (isSubmitted ? 'show' : '') + '">' +
            '<strong>💡 Giải thích chuyên sâu:</strong><br>' + q.explanation +
          '</div>';

        container.appendChild(card);
      });
    }

    function handleSelectOption(testId, qId, optIdx) {
      if (!userAnswers[testId]) userAnswers[testId] = {};
      userAnswers[testId][qId] = optIdx;
      saveState();
      updateQuizProgress();

      // Highlight UI
      const test = testsData.find(t => t.id === testId);
      if (test) renderQuestions(test);
    }

    function updateQuizProgress() {
      if (!currentActiveTestId) return;
      const test = testsData.find(t => t.id === currentActiveTestId);
      if (!test) return;

      const answeredCount = userAnswers[test.id] ? Object.keys(userAnswers[test.id]).length : 0;
      const pct = Math.round((answeredCount / test.questions.length) * 100);
      document.getElementById('quizProgressBar').style.width = pct + '%';
      document.getElementById('quizProgressText').innerText = answeredCount + '/' + test.questions.length + ' câu';
    }

    function submitCurrentQuiz() {
      clearInterval(timerInterval);
      const test = testsData.find(t => t.id === currentActiveTestId);
      if (!test) return;

      const testAns = userAnswers[test.id] || {};
      const answeredCount = Object.keys(testAns).length;

      if (answeredCount < test.questions.length) {
        const confirmSub = confirm('Bạn mới trả lời ' + answeredCount + '/' + test.questions.length + ' câu hỏi. Bạn có chắc chắn muốn nộp bài ngay bây giờ?');
        if (!confirmSub) return;
      }

      // Calculate score
      let correct = 0;
      test.questions.forEach(q => {
        if (testAns[q.id] === q.answer) correct++;
      });

      testResults[test.id] = {
        score: correct,
        total: test.questions.length,
        submitted: true
      };
      saveState();

      // Show result modal
      const pct = Math.round((correct / test.questions.length) * 100);
      document.getElementById('modalScoreDisplay').innerText = correct + '/' + test.questions.length;
      document.getElementById('modalPercentageDisplay').innerText = 'Đạt ' + pct + '% (Tương đương ' + ((correct / test.questions.length) * 10).toFixed(1) + '/10 điểm)';

      const icon = document.getElementById('modalResultIcon');
      const title = document.getElementById('modalResultTitle');
      const evalText = document.getElementById('modalEvaluationText');

      if (pct >= 80) {
        icon.className = 'result-icon pass';
        icon.innerText = '🏆';
        title.innerText = 'Kết Quả Xuất Sắc!';
        evalText.innerText = 'Bạn có nền tảng tư duy và kiến thức HMI rất vững vàng!';
      } else if (pct >= 60) {
        icon.className = 'result-icon pass';
        icon.innerText = '👍';
        title.innerText = 'Đạt Yêu Cầu!';
        evalText.innerText = 'Bạn đã nắm được phần lớn các nguyên lý cốt lõi, hãy xem lại các câu sai để hoàn thiện.';
      } else {
        icon.className = 'result-icon fail';
        icon.innerText = '📚';
        title.innerText = 'Cần Ôn Tập Thêm!';
        evalText.innerText = 'Chủ đề này có nhiều chuẩn kỹ thuật sâu, hãy đọc kỹ phần giải thích chi tiết phía dưới.';
      }

      document.getElementById('resultModal').classList.add('active');

      // Re-render test with explanations
      renderQuestions(test);
      document.getElementById('submissionFooterActions').innerHTML = 
        '<button class="btn-secondary" onclick="retakeCurrentQuiz()">Làm lại bài này 🔄</button>';
      
      updateOverallStats();
      renderDashboard();
    }

    function closeResultModal() {
      document.getElementById('resultModal').classList.remove('active');
    }

    function goNextOrHome() {
      closeResultModal();
      if (currentActiveTestId < testsData.length) {
        startTest(currentActiveTestId + 1);
      } else {
        showOverallReport();
      }
    }

    function retakeCurrentQuiz() {
      if (!confirm('Bạn có muốn xóa kết quả cũ và làm lại bài kiểm tra này từ đầu không?')) return;
      delete userAnswers[currentActiveTestId];
      delete testResults[currentActiveTestId];
      saveState();
      startTest(currentActiveTestId);
    }

    function goHome() {
      clearInterval(timerInterval);
      document.getElementById('quizView').classList.remove('active');
      document.getElementById('reportView').style.display = 'none';
      document.getElementById('homeView').style.display = 'block';
      renderDashboard();
      updateOverallStats();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showOverallReport() {
      clearInterval(timerInterval);
      document.getElementById('quizView').classList.remove('active');
      document.getElementById('homeView').style.display = 'none';
      document.getElementById('reportView').style.display = 'block';

      let totalScore = 0;
      let totalQuestions = 0;
      let completedTests = 0;

      const tbody = document.getElementById('summaryTableBody');
      tbody.innerHTML = '';

      testsData.forEach(test => {
        const res = testResults[test.id];
        const isDone = res && res.submitted;
        const scoreVal = isDone ? res.score : 0;
        const totalVal = test.questions.length;

        if (isDone) {
          totalScore += scoreVal;
          completedTests++;
        }
        totalQuestions += totalVal;

        const row = document.createElement('tr');
        row.innerHTML = 
          '<td><strong>' + test.title + '</strong><br><small style="color:var(--text-muted);">' + test.badge + '</small></td>' +
          '<td>' + (isDone ? scoreVal + '/' + totalVal : '-') + '</td>' +
          '<td>' + (isDone ? '<strong style="color:var(--primary);">' + ((scoreVal / totalVal) * 10).toFixed(1) + '/10</strong>' : '-') + '</td>' +
          '<td>' + (isDone ? '<span class="status-pill completed">✓ Đã hoàn thành</span>' : '<span class="status-pill unattempted">Chưa làm</span>') + '</td>' +
          '<td><button class="btn-secondary" style="padding:0.35rem 0.75rem; font-size:0.8rem;" onclick="startTest(' + test.id + ')">' + (isDone ? 'Xem lại' : 'Làm bài') + '</button></td>';
        tbody.appendChild(row);
      });

      const avgScore10 = completedTests > 0 ? ((totalScore / (completedTests * 15)) * 10).toFixed(1) : '0.0';
      document.getElementById('finalAvgScore').innerText = avgScore10;

      const rankElem = document.getElementById('finalGradingRank');
      if (completedTests === testsData.length) {
        if (avgScore10 >= 8.5) {
          rankElem.innerText = 'Xếp Loại: XUẤT SẮC 🎓';
          rankElem.style.color = 'var(--success)';
        } else if (avgScore10 >= 7.0) {
          rankElem.innerText = 'Xếp Loại: GIỎI / KHÁ 👍';
          rankElem.style.color = 'var(--primary)';
        } else if (avgScore10 >= 5.0) {
          rankElem.innerText = 'Xếp Loại: TRUNG BÌNH - ĐẠT YÊU CẦU';
          rankElem.style.color = 'var(--warning)';
        } else {
          rankElem.innerText = 'Xếp Loại: CẦN BỒI DƯỠNG LẠI';
          rankElem.style.color = 'var(--danger)';
        }
      } else {
        rankElem.innerText = 'Tiến độ: Đã hoàn thành ' + completedTests + '/' + testsData.length + ' bài test';
        rankElem.style.color = 'var(--text-muted)';
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function resetAllProgress() {
      if (confirm('CẢNH BÁO: Toàn bộ tiến độ và kết quả làm bài của cả 6 bài test sẽ bị xóa. Bạn có chắc chắn không?')) {
        userAnswers = {};
        testResults = {};
        saveState();
        renderDashboard();
        updateOverallStats();
      }
    }

    function toggleTheme() {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById('themeBtn').innerText = '☀️ Giao diện';
      } else {
        document.documentElement.removeAttribute('data-theme');
        document.getElementById('themeBtn').innerText = '🌙 Giao diện';
      }
    }

    // Start
    window.onload = init;
  </script>
</body>
</html>
`;
}

// Write the file
const htmlContent = generateHtml();
const targetPath = path.join(__dirname, '..', 'hmi_quiz_suite.html');
fs.writeFileSync(targetPath, htmlContent, 'utf-8');
console.log('Successfully generated HMI Quiz Suite at:', targetPath);
