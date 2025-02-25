import './test/e2e/utils/server/main.js';
import livereload from 'livereload';

const server = livereload.createServer({
  delay: 1000,
});
server.watch(['./dist/', './test/e2e/cases/']);
