const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // 1. Hash .nojekyll (empty)
  const nojekyllSha = execSync('git hash-object -w --stdin', { input: '' }).toString().trim();
  console.log('nojekyllSha:', nojekyllSha);

  // 2. Hash hmi_quiz_suite.html
  const hmiPath = path.join(__dirname, '..', 'hmi_quiz_suite.html');
  const hmiContent = fs.readFileSync(hmiPath);
  const hmiSha = execSync('git hash-object -w --stdin', { input: hmiContent }).toString().trim();
  console.log('hmiSha:', hmiSha);

  // 3. Create tree with .nojekyll, index.html and hmi_quiz_suite.html
  const treeEntries = [
    `100644 blob ${nojekyllSha}\t.nojekyll`,
    `100644 blob ${hmiSha}\tindex.html`,
    `100644 blob ${hmiSha}\thmi_quiz_suite.html`
  ].join('\n') + '\n';

  const treeSha = execSync('git mktree', { input: treeEntries }).toString().trim();
  console.log('treeSha:', treeSha);

  // 4. Create commit
  const commitSha = execSync(`git commit-tree ${treeSha} -m "Deploy HMI Master Suite to GitHub Pages"`).toString().trim();
  console.log('commitSha:', commitSha);

  // 5. Update branch gh-pages
  execSync(`git update-ref refs/heads/gh-pages ${commitSha}`);
  console.log('Successfully created/updated branch gh-pages with commit:', commitSha);

  // 6. Verify contents of gh-pages
  const lsTree = execSync('git ls-tree gh-pages').toString();
  console.log('gh-pages branch contents:\n' + lsTree);
} catch (err) {
  console.error('Error creating gh-pages branch:', err);
  process.exit(1);
}
