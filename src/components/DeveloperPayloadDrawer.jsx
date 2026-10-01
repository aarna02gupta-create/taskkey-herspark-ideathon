import React, { useState } from 'react';
import { Code, Copy, Check, X, Shield, Terminal } from 'lucide-react';
import { developerPayload } from '../data/mockData';

export const DeveloperPayloadDrawer = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(developerPayload, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="card-chic max-w-2xl w-full p-6 shadow-pop border-2 max-h-[85vh] flex flex-col animate-pop-in" style={{ borderColor: 'var(--brand-pink)' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl" style={{ background: 'var(--brand-pink-light)', color: 'var(--brand-pink)' }}>
              <Code size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>Developer Policy Payload</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--badge-green-bg)] text-[var(--badge-green-text)]">
                  Cryptographically Signed
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">Backend enforcement policy generated for task #tsk_001</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopy}
              className="btn-outline-subtle text-xs py-1.5 px-3"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-[var(--bg-surface-subtle)] text-[var(--text-dim)]"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Attack Surface Summary Box */}
        <div className="my-3 p-3 rounded-xl border grid grid-cols-3 gap-3 text-center text-xs" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
          <div>
            <p className="text-xs text-[var(--text-muted)]">Traditional Manager Role</p>
            <p className="text-base font-extrabold text-red-500">82% Exposure</p>
          </div>
          <div className="border-x" style={{ borderColor: 'var(--border-subtle)' }}>
            <p className="text-xs text-[var(--text-muted)]">TaskKey Isolation</p>
            <p className="text-base font-extrabold text-emerald-500">12% Exposure</p>
          </div>
          <div>
            <p className="text-xs text-[var(--text-muted)]">Attack Surface Cut</p>
            <p className="text-base font-extrabold text-[var(--brand-pink)]">85.3% Reduced</p>
          </div>
        </div>

        {/* JSON Code Box */}
        <div className="flex-1 overflow-auto rounded-xl p-4 font-mono text-[11px] leading-relaxed border" style={{ background: '#181216', color: '#F8B4BD', borderColor: 'var(--border-subtle)' }}>
          <pre>{jsonString}</pre>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
          <span className="text-[11px] text-[var(--text-dim)] flex items-center gap-1">
            <Shield size={13} className="text-[var(--brand-pink)]" />
            Zero-Trust API Gateway enforces record-level authorization.
          </span>
          <button onClick={onClose} className="btn-pink-primary text-xs py-1.5 px-4">
            Close Payload
          </button>
        </div>
      </div>
    </div>
  );
};
