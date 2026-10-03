import React, { useState, useMemo } from 'react';
import {
  Download,
  Search,
  CheckCircle2,
  Clock,
  KeyRound,
  Ban,
  ShieldCheck,
  ShieldAlert,
  X,
  ChevronRight,
  Activity
} from 'lucide-react';
import { UserAvatar } from '../Illustrations';

export const AuditScreen = ({ onNavigateToSecurity, auditEvents: propAuditEvents }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'allowed' | 'blocked' | 'granted' | 'revoked'
  const [memberFilter, setMemberFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Chronological Audit Events Dataset
  const defaultAuditEvents = [
    {
      id: 'EVT-2026-1042',
      time: '10:42 PM',
      date: 'Today',
      actor: 'Priya',
      role: 'Team Member',
      task: 'Order Processing',
      action: 'Completed Order #1041',
      requestedApi: 'orders.update_status(ID: 1041, DISPATCHED)',
      result: 'ALLOWED',
      statusType: 'allowed',
      decision: 'PERMITTED',
      reason: 'Action matches active least-privilege token policy.',
      policy: 'Order Processing Policy v1.2',
      policyId: 'TK-POL-ORDERS-01',
      session: 'TK-1041-PR',
      category: 'Orders',
      riskLevel: 'Low',
      riskExposure: 'Minimal risk — routine order dispatch within approved 5-order quota'
    },
    {
      id: 'EVT-2026-1039',
      time: '10:39 PM',
      date: 'Today',
      actor: 'Priya',
      role: 'Team Member',
      task: 'Order Processing',
      action: 'Attempted Refund #1041',
      requestedApi: 'finance.refunds.create(ID: 1041, amount: 1280)',
      result: 'BLOCKED',
      statusType: 'blocked',
      decision: 'DENIED',
      reason: 'Refunds are outside the approved task scope.',
      policy: 'Order Processing Policy v1.2',
      policyId: 'TK-POL-ORDERS-01',
      session: 'TK-1041-PR',
      category: 'Finance',
      riskLevel: 'High',
      riskExposure: 'High financial risk — unauthorized customer refund and payout attempt prevented'
    },
    {
      id: 'EVT-2026-1035',
      time: '10:35 PM',
      date: 'Today',
      actor: 'Riya',
      role: 'Business Owner',
      task: 'Order Processing',
      action: 'Approved Order Processing Token for Priya',
      requestedApi: 'auth.tokens.issue(grantee: Priya, ttl: 42m)',
      result: 'ACCESS GRANTED',
      statusType: 'granted',
      decision: 'TOKEN ISSUED',
      reason: 'Business owner 1-click verification confirmed.',
      policy: 'Order Processing Policy v1.2',
      policyId: 'TK-POL-ORDERS-01',
      session: 'TK-1041-PR',
      category: 'Auth',
      riskLevel: 'Low',
      riskExposure: 'Low risk — owner cleared least-privilege token with 42m TTL'
    },
    {
      id: 'EVT-2026-1005',
      time: '10:05 PM',
      date: 'Today',
      actor: 'Riya',
      role: 'Business Owner',
      task: 'Order Processing',
      action: 'Created task delegation for Priya',
      requestedApi: 'policy.create_scope("Process today\'s 5 orders")',
      result: 'POLICY ISSUED',
      statusType: 'granted',
      decision: 'SCOPE DERIVED',
      reason: 'TaskKey AI generated least-privilege boundaries.',
      policy: 'Order Processing Policy v1.2',
      policyId: 'TK-POL-ORDERS-01',
      session: 'TK-1041-PR',
      category: 'Policy',
      riskLevel: 'Low',
      riskExposure: 'Low risk — scoped to 3 operational actions, financial endpoints excluded'
    },
    {
      id: 'EVT-2026-0948',
      time: '9:48 PM',
      date: 'Today',
      actor: 'Zara',
      role: 'Freelance Developer',
      task: 'Storefront Theme Fix',
      action: 'Session TTL expired — access auto-revoked',
      requestedApi: 'auth.tokens.expire(token_id: TK-4019-DEV)',
      result: 'ACCESS REVOKED',
      statusType: 'revoked',
      decision: 'TOKEN REVOKED',
      reason: 'Session reached time-to-live limit. Zero backdoor access left.',
      policy: 'Frontend Theme Fix Policy v1.0',
      policyId: 'TK-POL-DEV-07',
      session: 'TK-4019-DEV',
      category: 'Auth',
      riskLevel: 'Low',
      riskExposure: 'Risk eliminated — session expired cleanly with zero residual access'
    },
    {
      id: 'EVT-2026-0945',
      time: '9:45 PM',
      date: 'Today',
      actor: 'Ananya',
      role: 'Inventory Manager',
      task: 'Inventory Update',
      action: 'Updated inventory counts for SKU #SP26-88',
      requestedApi: 'inventory.update_stock(SKU: SP26-88, qty: 45)',
      result: 'ALLOWED',
      statusType: 'allowed',
      decision: 'PERMITTED',
      reason: 'Action within active inventory stock update scope.',
      policy: 'Warehouse Inventory Policy v2.1',
      policyId: 'TK-POL-INV-04',
      session: 'TK-7192-INV',
      category: 'Inventory',
      riskLevel: 'Low',
      riskExposure: 'Minimal risk — stock adjustment scoped to single SKU SP26-88'
    },
    {
      id: 'EVT-2026-0915',
      time: '9:15 PM',
      date: 'Today',
      actor: 'Riya',
      role: 'Business Owner',
      task: 'Inventory Update',
      action: 'Issued scoped access for Spring 2026 Collection',
      requestedApi: 'auth.tokens.issue(grantee: Ananya, ttl: 2h)',
      result: 'ACCESS GRANTED',
      statusType: 'granted',
      decision: 'TOKEN ISSUED',
      reason: 'Owner approved task delegation.',
      policy: 'Warehouse Inventory Policy v2.1',
      policyId: 'TK-POL-INV-04',
      session: 'TK-7192-INV',
      category: 'Auth',
      riskLevel: 'Medium',
      riskExposure: 'Medium risk — catalog write permissions with 2h expiration window'
    },
    {
      id: 'EVT-2026-0840',
      time: '8:40 PM',
      date: 'Today',
      actor: 'Ananya',
      role: 'Inventory Manager',
      task: 'Inventory Update',
      action: 'Attempted Supplier Payout ($4,200)',
      requestedApi: 'finance.vendor_payments.transfer(vendor: SilkMills)',
      result: 'BLOCKED',
      statusType: 'blocked',
      decision: 'DENIED',
      reason: 'Financial payments outside inventory task scope.',
      policy: 'Warehouse Inventory Policy v2.1',
      policyId: 'TK-POL-INV-04',
      session: 'TK-7192-INV',
      category: 'Finance',
      riskLevel: 'High',
      riskExposure: 'High financial risk — vendor payment transfer intercepted and blocked'
    },
    {
      id: 'EVT-2026-0215',
      time: '2:15 PM',
      date: 'Today',
      actor: 'Meera',
      role: 'Customer Support',
      task: 'Customer Support',
      action: 'Replied to Ticket #892 (Sizing Question)',
      requestedApi: 'support.send_message(ticket_id: 892)',
      result: 'ALLOWED',
      statusType: 'allowed',
      decision: 'PERMITTED',
      reason: 'Support messaging permitted under ticket assignment.',
      policy: 'Customer Support Policy v1.5',
      policyId: 'TK-POL-SUP-09',
      session: 'TK-6304-SUP',
      category: 'Support',
      riskLevel: 'Low',
      riskExposure: 'Minimal risk — ticket messaging within assigned helpdesk queue'
    },
    {
      id: 'EVT-2026-0800',
      time: '8:00 AM',
      date: 'Today',
      actor: 'Riya',
      role: 'Business Owner',
      task: 'Customer Support',
      action: 'Approved support inbox access for Meera',
      requestedApi: 'auth.tokens.issue(grantee: Meera, ttl: 8h)',
      result: 'ACCESS GRANTED',
      statusType: 'granted',
      decision: 'TOKEN ISSUED',
      reason: 'Owner assigned customer ticket resolution task.',
      policy: 'Customer Support Policy v1.5',
      policyId: 'TK-POL-SUP-09',
      session: 'TK-6304-SUP',
      category: 'Auth',
      riskLevel: 'Low',
      riskExposure: 'Low risk — ticket read & reply scoped, PII export disabled'
    },
    {
      id: 'EVT-2026-0745',
      time: '7:45 AM',
      date: 'Today',
      actor: 'Meera',
      role: 'Customer Support',
      task: 'Customer Support',
      action: 'Attempted Full Customer PII Database Export',
      requestedApi: 'customers.export_all_pii(format: csv)',
      result: 'BLOCKED',
      statusType: 'blocked',
      decision: 'DENIED',
      reason: 'Customer PII export strictly guarded by zero-trust boundary.',
      policy: 'Customer Support Policy v1.5',
      policyId: 'TK-POL-SUP-09',
      session: 'TK-6304-SUP',
      category: 'Privacy',
      riskLevel: 'High',
      riskExposure: 'High privacy risk — bulk customer PII export attempt hard-blocked'
    }
  ];

  const currentEvents = propAuditEvents || defaultAuditEvents;

  // Dynamically calculate summary metrics from current audit stream
  const eventCounts = useMemo(() => {
    const allowed = currentEvents.filter(e => e.statusType === 'allowed' || e.statusType === 'granted').length;
    const blocked = currentEvents.filter(e => e.statusType === 'blocked').length;
    const revoked = currentEvents.filter(e => e.statusType === 'revoked').length;
    return {
      total: currentEvents.length,
      allowed,
      blocked,
      revoked
    };
  }, [currentEvents]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return currentEvents.filter(ev => {
      // Status Filter
      if (statusFilter === 'allowed' && ev.statusType !== 'allowed') return false;
      if (statusFilter === 'blocked' && ev.statusType !== 'blocked') return false;
      if (statusFilter === 'granted' && ev.statusType !== 'granted') return false;
      if (statusFilter === 'revoked' && ev.statusType !== 'revoked') return false;

      // Member Filter
      if (memberFilter !== 'all' && ev.actor.toLowerCase() !== memberFilter.toLowerCase()) return false;

      // Search Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchActor = ev.actor.toLowerCase().includes(query);
        const matchAction = ev.action.toLowerCase().includes(query);
        const matchTask = ev.task.toLowerCase().includes(query);
        const matchId = ev.id.toLowerCase().includes(query);
        const matchReason = ev.reason.toLowerCase().includes(query);
        return matchActor || matchAction || matchTask || matchId || matchReason;
      }

      return true;
    });
  }, [currentEvents, statusFilter, memberFilter, searchQuery]);

  const handleExportAudit = () => {
    const jsonStr = JSON.stringify(currentEvents, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskkey-audit-log-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Audit log exported successfully in JSON format.');
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-pop-in">
          <div className="p-4 rounded-2xl border shadow-pop flex items-center gap-3 text-xs font-bold" style={{ background: 'var(--bg-surface)', borderColor: 'var(--brand-pink)' }}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--brand-pink)] to-[var(--brand-rose)] text-white flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>Audit Exporter</p>
              <p className="text-xs text-[var(--text-muted)]">{toastMessage}</p>
            </div>
            <button onClick={() => setToastMessage(null)} className="ml-2 text-[var(--text-dim)] hover:text-[var(--text-main)]">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. PAGE HEADER & SECURITY STATUS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AUDIT RECORDING ACTIVE</span>
            </div>
            <span className="text-xs font-semibold text-[var(--text-dim)]">
              Every action has a trace
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)' }}>
            Security Audit
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal max-w-2xl">
            Every delegated action, permission check, and blocked attempt — recorded.
          </p>
        </div>

        {/* Top Right Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportAudit}
            className="btn-pink-primary text-xs sm:text-sm py-3 px-5 font-bold shadow-md flex items-center gap-2"
          >
            <Download size={16} />
            <span>Export Audit Log</span>
          </button>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. REFINED SUMMARY STRIP (Minimalist & High Typography)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1 */}
        <div className="card-chic p-5 rounded-2xl border flex items-center justify-between" style={{ background: 'var(--bg-surface)' }}>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-dim)]">Total Events</span>
            <p className="text-3xl sm:text-4xl font-black mt-1" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>
              {eventCounts.total}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[var(--brand-peach)] text-[var(--brand-pink)] flex items-center justify-center font-bold">
            <Activity size={22} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="card-chic p-5 rounded-2xl border flex items-center justify-between" style={{ background: 'var(--bg-surface)' }}>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Allowed Actions</span>
            <p className="text-3xl sm:text-4xl font-black mt-1 text-emerald-600" style={{ fontFamily: 'Outfit' }}>
              {eventCounts.allowed}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 size={22} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="card-chic p-5 rounded-2xl border flex items-center justify-between" style={{ background: 'var(--bg-surface)' }}>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">Blocked Attempts</span>
            <p className="text-3xl sm:text-4xl font-black mt-1 text-red-600 dark:text-red-400" style={{ fontFamily: 'Outfit' }}>
              {eventCounts.blocked}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
            <Ban size={22} />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="card-chic p-5 rounded-2xl border flex items-center justify-between" style={{ background: 'var(--bg-surface)' }}>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">Access Revoked</span>
            <p className="text-3xl sm:text-4xl font-black mt-1 text-purple-600" style={{ fontFamily: 'Outfit' }}>
              {eventCounts.revoked}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Clock size={22} />
          </div>
        </div>

      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. BLOCKED ACTIONS & AUDIT INTEGRITY HIGHLIGHT STRIP
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* BLOCKED ACTIONS VISUALIZATION (7 cols) */}
        <div className="lg:col-span-7 card-chic p-6 rounded-3xl border space-y-4" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-2">
              <Ban size={16} className="text-red-600" />
              <h3 className="text-sm font-black uppercase tracking-wider text-red-600">
                Recent Guardrailed Interceptions
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
              Zero-Trust Enforcement
            </span>
          </div>

          <p className="text-xs text-[var(--text-muted)] italic">
            “TaskKey blocked these actions because they were outside the active task scope.”
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl border bg-red-50/70 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 space-y-1">
              <span className="text-xs font-black text-red-700 dark:text-red-300">✕ REFUND</span>
              <p className="text-[10px] text-[var(--text-muted)]">Priya · Order #1041</p>
              <span className="text-[9px] font-mono text-red-600 font-bold block">finance.refunds</span>
            </div>

            <div className="p-3.5 rounded-2xl border bg-red-50/70 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 space-y-1">
              <span className="text-xs font-black text-red-700 dark:text-red-300">✕ PAYOUT</span>
              <p className="text-[10px] text-[var(--text-muted)]">Ananya · $4,200 transfer</p>
              <span className="text-[9px] font-mono text-red-600 font-bold block">banking.transfer</span>
            </div>

            <div className="p-3.5 rounded-2xl border bg-red-50/70 dark:bg-red-950/20 border-red-200 dark:border-red-900/50 space-y-1">
              <span className="text-xs font-black text-red-700 dark:text-red-300">✕ CUSTOMER EXPORT</span>
              <p className="text-[10px] text-[var(--text-muted)]">Meera · Full PII dump</p>
              <span className="text-[9px] font-mono text-red-600 font-bold block">customers.export</span>
            </div>
          </div>
        </div>

        {/* AUDIT INTEGRITY (5 cols) */}
        <div className="lg:col-span-5 card-chic p-6 rounded-3xl border space-y-3" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[var(--brand-pink)]" />
              <h3 className="text-sm font-black uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                Audit Integrity
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--brand-peach)] text-[var(--brand-pink)]">
              ● RECORDING
            </span>
          </div>

          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Every audit event is cryptographically indexed and traceable with structured runtime metadata:
          </p>

          <div className="p-3 rounded-2xl bg-[var(--bg-surface-subtle)] border text-[11px] font-mono space-y-1" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}>
            <div className="flex justify-between">
              <span className="text-[var(--text-dim)]">Event ID:</span>
              <span className="font-bold text-[var(--brand-pink)]">EVT-2026-1041</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-dim)]">Policy Ref:</span>
              <span>TK-POL-ORDERS-01</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-dim)]">Session Token:</span>
              <span>TK-1041-PR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-dim)]">Integrity State:</span>
              <span className="text-emerald-600 font-bold">Validated Trace</span>
            </div>
          </div>
        </div>

      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. FILTERING & SEARCH CONTROLS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center p-1.5 rounded-2xl border shadow-2xs gap-1 self-start overflow-x-auto max-w-full" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
          {[
            { id: 'all', label: 'All Events' },
            { id: 'allowed', label: 'Allowed' },
            { id: 'blocked', label: 'Blocked' },
            { id: 'granted', label: 'Access Granted' },
            { id: 'revoked', label: 'Access Revoked' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-[var(--brand-pink)] text-white shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--brand-pink)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Member Selector + Search Input */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={memberFilter}
            onChange={(e) => setMemberFilter(e.target.value)}
            className="p-2.5 rounded-2xl border text-xs font-bold focus:outline-none focus:border-[var(--brand-pink)]"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
          >
            <option value="all">All Team Members</option>
            <option value="Priya">Priya (Helper)</option>
            <option value="Ananya">Ananya (Inventory)</option>
            <option value="Meera">Meera (Support)</option>
            <option value="Zara">Zara (Frontend)</option>
            <option value="Riya">Riya (Owner)</option>
          </select>

          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search audit events..."
              className="w-full pl-9 pr-4 py-2 rounded-2xl border text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-pink)] transition-all"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
            />
          </div>
        </div>

      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. MAIN CHRONOLOGICAL AUDIT TIMELINE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border space-y-2" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <p className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>No matching audit records</p>
            <p className="text-xs text-[var(--text-muted)]">Try adjusting search or status filters.</p>
          </div>
        ) : (
          filteredEvents.map((ev) => {
            const isAllowed = ev.statusType === 'allowed' || ev.statusType === 'granted';
            const isBlocked = ev.statusType === 'blocked';
            const isRevoked = ev.statusType === 'revoked';

            return (
              <div
                key={ev.id}
                onClick={() => setSelectedEvent(ev)}
                className="timeline-event-row p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
              >
                {/* Left: Time + Actor + Task Info */}
                <div className="flex items-start gap-4">
                  <div className="text-center min-w-[70px] pt-1">
                    <span className="text-xs font-black block" style={{ color: 'var(--text-main)' }}>{ev.time}</span>
                    <span className="text-[10px] text-[var(--text-dim)] font-semibold">{ev.date}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <UserAvatar name={ev.actor} size={26} />
                      <span className="text-xs font-black" style={{ color: 'var(--text-main)' }}>{ev.actor}</span>
                      <span className="text-[10px] text-[var(--text-dim)]">({ev.role})</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--brand-peach)] text-[var(--brand-pink)]">
                        {ev.task}
                      </span>
                      {ev.riskLevel && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          ev.riskLevel === 'High' 
                            ? 'bg-red-50 text-red-700 border-red-200' 
                            : ev.riskLevel === 'Medium' 
                            ? 'bg-amber-50 text-amber-700 border-amber-200' 
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          Risk: {ev.riskLevel}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>
                      {ev.action}
                    </h4>

                    {isBlocked && (
                      <p className="text-xs font-semibold text-red-600 dark:text-red-400">
                        Reason: {ev.reason}
                      </p>
                    )}

                    {ev.riskExposure && (
                      <p className="text-[11px] text-[var(--text-dim)] font-medium">
                        🛡️ {ev.riskExposure}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Status Pill + Token Reference */}
                <div className="flex items-center justify-between md:justify-end gap-4 pt-2 md:pt-0 border-t md:border-t-0" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="text-left md:text-right space-y-0.5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                      isAllowed 
                        ? 'bg-[var(--badge-green-bg)] text-[var(--badge-green-text)] border border-[var(--badge-green-border)]' 
                        : isBlocked 
                        ? 'bg-[var(--badge-red-bg)] text-[var(--badge-red-text)] border border-[var(--badge-red-border)]' 
                        : 'bg-[var(--bg-surface-subtle)] text-[var(--text-dim)] border border-[var(--border-subtle)]'
                    }`}>
                      {isAllowed && <CheckCircle2 size={13} />}
                      {isBlocked && <Ban size={13} />}
                      {isRevoked && <Clock size={13} />}
                      <span>{ev.result}</span>
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-dim)] block">
                      Ref: {ev.id}
                    </span>
                  </div>

                  <button className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--brand-pink)] transition-colors">
                    <ChevronRight size={16} />
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. INTERACTIVE EVENT DETAIL MODAL / DRAWER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-xl rounded-3xl border shadow-pop p-6 sm:p-8 space-y-6 animate-pop-in relative"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-subtle)] transition-all"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="space-y-1 pr-8">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--brand-peach)] text-[var(--brand-pink)]">
                  {selectedEvent.id}
                </span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  selectedEvent.statusType === 'allowed' || selectedEvent.statusType === 'granted' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : selectedEvent.statusType === 'blocked' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {selectedEvent.result}
                </span>
                {selectedEvent.riskLevel && (
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                    selectedEvent.riskLevel === 'High'
                      ? 'bg-red-100 text-red-800 border-red-300'
                      : selectedEvent.riskLevel === 'Medium'
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}>
                    Risk: {selectedEvent.riskLevel}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black tracking-tight" style={{ fontFamily: 'Outfit', color: 'var(--text-main)' }}>
                {selectedEvent.action}
              </h2>
            </div>

            {/* Risk Intelligence Assessment Card */}
            <div className="p-4 rounded-2xl border space-y-2 text-xs" style={{ background: selectedEvent.statusType === 'blocked' ? 'rgba(239, 68, 68, 0.05)' : 'var(--bg-surface-subtle)', borderColor: selectedEvent.statusType === 'blocked' ? 'var(--badge-red-border)' : 'var(--border-subtle)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold" style={{ color: selectedEvent.statusType === 'blocked' ? '#b91c1c' : 'var(--brand-pink)' }}>
                  <ShieldAlert size={15} />
                  <span className="uppercase tracking-wider text-[11px]">Risk Intelligence & Threat Mitigation</span>
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white text-[var(--text-main)] shadow-2xs border">
                  Posture: {selectedEvent.riskLevel || 'Low'}
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] font-medium leading-relaxed">
                {selectedEvent.riskExposure || selectedEvent.reason}
              </p>
              {selectedEvent.statusType === 'blocked' && (
                <div className="pt-1.5 border-t border-red-200 dark:border-red-900/40 text-[11px] text-red-700 dark:text-red-300 font-bold flex items-center gap-1.5">
                  <Ban size={13} />
                  <span>ACTION BLOCKED: Unauthorized execution prevented by zero-trust gateway.</span>
                </div>
              )}
            </div>

            {/* Event Key-Value Metadata Grid */}
            <div className="p-4 rounded-2xl border space-y-3 text-xs" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-wider block">Actor</span>
                  <p className="font-extrabold" style={{ color: 'var(--text-main)' }}>{selectedEvent.actor} ({selectedEvent.role})</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-wider block">Task Context</span>
                  <p className="font-extrabold" style={{ color: 'var(--text-main)' }}>{selectedEvent.task}</p>
                </div>
              </div>

              <div className="border-t pt-2" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-wider block">Requested Endpoint</span>
                <code className="font-mono text-[11px] text-[var(--brand-pink)] font-bold block mt-0.5">{selectedEvent.requestedApi}</code>
              </div>

              <div className="border-t pt-2" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-wider block">Gateway Decision & Reason</span>
                <p className={`font-bold text-xs mt-0.5 ${selectedEvent.statusType === 'blocked' ? 'text-red-600 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-300'}`}>
                  {selectedEvent.decision}: “{selectedEvent.reason}”
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t pt-2" style={{ borderColor: 'var(--border-subtle)' }}>
                <div>
                  <span className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-wider block">Enforced Policy</span>
                  <p className="font-mono text-[11px] text-[var(--text-muted)]">{selectedEvent.policyId}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-wider block">Session Token</span>
                  <p className="font-mono text-[11px] text-[var(--text-muted)]">{selectedEvent.session}</p>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <button
                onClick={() => {
                  setSelectedEvent(null);
                  onNavigateToSecurity();
                }}
                className="btn-pink-primary text-xs py-2.5 px-4 font-bold flex items-center gap-1.5"
              >
                <KeyRound size={14} />
                <span>View Access Policy</span>
              </button>

              <button
                onClick={() => setSelectedEvent(null)}
                className="btn-outline-subtle text-xs py-2.5 px-4 font-bold"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
