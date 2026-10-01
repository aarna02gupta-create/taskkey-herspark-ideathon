import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Layers,
  FileCheck2,
  Calendar,
  Sparkle
} from 'lucide-react';
import { UserAvatar } from '../Illustrations';

// Screen 4: Step 1 - Describe Task
export const AssignStep1Describe = ({ helperName = "Riya Sharma", onNext, initialText = "" }) => {
  const [taskText, setTaskText] = useState(initialText || "Please dispatch orders #101–105 by 6 PM today.");

  const suggestions = [
    "Dispatch today's pending orders",
    "Update Summer Silk inventory counts",
    "Reply to WhatsApp customer inquiries"
  ];

  return (
    <div className="card-chic p-6 max-w-xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-pink)]">Step 1 of 3</span>
          <h3 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>
            Assign Task to {helperName}
          </h3>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--brand-pink-light)', color: 'var(--brand-pink)' }}>
          <Sparkles size={16} />
        </div>
      </div>

      <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
        Tell us what you need her to do in plain words. TaskKey's AI will calculate the minimum safe permissions.
      </p>

      {/* Task input with Pre-filled Demo text */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--text-dim)' }}>
          Task Description
        </label>
        <textarea
          rows={3}
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="e.g. Dispatch today's pending orders, update inventory..."
          className="w-full p-3.5 rounded-xl text-sm border outline-none font-medium leading-relaxed resize-none focus:border-[var(--brand-pink)] transition-all"
          style={{ 
            background: 'var(--bg-surface-subtle)', 
            borderColor: 'var(--border-strong)',
            color: 'var(--text-main)'
          }}
        />
      </div>

      {/* Quick Demo Fillers */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold" style={{ color: 'var(--text-dim)' }}>✨ Click to autofill presentation demo:</span>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setTaskText(s)}
              className="text-xs px-2.5 py-1 rounded-lg border font-medium transition-all hover:border-[var(--brand-pink)]"
              style={{
                background: taskText === s ? 'var(--brand-pink-light)' : 'var(--bg-surface)',
                color: taskText === s ? 'var(--brand-pink)' : 'var(--text-muted)',
                borderColor: taskText === s ? 'var(--brand-pink)' : 'var(--border-subtle)'
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Subtle cute notice */}
      <div className="p-3 rounded-xl flex items-center gap-3 text-xs" style={{ background: 'var(--brand-peach)', border: '1px dashed var(--brand-pink)' }}>
        <div className="p-1.5 rounded-full bg-white text-[var(--brand-pink)] shadow-sm">
          <Sparkle size={14} />
        </div>
        <p className="font-semibold" style={{ color: 'var(--text-main)' }}>
          Just describe your task naturally. We'll automatically isolate the exact order IDs and block access to payments & settings.
        </p>
      </div>

      <button 
        onClick={() => onNext(taskText)} 
        disabled={!taskText.trim()}
        className="w-full btn-pink-primary py-3 justify-center text-sm font-bold"
      >
        <span>Continue to AI Permissions</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

// Screen 5: Step 2 - AI Suggests Permissions
export const AssignStep2AISuggest = ({ onNext, onBack, onInspectDiff }) => {
  const [showWhy, setShowWhy] = useState(false);

  return (
    <div className="card-chic p-6 max-w-xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-pink)]">Step 2 of 3</span>
          <h3 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>
            AI Suggests Permissions
          </h3>
        </div>
        <div className="p-2 rounded-xl flex items-center gap-1.5" style={{ background: 'var(--brand-pink-light)', color: 'var(--brand-pink)' }}>
          <Bot size={18} />
          <span className="text-xs font-bold">Smart Isolation</span>
        </div>
      </div>

      {/* Task Detected Card */}
      <div className="p-3.5 rounded-xl border flex items-center justify-between" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-dim)]">Task Detected</p>
            <p className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>Dispatch today's pending orders (#101–105)</p>
          </div>
        </div>
      </div>

      {/* Permissions Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Suggested Access (Green) */}
        <div className="p-4 rounded-xl border space-y-2.5" style={{ background: 'var(--badge-green-bg)', borderColor: 'var(--badge-green-border)' }}>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--badge-green-text)] uppercase tracking-wider">
            <CheckCircle2 size={15} />
            <span>Suggested Access</span>
          </div>
          <ul className="space-y-1.5 text-xs font-semibold text-[var(--text-main)]">
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span> View pending orders (#101–105)
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span> Update dispatch status
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-emerald-600 font-bold">✓</span> Add dispatch note
            </li>
          </ul>
        </div>

        {/* Blocked Access (Red) */}
        <div className="p-4 rounded-xl border space-y-2.5" style={{ background: 'var(--badge-red-bg)', borderColor: 'var(--badge-red-border)' }}>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--badge-red-text)] uppercase tracking-wider">
            <XCircle size={15} />
            <span>Blocked Access</span>
          </div>
          <ul className="space-y-1.5 text-xs font-semibold text-[var(--text-main)]">
            <li className="flex items-center gap-1.5 text-red-600">
              <span>✕</span> Refunds & Chargebacks
            </li>
            <li className="flex items-center gap-1.5 text-red-600">
              <span>✕</span> Payments & Bank Info
            </li>
            <li className="flex items-center gap-1.5 text-red-600">
              <span>✕</span> Customer export data
            </li>
            <li className="flex items-center gap-1.5 text-red-600">
              <span>✕</span> Store settings & accounts
            </li>
          </ul>
        </div>
      </div>

      {/* Time & Explanation Accordion */}
      <div className="flex items-center justify-between text-xs font-semibold p-3 rounded-xl border" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}>
        <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
          <Clock size={15} style={{ color: 'var(--brand-pink)' }} />
          <span>Estimated time to complete: <strong style={{ color: 'var(--text-main)' }}>~ 2 hours</strong></span>
        </div>
        <button 
          onClick={() => setShowWhy(!showWhy)} 
          className="flex items-center gap-1 text-[var(--brand-pink)] hover:underline"
        >
          <span>Why these permissions?</span>
          {showWhy ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {showWhy && (
        <div className="p-3.5 rounded-xl text-xs space-y-1.5 animate-fade-in" style={{ background: 'var(--brand-peach)', color: 'var(--text-main)' }}>
          <p className="font-bold">Least-Privilege Principle Enforcement:</p>
          <p className="text-[var(--text-muted)]">
            Marking 5 orders as dispatched requires read/write only on dispatch tracking flags. Refunds and customer PI data are cryptographically stripped from the helper's session token.
          </p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="btn-outline-subtle text-xs py-3 px-4">
          Back
        </button>
        <button onClick={onNext} className="flex-1 btn-pink-primary py-3 justify-center text-sm font-bold">
          <span>Continue to Set Duration</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

// Screen 6: Step 3 - Set Duration
export const AssignStep3Duration = ({ onNext, onBack }) => {
  const [selectedDuration, setSelectedDuration] = useState('2 hrs');
  const presets = ['30 min', '1 hr', '2 hrs', '4 hrs', 'Custom'];

  return (
    <div className="card-chic p-6 max-w-xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-pink)]">Step 3 of 3</span>
          <h3 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>
            Set Access Duration
          </h3>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--brand-pink-light)', color: 'var(--brand-pink)' }}>
          <Clock size={16} />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>
          How long should Riya have access?
        </h4>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          We recommend <strong>2 hours</strong> based on the scope of 5 pending orders.
        </p>
      </div>

      {/* Duration Pills */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
        {presets.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setSelectedDuration(d)}
            className={`py-3 px-2 rounded-xl text-xs font-bold text-center border transition-all ${
              selectedDuration === d 
                ? 'border-[var(--brand-pink)] bg-[var(--brand-pink)] text-white shadow-md' 
                : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-main)] hover:border-[var(--brand-pink)]'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Expiry Notification Card */}
      <div className="p-4 rounded-xl flex items-center gap-3.5 border" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
        <div className="p-2 rounded-lg" style={{ background: 'var(--brand-pink-light)', color: 'var(--brand-pink)' }}>
          <Calendar size={18} />
        </div>
        <div>
          <p className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>
            Access will automatically expire at <span className="text-[var(--brand-pink)]">2:00 PM (in 2 hours)</span>.
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
            You can revoke access immediately at any second with the Owner Kill-Switch.
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="btn-outline-subtle text-xs py-3 px-4">
          Back
        </button>
        <button onClick={onNext} className="flex-1 btn-pink-primary py-3 justify-center text-sm font-bold">
          <ShieldCheck size={17} />
          <span>Assign Securely →</span>
        </button>
      </div>
    </div>
  );
};

// Screen 7: Permission Diff (Red vs Green)
export const PermissionDiffScreen = ({ onProceed }) => {
  return (
    <div className="card-chic p-6 max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-pink)]">Innovation • Problem Analysis</span>
          <h3 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>
            Permission Comparison (Diff)
          </h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-[var(--brand-peach)] text-[var(--brand-pink)]">
          Task: Dispatch Orders #101–105
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* GREEN: What Riya CAN do */}
        <div className="p-5 rounded-2xl border space-y-4" style={{ background: 'var(--badge-green-bg)', borderColor: 'var(--badge-green-border)' }}>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--badge-green-text)]">
            <CheckCircle2 size={17} />
            <span>What Riya CAN do</span>
          </div>

          <div className="space-y-2.5 text-xs font-semibold text-[var(--text-main)]">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 dark:bg-black/20">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
              <span>View orders (#101–105)</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 dark:bg-black/20">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
              <span>Update dispatch status</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 dark:bg-black/20">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
              <span>Add dispatch note</span>
            </div>
          </div>
        </div>

        {/* RED: What Riya CANNOT do */}
        <div className="p-5 rounded-2xl border space-y-4" style={{ background: 'var(--badge-red-bg)', borderColor: 'var(--badge-red-border)' }}>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--badge-red-text)]">
            <XCircle size={17} />
            <span>What Riya CANNOT do</span>
          </div>

          <div className="space-y-2.5 text-xs font-semibold text-[var(--text-main)]">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 dark:bg-black/20 text-red-600">
              <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold">✕</span>
              <span>Process refunds</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 dark:bg-black/20 text-red-600">
              <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold">✕</span>
              <span>Access payments</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 dark:bg-black/20 text-red-600">
              <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold">✕</span>
              <span>Export customers</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 dark:bg-black/20 text-red-600">
              <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold">✕</span>
              <span>Change settings</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Reasoning Box */}
      <div className="p-4 rounded-xl border flex items-start gap-3" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
        <Bot size={20} className="text-[var(--brand-pink)] flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-bold text-[var(--text-main)]">AI Reasoning & Scope Isolation</p>
          <p className="text-[var(--text-muted)] mt-0.5">
            These permissions are mathematically the exact minimum required to complete the task "Dispatch orders #101–105". All payment credentials and unrelated customer records remain strictly locked.
          </p>
        </div>
      </div>

      {onProceed && (
        <button onClick={onProceed} className="w-full btn-pink-primary py-3 justify-center text-sm font-bold">
          <span>Confirm and Grant Access</span>
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
};

// Screen 8: Task Assigned Successfully
export const TaskAssignedSuccessScreen = ({ onOpenLiveTask }) => {
  return (
    <div className="card-chic p-8 max-w-lg mx-auto text-center space-y-6 animate-pop-in">
      {/* Animated Checkmark badge */}
      <div className="relative inline-flex items-center justify-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, var(--brand-pink) 0%, var(--brand-rose) 100%)', color: '#FFFFFF' }}>
          <Check size={40} strokeWidth={3} />
        </div>
        <div className="absolute -top-1 -right-1 text-2xl animate-bounce">✨</div>
      </div>

      <div>
        <h3 className="text-2xl font-bold" style={{ color: 'var(--text-main)', fontFamily: 'Playfair Display, serif' }}>
          Task Assigned!
        </h3>
        <p className="text-xs font-medium mt-1" style={{ color: 'var(--text-muted)' }}>
          Riya has been granted secure, task-specific access.
        </p>
      </div>

      {/* Helper Card */}
      <div className="p-4 rounded-2xl border text-left flex items-center justify-between" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-3">
          <UserAvatar name="Riya Sharma" size={46} />
          <div>
            <h4 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>Riya Sharma</h4>
            <p className="text-xs font-semibold text-[var(--brand-pink)]">Dispatch Orders #101–105</p>
            <p className="text-[11px] text-[var(--text-dim)] flex items-center gap-1 mt-0.5">
              <Clock size={12} /> Valid for 2 hours (until 2:00 PM)
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--badge-green-bg)] text-[var(--badge-green-text)] block">
            Active
          </span>
          <span className="text-[10px] italic text-[var(--text-dim)] mt-1 block">Simple. Secure. Smart.</span>
        </div>
      </div>

      <button onClick={onOpenLiveTask} className="w-full btn-pink-primary py-3.5 text-sm font-bold justify-center shadow-lg">
        <span>View Live Task (Helper Side)</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};
