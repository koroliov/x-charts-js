import '../test/server/main.js';
import livereload from 'livereload';
import chp from 'child_process';

const server = livereload.createServer({
  host: '0.0.0.0',
  delay: 1000,
});
server.watch(['./dist/', './test/e2e/cases/', './test/served-tmp/',]);

chp.exec('npm run serve', {
  cwd: './docs-src/',
  shell: '/bin/bash',
}, (err) => {
  if (err) {
    throw new Error('Failed to run docusaurus server');
  }
});
