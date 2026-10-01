import React from 'react';
import { X, Award, CheckCircle2, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

export const CriteriaModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const features = [
    { num: 1, name: 'Task input with pre-filled demo text', criteria: 'Presentation Coherence', desc: 'Eliminates live-typing risk and guarantees smooth demo delivery.' },
    { num: 2, name: 'Permission diff (Red vs Green)', criteria: 'Innovation & Problem Analysis', desc: 'Visual proof of least-privilege scoping: Allowed vs Blocked.' },
    { num: 3, name: 'Exposure meter animating down', criteria: 'Innovation, Scalability & Impact', desc: 'Memorable metric: 82% store exposure reduced down to 12%.' },
    { num: 4, name: 'Split screen + Shared audit log', criteria: 'Feasibility & Technical Feasibility', desc: 'Real-time synchronization between Owner governance and Helper tasks.' },
    { num: 5, name: 'Ghost UI (Locked tabs on Helper)', criteria: 'Innovation & UX', desc: 'Inaccessible sections (Refunds, Payments, Customers) clearly locked.' },
    { num: 6, name: 'Denied-action red alert ("Not today!")', criteria: 'Innovation & Hard Security Enforcement', desc: 'Highest-impact moment proving backend authorization rules are strictly enforced.' },
    { num: 7, name: 'Countdown + Auto-expiry', criteria: 'Feasibility & Security Hygiene', desc: 'Zero lingering access tokens — automatic expiry when timer elapses.' },
    { num: 8, name: 'Revoke / Kill-Switch button', criteria: 'Scalability & Impact', desc: 'Owner stays in absolute control at any moment with instant session invalidation.' },
    { num: 9, name: 'Aftermath summary card with real numbers', criteria: 'Scalability & Impact, Knowledge & Research', desc: 'Clear before/after metrics: 5 Orders updated, 0 Blocked leaks, 100% completion.' },
    { num: 10, name: 'Developer payload toggle', criteria: 'Technical Feasibility', desc: 'Concrete JSON cryptographic policy inspectable on demand for technical judges.' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="card-chic max-w-2xl w-full p-6 shadow-pop border-2 max-h-[85vh] flex flex-col animate-pop-in" style={{ borderColor: 'var(--brand-pink)' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[var(--brand-pink-light)] text-[var(--brand-pink)]">
              <Award size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>
                Hackathon Evaluation Criteria & Feature Mapping
              </h3>
              <p className="text-xs text-[var(--text-muted)]">Track 2: Women at the Tech Frontier • Team Algo Amigos</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--bg-surface-subtle)] text-[var(--text-dim)]">
            <X size={18} />
          </button>
        </div>

        {/* Feature List */}
        <div className="flex-1 overflow-y-auto my-3 space-y-2.5 pr-1">
          {features.map((f) => (
            <div key={f.num} className="p-3 rounded-xl border text-xs space-y-1" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[var(--brand-pink)] text-white font-bold flex items-center justify-center text-[10px]">
                    {f.num}
                  </span>
                  <span className="font-bold" style={{ color: 'var(--text-main)' }}>{f.name}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--badge-green-bg)] text-[var(--badge-green-text)]">
                  {f.criteria}
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] pl-7">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
          <span className="text-[11px] font-medium text-[var(--text-muted)]">
            "Delegate the task. Keep the business."
          </span>
          <button onClick={onClose} className="btn-pink-primary text-xs py-1.5 px-4">
            Close Checklist
          </button>
        </div>
      </div>
    </div>
  );
};
