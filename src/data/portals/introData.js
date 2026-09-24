// Nội dung tab "Giới thiệu chung" của 3 chuyên trang, sinh theo hồ sơ Cổng (./profiles.js).
// Không đưa số liệu thống kê chưa có căn cứ.

export const buildIntros = (p) => ({
    dissemination: {
        title: p.council,
        desc: `Tham mưu, giúp ${p.ubnd} chỉ đạo, điều phối công tác phổ biến, giáo dục pháp luật, hòa giải ở cơ sở và xây dựng cấp xã đạt chuẩn tiếp cận pháp luật; đổi mới hình thức tuyên truyền, đẩy mạnh chuyển đổi số để pháp luật đến gần hơn với ${p.people}.`,
        pillars: [
            { title: 'Sứ mệnh', text: `Nâng cao nhận thức, ý thức tôn trọng và chấp hành pháp luật; bảo đảm mọi người dân trên địa bàn ${p.name} được tiếp cận thông tin pháp luật đầy đủ, kịp thời, dễ hiểu.`, points: ['Xây dựng văn hóa tuân thủ pháp luật trong cộng đồng', 'Chuyển đổi số phổ biến, giáo dục pháp luật đa kênh, tương tác hai chiều'] },
            { title: 'Chức năng', text: `Là tổ chức phối hợp liên ngành, tư vấn cho ${p.ubnd} trong chỉ đạo, định hướng chương trình, kế hoạch phổ biến, giáo dục pháp luật hằng năm và dài hạn; ${p.stp} là cơ quan thường trực.`, points: ['Định hướng nội dung tuyên truyền theo yêu cầu quản lý của địa phương', 'Kiểm tra, đôn đốc, đánh giá chuẩn tiếp cận pháp luật'] },
            { title: 'Nhiệm vụ trọng tâm', numbered: [`Tổ chức tuyên truyền các văn bản pháp luật mới, trọng tâm là ${p.hotTopics.slice(0, 2).join(' và ')}.`, 'Bồi dưỡng, cập nhật kiến thức cho đội ngũ báo cáo viên, tuyên truyền viên và hòa giải viên.', `Xây dựng, vận hành tủ sách pháp luật điện tử trên ${p.siteName}.`, 'Chỉ đạo, hướng dẫn hoạt động hòa giải ở cơ sở, giữ gìn đoàn kết trong cộng đồng dân cư.'] },
            { title: 'Đối tượng phục vụ', points: [`Người dân trên địa bàn ${p.name} có nhu cầu tìm hiểu pháp luật`, 'Cán bộ, công chức, viên chức và người lao động', 'Học sinh, sinh viên trong các cơ sở giáo dục', `Nhóm đối tượng đặc thù: ${p.focusGroups.slice(0, 3).join(', ')}`] }
        ],
        structure: {
            title: 'Mô hình tổ chức thực hiện phổ biến, giáo dục pháp luật',
            desc: 'Tổ chức liên thông từ cấp tỉnh đến cơ sở theo mô hình chính quyền địa phương hai cấp.',
            levels: [
                { name: `Cấp ${p.scopeWord.toLowerCase()}`, role: 'Chỉ đạo & điều phối', agency: `${p.council}; ${p.stp} (cơ quan thường trực)`, desc: 'Ban hành kế hoạch, định hướng nội dung trọng tâm, tổ chức các đợt tuyên truyền cao điểm và kiểm tra, đánh giá kết quả thực hiện.' },
                { name: 'Cấp xã, phường', role: 'Triển khai & giám sát', agency: 'UBND cấp xã; công chức Tư pháp - Hộ tịch; Hội đồng phối hợp PBGDPL cấp xã', desc: 'Cụ thể hóa kế hoạch phù hợp đặc điểm địa phương, tổ chức tuyên truyền trực tiếp, xây dựng xã, phường đạt chuẩn tiếp cận pháp luật.' },
                { name: 'Thôn, tổ dân phố', role: 'Thực hiện & hòa giải', agency: 'Tổ hòa giải ở cơ sở; tuyên truyền viên pháp luật; trưởng thôn, tổ trưởng tổ dân phố', desc: 'Đưa pháp luật đến từng hộ gia đình qua sinh hoạt cộng đồng, loa truyền thanh; hòa giải mâu thuẫn, tranh chấp nhỏ ngay tại cơ sở.' }
            ]
        }
    },
    legalAid: {
        title: p.center,
        desc: `Đơn vị sự nghiệp công lập trực thuộc ${p.stp}, cung cấp dịch vụ trợ giúp pháp lý miễn phí của Nhà nước cho người có công, người nghèo, trẻ em, đồng bào dân tộc thiểu số và các đối tượng yếu thế theo Luật Trợ giúp pháp lý năm 2017.`,
        pillars: [
            { title: 'Sứ mệnh', text: `Bảo đảm người thuộc diện trợ giúp pháp lý trên địa bàn ${p.name} được bảo vệ quyền, lợi ích hợp pháp, bình đẳng trong tiếp cận công lý, không bị bỏ lại phía sau vì hoàn cảnh khó khăn.`, points: ['Miễn phí toàn bộ chi phí trợ giúp pháp lý cho người được trợ giúp', 'Bảo vệ quyền con người, quyền công dân trong tố tụng'] },
            { title: 'Chức năng', text: 'Trực tiếp thực hiện trợ giúp pháp lý theo 3 hình thức: tham gia tố tụng, tư vấn pháp luật và đại diện ngoài tố tụng; quản lý, điều phối Trợ giúp viên pháp lý, luật sư ký hợp đồng và cộng tác viên.', points: ['Tổ chức mạng lưới chi nhánh, điểm tiếp nhận tại cơ sở', 'Phối hợp liên ngành với Công an, Viện kiểm sát, Tòa án'] },
            { title: 'Nhiệm vụ', numbered: ['Tiếp nhận, thụ lý yêu cầu trợ giúp pháp lý và phân công người thực hiện đúng quy trình.', 'Cử người bào chữa, bảo vệ quyền lợi hợp pháp trong các vụ án hình sự, dân sự, hành chính.', `Tổ chức trợ giúp pháp lý lưu động, truyền thông về trợ giúp pháp lý cho ${p.focusGroups[0]}.`, 'Đánh giá chất lượng vụ việc, giải quyết kiến nghị, phản ánh về hoạt động trợ giúp pháp lý.'] },
            { title: 'Đối tượng được trợ giúp', points: ['Người có công với cách mạng; người thuộc hộ nghèo', 'Trẻ em; người bị buộc tội từ đủ 16 đến dưới 18 tuổi', 'Người dân tộc thiểu số cư trú ở vùng đặc biệt khó khăn', 'Người có khó khăn về tài chính thuộc các nhóm theo quy định'] }
        ],
        structure: {
            title: 'Mô hình tổ chức và phối hợp trợ giúp pháp lý',
            desc: 'Các chủ thể tham gia bảo đảm người dân được trợ giúp kịp thời, đúng quy định.',
            levels: [
                { name: 'Trung tâm TGPL', role: 'Quản lý & điều phối', agency: p.center, desc: 'Thụ lý vụ việc, phân công người thực hiện, kiểm tra, đánh giá chất lượng và quản lý mạng lưới trợ giúp pháp lý.' },
                { name: 'Chi nhánh, điểm tiếp nhận', role: 'Tiếp nhận tại cơ sở', agency: 'Chi nhánh TGPL; điểm tiếp nhận tại UBND cấp xã', desc: 'Tiếp nhận yêu cầu gần dân, hướng dẫn thủ tục và thực hiện trợ giúp pháp lý tại địa bàn phụ trách.' },
                { name: 'Người thực hiện', role: 'Thực hiện vụ việc', agency: `Trợ giúp viên pháp lý; luật sư của tổ chức ký hợp đồng thuộc ${p.bar}; cộng tác viên`, desc: 'Trực tiếp tư vấn, tham gia tố tụng, đại diện ngoài tố tụng cho người được trợ giúp.' },
                { name: 'Cơ quan phối hợp', role: 'Thông báo & giới thiệu', agency: 'Cơ quan tiến hành tố tụng; UBND cấp xã; tổ chức chính trị - xã hội', desc: 'Giải thích quyền được trợ giúp pháp lý, thông báo và chuyển yêu cầu đến tổ chức thực hiện trợ giúp pháp lý.' }
            ]
        },
        commitments: [
            { title: 'Miễn phí', desc: 'Không thu bất kỳ khoản phí, lệ phí nào của người được trợ giúp' },
            { title: 'Tận tâm - bảo mật', desc: 'Bảo mật thông tin vụ việc và đời tư của người được trợ giúp' },
            { title: 'Kịp thời - đúng pháp luật', desc: 'Thụ lý, giải quyết theo đúng trình tự, thời hạn quy định' }
        ]
    },
    business: {
        title: `Hệ thống hỗ trợ pháp lý doanh nghiệp ${p.name}`,
        desc: `Đầu mối cung cấp thông tin pháp luật, giải đáp vướng mắc, tư vấn và hỗ trợ chi phí tư vấn pháp luật cho doanh nghiệp nhỏ và vừa, hộ kinh doanh trên địa bàn ${p.name} theo Nghị định số 55/2019/NĐ-CP.`,
        pillars: [
            { title: 'Sứ mệnh', text: 'Giảm rủi ro và chi phí tuân thủ pháp luật cho doanh nghiệp; góp phần cải thiện môi trường đầu tư, kinh doanh minh bạch, thuận lợi.', points: ['Đồng hành cùng doanh nghiệp từ khi thành lập', 'Kịp thời tháo gỡ vướng mắc pháp lý phát sinh'] },
            { title: 'Chức năng', text: `${p.stp} là đầu mối giúp ${p.ubnd} tổ chức hoạt động hỗ trợ pháp lý; phối hợp với các sở, ngành, ${p.bar} và ${p.businessAssoc} tiếp nhận, giải quyết yêu cầu của doanh nghiệp.`, points: ['Xây dựng, cập nhật cơ sở dữ liệu vụ việc, vướng mắc', 'Quản lý mạng lưới tư vấn viên pháp luật'] },
            { title: 'Nhiệm vụ trọng tâm', numbered: ['Cung cấp thông tin pháp luật, chính sách hỗ trợ doanh nghiệp của Trung ương và địa phương.', 'Tiếp nhận, phân loại và trả lời vướng mắc pháp lý của doanh nghiệp.', 'Xây dựng kho biểu mẫu hợp đồng, sổ tay, tài liệu hướng dẫn tuân thủ pháp luật.', 'Tổ chức tập huấn, đối thoại pháp luật; hỗ trợ chi phí tư vấn cho doanh nghiệp nhỏ và vừa.'] },
            { title: 'Đối tượng phục vụ', points: ['Doanh nghiệp siêu nhỏ, nhỏ và vừa', 'Hộ kinh doanh có nhu cầu chuyển đổi thành doanh nghiệp', 'Hợp tác xã, doanh nghiệp khởi nghiệp sáng tạo', `Nhà đầu tư tìm hiểu chính sách của ${p.name}`] }
        ],
        structure: {
            title: 'Mạng lưới hỗ trợ pháp lý doanh nghiệp',
            desc: 'Các chủ thể phối hợp tiếp nhận và giải quyết yêu cầu của doanh nghiệp.',
            levels: [
                { name: 'Cơ quan nhà nước', role: 'Chính sách & giải đáp', agency: `${p.ubnd}; ${p.stp}; các sở, ngành chuyên môn`, desc: 'Ban hành, hướng dẫn chính sách hỗ trợ; trả lời vướng mắc pháp lý thuộc lĩnh vực quản lý.' },
                { name: 'Luật sư & chuyên gia', role: 'Tư vấn chuyên sâu', agency: `${p.bar}; tổ chức hành nghề luật sư; chuyên gia pháp lý`, desc: 'Tư vấn pháp luật cho vụ việc cụ thể, rà soát hợp đồng, hỗ trợ giải quyết tranh chấp.' },
                { name: 'Hiệp hội doanh nghiệp', role: 'Tập hợp & kiến nghị', agency: p.businessAssoc, desc: 'Tập hợp khó khăn, vướng mắc của hội viên, kiến nghị hoàn thiện chính sách, tổ chức đối thoại.' },
                { name: 'Nền tảng số', role: 'Tiếp nhận 24/7', agency: p.siteName, desc: 'Tiếp nhận yêu cầu trực tuyến, công khai câu trả lời và cung cấp tài liệu, biểu mẫu miễn phí.' }
            ]
        }
    }
});
