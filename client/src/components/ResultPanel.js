import React from 'react';
import './ResultPanel.css';

function shortenHash(hash) {
  if (!hash || hash.length < 20) return hash;
  return hash.slice(0, 10) + '···' + hash.slice(-8);
}

function shortenAddress(addr) {
  if (!addr || addr.length < 12) return addr;
  return addr.slice(0, 6) + '···' + addr.slice(-4);
}

function formatTimestamp(ts) {
  if (!ts) return null;
  const date = new Date(ts * 1000);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default function ResultPanel({ result, loading, onDismiss }) {
  const hasResult = !!result;
  const isSuccess = result?.type === 'success';

  return (
    <section className="panel panel--result" id="result-panel" role="status" aria-live="polite">
      <h2 className="panel__heading">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        File Status
      </h2>

      {}
      {loading && (
        <div className="rp__status rp__status--loading">
          <div className="rp__spinner" />
          <span>Processing…</span>
        </div>
      )}

      {}
      {!hasResult && !loading && (
        <div className="rp__empty">
          <div className="rp__empty-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <p className="rp__empty-text">No file processed yet</p>
          <p className="rp__empty-hint">Upload or verify a file to see its status</p>
        </div>
      )}

      {}
      {hasResult && !loading && (
        <div className="rp__result" key={result.message}>
          {}
          <div className={`rp__row rp__row--status ${isSuccess ? 'rp__row--success' : 'rp__row--error'}`}>
            <div className="rp__row-icon">
              {isSuccess ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </div>
            <div className="rp__row-body">
              <span className="rp__label">Status</span>
              <span className="rp__value">{isSuccess ? 'Success' : 'Error'}</span>
            </div>
          </div>

          {}
          <div className="rp__row">
            <div className="rp__row-icon rp__row-icon--neutral">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <div className="rp__row-body">
              <span className="rp__label">Message</span>
              <span className="rp__value rp__value--msg">{result.message}</span>
            </div>
          </div>

          {}
          {result.hash && (
            <div className="rp__row">
              <div className="rp__row-icon rp__row-icon--neutral">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
                  <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
                </svg>
              </div>
              <div className="rp__row-body">
                <span className="rp__label">File Fingerprint</span>
                <code className="rp__hash" title={result.hash}>{result.hash}</code>
              </div>
            </div>
          )}

          {}
          {result.txHash && (
            <div className="rp__row">
              <div className="rp__row-icon rp__row-icon--neutral">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div className="rp__row-body">
                <span className="rp__label">Blockchain Record</span>
                <code className="rp__hash" title={result.txHash}>{shortenHash(result.txHash)}</code>
              </div>
            </div>
          )}

          {}
          {result.uploader && (
            <div className="rp__row">
              <div className="rp__row-icon rp__row-icon--neutral">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="rp__row-body">
                <span className="rp__label">Uploaded By</span>
                <code className="rp__hash" title={result.uploader}>{shortenAddress(result.uploader)}</code>
              </div>
            </div>
          )}

          {}
          {result.timestamp && (
            <div className="rp__row">
              <div className="rp__row-icon rp__row-icon--neutral">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="rp__row-body">
                <span className="rp__label">Upload Time</span>
                <span className="rp__value rp__value--msg">{formatTimestamp(result.timestamp)}</span>
              </div>
            </div>
          )}

          {}
          {result.uploader && result.currentWallet && (
            (() => {
              const isOwner = result.uploader.toLowerCase() === result.currentWallet.toLowerCase();
              return (
                <div className={`rp__row rp__row--status ${isOwner ? 'rp__row--success' : 'rp__row--warning'}`}>
                  <div className="rp__row-icon">
                    {isOwner ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    )}
                  </div>
                  <div className="rp__row-body">
                    <span className="rp__label">Ownership</span>
                    <span className="rp__value">
                      {isOwner ? 'You are the original uploader' : 'Uploaded by another wallet'}
                    </span>
                  </div>
                </div>
              );
            })()
          )}

          {}
          <button className="rp__clear" onClick={onDismiss}>
            Clear result
          </button>
        </div>
      )}
    </section>
  );
}
