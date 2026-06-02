import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    ImageRun,
    WidthType,
    AlignmentType,
    VerticalAlign,
    BorderStyle,
    ShadingType
} from "docx";
import fs from "fs";
import path from "path";

// ĐƯỜNG DẪN HÌNH ẢNH DÒNG CHẢY (Ưu tiên tệp tin xuất bản địa trong thư mục diagram của người dùng)
const imagePath1 = fs.existsSync("d:\\CPLQG\\CPLQG-Template\\HienKeDocs\\diagram\\hien_ke_workflows.png")
    ? "d:\\CPLQG\\CPLQG-Template\\HienKeDocs\\diagram\\hien_ke_workflows.png"
    : "C:\\Users\\nhanhl2\\.gemini\\antigravity-ide\\brain\\c6883e63-2ab3-4e4e-a092-6319d9e69371\\media__1780040414580.png";

const imagePath2 = fs.existsSync("d:\\CPLQG\\CPLQG-Template\\HienKeDocs\\diagram\\hien_ke_workflows_page2.png")
    ? "d:\\CPLQG\\CPLQG-Template\\HienKeDocs\\diagram\\hien_ke_workflows_page2.png"
    : "C:\\Users\\nhanhl2\\.gemini\\antigravity-ide\\brain\\c6883e63-2ab3-4e4e-a092-6319d9e69371\\media__1780040492609.png";

// Save specifically to analyst directory as requested by the user, and diagram directory as backup
const paths = [
    "d:\\CPLQG\\CPLQG-Template\\HienKeDocs\\analyst\\Quy_trinh_tiep_nhan_xu_ly_Hien_ke.docx",
    "d:\\CPLQG\\CPLQG-Template\\HienKeDocs\\diagram\\Quy_trinh_tiep_nhan_xu_ly_Hien_ke.docx"
];

// Read images
let imageBuffer1, imageBuffer2;
try {
    imageBuffer1 = fs.readFileSync(imagePath1);
    console.log("Image 1 loaded successfully from:", imagePath1, "Size:", imageBuffer1.length);
} catch (e) {
    console.error("Error reading image 1:", e.message);
    process.exit(1);
}

try {
    imageBuffer2 = fs.readFileSync(imagePath2);
    console.log("Image 2 loaded successfully from:", imagePath2, "Size:", imageBuffer2.length);
} catch (e) {
    console.error("Error reading image 2:", e.message);
    process.exit(1);
}

