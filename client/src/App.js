import React, { useState } from 'react';
import axios from 'axios';
import UploadArea from './components/UploadArea';
import ResultPanel from './components/ResultPanel';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const upload = async () => {
    if (!file) {
      setResult({ type: 'error', message: 'Please select a file first.' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post('http://localhost:4000/upload', formData);
      const data = res.data;

      setResult({
        type: 'success',
        message: 'File uploaded & hash stored on the blockchain.',
        hash: data.hash || '',
        txHash: data.transactionHash || '',
        uploader: data.uploader || null,
        timestamp: data.timestamp || null,
        blockNumber: data.blockNumber || null,
        currentWallet: data.currentWallet || null,
      });
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message;
      setResult({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  
  const verify = async () => {
    if (!file) {
      setResult({ type: 'error', message: 'Please select a file first.' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post('http://localhost:4000/verify', formData);
      const data = res.data;

      if (data.valid) {
        setResult({
          type: 'success',
          message: 'File integrity verified — the file has not been tampered with.',
          hash: data.hash || '',
          uploader: data.uploader || null,
          timestamp: data.timestamp || null,
          currentWallet: data.currentWallet || null,
        });
      } else {
        setResult({
          type: 'error',
          message: 'Verification failed — the file may have been tampered with or was never registered.',
        });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message;
      setResult({ type: 'error', message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {}
      <div className="app__glow app__glow--1" aria-hidden="true" />
      <div className="app__glow app__glow--2" aria-hidden="true" />

      <div className="app__shell">
        {}
        <header className="app__header">
          <div className="app__header-left">
            <div className="app__logo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <div>
              <h1 className="app__title">Secure File Upload & Verify</h1>
              <p className="app__subtitle">Blockchain-powered file integrity verification</p>
            </div>
          </div>
          <div className="app__pills">
            <span className="pill">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              SHA-256
            </span>
            <span className="pill">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              Smart Contract
            </span>
            <span className="pill">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Tamper-proof
            </span>
          </div>
        </header>

        {}
        <main className="app__grid">
          {}
          <section className="panel panel--upload">
            <h2 className="panel__heading">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Select File
            </h2>

            <UploadArea file={file} onFileSelect={setFile} />

            <div className="panel__actions">
              <button
                id="upload-btn"
                className="btn btn--primary"
                onClick={upload}
                disabled={loading}
              >
                {loading ? (
                  <span className="btn__loader" />
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                )}
                Upload
              </button>
              <button
                id="verify-btn"
                className="btn btn--secondary"
                onClick={verify}
                disabled={loading}
              >
                {loading ? (
                  <span className="btn__loader" />
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                )}
                Verify
              </button>
            </div>
          </section>

          {}
          <ResultPanel result={result} loading={loading} onDismiss={() => setResult(null)} />
        </main>
      </div>
    </div>
  );
}

export default App;