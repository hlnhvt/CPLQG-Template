import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    ChevronRight, ArrowLeft, ArrowUp, Calendar, Users, Building2,
    FileText, Download, Paperclip, Send, MessageSquare, Clock,
    CheckCircle2, ExternalLink, Eye, File, FileCode2, Upload, X,
    User, Mail, Phone, TrendingUp, Scale, Heart, Landmark, ChevronUp,
    Video, Mic2
} from 'lucide-react';

// ======================== MOCK DATA ========================
const MOCK_CONSULTATION = {
    id: 1,
    title: 'G├│p ├╜ Dß╗▒ thß║úo Luß║¡t ─Éß║Ñt ─æai (Sß╗¡a ─æß╗òi)',
    summary: 'Bß╗Ö T├ái nguy├¬n v├á M├┤i tr╞░ß╗¥ng lß║Ñy ├╜ kiß║┐n nh├ón d├ón, tß╗ò chß╗⌐c vß╗ü c├íc quy ─æß╗ïnh trong dß╗▒ thß║úo Luß║¡t ─Éß║Ñt ─æai sß╗¡a ─æß╗òi nhß║▒m ho├án thiß╗çn ch├¡nh s├ích quß║ún l├╜, sß╗¡ dß╗Ñng ─æß║Ñt ─æai ph├╣ hß╗úp vß╗¢i thß╗▒c tiß╗àn.',
    agency: 'Bß╗Ö T├ái nguy├¬n v├á M├┤i tr╞░ß╗¥ng',
    agencyShort: 'BTNMT',
    agencyLogo: null,
    status: 'open', // open | upcoming | closed
    startDate: '01/03/2026',
    endDate: '30/04/2026',
    lastUpdated: '01/03/2026',
    views: 3821,
    participants: 3821,
    category: 'Vß║Ñn ─æß╗ü nß╗òi bß║¡t',
    domain: 'Ph├íp luß║¡t d├ón sß╗▒',
    thumb: '/images/thumb1.png',
    sections: [
        {
            id: 'gioi-thieu',
            label: 'A. Giß╗¢i thiß╗çu',
            content: [
                'Bß╗Ö T├ái nguy├¬n v├á M├┤i tr╞░ß╗¥ng tr├ón trß╗ìng mß╗¥i c├íc c╞í quan, tß╗ò chß╗⌐c, c├í nh├ón tham gia ─æ├│ng g├│p ├╜ kiß║┐n v├áo Dß╗▒ thß║úo Luß║¡t ─Éß║Ñt ─æai (sß╗¡a ─æß╗òi).',
                'Luß║¡t ─Éß║Ñt ─æai l├á ─æß║ío luß║¡t quan trß╗ìng, c├│ t├íc ─æß╗Öng s├óu rß╗Öng ─æß║┐n mß╗ìi mß║╖t cß╗ºa ─æß╗¥i sß╗æng kinh tß║┐ - x├ú hß╗Öi, quß╗æc ph├▓ng, an ninh v├á m├┤i tr╞░ß╗¥ng; l├á c╞í sß╗ƒ ph├íp l├╜ quan trß╗ìng ─æß╗â Nh├á n╞░ß╗¢c thß╗▒c hiß╗çn quyß╗ün ─æß║íi diß╗çn chß╗º sß╗ƒ hß╗»u to├án d├ón vß╗ü ─æß║Ñt ─æai.',
            ]
        },
        {
            id: 'boi-canh',
            label: 'B. Bß╗æi cß║únh',
            content: [
                'Luß║¡t ─Éß║Ñt ─æai n─âm 2013 sau h╞ín 10 n─âm thi h├ánh ─æ├ú bß╗Öc lß╗Ö nhiß╗üu hß║ín chß║┐, bß║Ñt cß║¡p cß║ºn ─æ╞░ß╗úc sß╗¡a ─æß╗òi, bß╗ò sung ─æß╗â ph├╣ hß╗úp vß╗¢i y├¬u cß║ºu ph├ít triß╗ân mß╗¢i.',
                'Nghß╗ï quyß║┐t sß╗æ 18-NQ/TW ng├áy 16/6/2022 cß╗ºa Hß╗Öi nghß╗ï lß║ºn thß╗⌐ n─âm Ban Chß║Ñp h├ánh Trung ╞░╞íng ─Éß║úng kh├│a XIII "vß╗ü tiß║┐p tß╗Ñc ─æß╗òi mß╗¢i, ho├án thiß╗çn thß╗â chß║┐, ch├¡nh s├ích, n├óng cao hiß╗çu lß╗▒c, hiß╗çu quß║ú quß║ún l├╜ v├á sß╗¡ dß╗Ñng ─æß║Ñt, tß║ío ─æß╗Öng lß╗▒c ─æ╞░a n╞░ß╗¢c ta trß╗ƒ th├ánh n╞░ß╗¢c ph├ít triß╗ân c├│ thu nhß║¡p cao" ─æß║╖t ra ─æß╗ïnh h╞░ß╗¢ng quan trß╗ìng cho viß╗çc sß╗¡a ─æß╗òi Luß║¡t ─Éß║Ñt ─æai.',
                'Dß╗▒ thß║úo Luß║¡t ─Éß║Ñt ─æai (sß╗¡a ─æß╗òi) ─æ╞░ß╗úc x├óy dß╗▒ng tr├¬n c╞í sß╗ƒ tß╗òng kß║┐t, ─æ├ính gi├í kß║┐t quß║ú thi h├ánh Luß║¡t ─Éß║Ñt ─æai n─âm 2013 v├á qu├ín triß╗çt ─æß║ºy ─æß╗º, to├án diß╗çn Nghß╗ï quyß║┐t sß╗æ 18-NQ/TW.',
            ]
        },
        {
            id: 'cac-kien-nghi',
            label: 'C. C├íc kiß║┐n nghß╗ï ch├¡nh',
            content: [
                'Dß╗▒ thß║úo tß║¡p trung v├áo c├íc nh├│m vß║Ñn ─æß╗ü ch├¡nh sau:',
            ],
            bullets: [
                'Ho├án thiß╗çn c├íc quy ─æß╗ïnh vß╗ü quyß╗ün v├á ngh─⌐a vß╗Ñ cß╗ºa ng╞░ß╗¥i sß╗¡ dß╗Ñng ─æß║Ñt',
                '─Éß╗òi mß╗¢i, ho├án thiß╗çn c╞í chß║┐ ─æß╗ïnh gi├í ─æß║Ñt, ─æß║úm bß║úo nguy├¬n tß║»c thß╗ï tr╞░ß╗¥ng',
                'Ho├án thiß╗çn quy ─æß╗ïnh vß╗ü thu hß╗ôi ─æß║Ñt, bß╗ôi th╞░ß╗¥ng, hß╗ù trß╗ú, t├íi ─æß╗ïnh c╞░',
                '─Éß║⌐y mß║ính ph├ón cß║Ñp, ph├ón quyß╗ün trong quß║ún l├╜ ─æß║Ñt ─æai',
                'Ho├án thiß╗çn quy ─æß╗ïnh vß╗ü t╞░ vß║Ñn, phß║ún biß╗çn, gi├ím s├ít x├ú hß╗Öi trong quß║ún l├╜ ─æß║Ñt ─æai',
            ]
        },
        {
            id: 'phan-hoi',
            label: 'D. Nhß╗»ng vß║Ñn ─æß╗ü cß║ºn phß║ún hß╗ôi',
            content: [
                'Bß╗Ö T├ái nguy├¬n v├á M├┤i tr╞░ß╗¥ng mong muß╗æn nhß║¡n ─æ╞░ß╗úc ├╜ kiß║┐n ─æ├│ng g├│p cß╗ºa Qu├╜ vß╗ï vß╗ü c├íc nß╗Öi dung sau:',
            ],
            bullets: [
                'T├¡nh hß╗úp l├╜ v├á khß║ú thi cß╗ºa c├íc quy ─æß╗ïnh vß╗ü quyß╗ün tiß║┐p cß║¡n ─æß║Ñt ─æai',
                'C╞í chß║┐ giß║úi quyß║┐t tranh chß║Ñp ─æß║Ñt ─æai mß╗¢i',
                'Quy ─æß╗ïnh vß╗ü ─æß║Ñt ß╗ƒ, ─æß║Ñt n├┤ng nghiß╗çp trong v├á ngo├ái khu vß╗▒c ─æ├┤ thß╗ï',
                'Ch├¡nh s├ích t├ái ch├¡nh ─æß║Ñt ─æai v├á ─æß╗ïnh gi├í ─æß║Ñt',
                'C├íc nß╗Öi dung kh├íc trong dß╗▒ thß║úo m├á Qu├╜ vß╗ï quan t├óm',
            ]
        },
    ],
    attachments: [
        { id: 1, name: 'Du_thao_Luat_Dat_dai_sua_doi_2026.pdf', size: '4.2 MB', type: 'PDF' },
        { id: 2, name: 'To_trinh_so_XX_TTg_ve_du_an.docx', size: '1.1 MB', type: 'DOCX' },
        { id: 3, name: 'Bao_cao_danh_gia_tac_dong.pdf', size: '2.8 MB', type: 'PDF' },
        { id: 4, name: 'Phieu_lay_y_kien_cong_dong.xlsx', size: '380 KB', type: 'XLSX' },
    ],
    relatedConsultations: [
        { id: 2, title: 'G├│p ├╜ ch├¡nh s├ích nh├á ß╗ƒ x├ú hß╗Öi cho c├┤ng nh├ón', status: 'open', agency: 'Bß╗Ö X├óy dß╗▒ng', deadline: '15/04/2026' },
        { id: 3, title: 'Quy hoß║ích tß╗òng thß╗â quß╗æc gia 2021ΓÇô2030', status: 'upcoming', agency: 'Bß╗Ö Kß║┐ hoß║ích v├á ─Éß║ºu t╞░', deadline: '01/05/2026' },
        { id: 4, title: 'Lß║Ñy ├╜ kiß║┐n vß╗ü sß╗¡a ─æß╗òi Luß║¡t Nh├á ß╗ƒ', status: 'open', agency: 'Bß╗Ö X├óy dß╗▒ng', deadline: '20/04/2026' },
    ],
    comments: [
        { id: 1, user: 'Nguyß╗àn V─ân A', org: 'C├┤ng ty B─ÉS XYZ', date: '15/03/2026 09:30', content: '─Éß╗ü nghß╗ï l├ám r├╡ quy ─æß╗ïnh vß╗ü thß╗¥i hß║ín sß╗¡ dß╗Ñng ─æß║Ñt ─æß╗æi vß╗¢i ─æß║Ñt ß╗ƒ ─æ├┤ thß╗ï, tr├ính g├óy ra bß║Ñt ß╗òn cho ng╞░ß╗¥i d├ón ─æ├ú mua nh├á gß║»n liß╗ün vß╗¢i quyß╗ün sß╗¡ dß╗Ñng ─æß║Ñt.' },
        { id: 2, user: 'Trß║ºn Thß╗ï B├¼nh', org: 'Hiß╗çp hß╗Öi Bß║Ñt ─æß╗Öng sß║ún', date: '14/03/2026 14:15', content: 'C╞í chß║┐ ─æß╗ïnh gi├í ─æß║Ñt theo gi├í thß╗ï tr╞░ß╗¥ng l├á ─æ├║ng h╞░ß╗¢ng nh╞░ng cß║ºn c├│ h╞░ß╗¢ng dß║½n chi tiß║┐t h╞ín vß╗ü ph╞░╞íng ph├íp x├íc ─æß╗ïnh gi├í thß╗ï tr╞░ß╗¥ng v├á ─æ╞ín vß╗ï t╞░ vß║Ñn ─æß╗ïnh gi├í.' },
        { id: 3, user: 'L├¬ Minh Tuß║Ñn', date: '13/03/2026 11:00', content: 'Cß║ºn bß╗ò sung quy ─æß╗ïnh bß║úo vß╗ç quyß╗ün lß╗úi cß╗ºa ng╞░ß╗¥i n├┤ng d├ón khi thu hß╗ôi ─æß║Ñt n├┤ng nghiß╗çp phß╗Ñc vß╗Ñ ph├ít triß╗ân kinh tß║┐ - x├ú hß╗Öi.' },
    ],
    relatedEvents: [
        { id: 'e1', title: 'Diß╗àn ─æ├án trß╗▒c tuyß║┐n: T├íc ─æß╗Öng cß╗ºa Luß║¡t ─Éß║Ñt ─æai l├¬n thß╗ï tr╞░ß╗¥ng B─ÉS', type: 'forum', date: '10/04/2026', color: 'text-blue-600', bg: 'bg-blue-50', to: '/dien-dan/chu-de/1', thumbnail: '/thumbnails/forum_dat_dai.png' },
        { id: 'e2', title: 'Tß╗ìa ─æ├ám: Gß╗í v╞░ß╗¢ng ph├íp l├╜ trong bß╗ôi th╞░ß╗¥ng t├íi ─æß╗ïnh c╞░', type: 'event', date: '15/04/2026', color: 'text-purple-600', bg: 'bg-purple-50', to: '/dien-dan/su-kien/toa-dam-1', thumbnail: '/thumbnails/toadan_phapluat.png' },
        { id: 'e3', title: 'Livestream: Giß║úi ─æ├íp thß║»c mß║»c vß╗ü bß║úng gi├í ─æß║Ñt mß╗¢i', type: 'stream', date: '20/04/2026', color: 'text-red-600', bg: 'bg-red-50', to: '/dien-dan/su-kien/livestream-1', thumbnail: '/thumbnails/livestream_giabangdat.png' },
    ]
};

