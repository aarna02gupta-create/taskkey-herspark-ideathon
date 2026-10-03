import React, { useState } from 'react';
import {
  Lock,
  CheckCircle2,
  Clock,
  AlertTriangle,
  CreditCard,
  Settings,
  Ban,
  Check,
  Sparkles,
  ArrowRight,
  Search,
  ShieldCheck
} from 'lucide-react';
import { DeniedActionIllustration } from '../Illustrations';

// Screen 9: Live Task View (Helper Side)
export const LiveTaskHelperScreen = ({ 
  orders, 
  onDispatchOrder, 
  onAttemptDeniedAction, 
  isRevoked = false 
}) => {
  const [activeTab, setActiveTab] = useState('active');

  const completedCount = orders.filter(o => o.status === 'Dispatched').length;
  const totalCount = orders.length;
  const remainingCount = totalCount - completedCount;

  return (
    <div className="max-w-md mx-auto card-chic overflow-hidden border-2 shadow-xl animate-fade-in" style={{ borderColor: 'var(--border-strong)' }}>
      {/* Mobile-Style Status Bar & Brand Header */}
      <div className="p-4 border-b flex items-center justify-between" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: 'var(--brand-pink)', color: '#FFFFFF' }}>
            TK
          </div>
          <div>
            <h3 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>TaskKey Helper</h3>
            <p className="text-[10px] text-[var(--text-dim)]">Logged in as Riya Sharma</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: 'var(--brand-blush)', color: 'var(--brand-pink)' }}>
          <Clock size={12} />
          <span>01:29:45</span>
        </div>
      </div>

      {isRevoked ? (
        <div className="p-8 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center justify-center">
            <Lock size={32} />
          </div>
          <h3 className="text-xl font-bold text-red-600">Access Revoked by Owner</h3>
          <p className="text-xs text-[var(--text-muted)]">
            Juhi Sharma triggered the Owner Kill-Switch. Your task session has been securely closed.
          </p>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {/* Active vs Completed Tabs */}
          <div className="flex rounded-xl p-1 border text-xs font-bold" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
            <button 
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${activeTab === 'active' ? 'bg-[var(--bg-surface)] text-[var(--brand-pink)] shadow-sm' : 'text-[var(--text-muted)]'}`}
            >
              Active ({remainingCount > 0 ? 1 : 0})
            </button>
            <button 
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${activeTab === 'completed' ? 'bg-[var(--bg-surface)] text-[var(--brand-pink)] shadow-sm' : 'text-[var(--text-muted)]'}`}
            >
              Completed ({remainingCount === 0 ? 1 : 0})
            </button>
          </div>

          {/* Active Task Card */}
          <div className="p-4 rounded-2xl border space-y-3" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>Dispatch Orders #101–105</h4>
                <p className="text-[11px] text-[var(--brand-pink)] font-semibold mt-0.5">Expires in 1h 30m</p>
                <p className="text-[11px] text-[var(--text-dim)]">{remainingCount} orders remaining</p>
              </div>

              {/* Radial Progress Badge */}
              <div className="w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-xs" style={{ borderColor: 'var(--brand-pink)', color: 'var(--brand-pink)' }}>
                {completedCount}/{totalCount}
              </div>
            </div>

            {/* Quick Actions (Allowed) */}
            <div className="pt-2 border-t space-y-2 text-xs font-bold" style={{ borderColor: 'var(--border-subtle)' }}>
              <p className="text-[10px] uppercase tracking-wider text-[var(--text-dim)]">Allowed Task Operations</p>
              <div className="space-y-1.5">
                {orders.map((o) => (
                  <div 
                    key={o.id} 
                    className="p-2.5 rounded-xl border flex items-center justify-between transition-all"
                    style={{ 
                      background: o.status === 'Dispatched' ? 'var(--badge-green-bg)' : 'var(--bg-surface-subtle)',
                      borderColor: o.status === 'Dispatched' ? 'var(--badge-green-border)' : 'var(--border-subtle)'
                    }}
                  >
                    <div>
                      <span className="font-bold text-xs" style={{ color: 'var(--text-main)' }}>Order #{o.id}</span>
                      <p className="text-[11px] text-[var(--text-muted)] truncate max-w-[180px]">{o.item}</p>
                    </div>

                    {o.status === 'Dispatched' ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-white flex items-center gap-1">
                        <Check size={10} /> Dispatched
                      </span>
                    ) : (
                      <button 
                        onClick={() => onDispatchOrder(o.id)}
                        className="btn-pink-primary text-[11px] py-1 px-2.5"
                      >
                        Mark Dispatched
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GHOST UI: Greyed Out / Inaccessible Tabs */}
          <div className="p-3 rounded-2xl border space-y-2 bg-neutral-100/50 dark:bg-neutral-900/40" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center justify-between text-[11px] font-bold text-[var(--text-dim)]">
              <span className="flex items-center gap-1 uppercase tracking-wider">
                <Lock size={12} /> Restricted Sections (Ghost UI)
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800">Locked</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button 
                onClick={() => onAttemptDeniedAction('Refund Order')}
                className="p-2.5 rounded-xl border border-dashed border-red-300 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400 flex items-center justify-between group hover:border-red-500 transition-all text-left"
              >
                <div>
                  <p className="font-bold text-[11px]">Refund Order #103</p>
                  <span className="text-[9px] text-red-500">Click to test Red Alert</span>
                </div>
                <Ban size={14} className="group-hover:scale-110 text-red-500 transition-transform" />
              </button>

              <button 
                onClick={() => onAttemptDeniedAction('Export Customers')}
                className="p-2.5 rounded-xl border border-dashed border-red-300 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400 flex items-center justify-between group hover:border-red-500 transition-all text-left"
              >
                <div>
                  <p className="font-bold text-[11px]">Export Customer Data</p>
                  <span className="text-[9px] text-red-500">Unauthorized</span>
                </div>
                <Lock size={14} className="group-hover:scale-110 text-red-500 transition-transform" />
              </button>

              <div className="p-2 rounded-xl bg-neutral-200/40 dark:bg-neutral-800/40 text-[var(--text-dim)] flex items-center justify-between opacity-60">
                <span className="text-[11px] font-medium flex items-center gap-1.5"><CreditCard size={12} /> Payments</span>
                <Lock size={12} />
              </div>

              <div className="p-2 rounded-xl bg-neutral-200/40 dark:bg-neutral-800/40 text-[var(--text-dim)] flex items-center justify-between opacity-60">
                <span className="text-[11px] font-medium flex items-center gap-1.5"><Settings size={12} /> Store Settings</span>
                <Lock size={12} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Screen 10: Denied Action Alert Modal
export const DeniedActionAlertModal = ({ isOpen, onClose, attemptedAction = "Refund Order" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="card-chic max-w-sm w-full p-6 text-center space-y-4 shadow-pop border-2 animate-pop-in" style={{ borderColor: 'var(--badge-red-border)', background: 'var(--bg-surface)' }}>
        
        {/* Red Alert Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: 'var(--badge-red-bg)', color: 'var(--badge-red-text)', border: '1px solid var(--badge-red-border)' }}>
          <AlertTriangle size={15} />
          <span>ACTION DENIED</span>
        </div>

        <div>
          <h3 className="text-xl font-bold" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>
            Unauthorized Action: {attemptedAction}
          </h3>
          <p className="text-xs mt-1.5 leading-relaxed font-medium" style={{ color: 'var(--text-muted)' }}>
            Refunds and payment details are <strong>not included</strong> in this task. This attempt has been logged for Juhi Sharma.
          </p>
        </div>

        {/* Not Today Illustration */}
        <div className="py-2">
          <DeniedActionIllustration />
          <p className="text-sm font-bold italic mt-2" style={{ color: 'var(--brand-pink)', fontFamily: 'Playfair Display, serif' }}>
            Not today! 💁‍♀️
          </p>
        </div>

        <button 
          onClick={onClose}
          className="w-full btn-pink-primary py-3 justify-center text-sm font-bold shadow-md"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

// Screen 11: Audit Log (Shared)
export const AuditLogScreen = ({ logs = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUser, setFilterUser] = useState('all');

  const filteredLogs = logs.filter(l => {
    const matchesSearch = l.action.toLowerCase().includes(searchTerm.toLowerCase()) || l.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUser = filterUser === 'all' || l.user.includes(filterUser);
    return matchesSearch && matchesUser;
  });

  return (
    <div className="card-chic p-6 space-y-5 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-pink)]">Feasibility • Technical Feasibility</span>
          <h3 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>Shared Audit Log</h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--text-dim)' }}>
          <Clock size={14} />
          <span>Real-time backend enforcement stream</span>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          <select 
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="text-xs p-2 rounded-xl border outline-none font-semibold"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
          >
            <option value="all">All Users</option>
            <option value="Riya">Riya Sharma</option>
            <option value="Neha">Neha Patel</option>
            <option value="Juhi">Juhi Sharma (Owner)</option>
          </select>
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
          <input 
            type="text" 
            placeholder="Search log entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs border outline-none"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--border-subtle)' }}>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr style={{ background: 'var(--bg-surface-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
              <th className="p-3 font-bold text-[var(--text-muted)]">Time</th>
              <th className="p-3 font-bold text-[var(--text-muted)]">User</th>
              <th className="p-3 font-bold text-[var(--text-muted)]">Action Requested</th>
              <th className="p-3 font-bold text-[var(--text-muted)]">Scope Filter</th>
              <th className="p-3 font-bold text-[var(--text-muted)]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-[var(--bg-surface-hover)] transition-colors">
                <td className="p-3 font-mono text-[11px] text-[var(--text-dim)]">{log.time}</td>
                <td className="p-3 font-bold" style={{ color: 'var(--text-main)' }}>{log.user}</td>
                <td className="p-3 font-medium" style={{ color: 'var(--text-main)' }}>{log.action}</td>
                <td className="p-3 font-mono text-[10px] text-[var(--brand-pink)]">{log.scope}</td>
                <td className="p-3">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    log.status === 'Allowed' 
                      ? 'bg-[var(--badge-green-bg)] text-[var(--badge-green-text)]' 
                      : 'bg-[var(--badge-red-bg)] text-[var(--badge-red-text)]'
                  }`}>
                    {log.status === 'Allowed' ? '✓ Allowed' : '✕ Blocked'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Screen 12: Delegation Expiry & Summary (Aftermath)
export const DelegationExpirySummaryScreen = ({ onNewTask, onViewAudit }) => {
  return (
    <div className="card-chic p-8 max-w-lg mx-auto space-y-6 text-center animate-fade-in">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--badge-green-bg)] text-[var(--badge-green-text)] shadow-sm">
        <CheckCircle2 size={36} />
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-pink)]">Delegation Summary</span>
        <h3 className="text-2xl font-bold" style={{ color: 'var(--text-main)', fontFamily: 'Playfair Display, serif' }}>
          Task Completed!
        </h3>
        <p className="text-xs font-medium mt-1" style={{ color: 'var(--text-muted)' }}>
          All access has been automatically and securely revoked.
        </p>
      </div>

      {/* Real Demo Numbers Grid */}
      <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl border" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
        <div className="p-2">
          <p className="text-2xl font-bold" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>5</p>
          <p className="text-[10px] uppercase font-bold text-[var(--text-dim)]">Total Orders</p>
        </div>
        <div className="p-2 border-x" style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="text-2xl font-bold text-emerald-600" style={{ fontFamily: 'Outfit' }}>5</p>
          <p className="text-[10px] uppercase font-bold text-[var(--text-dim)]">Completed</p>
        </div>
        <div className="p-2">
          <p className="text-2xl font-bold" style={{ color: 'var(--brand-pink)', fontFamily: 'Outfit' }}>0</p>
          <p className="text-[10px] uppercase font-bold text-[var(--text-dim)]">Remaining</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl border text-xs" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
        <div className="text-left">
          <span className="text-[11px] text-[var(--text-dim)]">Time Taken</span>
          <p className="font-bold" style={{ color: 'var(--text-main)' }}>1h 48m</p>
        </div>
        <button onClick={onViewAudit} className="text-xs font-bold text-[var(--brand-pink)] hover:underline flex items-center gap-1">
          <span>View Full Report</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Safety Guarantee Box */}
      <div className="p-4 rounded-2xl border flex items-center gap-3 text-left" style={{ background: 'var(--brand-peach)', borderColor: 'var(--border-strong)' }}>
        <div className="p-2 rounded-xl bg-white text-[var(--brand-pink)] shadow-sm flex-shrink-0">
          <ShieldCheck size={20} />
        </div>
        <div className="text-xs">
          <p className="font-bold" style={{ color: 'var(--text-main)' }}>Business Safer, Always</p>
          <p className="text-[var(--text-muted)] mt-0.5">
            TaskKey ensures your helpers get only what they need — no more, no less. Zero passwords exposed.
          </p>
        </div>
      </div>

      <button onClick={onNewTask} className="w-full btn-pink-primary py-3.5 text-sm font-bold justify-center">
        <span>Assign Another Task</span>
        <Sparkles size={16} />
      </button>
    </div>
  );
};
