import React, { useEffect } from 'react';
import LaoCaiV2PageIntro from '../../../components/laocaiV2/LaoCaiV2PageIntro';
import LaoCaiV2FilterableTable from '../../../components/laocaiV2/LaoCaiV2FilterableTable';

// Báo cáo viên pháp luật tỉnh (từ mục "Báo cáo viên" của chuyên trang PBGDPL). Tên người là dữ liệu mẫu.
const NAMES = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E', 'Vũ Thị G', 'Đặng Văn H', 'Bùi Thị K', 'Đỗ Văn L', 'Ngô Thị M', 'Dương Văn N', 'Lý Thị P'];
const UNITS = ['Sở Tư pháp', 'Công an tỉnh', 'Sở Nông nghiệp và Môi trường', 'Sở Giáo dục và Đào tạo', 'Tòa án nhân dân tỉnh', 'Sở Nội vụ', 'Viện Kiểm sát nhân dân tỉnh', 'Sở Công Thương', 'Sở Y tế', 'Sở Tài chính', 'Bộ Chỉ huy Quân sự tỉnh', 'Sở Dân tộc và Tôn giáo'];
const FIELDS = ['Hành chính, tư pháp', 'Trật tự, an toàn giao thông', 'Đất đai, môi trường', 'Giáo dục', 'Dân sự, hình sự', 'Lao động, việc làm', 'Tố tụng hình sự', 'Thương mại, doanh nghiệp', 'Y tế, an toàn thực phẩm', 'Thuế, tài chính', 'Quốc phòng, biên giới', 'Dân tộc, tôn giáo'];

const BADGE = <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded text-xs font-bold uppercase whitespace-nowrap">Đang hoạt động</span>;

const ROWS = NAMES.map((name, i) => ({
    id: i + 1,
    name,
    search: `${name} ${UNITS[i]} ${FIELDS[i]}`,
    cells: [
        <span className="font-semibold text-[#1b2b49]">{name}</span>,
        UNITS[i],
        FIELDS[i],
        BADGE,
    ],
}));

const SORT_OPTIONS = [
    { value: 'default', label: 'Mặc định' },
    { value: 'az', label: 'Họ tên A → Z', compare: (a, b) => a.name.localeCompare(b.name, 'vi') },
    { value: 'za', label: 'Họ tên Z → A', compare: (a, b) => b.name.localeCompare(a.name, 'vi') },
];

const BaoCaoVienPage = () => {
    useEffect(() => {
        document.title = 'Báo cáo viên pháp luật tỉnh - Cổng Pháp luật tỉnh Lào Cai';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f0f4f8] pb-16">
            <LaoCaiV2PageIntro
                crumbs={[{ label: 'Phổ biến, giáo dục pháp luật' }, { label: 'Báo cáo viên pháp luật tỉnh' }]}
                title="Báo cáo viên pháp luật tỉnh Lào Cai"
                subtitle="Danh sách báo cáo viên pháp luật cấp tỉnh theo cơ quan công tác và lĩnh vực phụ trách"
            />
            <div className="container mx-auto px-4 max-w-[1286px] pt-8">
                <LaoCaiV2FilterableTable
                    headers={['STT', 'Họ và tên', 'Cơ quan công tác', 'Lĩnh vực', 'Trạng thái']}
                    colClassNames={['', 'w-56', '', '', 'w-44']}
                    rows={ROWS}
                    countLabel="báo cáo viên pháp luật"
                    sortOptions={SORT_OPTIONS}
                />
            </div>
        </div>
    );
};

export default BaoCaoVienPage;
