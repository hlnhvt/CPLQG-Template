const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, BorderStyle,
  AlignmentType, ShadingType, convertInchesToTwip,
  TableLayoutType, VerticalAlign
} = require('docx');

// ── parseInline: trả về mảng plain object {text, bold, italics, font, size} ──
function parseInline(text) {
  const parts = [];
  const re = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index) });
    if (m[1]) parts.push({ text: m[2], bold: true });
    else if (m[3]) parts.push({ text: m[4], italics: true });
    else if (m[5]) parts.push({ text: m[6], font: 'Courier New', size: 18 });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts.length ? parts : [{ text }];
}

// Tạo TextRun từ plain object + override options
function makeRun(part, override = {}) {
  return new TextRun({ ...part, ...override });
}

// ── heading level ─────────────────────────────────────────────────────────────
function headingLevel(n) {
  return [
    HeadingLevel.HEADING_1,
    HeadingLevel.HEADING_2,
    HeadingLevel.HEADING_3,
    HeadingLevel.HEADING_4,
    HeadingLevel.HEADING_5,
  ][Math.min(n - 1, 4)];
}

// ── table helpers ─────────────────────────────────────────────────────────────
function isTableSep(line) {
  return /^\|[\s|:-]+\|$/.test(line.trim());
}

function parseTableRow(line) {
  return line
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(c => c.trim());
}

function buildTable(rows) {
  const HEADER_COLOR = '1E4A8A';

  const tableRows = rows.map((cells, ri) => {
    const isHeader = ri === 0;
    return new TableRow({
      tableHeader: isHeader,
      children: cells.map(cellText => {
        const parts = parseInline(cellText || '');
        return new TableCell({
          verticalAlign: VerticalAlign.CENTER,
          shading: isHeader
            ? { fill: HEADER_COLOR, type: ShadingType.SOLID, color: HEADER_COLOR }
            : undefined,
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [
            new Paragraph({
              children: parts.map(p =>
                makeRun(p, isHeader
                  ? { bold: true, color: 'FFFFFF', size: 18 }
                  : { size: 18 }
                )
              ),
            }),
          ],
        });
      }),
    });
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    layout: TableLayoutType.FIXED,
    borders: {
      top:     { style: BorderStyle.SINGLE, size: 4, color: HEADER_COLOR },
      bottom:  { style: BorderStyle.SINGLE, size: 4, color: HEADER_COLOR },
      left:    { style: BorderStyle.SINGLE, size: 4, color: HEADER_COLOR },
      right:   { style: BorderStyle.SINGLE, size: 4, color: HEADER_COLOR },
      insideH: { style: BorderStyle.SINGLE, size: 2, color: 'AAAAAA' },
      insideV: { style: BorderStyle.SINGLE, size: 2, color: 'AAAAAA' },
    },
    rows: tableRows,
  });
}

// ── main markdown parser ──────────────────────────────────────────────────────
function mdToDocx(mdContent) {
  const lines = mdContent.split('\n');
  const children = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Heading
    const hm = trimmed.match(/^(#{1,6})\s+(.*)/);
    if (hm) {
      children.push(new Paragraph({
        heading: headingLevel(hm[1].length),
        children: parseInline(hm[2]).map(p => makeRun(p)),
      }));
      i++; continue;
    }

    // Horizontal rule
    if (/^-{3,}$/.test(trimmed)) {
      children.push(new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '1E4A8A' } },
        children: [new TextRun({ text: '' })],
      }));
      i++; continue;
    }

    // Table: thu thập liên tiếp các dòng bắt đầu bằng |
    if (trimmed.startsWith('|')) {
      const rawRows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const l = lines[i];
        if (!isTableSep(l)) rawRows.push(parseTableRow(l));
        i++;
      }
      if (rawRows.length) {
        children.push(buildTable(rawRows));
        children.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
      }
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      const text = trimmed.replace(/^>\s?/, '');
      children.push(new Paragraph({
        indent: { left: convertInchesToTwip(0.4) },
        border: { left: { style: BorderStyle.SINGLE, size: 12, color: '1E4A8A' } },
        children: parseInline(text).map(p =>
          makeRun(p, { italics: true, color: '555555' })
        ),
      }));
      i++; continue;
    }

    // Bullet list
    if (/^[-*]\s+/.test(trimmed)) {
      const text = trimmed.replace(/^[-*]\s+/, '');
      children.push(new Paragraph({
        bullet: { level: 0 },
        children: parseInline(text).map(p => makeRun(p)),
      }));
      i++; continue;
    }

    // Image → bỏ qua
    if (/^!\[.*\]/.test(trimmed)) { i++; continue; }

    // Dòng italic footer (*...*) → căn giữa
    if (/^\*[^*].*[^*]\*$/.test(trimmed)) {
      children.push(new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({
          text: trimmed.replace(/^\*|\*$/g, ''),
          italics: true,
          color: '888888',
          size: 18,
        })],
      }));
      i++; continue;
    }

    // Dòng trống
    if (trimmed === '') {
      children.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
      i++; continue;
    }

    // Đoạn văn bình thường
    children.push(new Paragraph({
      children: parseInline(line).map(p => makeRun(p)),
    }));
    i++;
  }

  return new Document({
    styles: {
      default: {
        document: { run: { font: 'Times New Roman', size: 24 } },
      },
    },
    sections: [{
      properties: {
        page: { margin: { top: 720, bottom: 720, left: 1080, right: 720 } },
      },
      children,
    }],
  });
}

// ── entry point ───────────────────────────────────────────────────────────────
const [,, inputFile, outputFile] = process.argv;
if (!inputFile || !outputFile) {
  console.error('Usage: node md-to-docx.js <input.md> <output.docx>');
  process.exit(1);
}

const md = fs.readFileSync(inputFile, 'utf8');
Packer.toBuffer(mdToDocx(md)).then(buf => {
  fs.writeFileSync(outputFile, buf);
  console.log('Done:', outputFile);
});
