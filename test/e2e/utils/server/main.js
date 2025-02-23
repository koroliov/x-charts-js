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
  if (!isLocationAllowed()) {
    return respond404();
  }
  isDirRequested() ? handleDirRequest() : handleFileRequest();

  function isLocationAllowed() {
    return requestedPath === '/' ||
      requestedPath.startsWith('/test/e2e/cases/');
  }

  function isDirRequested() {
    return requestedPath.endsWith('/');
  }

  function handleDirRequest() {
    if (requestedPath === '/') {
      handleListOfTestsRequest('./test/e2e/cases/');
    } else if (requestedPath.endsWith('/list-dir/')) {
      const relativePathForList = `.${ requestedPath
          .substring(0, requestedPath.length - 'list-dir/'.length)}`;
      if (!relativePathForList.endsWith('/common-files/')) {
        handleListOfTestsRequest(relativePathForList);
      }
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
}