// DỮ LIỆU ĐẶC TẢ NGHIỆP VỤ QUY TRÌNH 1 (11 Bước - Hiến kế của bạn & Có thể bạn quan tâm)
const stepsData1 = [
    {
        stt: "1",
        name: "Gửi hiến kế",
        actor: "Người dân / Doanh nghiệp",
        desc: [
            "Người dân / Doanh nghiệp truy cập vào chuyên mục \"Hiến kế của bạn\" trên Cổng Pháp luật quốc gia.",
            "Người dân / Doanh nghiệp thực hiện đăng nhập và xác thực bằng tài khoản định danh điện tử VNeID.",
            "Hệ thống nghiệp vụ tự động đồng bộ và điền sẵn các thông tin liên hệ định danh cá nhân (Họ và tên, Số điện thoại, Thư điện tử, Tổ chức) dưới dạng Chỉ đọc.",
            "Người dân / Doanh nghiệp tiến hành soạn thảo ý kiến (Tiêu đề, Lĩnh vực góp ý, Nội dung hiến kế chi tiết) và tải lên các tài liệu đính kèm liên quan.",
            "Người dân / Doanh nghiệp nhấn nút \"Gửi hiến kế\" để chuyển hồ sơ lên Hệ thống nghiệp vụ."
        ]
    },
    {
        stt: "2",
        name: "Hệ thống xác nhận đã tiếp nhận thông tin hiến kế",
        actor: "Hệ thống nghiệp vụ",
        desc: [
            "Hệ thống nghiệp vụ tự động ghi nhận hồ sơ hiến kế và tạo một bản ghi mới trên hệ thống quản trị nội dung.",
            "Hệ thống nghiệp vụ tự động gán các trạng thái khởi tạo ban đầu của hồ sơ: Trạng thái luồng xử lý nghiệp vụ = 'Mới gửi', Trạng thái hiển thị = 'Bản nháp'.",
            "Hệ thống nghiệp vụ tự động hiển thị thông báo phản hồi xác nhận tiếp nhận thông tin hiến kế thành công cho Người dân / Doanh nghiệp trên Cổng thông tin."
        ]
    },
    {
        stt: "3",
        name: "Nhập lý do từ chối",
        actor: "Quản trị mục Hiến kế",
        desc: [
            "Quản trị mục Hiến kế thực hiện kiểm tra tính hợp quy, nội dung của hiến kế vừa tiếp nhận.",
            "Phân chia các trường hợp xử lý nghiệp vụ:",
            "  - Trường hợp Không hợp lệ / Rác: Quản trị mục Hiến kế chuyển trạng thái xử lý nghiệp vụ sang 'Từ chối' và trạng thái hiển thị là 'Không công khai', đồng thời tiến hành nhập lý do từ chối chi tiết. Hệ thống nghiệp vụ tự động gửi thư điện tử thông báo từ chối cho Người dân / Doanh nghiệp, kết thúc quy trình.",
            "  - Trường hợp Hợp lệ: Quản trị mục Hiến kế duyệt hồ sơ sang trạng thái xử lý nghiệp vụ là 'Đang xử lý' (trạng thái hiển thị là 'Bản nháp'), đồng thời phân phối hồ sơ sang cho Đại diện Bộ ban ngành liên quan thẩm định."
        ]
    },
    {
        stt: "4",
        name: "Tiếp nhận hiến kế",
        actor: "Đại diện Bộ ban ngành",
        desc: [
            "Đại diện Bộ ban ngành tiếp nhận hồ sơ hiến kế được phân phối trên hệ thống ở trạng thái xử lý nghiệp vụ là 'Đang xử lý'.",
            "Đại diện Bộ ban ngành thực hiện thẩm định nội dung ý kiến đóng góp thuộc thẩm quyền quản lý chuyên ngành để chuẩn bị nội dung phản hồi giải trình."
        ]
    },
    {
        stt: "5",
        name: "Nhập lý do từ chối",
        actor: "Đại diện Bộ ban ngành",
        desc: [
            "Trong trường hợp nội dung hiến kế sai thẩm quyền chuyên môn, trùng lặp hoặc không khả thi trên thực tế, Đại diện Bộ ban ngành tiến hành nhập lý do từ chối chi tiết trên hệ thống.",
            "Đại diện Bộ ban ngành chuyển trả hồ sơ về cho Quản trị mục Hiến kế để từ chối xử lý chính thức (hồ sơ quay lại bước 3 với lý do phản hồi chi tiết để Quản trị mục Hiến kế đưa ra quyết định từ chối chính thức)."
        ]
    },
    {
        stt: "6",
        name: "Nhập nội dung phản hồi",
        actor: "Đại diện Bộ ban ngành",
        desc: [
            "Trong trường hợp nội dung hiến kế hợp lý và khả thi, Đại diện Bộ ban ngành tiến hành soạn thảo và nhập nội dung phản hồi giải trình chi tiết đối với ý kiến đóng góp của Người dân / Doanh nghiệp."
        ]
    },
    {
        stt: "7",
        name: "Hoàn thành phản hồi",
        actor: "Đại diện Bộ ban ngành",
        desc: [
            "Sau khi hoàn tất nội dung phản hồi giải trình, Đại diện Bộ ban ngành nhấn nút hoàn thành trên hệ thống.",
            "Hệ thống nghiệp vụ tự động chuyển trạng thái xử lý nghiệp vụ của hồ sơ sang 'Đã hoàn thành' (trạng thái hiển thị vẫn giữ là 'Bản nháp')."
        ]
    },
    {
        stt: "8",
        name: "Đã công khai",
        actor: "Quản trị mục Hiến kế",
        desc: [
            "Quản trị mục Hiến kế rà soát lại dự thảo phản hồi giải trình của Đại diện Bộ ban ngành và thiết lập phương án hiển thị.",
            "Quản trị mục Hiến kế duyệt hiển thị rộng rãi: chuyển trạng thái hiển thị của hồ sơ sang 'Đã công khai' (trạng thái xử lý nghiệp vụ giữ nguyên là 'Đã hoàn thành').",
            "Nội dung hiến kế và câu phản hồi giải trình sẽ được hiển thị công khai rộng rãi trên Cổng thông tin cho Người dân / Doanh nghiệp và cộng đồng cùng theo dõi."
        ]
    },
    {
        stt: "9",
        name: "Lưu nội bộ",
        actor: "Quản trị mục Hiến kế",
        desc: [
            "Quản trị mục Hiến kế duyệt lưu nội bộ: chuyển trạng thái hiển thị của hồ sơ sang 'Không công khai' (trạng thái xử lý nghiệp vụ giữ nguyên là 'Đã hoàn thành').",
            "Nội dung phản hồi được lưu trữ bảo mật trên hệ thống phục vụ công tác tra cứu nội bộ của các cơ quan chức năng, không hiển thị trên Cổng thông tin công cộng."
        ]
    },
    {
        stt: "10",
        name: "Đã ẩn",
        actor: "Quản trị mục Hiến kế",
        desc: [
            "Đối với các hiến kế đã công khai, nếu phát hiện sự cố khẩn cấp hoặc nội dung nhạy cảm cần ẩn gấp, Quản trị mục Hiến kế chuyển trạng thái hiển thị của hồ sơ sang 'Đã ẩn' (trạng thái xử lý nghiệp vụ giữ nguyên là 'Đã hoàn thành').",
            "Sau khi xử lý xong sự cố: Quản trị mục Hiến kế tiến hành duyệt và chuyển trạng thái hiển thị quay lại 'Đã công khai' để tiếp tục hiển thị rộng rãi."
        ]
    },
    {
        stt: "11",
        name: "Xem phản hồi",
        actor: "Người dân / Doanh nghiệp",
        desc: [
            "Người dân / Doanh nghiệp truy cập Cổng thông tin để xem kết quả và nội dung phản hồi giải trình chính thức từ Đại diện Bộ ban ngành hoặc Quản trị mục Hiến kế.",
            "Kết quả phản hồi hiển thị tương ứng với các trạng thái phê duyệt cuối cùng (Từ chối, Lưu nội bộ, Đã công khai hoặc Đã ẩn) đảm bảo tính minh bạch, trực quan đối với Người dân / Doanh nghiệp."
        ]
    }
];