const OTHER_PAGES = [
    { id: 10, title: 'G├│p ├╜ ch├¡nh s├ích nh├á ß╗ƒ x├ú hß╗Öi cho c├┤ng nh├ón' },
    { id: 11, title: 'Quy hoß║ích tß╗òng thß╗â quß╗æc gia 2021ΓÇô2030' },
    { id: 12, title: 'Ch├¡nh s├ích ph├ít triß╗ân kinh tß║┐ tuß║ºn ho├án' },
];

// ======================== STATUS BADGE ========================
const StatusBadge = ({ status, large = false }) => {
    const size = large ? 'text-[13px] px-3 py-1.5' : 'text-[12px] px-2.5 py-1';
    if (status === 'open') return (
        <span className={`inline-flex items-center gap-1.5 font-bold ${size} bg-green-50 text-green-700 border border-green-200 rounded-full`}>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
            ─Éang mß╗ƒ
        </span>
    );
    if (status === 'upcoming') return (
        <span className={`inline-flex items-center gap-1.5 font-bold ${size} bg-amber-50 text-amber-700 border border-amber-200 rounded-full`}>
            <span className="w-2 h-2 bg-amber-400 rounded-full shrink-0" />
            Sß║»p mß╗ƒ
        </span>
    );
    return (
        <span className={`inline-flex items-center gap-1.5 font-bold ${size} bg-gray-100 text-gray-500 border border-gray-200 rounded-full`}>
            <span className="w-2 h-2 bg-gray-400 rounded-full shrink-0" />
            ─É├ú kß║┐t th├║c
        </span>
    );
};

