import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight, CheckCircle2, Shield, Info, ExternalLink, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// ======================== MOCK DATA MAPPING ========================
// In a real app, this would be fetched from an API based on the :id
const MOCK_FORM_DATA = {
    title: 'Góp ý Dự thảo Luật Đất đai (Sửa đổi)',
    agency: 'Bộ Tài nguyên và Môi trường',
    duration: '01/03/2026 - 30/04/2026',
    intro: 'Luật Đất đai năm 2013 sau hơn 10 năm thi hành đã bộc lộ nhiều hạn chế, bất cập cần được sửa đổi, bổ sung để phù hợp với yêu cầu phát triển mới. Bản dự thảo lần này tập trung vào 4 nhóm vấn đề trọng tâm.',
    parts: [
        {
            id: 'part-a',
            label: 'Phần A: Quyền và nghĩa vụ của người sử dụng đất',
            desc: 'Đánh giá các quy định mới về mở rộng quyền, đảm bảo lợi ích hợp pháp của người sử dụng đất.',
            questions: [
                {
                    id: 'qA1',
                    type: 'radio',
                    label: '1. Bạn đánh giá thế nào về quy định cho phép chuyển nhượng, thế chấp quyền thuê trong hợp đồng thuê đất trả tiền hàng năm?',
                    options: ['Rất đồng tình', 'Đồng tình nhưng cần sửa đổi', 'Không đồng tình', 'Không có ý kiến']
                },
                {
                    id: 'qA2',
                    type: 'checkbox',
                    label: '2. Theo bạn, người sử dụng đất nông nghiệp cần được bổ sung thêm những quyền nào dưới đây? (Có thể chọn nhiều)',
                    options: ['Quyền chuyển đổi mục đích sử dụng linh hoạt hơn', 'Quyền xây dựng công trình phụ trợ phục vụ nông nghiệp', 'Quyền thế chấp tài sản gắn liền với đất', 'Khác']
                },
                {
                    id: 'qA3',
                    type: 'textarea',
                    label: '3. Ý kiến đóng góp thêm về Phần A (Không bắt buộc)',
                    placeholder: 'Vui lòng nhập ý kiến...'
                }
            ]
        },
        {
            id: 'part-b',
            label: 'Phần B: Thu hồi đất và bồi thường',
            desc: 'Các quy định cụ thể hóa trường hợp Nhà nước thu hồi đất để phát triển kinh tế xã hội vì lợi ích quốc gia, công cộng.',
            questions: [
                {
                    id: 'qB1',
                    type: 'radio',
                    label: '1. Quy định về bồi thường theo "giá thị trường" thay vì khung giá đất của Nhà nước có hợp lý không?',
                    options: ['Hoàn toàn hợp lý', 'Hợp lý nhưng khó thực thi', 'Chưa hợp lý', 'Không có ý kiến']
                },
                {
                    id: 'qB2',
                    type: 'textarea',
                    label: '2. Đề xuất của bạn về việc bố trí tái định cư cho người dân bị thu hồi đất:',
                    placeholder: 'Vui lòng nhập ý kiến...'
                }
            ]
        },
        {
            id: 'part-c',
            label: 'Phần C: Thông tin liên hệ (Tùy chọn)',
            desc: 'Thông tin của bạn sẽ được bảo mật và chỉ dùng cho mục đích thống kê, đối soát ý kiến.',
            questions: [
                { id: 'qC1', type: 'text', label: 'Họ và tên' },
                { id: 'qC2', type: 'email', label: 'Email' },
                { id: 'qC3', type: 'text', label: 'Đơn vị công tác / Địa chỉ' }
            ]
        }
    ]
};

// ======================== COMPONENTS ========================

const FieldRadio = ({ q, val, onChange }) => (
    <div className="space-y-3 mt-3">
        {q.options.map(opt => (
            <label key={opt} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50/50 cursor-pointer transition-colors has-[:checked]:border-green-600 has-[:checked]:bg-green-50">
                <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    checked={val === opt}
                    onChange={(e) => onChange(q.id, e.target.value)}
                    className="mt-1 w-4 h-4 text-green-600 focus:ring-green-600 border-gray-300"
                />
                <span className="text-[14px] text-gray-800 leading-snug">{opt}</span>
            </label>
        ))}
    </div>
);

const FieldCheckbox = ({ q, val = [], onChange }) => {
    const toggle = (opt) => {
        const newVals = val.includes(opt) ? val.filter(v => v !== opt) : [...val, opt];
        onChange(q.id, newVals);
    };
    return (
        <div className="space-y-3 mt-3">
            {q.options.map(opt => (
                <label key={opt} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50/50 cursor-pointer transition-colors has-[:checked]:border-green-600 has-[:checked]:bg-green-50">
                    <input
                        type="checkbox"
                        checked={val.includes(opt)}
                        onChange={() => toggle(opt)}
                        className="mt-1 w-4 h-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
                    />
                    <span className="text-[14px] text-gray-800 leading-snug">{opt}</span>
                </label>
            ))}
        </div>
    );
};

