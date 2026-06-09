import React from 'react';
import { Filter } from 'lucide-react';

const GenericFilterSidebar = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-[#d8e1f2] p-5 w-full shrink-0 h-fit lg:sticky lg:top-32">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                <Filter size={20} className="text-[#2580f0]" fill="currentColor" />
                <h3 className="text-[18px] font-bold text-[#1b2b49]">Bộ lọc</h3>
            </div>
            
            <div className="space-y-5">
                <div>
                    <label className="block text-[14px] font-semibold text-[#1b2b49] mb-2">Tìm kiếm</label>
                    <input 
                        type="text" 
                        placeholder="Nhập từ khóa..." 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors placeholder:text-gray-400" 
                    />
                </div>
                
                <div>
                    <label className="block text-[14px] font-semibold text-[#1b2b49] mb-2">Sắp xếp</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white cursor-pointer text-gray-700">
                        <option>Mới nhất</option>
                        <option>Cũ nhất</option>
                        <option>Xem nhiều nhất</option>
                    </select>
                </div>
                
                <div>
                    <label className="block text-[14px] font-semibold text-[#1b2b49] mb-2">Chuyên mục</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white cursor-pointer text-gray-700">
                        <option>Tất cả</option>
                        <option>Phổ biến giáo dục</option>
                        <option>Hỗ trợ pháp lý</option>
                    </select>
                </div>
                
                <div className="flex items-center gap-3 pt-4">
                    <button className="flex-1 bg-[#2580f0] hover:bg-[#1a66c2] text-white font-semibold py-2 rounded-lg text-[14px] transition-colors shadow-sm">
                        Áp dụng
                    </button>
                    <button className="flex-1 bg-white hover:bg-gray-50 text-[#1b2b49] border border-gray-300 font-semibold py-2 rounded-lg text-[14px] transition-colors">
                        Đặt lại
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GenericFilterSidebar;
