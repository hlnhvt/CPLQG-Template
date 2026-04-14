import React from 'react';
import { 
    Hammer, 
    Building2, 
    Landmark, 
    Monitor, 
    Scale, 
    FileText, 
    CheckCircle, 
    BookOpen, 
    Briefcase, 
    Users, 
    Shield 
} from 'lucide-react';

const LinkedPortals = () => {
    const portals = [
        { name: 'Cổng TTĐT Đảng Cộng sản Việt Nam', icon: Hammer },
        { name: 'Cổng Thông tin điện tử Chính Phủ', icon: Building2 },
        { name: 'Cổng Thông tin điện tử Quốc hội', icon: Landmark },
        { name: 'Cổng Thông tin điện tử Nghị quyết 57', icon: Monitor },
        { name: 'Cổng Thông tin điện tử Bộ Tư pháp', icon: Scale },
        { name: 'Công báo', icon: FileText },
        { name: 'Cổng VCCI', icon: CheckCircle },
        { name: 'LuatVietnam.vn', icon: BookOpen },
        { name: 'Liên đoàn luật sư Việt Nam', icon: Hammer },
        { name: 'Hội luật gia Việt Nam', icon: Briefcase },
        { name: 'Cổng PBGDPLQG', icon: Users },
        { name: 'Cổng thông tin đăng ký DN', icon: FileText },
        { name: 'Cổng Dịch vụ công quốc gia', icon: Shield },
    ];

    return (
        <div className="bg-white pb-10 pt-2">
            <div className="container mx-auto px-4 max-w-[1504px]">
                <h2 className="text-2xl font-bold text-[#0f4c81] mb-10">
                    Hệ thống cổng thông tin liên kết
                </h2>

                <div className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-10 max-w-[1450px] mx-auto px-4 md:px-0">
                    {portals.map((portal, index) => {
                        const Icon = portal.icon;
                        return (
                            <a 
                                key={index} 
                                href="#" 
                                className="flex items-center gap-4 w-full sm:w-[250px] md:w-[240px] group transition"
                            >
                                <div className="bg-[#f0f5f9] text-[#0f4c81] p-3.5 rounded-xl group-hover:bg-[#0f4c81] group-hover:text-white transition-colors duration-300">
                                    <Icon size={20} strokeWidth={2} />
                                </div>
                                <span className="font-bold text-[#0f4c81] text-[13px] leading-tight group-hover:text-blue-700 transition-colors">
                                    {portal.name}
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LinkedPortals;
