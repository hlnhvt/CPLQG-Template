import { execSync } from 'child_process';
try {
  const result = execSync('node promt/md-to-docx.js "SRS/187.Quản lý hồ sơ cá nhân, doanh nghiệp_SRS_AI_Generated.md" "docx/test.docx"');
  console.log("SUCCESS:", result.toString());
} catch(err) {
  console.log("ERROR OUTPUT:", err.stdout ? err.stdout.toString() : '');
  console.log("ERROR STDERR:", err.stderr ? err.stderr.toString() : '');
}
