import zipfile
import xml.etree.ElementTree as ET
import sys

def get_text(path):
    try:
        with zipfile.ZipFile(path) as z:
            xml_content = z.read('word/document.xml')
        tree = ET.fromstring(xml_content)
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        paragraphs = []
        for p in tree.findall('.//w:p', ns):
            texts = [node.text for node in p.findall('.//w:t', ns) if node.text]
            if texts:
                paragraphs.append(''.join(texts))
        return '\n'.join(paragraphs)
    except Exception as e:
        return str(e)

with open('extracted_srs.txt', 'w', encoding='utf-8') as f:
    f.write('---61---\n')
    f.write(get_text(r'd:\CPLQG\CPLQG-Template\SRS\61.Xem danh sách báo cáo tiếp thu giải trình_SRS_AI_Generated.docx'))
    f.write('\n---62---\n')
    f.write(get_text(r'd:\CPLQG\CPLQG-Template\SRS\62.Xem thông tin chi tiết báo cáo tiếp thu giải trình_SRS_AI_Generated.docx'))