export default function ConsultFeedbackPage() {
    const { id } = useParams();
    const data = MOCK_FORM_DATA;
    const { user } = useAuth();

    const [answers, setAnswers] = useState({});
    const [partProceed, setPartProceed] = useState({});
    const [activePart, setActivePart] = useState('instructions');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Pre-fill user info
    useEffect(() => {
        if (user) {
            setAnswers(prev => ({
                ...prev,
                qC1: user.name || '',
                qC2: user.email || '',
            }));
        }
    }, [user]);

    // Track scroll to update active sidebar item
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['instructions', ...data.parts.map(p => p.id)];
            let current = 'instructions';
            for (const sec of sections) {
                const el = document.getElementById(sec);
                if (el && window.scrollY >= el.offsetTop - 150) {
                    current = sec;
                }
            }
            setActivePart(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [data.parts]);

    const handleAnswer = (qId, val) => setAnswers(prev => ({ ...prev, [qId]: val }));
    const handleProceedToggle = (pId, val) => setPartProceed(prev => ({ ...prev, [pId]: val }));

    const getProgression = () => {
        const total = data.parts.reduce((acc, p) => acc + p.questions.length, 0);
        let answered = 0;
        data.parts.forEach(p => {
            // Include counting logic if we want a progress bar
            // For now, let's just make it simple
        });
        return { total: 0, answered: 0 };
    };

    const submitForm = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
                <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-[24px] font-bold text-gray-900 mb-3">Cảm ơn bạn!</h2>
                    <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
                        Ý kiến đóng góp của bạn cho <strong>{data.title}</strong> đã được ghi nhận. Hệ thống mã hồ sơ: <span className="font-mono text-gray-900 bg-gray-100 px-2 py-0.5 rounded font-semibold ml-1">HK-98231</span>
                    </p>
                    <Link to="/hien-ke" className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors">
                        Quay lại trang chính <ChevronRight size={16} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f3f4f6] font-sans">
            {/* Header Form */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="container mx-auto px-4 md:px-8 max-w-[1200px] h-[72px] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to={`/hien-ke/${id || 1}`} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1e3a8a] hover:text-white transition-colors">
                            <ArrowLeft size={18} />
                        </Link>
                        <div>
                            <p className="text-[11px] font-bold uppercase text-gray-400 tracking-wider">Phiếu khảo sát ý kiến</p>
                            <h1 className="text-[14px] md:text-[16px] font-bold text-gray-900 leading-tight line-clamp-1 max-w-[400px] md:max-w-[600px]">{data.title}</h1>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-3">
                        <span className="text-[12px] text-gray-500 font-medium">Bản nháp tự động lưu</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 md:px-8 max-w-[1200px] py-10 flex flex-col md:flex-row gap-8 items-start">

                {/* Fixed Sidebar Navigation */}
                <div className="w-full md:w-[280px] shrink-0 sticky top-[100px] hidden md:block">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2 text-[13px] font-bold text-gray-700 uppercase tracking-wide">
                            <Shield size={16} className="text-green-600" />
                            Tiến trình tham gia
                        </div>
                        <nav className="p-2 space-y-1">
                            <a
                                href="#instructions"
                                className={`block px-4 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${activePart === 'instructions' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Hướng dẫn chung
                            </a>
                            {data.parts.map(p => (
                                <a
                                    key={p.id}
                                    href={`#${p.id}`}
                                    className={`block px-4 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${activePart === p.id ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {p.label}
                                </a>
                            ))}
                        </nav>
                        {/* <div className="p-4 bg-blue-50/50 border-t border-blue-100 m-2 rounded-lg">
                            <p className="text-[12px] text-blue-800 leading-relaxed font-medium">
                                Ý kiến của bạn sẽ đóng góp trực tiếp vào quá trình hoạch định chính sách quốc gia.
                            </p>
                        </div> */}
                    </div>
                </div>

                {/* Main Form Content */}
                <div className="flex-1 min-w-0 max-w-[760px] mx-auto md:mx-0">

                    {/* Instructions Block */}
                    <div id="instructions" className="bg-white border-t-4 border-green-600 rounded-xl shadow-md p-6 md:p-10 mb-8 scroll-mt-24">
                        <div className="mb-6 flex gap-4 items-start">
                            <div className="w-16 h-16 bg-[#1e3a8a] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                                <span className="text-white text-[12px] font-bold uppercase tracking-wider text-center">{data.agency.split(' ').map(w => w[0]).join('')}</span>
                            </div>
                            <div>
                                <h2 className="text-[26px] md:text-[32px] font-bold text-gray-900 leading-[1.15] mb-2">{data.title}</h2>
                                <p className="text-[14px] text-gray-500 font-semibold">{data.agency}</p>
                            </div>
                        </div>

                        <div className="prose prose-sm text-gray-700 mb-8">
                            <p className="text-[16px] leading-relaxed relative">
                                <span className="absolute -left-3 -top-1 text-3xl text-gray-200 font-serif">"</span>
                                {data.intro}
                            </p>
                            <p className="text-[15px]">Quá trình khảo sát sẽ mất khoảng 5-10 phút. Rất mong nhận được ý kiến khách quan từ bạn.</p>
                        </div>

                        <div className="bg-amber-50 rounded-xl border border-amber-200 p-5 flex gap-4 items-start mb-6">
                            <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-amber-800 text-[14px] mb-1">Quy định về dữ liệu</h4>
                                <ul className="text-[13px] text-amber-700 space-y-1 list-disc list-inside ml-1">
                                    <li>Thời gian lấy ý kiến: {data.duration}</li>
                                    <li>Dữ liệu được bảo mật theo tiêu chuẩn quốc gia</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Form Parts */}
                    {data.parts.map((part, index) => {
                        // For Part B onwards, check if the user clicked "Yes" to proceed in the previous part or in the introduction
                        const isVisible = index === 0 || partProceed[data.parts[index - 1].id] === 'yes';

                        if (!isVisible) return null;

                        return (
                            <div key={part.id} id={part.id} className="bg-white border rounded-xl shadow-sm p-6 md:p-10 mb-8 scroll-mt-24 border-gray-200 animate-fadeIn">
                                <div className="mb-8">
                                    <h3 className="text-[22px] font-bold text-gray-900 mb-2">{part.label}</h3>
                                    <p className="text-[15px] text-gray-600 leading-relaxed">{part.desc}</p>
                                </div>

                                <div className="space-y-8 mb-10">
                                    {part.questions.map(q => (
                                        <div key={q.id}>
                                            <label className="block text-[15px] font-bold text-gray-800 leading-snug">{q.label}</label>

                                            {q.type === 'radio' && (
                                                <FieldRadio q={q} val={answers[q.id]} onChange={handleAnswer} />
                                            )}

                                            {q.type === 'checkbox' && (
                                                <FieldCheckbox q={q} val={answers[q.id] || []} onChange={handleAnswer} />
                                            )}

                                            {(q.type === 'textarea') && (
                                                <textarea
                                                    rows={4}
                                                    className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600 transition-colors text-[14px] text-gray-800 resize-y"
                                                    placeholder={q.placeholder}
                                                    value={answers[q.id] || ''}
                                                    onChange={e => handleAnswer(q.id, e.target.value)}
                                                />
                                            )}

                                            {(q.type === 'text' || q.type === 'email') && (
                                                <div className="relative">
                                                    <input
                                                        type={q.type}
                                                        readOnly={user && (q.id === 'qC1' || q.id === 'qC2')}
                                                        className={`w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600 transition-colors text-[14px] text-gray-800 ${user && (q.id === 'qC1' || q.id === 'qC2') ? 'bg-gray-100 cursor-not-allowed pr-32' : 'bg-white'}`}
                                                        value={answers[q.id] || ''}
                                                        onChange={e => handleAnswer(q.id, e.target.value)}
                                                    />
                                                    {user && (q.id === 'qC1' || q.id === 'qC2') && (
                                                        <span className="absolute right-3 top-[calc(50%+6px)] -translate-y-1/2 flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                                                            <Lock size={10} /> Đã xác thực
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Proceed Question (If not the last part) */}
                                {index < data.parts.length - 1 && (
                                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                                        <p className="font-bold text-[15px] text-gray-800 mb-4 flex items-center gap-2">
                                            Bạn có muốn tiếp tục góp ý cho <span className="text-green-700">{data.parts[index + 1].label.split(':')[0]}</span> không?
                                        </p>
                                        <div className="flex gap-4">
                                            <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border cursor-pointer font-bold transition-all text-[14px] ${partProceed[part.id] === 'yes' ? 'bg-green-600 text-white border-green-600 shadow-md' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                                                <input
                                                    type="radio" name={`proceed_${part.id}`} className="hidden"
                                                    onChange={() => handleProceedToggle(part.id, 'yes')}
                                                />
                                                Có, tiếp tục
                                            </label>
                                            <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border cursor-pointer font-bold transition-all text-[14px] ${partProceed[part.id] === 'no' ? 'bg-gray-800 text-white border-gray-800 shadow-md' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                                                <input
                                                    type="radio" name={`proceed_${part.id}`} className="hidden"
                                                    onChange={() => handleProceedToggle(part.id, 'no')}
                                                />
                                                Bỏ qua phần này
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Submit button at the very end or if 'no' is selected to proceed further */}
                                {(index === data.parts.length - 1 || partProceed[part.id] === 'no') && (
                                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                                        <button
                                            onClick={submitForm}
                                            className="px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-[15px] transition-all shadow-md shadow-green-600/20"
                                        >
                                            Gửi tất cả ý kiến
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                </div>
            </div>

            {/* Simple footer for form */}
            <footer className="bg-white border-t border-gray-200 py-8 text-center text-[13px] text-gray-500 mt-auto">
                <p className="mt-1 flex items-center justify-center gap-1"><Shield size={12} /> Dữ liệu được mã hóa bảo mật.</p>
            </footer>
        </div>
    );
}
