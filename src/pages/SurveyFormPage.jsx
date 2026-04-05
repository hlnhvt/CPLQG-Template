import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Star, CheckCircle2, ArrowLeft, BarChart2, AlertCircle } from 'lucide-react';

// -- Mock Survey Questions --
const SURVEY = {
    id: 1,
    topicId: 1,
    topicTitle: "Khảo sát về chất lượng dịch vụ hành chính công",
    title: "Khảo sát về chất lượng dịch vụ hành chính công - Đợt 1",
    questions: [
        {
            id: 1,
            type: "radio",
            required: true,
            text: "Bạn đánh giá thế nào về thái độ phục vụ của cán bộ tiếp nhận hồ sơ?",
            options: ["Rất hài lòng", "Hài lòng", "Bình thường", "Không hài lòng", "Rất không hài lòng"]
        },
        {
            id: 2,
            type: "checkbox",
            required: true,
            maxChoices: 3,
            text: "Bạn đã sử dụng những kênh nào để nộp hồ sơ hành chính? (Chọn tối đa 3)",
            options: ["Nộp trực tiếp tại cơ quan", "Cổng Dịch vụ công Quốc gia", "Ứng dụng VNeID", "Bưu chính công ích", "Zalo / ứng dụng địa phương"]
        },
        {
            id: 3,
            type: "rating",
            required: true,
            text: "Đánh giá số sao cho chất lượng dịch vụ tổng thể:",
            labels: ["Rất không hài lòng", "Rất hài lòng"]
        },
        {
            id: 4,
            type: "radio",
            required: false,
            text: "Thời gian xử lý hồ sơ có đúng theo quy định không?",
            options: ["Đúng hẹn", "Sớm hơn so với quy định", "Trễ hẹn (dưới 5 ngày)", "Trễ hẹn (trên 5 ngày)"]
        },
        {
            id: 5,
            type: "text",
            required: false,
            text: "Đề xuất, ý kiến của bạn để cải thiện chất lượng dịch vụ hành chính công:",
            maxLength: 1000,
            placeholder: "Nhập ý kiến đóng góp của bạn tại đây..."
        }
    ]
};

