import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Bot, 
  ShieldCheck, 
  ShieldAlert, 
  Shield, 
  Check, 
  KeyRound, 
  Clock, 
  FileText, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  TrendingUp,
  Ban,
  UserCheck,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserAvatar } from './Illustrations';

export const InteractiveDemoModal = ({ 
  isOpen, 
  onClose, 
  onCompleteDemo 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const stepDurations = [3600, 3200, 3600, 3400, 3600, 3400, 3800, 3800];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setIsPlaying(true);
      return;
    }

    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (currentStep < 7) {
        setCurrentStep(prev => prev + 1);
        if (currentStep === 3) {
          try {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.6 }
            });
          } catch {}
        }
      } else {
        setIsPlaying(false);
      }
    }, stepDurations[currentStep] || 3500);

    return () => clearTimeout(timer);
  }, [isOpen, currentStep, isPlaying]);

  if (!isOpen) return null;

  const stepsInfo = [
    { title: '1. Create Task', subtitle: 'Owner describes natural intent' },
    { title: '2. AI Analysis', subtitle: 'TaskKey calculates minimum boundary' },
    { title: '3. Safe Scope', subtitle: '83% less access exposure' },
    { title: '4. Owner Approves', subtitle: 'Single-click cryptographic grant' },
    { title: '5. Access Issued', subtitle: 'Time-limited token for Priya' },
    { title: '6. Member Works', subtitle: 'Order #1041 processed successfully' },
    { title: '7. Refund Blocked', subtitle: 'Zero-trust runtime interception' },
    { title: '8. Audit Logged', subtitle: 'Immutable chronological trace' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-3xl rounded-3xl border shadow-pop p-6 sm:p-8 space-y-6 animate-pop-in relative overflow-hidden flex flex-col"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-strong)', minHeight: '520px' }}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-[var(--brand-pink)] animate-ping-soft" />
            <span className="text-xs font-black uppercase tracking-wider text-[var(--brand-pink)]">
              TaskKey Automated Product Demonstration
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all hover:border-[var(--brand-pink)]"
              style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
            >
              {isPlaying ? <><Pause size={13} /> Pause</> : <><Play size={13} /> Resume</>}
            </button>
            <button
              onClick={() => { setCurrentStep(0); setIsPlaying(true); }}
              className="p-1.5 rounded-xl border text-[var(--text-muted)] hover:text-[var(--brand-pink)] transition-all"
              style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}
              title="Restart Demo"
            >
              <RotateCcw size={15} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-subtle)] transition-all ml-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Story Stage Content */}
        <div className="flex-1 flex flex-col justify-center py-2 relative">
          
          {/* STEP 1: CREATE TASK */}
          {currentStep === 0 && (
            <div className="space-y-4 animate-pop-in text-center sm:text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--brand-pink)] bg-[var(--brand-peach)] px-3 py-1 rounded-full">
                  STEP 1: OWNER DESCRIBES TASK
                </span>
                <span className="text-xs font-mono text-[var(--text-dim)]">Stage 1 of 8</span>
              </div>

              <div className="p-6 rounded-2xl border space-y-3" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-3">
                  <UserAvatar name="Riya Sharma" size={44} />
                  <div>
                    <h3 className="text-sm font-black" style={{ color: 'var(--text-main)' }}>Riya Sharma (Business Owner)</h3>
                    <p className="text-xs text-[var(--text-muted)]">Couture Studio • Assigning to Priya</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border bg-[var(--bg-surface)] shadow-inner" style={{ borderColor: 'var(--brand-pink)' }}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-pink)] mb-1">
                    Natural Language Business Intent:
                  </p>
                  <p className="text-lg sm:text-xl font-black italic" style={{ color: 'var(--text-main)' }}>
                    “Process today's 5 orders for me.”
                  </p>
                </div>
              </div>

              <p className="text-xs text-[var(--text-muted)] text-center font-medium">
                The business owner assigns what needs to be done without manually configuring complex database permissions.
              </p>
            </div>
          )}

          {/* STEP 2: AI UNDERSTANDS INTENT */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-pop-in text-center">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--brand-pink)] bg-[var(--brand-peach)] px-3 py-1 rounded-full">
                STEP 2: TASKKEY AI DECOMPOSES TASK
              </span>

              <div className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center text-white shadow-glow animate-ai-glow" style={{ background: 'linear-gradient(135deg, var(--brand-pink) 0%, var(--brand-pink-dark) 100%)' }}>
                <Bot size={34} />
              </div>

              <div className="max-w-md mx-auto p-4 rounded-2xl border text-left space-y-2 text-xs" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
                <p className="font-bold text-emerald-600">✓ Identified Intent: E-Commerce Order Fulfillment</p>
                <p className="font-bold text-emerald-600">✓ Required Endpoints: [orders.read, orders.update_status, items.list]</p>
                <p className="font-bold text-red-600">✕ Excluded Endpoints: [finance.refunds, banking.payouts, customer.pii]</p>
              </div>

              <p className="text-xs text-[var(--text-muted)] font-medium">
                TaskKey AI translates plain English into strict least-privilege API boundaries.
              </p>
            </div>
          )}

          {/* STEP 3: SAFE ACCESS SCOPE GENERATED */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-pop-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  STEP 3: ACCESS SCOPE GENERATED
                </span>
                <span className="text-xs font-extrabold text-emerald-600">83% Less Access Exposure</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl border bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 space-y-1.5 text-xs">
                  <span className="font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">✓ ACCESS REQUIRED</span>
                  <p className="font-bold text-emerald-950 dark:text-emerald-200">✓ orders.read_status</p>
                  <p className="font-bold text-emerald-950 dark:text-emerald-200">✓ orders.update_status</p>
                  <p className="font-bold text-emerald-950 dark:text-emerald-200">✓ items.list</p>
                </div>

                <div className="p-4 rounded-2xl border bg-red-50/70 dark:bg-red-950/20 border-red-300 dark:border-red-800 space-y-1.5 text-xs">
                  <span className="font-black text-red-800 dark:text-red-300 uppercase tracking-wider block">✕ NOT REQUIRED (GUARDRAILED)</span>
                  <p className="font-bold text-red-700 dark:text-red-300 line-through">✕ refunds.create</p>
                  <p className="font-bold text-red-700 dark:text-red-300 line-through">✕ payouts.transfer</p>
                  <p className="font-bold text-red-700 dark:text-red-300 line-through">✕ customer.export_pii</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[var(--brand-peach)] text-center text-xs font-extrabold text-[var(--brand-pink)] border border-[var(--border-subtle)]">
                “Only the access required for this task will be issued. Everything else is denied by default.”
              </div>
            </div>
          )}

          {/* STEP 4: OWNER REVIEWS & APPROVES */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-pop-in">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--brand-pink)] bg-[var(--brand-peach)] px-3 py-1 rounded-full">
                STEP 4: OWNER APPROVES IN 1-CLICK
              </span>

              <div className="p-5 rounded-2xl border space-y-3 shadow-md" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--brand-pink)' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-black" style={{ color: 'var(--text-main)' }}>Delegation: Order Processing</h4>
                    <p className="text-xs text-[var(--text-muted)]">Assigned to: Priya • Duration: 42 min</p>
                  </div>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-600 text-white flex items-center gap-1">
                    <Check size={14} /> Approved by Riya
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/80 dark:bg-black/40 border border-emerald-300 text-xs font-mono text-emerald-800 dark:text-emerald-300">
                  SHA-256 Token Policy Signed & Cryptographically Issued
                </div>
              </div>

              <p className="text-xs text-[var(--text-muted)] text-center font-medium">
                The business owner maintains final governance over every delegation.
              </p>
            </div>
          )}

          {/* STEP 5: ACCESS ISSUED TO PRIYA */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-pop-in text-center">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white shadow-glow" style={{ background: 'var(--brand-pink)' }}>
                <KeyRound size={30} />
              </div>

              <div>
                <span className="text-xs font-black uppercase text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                  ✓ ACCESS ISSUED
                </span>
                <h3 className="text-xl font-black mt-2" style={{ color: 'var(--text-main)' }}>
                  Priya can now complete: ORDER PROCESSING
                </h3>
              </div>

              <div className="max-w-sm mx-auto p-3.5 rounded-2xl border text-xs font-mono space-y-1 text-left" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
                <div className="flex justify-between">
                  <span className="text-[var(--text-dim)]">Token:</span>
                  <span className="font-bold text-[var(--brand-pink)]">TK-1041-PR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-dim)]">TTL:</span>
                  <span className="text-emerald-600 font-bold">42 minutes remaining</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: MEMBER WORKS (ALLOWED OPERATION) */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-pop-in">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                STEP 6: PRIYA EXECUTES AUTHORIZED TASK
              </span>

              <div className="p-5 rounded-2xl border space-y-3 bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Order #1041 (₹1,280)</span>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded bg-emerald-600 text-white">✓ ALLOWED</span>
                </div>

                <p className="text-sm font-black text-emerald-950 dark:text-emerald-100">
                  Action: orders.update_status(ID: 1041, DISPATCHED)
                </p>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                  Verified against active task token. Status successfully updated to "Dispatched".
                </p>
              </div>
            </div>
          )}

          {/* STEP 7: UNAUTHORIZED REFUND ATTEMPT BLOCKED */}
          {currentStep === 6 && (
            <div className="space-y-4 animate-pop-in">
              <span className="text-xs font-extrabold uppercase tracking-wider text-red-700 bg-red-100 px-3 py-1 rounded-full">
                STEP 7: UNAUTHORIZED ACTION INTERCEPTED
              </span>

              <div className="p-5 rounded-2xl border space-y-3 bg-red-50/80 dark:bg-red-950/30 border-red-300 dark:border-red-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-900 dark:text-red-200">Attempted Action: Request Refund ($1,280)</span>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded bg-red-600 text-white">✕ ACCESS BLOCKED</span>
                </div>

                <div className="p-3 rounded-xl bg-red-600 text-white text-xs font-bold space-y-0.5">
                  <p>Runtime Guardrail Enforced: Outside approved task scope.</p>
                  <p className="text-[11px] text-red-100 font-normal">Refunds are locked. Owner funds remain completely protected.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: AUDIT EVENT RECORDED */}
          {currentStep === 7 && (
            <div className="space-y-4 animate-pop-in">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--brand-pink)] bg-[var(--brand-peach)] px-3 py-1 rounded-full">
                STEP 8: IMMUTABLE AUDIT TRAIL LOGGED
              </span>

              <div className="p-5 rounded-2xl border space-y-2.5" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--brand-pink)] font-bold">EVT-2026-1041</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">BLOCKED ATTEMPT</span>
                </div>
                <p className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>
                  Priya attempted <code>finance.refunds.create</code> on Order #1041
                </p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Gateway Decision: DENIED · Reason: Outside approved task scope.
                </p>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    onClose();
                    if (onCompleteDemo) onCompleteDemo();
                  }}
                  className="btn-pink-primary text-xs sm:text-sm py-3 px-6 font-bold inline-flex items-center gap-2 shadow-md"
                >
                  <span>Explore TaskKey Application →</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Step Scrubber */}
        <div className="pt-3 border-t flex items-center justify-between gap-2 overflow-x-auto" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {stepsInfo.map((s, idx) => (
              <button
                key={idx}
                onClick={() => { setCurrentStep(idx); setIsPlaying(false); }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
                  currentStep === idx
                    ? 'bg-[var(--brand-pink)] text-white shadow-xs'
                    : 'text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-subtle)]'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              disabled={currentStep === 0}
              onClick={() => { setCurrentStep(prev => Math.max(0, prev - 1)); setIsPlaying(false); }}
              className="p-1.5 rounded-lg border disabled:opacity-30 text-[var(--text-muted)] hover:text-[var(--brand-pink)]"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <ChevronLeft size={14} />
            </button>
            <button
              disabled={currentStep === 7}
              onClick={() => { setCurrentStep(prev => Math.min(7, prev + 1)); setIsPlaying(false); }}
              className="p-1.5 rounded-lg border disabled:opacity-30 text-[var(--text-muted)] hover:text-[var(--brand-pink)]"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
