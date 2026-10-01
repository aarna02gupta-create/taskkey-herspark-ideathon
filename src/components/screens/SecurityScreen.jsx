import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Shield, 
  Lock, 
  KeyRound, 
  Bot, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Plus, 
  Check, 
  X, 
  ArrowRight, 
  RefreshCw, 
  Activity, 
  Layers, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  FileCode,
  Eye,
  Ban,
  Sparkles,
  Zap,
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserAvatar } from '../Illustrations';

export const SecurityScreen = ({ 
  delegations, 
  teamMembers, 
  onUpdateDelegations, 
  onOpenCreatePolicyModal,
  onAddAuditEvent 
}) => {
  // Select active policy to inspect
  const activeDelegations = useMemo(() => {
    if (!delegations) return [];
    return delegations.filter(d => d.status === 'active' || d.status === 'pending');
  }, [delegations]);

  const [selectedPolicyId, setSelectedPolicyId] = useState(
    activeDelegations.length > 0 ? activeDelegations[0].id : 'del-1'
  );

  const selectedDelegation = useMemo(() => {
    if (!delegations) return null;
    return delegations.find(d => d.id === selectedPolicyId) || delegations[0] || null;
  }, [delegations, selectedPolicyId]);

  // Live Enforcement Simulator State
  const [testedAction, setTestedAction] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [simPulse, setSimPulse] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Run Real-Time Action Test with Risk Intelligence
  const handleTestAction = (actionName, apiEndpoint, isAllowed, customReason, riskInfo) => {
    setEvaluating(true);
    setSimPulse(true);

    setTimeout(() => {
      setEvaluating(false);
      const reasonText = isAllowed 
        ? 'Matched approved least-privilege token policy.' 
        : (customReason || 'This action is outside the approved task scope.');

      const defaultRisk = isAllowed 
        ? { level: 'Low', exposure: 'Minimal (Task-Scoped)', alert: 'Action is within approved minimal boundary.' }
        : { level: 'High', exposure: 'High Financial/Data Risk', alert: 'Attempted operation violates least-privilege guardrail and could cause unauthorized loss or data exposure.' };

      const activeRisk = riskInfo || defaultRisk;

      setTestedAction({
        name: actionName,
        api: apiEndpoint,
        isAllowed: isAllowed,
        policyTitle: selectedDelegation?.title || 'ORDER PROCESSING',
        reason: reasonText,
        riskLevel: activeRisk.level,
        riskExposure: activeRisk.exposure,
        riskAlert: activeRisk.alert,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });

      if (onAddAuditEvent) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const actorName = selectedDelegation?.assignedTo || 'Priya';
        onAddAuditEvent({
          id: `EVT-SIM-${Date.now().toString().slice(-4)}`,
          time: timeStr,
          date: 'Today',
          actor: actorName,
          role: selectedDelegation?.role || 'Team Member',
          task: selectedDelegation?.title || 'Order Processing',
          action: `${isAllowed ? 'Executed' : 'Attempted'} ${actionName}`,
          requestedApi: apiEndpoint,
          result: isAllowed ? 'ALLOWED' : 'BLOCKED',
          statusType: isAllowed ? 'allowed' : 'blocked',
          decision: isAllowed ? 'PERMITTED' : 'DENIED',
          reason: reasonText,
          riskLevel: activeRisk.level,
          riskExposure: activeRisk.exposure,
          policy: selectedDelegation?.policyId || 'TK-POL-ORDERS-01',
          policyId: selectedDelegation?.policyId || 'TK-POL-ORDERS-01',
          session: selectedDelegation?.tokenId || 'TK-1041-PR',
          category: isAllowed ? 'Operations' : 'Security'
        });
      }

      setTimeout(() => setSimPulse(false), 800);
    }, 450);
  };

  return (
    <div className="space-y-12 animate-fade-in pb-16">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-pop-in">
          <div className="p-4 rounded-2xl border shadow-pop flex items-center gap-3 text-xs font-bold" style={{ background: 'var(--bg-surface)', borderColor: 'var(--brand-pink)' }}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--brand-pink)] to-[var(--brand-rose)] text-white flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>Security Gateway</p>
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SYSTEM PROTECTED</span>
            </div>
            <span className="text-xs font-semibold text-[var(--text-dim)]">
              Zero-Trust Runtime Active
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)' }}>
            Access Control
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal max-w-2xl">
            Define exactly what your team can do — and automatically protect everything else.
          </p>
        </div>

        {/* Primary Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCreatePolicyModal}
            className="btn-pink-primary text-sm sm:text-base py-3.5 px-6 font-bold shadow-md hover:scale-[1.02] transition-transform flex items-center gap-2"
          >
            <Plus size={18} />
            <span>+ Create Access Policy</span>
          </button>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. SECURITY OVERVIEW (Minimal & High-Impact)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: 98% Business Protected */}
          <div className="card-chic p-6 rounded-3xl border flex items-center justify-between" style={{ background: 'var(--bg-surface)' }}>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-pink)]">
                Security Posture
              </span>
              <p className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>
                98%
              </p>
              <p className="text-xs font-bold text-emerald-600">BUSINESS PROTECTED</p>
            </div>

            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="26" stroke="var(--border-subtle)" strokeWidth="5" fill="transparent" />
                <circle cx="32" cy="32" r="26" stroke="var(--brand-pink)" strokeWidth="5" fill="transparent" strokeDasharray="163.36" strokeDashoffset="3.26" strokeLinecap="round" />
              </svg>
              <ShieldCheck size={20} className="absolute text-[var(--brand-pink)]" />
            </div>
          </div>

          {/* Card 2: 12 Protected Actions */}
          <div className="card-chic p-6 rounded-3xl border flex items-center justify-between" style={{ background: 'var(--bg-surface)' }}>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Sensitive Endpoints
              </span>
              <p className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>
                12
              </p>
              <p className="text-xs font-semibold text-[var(--text-muted)]">PROTECTED ACTIONS</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[var(--brand-peach)] text-[var(--brand-pink)] flex items-center justify-center font-bold">
              <Lock size={22} />
            </div>
          </div>

          {/* Card 3: 7 Active Guardrails */}
          <div className="card-chic p-6 rounded-3xl border flex items-center justify-between" style={{ background: 'var(--bg-surface)' }}>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Zero-Trust Rules
              </span>
              <p className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>
                7
              </p>
              <p className="text-xs font-semibold text-emerald-600">ACTIVE GUARDRAILS</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center font-bold">
              <Shield size={22} />
            </div>
          </div>

          {/* Card 4: 1 Blocked Today */}
          <div className="card-chic p-6 rounded-3xl border flex items-center justify-between" style={{ background: 'var(--bg-surface)' }}>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                Interceptions
              </span>
              <p className="text-3xl sm:text-4xl font-black text-red-600 dark:text-red-400" style={{ fontFamily: 'Outfit' }}>
                1
              </p>
              <p className="text-xs font-semibold text-red-500">BLOCKED TODAY</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 flex items-center justify-center font-bold">
              <Ban size={22} />
            </div>
          </div>

        </div>

        <p className="text-xs text-[var(--text-muted)] font-medium italic text-center sm:text-left pt-1">
          “TaskKey continuously enforces task-scoped permissions across active sessions.”
        </p>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. MAIN VISUAL — POLICY ENGINE FLOW (Interactive Centerpiece)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="card-chic p-6 sm:p-8 lg:p-10 rounded-3xl border space-y-8" style={{ background: 'linear-gradient(145deg, var(--bg-surface) 0%, var(--bg-surface-subtle) 100%)', borderColor: 'var(--border-strong)' }}>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--brand-pink)] bg-[var(--brand-peach)] mb-1">
              <Bot size={14} />
              <span>Core Policy Pipeline</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight" style={{ fontFamily: 'Outfit', color: 'var(--text-main)' }}>
              How Task-Scoped Permissions Are Generated & Enforced
            </h2>
          </div>
          
          {/* Active Policy Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-surface)] border text-xs font-bold self-start overflow-x-auto" style={{ borderColor: 'var(--border-subtle)' }}>
            {activeDelegations.map(del => (
              <button
                key={del.id}
                onClick={() => setSelectedPolicyId(del.id)}
                className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                  selectedPolicyId === del.id
                    ? 'bg-[var(--brand-pink)] text-white shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--brand-pink)]'
                }`}
              >
                {del.assignedTo} ({del.category?.split(' ')[0] || 'Task'})
              </button>
            ))}
          </div>
        </div>

        {/* 5-Node Animated Pipeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative items-center">
          
          {/* Node 1: Task Description */}
          <div className="p-4 rounded-2xl border space-y-2 text-center" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)] block">01. TASK INTENT</span>
            <div className="p-2.5 rounded-xl bg-[var(--brand-peach)] text-xs font-extrabold" style={{ color: 'var(--text-main)' }}>
              “{selectedDelegation?.taskPrompt || "Process today's 5 orders"}”
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">Plain English prompt from Riya</p>
          </div>

          {/* Node 2: TaskKey AI Core */}
          <div className="p-4 rounded-2xl text-white text-center space-y-2 shadow-glow animate-ai-glow relative" style={{ background: 'linear-gradient(135deg, var(--brand-pink) 0%, var(--brand-pink-dark) 100%)' }}>
            <span className="text-[10px] font-black uppercase tracking-wider text-pink-100 block">02. TASKKEY AI</span>
            <div className="w-10 h-10 rounded-xl bg-white/20 mx-auto flex items-center justify-center font-bold">
              <Bot size={22} />
            </div>
            <p className="text-xs font-black">Understands Intent</p>
            <span className="text-[10px] text-pink-100 block">Minimal boundary calculated</span>
          </div>

          {/* Node 3: Access Policy */}
          <div className="p-4 rounded-2xl border space-y-2 text-center" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">03. ACCESS POLICY</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-xs font-extrabold text-emerald-800 dark:text-emerald-200">
              {selectedDelegation?.allowedPermissions?.length || 3} Actions Scoped
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">Zero unrestricted admin access</p>
          </div>

          {/* Node 4: Real-time Enforcement */}
          <div className="p-4 rounded-2xl border space-y-2 text-center" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-pink)] block">04. ENFORCEMENT</span>
            <div className="w-10 h-10 rounded-xl bg-[var(--brand-peach)] text-[var(--brand-pink)] mx-auto flex items-center justify-center font-bold">
              <ShieldCheck size={22} />
            </div>
            <p className="text-xs font-black" style={{ color: 'var(--text-main)' }}>Real-Time Interceptor</p>
            <span className="text-[10px] text-[var(--text-dim)] block">Runtime token validation</span>
          </div>

          {/* Node 5: Active Session & Expiry */}
          <div className="p-4 rounded-2xl border space-y-2 text-center" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">05. SESSION</span>
            <div className="flex items-center justify-center gap-2">
              <UserAvatar name={selectedDelegation?.assignedTo || 'Priya'} size={28} />
              <span className="text-xs font-black" style={{ color: 'var(--text-main)' }}>{selectedDelegation?.assignedTo || 'Priya'}</span>
            </div>
            <div className="text-[11px] font-bold text-[var(--brand-pink)]">
              {selectedDelegation?.expiryText || 'Expires in 42 min'}
            </div>
          </div>

        </div>

      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. ACCESS POLICY PANEL & ACCESS BOUNDARY VISUAL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Access Policy & Strict Boundary (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KeyRound size={18} className="text-[var(--brand-pink)]" />
              <h3 className="text-lg sm:text-xl font-black" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>
                Active Policy: {selectedDelegation?.title || 'ORDER PROCESSING'}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                (selectedDelegation?.riskLevel || 'Low') === 'High' 
                  ? 'bg-red-100 text-red-800 border border-red-300' 
                  : (selectedDelegation?.riskLevel || 'Low') === 'Medium'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                ● {(selectedDelegation?.riskLevel || 'Low')} Risk ({selectedDelegation?.riskAssessment?.exposureLevel?.split(' ')[0] || '17%'})
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                ● Active
              </span>
            </div>
          </div>

          {/* Visual Access Boundary Container */}
          <div 
            className={`card-chic p-6 sm:p-7 rounded-3xl border-2 space-y-6 transition-all ${
              simPulse ? 'ring-4 ring-[var(--brand-pink)] ring-opacity-50 scale-[1.01]' : ''
            }`}
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
          >
            <div className="flex items-center justify-between text-xs font-bold pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <span className="text-[var(--text-dim)] uppercase tracking-wider">Assigned to: {selectedDelegation?.assignedTo || 'Priya'}</span>
              <span className="text-[var(--brand-pink)] font-mono">{selectedDelegation?.tokenId || 'TK-TOK-8841-SEC'}</span>
            </div>

            {/* ALLOWED SECTION */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                  <CheckCircle2 size={15} /> ALLOWED OPERATIONS (Task Required)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  WHITELISTED
                </span>
              </div>

              <div className="space-y-2">
                {(selectedDelegation?.allowedPermissions || [
                  { name: 'Order Processing', api: 'orders.update_status' },
                  { name: 'Order Status', api: 'orders.read_status' },
                  { name: 'Order Details', api: 'items.list' }
                ]).map((perm, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-emerald-950 dark:text-emerald-200">✓ {perm.name}</span>
                      <code className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 block">{perm.api}</code>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                      PERMITTED
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* EXPLICIT ZERO-TRUST DIVIDER / BOUNDARY */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-dashed border-[var(--border-strong)]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm" style={{ background: 'var(--brand-pink)' }}>
                  🔒 ZERO-TRUST POLICY BOUNDARY
                </span>
              </div>
            </div>

            {/* RESTRICTED SECTION WITH CLEAR EXPLANATIONS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                  <Lock size={15} /> RESTRICTED ACTIONS (Guardrailed by Default)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
                  DENIED BY DEFAULT
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'Refunds', api: 'finance.refunds.create', reason: 'Not required to complete the assigned task.' },
                  { name: 'Payouts & Banking', api: 'banking.transfer_funds', reason: 'Financial operation outside task scope.' },
                  { name: 'Customer PII Export', api: 'customers.export_all', reason: 'Contains sensitive customer information.' },
                  { name: 'Payment Settings', api: 'gateway.settings.update', reason: 'Critical business infrastructure guardrail.' }
                ].map((perm, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-800 flex items-start justify-between text-xs">
                    <div>
                      <span className="font-bold text-red-700 dark:text-red-300">✕ {perm.name}</span>
                      <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{perm.reason}</p>
                      <code className="text-[10px] font-mono text-[var(--text-dim)]">{perm.api}</code>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-600 text-white flex-shrink-0">
                      BLOCKED
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Boundary Guarantee Callout */}
            <div className="p-3 rounded-xl bg-[var(--brand-peach)] text-center text-xs font-extrabold text-[var(--brand-pink)] border border-[var(--border-subtle)]">
              “Everything outside this boundary is denied by default. Exposure reduced to {selectedDelegation?.riskAssessment?.exposureLevel || '17%' }.”
            </div>

          </div>
        </div>

        {/* RIGHT: LIVE ENFORCEMENT SIMULATOR & AUTO-EXPIRING SESSIONS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              5. LIVE ENFORCEMENT SIMULATOR ("TEST AN ACTION")
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="card-chic p-6 rounded-3xl border space-y-5" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}>
            
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[var(--brand-pink)]">
                  SECURITY RUNTIME SIMULATOR
                </span>
                <h3 className="text-base sm:text-lg font-black" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>
                  Test an Action
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--brand-peach)] text-[var(--brand-pink)]">
                Active: {selectedDelegation?.assignedTo || 'Priya'}
              </span>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Simulate real API queries from <strong>{selectedDelegation?.assignedTo || 'Priya'}</strong> to verify runtime least-privilege enforcement:
            </p>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              {/* Allowed 1 */}
              <button
                onClick={() => handleTestAction('Update Order Status', 'orders.update_status(ID: 1041, DISPATCHED)', true, null, { level: 'Low', exposure: 'Minimal (Task Scope)', alert: 'Operational order dispatch verified.' })}
                className="p-3 rounded-xl border text-left font-bold text-xs hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all flex items-center justify-between group"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <span>[ Update Order ]</span>
                <span className="text-[10px] text-emerald-600 font-extrabold group-hover:scale-105">✓ Allowed</span>
              </button>

              {/* Allowed 2 */}
              <button
                onClick={() => handleTestAction('View Order Status', 'orders.read_status(ID: 1041)', true, null, { level: 'Low', exposure: 'Minimal (Task Scope)', alert: 'Read-only order status permitted.' })}
                className="p-3 rounded-xl border text-left font-bold text-xs hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all flex items-center justify-between group"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <span>[ View Order Status ]</span>
                <span className="text-[10px] text-emerald-600 font-extrabold group-hover:scale-105">✓ Allowed</span>
              </button>

              {/* Allowed 3 */}
              <button
                onClick={() => handleTestAction('View Item Details', 'items.list(order_id: 1041)', true, null, { level: 'Low', exposure: 'Minimal (Task Scope)', alert: 'Order items listing permitted.' })}
                className="p-3 rounded-xl border text-left font-bold text-xs hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all flex items-center justify-between group"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <span>[ View Items ]</span>
                <span className="text-[10px] text-emerald-600 font-extrabold group-hover:scale-105">✓ Allowed</span>
              </button>

              {/* Restricted 1: Refund */}
              <button
                onClick={() => handleTestAction(
                  'Request Refund', 
                  'finance.refunds.create(order_id: 1041, amount: 1280)', 
                  false, 
                  'This action is outside the approved task scope.',
                  { level: 'High', exposure: 'High Financial Risk', alert: 'Unauthorized customer refund attempt blocked. Owner funds protected.' }
                )}
                className="p-3 rounded-xl border text-left font-bold text-xs hover:border-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-all flex items-center justify-between text-red-600 dark:text-red-400 group"
                style={{ borderColor: 'var(--badge-red-border)' }}
              >
                <span>[ Request Refund ]</span>
                <span className="text-[10px] text-red-600 font-extrabold group-hover:scale-105">✕ Blocked</span>
              </button>

              {/* Restricted 2: Payout */}
              <button
                onClick={() => handleTestAction(
                  'Request Payout', 
                  'banking.transfer_funds(account: master, amount: 50000)', 
                  false, 
                  'Financial operation strictly restricted to business owner.',
                  { level: 'High', exposure: 'High Financial Risk', alert: 'Direct bank payout blocked by zero-trust guardrail policy.' }
                )}
                className="p-3 rounded-xl border text-left font-bold text-xs hover:border-red-500 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-all flex items-center justify-between text-red-600 dark:text-red-400 group sm:col-span-2"
                style={{ borderColor: 'var(--badge-red-border)' }}
              >
                <span>[ Request Bank Payout ]</span>
                <span className="text-[10px] text-red-600 font-extrabold group-hover:scale-105">✕ Blocked</span>
              </button>

            </div>

            {/* Real-time Dynamic Simulation Evaluation Box */}
            <div className="pt-2">
              {evaluating ? (
                <div className="p-4 rounded-2xl border text-center space-y-2 animate-pulse" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--brand-pink)' }}>
                  <Zap size={20} className="mx-auto text-[var(--brand-pink)] animate-bounce" />
                  <p className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>
                    Evaluating Policy Interceptor & Risk Profile...
                  </p>
                </div>
              ) : testedAction ? (
                <div 
                  className={`p-4 rounded-2xl border space-y-2.5 animate-pop-in ${
                    testedAction.isAllowed ? 'bg-emerald-50/90 border-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-800' : 'bg-red-50/90 border-red-300 dark:bg-red-950/40 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${
                      testedAction.isAllowed ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'
                    }`}>
                      {testedAction.isAllowed ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                      {testedAction.isAllowed ? '✓ ACTION ALLOWED' : '✕ ACTION BLOCKED'}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-dim)]">{testedAction.timestamp}</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <p className="font-bold" style={{ color: 'var(--text-main)' }}>
                      Action: <code className="font-mono">{testedAction.api}</code>
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)]">
                      Policy: <strong>{testedAction.policyTitle}</strong> · User: <strong>{selectedDelegation?.assignedTo || 'Priya'}</strong>
                    </p>
                    <p className={`text-xs font-semibold ${testedAction.isAllowed ? 'text-emerald-800 dark:text-emerald-300' : 'text-red-700 dark:text-red-400'}`}>
                      Result: {testedAction.reason}
                    </p>

                    {/* Associated Risk Information */}
                    <div className={`p-2 rounded-xl text-[11px] font-medium flex items-center gap-2 border ${
                      testedAction.isAllowed 
                        ? 'bg-emerald-100/60 text-emerald-800 border-emerald-200' 
                        : 'bg-red-100/80 text-red-900 border-red-300'
                    }`}>
                      <ShieldAlert size={14} className={testedAction.isAllowed ? 'text-emerald-600' : 'text-red-600'} />
                      <span><strong>Risk & Exposure Impact:</strong> {testedAction.riskAlert}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl border text-center text-xs text-[var(--text-dim)]" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
                  Click an action button above to test TaskKey's zero-trust evaluation gateway and risk mitigation.
                </div>
              )}
            </div>

          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              6. AUTO-EXPIRING ACCESS (Policy Expiry List)
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="card-chic p-6 rounded-3xl border space-y-4" style={{ background: 'var(--bg-surface)' }}>
            
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[var(--brand-pink)]" />
                <h4 className="text-sm font-black uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                  Auto-Expiring Sessions
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--brand-peach)] text-[var(--brand-pink)]">
                Live TTL
              </span>
            </div>

            <div className="space-y-2.5">
              {activeDelegations.map(del => (
                <div key={del.id} className="p-3 rounded-2xl border flex items-center justify-between text-xs" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center gap-2.5">
                    <UserAvatar name={del.assignedTo} size={30} />
                    <div>
                      <p className="font-bold" style={{ color: 'var(--text-main)' }}>{del.assignedTo}</p>
                      <span className="text-[10px] text-[var(--text-muted)] truncate block">{del.title}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-600 block">● Active</span>
                    <span className="text-[10px] text-[var(--text-dim)]">{del.expiryText}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[var(--text-muted)] text-center italic pt-1">
              “Access automatically expires when the task window ends.”
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};