const SurveyFormPage = () => {
    const { surveyId } = useParams();
    const navigate = useNavigate();
    const survey = SURVEY;
    const total = survey.questions.length;

    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({}); // { questionId: value }
    const [errors, setErrors] = useState({});   // { questionId: errorMsg }
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const currentQ = survey.questions[currentIdx];
    const progressPercent = Math.round(((currentIdx) / total) * 100);

    // --- Answer Handlers ---
    const setAnswer = (qId, value) => {
        setAnswers(prev => ({ ...prev, [qId]: value }));
        setErrors(prev => ({ ...prev, [qId]: null }));
    };

    const toggleCheckbox = (qId, option, maxChoices) => {
        const current = answers[qId] || [];
        if (current.includes(option)) {
            setAnswer(qId, current.filter(o => o !== option));
        } else {
            if (maxChoices && current.length >= maxChoices) return; // Don't add if max reached
            setAnswer(qId, [...current, option]);
        }
    };

    // --- Validation ---
    const validateCurrent = () => {
        const q = currentQ;
        if (!q.required) return true;
        const val = answers[q.id];
        let valid = true;
        let msg = 'Vui lòng trả lời câu hỏi này trước khi tiếp tục.';
        if (!val || (Array.isArray(val) && val.length === 0) || val === '') {
            setErrors(prev => ({ ...prev, [q.id]: msg }));
            valid = false;
        }
        return valid;
    };

    const handleNext = () => {
        if (!validateCurrent()) return;
        setCurrentIdx(i => Math.min(i + 1, total - 1));
    };

    const handlePrev = () => {
        setErrors({});
        setCurrentIdx(i => Math.max(i - 1, 0));
    };

    const handleSubmit = () => {
        if (!validateCurrent()) return;
        // Simulate success
        setSubmitted(true);
    };

    // --- Render Question Types ---
    const renderQuestion = (q) => {
        const error = errors[q.id];

        return (
            <div key={q.id} className="animate-fadeIn">
                {/* Question Text */}
                <div className="text-[17px] md:text-[19px] font-bold text-gray-800 mb-6 leading-snug">
                    <span className="text-blue-600 mr-2">Câu {currentIdx + 1}:</span>
                    {q.text}
                    {q.required && <span className="text-red-500 ml-1">*</span>}
                </div>

                {/* Radio */}
                {q.type === 'radio' && (
                    <div className="space-y-3">
                        {q.options.map((opt, i) => {
                            const selected = answers[q.id] === opt;
                            return (
                                <label key={i} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'}`}>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                                        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                                    </div>
                                    <input type="radio" name={`q${q.id}`} value={opt} checked={selected} onChange={() => setAnswer(q.id, opt)} className="sr-only" />
                                    <span className={`text-[15px] font-medium ${selected ? 'text-blue-700' : 'text-gray-700'}`}>{opt}</span>
                                </label>
                            );
                        })}
                    </div>
                )}

                {/* Checkbox */}
                {q.type === 'checkbox' && (
                    <div className="space-y-3">
                        {q.maxChoices && (
                            <p className="text-[13px] text-gray-500 mb-2">Chọn tối đa <strong>{q.maxChoices}</strong> đáp án. Đã chọn: <strong>{(answers[q.id] || []).length}/{q.maxChoices}</strong></p>
                        )}
                        {q.options.map((opt, i) => {
                            const selected = (answers[q.id] || []).includes(opt);
                            const maxReached = q.maxChoices && (answers[q.id] || []).length >= q.maxChoices && !selected;
                            return (
                                <label key={i} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${selected ? 'border-blue-500 bg-blue-50' : maxReached ? 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed' : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'}`}>
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                                        {selected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
                                    </div>
                                    <input type="checkbox" checked={selected} onChange={() => toggleCheckbox(q.id, opt, q.maxChoices)} disabled={maxReached} className="sr-only" />
                                    <span className={`text-[15px] font-medium ${selected ? 'text-blue-700' : 'text-gray-700'}`}>{opt}</span>
                                </label>
                            );
                        })}
                    </div>
                )}

                {/* Rating */}
                {q.type === 'rating' && (
                    <div className="flex flex-col items-center gap-5 py-4">
                        <div className="flex items-center gap-2 md:gap-4">
                            {[1, 2, 3, 4, 5].map(star => {
                                const filled = (answers[q.id] || 0) >= star;
                                return (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setAnswer(q.id, star)}
                                        className="focus:outline-none group"
                                    >
                                        <Star
                                            size={48}
                                            className={`transition-all ${filled ? 'fill-yellow-400 text-yellow-400 scale-110' : 'text-gray-300 group-hover:text-yellow-300'}`}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                        <div className="flex justify-between w-full max-w-xs text-[13px] text-gray-500">
                            <span>{q.labels[0]}</span>
                            <span>{q.labels[1]}</span>
                        </div>
                        {answers[q.id] && (
                            <div className="text-[15px] font-semibold text-blue-600">
                                Bạn đã chọn: {answers[q.id]} sao
                            </div>
                        )}
                    </div>
                )}

                {/* Textarea */}
                {q.type === 'text' && (
                    <div>
                        <textarea
                            rows={5}
                            maxLength={q.maxLength}
                            placeholder={q.placeholder}
                            value={answers[q.id] || ''}
                            onChange={e => setAnswer(q.id, e.target.value)}
                            className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-[15px] text-gray-700 resize-none transition-colors"
                        />
                        {q.maxLength && (
                            <div className="text-right text-[13px] text-gray-400 mt-1">
                                {(answers[q.id] || '').length} / {q.maxLength} ký tự
                            </div>
                        )}
                    </div>
                )}

                {/* Inline Error */}
                {error && (
                    <div className="mt-3 flex items-center gap-2 text-red-600 text-[14px] bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                        <AlertCircle size={16} className="shrink-0" />
                        {error}
                    </div>
                )}
            </div>
        );
    };

    // -- SUCCESS SCREEN --
    if (submitted) {
        return (
            <div className="bg-[#f4f7fb] min-h-screen font-sans flex items-center justify-center py-20 px-4">
                <div className="bg-white rounded-2xl shadow-lg border border-green-100 max-w-[540px] w-full p-8 md:p-12 text-center">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={48} className="text-green-500" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 mb-3">Gửi thành công!</h2>
                    <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                        Cảm ơn bạn đã tham gia khảo sát!<br/>
                        Phản hồi của bạn đã được ghi nhận và sẽ góp phần cải thiện chất lượng dịch vụ.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to={`/khao-sat/${surveyId}`}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-[15px] shadow-sm"
                        >
                            <BarChart2 size={18} /> Xem kết quả thống kê
                        </Link>
                        <Link
                            to="/chu-de-khao-sat"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors text-[15px]"
                        >
                            <ArrowLeft size={18} /> Quay lại danh sách
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f4f7fb] min-h-screen font-sans pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 pt-6 pb-6">
                <div className="container mx-auto px-4 max-w-[800px]">
                    {/* Breadcrumb */}
                    <div className="flex items-center flex-wrap text-[13px] text-gray-500 mb-4 gap-1">

                        <Link to="/chu-de-khao-sat" className="hover:text-blue-600">Khảo sát</Link>
                        <ChevronRight size={14} className="shrink-0" />
                        <Link to={`/chu-de-khao-sat/${survey.topicId}`} className="hover:text-blue-600 hidden md:inline">{survey.topicTitle}</Link>
                        <ChevronRight size={14} className="shrink-0 hidden md:inline" />
                        <Link to={`/khao-sat/${survey.id}`} className="hover:text-blue-600 hidden md:inline truncate max-w-[160px]">{survey.title}</Link>
                        <ChevronRight size={14} className="shrink-0 hidden md:inline" />
                        <span className="text-gray-800 font-medium">Tham gia</span>
                    </div>

                    <h1 className="text-xl md:text-2xl font-bold text-[#0f4c81] leading-snug">{survey.title}</h1>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 max-w-[800px] py-3">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[13px] font-semibold text-gray-700">Câu {currentIdx + 1} / {total} câu hỏi</span>
                        <span className="text-[13px] font-bold text-blue-600">{progressPercent}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    {/* Step indicators */}
                    <div className="flex justify-between mt-2">
                        {survey.questions.map((_, i) => (
                            <div key={i} className={`flex-1 mx-0.5 h-1 rounded-full transition-colors ${i < currentIdx ? 'bg-blue-500' : i === currentIdx ? 'bg-blue-300' : 'bg-gray-200'}`} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Question Card */}
            <div className="container mx-auto px-4 max-w-[800px] mt-8">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10 min-h-[400px]">
                    {renderQuestion(currentQ)}
                </div>

                {/* Server Error Banner */}
                {submitError && (
                    <div className="mt-4 flex items-center gap-3 text-red-700 bg-red-50 border border-red-200 rounded-xl p-4">
                        <AlertCircle size={20} className="shrink-0" />
                        <span className="font-medium">Gửi kết quả thất bại. Vui lòng thử lại.</span>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={handlePrev}
                        disabled={currentIdx === 0}
                        className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-xl border-2 transition-all text-[15px] ${currentIdx === 0 ? 'opacity-0 pointer-events-none' : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800 bg-white'}`}
                    >
                        <ChevronLeft size={18} /> Trước
                    </button>

                    {currentIdx < total - 1 ? (
                        <button
                            onClick={handleNext}
                            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-colors text-[15px]"
                        >
                            Tiếp theo <ChevronRight size={18} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-sm transition-colors text-[15px]"
                        >
                            <CheckCircle2 size={18} /> Gửi kết quả
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SurveyFormPage;
