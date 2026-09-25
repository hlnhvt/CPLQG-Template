import React from 'react';
import { Search, ArrowUpDown, X } from 'lucide-react';

export const SORT_OPTIONS = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'oldest', label: 'Cũ nhất' },
    { value: 'az', label: 'Tên A → Z' },
    { value: 'za', label: 'Tên Z → A' },
];

// Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu
const normalize = (s = '') => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();

// "dd/mm/yyyy hh:mm" -> số để so sánh
const dateValue = (d = '') => {
    const [datePart = '', timePart = '00:00'] = d.split(' ');
    const [dd, mm, yyyy] = datePart.split('/');
    return Number(`${yyyy || 0}${(mm || '0').padStart(2, '0')}${(dd || '0').padStart(2, '0')}${timePart.replace(':', '')}`);
};

export const filterSortItems = (items, query, sort) => {
    const q = normalize(query.trim());
    const list = q
        ? items.filter((it) => normalize(`${it.title} ${it.excerpt || ''}`).includes(q))
        : [...items];
    switch (sort) {
        case 'oldest': return list.sort((a, b) => dateValue(a.date) - dateValue(b.date));
        case 'az': return list.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
        case 'za': return list.sort((a, b) => b.title.localeCompare(a.title, 'vi'));
        default: return list.sort((a, b) => dateValue(b.date) - dateValue(a.date));
    }
};

// Thanh tìm kiếm + sắp xếp dùng cho các trang Hòa giải ở cơ sở, Tủ sách pháp luật
const LaoCaiV2SearchSortBar = ({ query, onQueryChange, sort, onSortChange, placeholder = 'Nhập từ khóa tìm kiếm...', resultCount }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 bg-white"
                />
                {query && (
                    <button
                        onClick={() => onQueryChange('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label="Xóa từ khóa"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
            <div className="flex items-center gap-2 md:w-60">
                <ArrowUpDown size={16} className="text-gray-500 shrink-0" />
                <label className="text-sm font-medium text-gray-600 whitespace-nowrap">Sắp xếp</label>
                <select
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 bg-white"
                >
                    {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
            </div>
        </div>
        {query.trim() && (
            <p className="text-[13px] text-gray-500 mt-3">
                Tìm thấy <span className="font-semibold text-gray-800">{resultCount}</span> kết quả cho “{query.trim()}”
            </p>
        )}
    </div>
);

export default LaoCaiV2SearchSortBar;