// DỮ LIỆU ĐẶC TẢ NGHIỆP VỤ QUY TRÌNH 2 (4 Bước - Chúng tôi cần bạn / Khảo sát ý kiến)
const stepsData2 = [
    {
        stt: "1",
        name: "Gửi phiếu khảo sát ý kiến",
        actor: "Người dân / Doanh nghiệp",
        desc: [
            "Người dân / Doanh nghiệp truy cập vào chuyên mục \"Chúng tôi cần bạn\" trên Cổng Pháp luật quốc gia.",
            "Người dân / Doanh nghiệp thực hiện điền các nội dung khảo sát ý kiến đóng góp theo các biểu mẫu khảo sát có sẵn trên Cổng thông tin.",
            "Người dân / Doanh nghiệp nhấn nút gửi phiếu để hoàn tất và chuyển dữ liệu lên Hệ thống nghiệp vụ."
        ]
    },
    {
        stt: "2",
        name: "Hệ thống xác nhận đã tiếp nhận thông tin",
        actor: "Hệ thống nghiệp vụ",
        desc: [
            "Hệ thống nghiệp vụ tự động tiếp nhận phiếu khảo sát ý kiến và ghi nhận thông tin đóng góp vào cơ sở dữ liệu hệ thống.",
            "Hệ thống nghiệp vụ tự động hiển thị thông báo xác nhận đã tiếp nhận thông tin đóng góp thành công cho Người dân / Doanh nghiệp."
        ]
    },
    {
        stt: "3",
        name: "Tổng hợp và gửi phiếu khảo sát ý kiến",
        actor: "Quản trị mục Hiến kế",
        desc: [
            "Quản trị mục Hiến kế tiến hành truy cập vào Hệ thống nghiệp vụ, tổng hợp tất cả các phiếu khảo sát ý kiến hợp lệ thu nhận được từ Người dân / Doanh nghiệp.",
            "Quản trị mục Hiến kế lập báo cáo tổng hợp và thực hiện gửi thông tin khảo sát ý kiến sang cho Đại diện Bộ ban ngành liên quan thẩm định."
        ]
    },
    {
        stt: "4",
        name: "Tiếp nhận phiếu khảo sát hiến kế",
        actor: "Đại diện Bộ ban ngành",
        desc: [
            "Đại diện Bộ ban ngành nhận được thông tin khảo sát ý kiến từ Quản trị mục Hiến kế chuyển sang.",
            "Đại diện Bộ ban ngành thực hiện tiếp nhận và tiến hành rà soát các đề xuất hiến kế khảo sát để làm cơ sở nghiên cứu cải cách."
        ]
    }
];

