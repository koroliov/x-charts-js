import React, { useRef, useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

export default function LiveJsEditor({
  initialJs,
  initialHtml,
  headerText,
  overviewHtml,
}) {
  return (
    <BrowserOnly fallback={<div>Loading or you may have JS disabled</div>}>
      {() => {
        const Prism = require('prismjs');
        require('prismjs/components/prism-javascript');
        require('prismjs/themes/prism-tomorrow.css');

        const outputRef = useRef(null);
        const iframeRef = useRef(null);
        const preRefs = {
          javascript: useRef(null),
          html: useRef(null),
        };

        const [code, setCode] = useState({
          javascript: initialJs,
          html: initialHtml,
        });

        // 'overview' | 'html' | 'javascript'
        const [activeTab, setActiveTab] = useState('overview');
        useEffect(() => applyHighlight('javascript', code.javascript), [
          code.javascript]);
        useEffect(() => applyHighlight('html', code.html), [code.html]);
        useEffect(runCode, []);
        useEffect(() => {
          if (activeTab === 'javascript') {
            preRefs.javascript.current?.focus();
          } else if (activeTab === 'html') {
            preRefs.html.current?.focus();
          }
        }, [activeTab]);

        function applyHighlight(kind, value) {
          const ref = preRefs[kind];
          if (!ref?.current) return;
          ref.current.innerHTML =
            Prism.highlight(value, Prism.languages[kind], kind);
        }

        function runCode() {
          const codeJs = preRefs.javascript.current.innerText;
          const iframeWindow = iframeRef.current.contentWindow;
          outputRef.current.textContent = '';
          iframeWindow.onerror = null;
          iframeWindow.onerror = (message, source, lineno, colno) => {
            outputRef.current.textContent = `Error: ${message} at ${
              lineno}:${colno}`;
            return true;
          };
          const codeHtml = preRefs.html.current.innerText;
          const doc = iframeWindow.document;
          doc.body.innerHTML = codeHtml;
          const script = doc.createElement('script');
          script.type = 'module';
          script.textContent = codeJs;
          doc.body.appendChild(script);
        }

        const onBlurJs = (e) =>
          setCode((prev) => ({ ...prev, javascript: e.target.innerText }));
        const onBlurHtml = (e) =>
          setCode((prev) => ({ ...prev, html: e.target.innerText }));

        return (
          <div className={styles.container}>
            <div className={styles.header}>{headerText}</div>
            <iframe className={styles.iframe} src="" ref={iframeRef} />
            <pre
              ref={outputRef}
              className={styles.resultPre}
              aria-live="polite"
              role="status"
            />

            <div className={styles.tabBar} role="tablist"
              aria-label="Editor tabs">
              <div className={styles.tabButtons}>
                <button
                  role="tab"
                  aria-selected={activeTab === 'overview'}
                  className={`${styles.tab} ${
                    activeTab === 'overview' ? styles.tabActive : ''
                  }`}
                  onClick={() => setActiveTab('overview')}
                >
                  overview
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'html'}
                  className={`${styles.tab} ${
                    activeTab === 'html' ? styles.tabActive : ''
                  }`}
                  onClick={() => setActiveTab('html')}
                >
                  html
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'javascript'}
                  className={`${styles.tab} ${
                    activeTab === 'javascript' ? styles.tabActive : ''
                  }`}
                  onClick={() => setActiveTab('javascript')}
                >
                  js
                </button>
              </div>

              <div className={styles.tabSpacer} />

              <button
                className={styles.runButton}
                onClick={runCode}
                type="button"
                title="Run code"
              >
                ▶ Run
              </button>
            </div>

            <div className={styles.panelArea}>
              {activeTab === 'overview' && (
                <div className={styles.overviewPanel}
                  dangerouslySetInnerHTML={{ __html: overviewHtml }}>
                </div>
              )}

              <div className={styles.preWrapper}>
                <pre
                  ref={preRefs.html}
                  className={`language-html ${styles.pre}`}
                  onBlur={onBlurHtml}
                  spellCheck={false}
                  contentEditable="plaintext-only"
                  tabIndex={0}
                  hidden={activeTab !== 'html'}
                />
                <pre
                  ref={preRefs.javascript}
                  className={`language-javascript ${styles.pre}`}
                  onBlur={onBlurJs}
                  spellCheck={false}
                  contentEditable="plaintext-only"
                  tabIndex={0}
                  hidden={activeTab !== 'javascript'}
                />
              </div>
            </div>
          </div>
        );
      }}
    </BrowserOnly>
  );
}
