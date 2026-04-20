import React, { useEffect, useState, useCallback } from 'react';
import './ToastNotification.css';


function Toast({ id, type, message, onRemove }) {
  const [exiting, setExiting] = useState(false);

  const close = useCallback(() => {
    setExiting(true);
    setTimeout(() => onRemove(id), 320);
  }, [id, onRemove]);

  useEffect(() => {
    const timer = setTimeout(close, 4000);
    return () => clearTimeout(timer);
  }, [close]);

  return (
    <div className={`toast toast--${type}${exiting ? ' toast--exit' : ''}`} role="alert">
      <span className="toast__icon">
        {type === 'success' ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </span>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={close} aria-label="Dismiss notification">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}


export default function ToastContainer({ toasts, removeToast }) {
  if (!toasts.length) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onRemove={removeToast} />
      ))}
    </div>
  );
}