// Helper for cell margins
const cellMargins = { top: 140, bottom: 140, left: 180, right: 180 };

// Create a Table Cell
function makeCell(content, widthPercent, options = {}) {
    const { isHeader = false, align = AlignmentType.LEFT, bold = false } = options;
    
    let paragraphs = [];
    if (Array.isArray(content)) {
        paragraphs = content.map(text => {
            const trimmed = text.trim();
            // CHỈ gán bullet cho các dòng phân chia trường hợp rẽ nhánh (bắt đầu bằng dấu gạch ngang -)
            const isBullet = trimmed.startsWith("-");
            const cleanText = isBullet ? trimmed.substring(1).trim() : text;
            
            return new Paragraph({
                children: [
                    new TextRun({
                        text: cleanText,
                        bold: isHeader || bold,
                        size: 24, // 12pt
                        font: "Times New Roman",
                        color: isHeader ? "FFFFFF" : "000000"
                    })
                ],
                alignment: align,
                bullet: isBullet ? { level: 0 } : undefined,
                spacing: { before: 80, after: 80, line: 280 }
            });
        });
    } else {
        paragraphs = [
            new Paragraph({
                children: [
                    new TextRun({
                        text: String(content),
                        bold: isHeader || bold,
                        size: 24, // 12pt
                        font: "Times New Roman",
                        color: isHeader ? "FFFFFF" : "000000"
                    })
                ],
                alignment: align,
                spacing: { before: 80, after: 80, line: 280 }
            })
        ];
    }

    return new TableCell({
        children: paragraphs,
        width: { size: widthPercent, type: WidthType.PERCENTAGE },
        verticalAlign: VerticalAlign.CENTER,
        margins: cellMargins,
        shading: isHeader ? { fill: "1E4A8A", type: ShadingType.SOLID, color: "1E4A8A" } : undefined
    });
}

// Build a Table based on stepsData array
function buildTable(stepsArray) {
    const headerRow = new TableRow({
        tableHeader: true,
        children: [
            makeCell("STT", 8, { isHeader: true, align: AlignmentType.CENTER }),
            makeCell("Bước thực hiện", 24, { isHeader: true, align: AlignmentType.CENTER }),
            makeCell("Người thực hiện", 24, { isHeader: true, align: AlignmentType.CENTER }),
            makeCell("Mô tả chi tiết nghiệp vụ", 44, { isHeader: true, align: AlignmentType.CENTER })
        ]
    });

    const rows = [headerRow];
    stepsArray.forEach(step => {
        rows.push(
            new TableRow({
                children: [
                    makeCell(step.stt, 8, { align: AlignmentType.CENTER, bold: true }),
                    makeCell(step.name, 24, { bold: true }),
                    makeCell(step.actor, 24),
                    makeCell(step.desc, 44)
                ]
            })
        );
    });

    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
            top: { style: BorderStyle.SINGLE, size: 6, color: "1E4A8A" },
            bottom: { style: BorderStyle.SINGLE, size: 6, color: "1E4A8A" },
            left: { style: BorderStyle.SINGLE, size: 6, color: "1E4A8A" },
            right: { style: BorderStyle.SINGLE, size: 6, color: "1E4A8A" },
            insideH: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
            insideV: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" }
        },
        rows: rows
    });
}

