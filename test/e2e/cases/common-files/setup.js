fetch('./setup.js')
.then(async (r) => {
  if (r.status === 200) {
    await runDedicatedSetup(r);
  } else if (r.status === 201) {
    await runDefaultSetup();
  } else {
    console.error('Unexpected response');
  }
});

async function runDefaultSetup() {
  const [, pathParent, pathNextToLast, pathLast, ] =
      location.pathname.match(/^(.*)\/([^/]+)\/([^/]+)\/$/);
  setTitle();
  if (pathLast === 'modules') {
    handleTestPageForModules();
  } else {
    await handleListOfTestsPage();
  }

  function handleTestPageForModules() {
    const s = document.createElement('script');
    s.setAttribute('type', 'module');
    s.setAttribute('src', './test.js');
    document.body.appendChild(s);
  }

  async function handleListOfTestsPage() {
    const url = location.pathname + 'list-dir/';
    const resp = await fetch(url);
    const list = await resp.json();
    let bodyHtmlArray = [
      '<ul>',
    ];
    setParentLinkIfAvailable();
    bodyHtmlArray = list.reduce((a, l) => {
      return a.push(`<li><a href="${ l }">${ l }</a></li>`), a;
    }, bodyHtmlArray);
    bodyHtmlArray.push('</ul>');
    document.body.innerHTML = bodyHtmlArray.join('\n');

    function setParentLinkIfAvailable() {
      let href = '';
      if (pathParent.length > '/test/e2e/cases'.length) {
        href = pathParent;
      } else if (pathParent === '/test/e2e') {
        href = `${ pathParent }/cases`;
      }
      if (href) {
        bodyHtmlArray.push(`<li><a href="${ href }/">..</li>`);
      }
    }
  }

  function setTitle() {
    document.title = `${ pathNextToLast }/${ pathLast }`;
  }
}

async function runDedicatedSetup(response) {
  const s = document.createElement('script');
  s.setAttribute('type', 'module');
  s.innerText = await response.text();
  document.head.appendChild(s);
}
