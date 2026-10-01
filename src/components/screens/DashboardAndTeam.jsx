import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Shield,
  Sparkles, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Lock, 
  Plus, 
  Search, 
  Users, 
  Radio,
  TrendingUp,
  Ban,
  Bot,
  Check, 
  RefreshCw, 
  KeyRound, 
  Activity,
  ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserAvatar } from '../Illustrations';
import { TaskKeyMotionVisual } from '../TaskKeyMotionVisual';
import { calculateRiskAssessment } from '../../data/mockData';

// Screen 1: Enhanced TaskKey Command Center (First Page)
export const DashboardScreen = ({ onAssignClick, onViewTeamClick, onAuditClick, onAddAuditEvent }) => {
  // Live State for Hero Intelligence Flow Interaction
  const [aiFlowState, setAiFlowState] = useState('idle'); // 'idle' | 'analyzing' | 'scoped'
  const [activeTaskPrompt, setActiveTaskPrompt] = useState("Process today's 5 orders");
  
  // Live State for Interactive Simulation
  const [simulatedOrderStatus, setSimulatedOrderStatus] = useState('Pending'); // 'Pending' | 'Processed'
  const [simulationAlert, setSimulationAlert] = useState(null); // null | { type: 'allowed' | 'blocked', title: string, desc: string }
  const [activityFilter, setActivityFilter] = useState('all'); // 'all' | 'blocked' | 'allowed'
  const [isQuickDelegateOpen, setIsQuickDelegateOpen] = useState(false);
  const [delegatePrompt, setDelegatePrompt] = useState("Process today's 5 orders");
  const [selectedHelper, setSelectedHelper] = useState('Priya');
  const [delegationSuccess, setDelegationSuccess] = useState(false);

  // Live Activity Feed State
  const [activityFeed, setActivityFeed] = useState([
    {
      id: 'act-1',
      time: '10:42 PM',
      user: 'Priya',
      role: 'Team Member',
      action: 'completed Order #1041',
      scope: 'orders:process',
      status: 'ALLOWED',
      statusType: 'allowed'
    },
    {
      id: 'act-2',
      time: '10:39 PM',
      user: 'Priya',
      role: 'Team Member',
      action: 'attempted Refund #1041',
      scope: 'orders:refund',
      status: 'BLOCKED',
      statusType: 'blocked',
      reason: 'Outside approved task scope'
    },
    {
      id: 'act-3',
      time: '10:35 PM',
      user: 'Riya',
      role: 'Business Owner',
      action: 'approved Order Processing for Priya',
      scope: 'policy:scoped_issue',
      status: 'ACCESS GRANTED',
      statusType: 'granted'
    }
  ]);

  // Handle Hero Flow Interactive Click
  const handleTriggerHeroFlow = () => {
    setAiFlowState('analyzing');
    setTimeout(() => {
      setAiFlowState('scoped');
      try {
        confetti({
          particleCount: 35,
          spread: 50,
          origin: { y: 0.5, x: 0.75 },
          colors: ['#D94F82', '#E879A2', '#F6C5D6']
        });
      } catch {
        // fallback
      }

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newEntry = {
        id: `act-${Date.now()}`,
        time: timeStr,
        user: 'Riya',
        role: 'Business Owner',
        action: 'scoped 5 orders access token for Priya',
        scope: 'policy:scoped_issue',
        status: 'ACCESS GRANTED',
        statusType: 'granted'
      };
      setActivityFeed(prev => [newEntry, ...prev]);
    }, 900);
  };

  // Handle Allowed Action: Process Order
  const handleProcessOrder = () => {
    setSimulatedOrderStatus('Processed');
    setSimulationAlert({
      type: 'allowed',
      title: '✓ ACTION ALLOWED',
      desc: 'Order #1041 dispatched successfully. Scoped permission verified.',
      riskLevel: 'Low',
      exposure: 'Low exposure · Routine fulfillment operation within 5-order quota.'
    });

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEntry = {
      id: `act-${Date.now()}`,
      time: timeStr,
      user: 'Priya',
      role: 'Team Member',
      action: 'processed Order #1041 (₹1,280)',
      scope: 'orders:process',
      status: 'ALLOWED',
      statusType: 'allowed'
    };

    setActivityFeed(prev => [newEntry, ...prev]);

    if (onAddAuditEvent) {
      onAddAuditEvent({
        id: `EVT-2026-${Date.now().toString().slice(-4)}`,
        time: timeStr,
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
      });
    }
  };

  // Handle Unauthorized Action: Request Refund
  const handleRequestRefund = () => {
    setSimulationAlert({
      type: 'blocked',
      title: '✕ ACTION BLOCKED',
      desc: 'Outside approved task scope. Refunds & customer payouts are strictly restricted.',
      riskLevel: 'High',
      exposure: 'High financial exposure prevented (₹1,280 unauthorized refund blocked).'
    });

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEntry = {
      id: `act-${Date.now()}`,
      time: timeStr,
      user: 'Priya',
      role: 'Team Member',
      action: 'attempted Refund for Order #1041',
      scope: 'orders:refund',
      status: 'BLOCKED',
      statusType: 'blocked',
      reason: 'Outside approved task scope'
    };

    setActivityFeed(prev => [newEntry, ...prev]);

    if (onAddAuditEvent) {
      onAddAuditEvent({
        id: `EVT-2026-${Date.now().toString().slice(-4)}`,
        time: timeStr,
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
        riskExposure: 'High financial risk — unauthorized customer refund attempt prevented'
      });
    }
  };

  // Reset Simulator
  const handleResetSimulation = () => {
    setSimulatedOrderStatus('Pending');
    setSimulationAlert(null);
  };

  // Quick Delegation Submit
  const handleCreateDelegation = () => {
    setDelegationSuccess(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D94F82', '#E879A2', '#F6C5D6', '#A82F5C']
      });
    } catch {
      // fallback
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newEntry = {
      id: `act-${Date.now()}`,
      time: timeStr,
      user: 'Riya',
      role: 'Business Owner',
      action: `delegated "${delegatePrompt}" to ${selectedHelper}`,
      scope: 'policy:scoped_issue',
      status: 'ACCESS GRANTED',
      statusType: 'granted'
    };

    setActivityFeed(prev => [newEntry, ...prev]);

    setTimeout(() => {
      setDelegationSuccess(false);
      setIsQuickDelegateOpen(false);
    }, 1400);
  };

  // Filtered Feed Entries
  const filteredFeed = activityFeed.filter(item => {
    if (activityFilter === 'all') return true;
    if (activityFilter === 'blocked') return item.statusType === 'blocked';
    if (activityFilter === 'allowed') return item.statusType === 'allowed' || item.statusType === 'granted';
    return true;
  });

  return (
    <div className="space-y-16 lg:space-y-20 animate-fade-in pb-12">
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. HERO SECTION WITH TASKKEY INTELLIGENCE VISUAL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. REFINED HERO SECTION (Clean 2-Column with Motion Visual)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="hero-section" className="relative rounded-3xl p-8 sm:p-12 lg:p-14 border transition-all" style={{ background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-subtle) 100%)', borderColor: 'var(--border-subtle)', boxShadow: 'var(--shadow-md)' }}>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: HERO TYPOGRAPHY & CTAs (6 cols) */}
          <div className="lg:col-span-6 space-y-7">
            
            {/* Value Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--brand-pink)] border shadow-2xs" style={{ background: 'var(--brand-peach)', borderColor: 'var(--border-subtle)' }}>
              <Shield size={14} />
              <span>Task-Scoped Access Platform</span>
            </div>

            {/* Grand Hero Heading (56-72px desktop) */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[66px] font-black tracking-tight leading-[1.08]" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)' }}>
                Delegate freely. <br />
                <span style={{ color: 'var(--brand-pink)' }}>Stay in control.</span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-[21px] font-normal leading-relaxed max-w-xl" style={{ color: 'var(--text-muted)' }}>
                Give your team exactly the access they need — and nothing beyond the task.
              </p>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setIsQuickDelegateOpen(true)}
                className="btn-pink-primary text-base py-4 px-8 font-bold shadow-md hover:scale-[1.02] transition-transform flex items-center gap-2.5"
              >
                <Plus size={20} />
                <span>+ Delegate a Task</span>
              </button>

              <a 
                href="#live-activity-section"
                className="btn-outline-subtle text-base py-4 px-6 font-bold flex items-center gap-2"
              >
                <Activity size={18} className="text-[var(--brand-pink)]" />
                <span>View Live Activity →</span>
              </a>
            </div>

            {/* Security Guarantee Badges */}
            <div className="pt-4 border-t flex flex-wrap items-center gap-5 text-xs font-semibold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
              <span className="flex items-center gap-1.5 text-emerald-600">
                <CheckCircle2 size={16} /> Least-Privilege Scoping
              </span>
              <span className="flex items-center gap-1.5 text-[var(--brand-pink)]">
                <Lock size={16} /> Zero Password Sharing
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: PREMIUM TASKKEY MOTION VISUAL (6 cols) */}
          <div className="lg:col-span-6">
            <TaskKeyMotionVisual onTriggerDelegation={() => setIsQuickDelegateOpen(true)} />
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. HOW TASKKEY PROTECTS YOUR BUSINESS (Dedicated 4-Step Flow)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="how-it-works-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--brand-pink)]">
              Core Solution Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif' }}>
              How TaskKey Protects Your Business
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-medium text-[var(--text-muted)] max-w-md">
            Every delegation passes through an automated zero-trust pipeline that guarantees minimal exposure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Step 1: AI Proposes */}
          <div className="card-chic p-6 rounded-2xl border space-y-3 relative group hover:border-[var(--brand-pink)] transition-all" style={{ background: 'var(--bg-surface)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[var(--brand-peach)] text-[var(--brand-pink)]">
                01
              </span>
              <Bot size={20} className="text-[var(--brand-pink)]" />
            </div>
            <h3 className="text-base font-extrabold" style={{ color: 'var(--text-main)' }}>
              AI PROPOSES
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Translates natural language instructions into minimal database endpoints and strict action boundaries.
            </p>
          </div>

          {/* Step 2: Owner Approves */}
          <div className="card-chic p-6 rounded-2xl border space-y-3 relative group hover:border-[var(--brand-pink)] transition-all" style={{ background: 'var(--bg-surface)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[var(--brand-peach)] text-[var(--brand-pink)]">
                02
              </span>
              <CheckCircle2 size={20} className="text-emerald-600" />
            </div>
            <h3 className="text-base font-extrabold" style={{ color: 'var(--text-main)' }}>
              OWNER APPROVES
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Business owner reviews the scope breakdown and issues a single-use token in 1 click. Zero passwords shared.
            </p>
          </div>

          {/* Step 3: Access Is Enforced */}
          <div className="card-chic p-6 rounded-2xl border space-y-3 relative group hover:border-[var(--brand-pink)] transition-all" style={{ background: 'var(--bg-surface)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[var(--brand-peach)] text-[var(--brand-pink)]">
                03
              </span>
              <Shield size={20} className="text-[var(--brand-pink)]" />
            </div>
            <h3 className="text-base font-extrabold" style={{ color: 'var(--text-main)' }}>
              ACCESS IS ENFORCED
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Runtime gateway intercepts every request: permits assigned actions and immediately blocks unauthorized attempts.
            </p>
          </div>

          {/* Step 4: Access Expires */}
          <div className="card-chic p-6 rounded-2xl border space-y-3 relative group hover:border-[var(--brand-pink)] transition-all" style={{ background: 'var(--bg-surface)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[var(--brand-peach)] text-[var(--brand-pink)]">
                04
              </span>
              <Clock size={20} className="text-purple-600" />
            </div>
            <h3 className="text-base font-extrabold" style={{ color: 'var(--text-main)' }}>
              ACCESS EXPIRES
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Token automatically invalidates once the task is complete or time expires. No leftover backdoor access.
            </p>
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. SECURITY OVERVIEW (Minimal Stats + 98% Circular Visual)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={20} className="text-[var(--brand-pink)]" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif' }}>
              Governance & Security Overview
            </h2>
          </div>
          <span className="text-xs font-semibold text-[var(--text-dim)]">Real-time telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          
          {/* Stat 1 */}
          <div className="card-chic p-6 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              <span>Active Delegations</span>
              <Radio size={16} className="text-[var(--brand-pink)]" />
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>5</span>
              <p className="text-xs font-semibold text-emerald-600 mt-1">● Across 4 team members</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="card-chic p-6 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              <span>Team Members</span>
              <Users size={16} className="text-[var(--brand-pink)]" />
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>4</span>
              <p className="text-xs font-medium text-[var(--text-muted)] mt-1">Active helpers & assistants</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="card-chic p-6 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              <span>Sensitive Protected</span>
              <Lock size={16} className="text-[var(--brand-pink)]" />
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>12</span>
              <p className="text-xs font-semibold text-emerald-600 mt-1">Refunds, Payouts, PII</p>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="card-chic p-6 flex flex-col justify-between hover:border-[var(--brand-pink)] transition-all">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              <span>Blocked Attempt</span>
              <Ban size={16} className="text-[var(--color-danger)]" />
            </div>
            <div className="mt-4">
              <span className="text-4xl font-black" style={{ color: 'var(--color-danger)', fontFamily: 'Outfit' }}>1</span>
              <p className="text-xs font-semibold text-red-500 mt-1">Safely blocked by runtime</p>
            </div>
          </div>

          {/* Stat 5: Circular Visualization (BUSINESS PROTECTED 98%) */}
          <div className="card-chic p-6 sm:col-span-2 lg:col-span-1 flex items-center justify-between sm:justify-around gap-4" style={{ background: 'linear-gradient(135deg, var(--bg-surface-subtle) 0%, var(--bg-surface) 100%)' }}>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-pink)] block">
                Security Score
              </span>
              <h4 className="text-xs font-extrabold leading-tight" style={{ color: 'var(--text-main)' }}>
                BUSINESS <br />PROTECTED
              </h4>
              <p className="text-[11px] text-[var(--text-dim)]">Least-Privilege</p>
            </div>

            {/* Circular Progress Ring */}
            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="var(--border-subtle)"
                  strokeWidth="5"
                  fill="transparent"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="var(--brand-pink)"
                  strokeWidth="5"
                  fill="transparent"
                  strokeDasharray="163.36"
                  strokeDashoffset="3.26"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute font-black text-xs" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>
                98%
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. ACCESS SCOPE VISUALIZATION (Innovation Showcase)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-pink)]">
            The TaskKey Innovation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif' }}>
            Why TaskKey is Different from Standard Software
          </h2>
          <p className="text-sm font-medium text-[var(--text-muted)]">
            Traditional task managers only assign tickets; TaskKey cryptographically scopes API and database operations.
          </p>
        </div>

        <div className="card-chic p-8 sm:p-10 rounded-3xl space-y-8" style={{ background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-subtle) 100%)' }}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* BEFORE: Full Business Access */}
            <div className="lg:col-span-5 p-6 rounded-2xl border space-y-4" style={{ background: 'var(--bg-surface)', borderColor: 'var(--badge-red-border)' }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-red-100 text-red-700">
                  BEFORE TASKKEY
                </span>
                <span className="text-xs font-bold text-red-600">100% Surface Exposure</span>
              </div>
              <h4 className="text-base font-extrabold text-red-600">FULL BUSINESS ACCESS</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Traditional platforms give assistants broad store-manager or admin logins with excessive permissions.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {['Orders', 'Customers', 'Payments', 'Refunds', 'Inventory', 'Analytics', 'Settings'].map((item) => (
                  <span key={item} className="text-xs font-bold px-3 py-1.5 rounded-xl bg-red-50 text-red-700 border border-red-200">
                    ⚠ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Middle Transition Engine Indicator */}
            <div className="lg:col-span-2 text-center flex flex-col items-center justify-center gap-2 py-4 lg:py-0">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-md" style={{ background: 'var(--brand-pink)' }}>
                <ShieldCheck size={24} />
              </div>
              <span className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--brand-pink)', fontFamily: 'Outfit' }}>
                Scope Engine
              </span>
              <span className="text-[10px] text-[var(--text-dim)] font-semibold">Zero-Trust Boundary</span>
            </div>

            {/* AFTER: Task-Scoped Access */}
            <div className="lg:col-span-5 p-6 rounded-2xl border space-y-4" style={{ background: 'var(--bg-surface)', borderColor: 'var(--badge-green-border)' }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-100 text-emerald-700">
                  AFTER: WITH TASKKEY
                </span>
                <span className="text-xs font-bold text-emerald-600">Least-Privilege Scoped</span>
              </div>
              <h4 className="text-base font-extrabold text-emerald-700">TASK-SCOPED ACCESS</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                The team member receives access only to the exact records and specific actions required for the active task.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ✓ Order Processing
                </span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ✓ Order Status
                </span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ✓ Order Details
                </span>
              </div>
            </div>

          </div>

          {/* Prominent Metric Banner */}
          <div className="p-6 rounded-2xl border flex flex-wrap items-center justify-between gap-4" style={{ background: 'var(--brand-peach)', borderColor: 'var(--border-strong)' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white shadow-md flex-shrink-0" style={{ background: 'var(--brand-pink)' }}>
                <TrendingUp size={28} />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400" style={{ fontFamily: 'Outfit' }}>
                  83% LESS ACCESS EXPOSURE
                </p>
                <p className="text-xs sm:text-sm font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Cryptographically isolated to the active assignment. Auto-revoked upon task expiry.
                </p>
              </div>
            </div>

            <span className="text-xs font-bold px-4 py-2 rounded-full bg-white text-[var(--brand-pink)] shadow-xs">
              Zero Password Sharing
            </span>
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. LIVE BUSINESS / SECURITY INTERACTION (Interactive Simulation)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif' }}>
                Live Business & Security Interaction
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
              Simulate real-time business actions to test how TaskKey permits authorized operations and blocks unauthorized attempts.
            </p>
          </div>
          <button onClick={handleResetSimulation} className="btn-outline-subtle text-xs py-2 px-3.5 font-bold">
            <RefreshCw size={14} />
            <span>Reset Demo Order</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Order Simulation Card */}
          <div className="lg:col-span-7 card-chic p-6 sm:p-8 rounded-3xl space-y-6" style={{ background: 'var(--bg-surface)' }}>
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--brand-pink)]">LIVE BUSINESS</span>
                <h3 className="text-base sm:text-lg font-bold" style={{ color: 'var(--text-main)' }}>Riya's Store — Order Fulfillment</h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[var(--brand-peach)] text-[var(--brand-pink)]">
                Helper: Priya (Scoped Token)
              </span>
            </div>

            {/* Order Item Box */}
            <div className="p-5 rounded-2xl border space-y-4" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-black text-lg" style={{ color: 'var(--text-main)' }}>Order #1041</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-white text-[var(--brand-pink)] shadow-xs">
                      2 items · ₹1,280
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[var(--text-muted)] mt-1.5">
                    Customer: <strong>Ayesha K.</strong> • Handcrafted Rose Silk Kurta & Blush Dupatta
                  </p>
                </div>

                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  simulatedOrderStatus === 'Processed' 
                    ? 'bg-[var(--badge-green-bg)] text-[var(--badge-green-text)]' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {simulatedOrderStatus === 'Processed' ? '✓ Dispatched' : 'Pending Dispatch'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleProcessOrder}
                  className="btn-pink-primary text-xs sm:text-sm py-3 px-5 font-bold flex-1"
                >
                  <Check size={16} />
                  <span>[ Process Order ]</span>
                </button>

                <button
                  onClick={handleRequestRefund}
                  className="p-3 px-5 rounded-xl border border-dashed border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs sm:text-sm font-bold hover:border-red-500 transition-all flex items-center justify-center gap-2 flex-1"
                >
                  <Ban size={16} />
                  <span>[ Request Refund ]</span>
                </button>
              </div>
            </div>

            {/* Live Feedback Banner */}
            {simulationAlert && (
              <div 
                className={`p-4 sm:p-5 rounded-2xl border animate-pop-in space-y-2 ${
                  simulationAlert.type === 'allowed' ? 'bg-[var(--badge-green-bg)] border-[var(--badge-green-border)]' : 'bg-[var(--badge-red-bg)] border-[var(--badge-red-border)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {simulationAlert.type === 'allowed' ? (
                      <CheckCircle2 size={18} className="text-emerald-600" />
                    ) : (
                      <AlertTriangle size={18} className="text-red-600" />
                    )}
                    <h4 className={`text-xs sm:text-sm font-black tracking-wide ${simulationAlert.type === 'allowed' ? 'text-emerald-700' : 'text-red-700'}`}>
                      {simulationAlert.title}
                    </h4>
                  </div>
                  {simulationAlert.riskLevel && (
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                      simulationAlert.riskLevel === 'High'
                        ? 'bg-red-100 text-red-800 border-red-300'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}>
                      Risk: {simulationAlert.riskLevel}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-medium text-[var(--text-main)] pl-6">
                  {simulationAlert.desc}
                </p>
                {simulationAlert.exposure && (
                  <div className="pl-6 pt-1 text-[11px] font-semibold text-[var(--text-muted)] flex items-center gap-1.5">
                    <ShieldCheck size={13} className={simulationAlert.type === 'allowed' ? 'text-emerald-600' : 'text-red-600'} />
                    <span>{simulationAlert.exposure}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Security Architecture Card */}
          <div className="lg:col-span-5 card-chic p-6 sm:p-8 rounded-3xl space-y-5 flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, var(--bg-surface-subtle) 0%, var(--bg-surface) 100%)' }}>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[var(--brand-pink)]">
                <Bot size={20} />
                <h4 className="text-xs font-bold uppercase tracking-wider">Backend Enforcement Engine</h4>
              </div>
              <h3 className="text-base sm:text-lg font-bold" style={{ color: 'var(--text-main)' }}>
                How TaskKey Evaluates Every API Request
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                When Priya clicks <strong>[ Process Order ]</strong>, TaskKey verifies the cryptographic token payload for <code className="px-1.5 py-0.5 rounded bg-white text-[var(--brand-pink)]">orders:process</code>.
              </p>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                When Priya clicks <strong>[ Request Refund ]</strong>, the backend verifies that <code className="px-1.5 py-0.5 rounded bg-white text-[var(--color-danger)]">orders:refund</code> was never issued in the scope — hard blocking the operation and alerting the audit log.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border bg-white flex items-center justify-between text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
              <span className="font-bold text-[var(--text-main)]">Audit Stream Connected</span>
              <span className="text-[11px] font-mono text-emerald-600 font-bold">100% Cryptographic Proof</span>
            </div>
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. LIVE SECURITY ACTIVITY FEED
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="live-activity-section" className="space-y-6 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Activity size={20} className="text-[var(--brand-pink)]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif' }}>
                Live Security Activity & Audit Feed
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
              Immutable runtime record of all authorized operations and blocked attempts.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 text-xs font-bold p-1.5 rounded-2xl border" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
            <button
              onClick={() => setActivityFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${activityFilter === 'all' ? 'bg-[var(--brand-pink)] text-white shadow-xs' : 'text-[var(--text-muted)]'}`}
            >
              All Events ({activityFeed.length})
            </button>
            <button
              onClick={() => setActivityFilter('blocked')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${activityFilter === 'blocked' ? 'bg-[var(--color-danger)] text-white shadow-xs' : 'text-[var(--text-muted)]'}`}
            >
              Blocked Attempts
            </button>
            <button
              onClick={() => setActivityFilter('allowed')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${activityFilter === 'allowed' ? 'bg-emerald-600 text-white shadow-xs' : 'text-[var(--text-muted)]'}`}
            >
              Allowed Scope
            </button>
          </div>
        </div>

        {/* Audit Feed Items */}
        <div className="card-chic rounded-3xl overflow-hidden border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
          <div className="divide-y divide-[var(--border-subtle)]">
            {filteredFeed.map((item) => (
              <div key={item.id} className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-[var(--bg-surface-hover)] transition-colors animate-fade-in">
                
                <div className="flex items-center gap-4">
                  <div className="font-mono text-xs font-bold text-[var(--text-dim)] w-18">
                    {item.time}
                  </div>

                  <UserAvatar name={item.user} size={36} />

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm" style={{ color: 'var(--text-main)' }}>
                        {item.user}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--bg-surface-subtle)] text-[var(--text-dim)]">
                        {item.role}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {item.action}
                      {item.reason && (
                        <span className="text-red-500 font-semibold italic ml-2">
                          ({item.reason})
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline font-mono text-[11px] text-[var(--text-dim)]">
                    {item.scope}
                  </span>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    item.statusType === 'allowed' ? 'badge-allowed' :
                    item.statusType === 'blocked' ? 'badge-blocked' :
                    'badge-granted'
                  }`}>
                    {item.status}
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          QUICK DELEGATION MODAL (+ Delegate a Task CTA)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {isQuickDelegateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="card-chic max-w-lg w-full p-8 rounded-3xl space-y-6 shadow-pop border-2 animate-pop-in" style={{ borderColor: 'var(--border-strong)', background: 'var(--bg-surface)' }}>
            
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shadow-sm" style={{ background: 'var(--brand-pink)' }}>
                  <Plus size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--text-main)' }}>+ Delegate a Task</h3>
                  <p className="text-xs text-[var(--text-muted)]">Natural language least-privilege scoping</p>
                </div>
              </div>
              <button 
                onClick={() => setIsQuickDelegateOpen(false)}
                className="p-1.5 rounded-xl text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-subtle)]"
              >
                ✕
              </button>
            </div>

            {delegationSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-3xl shadow-sm">
                  ✓
                </div>
                <h4 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>Task Delegated Successfully!</h4>
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                  TaskKey AI generated cryptographic scoped permissions for {selectedHelper}.
                </p>
              </div>
            ) : (
              <>
                {/* Step 1: Prompt */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider block text-[var(--text-dim)]">
                    Describe the task for your team member
                  </label>
                  <textarea
                    rows={2}
                    value={delegatePrompt}
                    onChange={(e) => setDelegatePrompt(e.target.value)}
                    className="w-full p-3.5 rounded-2xl text-xs sm:text-sm font-medium border outline-none resize-none focus:border-[var(--brand-pink)]"
                    style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                    placeholder="e.g. Process today's 5 orders..."
                  />

                  {/* Quick Fillers */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      "Process today's 5 orders",
                      "Update Summer Silk inventory count",
                      "Reply to WhatsApp customer inquiries"
                    ].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setDelegatePrompt(preset)}
                        className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition-all ${
                          delegatePrompt === preset ? 'bg-[var(--brand-pink)] text-white border-[var(--brand-pink)]' : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-subtle)]'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Helper Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider block text-[var(--text-dim)]">
                    Select Team Member
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {['Priya', 'Riya Sharma', 'Neha Patel', 'Ananya Mehta'].map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setSelectedHelper(name)}
                        className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                          selectedHelper === name ? 'border-[var(--brand-pink)] bg-[var(--brand-peach)] font-bold' : 'border-[var(--border-subtle)]'
                        }`}
                      >
                        <UserAvatar name={name} size={28} />
                        <span className="text-xs truncate">{name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Scoping & Risk Intelligence Preview */}
                {(() => {
                  const quickRisk = calculateRiskAssessment(delegatePrompt, [
                    { id: 'p1', name: 'Task Scoped Operation', actions: ['action:process', 'action:read'] }
                  ]);
                  return (
                    <div className="space-y-2">
                      <div className="p-3.5 rounded-2xl border space-y-1.5 text-xs" style={{ background: 'var(--badge-green-bg)', borderColor: 'var(--badge-green-border)' }}>
                        <div className="flex items-center gap-2 font-bold text-[var(--badge-green-text)]">
                          <Bot size={15} />
                          <span>AI Derived Least-Privilege Scope:</span>
                        </div>
                        <p className="text-xs text-[var(--text-main)] font-semibold">
                          ✓ Allowed: Scoped operations matching task prompt
                        </p>
                        <p className="text-xs text-red-600 font-semibold">
                          ✕ Guardrailed: Refunds, Payouts, Customer DB Export
                        </p>
                      </div>

                      {/* Risk Intelligence Pill */}
                      <div className="p-3.5 rounded-2xl border space-y-1.5 text-xs" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--brand-pink)' }}>
                            <ShieldAlert size={14} />
                            <span className="text-[11px] uppercase tracking-wider">Risk Intelligence</span>
                          </div>
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                            quickRisk.riskLevel === 'High'
                              ? 'bg-red-100 text-red-800 border-red-300'
                              : quickRisk.riskLevel === 'Medium'
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          }`}>
                            Risk: {quickRisk.riskLevel} ({quickRisk.exposureLevel})
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--text-muted)] font-medium">
                          💡 Mitigation: {quickRisk.recommendedMitigation}
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* Confirm Button */}
                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => setIsQuickDelegateOpen(false)}
                    className="btn-outline-subtle text-xs py-3 px-4 font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleCreateDelegation}
                    className="flex-1 btn-pink-primary text-xs sm:text-sm py-3 justify-center font-bold"
                  >
                    <KeyRound size={16} />
                    <span>Issue Task-Scoped Access</span>
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

// Screen 2: My Team Screen
export const TeamScreen = ({ team, onSelectMember, onAssignClick }) => {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-main)' }}>My Team</h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>Manage your trusted helpers and active task delegations</p>
        </div>
        <button onClick={onAssignClick} className="btn-pink-primary text-sm">
          <Plus size={16} />
          <span>Add Member</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-dim)' }} />
        <input 
          type="text" 
          placeholder="Search team member..." 
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none transition-all"
          style={{ 
            background: 'var(--bg-surface)', 
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-main)'
          }}
        />
      </div>

      {/* Member Cards */}
      <div className="space-y-3">
        {team.map((member) => (
          <div 
            key={member.id} 
            className="card-chic p-4 flex flex-wrap items-center justify-between gap-4 transition-all hover:border-[var(--brand-pink)] cursor-pointer"
            onClick={() => onSelectMember(member)}
          >
            <div className="flex items-center gap-3.5">
              <UserAvatar name={member.name} size={44} />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm" style={{ color: 'var(--text-main)' }}>{member.name}</h4>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    member.status === 'Available' 
                      ? 'bg-[var(--badge-green-bg)] text-[var(--badge-green-text)]' 
                      : 'bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)]'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    {member.status}
                  </span>
                </div>
                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{member.role} • <span className="italic">{member.relation}</span></p>
                <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-dim)' }}>
                  Active tasks: <strong style={{ color: 'var(--text-main)' }}>{member.activeTasks}</strong> | Completed: <strong style={{ color: 'var(--text-main)' }}>{member.completedTasks}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); onAssignClick(member); }}
                className={member.status === 'Available' ? 'btn-pink-secondary text-xs py-1.5 px-3.5' : 'btn-outline-subtle text-xs py-1.5 px-3.5'}
              >
                {member.status === 'Available' ? 'Assign Task' : 'View'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Screen 3: Employee Profile
export const EmployeeProfileScreen = ({ member, onBack, onAssignTask }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={onBack} className="btn-outline-subtle text-xs py-1.5 px-3">
        ← Back to Team
      </button>

      <div className="card-chic p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-4">
            <UserAvatar name={member.name} size={64} />
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>{member.name}</h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--badge-green-bg)] text-[var(--badge-green-text)] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {member.status}
                </span>
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{member.role}</p>
              <p className="text-xs italic" style={{ color: 'var(--text-dim)' }}>{member.relation}</p>
            </div>
          </div>

          <button onClick={() => onAssignTask(member)} className="btn-pink-primary text-sm">
            <Plus size={16} />
            <span>Assign New Task</span>
          </button>
        </div>

        {/* Profile Tabs Mockup */}
        <div className="flex gap-6 mt-4 border-b text-xs font-bold" style={{ borderColor: 'var(--border-subtle)' }}>
          <button className="pb-2.5 border-b-2 font-bold" style={{ borderColor: 'var(--brand-pink)', color: 'var(--brand-pink)' }}>Overview</button>
          <button className="pb-2.5 text-[var(--text-muted)] hover:text-[var(--brand-pink)]">Activity</button>
          <button className="pb-2.5 text-[var(--text-muted)] hover:text-[var(--brand-pink)]">Performance</button>
        </div>

        {/* Current Workload Bar */}
        <div className="mt-5 p-4 rounded-xl" style={{ background: 'var(--bg-surface-subtle)', border: '1px solid var(--border-subtle)' }}>
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span style={{ color: 'var(--text-main)' }}>Current Workload Capacity</span>
            <span style={{ color: 'var(--brand-pink)' }}>{member.workload}%</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ width: `${member.workload}%`, background: 'linear-gradient(90deg, var(--brand-pink) 0%, var(--brand-rose) 100%)' }} 
            />
          </div>
        </div>

        {/* Active Tasks & Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--border-subtle)' }}>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Active Tasks</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg" style={{ background: 'var(--bg-surface-subtle)' }}>
                <div>
                  <p className="font-bold" style={{ color: 'var(--text-main)' }}>1. Dispatch Orders #101–105</p>
                  <p className="text-[11px]" style={{ color: 'var(--text-dim)' }}>3 remaining to mark</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)]">
                  In progress
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg" style={{ background: 'var(--bg-surface-subtle)' }}>
                <div>
                  <p className="font-bold" style={{ color: 'var(--text-main)' }}>2. Shipping Labels Batch</p>
                  <p className="text-[11px]" style={{ color: 'var(--text-dim)' }}>8 remaining</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)]">
                  In progress
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--border-subtle)' }}>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>Recent Security Activity</h4>
            <div className="space-y-2 text-xs">
              {member.recentActivity?.map((act, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center gap-2">
                    {act.type === 'blocked' ? (
                      <XCircle size={14} className="text-red-500 flex-shrink-0" />
                    ) : (
                      <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                    )}
                    <span className="font-medium" style={{ color: act.type === 'blocked' ? 'var(--badge-red-text)' : 'var(--text-main)' }}>
                      {act.action}
                    </span>
                  </div>
                  <span className="text-[11px]" style={{ color: 'var(--text-dim)' }}>{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
