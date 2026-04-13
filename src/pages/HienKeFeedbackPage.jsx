import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ChevronRight, Send, MapPin, Phone, Mail,
    Facebook, Linkedin, MessageCircle, Share2,
    ChevronDown, ChevronUp, ExternalLink, ArrowUpRight,
    Heart, ArrowRight
} from 'lucide-react';

// ======================== MOCK DATA ========================

const CONTACT_CHANNELS = [
    { name: 'Telegram', icon: MessageCircle, url: 'https://t.me/hienke', desc: 'Tham gia nhóm thảo luận trực tuyến.' },
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/hienke', desc: 'Theo dõi tin tức và các buổi phát trực tiếp.' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/hienke', desc: 'Kết nối mạng lưới chuyên gia chính sách.' },
    { name: 'TikTok', icon: Share2, url: 'https://tiktok.com/@hienke', desc: 'Video ngắn về các sáng kiến pháp luật mới.' },
];

const FAQS = [
    {
        q: 'Hiến kế của tôi sẽ được xử lý như thế nào?',
        a: 'Các ý kiến của bạn sẽ được phân loại, đánh giá và báo cáo trực tiếp đến các đơn vị có thẩm quyền để xem xét đưa vào dự thảo văn bản.'
    },
    {
        q: 'Nghị quyết 66-NQ/TW có ý nghĩa gì đối với công tác Hiến kế?',
        a: 'Nghị quyết 66-NQ/TW nhấn mạnh việc đổi mới công tác xây dựng và thi hành pháp luật, coi ý kiến của người dân và doanh nghiệp là trọng tâm để phát triển đất nước trong kỷ nguyên mới.'
    },
    {
        q: 'Tôi có thể gửi tài liệu đính kèm không?',
        a: 'Có, biểu mẫu Hiến kế hỗ trợ đính kèm các tệp văn bản (DOCX, PDF) và hình ảnh minh họa cho sáng kiến của bạn.'
    }
];

// ======================== COMPONENTS ========================

const Section = ({ id, title, children }) => (
    <section id={id} className="py-12 border-b border-gray-100 last:border-0 scroll-mt-24">
        <h2 className="text-[28px] font-bold text-[#0f172a] mb-8">{title}</h2>
        {children}
    </section>
);

const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden bg-white shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
            >
                <span className="font-bold text-[#1e3a8a] text-[17px]">{question}</span>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isOpen && (
                <div className="p-5 pt-0 text-gray-600 leading-relaxed text-[16px] animate-fade-in">
                    {answer}
                </div>
            )}
        </div>
    );
};

// ======================== PAGE ========================