// Document construction
const doc = new Document({
    styles: {
        default: {
            document: {
                run: {
                    font: "Times New Roman",
                    size: 26 // 13pt body font size is perfect for Vietnamese administration
                }
            }
        }
    },
    sections: [
        {
            properties: {
                page: {
                    margin: {
                        top: 1134, // 2cm
                        bottom: 1134, // 2cm
                        left: 1701, // 3cm
                        right: 1134 // 2cm
                    }
                }
            },
            children: [
                // Header agency / motto
                new Paragraph({
                    children: [
                        new TextRun({ text: "CỔNG PHÁP LUẬW QUỐC GIA", bold: true, size: 22 }),
                        new TextRun({ text: "\t\tCỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\n", bold: true, size: 22 }),
                        new TextRun({ text: "Chuyên mục Hiến kế", size: 22 }),
                        new TextRun({ text: "\t\t\tĐộc lập - Tự do - Hạnh phúc\n", bold: true, size: 22 }),
                        new TextRun({ text: "Số:    /HD-CPLQG", size: 22 }),
                        new TextRun({ text: "\t\t\t\tHà Nội, ngày 29 tháng 05 năm 2026", italics: true, size: 22 })
                    ],
                    spacing: { after: 360 }
                }),
                
                // Separator line
                new Paragraph({
                    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: "1E4A8A" } },
                    children: [new TextRun({ text: "" })],
                    spacing: { after: 360 }
                }),
                
                // Document Title
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({ text: "QUY TRÌNH TIẾP NHẬN VÀ XỬ LÝ Ý KIẾN HIẾN KẾ\n", bold: true, size: 30 }),
                        new TextRun({ text: "(Đặc tả chi tiết Luồng Nghiệp vụ Chuyên mục Hiến kế & Khảo sát của Cổng Pháp luật quốc gia)", italics: true, size: 22 })
                    ],
                    spacing: { after: 480 }
                }),
                
                // Lời mở đầu
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Tài liệu này quy định chi tiết quy trình tiếp nhận, xử lý và phản hồi ý kiến hiến kế của Người dân / Doanh nghiệp trên Cổng Pháp luật quốc gia đối với hai luồng nghiệp vụ chính: (1) Quy trình Hiến kế chung và Góp ý theo chủ đề; (2) Quy trình Tiếp nhận & Xử lý khảo sát góp ý tại mục Chúng tôi cần bạn. Quy trình giúp tối ưu hóa công tác xử lý, đảm bảo tính đồng bộ, minh bạch và thuần Việt.",
                            font: "Times New Roman",
                            size: 26
                        })
                    ],
                    alignment: AlignmentType.JUSTIFY,
                    spacing: { after: 360, line: 360 }
                }),

                // PHẦN I: QUY TRÌNH 1
                new Paragraph({
                    children: [
                        new TextRun({ text: "PHẦN I: QUY TRÌNH 1 - TIẾP NHẬN & XỬ LÝ HIẾN KẾ CHUNG", bold: true, size: 28, color: "1E4A8A" })
                    ],
                    spacing: { before: 240, after: 120 }
                }),
                
                new Paragraph({
                    children: [
                        new TextRun({ text: "1. Sơ đồ phân làn nghiệp vụ (Swimlane Flow)", bold: true, size: 24 })
                    ],
                    spacing: { before: 120, after: 120 }
                }),
                
                // Embedded Swimlane Image 1
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new ImageRun({
                            data: imageBuffer1,
                            type: "png",
                            transformation: {
                                width: 550, // Beautiful standard width inside margins
                                height: 380 // Maintains elegant aspect ratio
                            }
                        })
                    ],
                    spacing: { after: 200 }
                }),
                
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({ text: "Hình 1. Sơ đồ Swimlane phân làn quy trình Tiếp nhận & Xử lý Hiến kế chung", italics: true, size: 20 })
                    ],
                    spacing: { after: 360 }
                }),

                new Paragraph({
                    children: [
                        new TextRun({ text: "2. Bảng đặc tả chi tiết 11 bước thực hiện", bold: true, size: 24 })
                    ],
                    spacing: { before: 120, after: 120 }
                }),
                
                // Table 1
                buildTable(stepsData1),

                // PHẦN II: QUY TRÌNH 2
                new Paragraph({
                    children: [
                        new TextRun({ text: "\nPHẦN II: QUY TRÌNH 2 - TIẾP NHẬN & XỬ LÝ KHẢO SÁT GÓP Ý MỤC CHÚNG TÔI CẦN BẠN", bold: true, size: 28, color: "1E4A8A" })
                    ],
                    spacing: { before: 360, after: 120 }
                }),
                
                new Paragraph({
                    children: [
                        new TextRun({ text: "1. Sơ đồ phân làn nghiệp vụ (Swimlane Flow)", bold: true, size: 24 })
                    ],
                    spacing: { before: 120, after: 120 }
                }),
                
                // Embedded Swimlane Image 2
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new ImageRun({
                            data: imageBuffer2,
                            type: "png",
                            transformation: {
                                width: 550, // Beautiful standard width inside margins
                                height: 340 // Maintains elegant aspect ratio
                            }
                        })
                    ],
                    spacing: { after: 200 }
                }),
                
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({ text: "Hình 2. Sơ đồ Swimlane phân làn quy trình Khảo sát Góp ý mục Chúng tôi cần bạn", italics: true, size: 20 })
                    ],
                    spacing: { after: 360 }
                }),

                new Paragraph({
                    children: [
                        new TextRun({ text: "2. Bảng đặc tả chi tiết 4 bước thực hiện", bold: true, size: 24 })
                    ],
                    spacing: { before: 120, after: 120 }
                }),
                
                // Table 2
                buildTable(stepsData2),

                // Ký tên xác nhận hành chính
                new Paragraph({
                    children: [
                        new TextRun({ text: "\n\n\t\t\t\t\t\t\tHà Nội, ngày 29 tháng 05 năm 2026\n", italic: true, size: 24, font: "Times New Roman" }),
                        new TextRun({ text: "\t\t\t\t\t\t\t\tĐẠI DIỆN BAN DỰ ÁN CPLQG\n", bold: true, size: 24, font: "Times New Roman" }),
                        new TextRun({ text: "\t\t\t\t\t\t\t\t\t(Ký tên và đóng dấu)", italic: true, size: 22, font: "Times New Roman" })
                    ],
                    spacing: { before: 300 }
                })
            ]
        }
    ]
});

// Write to files
Packer.toBuffer(doc).then(buffer => {
    paths.forEach(p => {
        const dir = path.dirname(p);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        try {
            fs.writeFileSync(p, buffer);
            console.log("Successfully wrote document to:", p);
        } catch (e) {
            if (e.code === 'EBUSY') {
                console.warn(`\n[CẢNH BÁO] Tập tin đang bị khóa (có thể đang mở trong Microsoft Word):\n=> ${p}`);
                const alternatePath = p.replace(".docx", "_MoiNhat.docx");
                try {
                    fs.writeFileSync(alternatePath, buffer);
                    console.log(`[ĐÃ GHI BẢN SAO] Đã xuất bản sao mới tại:\n=> ${alternatePath}\n(Vui lòng đóng file Word gốc để ghi đè vào lần tới).\n`);
                } catch (e2) {
                    console.error("Không thể ghi file bản sao thay thế:", e2.message);
                }
            } else {
                console.error(`Lỗi khi ghi file ${p}:`, e.message);
            }
        }
    });
}).catch(err => {
    console.error("Error generating docx:", err);
});
