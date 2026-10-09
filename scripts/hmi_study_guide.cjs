// Helper to provide the complete, rich Study Guide HTML content
module.exports = function getStudyGuideHtml() {
  return `
    <div id="docsView" style="display: none;">
      <div class="docs-container">
        <!-- Docs Sidebar -->
        <aside class="docs-sidebar">
          <div class="docs-sidebar-header">
            <h4>📖 Mục Lục Tài Liệu</h4>
            <div class="docs-search">
              <input type="text" id="docsSearchInput" placeholder="Tìm kiến thức, tiêu chuẩn..." oninput="handleDocsSearch()">
            </div>
          </div>
          <nav class="docs-nav" id="docsNavMenu">
            <div class="nav-group-title">PHẦN I: NỀN TẢNG HMI</div>
            <a href="#doc-khai-niem" class="docs-nav-link active">1. Khái niệm & Chu trình Don Norman</a>
            <a href="#doc-tam-ly" class="docs-nav-link">2. Tâm lý học nhận thức & Định luật</a>
            <a href="#doc-cong-nghiep" class="docs-nav-link">3. HMI Công nghiệp & ISA-101 SCADA</a>
            <a href="#doc-accessibility" class="docs-nav-link">4. Thiết kế giao diện & Accessibility</a>
            <a href="#doc-testing" class="docs-nav-link">5. Đo lường Usability & SUS</a>

            <div class="nav-group-title" style="margin-top: 1.25rem;">PHẦN II: HMI Ô TÔ & XE ĐIỆN (EV)</div>
            <a href="#doc-cockpit-arch" class="docs-nav-link">6. Kiến trúc buồng lái & Các loại màn hình</a>
            <a href="#doc-cockpit-ergo" class="docs-nav-link">7. Công thái học tầm nhìn (Eyellipse, H-Point)</a>
            <a href="#doc-distraction" class="docs-nav-link">8. Xao nhãng tài xế (NHTSA & Euro NCAP 2026)</a>
            <a href="#doc-ev-battery" class="docs-nav-link">9. Xe Điện: Quản lý Pin & Range Anxiety</a>
            <a href="#doc-ev-charging" class="docs-nav-link">10. Xe Điện: Trải nghiệm sạc & Plug & Charge</a>
            <a href="#doc-ev-regen" class="docs-nav-link">11. Xe Điện: Phanh tái sinh & One-Pedal</a>
            <a href="#doc-ev-sound" class="docs-nav-link">12. Âm học xe điện (AVAS & Active Sound)</a>
            <a href="#doc-adas-hmi" class="docs-nav-link">13. Trực quan hóa ADAS & Cảnh báo an toàn</a>
            <a href="#doc-autonomous-tor" class="docs-nav-link">14. Xe tự hành (SAE L0-L5) & Quy trình TOR</a>
            <a href="#doc-dms" class="docs-nav-link">15. Giám sát người lái DMS & Bảo mật riêng tư</a>
            <a href="#doc-safety-sec" class="docs-nav-link">16. An toàn ASIL, SOTIF & An ninh UN R155</a>
            <a href="#doc-os-tech" class="docs-nav-link">17. Hệ điều hành xe hơi (AAOS, Kanzi, Unreal 3D)</a>
            <a href="#doc-ar-hud" class="docs-nav-link">18. Công nghệ AR-HUD nâng cao</a>
            <a href="#doc-vui-haptics" class="docs-nav-link">19. Trợ lý giọng nói VUI & Haptics đa giác quan</a>
            <a href="#doc-extreme-modes" class="docs-nav-link">20. Điều kiện khắc nghiệt & Chế độ chuyên biệt</a>

            <div class="nav-group-title" style="margin-top: 1.25rem;">PHẦN III: TRA CỨU TIÊU CHUẨN</div>
            <a href="#doc-standards-table" class="docs-nav-link">21. Bảng tra cứu các Tiêu chuẩn & Chỉ số Vàng</a>
          </nav>
        </aside>

        <!-- Docs Main Content -->
        <article class="docs-content">
          <div class="docs-top-actions">
            <button class="btn-secondary" onclick="goHome()">← Quay lại Danh sách bài test</button>
            <button class="btn-accent" onclick="openRandomExamModal()">🎯 Làm Đề Thi Ôn Tập Ngẫu Nhiên</button>
          </div>

          <!-- SECTION 1 -->
          <section id="doc-khai-niem" class="doc-section">
            <div class="doc-badge">Nền tảng HMI</div>
            <h2>1. Khái Niệm Cốt Lõi & Chu Trình Tương Tác Don Norman</h2>
            <p><strong>HMI (Human-Machine Interface)</strong> là cầu nối tương tác và truyền tải thông tin hai chiều giữa con người và máy móc/hệ thống kỹ thuật vật lý (ô tô, máy bay, dây chuyền công nghiệp). Khác với UI/UX website thương mại điện tử đơn thuần, giao diện HMI gắn liền trực tiếp với <strong>thời gian thực (real-time)</strong>, <strong>an toàn vận hành (mission-critical)</strong> và <strong>ngăn ngừa thảm họa vật lý</strong>.</p>
            
            <div class="doc-callout info">
              <h4>🔑 Các Nguyên Lý Tương Tác Cốt Tử Của Don Norman</h4>
              <ul>
                <li><strong>Affordance (Đặc tính gợi ý chức năng):</strong> Mối quan hệ giữa đặc tính vật lý của vật thể và khả năng người dùng nhận biết cách tương tác với nó (Ví dụ: bề mặt phẳng gợi ý lực đẩy, núm tròn gợi ý xoay, cần gạt gợi ý gạt lên/xuống).</li>
                <li><strong>Signifier (Dấu hiệu chỉ dẫn):</strong> Tín hiệu thị giác/âm thanh/xúc giác thông báo <em>nơi nào</em> và <em>làm thế nào</em> để tương tác (gờ nổi trên nút bấm, mũi tên nhấp nháy, viền phát sáng).</li>
                <li><strong>Mapping (Ánh xạ tự nhiên):</strong> Mối tương quan hình học logic giữa vị trí bộ điều khiển và thiết bị thực tế (Ví dụ: 4 nút điều khiển 4 cửa kính xe hơi xếp theo đúng sơ đồ 2 hàng trước - sau của vị trí 4 cánh cửa xe).</li>
                <li><strong>Feedback (Phản hồi tức thì):</strong> Xác nhận hệ thống đã nhận lệnh và hiển thị trạng thái mới sau thao tác (đèn sáng, âm click, rung haptic).</li>
              </ul>
            </div>

            <h3>Khoảng Cách Thực Thi (Gulf of Execution) & Khoảng Cách Đánh Giá (Gulf of Evaluation)</h3>
            <p>Don Norman mô tả 2 'hố sâu' ngăn cách nhận thức của con người với máy móc:</p>
            <ul>
              <li><strong>Gulf of Execution:</strong> Mức độ khó khăn để chuyển ý định trong đầu ('Tôi muốn hạ điều hòa') thành hành động vật lý mà hệ thống chấp nhận. Nếu menu quá sâu, người dùng không biết bấm vào đâu.</li>
              <li><strong>Gulf of Evaluation:</strong> Mức độ nỗ lực để hiểu trạng thái hiện tại của máy ('Lệnh đã chạy chưa? Nhiệt độ đã giảm chưa?'). Phản hồi nghèo nàn sẽ làm người dùng bối rối và bấm liên hoàn nút lặp lại.</li>
            </ul>

            <div class="doc-nav-action">
              <button class="btn-secondary" onclick="startTestById(1)">📝 Làm bài test Bài 1: Khái niệm cốt lõi HMI ➔</button>
            </div>
          </section>

          <hr class="doc-divider">

          <!-- SECTION 2 -->
          <section id="doc-tam-ly" class="doc-section">
            <div class="doc-badge">Cognitive Ergonomics</div>
            <h2>2. Tâm Lý Học Nhận Thức & Công Thái Học Tương Tác</h2>

            <div class="doc-grid-2">
              <div class="doc-card">
                <h4>Định luật Hick-Hyman</h4>
                <p><code>T = b · log₂(n + 1)</code></p>
                <p>Thời gian đưa ra quyết định tăng theo hàm logarit của số lượng lựa chọn. <strong>Quy tắc HMI:</strong> Tuyệt đối không bày ra hàng chục nút bấm cùng lúc trong buồng lái; gom nhóm và giảm lựa chọn tối đa khi xe đang chạy.</p>
              </div>
              <div class="doc-card">
                <h4>Định luật Fitts</h4>
                <p><code>MT = a + b · log₂(2D / W)</code></p>
                <p>Thời gian chạm tới mục tiêu phụ thuộc vào Khoảng cách (D) và Kích thước (W). <strong>Quy tắc HMI:</strong> Các nút khẩn cấp hoặc tính năng thường dùng phải to bản và đặt ở vị trí gần tay nhất.</p>
              </div>
              <div class="doc-card">
                <h4>Định luật Miller (7 ± 2)</h4>
                <p>Trí nhớ làm việc (Working Memory) ngắn hạn của con người chỉ duy trì được 5 đến 9 đơn vị thông tin (chunks) cùng lúc. Cần phân nhóm dữ liệu thành các cụm thông tin có nghĩa.</p>
              </div>
              <div class="doc-card">
                <h4>Ngưỡng Doherty (&lt; 400ms)</h4>
                <p>Khi phản hồi hệ thống đạt tốc độ dưới 400 mili-giây, sự chú ý của người dùng được duy trì liền mạch ở trạng thái tập trung cao độ (Flow state), không bị ngắt quãng nhận thức.</p>
              </div>
            </div>

            <h3>Hiện tượng Mù Thay Đổi (Change Blindness) & Tầm Nhìn Hình Ống (Tunnel Vision)</h3>
            <p>Khi gặp stress hoặc báo động dồn dập, đồng tử co lại tạo ra <strong>Tunnel Vision</strong>: tài xế chỉ nhìn chằm chằm vào điểm nguy hiểm phía trước và mù hoàn toàn các chỉ số xung quanh. Nếu một thông số thay đổi mà không có chuyển động hoặc đổi màu (Change Blindness), con người sẽ bỏ sót 100%.</p>

            <div class="doc-nav-action">
              <button class="btn-secondary" onclick="startTestById(2)">📝 Làm bài test Bài 2: Tâm lý học nhận thức HMI ➔</button>
            </div>
          </section>

          <hr class="doc-divider">

          <!-- SECTION 3 -->
          <section id="doc-cong-nghiep" class="doc-section">
            <div class="doc-badge">Industrial & SCADA</div>
            <h2>3. HMI Trong Công Nghiệp & Tiêu Chuẩn ISA-101 / ISA-18.2</h2>
            <p>Các thảm họa nhà máy lọc dầu (như vụ nổ Texas City 2005) đã khai sinh ra tiêu chuẩn <strong>ISA-101</strong> và triết lý <strong>High-Performance HMI</strong> của Bill Hollifield:</p>

            <div class="doc-callout warning">
              <h4>⚠️ Triết Lý High-Performance HMI</h4>
              <ul>
                <li><strong>Nền xám trung tính (Muted Gray Background):</strong> Loại bỏ đồ họa 3D bồn bể sặc sỡ, đổ bóng rườm rà. Nền xám giữ cho mắt không mỏi sau ca trực 12 tiếng.</li>
                <li><strong>Màu sắc chỉ dùng cho Bất Thường:</strong> Khi mọi thứ bình thường, màn hình hoàn toàn đơn sắc phẳng lặng. Chỉ khi có cảnh báo, màu Đỏ / Vàng / Cam mới bừng sáng, thu hút ánh nhìn tức thì.</li>
                <li><strong>Analog Trends thay cho Digital Readout:</strong> Con số rời rạc <code>78.5 bar</code> là dữ liệu chết. Một biểu đồ thanh xu hướng nhỏ cho biết áp suất đang dâng vọt hay hạ thấp trong dải an toàn.</li>
                <li><strong>Giải quyết Alarm Fatigue (Mệt mỏi vì cảnh báo theo ISA-18.2):</strong> Giới hạn tỷ lệ báo động trung bình chỉ từ <strong>1-2 cảnh báo trong 10 phút</strong>. Khi có hàng trăm chuông báo mỗi giờ, kỹ sư sẽ tắt chuông theo phản xạ và bỏ qua cảnh báo sinh mạng.</li>
              </ul>
            </div>

            <div class="doc-nav-action">
              <button class="btn-secondary" onclick="startTestById(3)">📝 Làm bài test Bài 3: HMI Công nghiệp & ISA-101 ➔</button>
            </div>
          </section>

          <hr class="doc-divider">

          <!-- SECTION 6 -->
          <section id="doc-cockpit-arch" class="doc-section">
            <div class="doc-badge">Smart Cockpit</div>
            <h2>6. Kiến Trúc Buồng Lái Ô Tô Thông Minh & Phân Bổ Màn Hình</h2>
            <p>Buồng lái số hiện đại phân tầng giao diện theo các mức độ an toàn và ngữ cảnh sử dụng:</p>
            <ul>
              <li><strong>Digital Instrument Cluster (Cụm đồng hồ tốc độ):</strong> Màn hình an toàn bậc 1 (Safety-critical ASIL B), nằm sau vô-lăng. Chỉ hiển thị: Tốc độ thực, đèn báo lỗi phanh/động cơ/pin, trạng thái ADAS. Cấm tuyệt đối phát video giải trí.</li>
              <li><strong>IVI (In-Vehicle Infotainment - Màn hình trung tâm):</strong> Màn hình cấp QM, kích thước lớn (12-17 inch), quản lý bản đồ điều hướng, chọn nhạc, camera lùi và cài đặt tiện nghi.</li>
              <li><strong>HUD / AR-HUD (Head-Up Display):</strong> Màn hình hiển thị trên kính lái, giữ tầm nhìn tài xế ở vô cực, hiển thị mũi tên rẽ và giới hạn tốc độ.</li>
              <li><strong>Màn hình điều hòa chuyên dụng (Dedicated HVAC):</strong> Giữ các phím chỉnh gió, nhiệt độ, sấy kính luôn ở trạng thái 1 chạm (Always accessible).</li>
              <li><strong>CMS (Camera Monitor Systems - Gương chiếu hậu kỹ thuật số):</strong> Đặt tại chân cột A gần vị trí gương cơ học truyền thống để tôn trọng thói quen liếc mắt tự nhiên.</li>
            </ul>

            <div class="doc-nav-action">
              <button class="btn-secondary" onclick="startTestById(7)">📝 Làm bài test Bài 7: Kiến trúc màn hình ô tô ➔</button>
            </div>
          </section>

          <hr class="doc-divider">

          <!-- SECTION 7 -->
          <section id="doc-cockpit-ergo" class="doc-section">
            <div class="doc-badge">Ergonomics & Vision</div>
            <h2>7. Công Thái Học Buồng Lái & Tầm Nhìn Tài Xế</h2>
            <div class="doc-grid-2">
              <div class="doc-card">
                <h4>H-Point (SAE J826)</h4>
                <p>Tọa độ khớp bản lề hông người ngồi, là gốc tọa độ tham chiếu để tính toán tầm với tay, khoảng để chân và góc nhìn ra kính chắn gió.</p>
              </div>
              <div class="doc-card">
                <h4>Eyellipse (SAE J941)</h4>
                <p>Hình elip thống kê vị trí mắt của 95% quần thể tài xế (từ nữ 5th percentile đến nam 95th percentile) dùng để căn góc nghiêng gương và định vị màn hình.</p>
              </div>
            </div>

            <div class="doc-callout info">
              <h4>📐 Các Giới Hạn Góc Nhìn & Thao Tác Vàng Trong Buồng Lái:</h4>
              <ul>
                <li><strong>Góc hạ mắt (Down-angle):</strong> Không vượt quá <strong>15° đến 30°</strong> so với trục nhìn thẳng về trước để vẫn quan sát được đường bằng thị giác ngoại vi.</li>
                <li><strong>Góc quay đầu (Head turn):</strong> Không vượt quá <strong>20° - 30°</strong> sang bên phải khi nhìn vào màn hình trung tâm.</li>
                <li><strong>Kích thước nút cảm ứng ô tô:</strong> Tối thiểu <strong>14mm x 14mm (khoảng 60x60 pixel)</strong>, khoảng cách giữa 2 nút ≥ 3-5mm để chống trượt tay khi xe rung lắc.</li>
                <li><strong>Độ sáng màn hình ô tô:</strong> Đạt <strong>800 đến 1.500 nits</strong> kết hợp lớp dán quang học Optical Bonding chống chói lóa ánh nắng.</li>
              </ul>
            </div>

            <div class="doc-nav-action">
              <button class="btn-secondary" onclick="startTestById(8)">📝 Làm bài test Bài 8: Công thái học buồng lái ➔</button>
            </div>
          </section>

          <hr class="doc-divider">

          <!-- SECTION 8 -->
          <section id="doc-distraction" class="doc-section">
            <div class="doc-badge">Driver Safety</div>
            <h2>8. Xao Nhãng Tài Xế & Tiêu Chuẩn NHTSA / Euro NCAP 2026</h2>
            <p>NHTSA phân loại xao nhãng buồng lái thành 3 dạng:</p>
            <ol>
              <li><strong>Visual Distraction (Thị giác):</strong> Mắt rời khỏi mặt đường nhìn vào màn hình.</li>
              <li><strong>Manual Distraction (Thao tác):</strong> Tay rời khỏi vành vô-lăng để bấm nút.</li>
              <li><strong>Cognitive Distraction (Nhận thức):</strong> Tâm trí bận suy nghĩ giải đố menu phức tạp hoặc tranh cãi qua điện thoại.</li>
            </ol>

            <div class="doc-callout danger">
              <h4>🛑 Các Quy Tắc Giới Hạn Sống Còn Của NHTSA & Euro NCAP:</h4>
              <ul>
                <li><strong>Quy tắc 2 Giây Vàng:</strong> Một lần liếc mắt (Glance Duration) vào màn hình KHÔNG ĐƯỢC vượt quá <strong>2.0 giây</strong>. (Ở 100km/h, xe chạy mù 56m trong 2 giây).</li>
                <li><strong>Tổng thời gian rời mắt (TEORT):</strong> Tổng thời gian tích lũy cho một tác vụ không được vượt quá <strong>12.0 giây</strong> theo phương pháp kính chớp mắt Occlusion (ISO 16673).</li>
                <li><strong>Quy định Euro NCAP 2026:</strong> BẮT BUỘC phải có <strong>phím bấm cơ học vật lý độc lập</strong> cho 5 chức năng an toàn: Đèn xi-nhan, Đèn khẩn cấp Hazard tam giác, Cần gạt nước, Còi xe và Cuộc gọi cứu nạn eCall mới được điểm an toàn 5 sao tối đa.</li>
              </ul>
            </div>

            <div class="doc-nav-action">
              <button class="btn-secondary" onclick="startTestById(9)">📝 Làm bài test Bài 9: Tiêu chuẩn an toàn & Xao nhãng ➔</button>
            </div>
          </section>

          <hr class="doc-divider">

          <!-- SECTION 9 -->
          <section id="doc-ev-battery" class="doc-section">
            <div class="doc-badge">EV Fundamentals</div>
            <h2>9. HMI Xe Điện (EV): Quản Lý Pin & Range Anxiety</h2>
            <p><strong>Range Anxiety (Nỗi sợ hết pin giữa đường)</strong> là rào cản tâm lý số 1 khi chuyển sang xe điện. HMI đóng vai trò giải tỏa nỗi sợ này:</p>
            <ul>
              <li><strong>Trực quan hóa SoC (State of Charge):</strong> Hiển thị đồng thời % pin cụ thể, thanh đồ họa màu sắc và số km dự kiến còn lại (DTE).</li>
              <li><strong>Thuật toán DTE thông minh:</strong> Không lấy năng lượng chia cho định mức cố định, mà tính toán theo: thói quen chân ga, độ dốc địa hình (Elevation Profile), nhiệt độ ngoài trời và mức tiêu thụ của điều hòa nhiệt độ.</li>
              <li><strong>Turtle Mode (Biểu tượng con rùa):</strong> Báo hiệu xe đã vào chế độ giới hạn công suất khẩn cấp (Limp-home mode) khi pin &lt; 5% hoặc quá nhiệt, xe chạy chậm để bò về trạm sạc an toàn.</li>
              <li><strong>Thanh trượt giới hạn sạc 80% (Daily Charge Limit):</strong> Hướng dẫn chủ xe cài đặt 80% khi đi hàng ngày để bảo vệ hóa học pin Lithium-ion NMC, chỉ sạc 100% khi đi xa.</li>
            </ul>

            <div class="doc-nav-action">
              <button class="btn-secondary" onclick="startTestById(10)">📝 Làm bài test Bài 10: Quản lý pin & Range Anxiety ➔</button>
            </div>
          </section>

          <hr class="doc-divider">

          <!-- SECTION 10 -->
          <section id="doc-ev-charging" class="doc-section">
            <div class="doc-badge">EV Charging</div>
            <h2>10. HMI Xe Điện: Trải Nghiệm Sạc Điện & Plug & Charge</h2>
            <ul>
              <li><strong>Battery Preconditioning (Điều hòa nhiệt độ pin):</strong> Khi tài xế chọn trạm sạc nhanh DC trên bản đồ, xe tự động sưởi ấm hoặc làm mát pin về nhiệt độ lý tưởng (25-35°C) ngay trên đường đi, giúp xe tiếp nhận ngay công suất sạc cực đại (rút ngắn 50% thời gian sạc).</li>
              <li><strong>Plug & Charge (ISO 15118):</strong> Cắm cáp sạc là xe và trụ sạc tự động xác thực chứng chỉ số và thanh toán ngầm, loại bỏ hoàn toàn việc quẹt thẻ RFID hay mở app quét mã QR.</li>
              <li><strong>Mã màu LED cổng sạc vật lý:</strong> Trắng (chờ cắm) → Xanh dương chớp (kết nối) → Xanh lục chớp (đang sạc) → Xanh lục tĩnh (đầy 100%) → Đỏ (lỗi sạc).</li>
              <li><strong>Khóa liên động Drive-Off Interlock:</strong> Ngăn chặn tuyệt đối việc chuyển số D hoặc R khi cáp sạc đang cắm vào xe, tránh giật đứt trụ sạc.</li>
              <li><strong>V2L (Vehicle-to-Load):</strong> Cung cấp thanh cài đặt mức xả pin tối thiểu (dừng xả khi còn 20%) để xe vẫn đủ điện chạy về nhà sau buổi cắm trại.</li>
            </ul>

            <div class="doc-nav-action">
              <button class="btn-secondary" onclick="startTestById(11)">📝 Làm bài test Bài 11: Trải nghiệm sạc xe điện ➔</button>
            </div>
          </section>

          <hr class="doc-divider">

          <!-- SECTION 11 -->
          <section id="doc-ev-regen" class="doc-section">
            <div class="doc-badge">Regen & Braking</div>
            <h2>11. Phanh Tái Sinh & Cảm Giác Lái One-Pedal Drive</h2>
            <p>Mô-tơ điện có tính thuận nghịch: khi xe giảm tốc, mô-tơ biến thành máy phát hãm xe lại và sạc ngược điện vào pin.</p>
            <ul>
              <li><strong>One-Pedal Drive:</strong> Đạp ga để tăng tốc, nhả dần ga để hãm xe êm ái và nhấc hẳn chân ga để dừng xe về 0 km/h mà không cần đạp phanh cơ trong điều kiện thông thường.</li>
              <li><strong>Quy chuẩn đèn phanh tự động (UN ECE R13H):</strong> Khi lực phanh tái sinh tạo độ giảm tốc vượt quá <strong>0.7 - 1.3 m/s²</strong>, đèn phanh sau BẮT BUỘC phải tự động bật sáng để cảnh báo xe sau dù tài xế không chạm chân phanh.</li>
              <li><strong>Hiện tượng Cold / Full Battery:</strong> Khi pin sạc đầy 100% hoặc pin quá lạnh, phanh tái sinh bị suy giảm mạnh do pin không thể nhận thêm điện; HMI phải cảnh báo để tài xế chủ động dùng chân phanh ma sát.</li>
              <li><strong>Lẫy gẩy vô-lăng (Paddle Shifters):</strong> Cho phép tăng giảm các mức lực phanh tái sinh (Level 0 đến Level 3) tức thời mà không cần nhìn vào màn hình cảm ứng.</li>
            </ul>

            <div class="doc-nav-action">
              <button class="btn-secondary" onclick="startTestById(12)">📝 Làm bài test Bài 12: Phanh tái sinh & One-Pedal ➔</button>
            </div>
          </section>

          <hr class="doc-divider">

          <!-- SECTION 12 -->
          <section id="doc-ev-sound" class="doc-section">
            <div class="doc-badge">Acoustics & AVAS</div>
            <h2>12. Thiết Kế Âm Thanh & Cảnh Báo Xe Điện (AVAS)</h2>
            <ul>
              <li><strong>Hệ thống AVAS (Acoustic Vehicle Alerting System):</strong> Luật quốc tế (UNECE R138 / FMVSS 141) bắt buộc xe điện phải phát âm thanh giả lập ra loa ngoài ở dải tốc độ từ <strong>0 đến 20 km/h (hoặc 30 km/h)</strong> và khi cài số lùi (R) để bảo vệ người đi bộ khiếm thị và trẻ nhỏ.</li>
              <li><strong>Biến thiên cao độ (Pitch Shifting):</strong> Tần số và âm lượng AVAS phải tăng theo vận tốc xe để người đi đường nhận thức được gia tốc tiếp cận của xe. Luật nghiêm cấm nút bấm tắt AVAS thủ công.</li>
              <li><strong>Active Sound Design (ASD):</strong> Phát âm thanh cơ khí điện từ giả lập qua loa trong cabin tương ứng với độ nhấn chân ga để tài xế cảm nhận gia tốc trực giác.</li>
              <li><strong>Active Road Noise Cancellation (RNC):</strong> Cảm biến gia tốc trên hệ thống treo đo độ rung mặt đường, phát sóng âm đảo pha 180° qua loa tựa đầu để triệt tiêu tiếng ù lốp xe.</li>
            </ul>

            <div class="doc-nav-action">
              <button class="btn-secondary" onclick="startTestById(13)">📝 Làm bài test Bài 13: Âm thanh xe điện & AVAS ➔</button>
            </div>
          </section>

          <hr class="doc-divider">

          <!-- SECTION 13 -->
          <section id="doc-adas-hmi" class="doc-section">
            <div class="doc-badge">ADAS HMI</div>
            <h2>13. HMI Cho Hệ Thống Trợ Lái ADAS</h2>
            <p>Mục tiêu số 1 của ADAS HMI là xây dựng <strong>Mô hình tin cậy hiệu chuẩn (Calibrated Trust)</strong>: Tài xế hiểu rõ giới hạn của xe, không chủ quan buông lỏng nhưng cũng không sợ hãi tắt tính năng.</p>
            <ul>
              <li><strong>Trực quan hóa môi trường thời gian thực:</strong> Vẽ xe xung quanh, người đi bộ, làn đường để tài xế biết xe đã 'nhìn thấy' chướng ngại vật.</li>
              <li><strong>ACC (Adaptive Cruise Control):</strong> Hiển thị tốc độ cài đặt và các vạch đệm thời gian bám đuôi (Time-gap bars: 1.0s, 1.5s, 2.0s).</li>
              <li><strong>Cảnh báo điểm mù BSM theo tầng (Tiered Alerts):</strong> Chỉ liếc gương thì đèn vàng sáng tĩnh; nếu bật xi-nhan định chuyển làn, đèn đỏ chớp dồn dập kèm chuông bíp và rung vô-lăng ngăn cản đánh lái.</li>
              <li><strong>Vô-lăng cảm ứng điện dung (Capacitive HOD):</strong> Nhận diện ngón tay chạm nhẹ mà không bắt tài xế phải giật lắc vô-lăng như cảm biến mô-men xoắn cũ.</li>
            </ul>

            <div class="doc-nav-action">
              <button class="btn-secondary" onclick="startTestById(14)">📝 Làm bài test Bài 14: Hệ thống trợ lái ADAS ➔</button>
            </div>
          </section>

          <hr class="doc-divider">

          <!-- SECTION 14 -->
          <section id="doc-autonomous-tor" class="doc-section">
            <div class="doc-badge">Autonomous Vehicles</div>
            <h2>14. Chuyển Giao Quyền Lái Xe Tự Hành & Quy Trình TOR</h2>
            <p>Theo chuẩn <strong>SAE J3016</strong>, Cấp độ 2 (L2) con người luôn phải giám sát; từ Cấp độ 3 (L3) chiếc xe chính thức chịu trách nhiệm lái trong vùng <strong>ODD (Operational Design Domain)</strong>.</p>
            <div class="doc-callout danger">
              <h4>🚨 Quy Trình Giành Lại Quyền Lái TOR (Takeover Request) L3:</h4>
              <ol>
                <li><strong>Thời gian cảnh báo:</strong> Xe phải dành cho tài xế tối thiểu <strong>5 đến 10 giây</strong> để tái nhập cuộc nhận thức (Situation awareness re-acquisition).</li>
                <li><strong>Cảnh báo đa giác quan đồng thời:</strong> Đèn LED vô lăng nhấp nháy đỏ + Chuông báo động tăng dần âm lượng + Rung giật đệm ghế lái cực mạnh.</li>
                <li><strong>Minimum Risk Maneuver (MRM):</strong> Nếu hết 10 giây mà tài xế vẫn ngủ gật hoặc đột quỵ không tiếp nhận lái, xe tự động bật đèn Hazard, giảm tốc an toàn và tấp vào lề đường dừng hẳn.</li>
              </ol>
            </div>

            <div class="doc-nav-action">
              <button class="btn-secondary" onclick="startTestById(15)">📝 Làm bài test Bài 15: Xe tự hành & Cảnh báo TOR ➔</button>
            </div>
          </section>

          <hr class="doc-divider">

          <!-- SECTION 15 -->
          <section id="doc-dms" class="doc-section">
            <div class="doc-badge">DMS & Privacy</div>
            <h2>15. Hệ Thống Giám Sát Người Lái (DMS) & Quyền Riêng Tư</h2>
            <ul>
              <li><strong>Camera hồng ngoại NIR (940nm):</strong> Chiếu sáng khuôn mặt vô hình trong bóng tối và nhìn xuyên qua tròng kính râm chống tia UV để theo dõi đồng tử.</li>
              <li><strong>Chỉ số PERCLOS:</strong> Tỷ lệ % thời gian mắt nhắm nghiền ≥ 80% trong 1 phút; nếu vượt ngưỡng 12-15% là dấu hiệu buồn ngủ nặng (Micro-sleep) kích hoạt cảnh báo tách cà phê.</li>
              <li><strong>Phát hiện dùng điện thoại:</strong> Mắt nhìn xuống vùng đùi quá 2-3 giây liên tục khi xe đang chạy.</li>
              <li><strong>Bảo mật xử lý tại biên (Edge Computing on-chip):</strong> Hình ảnh chỉ phân tích tạm thời trên RAM chip NPU rồi hủy ngay, không lưu video, không truyền ra ngoài xe, tuân thủ nghiêm ngặt <strong>Nghị định 13/2023/NĐ-CP và GDPR</strong>.</li>
              <li><strong>Child Presence Detection (CPD):</strong> Radar 60GHz trong cabin nhận diện nhịp thở em bé sơ sinh bị bỏ quên trong xe để tự bật điều hòa và còi cứu hộ.</li>
            </ul>

            <div class="doc-nav-action">
              <button class="btn-secondary" onclick="startTestById(16)">📝 Làm bài test Bài 16: Giám sát người lái DMS ➔</button>
            </div>
          </section>

          <hr class="doc-divider">

          <!-- SECTION 16 -->
          <section id="doc-safety-sec" class="doc-section">
            <div class="doc-badge">Safety & Security</div>
            <h2>16. An Toàn Chức Năng Phần Mềm ASIL, SOTIF & An Ninh UN R155</h2>
            <ul>
              <li><strong>ISO 26262 ASIL:</strong> Cụm đồng hồ tốc độ và đèn cảnh báo nguy hiểm bắt buộc đạt chuẩn <strong>ASIL B</strong>. Cụm giải trí nhạc ở mức QM.</li>
              <li><strong>Type-1 Hypervisor (QNX):</strong> Cách ly phần cứng an toàn: Hệ điều hành Android giải trí có bị crash đơ thì cụm đồng hồ tốc độ RTOS chạy bên cạnh vẫn hoạt động 100%.</li>
              <li><strong>SOTIF (ISO 21448):</strong> An toàn chức năng ngay cả khi phần mềm không có lỗi code (ví dụ camera bị tuyết che mù hoặc HMI gây hiểu lầm cho người lái).</li>
              <li><strong>Cập nhật OTA phân vùng kép (A/B Dual-Bank):</strong> Nạp firmware mới vào phân vùng B; nếu mất điện giữa chừng xe tự động Rollback về phân vùng A, không bao giờ bị biến thành 'cục gạch'.</li>
              <li><strong>PIN to Drive:</strong> Mã PIN bảo vệ trên màn hình cảm ứng ngăn chặn triệt để các vụ trộm xe bằng kích sóng chìa khóa thông minh (Relay Attack).</li>
            </ul>

            <div class="doc-nav-action">
              <button class="btn-secondary" onclick="startTestById(17)">📝 Làm bài test Bài 17: An toàn ASIL & SOTIF ➔</button>
            </div>
          </section>

          <hr class="doc-divider">

          <!-- SECTION 18 -->
          <section id="doc-ar-hud" class="doc-section">
            <div class="doc-badge">AR-HUD</div>
            <h2>18. Công Nghệ AR-HUD (Thực Tế Tăng Cường) Trên Kính Lái</h2>
            <ul>
              <li><strong>Khoảng cách ảnh ảo VID:</strong> Đạt từ <strong>7.5m đến 15 mét</strong> để mắt nhìn đồ họa AR ở cùng mặt phẳng tiêu cự với xe phía trước, triệt tiêu thời gian điều tiết mắt.</li>
              <li><strong>Trường nhìn FOV:</strong> Đạt 10° x 4° hoặc 12° x 5° để bao quát nhiều làn đường.</li>
              <li><strong>Thảm ảo dẫn đường (Virtual Carpet):</strong> Dải ánh sáng uốn lượn neo thẳng lên mặt đường tại ngã rẽ thực tế, loại bỏ việc rẽ nhầm làn.</li>
              <li><strong>Kính chắn gió dạng nêm (Wedge PVB):</strong> Lớp keo vát góc hình nêm triệt tiêu hiện tượng bóng ma quang học (Double image/Ghosting).</li>
              <li><strong>Bù trừ rung lắc khung gầm (IMU Compensation):</strong> Cảm biến con quay dịch chuyển đồ họa ngược chiều rung của xe để mũi tên không bị nhảy tưng tưng khi qua ổ gà.</li>
            </ul>

            <div class="doc-nav-action">
              <button class="btn-secondary" onclick="startTestById(20)">📝 Làm bài test Bài 20: Công nghệ AR-HUD ➔</button>
            </div>
          </section>

          <hr class="doc-divider">

          <!-- SECTION 21 -->
          <section id="doc-standards-table" class="doc-section">
            <div class="doc-badge">Cheat Sheet</div>
            <h2>21. Bảng Tra Cứu Các Tiêu Chuẩn & Chỉ Số Vàng HMI Ô Tô</h2>
            <div style="overflow-x: auto;">
              <table class="summary-table">
                <thead>
                  <tr>
                    <th>Tiêu chuẩn / Chỉ số</th>
                    <th>Cơ quan / Tổ chức</th>
                    <th>Nội dung quy định cốt lõi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Quy tắc 2.0 Giây</strong></td>
                    <td>NHTSA (Mỹ)</td>
                    <td>Thời gian mắt rời khỏi mặt đường trong 1 lần liếc nhìn không quá 2.0s.</td>
                  </tr>
                  <tr>
                    <td><strong>TEORT ≤ 12.0s</strong></td>
                    <td>ISO 16673 / NHTSA</td>
                    <td>Tổng thời gian mở mắt nhìn màn hình cho 1 tác vụ không quá 12 giây trong bài test Occlusion.</td>
                  </tr>
                  <tr>
                    <td><strong>Euro NCAP 2026</strong></td>
                    <td>Euro NCAP</td>
                    <td>Bắt buộc phím cơ học cho 5 chức năng: Xi-nhan, Hazard, Gạt nước, Còi, eCall.</td>
                  </tr>
                  <tr>
                    <td><strong>H-Point & Eyellipse</strong></td>
                    <td>SAE J826 / J941</td>
                    <td>Mốc tọa độ hông người lái và phân bố elip vị trí mắt của 95% quần thể tài xế.</td>
                  </tr>
                  <tr>
                    <td><strong>Touch Target 14-20mm</strong></td>
                    <td>ISO 9241-9 / OEM</td>
                    <td>Kích thước nút bấm cảm ứng trên ô tô (khoảng 60x60px) lớn hơn nhiều so với smartphone.</td>
                  </tr>
                  <tr>
                    <td><strong>UN ECE R138 / FMVSS 141</strong></td>
                    <td>Liên Hợp Quốc / NHTSA</td>
                    <td>Hệ thống âm thanh cảnh báo người đi bộ AVAS cho xe điện từ 0 đến 20/30 km/h.</td>
                  </tr>
                  <tr>
                    <td><strong>UN ECE R13H</strong></td>
                    <td>UNECE</td>
                    <td>Đèn phanh sau tự sáng khi phanh tái sinh tạo mức giảm tốc &gt; 0.7 - 1.3 m/s².</td>
                  </tr>
                  <tr>
                    <td><strong>SAE J3016</strong></td>
                    <td>SAE International</td>
                    <td>Phân cấp 6 cấp độ lái tự động từ Level 0 đến Level 5; L3 bắt đầu có cảnh báo TOR.</td>
                  </tr>
                  <tr>
                    <td><strong>ISO 26262 ASIL B/D</strong></td>
                    <td>ISO</td>
                    <td>An toàn chức năng hệ thống điện/điện tử ô tô; Cụm đồng hồ tốc độ đạt ASIL B.</td>
                  </tr>
                  <tr>
                    <td><strong>ISO 21448 (SOTIF)</strong></td>
                    <td>ISO</td>
                    <td>An toàn chức năng trong điều kiện không có lỗi hỏng hóc kỹ thuật.</td>
                  </tr>
                  <tr>
                    <td><strong>UN ECE R155 / ISO 21434</strong></td>
                    <td>UNECE / ISO</td>
                    <td>Bắt buộc hệ thống quản lý an ninh mạng CSMS và quy trình cập nhật OTA an toàn.</td>
                  </tr>
                  <tr>
                    <td><strong>Plug & Charge (ISO 15118)</strong></td>
                    <td>ISO / IEC</td>
                    <td>Tự động nhận diện xe và thanh toán sạc qua giao tiếp cáp sạc số hóa.</td>
                  </tr>
                  <tr>
                    <td><strong>Doherty Threshold &lt; 400ms</strong></td>
                    <td>IBM Research</td>
                    <td>Phản hồi hệ thống dưới 0.4s giúp duy trì trạng thái tập trung liên tục.</td>
                  </tr>
                  <tr>
                    <td><strong>SUS Score Benchmark: 68</strong></td>
                    <td>John Brooke</td>
                    <td>Thang đo tính khả dụng 10 câu; điểm &gt; 68 là trên trung bình, &gt; 80 là Tốt.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="doc-nav-action" style="margin-top: 2rem;">
              <button class="btn-accent" onclick="openRandomExamModal()">🎯 Bắt Đầu Làm Đề Thi Ôn Tập Ngẫu Nhiên Ngay</button>
            </div>
          </section>
        </article>
      </div>
    </div>
  `;
};
