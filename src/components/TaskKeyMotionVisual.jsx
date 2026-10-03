import React, { useState, useEffect } from 'react';
import {
  Bot,
  X,
  Lock,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  User,
  FileText,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';

const stepDurations = [3200, 2800, 3000, 3200, 3200, 3400, 3400, 3400];

export const TaskKeyMotionVisual = () => {
  // 8 Steps as requested
  // 0: Task Card Input ("Process today's 5 orders")
  // 1: Move to TaskKey AI Core
  // 2: Understanding Task Scope (Soft pink analysis)
  // 3: Access Scope Generated (✓ Allowed permissions)
  // 4: Guardrails Enforced (✕ Dangerous permissions stripped)
  // 5: Safe Access Created for Priya
  // 6: Unauthorized Attempt (Refund) -> BLOCKED
  // 7: Real-time Live Audit Entry
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);


  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % 8);
    }, stepDurations[currentStep] || 3200);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying]);

  const stepTitles = [
    '1. Task Intent',
    '2. AI Ingestion',
    '3. AI Scoping',
    '4. Allowed Scope',
    '5. Guardrails',
    '6. Safe Access',
    '7. Zero-Trust Block',
    '8. Live Audit'
  ];

  return (
    <div 
      className="w-full rounded-3xl border transition-all relative overflow-hidden shadow-lg flex flex-col"
      style={{ 
        background: 'linear-gradient(170deg, var(--bg-surface) 0%, var(--bg-surface-subtle) 100%)', 
        borderColor: 'var(--border-subtle)',
        minHeight: '440px'
      }}
    >
      {/* Visual Panel Header */}
      <div className="px-5 py-3.5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--brand-pink)] animate-ping-soft" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--brand-pink)]">
            TaskKey Interactive Motion Architecture
          </span>
        </div>

        {/* Playback Controls & Step Badge */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--brand-peach)] text-[var(--brand-pink)] border border-[var(--border-subtle)]">
            Step {currentStep + 1} of 8
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-7 h-7 rounded-lg border flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--brand-pink)] transition-colors"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
            title={isPlaying ? 'Pause demonstration' : 'Play demonstration'}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>
          <button
            onClick={() => setCurrentStep(0)}
            className="w-7 h-7 rounded-lg border flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--brand-pink)] transition-colors"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
            title="Restart animation"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {/* Main Motion Canvas */}
      <div className="flex-1 p-6 flex flex-col justify-center relative">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--brand-pink) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STEP 1: Natural Language Task Card Appears
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStep === 0 && (
          <div className="space-y-4 animate-pop-in">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5"><User size={14} className="text-[var(--brand-pink)]" /> Business Owner Prompt</span>
              <span className="text-[10px] font-extrabold text-[var(--brand-pink)] bg-[var(--brand-peach)] px-2 py-0.5 rounded-full">STEP 1</span>
            </div>

            <div className="p-5 rounded-2xl border-2 space-y-3 shadow-md" style={{ background: 'var(--bg-surface)', borderColor: 'var(--brand-pink)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--brand-pink)] to-[var(--brand-rose)] text-white font-black text-sm flex items-center justify-center">
                  RS
                </div>
                <div>
                  <h4 className="text-sm font-black" style={{ color: 'var(--text-main)' }}>Riya (Owner)</h4>
                  <p className="text-xs text-[var(--text-muted)]">Assigning task to Priya</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border bg-[var(--brand-peach)]" style={{ borderColor: 'var(--border-subtle)' }}>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-pink)] mb-1">
                  Plain English Task Description
                </p>
                <p className="text-base font-extrabold" style={{ color: 'var(--text-main)' }}>
                  “Process today's 5 orders”
                </p>
              </div>
            </div>

            <p className="text-xs text-center text-[var(--text-muted)] font-medium">
              Owner describes what needs to be done — without managing complex permissions.
            </p>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STEP 2: Card Moves Toward TaskKey AI Core
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-pop-in text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--brand-peach)] text-[var(--brand-pink)] border border-[var(--border-subtle)]">
              <Sparkles size={13} />
              <span>STEP 2: INGESTING INTENT INTO TASKKEY AI</span>
            </div>

            <div className="py-4 flex flex-col items-center justify-center gap-4">
              <div className="p-3 px-5 rounded-xl border bg-[var(--bg-surface)] shadow-sm text-xs font-bold" style={{ color: 'var(--text-main)', borderColor: 'var(--border-subtle)' }}>
                “Process today's 5 orders”
              </div>

              <div className="w-0.5 h-6 bg-[var(--brand-pink)] animate-beam relative" />

              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-glow animate-ai-glow" style={{ background: 'linear-gradient(135deg, var(--brand-pink) 0%, var(--brand-pink-dark) 100%)' }}>
                <Bot size={32} />
              </div>
            </div>

            <p className="text-xs text-[var(--text-muted)] font-semibold">
              The AI Core ingests the business task and scans database endpoints.
            </p>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STEP 3: Soft Pink Analysis Effect (UNDERSTANDING TASK...)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-pop-in">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-white shadow-md animate-pulse" style={{ background: 'var(--brand-pink)' }}>
                <Bot size={15} />
                <span>UNDERSTANDING TASK...</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] font-medium">
                Parsing business context, database boundaries & least-privilege scope
              </p>
            </div>

            <div className="p-4 rounded-2xl border space-y-2.5" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold text-[var(--text-muted)]">
                  <span>Semantic Role Analysis</span>
                  <span className="text-[var(--brand-pink)]">Complete (100%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--bg-surface-subtle)] overflow-hidden">
                  <div className="h-full bg-[var(--brand-pink)] rounded-full animate-flow-dash w-full" />
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[var(--brand-peach)] text-[11px] font-mono text-[var(--brand-pink)] border border-[var(--border-subtle)]">
                &gt; Identified Target: [orders:read, orders:write_status] <br />
                &gt; Excluded Targets: [finance:*, refunds:*, users:full_pii]
              </div>
            </div>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STEP 4: Access Scope Generated (✓ Allowed)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-pop-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 size={15} /> STEP 4: PERMITTED ACCESS SCOPE
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                Minimum Privilege
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl border flex items-center justify-between bg-emerald-50/70 border-emerald-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-emerald-950">ORDER PROCESSING</h5>
                    <p className="text-[10px] text-emerald-700 font-mono">orders.update_status(DISPATCHED)</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700">GRANTED</span>
              </div>

              <div className="p-3 rounded-xl border flex items-center justify-between bg-emerald-50/70 border-emerald-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-emerald-950">ORDER STATUS</h5>
                    <p className="text-[10px] text-emerald-700 font-mono">orders.read_status(ID: 1041-1045)</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700">GRANTED</span>
              </div>

              <div className="p-3 rounded-xl border flex items-center justify-between bg-emerald-50/70 border-emerald-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-emerald-950">ORDER DETAILS</h5>
                    <p className="text-[10px] text-emerald-700 font-mono">items.list(SKU, qty, shipping)</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700">GRANTED</span>
              </div>
            </div>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STEP 5: Unnecessary Permissions Stripped (✕ Blocked)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-pop-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                <Lock size={15} /> STEP 5: SENSITIVE PERMISSIONS STRIPPED
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                Guardrailed
              </span>
            </div>

            <div className="space-y-2 opacity-90">
              <div className="p-3 rounded-xl border flex items-center justify-between bg-red-50/70 border-red-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                    ✕
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-red-950 line-through">REFUNDS</h5>
                    <p className="text-[10px] text-red-700 font-mono">finance.issue_refund (*)</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-red-700">EXCLUDED</span>
              </div>

              <div className="p-3 rounded-xl border flex items-center justify-between bg-red-50/70 border-red-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                    ✕
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-red-950 line-through">PAYOUTS</h5>
                    <p className="text-[10px] text-red-700 font-mono">banking.transfer_funds (*)</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-red-700">EXCLUDED</span>
              </div>

              <div className="p-3 rounded-xl border flex items-center justify-between bg-red-50/70 border-red-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                    ✕
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-red-950 line-through">CUSTOMER DATA</h5>
                    <p className="text-[10px] text-red-700 font-mono">customers.export_pii (*)</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-red-700">EXCLUDED</span>
              </div>
            </div>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STEP 6: Safe Access Created for Priya
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-pop-in">
            <div className="p-5 rounded-2xl border-2 space-y-3 shadow-md" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
                  <ShieldCheck size={14} /> SAFE ACCESS CREATED
                </span>
                <span className="text-[10px] font-mono text-[var(--text-dim)]">TTL: 30 Mins</span>
              </div>

              <div className="flex items-center gap-3.5 pt-1">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-black text-sm flex items-center justify-center shadow-sm">
                  PK
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black" style={{ color: 'var(--text-main)' }}>PRIYA</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--bg-surface-subtle)] text-[var(--text-muted)]">
                      Team Member
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">Assigned: "Process today's 5 orders"</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[var(--badge-green-bg)] border border-[var(--badge-green-border)] text-xs flex items-center justify-between">
                <span className="text-[var(--badge-green-text)] font-bold">Scoped Token Active</span>
                <span className="font-mono text-[10px] text-[var(--text-muted)]">TK-TOK-8841-SEC</span>
              </div>
            </div>

            <p className="text-xs text-center text-[var(--text-muted)] font-medium">
              Priya receives a time-bound scoped link. No master password shared.
            </p>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STEP 7: Small Unauthorized Action -> ACCESS BLOCKED
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStep === 6 && (
          <div className="space-y-4 animate-pop-in">
            <div className="p-5 rounded-2xl border-2 space-y-3 shadow-md bg-red-50/80 border-red-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-red-600 text-white flex items-center gap-1">
                  <ShieldAlert size={14} /> ZERO-TRUST INTERCEPTION
                </span>
                <span className="text-[10px] font-bold text-red-700">Rule Violation</span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-red-200">
                <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">Attempted Action:</p>
                <p className="text-sm font-bold text-gray-900">REQUEST REFUND for Order #1041 (₹1,280)</p>
              </div>

              <div className="p-3 rounded-xl bg-red-600 text-white text-xs space-y-1 shadow-sm">
                <div className="flex items-center gap-1.5 font-black text-sm">
                  <X size={16} /> ACCESS BLOCKED
                </div>
                <p className="text-[11px] text-red-100">
                  “Outside approved task scope. Token only permits status & processing.”
                </p>
              </div>
            </div>

            <p className="text-xs text-center text-red-600 font-semibold">
              The business owner’s funds and sensitive settings remain 100% protected.
            </p>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STEP 8: Event Enters Live Audit Trail
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {currentStep === 7 && (
          <div className="space-y-4 animate-pop-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[var(--brand-pink)] flex items-center gap-1.5">
                <FileText size={15} /> STEP 8: RECORDED IN LIVE AUDIT TRAIL
              </span>
              <span className="text-[10px] font-mono text-[var(--text-dim)]">Just now</span>
            </div>

            <div className="p-4 rounded-2xl border space-y-2.5 shadow-md" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>Priya (Helper)</span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                  BLOCKED
                </span>
              </div>

              <p className="text-xs font-semibold" style={{ color: 'var(--text-main)' }}>
                Attempted <code>finance:refund</code> on Order #1041
              </p>

              <div className="p-2 rounded-lg bg-[var(--bg-surface-subtle)] text-[10px] font-mono text-[var(--text-muted)] flex justify-between">
                <span>Guardrail Policy: TK-POLICY-402</span>
                <span className="text-[var(--brand-pink)] font-bold">Logged to Immutable Trail</span>
              </div>
            </div>

            <div className="text-center pt-1">
              <span className="text-[11px] font-bold text-[var(--brand-pink)] animate-pulse">
                ↺ Loop repeating demonstration...
              </span>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Timeline Step Scrubber */}
      <div className="px-4 py-2.5 border-t bg-[var(--bg-surface-subtle)] flex items-center justify-between gap-1 overflow-x-auto" style={{ borderColor: 'var(--border-subtle)' }}>
        {stepTitles.map((title, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentStep(idx);
              setIsPlaying(false);
            }}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
              currentStep === idx
                ? 'bg-[var(--brand-pink)] text-white shadow-xs'
                : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)]'
            }`}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
};
