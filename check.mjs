import fs from 'node:fs';
import assert from 'node:assert/strict';

const html=fs.readFileSync('./index.html','utf8');
const js=fs.readFileSync('./app.js','utf8');
const css=fs.readFileSync('./styles.css','utf8');
assert.match(html,/id="editor"/);
assert.match(html,/id="captureBtn"/);
assert.match(html,/id="sharePoseBtn"/);
assert.match(html,/id="humanLimitNote"/);
assert.doesNotMatch(html,/importmap/);
assert.doesNotMatch(html,/cdn\.jsdelivr\.net/);
assert.doesNotMatch(js,/^import\s/m);
for(const token of ['LIMITS','effectiveLimits','normalizePose','saveStoredPose','navigator.clipboard',"toBlob","pointerdown","wheel"]) assert.match(js,new RegExp(token));
assert.match(css,/\.editor-section/);
assert.match(css,/canvas/);
console.log('static assertions: PASS');
