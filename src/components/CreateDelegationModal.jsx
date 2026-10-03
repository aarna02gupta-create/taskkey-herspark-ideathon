import React, { useState, useEffect } from 'react';
import {
  X,
  Bot,
  Shield,
  Check,
  KeyRound,
  Sparkles,
  CheckCircle2,
  Zap,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserAvatar } from './Illustrations';

import { calculateRiskAssessment } from '../data/mockData';

export const CreateDelegationModal = ({ 
  isOpen, 
  onClose, 
  onCreateDelegation,
  onNavigateToDelegations,
  teamMembers: passedTeam
}) => {
  // 5 Workflow Steps: 'input' | 'analyzing' | 'scope_generated' | 'review' | 'issued'
  const [workflowStep, setWorkflowStep] = useState('input');
  const [taskPrompt, setTaskPrompt] = useState("Process today's 5 orders for me");
  const [selectedHelper, setSelectedHelper] = useState('Priya');
  const [selectedTtl, setSelectedTtl] = useState('42 min');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [createdSessionData, setCreatedSessionData] = useState(null);

  const teamList = passedTeam || [
    { name: 'Priya', role: 'Operations Assistant' },
    { name: 'Ananya', role: 'Inventory Specialist' },
    { name: 'Meera', role: 'Customer Support' },
    { name: 'Tanvi', role: 'Marketing Associate' },
    { name: 'Zara', role: 'Frontend Assistant' }
  ];

  const ttlOptions = ['30 min', '42 min', '1 hr', '2 hrs', '4 hrs', 'End of day'];

  const quickPrompts = [
    "Process today's 5 orders for me",
    "Update stock counts for Spring 2026 Collection",
    "Handle customer sizing support tickets",
    "Prepare Festive Collection marketing assets"
  ];

  // Reset workflow on reopen while retaining the selected form values.
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (wasOpen !== isOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setWorkflowStep('input');
      setAnalysisProgress(0);
      setCreatedSessionData(null);
    }
  }

  // AI Analysis Step Timer Simulation
  useEffect(() => {
    if (workflowStep === 'analyzing') {
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setWorkflowStep('scope_generated'), 600);
            return 100;
          }
          return prev + 25;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [workflowStep]);

  if (!isOpen) return null;

  // Derive Policy Scopes based on natural language task prompt + Risk Intelligence
  const derivePolicyScope = (prompt) => {
    const p = prompt.toLowerCase();
    let baseScope;
    
    if (p.includes('order') || p.includes('process')) {
      baseScope = {
        title: 'ORDER PROCESSING',
        category: 'E-Commerce Orders',
        intentSummary: 'Process existing customer orders and update dispatch status.',
        allowed: [
          { name: 'Order Status', api: 'orders.read_status(active_batch)' },
          { name: 'Update Order', api: 'orders.update_status(DISPATCHED)' },
          { name: 'View Item List', api: 'items.list(SKU, qty, shipping)' }
        ],
        restricted: [
          { name: 'Refunds', api: 'refunds.create(*)', reason: 'Not required to complete assigned task.' },
          { name: 'Payouts', api: 'banking.payouts.transfer(*)', reason: 'Financial operation outside task scope.' },
          { name: 'Customer Export', api: 'customers.export_pii(*)', reason: 'Contains sensitive customer information.' },
          { name: 'Payment Settings', api: 'payment.settings.update(*)', reason: 'Critical business infrastructure guardrail.' }
        ]
      };
    } else if (p.includes('stock') || p.includes('inventor')) {
      baseScope = {
        title: 'INVENTORY UPDATE',
        category: 'Warehouse & Stock',
        intentSummary: 'Review and update SKU warehouse inventory quantities.',
        allowed: [
          { name: 'Stock Counts', api: 'inventory.update_stock(SKU: SP26-*)' },
          { name: 'SKU Catalog', api: 'inventory.view_catalog(read_only)' },
          { name: 'Warehouse Bins', api: 'warehouse.view_bins(read_only)' }
        ],
        restricted: [
          { name: 'Supplier Payouts', api: 'finance.vendor_payments(*)', reason: 'Financial transfers locked to owner.' },
          { name: 'Pricing Adjustments', api: 'pricing.edit_rates(*)', reason: 'Pricing alteration blocked.' },
          { name: 'Delete Records', api: 'inventory.delete(*)', reason: 'Zero deletion permissions.' }
        ]
      };
    } else if (p.includes('support') || p.includes('ticket') || p.includes('customer')) {
      baseScope = {
        title: 'CUSTOMER SUPPORT',
        category: 'Helpdesk & Support',
        intentSummary: 'Reply to customer inquiries and verify tracking status.',
        allowed: [
          { name: 'Read Tickets', api: 'support.read_inbox(category: sizing)' },
          { name: 'Reply to Query', api: 'support.send_message(ticket_id)' },
          { name: 'View Tracking', api: 'logistics.view_tracking(*)' }
        ],
        restricted: [
          { name: 'Customer PII Export', api: 'customers.export_pii(*)', reason: 'PII privacy guardrail active.' },
          { name: 'Issue Store Credit', api: 'finance.credits.issue(*)', reason: 'Financial credit authorization required.' },
          { name: 'User Roles', api: 'users.modify_roles(*)', reason: 'Privilege escalation blocked.' }
        ]
      };
    } else {
      // Generic fallback
      baseScope = {
        title: 'MARKETING CAMPAIGN ASSETS',
        category: 'Assets & Media',
        intentSummary: 'Upload and organize media creative drafts for campaign review.',
        allowed: [
          { name: 'CDN Media Upload', api: 'media.upload_assets(folder: campaign)' },
          { name: 'Banner Drafts', api: 'content.draft_banners(status: draft)' }
        ],
        restricted: [
          { name: 'Publish Live', api: 'content.publish_live(*)', reason: 'Requires owner review before go-live.' },
          { name: 'Ad Budget Spend', api: 'marketing.spend_budget(*)', reason: 'Financial budget protection active.' }
        ]
      };
    }

    // Attach calculated risk assessment
    const riskAssessment = calculateRiskAssessment(prompt, baseScope.allowed, baseScope.restricted);
    return {
      ...baseScope,
      riskAssessment
    };
  };

  const currentScope = derivePolicyScope(taskPrompt);

  // Handle Generate Safe Access CTA
  const handleStartAnalysis = (e) => {
    e?.preventDefault();
    if (!taskPrompt.trim()) return;
    setWorkflowStep('analyzing');
    setAnalysisProgress(15);
  };

  // Demo Flow auto-runner
  const handleRunDemoFlow = () => {
    setTaskPrompt("Process today's 5 orders for me");
    setSelectedHelper('Priya');
    setSelectedTtl('42 min');
    setWorkflowStep('analyzing');
    setAnalysisProgress(20);
  };

  // Final Approval & Issuance
  const handleApproveAndIssue = (issuedAt, randomSuffix) => {
    const sessionTokenId = `TK-1041-${selectedHelper.slice(0, 2).toUpperCase()}`;
    const policyId = `TK-POL-${currentScope.category.slice(0, 3).toUpperCase()}-${randomSuffix}`;

    const newDelegationObj = {
      id: `del-${issuedAt}`,
      title: currentScope.title,
      taskPrompt: taskPrompt,
      category: currentScope.category,
      assignedTo: selectedHelper,
      role: teamList.find(m => m.name === selectedHelper)?.role || 'Team Member',
      createdBy: 'Riya (Owner)',
      createdAt: 'Just now',
      accessScopeType: 'Task-scoped',
      tokenId: sessionTokenId,
      policyId: policyId,
      status: 'active',
      expiryText: `Expires in ${selectedTtl}`,
      expiryMinutes: parseInt(selectedTtl) || 42,
      allowedPermissions: currentScope.allowed,
      restrictedPermissions: currentScope.restricted,
      riskLevel: currentScope.riskAssessment.riskLevel,
      riskAssessment: currentScope.riskAssessment
    };

    setCreatedSessionData(newDelegationObj);
    onCreateDelegation(newDelegationObj);
    setWorkflowStep('issued');

    try {
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#D94F82', '#E879A2', '#F6C5D6', '#A82F5C']
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl rounded-3xl border shadow-pop p-6 sm:p-8 space-y-6 animate-pop-in relative overflow-hidden"
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-subtle)] transition-all z-20"
        >
          <X size={20} />
        </button>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STEP 1: DESCRIBE TASK (Natural Language Input)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {workflowStep === 'input' && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Header + Try Demo Flow Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pr-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--brand-pink)] border" style={{ background: 'var(--brand-peach)', borderColor: 'var(--border-subtle)' }}>
                  <KeyRound size={13} />
                  <span>AI Access Scoping</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)' }}>
                  What needs to get done?
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium">
                  Describe the task naturally. TaskKey will determine the minimum access required.
                </p>
              </div>

              <button
                onClick={handleRunDemoFlow}
                className="self-start sm:self-center text-[11px] font-bold px-3 py-1.5 rounded-full border text-[var(--brand-pink)] bg-[var(--brand-peach)] hover:bg-[var(--brand-pink)] hover:text-white transition-all shadow-xs flex items-center gap-1.5"
                style={{ borderColor: 'var(--brand-pink)' }}
                title="Automatically runs the signature TaskKey delegation demonstration"
              >
                <Sparkles size={13} />
                <span>✨ Try Demo Flow</span>
              </button>
            </div>

            {/* Task Prompt Area */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--text-main)' }}>
                1. Describe Task in Plain English
              </label>
              <textarea
                value={taskPrompt}
                onChange={(e) => setTaskPrompt(e.target.value)}
                rows={2}
                placeholder="e.g. Process today's 5 orders for me."
                className="w-full p-4 rounded-2xl border text-sm sm:text-base font-bold transition-all focus:outline-none focus:border-[var(--brand-pink)] shadow-inner"
                style={{ 
                  background: 'var(--bg-surface-subtle)', 
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-main)' 
                }}
              />

              {/* Quick Clickable Examples */}
              <div className="flex flex-wrap gap-2 pt-1">
                {quickPrompts.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setTaskPrompt(q)}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl border text-[var(--brand-pink)] bg-[var(--bg-surface)] hover:bg-[var(--brand-peach)] hover:border-[var(--brand-pink)] transition-all text-left shadow-2xs"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>

            {/* Team Member Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--text-main)' }}>
                2. Assign to Team Member
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {teamList.map((member) => (
                  <button
                    key={member.name}
                    type="button"
                    onClick={() => setSelectedHelper(member.name)}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                      selectedHelper === member.name 
                        ? 'border-[var(--brand-pink)] bg-[var(--brand-peach)] font-bold shadow-xs scale-[1.02]' 
                        : 'border-[var(--border-subtle)] hover:bg-[var(--bg-surface-subtle)]'
                    }`}
                  >
                    <UserAvatar name={member.name} size={32} />
                    <div className="truncate">
                      <p className="text-xs truncate font-bold leading-tight" style={{ color: 'var(--text-main)' }}>{member.name}</p>
                      <span className="text-[10px] text-[var(--text-dim)] truncate block">{member.role}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--text-main)' }}>
                3. Access Duration (Auto-Expires)
              </label>
              <div className="flex flex-wrap gap-2">
                {ttlOptions.map((ttl) => (
                  <button
                    key={ttl}
                    type="button"
                    onClick={() => setSelectedTtl(ttl)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedTtl === ttl 
                        ? 'bg-[var(--brand-pink)] text-white shadow-xs' 
                        : 'border text-[var(--text-muted)] hover:border-[var(--brand-pink)] hover:text-[var(--brand-pink)]'
                    }`}
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    {ttl}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn-outline-subtle text-xs py-3.5 px-5 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStartAnalysis}
                className="flex-1 btn-pink-primary text-sm py-3.5 px-6 justify-center font-bold flex items-center gap-2 shadow-md hover:scale-[1.01] transition-transform"
              >
                <Sparkles size={16} />
                <span>Generate Safe Access →</span>
              </button>
            </div>

          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STEP 2: TASKKEY AI ANALYSIS (Progressive Scoping)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {workflowStep === 'analyzing' && (
          <div className="py-8 space-y-6 text-center animate-pop-in">
            
            <div className="space-y-3">
              <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-white shadow-glow animate-ai-glow" style={{ background: 'linear-gradient(135deg, var(--brand-pink) 0%, var(--brand-pink-dark) 100%)' }}>
                <Bot size={40} className="animate-pulse" />
              </div>

              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-[var(--brand-pink)] bg-[var(--brand-peach)] border border-[var(--border-subtle)]">
                <Zap size={14} className="text-[var(--brand-pink)]" />
                <span>UNDERSTANDING TASK...</span>
              </span>

              <h3 className="text-xl sm:text-2xl font-black" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>
                TaskKey AI Analyzing Business Boundaries
              </h3>

              <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto italic">
                “{taskPrompt}”
              </p>
            </div>

            {/* Progressive Checklist */}
            <div className="max-w-md mx-auto p-4 rounded-2xl border space-y-2.5 text-left text-xs" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-2 text-emerald-600 font-bold">
                <Check size={14} />
                <span>Identifying business intent: <strong>{currentScope.title}</strong></span>
              </div>
              <div className={`flex items-center gap-2 font-bold transition-opacity ${analysisProgress >= 40 ? 'text-emerald-600 opacity-100' : 'text-[var(--text-dim)] opacity-40'}`}>
                <Check size={14} />
                <span>Identifying required resources ({currentScope.allowed.length} endpoints)</span>
              </div>
              <div className={`flex items-center gap-2 font-bold transition-opacity ${analysisProgress >= 65 ? 'text-emerald-600 opacity-100' : 'text-[var(--text-dim)] opacity-40'}`}>
                <Check size={14} />
                <span>Evaluating risk profile & isolating sensitive actions</span>
              </div>
              <div className={`flex items-center gap-2 font-bold transition-opacity ${analysisProgress >= 90 ? 'text-emerald-600 opacity-100' : 'text-[var(--text-dim)] opacity-40'}`}>
                <Check size={14} />
                <span>Applying zero-trust guardrails & TTL limit ({selectedTtl})</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto w-full h-2 rounded-full bg-[var(--bg-surface-subtle)] overflow-hidden border" style={{ borderColor: 'var(--border-subtle)' }}>
              <div 
                className="h-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-rose)] transition-all duration-300 rounded-full" 
                style={{ width: `${analysisProgress}%` }}
              />
            </div>

            <div className="pt-2">
              <span className="text-xs font-bold text-[var(--text-muted)] animate-pulse">
                Decomposing task into least-privilege token policy & risk profile...
              </span>
            </div>

          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STEP 3: ACCESS SCOPE GENERATED & RISK INTELLIGENCE
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {workflowStep === 'scope_generated' && (
          <div className="space-y-5 animate-pop-in max-h-[80vh] overflow-y-auto pr-1">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 border border-emerald-300">
                <CheckCircle2 size={13} />
                <span>TASKKEY AI: TASK UNDERSTOOD & SCOPED</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: 'Outfit', color: 'var(--text-main)' }}>
                Generated Access Scope & Risk Assessment
              </h2>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium">
                Intent: <strong>{currentScope.intentSummary}</strong>
              </p>
            </div>

            {/* Dual Scope Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* ACCESS REQUIRED */}
              <div className="p-4 rounded-2xl border space-y-2.5 bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800">
                <div className="flex items-center justify-between text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                  <span>✓ ACCESS REQUIRED</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100">
                    {currentScope.allowed.length} Operations
                  </span>
                </div>

                <div className="space-y-1.5">
                  {currentScope.allowed.map((item, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-white/80 dark:bg-black/30 border border-emerald-200 text-xs">
                      <span className="font-bold text-emerald-950 dark:text-emerald-100">✓ {item.name}</span>
                      <code className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 block">{item.api}</code>
                    </div>
                  ))}
                </div>
              </div>

              {/* NOT REQUIRED / GUARDRAILED */}
              <div className="p-4 rounded-2xl border space-y-2.5 bg-red-50/70 dark:bg-red-950/20 border-red-300 dark:border-red-800">
                <div className="flex items-center justify-between text-xs font-black text-red-800 dark:text-red-300 uppercase tracking-wider">
                  <span>✕ NOT REQUIRED (GUARDRAILED)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100">
                    Blocked
                  </span>
                </div>

                <div className="space-y-1.5">
                  {currentScope.restricted.map((item, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-white/80 dark:bg-black/30 border border-red-200 text-xs">
                      <span className="font-bold text-red-700 dark:text-red-300 line-through">✕ {item.name}</span>
                      <span className="text-[10px] text-[var(--text-dim)] block">{item.reason}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                RISK INTELLIGENCE SECTION (USP 1)
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <div className="p-4 sm:p-5 rounded-2xl border space-y-3 shadow-xs" style={{ background: 'linear-gradient(135deg, var(--bg-surface-subtle) 0%, var(--bg-surface) 100%)', borderColor: 'var(--border-strong)' }}>
              
              {/* Header with Risk Level Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[var(--brand-peach)] text-[var(--brand-pink)] flex items-center justify-center font-bold">
                    <Shield size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>
                      Risk Intelligence Assessment
                    </h4>
                    <span className="text-[10px] text-[var(--text-dim)]">Automated task exposure calculation</span>
                  </div>
                </div>

                {/* Risk Level Badge */}
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                    currentScope.riskAssessment.riskLevel === 'Low'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : currentScope.riskAssessment.riskLevel === 'Medium'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      currentScope.riskAssessment.riskLevel === 'Low' ? 'bg-emerald-500' : currentScope.riskAssessment.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-red-500'
                    }`} />
                    <span>Risk Level: {currentScope.riskAssessment.riskLevel}</span>
                  </span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl border bg-[var(--bg-surface)]" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)] block">Exposure Level</span>
                  <p className="font-black text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">{currentScope.riskAssessment.exposureLevel}</p>
                </div>

                <div className="p-2.5 rounded-xl border bg-[var(--bg-surface)]" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)] block">Permissions Requested</span>
                  <p className="font-black text-xs mt-0.5" style={{ color: 'var(--text-main)' }}>{currentScope.riskAssessment.permissionsCount} Scoped Operations</p>
                </div>

                <div className="p-2.5 rounded-xl border bg-[var(--bg-surface)] col-span-2 sm:col-span-1" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)] block">Sensitive Actions Guarded</span>
                  <p className="font-black text-xs text-[var(--brand-pink)] mt-0.5 truncate">{currentScope.riskAssessment.sensitiveActions.length} Guardrails Active</p>
                </div>
              </div>

              {/* Sensitive Actions Detected Pills */}
              {currentScope.riskAssessment.sensitiveActions.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)] block">
                    Sensitive Actions Intercepted:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentScope.riskAssessment.sensitiveActions.map((act, idx) => (
                      <span key={idx} className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/40">
                        ✕ {act}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Risk Explanation */}
              <div className="p-3 rounded-xl bg-[var(--bg-surface)] border text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
                <p className="font-semibold text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  <strong style={{ color: 'var(--text-main)' }}>Risk Analysis: </strong>
                  {currentScope.riskAssessment.explanation}
                </p>
              </div>

              {/* Recommended Mitigation Callout */}
              <div className="p-3 rounded-xl border flex items-start gap-2.5 bg-[var(--brand-peach)]" style={{ borderColor: 'var(--border-subtle)' }}>
                <ShieldCheck size={16} className="text-[var(--brand-pink)] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-black text-[11px] uppercase tracking-wider text-[var(--brand-pink)] block">
                    Recommended Mitigation Applied:
                  </span>
                  <p className="font-semibold text-[11px] mt-0.5" style={{ color: 'var(--text-main)' }}>
                    {currentScope.riskAssessment.recommendedMitigation}
                  </p>
                </div>
              </div>

            </div>

            {/* Step Navigation */}
            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <button
                onClick={() => setWorkflowStep('input')}
                className="btn-outline-subtle text-xs py-3 px-4 font-bold flex items-center gap-1.5"
              >
                <span>← Edit Task</span>
              </button>

              <button
                onClick={() => setWorkflowStep('review')}
                className="btn-pink-primary text-xs sm:text-sm py-3 px-6 font-bold flex items-center gap-2 shadow-md"
              >
                <span>Proceed to Review →</span>
              </button>
            </div>

          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STEP 4: OWNER REVIEW (Explicit Approval & Risk Summary)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {workflowStep === 'review' && (
          <div className="space-y-6 animate-pop-in">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--brand-pink)] border" style={{ background: 'var(--brand-peach)', borderColor: 'var(--border-subtle)' }}>
                <ShieldCheck size={13} />
                <span>Owner Confirmation</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: 'Outfit', color: 'var(--text-main)' }}>
                Delegation Preview & Risk Clearance
              </h2>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium">
                Review the task boundaries and verified risk profile before issuing the cryptographic token link.
              </p>
            </div>

            {/* Review Summary Card */}
            <div className="p-5 rounded-2xl border space-y-4 shadow-sm" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)]">Task Assignment</span>
                  <h4 className="text-base font-black" style={{ color: 'var(--text-main)' }}>{currentScope.title}</h4>
                  <p className="text-xs text-[var(--text-muted)] italic">“{taskPrompt}”</p>
                </div>

                <div className="flex items-center gap-2.5">
                  <UserAvatar name={selectedHelper} size={36} />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)]">Assigned To</span>
                    <p className="text-xs font-black" style={{ color: 'var(--text-main)' }}>{selectedHelper}</p>
                    <span className="text-[10px] text-emerald-600 font-bold">Expires in {selectedTtl}</span>
                  </div>
                </div>
              </div>

              {/* Risk Clearance Banner */}
              <div className="p-3 rounded-xl border flex items-center justify-between gap-3 bg-[var(--bg-surface)] text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    currentScope.riskAssessment.riskLevel === 'Low' ? 'bg-emerald-500' : currentScope.riskAssessment.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                  <span className="font-bold text-[11px]" style={{ color: 'var(--text-main)' }}>
                    Risk Assessment: <strong>{currentScope.riskAssessment.riskLevel.toUpperCase()} RISK</strong> ({currentScope.riskAssessment.exposureLevel})
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  ✓ Mitigations Enforced
                </span>
              </div>

              {/* Side-by-Side Permissions Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                {/* Access */}
                <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">✓ ACCESS (Scoped)</span>
                  {currentScope.allowed.map((a, i) => (
                    <p key={i} className="text-emerald-900 dark:text-emerald-200 font-semibold truncate">✓ {a.name}</p>
                  ))}
                </div>

                {/* Restricted */}
                <div className="p-3 rounded-xl bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">✕ RESTRICTED (Guardrails)</span>
                  {currentScope.restricted.map((r, i) => (
                    <p key={i} className="text-red-900 dark:text-red-200 font-semibold line-through truncate">✕ {r.name}</p>
                  ))}
                </div>

              </div>

            </div>

            {/* Approval Buttons */}
            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <button
                onClick={() => setWorkflowStep('input')}
                className="btn-outline-subtle text-xs py-3 px-4 font-bold"
              >
                ← Edit Task
              </button>

              <button
                onClick={() => handleApproveAndIssue(Date.now(), Math.floor(10 + Math.random() * 90))}
                className="btn-pink-primary text-xs sm:text-sm py-3 px-6 font-bold flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
              >
                <Check size={16} />
                <span>Approve & Issue Access</span>
              </button>
            </div>

          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STEP 5: ACCESS ISSUED (Confirmation & Token Seal)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {workflowStep === 'issued' && (
          <div className="py-6 space-y-6 text-center animate-pop-in">
            
            {/* Animated Pink Security Ring */}
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[var(--brand-pink)] opacity-20 animate-ping-soft" />
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-glow" style={{ background: 'var(--brand-pink)' }}>
                <Check size={32} />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                ✓ ACCESS ISSUED · {currentScope.riskAssessment.riskLevel.toUpperCase()} RISK
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: 'Outfit', color: 'var(--text-main)' }}>
                {selectedHelper} can now complete: <br />
                <span style={{ color: 'var(--brand-pink)' }}>{currentScope.title}</span>
              </h2>
              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto font-medium">
                “Access is limited to this task, guardrails are locked, and token will automatically expire.”
              </p>
            </div>

            {/* Token Badge */}
            <div className="max-w-sm mx-auto p-4 rounded-2xl border space-y-1.5 text-xs font-mono" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}>
              <div className="flex justify-between">
                <span className="text-[var(--text-dim)]">Session Token:</span>
                <span className="font-bold text-[var(--brand-pink)]">{createdSessionData?.tokenId || 'TK-1041-PR'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-dim)]">TTL Expiry:</span>
                <span className="text-emerald-600 font-bold">{selectedTtl} remaining</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-dim)]">Risk Guardrails:</span>
                <span className="text-emerald-600 font-bold">{currentScope.riskAssessment.riskLevel} Risk Verified</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (onNavigateToDelegations) onNavigateToDelegations();
                }}
                className="btn-pink-primary text-xs sm:text-sm py-3 px-6 font-bold flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
              >
                <span>View Delegation in Delegations →</span>
              </button>

              <button
                onClick={onClose}
                className="btn-outline-subtle text-xs py-3 px-5 font-bold"
              >
                Done
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
