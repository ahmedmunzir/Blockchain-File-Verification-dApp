import React, { useRef, useState, useMemo } from 'react';
import './UploadArea.css';


const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp'];

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function fileIcon(type) {
  if (IMAGE_TYPES.includes(type)) return '🖼️';
  if (type === 'application/pdf') return '📄';
  if (type.startsWith('text/')) return '📝';
  if (type.startsWith('video/')) return '🎬';
  if (type.startsWith('audio/')) return '🎵';
  if (type.includes('zip') || type.includes('tar') || type.includes('rar')) return '📦';
  return '📁';
}


export default function UploadArea({ file, onFileSelect }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const isImage = file && IMAGE_TYPES.includes(file.type);

  const preview = useMemo(() => {
    if (file && isImage) return URL.createObjectURL(file);
    return null;
  }, [file, isImage]);

  
  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setDragOver(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      id="upload-area"
      className={`upload-area${dragOver ? ' drag-over' : ''}${file ? ' has-file' : ''}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      aria-label="Upload file area"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
    >
      <input
        ref={inputRef}
        type="file"
        id="file-input"
        onChange={(e) => { if (e.target.files[0]) onFileSelect(e.target.files[0]); }}
      />

      {file ? (
        <div className="upload-area__preview">
          {isImage && preview ? (
            <img src={preview} alt="Preview" className="upload-area__thumb" />
          ) : (
            <span className="upload-area__icon">{fileIcon(file.type)}</span>
          )}
          <div className="upload-area__meta">
            <span className="upload-area__filename">{file.name}</span>
            <span className="upload-area__size">{formatBytes(file.size)}</span>
          </div>
          <span className="upload-area__change">Click or drop to change</span>
        </div>
      ) : (
        <div className="upload-area__empty">
          <div className="upload-area__circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <span className="upload-area__label">
            Drop your file here or <span className="upload-area__browse">browse</span>
          </span>
          <span className="upload-area__hint">Supports all file types</span>
        </div>
      )}
    </div>
  );
}
