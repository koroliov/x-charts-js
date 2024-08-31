import http2 from 'node:http2';
import fs from 'node:fs';

const server = http2.createSecureServer({
  key: fs.readFileSync('./test/e2e/utils/server/privkey.pem'),
  cert: fs.readFileSync('./test/e2e/utils/server/cert.pem'),
});
server.on('error', console.error);

server.on('stream', (stream, headers) => {
  if (/^\/test\/e2e\/cases\/[a-z\/0-9\-]+.html$/.test(headers[':path'])) {
    return handleFileType('text/html');
  } else if (/^\/dist\//.test(headers[':path'])) {
    return handleFileType('text/javascript');
  }
  respond404(headers[':path']);

  function handleFileType(mimeType) {
    const fName = `.${ headers[':path'] }`;
    if (fs.existsSync(fName)) {
      return respondWithFile(fName);
    } else {
      return respond404(fName);
    }

    function respondWithFile(fName) {
      stream.respondWithFile(fName, {
        'content-type': `${ mimeType };charset=utf-8`,
        'access-control-allow-origin': '*',
        ':status': 200,
      });
    }
  }

  function respond404(pathOrFileName) {
    stream.respond({
      'content-type': 'text/plain; charset=utf-8',
      ':status': 404,
    });
    stream.end('404 error, unexpected path ' + pathOrFileName);
  }
});

server.listen(443);
