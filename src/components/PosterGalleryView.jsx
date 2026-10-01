import React, { useState } from 'react';
import { 
  Maximize2, 
  Sparkles, 
  ExternalLink, 
  Bot, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  Calendar,
  Check,
  Ban,
  ArrowRight
} from 'lucide-react';
import { initialOrders, teamMembers, initialAuditLog } from '../data/mockData';
import { UserAvatar, OwnerHeroIllustration, DeniedActionIllustration } from './Illustrations';

export const PosterGalleryView = ({ onSelectScreen }) => {
  const [activeModalScreen, setActiveModalScreen] = useState(null);

  const screens = [
    { id: 1, title: '1. Dashboard', desc: 'Owner high-level governance, KPIs & quick action', category: 'Overview' },
    { id: 2, title: '2. My Team', desc: 'Manage trusted helpers, family & freelance assistants', category: 'Team' },
    { id: 3, title: '3. Employee Profile', desc: 'Helper workload capacity, active scopes & audit history', category: 'Profile' },
    { id: 4, title: '4. Assign Task (Step 1: Describe Task)', desc: 'Natural language input with pre-filled demo text', category: 'Creation' },
    { id: 5, title: '5. AI Suggests Permissions', desc: 'Zero-trust mapping of intent to minimum required operations', category: 'AI Mapping' },
    { id: 6, title: '6. Set Duration', desc: 'Time-scoped access boundary with auto-expiry', category: 'Duration' },
    { id: 7, title: '7. Permission Diff', desc: 'Side-by-side Green (Allowed) vs Red (Blocked) comparison', category: 'Innovation' },
    { id: 8, title: '8. Task Assigned Successfully', desc: 'One-click cryptographic delegation confirmation', category: 'Confirmation' },
    { id: 9, title: '9. Live Task View (Helper Side)', desc: 'Ghost UI with locked tabs & scoped dispatch buttons', category: 'Helper UI' },
    { id: 10, title: '10. Denied Action Alert', desc: 'High-impact instant hard block ("Not today! 💁‍♀️")', category: 'Enforcement' },
    { id: 11, title: '11. Audit Log (Shared)', desc: 'Real-time record of all authorized and denied attempts', category: 'Audit' },
    { id: 12, title: '12. Delegation Expiry & Summary', desc: 'Aftermath card with real demo numbers & auto-revocation', category: 'Summary' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="card-chic p-5 flex flex-wrap items-center justify-between gap-4" style={{ background: 'linear-gradient(135deg, var(--bg-surface-subtle) 0%, var(--bg-surface) 100%)' }}>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--brand-pink)] text-white">
              Official Hackathon Poster Mockups
            </span>
            <span className="text-xs font-semibold text-[var(--text-muted)]">Track 2: Women at the Tech Frontier</span>
          </div>
          <h2 className="text-xl font-bold mt-1" style={{ color: 'var(--text-main)', fontFamily: 'Playfair Display, serif' }}>
            All 12 Screens Designed for TaskKey
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Click on any card to zoom and inspect the full high-resolution interface.
          </p>
        </div>
      </div>

      {/* 12-Screen Grid Layout matching reference image */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Screen 1 Mini Card */}
        <div className="card-chic p-4 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all cursor-pointer group" onClick={() => onSelectScreen(1)}>
          <div className="flex items-center justify-between pb-2 border-b text-xs font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--brand-pink)' }}>
            <span>1. Dashboard</span>
            <Maximize2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="my-3 space-y-2 text-xs">
            <p className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>Good morning, Juhi! ✨</p>
            <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
              <div className="p-1.5 rounded-lg bg-[var(--bg-surface-subtle)] font-bold">4 Active</div>
              <div className="p-1.5 rounded-lg bg-[var(--bg-surface-subtle)] font-bold">18 Done</div>
              <div className="p-1.5 rounded-lg bg-[var(--brand-blush)] text-[var(--brand-pink)] font-bold">0 Safe 🛡️</div>
            </div>
            <div className="p-2.5 rounded-xl border flex items-center justify-between text-[11px]" style={{ background: 'var(--brand-peach)', borderColor: 'var(--border-subtle)' }}>
              <div>
                <p className="font-bold italic" style={{ color: 'var(--text-main)' }}>Your business, Your rules.</p>
                <span className="text-[10px] text-[var(--text-muted)]">+ Assign New Task</span>
              </div>
              <span className="text-xl">👩‍💻</span>
            </div>
          </div>
          <span className="text-[10px] text-[var(--text-dim)] font-medium">Screen 1 • Owner Overview</span>
        </div>

        {/* Screen 2 Mini Card */}
        <div className="card-chic p-4 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all cursor-pointer group" onClick={() => onSelectScreen(2)}>
          <div className="flex items-center justify-between pb-2 border-b text-xs font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--brand-pink)' }}>
            <span>2. My Team</span>
            <Maximize2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="my-3 space-y-1.5 text-xs">
            <p className="text-[11px] font-medium text-[var(--text-muted)]">Manage your trusted helpers</p>
            {teamMembers.slice(0, 3).map(m => (
              <div key={m.id} className="p-1.5 rounded-lg border flex items-center justify-between text-[11px]" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-1.5">
                  <UserAvatar name={m.name} size={22} />
                  <span className="font-bold truncate max-w-[90px]">{m.name}</span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded ${m.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
          <span className="text-[10px] text-[var(--text-dim)] font-medium">Screen 2 • Helper Management</span>
        </div>

        {/* Screen 3 Mini Card */}
        <div className="card-chic p-4 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all cursor-pointer group" onClick={() => onSelectScreen(3)}>
          <div className="flex items-center justify-between pb-2 border-b text-xs font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--brand-pink)' }}>
            <span>3. Employee Profile</span>
            <Maximize2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="my-3 space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <UserAvatar name="Riya Sharma" size={32} />
              <div>
                <p className="font-bold">Riya Sharma</p>
                <p className="text-[10px] text-[var(--text-dim)]">Order Fulfillment Specialist</p>
              </div>
            </div>
            <div className="text-[10px] space-y-1">
              <div className="flex justify-between font-bold">
                <span>Workload</span>
                <span className="text-[var(--brand-pink)]">60%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-neutral-200 overflow-hidden">
                <div className="w-[60%] h-full bg-[var(--brand-pink)]" />
              </div>
            </div>
          </div>
          <span className="text-[10px] text-[var(--text-dim)] font-medium">Screen 3 • Member Scopes</span>
        </div>

        {/* Screen 4 Mini Card */}
        <div className="card-chic p-4 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all cursor-pointer group" onClick={() => onSelectScreen(4)}>
          <div className="flex items-center justify-between pb-2 border-b text-xs font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--brand-pink)' }}>
            <span>4. Assign Task (Step 1)</span>
            <Maximize2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="my-3 space-y-2 text-xs">
            <p className="font-bold text-[11px]">Tell us what you need her to do.</p>
            <div className="p-2 rounded-lg border text-[10px] font-medium italic" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-strong)' }}>
              "Please dispatch orders #101–105 by 6 PM today."
            </div>
            <div className="p-1.5 rounded-md bg-[var(--brand-peach)] text-[10px] font-semibold text-[var(--brand-pink)] text-center">
              ✨ Just describe your task. We'll handle rest.
            </div>
          </div>
          <span className="text-[10px] text-[var(--text-dim)] font-medium">Screen 4 • Natural Language Input</span>
        </div>

        {/* Screen 5 Mini Card */}
        <div className="card-chic p-4 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all cursor-pointer group" onClick={() => onSelectScreen(5)}>
          <div className="flex items-center justify-between pb-2 border-b text-xs font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--brand-pink)' }}>
            <span>5. AI Suggests Permissions</span>
            <Maximize2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="my-3 space-y-2 text-xs">
            <div className="flex items-center gap-1 text-[11px] font-bold text-[var(--brand-pink)]">
              <Bot size={13} />
              <span>Task Detected: Dispatch Orders</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[9px] font-bold">
              <div className="p-1.5 rounded bg-[var(--badge-green-bg)] text-[var(--badge-green-text)]">
                ✓ View #101-105<br/>✓ Dispatch status
              </div>
              <div className="p-1.5 rounded bg-[var(--badge-red-bg)] text-[var(--badge-red-text)]">
                ✕ Refunds<br/>✕ Payments
              </div>
            </div>
          </div>
          <span className="text-[10px] text-[var(--text-dim)] font-medium">Screen 5 • AI Permission Proposal</span>
        </div>

        {/* Screen 6 Mini Card */}
        <div className="card-chic p-4 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all cursor-pointer group" onClick={() => onSelectScreen(6)}>
          <div className="flex items-center justify-between pb-2 border-b text-xs font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--brand-pink)' }}>
            <span>6. Set Duration</span>
            <Maximize2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="my-3 space-y-2 text-xs">
            <p className="font-bold text-[11px]">How long should Riya have access?</p>
            <div className="flex gap-1 text-[10px]">
              <span className="px-2 py-1 rounded border">30m</span>
              <span className="px-2 py-1 rounded border">1hr</span>
              <span className="px-2 py-1 rounded bg-[var(--brand-pink)] text-white font-bold">2 hrs</span>
              <span className="px-2 py-1 rounded border">4 hrs</span>
            </div>
            <p className="text-[10px] text-[var(--text-dim)] flex items-center gap-1">
              <Clock size={11} /> Expires automatically at 2:00 PM
            </p>
          </div>
          <span className="text-[10px] text-[var(--text-dim)] font-medium">Screen 6 • Time Boundary Policy</span>
        </div>

        {/* Screen 7 Mini Card */}
        <div className="card-chic p-4 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all cursor-pointer group" onClick={() => onSelectScreen(7)}>
          <div className="flex items-center justify-between pb-2 border-b text-xs font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--brand-pink)' }}>
            <span>7. Permission Diff</span>
            <Maximize2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="my-3 grid grid-cols-2 gap-2 text-[10px] font-bold">
            <div className="p-2 rounded-lg bg-[var(--badge-green-bg)] text-[var(--badge-green-text)] space-y-1">
              <p className="uppercase text-[9px]">What Riya CAN do</p>
              <p>✓ View (#101-105)</p>
              <p>✓ Update dispatch</p>
            </div>
            <div className="p-2 rounded-lg bg-[var(--badge-red-bg)] text-[var(--badge-red-text)] space-y-1">
              <p className="uppercase text-[9px]">CANNOT do</p>
              <p>✕ Process refunds</p>
              <p>✕ Customer exports</p>
            </div>
          </div>
          <span className="text-[10px] text-[var(--text-dim)] font-medium">Screen 7 • Red vs Green Isolation</span>
        </div>

        {/* Screen 8 Mini Card */}
        <div className="card-chic p-4 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all cursor-pointer group" onClick={() => onSelectScreen(8)}>
          <div className="flex items-center justify-between pb-2 border-b text-xs font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--brand-pink)' }}>
            <span>8. Task Assigned Successfully</span>
            <Maximize2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="my-3 text-center space-y-1.5 text-xs">
            <div className="w-9 h-9 mx-auto rounded-full bg-[var(--brand-pink)] text-white flex items-center justify-center font-bold">
              <Check size={18} />
            </div>
            <p className="font-bold text-sm">Task Assigned!</p>
            <p className="text-[10px] text-[var(--text-muted)]">Riya granted task-specific access</p>
          </div>
          <span className="text-[10px] text-[var(--text-dim)] font-medium">Screen 8 • Cryptographic Token Issuance</span>
        </div>

        {/* Screen 9 Mini Card */}
        <div className="card-chic p-4 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all cursor-pointer group" onClick={() => onSelectScreen(9)}>
          <div className="flex items-center justify-between pb-2 border-b text-xs font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--brand-pink)' }}>
            <span>9. Live Task View (Helper)</span>
            <Maximize2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="my-3 space-y-2 text-xs">
            <div className="p-2 rounded-xl border flex justify-between items-center text-[10px]" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <p className="font-bold">Dispatch Orders #101-105</p>
                <p className="text-[var(--brand-pink)] font-semibold">3 remaining</p>
              </div>
              <span className="w-6 h-6 rounded-full border-2 border-[var(--brand-pink)] text-[var(--brand-pink)] flex items-center justify-center font-bold text-[9px]">2/5</span>
            </div>
            <div className="p-1.5 rounded-lg bg-neutral-200/50 text-[9px] text-[var(--text-dim)] flex items-center justify-between">
              <span>Ghost UI: Payments & Settings</span>
              <Lock size={10} />
            </div>
          </div>
          <span className="text-[10px] text-[var(--text-dim)] font-medium">Screen 9 • Helper Mobile/Web Frame</span>
        </div>

        {/* Screen 10 Mini Card */}
        <div className="card-chic p-4 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all cursor-pointer group" onClick={() => onSelectScreen(10)}>
          <div className="flex items-center justify-between pb-2 border-b text-xs font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--brand-pink)' }}>
            <span>10. Denied Action Alert</span>
            <Maximize2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="my-3 text-center space-y-1.5 text-xs">
            <span className="px-2 py-0.5 rounded bg-[var(--badge-red-bg)] text-[var(--badge-red-text)] font-bold text-[10px] inline-flex items-center gap-1">
              <AlertTriangle size={11} /> ACTION DENIED
            </span>
            <p className="text-[10px] text-[var(--text-muted)]">Refunds & payments not included in task.</p>
            <p className="text-xs font-bold italic text-[var(--brand-pink)]" style={{ fontFamily: 'Playfair Display' }}>
              "Not today! 💁‍♀️"
            </p>
          </div>
          <span className="text-[10px] text-[var(--text-dim)] font-medium">Screen 10 • Highest-Impact Moment</span>
        </div>

        {/* Screen 11 Mini Card */}
        <div className="card-chic p-4 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all cursor-pointer group" onClick={() => onSelectScreen(11)}>
          <div className="flex items-center justify-between pb-2 border-b text-xs font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--brand-pink)' }}>
            <span>11. Audit Log (Shared)</span>
            <Maximize2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="my-3 space-y-1 text-[10px]">
            <div className="flex justify-between p-1 rounded bg-[var(--bg-surface-subtle)]">
              <span>Riya: Dispatched #102</span>
              <span className="text-emerald-600 font-bold">Allowed</span>
            </div>
            <div className="flex justify-between p-1 rounded bg-[var(--badge-red-bg)]">
              <span className="text-red-700">Riya: Refund #103</span>
              <span className="text-red-600 font-bold">Blocked</span>
            </div>
          </div>
          <span className="text-[10px] text-[var(--text-dim)] font-medium">Screen 11 • Shared Audit Trail</span>
        </div>

        {/* Screen 12 Mini Card */}
        <div className="card-chic p-4 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all cursor-pointer group" onClick={() => onSelectScreen(12)}>
          <div className="flex items-center justify-between pb-2 border-b text-xs font-bold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--brand-pink)' }}>
            <span>12. Delegation Expiry & Summary</span>
            <Maximize2 size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="my-3 space-y-1.5 text-xs text-center">
            <p className="font-bold text-emerald-600">Task Completed!</p>
            <div className="grid grid-cols-3 gap-1 text-[9px] font-bold">
              <div className="p-1 rounded bg-[var(--bg-surface-subtle)]">5 Orders</div>
              <div className="p-1 rounded bg-[var(--bg-surface-subtle)]">5 Done</div>
              <div className="p-1 rounded bg-[var(--bg-surface-subtle)]">0 Left</div>
            </div>
            <p className="text-[9px] text-[var(--text-dim)]">Business Safer, Always</p>
          </div>
          <span className="text-[10px] text-[var(--text-dim)] font-medium">Screen 12 • Aftermath Summary Card</span>
        </div>

      </div>
    </div>
  );
};