export default function HienKeFeedbackPage() {
    const [activeSection, setActiveSection] = useState('gioi-thieu');
    const [formData, setFormData] = useState({ name: '', email: '', topic: 'hien-ke-cua-ban', message: '' });

    // Handle scroll to highlight active sidebar item
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['gioi-thieu', 'feedback', 'channels', 'address', 'faq'];
            const scrollPos = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && element.offsetTop <= scrollPos && element.offsetTop + element.offsetHeight > scrollPos) {
                    setActiveSection(section);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-amber-100 italic-none">

            {/* HEROBANNER */}
            <div className="relative overflow-hidden bg-[#0f172a] min-h-[450px] flex items-center">
                {/* Background: trống đồng image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-bg-pan"
                    style={{ backgroundImage: "url('/images/dong_son_cover.png')" }}
                />
                {/* Overlay: dark navy so text is readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#1e3a8a]/80 to-[#1e3a8a]/60" />
                {/* Subtle gold shimmer overlay matching trống đồng */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]/50" />

                <div className="container mx-auto px-4 md:px-8 max-w-[1280px] relative z-20 py-12">
                    <nav className="flex items-center gap-1.5 text-blue-300/80 text-[13px] mb-8 animate-fade-in">
                        <Link to="/" className="hover:text-white transition-colors">Trang chủ</Link>
                        <ChevronRight size={14} />
                        <Link to="/hien-ke" className="hover:text-white transition-colors">Hiến kế xây dựng và thi hành pháp luật</Link>
                        <ChevronRight size={14} />
                        <span className="text-white/90">Giới thiệu</span>
                    </nav>

                    <div className="max-w-4xl">
                        <h1 className="text-[32px] md:text-[45px] lg:text-[53px] font-black text-white leading-[1.2] mb-5 animate-fade-up">
                            <span className="inline-block py-1 animate-text-gradient bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">Hiến kế</span>
                            <span className="block text-[24px] md:text-[32px] lg:text-[38px] font-bold mt-1 leading-[1.4] text-amber-300 animate-text-gradient bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300 bg-clip-text text-transparent py-1">
                                Xây dựng và thi hành pháp luật đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới
                            </span>
                        </h1>
                        <p className="text-[18px] md:text-[23px] font-semibold leading-relaxed mb-6 whitespace-nowrap max-w-none animate-fade-in delay-100 italic">
                            <span className="relative inline-block animate-text-shimmer bg-[linear-gradient(110deg,#bfdbfe,45%,#ffffff,55%,#fde68a)] bg-[length:200%_100%] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                "Tiếng nói của bạn góp phần quan trọng định hình chính sách, pháp luật quốc gia"
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="container mx-auto px-4 md:px-8 max-w-[1280px] py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* LEFT SIDEBAR - Navigation */}
                    <div className="lg:w-[280px] shrink-0">
                        <div className="sticky top-24 space-y-2">
                            <h3 className="text-[12px] uppercase tracking-widest font-bold text-gray-400 mb-4 px-4">Mục lục</h3>
                            {[
                                { id: 'gioi-thieu', label: 'Giới thiệu' },
                                { id: 'feedback', label: 'Gửi ý kiến phản hồi' },
                                { id: 'address', label: 'Địa chỉ văn phòng' },
                                { id: 'faq', label: 'Liên kết hữu ích & FAQ' },
                            ].map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-[15px] font-bold transition-all ${activeSection === item.id
                                        ? 'bg-blue-50 text-blue-700 shadow-sm border-l-4 border-blue-600'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="flex-1 max-w-3xl">

                        {/* Section: Introduction */}
                        <Section id="gioi-thieu" title="Giới thiệu">
                            <div className="prose prose-blue max-w-none text-gray-600 text-[16px] leading-relaxed">
                                <p className="text-[18px] font-medium mb-6">
                                    Trang Thông tin điện tử này được thiết lập nhằm huy động trí tuệ của người dân, doanh nghiệp và toàn thể xã hội; tạo kênh đối thoại đa chiều, tiếp thu các ý kiến góp phần xây dựng, hoàn thiện chính sách, pháp luật và nâng cao hiệu quả thi hành pháp luật đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới.
                                </p>

                                {/* Blockquotes Section */}
                                <div className="my-10 space-y-6">
                                    <div className="relative p-6 md:p-8 bg-amber-50 rounded-2xl border-l-8 border-amber-400 shadow-sm">
                                        <p className="relative z-10 text-[15px] md:text-[18px] font-basic text-gray-800 leading-relaxed mb-4 italic">
                                            "Nước ta là nước dân chủ. Bao nhiêu lợi ích đều vì dân. Bao nhiêu quyền hạn đều của dân... Nói tóm lại, quyền hành và lực lượng đều ở nơi dân."
                                        </p>
                                        <p className="text-right font-bold text-amber-700 uppercase">- Chủ tịch Hồ Chí Minh -</p>
                                    </div>

                                    {/* <div className="relative p-6 md:p-8 bg-blue-50 rounded-2xl border-l-8 border-blue-600 shadow-sm">
                                        <div className="absolute top-2 right-4 text-blue-200 opacity-50">
                                            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L19.017 3C20.6739 3 22.017 4.34315 22.017 6V15C22.017 16.6569 20.6739 18 19.017 18H17.017L17.017 21H14.017ZM2.01695 21L2.01695 18C2.01695 16.8954 2.91238 16 4.01695 16H7.01695C7.56923 16 8.01695 15.5523 8.01695 15V9C8.01695 8.44772 7.56923 8 7.01695 8H4.01695C2.91238 8 2.01695 7.10457 2.01695 6V3L7.01695 3C8.6738 3 10.017 4.34315 10.017 6V15C10.017 16.6569 8.6738 18 7.01695 18H5.01695L5.01695 21H2.01695Z" /></svg>
                                        </div>
                                        <p className="relative z-10 text-[17px] md:text-[20px] font-bold text-gray-800 leading-relaxed mb-4 italic">
                                            "Phải đổi mới tư duy xây dựng pháp luật theo hướng vừa bảo đảm yêu cầu quản lý nhà nước, vừa khuyến khích sáng tạo, giải phóng mọi nguồn lực để phát triển. Lấy người dân, doanh nghiệp là trung tâm, chủ thể."
                                        </p>
                                        <p className="text-right font-black text-blue-700 uppercase tracking-wider">— Tổng Bí thư Tô Lâm</p>
                                    </div> */}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                        <h3 className="text-[17px] font-bold text-[#0f172a] mb-3 flex items-center gap-2">
                                            Mục tiêu cốt lõi
                                        </h3>
                                        <ul className="list-none pl-0 space-y-2">
                                            <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-blue-500 before:rounded-full">Góp phần cụ thể hóa nội dung Nghị quyết số 66-NQ/TW ngày 30/4/2025 của Bộ Chính trị về đổi mới công tác xây dựng và thi hành pháp luật đáp ứng yêu cầu phát triển đất nước trong kỷ nguyên mới.</li>
                                            <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-blue-500 before:rounded-full">Thúc đẩy văn hóa, trách nhiệm xã hội của doanh nghiệp, người dân trong xây dựng, hoàn thiện hệ thống pháp luật và tổ chức thi hành hiệu quả pháp luật góp phần phát triển kinh tế - xã hội của đất nước.</li>
                                            <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-blue-500 before:rounded-full">Hình thành hệ sinh thái dữ liệu pháp luật mở để lắng nghe, tiếp nhận, tổng hợp các ý kiến góp ý trong quá trình xây dựng, hoàn thiện chính sách, pháp luật và nâng cao hiệu quả thi hành pháp luật.</li>
                                        </ul>
                                    </div>

                                    <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
                                        <h3 className="text-[17px] font-bold text-[#0f172a] mb-3 flex items-center gap-2">
                                            Cách thức hoạt động
                                        </h3>
                                        <ul className="list-none pl-0 space-y-2">
                                            <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-amber-500 before:rounded-full"><strong>Ghi nhận ý kiến:</strong> Qua biểu mẫu trực tuyến, diễn đàn, email.</li>
                                            <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-amber-500 before:rounded-full"><strong>Xử lý kịp thời:</strong> Các thông tin hiến kế sẽ được tiếp nhận, phân loại và được chuyển đến cơ quan chuyên môn nghiên cứu, đánh giá.</li>
                                            <li className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-amber-500 before:rounded-full"><strong>Tài trợ hiến kế:</strong> Những sáng kiến đề xuất pháp luật có thể được xem xét hỗ trợ, tài trợ bởi Quỹ Hỗ trợ hoạt động xây dựng chính sách, pháp luật.</li>
                                        </ul>
                                    </div>
                                </div>

                                <h3 className="text-[18px] font-bold text-[#0f172a] mb-4">Các hoạt động chính</h3>
                                <div className="space-y-4">
                                    <div className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="w-12 h-12 shrink-0 rounded-xl bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">1</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Hiến kế của bạn</h4>
                                            <p className="text-[14.5px] text-gray-600">Đây là mục tin phục vụ người dân, doanh nghiệp, các tổ chức chính trị - xã hội chủ động tham gia hiến kế xây dựng, tổ chức thi hành pháp luật hiệu quả trên cơ sở xuất phát từ các chủ đề, nội dung, vấn đề thực tế trong mọi lĩnh vực của đời sống xã hội hướng tới mục tiêu phát triển kinh tế - xã hội của đất nước.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">2</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Chúng tôi cần bạn</h4>
                                            <p className="text-[14.5px] text-gray-600">Đây là mục tin thể hiện các nội dung, chủ đề, vấn đề cụ thể mà cơ quan quản lý nhà nước cần sự hiến kế, tham gia ý kiến, phản biện của xã hội, doanh nghiệp, người dân trong quá trình xây dựng, hoàn thiện chính sách, pháp luật và thi hành hiệu quả pháp luật.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="w-12 h-12 shrink-0 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">3</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Có thể bạn quan tâm</h4>
                                            <p className="text-[14.5px] text-gray-600">Các chủ đề, nội dung mang tính gợi ý để xã hội, người dân, doanh nghiệp hiến kế, góp ý theo từng lĩnh vực pháp luật cụ thể.</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-8 text-center text-gray-500 italic text-[14.5px]">
                                    "Khát vọng phát triển đất nước bắt nguồn từ chính trí tuệ và tiếng nói của Nhân dân. Hãy cùng chúng tôi kiến tạo hành lang pháp lý vững chắc cho kỷ nguyên mới!"
                                </p>
                            </div>
                        </Section>

                        {/* Section: Feedback Form */}
                        <Section id="feedback" title="Gửi ý kiến phản hồi">
                            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl border border-green-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm mb-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 bg-green-200 text-green-700 rounded-full flex items-center justify-center shrink-0">
                                        <Heart size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-[20px] font-bold text-gray-900 mb-2">Chia sẻ hiến kế của bạn</h3>
                                        <p className="text-gray-700 max-w-2xl leading-relaxed text-[15px]">
                                            Mọi ý kiến đóng góp của bạn về các vấn đề dân sinh, sức khoẻ, giáo dục, hạ tầng giao thông... đều được tổng hợp và phân tích để chuyển tới các cơ quan chức năng, nhằm xây dựng môi trường sống thiết thực và tốt đẹp hơn.
                                        </p>
                                    </div>
                                </div>
                                <Link to="/hien-ke/gop-y-nhanh?topic=doi-song" className="px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-md shrink-0 text-[15px] flex items-center gap-2">
                                    Bắt đầu góp ý <ArrowRight size={16} />
                                </Link>
                            </div>
                        </Section>

                        {/* Section: Office Address */}
                        {/* <Section id="address" title="Địa chỉ văn phòng">
                            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
                                <div className="flex-1 space-y-6">
                                    <div className="flex gap-4">
                                        <MapPin className="text-blue-600 shrink-0" size={24} />
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Bộ Tư pháp</h4>
                                            <p className="text-gray-600 text-[15px]">Số 60 Trần Phú, phường Ba Đình, TP Hà Nội</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Phone className="text-blue-600 shrink-0" size={24} />
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Điện thoại</h4>
                                            <p className="text-gray-600 text-[15px]">024.62739715</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Mail className="text-blue-600 shrink-0" size={24} />
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Email liên hệ</h4>
                                            <p className="text-gray-600 text-[15px]">contact@hienke.phapdien.gov.vn</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-[240px] w-full aspect-square bg-[#0c1324] rounded-2xl flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <p className="text-[13px] font-bold uppercase tracking-wider mb-2 text-blue-300">Xem bản đồ</p>
                                        <p className="text-[12px] opacity-70 mb-4">Mở Google Maps trên ứng dụng hoặc trình duyệt của bạn</p>
                                        <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-[14px] transition-all transform group-hover:scale-105">
                                            Chỉ đường
                                        </button>
                                    </div>
                                    <div className="absolute inset-0 bg-[url('/images/trong_dong_gold.png')] bg-cover opacity-10 group-hover:opacity-20 transition-opacity" />
                                </div>
                            </div>
                        </Section> */}

                        {/* Section: Useful Links & FAQ */}
                        <Section id="faq" title="Liên kết hữu ích & FAQ">
                            <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <a
                                    href="#"
                                    className="p-6 bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] rounded-2xl text-white group relative overflow-hidden shadow-lg shadow-blue-900/20"
                                >
                                    <div className="relative z-10">
                                        <h4 className="font-bold text-[18px] mb-2 flex items-center gap-2">
                                            Quỹ hỗ trợ xây dựng chính sách, pháp luật
                                            <ArrowUpRight size={18} />
                                        </h4>
                                        <p className="text-blue-100 text-[14px] leading-relaxed">Tiêu chí hỗ trợ & tài trợ cho các sáng kiến pháp luật giá trị.</p>
                                    </div>
                                    <ExternalLink className="absolute bottom-4 right-4 opacity-20" size={48} />
                                </a>
                                <a
                                    href="#"
                                    className="p-6 bg-white border border-gray-200 rounded-2xl text-gray-900 group hover:border-amber-400 transition-all shadow-sm"
                                >
                                    <h4 className="font-bold text-[18px] mb-2 text-[#0f172a] flex items-center gap-2">
                                        Quy trình tiếp nhận & xử lý
                                        <ArrowUpRight size={18} />
                                    </h4>
                                    <p className="text-gray-500 text-[14px] leading-relaxed">Hướng dẫn chi tiết về các bước sau khi bạn gửi hiến kế thành công.</p>
                                </a>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-[18px] font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <ChevronDown className="text-blue-600" /> Các câu hỏi thường gặp
                                </h3>
                                {FAQS.map((faq, idx) => (
                                    <AccordionItem key={idx} question={faq.q} answer={faq.a} />
                                ))}
                            </div>
                        </Section>

                    </div>
                </div>
            </div>

            {/* SHARED STYLES */}
            <style>{`
                @keyframes bgPan {
                    0% { transform: scale(1) translate(0, 0); }
                    50% { transform: scale(1.05) translate(-1%, 1.5%); }
                    100% { transform: scale(1) translate(0, 0); }
                }
                .animate-bg-pan { animation: bgPan 40s ease-in-out infinite; }
                .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
                .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(20px); }
                .delay-100 { animation-delay: 100ms; }
                @keyframes fadeIn { to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

                @keyframes textShimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
                .animate-text-shimmer {
                    animation: textShimmer 8s linear infinite;
                }
            `}</style>
        </div>
    );
}
