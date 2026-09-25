import React, { useEffect } from 'react';
import LaoCaiV2PageIntro from '../../../components/laocaiV2/LaoCaiV2PageIntro';
import LaoCaiV2FilterableTable from '../../../components/laocaiV2/LaoCaiV2FilterableTable';

// Tuyên truyền viên pháp luật (từ mục "Tuyên truyền viên" của chuyên trang PBGDPL). Tên người là dữ liệu mẫu.
const NAMES = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E', 'Vũ Thị G', 'Đặng Văn H', 'Bùi Thị K', 'Đỗ Văn L', 'Ngô Thị M', 'Dương Văn N', 'Lý Thị P'];
const AREAS = ['Phường Cam Đường', 'Phường Lào Cai', 'Phường Sa Pa', 'Xã Bát Xát', 'Xã Bắc Hà', 'Xã Mường Khương', 'Xã Si Ma Cai', 'Xã Y Tý', 'Xã Văn Bàn', 'Phường Cốc San', 'Xã Bảo Yên', 'Xã Bát Xát'];
const ROLES = ['Công chức Tư pháp - Hộ tịch', 'Trưởng thôn', 'Người có uy tín trong đồng bào dân tộc', 'Chi hội trưởng Phụ nữ', 'Bí thư Chi đoàn', 'Công an viên', 'Giáo viên', 'Trưởng bản', 'Chi hội trưởng Nông dân', 'Tổ trưởng tổ dân phố', 'Hòa giải viên', 'Trưởng thôn'];

const BADGE = <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded text-xs font-bold uppercase whitespace-nowrap">Đang hoạt động</span>;

const ROWS = NAMES.map((name, i) => ({
    id: i + 1,
    name,
    search: `${name} ${AREAS[i]} ${ROLES[i]}`,
    cells: [
        <span className="font-semibold text-[#1b2b49]">{name}</span>,
        AREAS[i],
        ROLES[i],
        BADGE,
    ],
}));

const SORT_OPTIONS = [
    { value: 'default', label: 'Mặc định' },
    { value: 'az', label: 'Họ tên A → Z', compare: (a, b) => a.name.localeCompare(b.name, 'vi') },
    { value: 'za', label: 'Họ tên Z → A', compare: (a, b) => b.name.localeCompare(a.name, 'vi') },
];

const TuyenTruyenVienPage = () => {
    useEffect(() => {
        document.title = 'Tuyên truyền viên pháp luật tỉnh - Cổng Pháp luật tỉnh Lào Cai';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f0f4f8] pb-16">
            <LaoCaiV2PageIntro
                crumbs={[{ label: 'Phổ biến, giáo dục pháp luật' }, { label: 'Tuyên truyền viên pháp luật tỉnh' }]}
                title="Tuyên truyền viên pháp luật tỉnh Lào Cai"
                subtitle="Danh sách tuyên truyền viên pháp luật tại các xã, phường trên địa bàn tỉnh Lào Cai"
            />
            <div className="container mx-auto px-4 max-w-[1286px] pt-8">
                <LaoCaiV2FilterableTable
                    headers={['STT', 'Họ và tên', 'Đơn vị / Địa bàn', 'Chuyên môn / Vị trí', 'Trạng thái']}
                    colClassNames={['', 'w-56', '', '', 'w-44']}
                    rows={ROWS}
                    countLabel="tuyên truyền viên pháp luật"
                    sortOptions={SORT_OPTIONS}
                />
            </div>
        </div>
    );
};

export default TuyenTruyenVienPage;
