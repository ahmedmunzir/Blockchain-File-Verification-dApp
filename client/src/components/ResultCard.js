import React from 'react';
import './ResultCard.css';

function shortenHash(hash) {
  if (!hash || hash.length < 16) return hash;
  return hash.slice(0, 10) + '···' + hash.slice(-8);
}

export default function ResultCard({ type, message, hash, txHash, onDismiss }) {
  const isSuccess = type === 'success';

  return (
    <div
      id="result-card"
      className={`result-card result-card--${type}`}
      role="status"
      aria-live="polite"
    >
      {}
      <button className="result-card__close" onClick={onDismiss} aria-label="Dismiss result">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {}
      <div className="result-card__icon">
        {isSuccess ? (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        )}
      </div>

      {}
      <div className="result-card__body">
        <h3 className="result-card__title">{isSuccess ? 'Success' : 'Error'}</h3>
        <p className="result-card__message">{message}</p>

        {hash && (
          <div className="result-card__detail">
            <span className="result-card__label">File Hash</span>
            <code className="result-card__hash" title={hash}>{hash}</code>
          </div>
        )}

        {txHash && (
          <div className="result-card__detail">
            <span className="result-card__label">Transaction</span>
            <code className="result-card__hash" title={txHash}>{shortenHash(txHash)}</code>
          </div>
        )}
      </div>
    </div>
  );
}
