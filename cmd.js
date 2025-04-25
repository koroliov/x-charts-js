import './test/server/main.js';
import livereload from 'livereload';

const server = livereload.createServer({
  delay: 1000,
});
server.watch(['./dist/', './test/e2e/cases/', './test/served-tmp/',]);
