import http2 from 'node:http2';
import fs from 'node:fs';

const server = http2.createSecureServer({
  key: fs.readFileSync('./test/e2e/utils/server/privkey.pem'),
  cert: fs.readFileSync('./test/e2e/utils/server/cert.pem'),
});
server.on('error', console.error);
server.on('stream', handleStream);
server.listen(443);

function handleStream(stream, headers) {
  const requestedPath = headers[':path'];
  const requestedPathRelative = `.${ requestedPath }`;
  if (!isLocationAllowed()) {
    return respond404();
  }
  isDirRequested() ? handleDirRequest() : handleFileRequest();

  function isLocationAllowed() {
    const allowed = new Set([ '/', '/list-dir/', ]);
    return allowed.has(requestedPath) ||
      requestedPath.startsWith('/test/e2e/cases/');
  }

  function isDirRequested() {
    return requestedPath.endsWith('/');
  }

  function handleDirRequest() {
    if (requestedPath === '/list-dir/') {
      handleListOfTestsRequest('./test/e2e/cases/');
    } else if (requestedPath.endsWith('/list-dir/')) {
      const relativePathForList = requestedPathRelative
          .substring(0, requestedPathRelative.length - 'list-dir/'.length);
      if (!relativePathForList.endsWith('/common-files/')) {
        handleListOfTestsRequest(relativePathForList);
      }
    } else if (!requestedPath.endsWith('/common-files/')) {
      respondWithExistingFile('./test/e2e/cases/common-files/template.html');
    } else {
      respond404();
    }

    function handleListOfTestsRequest(dirPath) {
      if (!fs.existsSync(dirPath)) {
        return respond404();
      }
      const stat = fs.statSync(dirPath);
      if (!stat.isDirectory()) {
        return respond404();
      }
      const dirEntries = fs.readdirSync(dirPath, { withFileTypes: true, });
      const testCasesOrGroupsOfTestCases =
          dirEntries.reduce(reduceReaddirDirents, []);
      respondJson(testCasesOrGroupsOfTestCases);

      function respondJson(data) {
        const json = JSON.stringify(data);
        stream.respond({
          'content-type': 'application/json; charset=utf-8',
          ':status': 200,
        });
        stream.end(json);
      }

      function reduceReaddirDirents(accum, dirEntry) {
        if (!dirEntry.isDirectory()) {
          const errMsg = [
            'When a list-dir/ request is made, the listed dir',
            'is not supposed to have files, only directories',
            'which are test cases or groups of test cases',
            `Problem is in path: ${ requestedPath }`,
          ].join('\n');
          return respond500(errMsg);
        }
        const dirsToIgnore = ['/common-files',];
        for (const di of dirsToIgnore) {
          if (dirEntry.name.endsWith(di)) {
            return accum;
          }
        }
        accum.push(`${ dirEntry.parentPath.substr(1) }${ dirEntry.name }/`);
        return accum;
      }
    }
  }

  function handleFileRequest() {
    if (fs.existsSync(requestedPathRelative)) {
      const stat = fs.statSync(requestedPathRelative);
      if (stat.isFile()) {
        return respondWithExistingFile(requestedPathRelative);
      }
    }
    respond404();
  }

  function respond404() {
    stream.respond({
      'content-type': 'text/plain; charset=utf-8',
      ':status': 404,
    });
    stream.end('404 error, unexpected path:\n' + requestedPath);
  }

  function respond500(msg) {
    stream.respond({
      'content-type': 'text/plain; charset=utf-8',
      ':status': 500,
    });
    stream.end('500 error:\n' + msg);
  }

  function respondWithExistingFile(filePath) {
    const contentType = determineContentTypeHeader(filePath);
    if (!contentType) {
      respond500(`Coudln't process file: ${ filePath }`);
    }
    stream.respondWithFile(filePath, {
      'content-type': contentType,
      'access-control-allow-origin': '*',
      ':status': 200,
    });
  }

  function determineContentTypeHeader(fileNameOrPath) {
    const m = Object.create(null);
    m[void 0] = null;
    m.html = 'text/html;charset=utf-8';
    m.js = 'text/javascript;charset=utf-8';

    const extension = fileNameOrPath.match(/\.([^.]+)$/)?.[1];
    return m[extension];
  }
}
