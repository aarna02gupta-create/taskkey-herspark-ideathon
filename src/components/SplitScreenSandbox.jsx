import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Clock, Ban, RefreshCw, TrendingDown, Code, Check } from 'lucide-react';
import { initialOrders, initialAuditLog } from '../data/mockData';
import { UserAvatar } from './Illustrations';
import { DeniedActionAlertModal } from './screens/HelperAndAuditScreens';

export const SplitScreenSandbox = ({ onOpenPayload }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [auditLogs, setAuditLogs] = useState(initialAuditLog);
  const [isRevoked, setIsRevoked] = useState(false);
  const [exposureMeter, setExposureMeter] = useState(82);
  const [showDeniedModal, setShowDeniedModal] = useState(false);
  const [deniedActionName, setDeniedActionName] = useState('Refund Order #103');
  const [countdownSeconds, setCountdownSeconds] = useState(5520); // ~1h 32m

  // Animate exposure meter on policy mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setExposureMeter(12);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    if (isRevoked || countdownSeconds <= 0) return;
    const interval = setInterval(() => {
      setCountdownSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRevoked, countdownSeconds]);

  const formatCountdown = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleDispatchOrder = (orderId, now) => {
    if (isRevoked) return;
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'Dispatched' } : o));
    
    // Timestamp is captured by the click event, never during rendering.
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLog = {
      id: `aud-${now.getTime()}`,
      time: timeStr,
      user: 'Riya Sharma',
      action: `Dispatched Order #${orderId}`,
      scope: 'orders:update_dispatch',
      status: 'Allowed'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleTriggerDeniedAction = (actionName) => {
    setDeniedActionName(actionName);
    setShowDeniedModal(true);

    // Append blocked attempt to audit log
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLog = {
      id: `aud-${Date.now()}`,
      time: timeStr,
      user: 'Riya Sharma',
      action: `Attempted ${actionName}`,
      scope: actionName.includes('Refund') ? 'orders:refund' : 'customers:export',
      status: 'Blocked'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleRevokeKillSwitch = () => {
    setIsRevoked(true);
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLog = {
      id: `aud-${Date.now()}`,
      time: timeStr,
      user: 'Juhi Sharma (Owner)',
      action: 'Emergency Kill-Switch Triggered: Revoked Riya Sharma Access',
      scope: 'session:revoke',
      status: 'Allowed'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleResetDemo = () => {
    setOrders(initialOrders);
    setAuditLogs(initialAuditLog);
    setIsRevoked(false);
    setExposureMeter(12);
    setCountdownSeconds(5520);
  };

  const completedCount = orders.filter(o => o.status === 'Dispatched').length;

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Demo Bar: Exposure Meter + Kill Switch + Controls */}
      <div className="card-chic p-4 flex flex-wrap items-center justify-between gap-4" style={{ background: 'linear-gradient(135deg, var(--bg-surface-subtle) 0%, var(--bg-surface) 100%)' }}>
        
        {/* Exposure Meter (Feature 3) */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[var(--brand-pink-light)] text-[var(--brand-pink)] flex items-center justify-center">
            <TrendingDown size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Data Exposure Risk Meter</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--badge-green-bg)] text-[var(--badge-green-text)]">
                -70% Reduced
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xs line-through text-[var(--text-dim)] font-semibold">82% (Full Store Role)</span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400" style={{ fontFamily: 'Outfit' }}>
                {exposureMeter}% with TaskKey
              </span>
            </div>
          </div>
        </div>

        {/* Live Countdown (Feature 7) */}
        <div className="flex items-center gap-3 p-2.5 px-4 rounded-xl border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
          <Clock size={18} className="text-[var(--brand-pink)]" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)]">Access Countdown</p>
            <p className="text-sm font-mono font-bold" style={{ color: isRevoked ? 'var(--badge-red-text)' : 'var(--text-main)' }}>
              {isRevoked ? '00:00:00 (Revoked)' : formatCountdown(countdownSeconds)}
            </p>
          </div>
        </div>

        {/* Controls: Kill Switch & Developer Payload */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            onClick={onOpenPayload}
            className="btn-outline-subtle text-xs py-2 px-3 font-semibold"
          >
            <Code size={15} />
            <span>Developer Payload</span>
          </button>

          {!isRevoked ? (
            <button 
              onClick={handleRevokeKillSwitch}
              className="btn-kill-switch text-xs py-2 px-4"
              title="Immediately terminate helper token and revoke API access"
            >
              <Ban size={15} />
              <span>REVOKE ACCESS (KILL-SWITCH)</span>
            </button>
          ) : (
            <button 
              onClick={handleResetDemo}
              className="btn-pink-primary text-xs py-2 px-4"
            >
              <RefreshCw size={15} />
              <span>Reset Demo State</span>
            </button>
          )}
        </div>
      </div>

      {/* SPLIT SCREEN: Left (Owner View) vs Right (Helper View) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT PANE: OWNER VIEW (Juhi Sharma) - 7 cols */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--brand-pink)]" />
              <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                Owner Dashboard View (Juhi Sharma)
              </h3>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--brand-peach)] text-[var(--brand-pink)]">
              Full Governance & Audit
            </span>
          </div>

          {/* Active Delegation Context Card */}
          <div className="card-chic p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-3">
                <UserAvatar name="Riya Sharma" size={40} />
                <div>
                  <h4 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>Delegation: Riya Sharma</h4>
                  <p className="text-xs text-[var(--text-muted)]">Order Fulfillment Specialist • <span className="italic">Cousin</span></p>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  isRevoked ? 'bg-[var(--badge-red-bg)] text-[var(--badge-red-text)]' : 'bg-[var(--badge-green-bg)] text-[var(--badge-green-text)]'
                }`}>
                  {isRevoked ? 'Revoked' : 'Active Session'}
                </span>
                <p className="text-[10px] text-[var(--text-dim)] mt-0.5">Token: tsk_001_signed</p>
              </div>
            </div>

            {/* Live Progress Bar */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span style={{ color: 'var(--text-main)' }}>Fulfillment Progress</span>
                <span style={{ color: 'var(--brand-pink)' }}>{completedCount} of 5 orders dispatched ({Math.round((completedCount/5)*100)}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${(completedCount/5)*100}%`, background: 'linear-gradient(90deg, var(--brand-pink) 0%, var(--brand-rose) 100%)' }}
                />
              </div>
            </div>
          </div>

          {/* SHARED REAL-TIME AUDIT LOG */}
          <div className="card-chic p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[var(--brand-pink)]" />
                <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                  Live Shared Audit Log
                </h4>
              </div>
              <span className="text-[10px] font-semibold text-[var(--text-dim)]">
                Updates dynamically with every helper click
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border max-h-[260px] overflow-y-auto" style={{ borderColor: 'var(--border-subtle)' }}>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr style={{ background: 'var(--bg-surface-subtle)' }}>
                    <th className="p-2.5 font-bold text-[var(--text-muted)]">Time</th>
                    <th className="p-2.5 font-bold text-[var(--text-muted)]">User</th>
                    <th className="p-2.5 font-bold text-[var(--text-muted)]">Action</th>
                    <th className="p-2.5 font-bold text-[var(--text-muted)]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[var(--bg-surface-hover)]">
                      <td className="p-2 font-mono text-[10px] text-[var(--text-dim)]">{log.time}</td>
                      <td className="p-2 font-bold text-[11px]" style={{ color: 'var(--text-main)' }}>{log.user}</td>
                      <td className="p-2 font-medium text-[11px]" style={{ color: 'var(--text-main)' }}>{log.action}</td>
                      <td className="p-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          log.status === 'Allowed' ? 'bg-[var(--badge-green-bg)] text-[var(--badge-green-text)]' : 'bg-[var(--badge-red-bg)] text-[var(--badge-red-text)]'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: HELPER VIEW (Riya Sharma) - 5 cols */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                Helper Live Interface (Riya Sharma)
              </h3>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--badge-green-bg)] text-[var(--badge-green-text)]">
              Scoped Session
            </span>
          </div>

          {/* Interactive Helper Screen */}
          <div className="card-chic p-4 space-y-4 border-2 shadow-lg" style={{ borderColor: isRevoked ? 'var(--badge-red-border)' : 'var(--border-strong)' }}>
            
            {isRevoked ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center justify-center">
                  <Lock size={28} />
                </div>
                <h4 className="text-base font-bold text-red-600">Access Terminated by Owner</h4>
                <p className="text-xs text-[var(--text-muted)]">
                  The session token was invalidated in real-time. No further records or API endpoints are accessible.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--brand-pink)]">Assigned Scope</h4>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>Dispatch Orders #101–105</p>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-[var(--bg-surface-subtle)] text-[var(--text-muted)]">
                    5 Total
                  </span>
                </div>

                {/* Orders List to Dispatch */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)]">Allowed Actions (Click to Test)</p>
                  {orders.map((order) => (
                    <div 
                      key={order.id}
                      className="p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all"
                      style={{ 
                        background: order.status === 'Dispatched' ? 'var(--badge-green-bg)' : 'var(--bg-surface-subtle)',
                        borderColor: order.status === 'Dispatched' ? 'var(--badge-green-border)' : 'var(--border-subtle)'
                      }}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold" style={{ color: 'var(--text-main)' }}>Order #{order.id}</span>
                          <span className="text-[10px] text-[var(--text-dim)]">{order.price}</span>
                        </div>
                        <p className="text-[11px] text-[var(--text-muted)] truncate max-w-[150px]">{order.item}</p>
                      </div>

                      {order.status === 'Dispatched' ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-white flex items-center gap-1">
                          <Check size={10} /> Dispatched
                        </span>
                      ) : (
                        <button
                          onClick={() => handleDispatchOrder(order.id, new Date())}
                          className="btn-pink-primary text-[11px] py-1 px-2.5 font-bold"
                        >
                          Dispatch
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* GHOST UI: Unauthorized Actions (Feature 5 & Feature 6) */}
                <div className="pt-2 border-t space-y-2" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)]">
                    <span className="flex items-center gap-1"><Lock size={12} /> Ghost UI & Guardrails</span>
                    <span className="text-red-500">Test High-Impact Denied Alert</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleTriggerDeniedAction('Refund Order #103')}
                      className="p-2 rounded-xl border border-dashed border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30 text-left hover:border-red-500 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs font-bold text-red-600 dark:text-red-400">Issue Refund</p>
                        <span className="text-[9px] text-red-500">Click to test Red Alert</span>
                      </div>
                      <Ban size={14} className="text-red-500 group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                      onClick={() => handleTriggerDeniedAction('Export Customer Database')}
                      className="p-2 rounded-xl border border-dashed border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30 text-left hover:border-red-500 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs font-bold text-red-600 dark:text-red-400">Export Leads</p>
                        <span className="text-[9px] text-red-500">Blocked scope</span>
                      </div>
                      <Lock size={14} className="text-red-500 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Denied Action Alert (Screen 10) */}
      <DeniedActionAlertModal
        isOpen={showDeniedModal}
        onClose={() => setShowDeniedModal(false)}
        attemptedAction={deniedActionName}
      />
    </div>
  );
};
