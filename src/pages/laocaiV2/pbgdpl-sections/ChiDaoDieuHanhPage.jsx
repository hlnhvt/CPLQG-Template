import React, { useEffect } from 'react';
import { Eye, Download, Calendar, Building } from 'lucide-react';
import LaoCaiV2PageIntro from '../../../components/laocaiV2/LaoCaiV2PageIntro';
import LaoCaiV2FilterableTable from '../../../components/laocaiV2/LaoCaiV2FilterableTable';

// Chỉ đạo điều hành: tách từ tab "Văn bản chỉ đạo, hướng dẫn" của trang PBGDPL thành mục riêng trên nav. Dữ liệu mẫu.
const SUBJECTS = [
    ['Kế hoạch', 'KH-UBND', 'UBND tỉnh Lào Cai', 'Kế hoạch phổ biến, giáo dục pháp luật; hòa giải ở cơ sở; xây dựng xã, phường đạt chuẩn tiếp cận pháp luật năm 2026'],
    ['Quyết định', 'QĐ-UBND', 'UBND tỉnh Lào Cai', 'Quyết định kiện toàn Hội đồng phối hợp phổ biến, giáo dục pháp luật tỉnh Lào Cai'],
    ['Công văn', 'STP-PBGDPL', 'Sở Tư pháp tỉnh Lào Cai', 'Hướng dẫn tổ chức hưởng ứng Ngày Pháp luật nước Cộng hòa xã hội chủ nghĩa Việt Nam'],
    ['Kế hoạch', 'KH-HĐPH', 'Hội đồng phối hợp PBGDPL tỉnh', 'Kế hoạch hoạt động của Hội đồng phối hợp phổ biến, giáo dục pháp luật tỉnh năm 2026'],
    ['Công văn', 'STP-PBGDPL', 'Sở Tư pháp tỉnh Lào Cai', 'Hướng dẫn công tác phổ biến, giáo dục pháp luật cho đồng bào dân tộc thiểu số vùng cao, biên giới'],
    ['Quyết định', 'QĐ-STP', 'Sở Tư pháp tỉnh Lào Cai', 'Quyết định công nhận báo cáo viên pháp luật tỉnh Lào Cai'],
    ['Chỉ thị', 'CT-UBND', 'UBND tỉnh Lào Cai', 'Chỉ thị tăng cường công tác phổ biến, giáo dục pháp luật trong tình hình mới'],
    ['Công văn', 'STP-PBGDPL', 'Sở Tư pháp tỉnh Lào Cai', 'Hướng dẫn nghiệp vụ hòa giải ở cơ sở sau sắp xếp đơn vị hành chính cấp xã'],
    ['Kế hoạch', 'KH-UBND', 'UBND tỉnh Lào Cai', 'Kế hoạch tổ chức Cuộc thi trực tuyến tìm hiểu pháp luật tỉnh Lào Cai năm 2026'],
    ['Công văn', 'STP-PBGDPL', 'Sở Tư pháp tỉnh Lào Cai', 'Hướng dẫn đánh giá, công nhận xã, phường đạt chuẩn tiếp cận pháp luật năm 2026'],
    ['Quyết định', 'QĐ-UBND', 'UBND tỉnh Lào Cai', 'Quyết định ban hành Quy chế hoạt động của Hội đồng phối hợp PBGDPL tỉnh'],
    ['Công văn', 'STP-PBGDPL', 'Sở Tư pháp tỉnh Lào Cai', 'Hướng dẫn xây dựng, quản lý và khai thác Tủ sách pháp luật tại cơ sở'],
];

const ROWS = Array.from({ length: 24 }, (_, i) => {
    const [type, suffix, agency, title] = SUBJECTS[i % SUBJECTS.length];
    const day = String(28 - i).padStart(2, '0');
    const month = i < 12 ? '06' : '05';
    const number = `${120 - i}/${suffix}`;
    return {
        id: i + 1,
        date: `2026${month}${day}`,
        search: `${number} ${title} ${agency} ${type}`,
        cells: [
            <span className="font-semibold text-[#1b2b49] whitespace-nowrap">{number}</span>,
            <div>
                <p className="font-medium text-gray-800 leading-snug hover:text-blue-600 cursor-pointer">{title}</p>
                <span className="text-[11px] font-semibold uppercase text-blue-600 mt-1 inline-block">{type}</span>
            </div>,
            <span className="flex items-center gap-1.5 text-gray-600"><Building size={14} className="text-gray-400 shrink-0" />{agency}</span>,
            <span className="flex items-center gap-1.5 text-gray-600 whitespace-nowrap"><Calendar size={14} className="text-gray-400" />{`${day}/${month}/2026`}</span>,
            <div className="flex items-center gap-3 text-gray-400">
                <button className="hover:text-blue-600" title="Xem"><Eye size={17} /></button>
                <button className="hover:text-blue-600" title="Tải về"><Download size={17} /></button>
            </div>,
        ],
    };
});

const SORT_OPTIONS = [
    { value: 'newest', label: 'Mới nhất', compare: (a, b) => b.date.localeCompare(a.date) },
    { value: 'oldest', label: 'Cũ nhất', compare: (a, b) => a.date.localeCompare(b.date) },
];

const ChiDaoDieuHanhPage = () => {
    useEffect(() => {
        document.title = 'Chỉ đạo điều hành - Cổng Pháp luật tỉnh Lào Cai';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f0f4f8] pb-16">
            <LaoCaiV2PageIntro
                crumbs={[{ label: 'Phổ biến, giáo dục pháp luật' }, { label: 'Chỉ đạo điều hành' }]}
                title="Chỉ đạo điều hành"
                subtitle="Văn bản chỉ đạo, điều hành và hướng dẫn của UBND tỉnh, Sở Tư pháp tỉnh Lào Cai về công tác phổ biến, giáo dục pháp luật"
            />
            <div className="container mx-auto px-4 max-w-[1286px] pt-8">
                <LaoCaiV2FilterableTable
                    headers={['STT', 'Số hiệu', 'Trích yếu nội dung', 'Cơ quan ban hành', 'Ngày ban hành', 'Thao tác']}
                    colClassNames={['', 'w-40', '', 'w-56', 'w-40', 'w-28']}
                    rows={ROWS}
                    countLabel="văn bản chỉ đạo, hướng dẫn"
                    sortOptions={SORT_OPTIONS}
                />
            </div>
        </div>
    );
};

export default ChiDaoDieuHanhPage;
