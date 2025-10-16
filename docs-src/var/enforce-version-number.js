const vDist = require('../../dist/modules/version.js');
const vDocs = require('../static/x-charts-js/version.js');
const fs = require('fs');

main();

async function main() {
  const vChangeLog = await getLastVersionFromChangeLog();
  checkVersions();

  function checkVersions() {
    return ['major', 'minor', 'patch',].forEach((p) => {
      const res = vDist[p] === vDocs[p] && vDist[p] === vChangeLog[p];
      if (!res) {
        throw new Error(` Versions '${ p }' don't match:
          vDist: ${ vDist[p] },
          vDocs: ${ vDocs[p] },
          vChangeLog: ${ vChangeLog[p] },
        `);
      }
    });
  }

  async function getLastVersionFromChangeLog() {
    return new Promise((res, rej) => {
      const rs = fs.createReadStream('./docs-src/docs/changelog.md', {
        encoding: 'utf8',
      });
      rs.on('data', processChangeLogFileChunk);
      rs.on('end', () => {
        rej(new Error('Failed to find latest version number in changelog.md'));
      });

      function processChangeLogFileChunk(str) {
        const result =
          str.match(/---\n+# Changelog\n{1,2}## v(\d+\.\d+\.\d)\n/);
        if (result?.[1]) {
          rs.destroy();
          const split = result[1].split('.');
          res({
            major: Number(split[0]),
            minor: Number(split[1]),
            patch: Number(split[2]),
          });
        }
      }
    });
  }
}