// ======================== MAIN PAGE ========================
const HienKeDetailPage = () => {
    const { id } = useParams();
    const data = MOCK_CONSULTATION;

    const [commentText, setCommentText] = useState('');
    const [commentSuccess, setCommentSuccess] = useState(false);
    const [isLoggedIn] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [submittedComments, setSubmittedComments] = useState([]);
    const fileInputRef = useRef(null);

    const allComments = [...submittedComments, ...data.comments];

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        let valid = [];
        for (const f of files) {
            if (attachedFiles.length + valid.length >= 5) break;
            if (f.size > 10 * 1024 * 1024) continue;
            valid.push(f);
        }
        setAttachedFiles(prev => [...prev, ...valid]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = () => {
        if (!commentText.trim()) return;
        setSubmittedComments(prev => [{
            id: Date.now(),
            user: 'Ng╞░ß╗¥i d├╣ng',
            content: commentText,
            date: 'Vß╗½a xong',
        }, ...prev]);
        setCommentText('');
        setAttachedFiles([]);
        setCommentSuccess(true);
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className="min-h-screen bg-white font-sans">

            {/* ΓöÇΓöÇ HERO SECTION ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */}
            <div className="relative pt-8 pb-10 overflow-hidden border-b border-[#1e3a8a]/20">
                {/* Background: trß╗æng ─æß╗ông image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-bg-pan"
                    style={{ backgroundImage: "url('/images/dong_son_cover.png')" }}
                />
                {/* Overlay: dark navy so text is readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#1e3a8a]/80 to-[#1e3a8a]/60 z-0" />
                {/* Subtle gold shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]/50 z-0" />

                <div className="container mx-auto px-4 md:px-8 max-w-[1200px] relative z-20">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-[13px] text-blue-300/80 mb-6 flex-wrap">
                        <Link to="/" className="hover:text-white transition-colors">Trang chß╗º</Link>
                        <ChevronRight size={14} />
                        <Link to="/hien-ke" className="hover:text-white transition-colors">Hiß║┐n kß║┐ x├óy dß╗▒ng v├á thi h├ánh ph├íp luß║¡t</Link>
                        <ChevronRight size={14} />
                        <span className="text-white/90 font-medium line-clamp-1 max-w-[300px]">{data.title}</span>
                    </nav>

                    {/* Hero content */}
                    <div className="max-w-[800px]">
                        <h1 className="text-[28px] md:text-[38px] font-bold text-white leading-tight mb-5">
                            {data.title}
                        </h1>
                        <p className="text-[16px] text-blue-100/90 leading-relaxed mb-7 max-w-[680px]">
                            {data.summary}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <Link to={`/hien-ke/gop-y/${data.id}`} className="inline-flex items-center gap-2 px-6 py-3 bg-[#16a34a] text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-sm text-[15px]">
                                <Send size={16} /> Gß╗¡i ├╜ kiß║┐n cß╗ºa bß║ín
                                <ExternalLink size={14} className="ml-1 opacity-70" />
                            </Link>
                            <Link to="/hien-ke" className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 border border-white/20 transition-all text-[14px]">
                                <ArrowLeft size={15} /> Quay lß║íi danh s├ích
                            </Link>
                        </div>
                        <p className="text-[13px] text-blue-300/80">
                            Cß║¡p nhß║¡t lß║ºn cuß╗æi: {data.lastUpdated}
                        </p>
                    </div>
                </div>
            </div>

            {/* ΓöÇΓöÇ TWO-COLUMN BODY ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ */}
            <div className="bg-[#f8f9fa] py-10">
                <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* ΓöÇΓöÇ LEFT: MAIN CONTENT (70%) ΓöÇΓöÇ */}
                        <div className="flex-1 min-w-0">

                            {/* Agency + Metadata card */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6 flex flex-col sm:flex-row gap-6 items-start">
                                {/* Agency logo placeholder */}
                                <div className="w-20 h-20 shrink-0 rounded-xl bg-[#1e3a8a] flex items-center justify-center shadow-sm">
                                    <span className="text-white font-black text-[16px] leading-tight text-center px-1">
                                        {data.agencyShort}
                                    </span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h2 className="text-[17px] font-bold text-gray-900 mb-3">{data.agency}</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
                                        <div className="flex items-start gap-2">
                                            <Calendar size={14} className="text-gray-400 mt-0.5 shrink-0" />
                                            <div>
                                                <span className="font-semibold text-gray-600">Thß╗¥i gian tham vß║Ñn: </span>
                                                <span className="text-gray-800">{data.startDate} ΓÇô {data.endDate}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 size={14} className="text-gray-400 shrink-0" />
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-600">Trß║íng th├íi: </span>
                                                <StatusBadge status={data.status} />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users size={14} className="text-gray-400 shrink-0" />
                                            <span className="text-gray-700">
                                                <span className="font-semibold text-gray-600">L╞░ß╗út tham gia: </span>
                                                {data.participants.toLocaleString('vi-VN')}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Eye size={14} className="text-gray-400 shrink-0" />
                                            <span className="text-gray-700">
                                                <span className="font-semibold text-gray-600">L╞░ß╗út xem: </span>
                                                {data.views.toLocaleString('vi-VN')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Structured content */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 mb-6">
                                <h2 className="text-[20px] font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                                    M├┤ tß║ú chi tiß║┐t
                                </h2>

                                <div className="space-y-8">
                                    {data.sections.map((sec, idx) => (
                                        <div key={sec.id} id={sec.id}>
                                            <h3 className="text-[17px] font-bold text-gray-900 mb-3">{sec.label}</h3>
                                            <div className="space-y-3">
                                                {sec.content.map((para, i) => (
                                                    <p key={i} className="text-[14px] text-gray-700 leading-relaxed">
                                                        {idx > 0 && sec.content.length > 1 ? (
                                                            <><span className="font-medium text-gray-500">{idx + 1}.</span> {para}</>
                                                        ) : para}
                                                    </p>
                                                ))}
                                                {sec.bullets && (
                                                    <ul className="space-y-2 mt-2 ml-4">
                                                        {sec.bullets.map((b, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-[14px] text-gray-700">
                                                                <span className="mt-1.5 w-1.5 h-1.5 bg-[#1e3a8a] rounded-full shrink-0" />
                                                                {b}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Related events & forums */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                                <h2 className="text-[18px] font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                                    <MessageSquare size={18} className="text-[#1e3a8a]" />
                                    Sß╗▒ kiß╗çn li├¬n quan
                                    <span className="ml-1 text-[13px] font-normal text-gray-400">({data.relatedEvents.length})</span>
                                </h2>
                                <div className="flex flex-col gap-3">
                                    {data.relatedEvents.map(ev => {
                                        const typeLabel = ev.type === 'stream' ? 'Livestream' : ev.type === 'event' ? 'Tß╗ìa ─æ├ám' : 'Diß╗àn ─æ├án';
                                        const typeBg = ev.type === 'stream' ? 'bg-red-100 text-red-700' : ev.type === 'event' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700';
                                        return (
                                            <Link key={ev.id} to={ev.to} className="group flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-[#1e3a8a] hover:bg-blue-50/20 transition-all">
                                                {/* Thumbnail */}
                                                <div className="shrink-0 w-28 h-20 rounded-lg overflow-hidden bg-gray-100 relative">
                                                    <img
                                                        src={ev.thumbnail}
                                                        alt={ev.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <span className={`absolute top-1.5 left-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${typeBg}`}>
                                                        {typeLabel}
                                                    </span>
                                                </div>
                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[14px] font-semibold text-gray-800 group-hover:text-[#1e3a8a] leading-snug line-clamp-2 mb-2 transition-colors">
                                                        {ev.title}
                                                    </p>
                                                    <p className="text-[12px] text-gray-500 flex items-center gap-1.5 font-medium">
                                                        <Calendar size={12} className="shrink-0" /> {ev.date}
                                                    </p>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-300 group-hover:text-[#1e3a8a] shrink-0 transition-colors" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Attachments */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                                <h2 className="text-[18px] font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                                    <Paperclip size={18} className="text-[#1e3a8a]" />
                                    T├ái liß╗çu ─æ├¡nh k├¿m
                                    <span className="ml-1 text-[13px] font-normal text-gray-400">({data.attachments.length} tß╗çp)</span>
                                </h2>
                                <div className="space-y-3">
                                    {data.attachments.map(att => (
                                        <div key={att.id} className="flex items-center justify-between gap-4 p-3.5 border border-gray-200 rounded-lg hover:border-[#1e3a8a] hover:bg-blue-50/30 transition-all group">
                                            <div className="flex items-center gap-3 min-w-0">
                                                {att.type === 'PDF' ? (
                                                    <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center shrink-0 border border-red-100">
                                                        <File size={16} className="text-red-600" />
                                                    </div>
                                                ) : att.type === 'DOCX' ? (
                                                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 border border-blue-100">
                                                        <FileCode2 size={16} className="text-blue-600" />
                                                    </div>
                                                ) : (
                                                    <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center shrink-0 border border-green-100">
                                                        <FileText size={16} className="text-green-600" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="text-[13px] font-semibold text-gray-800 truncate group-hover:text-[#1e3a8a] transition-colors">{att.name}</p>
                                                    <p className="text-[11px] text-gray-400 mt-0.5">{att.type} ┬╖ {att.size}</p>
                                                </div>
                                            </div>
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-[#1e3a8a] border border-[#1e3a8a] rounded-lg hover:bg-[#1e3a8a] hover:text-white transition-all shrink-0">
                                                <Download size={13} /> Tß║úi xuß╗æng
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Comment / Feedback section */}

                        </div>

                        {/* ΓöÇΓöÇ RIGHT: SIDEBAR (30%) ΓöÇΓöÇ */}
                        <div className="lg:w-[300px] shrink-0 space-y-5">

                            {/* Back to listing */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <Link to="/hien-ke" className="flex items-center gap-2 text-[#1e3a8a] font-bold text-[14px] hover:underline mb-1">
                                    <ArrowLeft size={14} /> Quay lß║íi danh s├ích
                                </Link>
                                <p className="text-[12px] text-gray-500 ml-6">Hiß║┐n kß║┐ x├óy dß╗▒ng v├á thi h├ánh ph├íp luß║¡t</p>
                            </div>

                            {/* Table of contents */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-3">Nß╗Öi dung trang</h3>
                                <nav className="space-y-1">
                                    {data.sections.map(sec => (
                                        <a
                                            key={sec.id}
                                            href={`#${sec.id}`}
                                            className="block text-[13px] text-[#1e3a8a] hover:underline py-1 border-l-2 border-transparent hover:border-[#1e3a8a] pl-3 transition-all"
                                        >
                                            {sec.label}
                                        </a>
                                    ))}
                                    <a href="#gop-y" className="block text-[13px] text-[#1e3a8a] hover:underline py-1 border-l-2 border-transparent hover:border-[#1e3a8a] pl-3 transition-all">
                                        ├¥ kiß║┐n ─æ├│ng g├│p
                                    </a>
                                </nav>
                            </div>

                            {/* Quick metadata */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-4">Th├┤ng tin th├¬m</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-[11px] text-gray-400 font-semibold uppercase mb-1">Trß║íng th├íi</p>
                                        <StatusBadge status={data.status} large />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-gray-400 font-semibold uppercase mb-1">Thß╗¥i gian</p>
                                        <p className="text-[13px] font-semibold text-gray-800">{data.startDate} ΓÇô {data.endDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-gray-400 font-semibold uppercase mb-1">C╞í quan chß╗º tr├¼</p>
                                        <p className="text-[13px] font-semibold text-gray-800">{data.agency}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-gray-400 font-semibold uppercase mb-1">L─⌐nh vß╗▒c</p>
                                        <span className="inline-block text-[12px] font-semibold text-[#1e3a8a] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                                            {data.domain}
                                        </span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="mt-5 pt-4 border-t border-gray-100">
                                    <Link to={`/hien-ke/gop-y/${data.id}`} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#16a34a] text-white font-bold rounded-lg hover:bg-green-700 transition-all text-[14px]">
                                        <Send size={15} /> Gß╗¡i ├╜ kiß║┐n
                                    </Link>
                                </div>
                            </div>

                            {/* Related consultations */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-4">Nß╗Öi dung li├¬n quan</h3>
                                <div className="space-y-3">
                                    {data.relatedConsultations.map(r => (
                                        <Link
                                            key={r.id}
                                            to={`/hien-ke/${r.id}`}
                                            className="block group"
                                        >
                                            <div className="border border-gray-100 rounded-lg p-3 hover:border-[#1e3a8a] hover:bg-blue-50/30 transition-all">
                                                <p className="text-[13px] font-semibold text-[#1e3a8a] group-hover:underline leading-snug mb-2 line-clamp-2">
                                                    {r.title}
                                                </p>
                                                <div className="flex items-center justify-between gap-2">
                                                    <StatusBadge status={r.status} />
                                                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                                                        <Calendar size={10} /> {r.deadline}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link to="/hien-ke" className="mt-4 block text-center text-[13px] font-semibold text-[#1e3a8a] hover:underline">
                                    Xem tß║Ñt cß║ú cuß╗Öc tham vß║Ñn ΓåÆ
                                </Link>
                            </div>


                            {/* Other pages in category */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                                <h3 className="text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-1">C├íc trang kh├íc</h3>
                                <p className="text-[12px] text-gray-400 mb-3">trong {data.category}</p>
                                <div className="space-y-2">
                                    {OTHER_PAGES.map(p => (
                                        <Link
                                            key={p.id}
                                            to={`/hien-ke/${p.id}`}
                                            className="block text-[13px] text-[#1e3a8a] hover:underline py-1.5 border-b border-gray-50 last:border-0 line-clamp-2 leading-snug"
                                        >
                                            {p.title}
                                        </Link>
                                    ))}
                                </div>
                                <Link to="/hien-ke" className="mt-3 block text-[13px] font-semibold text-[#1e3a8a] hover:underline">
                                    Xem tß║Ñt cß║ú trang ΓåÆ
                                </Link>
                            </div>

                            {/* Back to top */}
                            <button
                                onClick={scrollToTop}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-600 hover:text-[#1e3a8a] hover:border-[#1e3a8a] transition-all shadow-sm"
                            >
                                <ArrowUp size={14} /> Vß╗ü ─æß║ºu trang
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HienKeDetailPage;
