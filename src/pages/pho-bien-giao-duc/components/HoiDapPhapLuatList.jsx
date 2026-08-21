import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, ChevronRight, X, HelpCircle, Calendar, User, Tag, ChevronDown, ChevronUp, Send, PlusCircle, CheckCircle, Upload, ShieldCheck } from 'lucide-react';

export default function HoiDapPhapLuatList({ title = 'Hỏi đáp pháp luật' }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedField, setSelectedField] = useState('Tất cả lĩnh vực');
    const [sortBy, setSortBy] = useState('Mới nhất');
    const [expandedId, setExpandedId] = useState(1); // Default open item 1
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        emailOrPhone: '',
        title: '',
        field: '',
        question: ''
    });

    const [questionsData, setQuestionsData] = useState([
        {
            id: 1,
            title: 'Giải quyết tranh chấp giữa người lao động, tập thể lao động với người sử dụng lao động theo quy định của Bộ luật Lao động năm 2012',
            field: 'Lao động',
            author: 'Nguyễn Cẩm Thanh',
            date: '20/10/2021 09:23',
            question: 'Do những bất đồng giữa các thành viên trong công ty, trụ sở công ty ba tôi bị niêm phong khiến cho nhiều người lao động không nhận được sổ bảo hiểm đúng thời hạn. Sự việc này khiến 19 người lao động như ba tôi ở tuổi nghỉ hưu mà không được thanh toán các khoản bảo hiểm theo luật định. Hiện nay, pháp luật có những cơ chế gì bảo vệ quyền lợi cho những người như ba tôi hay không?',
            answer: `Theo quy định tại Chương XIV Bộ luật Lao động năm 2012, khi xảy ra các tranh chấp lao động giữa cá nhân người lao động hoặc tập thể người lao động với người sử dụng lao động thì trước hết các bên phải thương lượng trực tiếp, tự dàn xếp để giải quyết tranh chấp. Nếu tiến hành thương lượng, hòa giải không thành thì một trong hai bên có quyền khởi kiện tới các cá nhân, cơ quan nhà nước có thẩm quyền. Tranh chấp lao động bao gồm tranh chấp lao động cá nhân và tranh chấp lao động tập thể giữa tập thể người lao động cùng làm việc trong doanh nghiệp hoặc một bộ phận của doanh nghiệp với người sử dụng lao động.

Theo như bạn trình bày, bạn không cung cấp thông tin là bố của bạn hay cả 19 người lao động như bố của bạn muốn yêu cầu bảo vệ quyền lợi lao động của mình nên chúng tôi giả sử nếu bố của bạn muốn bảo vệ quyền lợi hợp pháp của mình trong quan hệ lao động thì thuộc vào trường hợp yêu cầu giải quyết các tranh chấp lao động cá nhân.

Bộ luật Lao động 2012 tại Điều 200 về cơ quan, cá nhân có thẩm quyền giải quyết tranh chấp lao động cá nhân đã bỏ quy định liên quan đến thẩm quyền của hội đồng hòa giải cơ sở, chỉ giữ lại thẩm quyền giải quyết tranh chấp lao động cá nhân của Hòa giải viên lao động, theo đó:

“Điều 200. Cơ quan, cá nhân có thẩm quyền giải quyết tranh chấp lao động cá nhân

1. Hoà giải viên lao động.

2. Toà án nhân dân.”

Trình tự, thủ tục hòa giải tranh chấp lao động của hòa giải viên lao động được quy định tại Điều 201 Bộ luật Lao động 2012. Căn cứ vào các quy định của Bộ luật Lao động năm 2012 thì việc giải quyết tranh chấp lao động cá nhân phải tiến hành qua hai bước sau:

Bước 1:

Khi có tranh chấp lao động cá nhân, tranh chấp sẽ được đưa ra hòa giải viên lao động để tiến hành hòa giải. Hòa giải viên lao động hướng dẫn các bên tranh chấp dàn xếp, thương lượng nhằm đảm bảo lợi ích giữa các bên tranh chấp, ổn định sản xuất, kinh doanh.

- Hòa giải viên lao động tiến hành hòa giải chậm nhất năm ngày, kể từ ngày nhận được đơn yêu cầu hòa giải. Tại phiên họp hòa giải phải có mặt hai bên tranh chấp hoặc đại diện được ủy quyền của họ.
- Hòa giải viên lao động có trách nhiệm hướng dẫn các bên thương lượng. Trường hợp hai bên thỏa thuận được, hòa giải viên lao động lập biên bản hòa giải thành.
- Trường hợp hai bên không thỏa thuận được, hòa giải viên lao động đưa ra phương án hòa giải để hai bên xem xét. Trường hợp hai bên chấp nhận phương án hòa giải thì hòa giải viên lao động lập biên bản hòa giải thành.
- Trường hợp hai bên không chấp nhận phương án hòa giải hoặc một bên tranh chấp đã được triệu tập hợp lệ đến lần thứ hai mà vẫn vắng mặt không có lý do chính đáng thì hòa giải viên lao động lập biên bản hòa giải không thành.

Bước 2:

Trường hợp hòa giải không thành hoặc một trong hai bên không thực hiện các thỏa thuận trong biên bản hòa giải thành hoặc hết thời hạn năm ngày làm việc mà hòa giải viên lao động không tiến hành hòa giải thì mỗi bên tranh chấp có quyền yêu cầu Tòa án nhân dân giải quyết.`
        },
        {
            id: 2,
            title: 'Quy định của pháp luật lao động về thời giờ làm việc và thời giờ làm thêm của người lao động trong các doanh nghiệp',
            field: 'Lao động',
            author: 'NGUYỄN THỊ THANH HUYỀN',
            date: '20/10/2021 09:23',
            question: 'Tôi đang làm việc tại một doanh nghiệp tư nhân. Công ty thường xuyên yêu cầu người lao động làm thêm giờ vào ban đêm nhưng không thanh toán đầy đủ chế độ tiền lương làm thêm giờ. Xin hỏi pháp luật quy định cụ thể như thế nào về thời giờ làm việc bình thường, thời giờ làm thêm và mức lương làm thêm giờ?',
            answer: `Căn cứ theo quy định của Bộ luật Lao động:

1. Thời giờ làm việc bình thường:
- Thời giờ làm việc bình thường không quá 08 giờ trong 01 ngày và không quá 48 giờ trong 01 tuần.
- Người sử dụng lao động có quyền quy định thời giờ làm việc theo ngày hoặc theo tuần nhưng phải thông báo cho người lao động biết; trường hợp theo tuần thì thời giờ làm việc bình thường không quá 10 giờ trong 01 ngày và không quá 48 giờ trong 01 tuần.
- Nhà nước khuyến khích người sử dụng lao động thực hiện tuần làm việc 40 giờ đối với người lao động.

2. Thời giờ làm thêm:
Người sử dụng lao động được sử dụng người lao động làm thêm giờ khi đáp ứng đầy đủ các điều kiện sau:
- Phải được sự đồng ý của người lao động;
- Bảo đảm số giờ làm thêm của người lao động không quá 50% số giờ làm việc bình thường trong 01 ngày; trường hợp áp dụng quy định thời giờ làm việc bình thường theo tuần thì tổng số giờ làm việc bình thường và số giờ làm thêm không quá 12 giờ trong 01 ngày; không quá 40 giờ trong 01 tháng;
- Bảo đảm số giờ làm thêm của người lao động không quá 200 giờ trong 01 năm, trừ một số trường hợp đặc biệt không quá 300 giờ trong 01 năm theo quy định của Chính phủ.

3. Tiền lương làm thêm giờ:
Người lao động làm thêm giờ được trả lương tính theo đơn giá tiền lương hoặc tiền lương thực trả theo công việc đang làm như sau:
- Vào ngày thường, ít nhất bằng 150%;
- Vào ngày nghỉ hằng tuần, ít nhất bằng 200%;
- Vào ngày nghỉ lễ, tết, ngày nghỉ có hưởng lương, ít nhất bằng 300% chưa kể tiền lương ngày lễ, tết, ngày nghỉ có hưởng lương đối với người lao động hưởng lương ngày.`
        },
        {
            id: 3,
            title: 'Các chế độ của người lao động được hưởng khi đơn phương chấm dứt hợp đồng lao động không xác định thời hạn theo Bộ luật Lao động năm 2012',
            field: 'Lao động',
            author: 'Nguen Kim Phung',
            date: '20/10/2021 09:23',
            question: 'Tôi ký hợp đồng lao động không xác định thời hạn với công ty. Nay do chuyển nơi cư trú nên tôi muốn xin nghỉ việc. Xin hỏi tôi cần báo trước bao nhiêu ngày và sẽ được hưởng những quyền lợi, chế độ gì khi chấm dứt hợp đồng lao động?',
            answer: `Theo quy định của pháp luật lao động hiện hành:

1. Về nghĩa vụ báo trước:
Người lao động làm việc theo hợp đồng lao động không xác định thời hạn có quyền đơn phương chấm dứt hợp đồng lao động nhưng phải báo trước cho người sử dụng lao động biết trước ít nhất 45 ngày (trừ một số trường hợp luật định không cần báo trước).

2. Các quyền lợi và chế độ được hưởng:
- Tiền lương: Được thanh toán đầy đủ các khoản tiền lương cho những ngày đã làm việc chưa được thanh toán trong thời hạn 14 ngày làm việc kể từ ngày chấm dứt hợp đồng lao động.
- Tiền phép năm chưa nghỉ: Trường hợp do thôi việc mà chưa nghỉ hằng năm hoặc chưa nghỉ hết số ngày nghỉ hằng năm thì được người sử dụng lao động thanh toán tiền lương cho những ngày chưa nghỉ.
- Trợ cấp thôi việc: Người sử dụng lao động có trách nhiệm chi trả trợ cấp thôi việc cho người lao động đã làm việc thường xuyên từ đủ 12 tháng trở lên, mỗi năm làm việc được trợ cấp một nửa tháng tiền lương (đối với thời gian làm việc chưa tham gia bảo hiểm thất nghiệp).
- Chốt và trả sổ BHXH: Người sử dụng lao động có trách nhiệm hoàn thành thủ tục xác nhận thời gian đóng bảo hiểm xã hội, bảo hiểm thất nghiệp và trả lại cùng với bản chính giấy tờ khác đã giữ của người lao động.
- Bảo hiểm thất nghiệp: Người lao động nộp hồ sơ hưởng trợ cấp thất nghiệp tại Trung tâm Dịch vụ việc làm trong thời hạn 03 tháng kể từ ngày chấm dứt HĐLĐ nếu đủ điều kiện theo Luật Việc làm.`
        },
        {
            id: 4,
            title: 'Quy định bồi thường giải phóng mặt bằng khi thu hồi đất ở phục vụ công trình giao thông công cộng',
            field: 'Đất đai',
            author: 'Trần Văn Minh',
            date: '18/10/2021 14:15',
            question: 'Gia đình tôi có mảnh đất ở nông thôn diện tích 250m2 có sổ đỏ, nay nhà nước thu hồi 100m2 để mở rộng đường quốc lộ. Xin hỏi gia đình tôi sẽ được bồi thường về đất và tài sản gắn liền trên đất như thế nào theo Luật Đất đai?',
            answer: `Căn cứ Luật Đất đai và các nghị định hướng dẫn thi hành:

1. Bồi thường về đất:
- Người sử dụng đất khi Nhà nước thu hồi đất nếu có Giấy chứng nhận quyền sử dụng đất hoặc đủ điều kiện được cấp Giấy chứng nhận thì được bồi thường bằng đất có cùng mục đích sử dụng với loại đất thu hồi; nếu không có đất để bồi thường thì được bồi thường bằng tiền theo giá đất cụ thể của loại đất thu hồi do Ủy ban nhân dân cấp tỉnh quyết định tại thời điểm phê duyệt phương án bồi thường.

2. Bồi thường về nhà ở, công trình xây dựng gắn liền với đất:
- Đối với nhà ở, công trình phục vụ sinh hoạt gắn liền với đất của hộ gia đình, cá nhân khi Nhà nước thu hồi đất mà phải tháo dỡ toàn bộ hoặc một phần thì được bồi thường bằng giá trị xây dựng mới của nhà ở, công trình có tiêu chuẩn kỹ thuật tương đương theo quy định của Bộ Xây dựng.

3. Các khoản hỗ trợ khi thu hồi đất:
- Hỗ trợ ổn định đời sống và sản xuất;
- Hỗ trợ đào tạo, chuyển đổi nghề và tìm kiếm việc làm;
- Hỗ trợ tái định cư đối với trường hợp thu hồi đất ở của hộ gia đình, cá nhân mà phải di chuyển chỗ ở.`
        },
        {
            id: 5,
            title: 'Thủ tục đăng ký thành lập doanh nghiệp tư nhân và hồ sơ cần chuẩn bị',
            field: 'Doanh nghiệp',
            author: 'Lê Hoàng Long',
            date: '15/10/2021 10:40',
            question: 'Tôi dự định mở một xưởng sản xuất cơ khí và muốn đăng ký thành lập doanh nghiệp tư nhân. Xin hỏi tôi cần chuẩn bị những giấy tờ gì và nộp hồ sơ tại cơ quan nào?',
            answer: `Căn cứ Luật Doanh nghiệp và Nghị định về đăng ký doanh nghiệp:

1. Hồ sơ đăng ký thành lập doanh nghiệp tư nhân bao gồm:
- Giấy đề nghị đăng ký doanh nghiệp tư nhân (theo mẫu ban hành kèm theo Thông tư của Bộ Kế hoạch và Đầu tư).
- Bản sao hợp lệ một trong các giấy tờ chứng thực cá nhân của chủ doanh nghiệp tư nhân: Thẻ Căn cước công dân/Chứng minh nhân dân hoặc Hộ chiếu còn hiệu lực.
- Giấy ủy quyền cho người thực hiện thủ tục nộp hồ sơ (nếu không phải là chủ doanh nghiệp trực tiếp nộp).

2. Nơi nộp hồ sơ và thời hạn giải quyết:
- Người thành lập doanh nghiệp nộp hồ sơ tại Phòng Đăng ký kinh doanh thuộc Sở Kế hoạch và Đầu tư nơi doanh nghiệp đặt trụ sở chính, hoặc thực hiện đăng ký trực tuyến qua Cổng thông tin quốc gia về đăng ký doanh nghiệp.
- Trong thời hạn 03 ngày làm việc kể từ ngày nhận đủ hồ sơ hợp lệ, Phòng Đăng ký kinh doanh sẽ cấp Giấy chứng nhận đăng ký doanh nghiệp.`
        },
        {
            id: 6,
            title: 'Quyền thừa kế tài sản của con nuôi khi bố mẹ nuôi qua đời không để lại di chúc',
            field: 'Dân sự',
            author: 'Phạm Thị Mỹ Linh',
            date: '12/10/2021 16:05',
            question: 'Tôi là con nuôi hợp pháp có đăng ký tại UBND xã từ nhỏ. Bố mẹ nuôi tôi vừa qua đời đột ngột không để lại di chúc. Xin hỏi tôi có quyền được hưởng thừa kế di sản của bố mẹ nuôi như con đẻ hay không?',
            answer: `Theo quy định của Bộ luật Dân sự về thừa kế theo pháp luật:

1. Quyền thừa kế của con nuôi:
- Điều 652 Bộ luật Dân sự quy định: Con nuôi và cha nuôi, mẹ nuôi được thừa kế di sản của nhau và còn được thừa kế di sản theo quy định tại Điều 651 và Điều 653 của Bộ luật này.
- Theo điểm a khoản 1 Điều 651 Bộ luật Dân sự, hàng thừa kế thứ nhất gồm: Vợ, chồng, cha đẻ, mẹ đẻ, cha nuôi, mẹ nuôi, con đẻ, con nuôi của người chết.

2. Phân chia di sản:
- Những người thừa kế cùng hàng được hưởng phần di sản bằng nhau.
- Do đó, nếu việc nhận nuôi con nuôi được thực hiện hợp pháp theo Luật Nuôi con nuôi và đã đăng ký tại cơ quan nhà nước có thẩm quyền, bạn thuộc hàng thừa kế thứ nhất và được hưởng phần di sản thừa kế bình đẳng như con đẻ của bố mẹ nuôi.`
        }
    ]);

    const fieldsList = ['Tất cả lĩnh vực', 'Lao động', 'Đất đai', 'Doanh nghiệp', 'Dân sự', 'Hình sự', 'Hành chính', 'Bảo hiểm xã hội'];

    // Filter and Sort Logic
    const filteredQuestions = questionsData.filter(item => {
        const matchSearch = searchTerm.trim() === '' ||
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.author.toLowerCase().includes(searchTerm.toLowerCase());

        const matchField = selectedField === 'Tất cả lĩnh vực' || item.field === selectedField;

        return matchSearch && matchField;
    }).sort((a, b) => {
        if (sortBy === 'Mới nhất') return b.id - a.id;
        if (sortBy === 'Cũ nhất') return a.id - b.id;
        return 0;
    });

    const handleToggleExpand = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    const handleReset = () => {
        setSearchTerm('');
        setSelectedField('Tất cả lĩnh vực');
        setSortBy('Mới nhất');
    };

    const handleSubmitQuestion = (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setTimeout(() => {
            const newQ = {
                id: Date.now(),
                title: formData.title,
                field: formData.field || 'Lao động',
                author: formData.fullName || 'Người dùng',
                date: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString('vi-VN'),
                question: formData.question,
                answer: 'Câu hỏi của bạn đã được tiếp nhận và đang được gửi tới các chuyên gia pháp luật để xử lý. Câu trả lời chính thức sẽ được cập nhật sớm nhất.'
            };

            setQuestionsData(prev => [newQ, ...prev]);
            setIsSubmitting(false);
            setSubmitSuccess(true);
            setTimeout(() => {
                setSubmitSuccess(false);
                setIsModalOpen(false);
                setFormData({ fullName: '', emailOrPhone: '', title: '', field: '', question: '' });
                setExpandedId(newQ.id); // auto expand newly submitted question
            }, 1200);
        }, 800);
    };

    return (
        <div className="flex flex-col gap-6 font-sans">
            {/* 1. Header / Breadcrumbs */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 font-medium">
                        <span className="text-blue-600 cursor-pointer hover:underline">Trang chủ</span>
                        <ChevronRight size={14} />
                        <span>PBGDPL - {title}</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-[#1b2b49] tracking-tight">{title}</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Cơ sở dữ liệu giải đáp thắc mắc pháp luật phổ biến dành cho công dân và tổ chức.
                    </p>
                </div>

                {/* Button Gửi câu hỏi */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="shrink-0 bg-[#2580f0] hover:bg-[#1a66c2] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                    <PlusCircle size={18} />
                    Gửi câu hỏi
                </button>
            </div>

            {/* 2. Filter Box */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-end gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tìm kiếm câu hỏi</label>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Nhập tiêu đề, nội dung câu hỏi hoặc người gửi..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-48">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Lĩnh vực</label>
                    <select
                        value={selectedField}
                        onChange={(e) => setSelectedField(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white cursor-pointer text-gray-700"
                    >
                        {fieldsList.map((f, idx) => (
                            <option key={idx} value={f}>{f}</option>
                        ))}
                    </select>
                </div>

                <div className="w-full lg:w-44">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sắp xếp</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white cursor-pointer text-gray-700"
                    >
                        <option>Mới nhất</option>
                        <option>Cũ nhất</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => { }}
                        className="bg-[#2580f0] hover:bg-[#1a66c2] text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors shadow-sm"
                    >
                        Áp dụng
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 font-semibold px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-1.5"
                    >
                        <X size={14} /> Đặt lại
                    </button>
                </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between">
                <p className="text-gray-600 text-sm font-medium">
                    Tìm thấy <strong className="text-black text-base">{filteredQuestions.length}</strong> câu hỏi {title.toLowerCase()}
                </p>
            </div>

            {/* 3. Question List Items */}
            <div className="flex flex-col gap-4">
                {filteredQuestions.length === 0 ? (
                    <div className="bg-white rounded-xl p-10 text-center border border-gray-100 text-gray-500">
                        <HelpCircle size={40} className="mx-auto text-gray-300 mb-3" />
                        <p className="font-semibold text-gray-700">Không tìm thấy câu hỏi nào phù hợp</p>
                        <p className="text-sm text-gray-500 mt-1">Vui lòng thử lại với từ khóa hoặc bộ lọc khác.</p>
                    </div>
                ) : (
                    filteredQuestions.map((item) => {
                        const isExpanded = expandedId === item.id;

                        if (isExpanded) {
                            // Expanded view styled EXACTLY as in the provided screenshot (without lượt xem, hữu ích, chia sẻ, in)
                            return (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-lg border border-[#c3d5f3] shadow-md overflow-hidden transition-all duration-300"
                                >
                                    {/* Blue Header Banner */}
                                    <div
                                        onClick={() => handleToggleExpand(item.id)}
                                        className="bg-[#0a4694] text-white px-5 py-3.5 cursor-pointer select-none hover:bg-[#093c80] transition-colors"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h2 className="text-[16px] md:text-[17px] font-bold text-white leading-snug tracking-tight mb-2">
                                                    Tiêu đề: {item.title}
                                                </h2>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-blue-100 font-medium">
                                                    <span>Lĩnh vực: <span className="font-normal">{item.field}</span></span>
                                                    <span>• Người gửi: <span className="font-normal">{item.author}</span></span>
                                                    <span>• Thời gian: <span className="font-normal">{item.date}</span></span>
                                                </div>
                                            </div>
                                            <button
                                                className="shrink-0 p-1 text-white/80 hover:text-white rounded transition-colors mt-0.5"
                                                title="Thu gọn"
                                            >
                                                <ChevronUp size={20} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Question & Answer Body */}
                                    <div className="p-5 md:p-6 bg-white space-y-6">
                                        {/* CÂU HỎI */}
                                        <div>
                                            <h3 className="text-[13px] font-bold text-[#374151] uppercase tracking-wider mb-2">
                                                CÂU HỎI
                                            </h3>
                                            <div className="rounded-lg border border-[#f59e0b] bg-[#fffdfa] p-4 text-[14px] leading-relaxed text-[#1f2937] shadow-sm">
                                                {item.question}
                                            </div>
                                        </div>

                                        {/* TRẢ LỜI */}
                                        <div>
                                            <h3 className="text-[13px] font-bold text-[#374151] uppercase tracking-wider mb-2">
                                                TRẢ LỜI
                                            </h3>
                                            <div className="rounded-lg border border-[#10b981] bg-[#f9fefc] p-5 text-[14px] leading-relaxed text-[#1f2937] shadow-sm">
                                                <div className="space-y-4 whitespace-pre-line text-justify">
                                                    {item.answer}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions footer - only collapse button */}
                                        <div className="pt-2 border-t border-gray-100 flex items-center justify-end text-xs text-gray-500">
                                            <button
                                                onClick={() => handleToggleExpand(item.id)}
                                                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 py-1 px-2 rounded hover:bg-blue-50 transition-colors"
                                            >
                                                Thu gọn câu hỏi <ChevronUp size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        // Collapsed Item Card with WHITE BACKGROUND as requested
                        return (
                            <div
                                key={item.id}
                                onClick={() => handleToggleExpand(item.id)}
                                className="group bg-white border border-gray-200 rounded-xl p-4 md:p-5 hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#0f2b5c] text-[15px] md:text-[16px] leading-snug group-hover:text-blue-600 transition-colors mb-2">
                                            Tiêu đề: {item.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-gray-600">
                                            <span>Lĩnh vực: <span className="font-medium text-gray-800">{item.field}</span></span>
                                            <span>• Người gửi: <span className="font-medium text-gray-800">{item.author}</span></span>
                                            <span>• Thời gian: <span className="font-medium text-gray-800">{item.date}</span></span>
                                        </div>
                                    </div>
                                    <div className="p-1 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0">
                                        <ChevronDown size={18} />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* 4. Pagination (Matching ThongBaoList) */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm mt-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <span>Số bản ghi:</span>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="border border-gray-300 rounded px-2 py-1 outline-none focus:border-blue-500 bg-white"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                <div className="flex gap-1">
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className={`w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 transition-colors ${currentPage === 1 ? 'cursor-not-allowed opacity-60' : 'hover:bg-slate-50 text-gray-600'}`}
                    >
                        <span className="text-[10px]">«</span>
                    </button>
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 transition-colors ${currentPage === 1 ? 'cursor-not-allowed opacity-60' : 'hover:bg-slate-50 text-gray-600'}`}
                    >
                        <span className="text-[10px]">‹</span>
                    </button>

                    <button className={`w-8 h-8 flex items-center justify-center rounded font-semibold ${currentPage === 1 ? 'bg-blue-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-slate-50'}`}>1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors font-medium">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors font-medium">3</button>
                    <span className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>

                    <button
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors"
                    >
                        <span className="text-[10px]">›</span>
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-slate-50 transition-colors"
                    >
                        <span className="text-[10px]">»</span>
                    </button>
                </div>
            </div>

            {/* 5. Modal Popup: Gửi câu hỏi pháp luật rendered via createPortal so nothing floats over it */}
            {isModalOpen && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
                        {/* Modal Header */}
                        <div className="bg-[#0a4694] text-white px-6 py-4 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                    <HelpCircle size={20} className="text-white" />
                                </div>
                                <h2 className="text-lg font-bold">Gửi câu hỏi & thắc mắc pháp luật</h2>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Form Content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar-light flex-1">
                            {submitSuccess ? (
                                <div className="py-10 text-center flex flex-col items-center justify-center gap-3">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                        <CheckCircle size={36} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Gửi câu hỏi thành công!</h3>
                                    <p className="text-sm text-gray-500 max-w-md">
                                        Câu hỏi của bạn đã được ghi nhận. Chuyên gia pháp lý sẽ phản hồi trong thời gian sớm nhất.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmitQuestion} className="space-y-4">
                                    {/* Họ và tên & Thông tin liên hệ */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[13px] font-bold text-gray-800 mb-1.5">
                                                Họ và tên <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Nhập họ và tên của bạn"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[13px] font-bold text-gray-800 mb-1.5">
                                                Số điện thoại / Email
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Để nhận thông báo khi có phản hồi"
                                                value={formData.emailOrPhone}
                                                onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Tiêu đề & Lĩnh vực */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[13px] font-bold text-gray-800 mb-1.5">
                                                Tiêu đề câu hỏi <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Tóm tắt ngắn gọn nội dung thắc mắc"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[13px] font-bold text-gray-800 mb-1.5">
                                                Lĩnh vực <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                required
                                                value={formData.field}
                                                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                                                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-gray-700 cursor-pointer"
                                            >
                                                <option value="">-- Chọn lĩnh vực --</option>
                                                <option value="Lao động">Lao động</option>
                                                <option value="Đất đai">Đất đai</option>
                                                <option value="Doanh nghiệp">Doanh nghiệp</option>
                                                <option value="Dân sự">Dân sự</option>
                                                <option value="Hình sự">Hình sự</option>
                                                <option value="Hành chính">Hành chính</option>
                                                <option value="Hôn nhân & gia đình">Hôn nhân & gia đình</option>
                                                <option value="Bảo hiểm xã hội">Bảo hiểm xã hội</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Nội dung câu hỏi */}
                                    <div>
                                        <label className="block text-[13px] font-bold text-gray-800 mb-1.5">
                                            Câu hỏi của bạn <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            required
                                            rows="4"
                                            placeholder="Trình bày chi tiết vụ việc, tình huống pháp lý cần được tư vấn giải đáp..."
                                            value={formData.question}
                                            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none leading-relaxed"
                                        ></textarea>
                                    </div>

                                    {/* Actions button */}
                                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors"
                                        >
                                            Hủy bỏ
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-2.5 rounded-lg bg-[#1c5dfd] hover:bg-blue-700 text-white font-medium text-sm transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70"
                                        >
                                            {isSubmitting ? (
                                                <span>Đang gửi...</span>
                                            ) : (
                                                <>
                                                    <Send size={15} />
                                                    Gửi câu hỏi ngay
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
