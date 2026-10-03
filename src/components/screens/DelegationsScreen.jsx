import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  ShieldCheck,
  Shield,
  Clock,
  CheckCircle2,
  KeyRound,
  Ban,
  Filter,
  Lock,
  ChevronRight,
  Check,
  X,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserAvatar } from '../Illustrations';

export const DelegationsScreen = ({ 
  delegations, 
  onUpdateDelegations, 
  onOpenCreateModal}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'pending' | 'expired'
  const [selectedDelegation, setSelectedDelegation] = useState(null);
  const [showPolicyJson, setShowPolicyJson] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Initial Sample Delegations if none passed from props
  const defaultDelegations = [
    {
      id: 'del-1',
      title: 'ORDER PROCESSING',
      taskPrompt: "Process today's 5 orders",
      category: 'E-Commerce Orders',
      assignedTo: 'Priya',
      role: 'Team Member',
      createdBy: 'Riya (Owner)',
      createdAt: '10:35 PM',
      accessScopeType: 'Task-scoped',
      tokenId: 'TK-TOK-8841-SEC',
      policyId: 'TK-POL-ORDERS-01',
      status: 'active', // 'active' | 'pending' | 'expired' | 'revoked'
      expiryText: 'Expires in 42 min',
      expiryMinutes: 42,
      riskLevel: 'Low',
      riskAssessment: {
        riskLevel: 'Low',
        exposureLevel: '17% (Minimal)',
        permissionsCount: 3,
        sensitiveActions: ['Refunds (Blocked)', 'Bank Payouts (Blocked)', 'Customer PII Export (Blocked)'],
        explanation: 'Task is strictly confined to assigned order status updates. High-risk financial operations and customer PII are guardrailed.',
        recommendedMitigation: 'Restrict refund permissions & enforce auto-expiry upon task completion.'
      },
      allowedPermissions: [
        { name: 'Order Processing', api: 'orders.update_status(DISPATCHED)' },
        { name: 'Order Status', api: 'orders.read_status(ID: 1041-1045)' },
        { name: 'Order Details', api: 'items.list(SKU, qty, shipping)' }
      ],
      restrictedPermissions: [
        { name: 'Refunds', api: 'finance.issue_refund(*)', reason: 'Financial risk prevention' },
        { name: 'Payouts', api: 'banking.transfer_funds(*)', reason: 'Owner bank account isolation' },
        { name: 'Customer Data Export', api: 'customers.export_pii(*)', reason: 'Data privacy guardrail' }
      ]
    },
    {
      id: 'del-2',
      title: 'INVENTORY UPDATE',
      taskPrompt: 'Update stock counts for Spring 2026 Collection',
      category: 'Warehouse & Stock',
      assignedTo: 'Ananya',
      role: 'Inventory Specialist',
      createdBy: 'Riya (Owner)',
      createdAt: '9:15 PM',
      accessScopeType: 'Task-scoped',
      tokenId: 'TK-TOK-7192-INV',
      policyId: 'TK-POL-INV-04',
      status: 'active',
      expiryText: 'Expires in 2 hrs',
      expiryMinutes: 120,
      riskLevel: 'Low',
      riskAssessment: {
        riskLevel: 'Low',
        exposureLevel: '14% (Minimal)',
        permissionsCount: 3,
        sensitiveActions: ['Supplier Payouts (Blocked)', 'Catalog Deletion (Blocked)', 'Pricing Adjustments (Blocked)'],
        explanation: 'Scope is strictly restricted to SKU warehouse counts for assigned collections. All financial & pricing endpoints are locked.',
        recommendedMitigation: 'Lock catalogue deletion & pricing alteration endpoints to owner only.'
      },
      allowedPermissions: [
        { name: 'Inventory Counts', api: 'inventory.update_stock(SKU: SP26-*)' },
        { name: 'SKU Catalog View', api: 'inventory.view_catalog(read_only)' },
        { name: 'Warehouse Bin Locations', api: 'warehouse.view_bins(read_only)' }
      ],
      restrictedPermissions: [
        { name: 'Supplier Payouts', api: 'finance.vendor_payments(*)', reason: 'Restricted to owner' },
        { name: 'Pricing Adjustments', api: 'pricing.edit_rates(*)', reason: 'Price alteration blocked' },
        { name: 'Delete Catalog Records', api: 'inventory.delete(*)', reason: 'Zero deletion rights' }
      ]
    },
    {
      id: 'del-3',
      title: 'CUSTOMER SUPPORT',
      taskPrompt: 'Resolve sizing inquiries & order status tickets',
      category: 'Helpdesk & Support',
      assignedTo: 'Meera',
      role: 'Support Lead',
      createdBy: 'Riya (Owner)',
      createdAt: '8:00 AM',
      accessScopeType: 'Task-scoped',
      tokenId: 'TK-TOK-6304-SUP',
      policyId: 'TK-POL-SUP-09',
      status: 'active',
      expiryText: 'Expires today (8:00 PM)',
      expiryMinutes: 480,
      riskLevel: 'Low',
      riskAssessment: {
        riskLevel: 'Low',
        exposureLevel: '19% (Minimal)',
        permissionsCount: 3,
        sensitiveActions: ['Customer PII Export (Blocked)', 'Store Credit Issuance (Blocked)', 'Role Escalation (Blocked)'],
        explanation: 'Access is limited to customer ticket message replies. Customer credit card records and bulk data exports are barred.',
        recommendedMitigation: 'Mask sensitive customer records & restrict store credit issuance to store owner.'
      },
      allowedPermissions: [
        { name: 'Read Customer Tickets', api: 'support.read_inbox(category: sizing)' },
        { name: 'Reply to Queries', api: 'support.send_message(ticket_id)' },
        { name: 'View Tracking Info', api: 'logistics.view_tracking(*)' }
      ],
      restrictedPermissions: [
        { name: 'Direct Customer PII Export', api: 'customers.export(*)', reason: 'PII protection policy' },
        { name: 'Issue Store Credit / Refunds', api: 'finance.credits(*)', reason: 'Manager authorization required' },
        { name: 'Modify User Accounts', api: 'users.modify_roles(*)', reason: 'Privilege escalation blocked' }
      ]
    },
    {
      id: 'del-4',
      title: 'MARKETING CAMPAIGN ASSETS',
      taskPrompt: 'Upload Festive Collection high-res banners & lookbooks',
      category: 'Assets & Media',
      assignedTo: 'Tanvi',
      role: 'Marketing Associate',
      createdBy: 'Riya (Owner)',
      createdAt: '11:00 AM',
      accessScopeType: 'Task-scoped',
      tokenId: 'TK-TOK-5521-MKT',
      policyId: 'TK-POL-MKT-02',
      status: 'pending',
      expiryText: 'Awaiting Owner 1-Click Verification',
      expiryMinutes: 0,
      riskLevel: 'Low',
      riskAssessment: {
        riskLevel: 'Low',
        exposureLevel: '12% (Minimal)',
        permissionsCount: 2,
        sensitiveActions: ['Publish Live (Blocked)', 'Ad Budget Allocation (Blocked)'],
        explanation: 'Access is confined to draft asset staging and folder media uploads without live storefront publishing.',
        recommendedMitigation: 'Keep live storefront publish & ad budget spending restricted to owner review.'
      },
      allowedPermissions: [
        { name: 'CDN Media Upload', api: 'media.upload_assets(folder: festive2026)' },
        { name: 'Banner Drafts', api: 'content.draft_banners(status: draft)' }
      ],
      restrictedPermissions: [
        { name: 'Publish to Live Storefront', api: 'content.publish_live(*)', reason: 'Requires owner review' },
        { name: 'Ad Budget Allocation', api: 'marketing.spend_ad_budget(*)', reason: 'Financial restriction' }
      ]
    },
    {
      id: 'del-5',
      title: 'STOREFRONT THEME FIX',
      taskPrompt: 'Fix mobile navigation CSS padding on checkout page',
      category: 'Frontend Code',
      assignedTo: 'Zara',
      role: 'Freelance Developer',
      createdBy: 'Riya (Owner)',
      createdAt: 'Yesterday',
      accessScopeType: 'Task-scoped',
      tokenId: 'TK-TOK-4019-DEV',
      policyId: 'TK-POL-DEV-07',
      status: 'expired',
      expiryText: 'Expired 1 hr ago (Auto-revoked)',
      expiryMinutes: 0,
      riskLevel: 'Medium',
      riskAssessment: {
        riskLevel: 'Medium',
        exposureLevel: '38% (Moderate)',
        permissionsCount: 1,
        sensitiveActions: ['Payment Gateway Webhooks (Blocked)', 'Database Dumps (Blocked)'],
        explanation: 'Task touches storefront checkout CSS styles. Backend credentials & payment webhooks are isolated.',
        recommendedMitigation: 'Restrict access strictly to CSS stylesheets with automatic 1-hour session revocation.'
      },
      allowedPermissions: [
        { name: 'CSS Stylesheet Editor', api: 'theme.edit_css(target: checkout.css)' }
      ],
      restrictedPermissions: [
        { name: 'Payment Gateway Webhooks', api: 'payments.gateways(*)', reason: 'Zero backend credential access' },
        { name: 'Database Dumps', api: 'db.full_backup(*)', reason: 'Strictly restricted' }
      ]
    }
  ];

  const [items, setItems] = useState(delegations || defaultDelegations);

  // Sync with parent state if prop changes
  const currentItems = delegations || items;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Revoke Access Action
  const handleRevoke = (id) => {
    const updated = currentItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'revoked',
          expiryText: 'Manually Revoked by Owner'
        };
      }
      return item;
    });

    if (onUpdateDelegations) {
      onUpdateDelegations(updated);
    } else {
      setItems(updated);
    }

    if (selectedDelegation && selectedDelegation.id === id) {
      setSelectedDelegation({
        ...selectedDelegation,
        status: 'revoked',
        expiryText: 'Manually Revoked by Owner'
      });
    }

    showToast(`Access token revoked immediately for ${selectedDelegation?.assignedTo || 'team member'}.`);
  };

  // Approve Pending Action
  const handleApprove = (id) => {
    const updated = currentItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'active',
          expiryText: 'Expires in 4 hours'
        };
      }
      return item;
    });

    if (onUpdateDelegations) {
      onUpdateDelegations(updated);
    } else {
      setItems(updated);
    }

    if (selectedDelegation && selectedDelegation.id === id) {
      setSelectedDelegation({
        ...selectedDelegation,
        status: 'active',
        expiryText: 'Expires in 4 hours'
      });
    }

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    showToast(`Delegation approved! Scoped token issued.`);
  };

  // Filtered and Searched items
  const filteredDelegations = useMemo(() => {
    return currentItems.filter(item => {
      // Status Filter
      if (statusFilter === 'active' && item.status !== 'active') return false;
      if (statusFilter === 'pending' && item.status !== 'pending') return false;
      if (statusFilter === 'expired' && item.status !== 'expired' && item.status !== 'revoked') return false;

      // Search Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchPrompt = item.taskPrompt.toLowerCase().includes(query);
        const matchUser = item.assignedTo.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        return matchTitle || matchPrompt || matchUser || matchCategory;
      }

      return true;
    });
  }, [currentItems, statusFilter, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: currentItems.length,
      active: currentItems.filter(i => i.status === 'active').length,
      pending: currentItems.filter(i => i.status === 'pending').length,
      expired: currentItems.filter(i => i.status === 'expired' || i.status === 'revoked').length
    };
  }, [currentItems]);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-pop-in">
          <div className="p-4 rounded-2xl border shadow-pop flex items-center gap-3 text-xs font-bold" style={{ background: 'var(--bg-surface)', borderColor: 'var(--brand-pink)' }}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--brand-pink)] to-[var(--brand-rose)] text-white flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>Action Confirmed</p>
              <p className="text-xs text-[var(--text-muted)]">{toastMessage}</p>
            </div>
            <button onClick={() => setToastMessage(null)} className="ml-2 text-[var(--text-dim)] hover:text-[var(--text-main)]">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. PAGE HEADER & PRIMARY ACTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--brand-pink)] border" style={{ background: 'var(--brand-peach)', borderColor: 'var(--border-subtle)' }}>
            <KeyRound size={13} />
            <span>Task Access Management</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)' }}>
            Your Delegations
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal max-w-2xl">
            See what your team is working on — and exactly what access each task has.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCreateModal}
            className="btn-pink-primary text-sm sm:text-base py-3.5 px-6 font-bold shadow-md hover:scale-[1.02] transition-transform flex items-center gap-2"
          >
            <Plus size={18} />
            <span>+ Delegate a Task</span>
          </button>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. SEARCH & FILTER TABS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center p-1.5 rounded-2xl border shadow-2xs gap-1 self-start overflow-x-auto max-w-full" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              statusFilter === 'all'
                ? 'bg-[var(--brand-pink)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--brand-pink)]'
            }`}
          >
            <span>All Delegations</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusFilter === 'all' ? 'bg-white/25 text-white' : 'bg-[var(--bg-surface)] text-[var(--text-dim)]'}`}>
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('active')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              statusFilter === 'active'
                ? 'bg-[var(--brand-pink)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--brand-pink)]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Active</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusFilter === 'active' ? 'bg-white/25 text-white' : 'bg-[var(--bg-surface)] text-[var(--text-dim)]'}`}>
              {counts.active}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              statusFilter === 'pending'
                ? 'bg-[var(--brand-pink)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--brand-pink)]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Pending</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusFilter === 'pending' ? 'bg-white/25 text-white' : 'bg-[var(--bg-surface)] text-[var(--text-dim)]'}`}>
              {counts.pending}
            </span>
          </button>

          <button
            onClick={() => setStatusFilter('expired')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              statusFilter === 'expired'
                ? 'bg-[var(--brand-pink)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--brand-pink)]'
            }`}
          >
            <span>Expired / Revoked</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusFilter === 'expired' ? 'bg-white/25 text-white' : 'bg-[var(--bg-surface)] text-[var(--text-dim)]'}`}>
              {counts.expired}
            </span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search delegations, members, scopes..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm transition-all focus:outline-none focus:border-[var(--brand-pink)]"
            style={{ 
              background: 'var(--bg-surface)', 
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-main)' 
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)] hover:text-[var(--text-main)]"
            >
              <X size={14} />
            </button>
          )}
        </div>

      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. PREMIUM VISUAL DELEGATION LIST
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {filteredDelegations.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border space-y-3" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
          <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-[var(--brand-pink)] bg-[var(--brand-peach)]">
            <Filter size={24} />
          </div>
          <h3 className="text-base font-bold" style={{ color: 'var(--text-main)' }}>No matching delegations found</h3>
          <p className="text-xs text-[var(--text-muted)]">
            Try adjusting your search query or switching filters.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDelegations.map((item) => {
            const isActive = item.status === 'active';
            const isPending = item.status === 'pending';
            const isExpired = item.status === 'expired' || item.status === 'revoked';

            return (
              <div
                key={item.id}
                onClick={() => setSelectedDelegation(item)}
                className="card-chic p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer group hover:border-[var(--brand-pink)] relative overflow-hidden"
                style={{ background: 'var(--bg-surface)' }}
              >
                
                {/* Subtle top indicator bar */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    isActive ? 'bg-emerald-500' : isPending ? 'bg-amber-500' : 'bg-[var(--border-subtle)]'
                  }`} 
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  
                  {/* Col 1: Task Title & Natural Language Description (4 cols) */}
                  <div className="lg:col-span-4 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--brand-peach)] text-[var(--brand-pink)]">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--text-dim)]">
                        {item.tokenId}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black tracking-tight group-hover:text-[var(--brand-pink)] transition-colors" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>
                      {item.title}
                    </h3>

                    <p className="text-xs font-semibold italic text-[var(--text-muted)]">
                      “{item.taskPrompt}”
                    </p>
                  </div>

                  {/* Col 2: Access Scope Boundaries & Risk Level (3 cols) */}
                  <div className="lg:col-span-3 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)] block">
                      Security & Risk Posture
                    </span>
                    
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg ${
                        item.riskLevel === 'High' 
                          ? 'bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800' 
                          : item.riskLevel === 'Medium'
                          ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      }`}>
                        <Shield size={12} /> {item.riskLevel || 'Low'} Risk ({item.riskAssessment?.exposureLevel?.split(' ')[0] || '17%'})
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-[var(--badge-green-bg)] text-[var(--badge-green-text)] border border-[var(--badge-green-border)]">
                        <Check size={12} /> {item.allowedPermissions.length} Scoped
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-[var(--badge-red-bg)] text-[var(--badge-red-text)] border border-[var(--badge-red-border)]">
                        <Lock size={12} /> {item.restrictedPermissions.length} Guardrails
                      </span>
                    </div>
                  </div>

                  {/* Col 3: Assigned Team Member (2 cols) */}
                  <div className="lg:col-span-2 flex items-center gap-3">
                    <UserAvatar name={item.assignedTo} size={36} />
                    <div>
                      <h4 className="text-xs font-black" style={{ color: 'var(--text-main)' }}>{item.assignedTo}</h4>
                      <p className="text-[10px] text-[var(--text-muted)]">{item.role}</p>
                    </div>
                  </div>

                  {/* Col 4: Status & Expiry + Action CTA (3 cols) */}
                  <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-4 border-t lg:border-t-0 pt-3 lg:pt-0" style={{ borderColor: 'var(--border-subtle)' }}>
                    <div className="text-left lg:text-right">
                      {isActive && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-[var(--badge-green-bg)] text-[var(--badge-green-text)] border border-[var(--badge-green-border)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Active</span>
                        </div>
                      )}
                      {isPending && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)] border border-amber-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>Pending</span>
                        </div>
                      )}
                      {isExpired && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--bg-surface-subtle)] text-[var(--text-dim)] border border-[var(--border-subtle)]">
                          <Clock size={11} />
                          <span>{item.status === 'revoked' ? 'Revoked' : 'Expired'}</span>
                        </div>
                      )}

                      <p className="text-[11px] font-medium text-[var(--text-muted)] mt-1">
                        {item.expiryText}
                      </p>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDelegation(item);
                      }}
                      className="p-2.5 rounded-xl border group-hover:bg-[var(--brand-pink)] group-hover:text-white group-hover:border-[var(--brand-pink)] transition-all flex items-center gap-1 text-xs font-bold text-[var(--text-muted)]"
                      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
                      title="Inspect delegation details"
                    >
                      <span className="hidden sm:inline">Details</span>
                      <ChevronRight size={15} />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. DETAILED INSPECTION MODAL / SLIDE-OUT PANEL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {selectedDelegation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-pop p-6 sm:p-8 space-y-6 animate-pop-in relative"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => {
                setSelectedDelegation(null);
                setShowPolicyJson(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-subtle)] transition-all"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="space-y-1.5 pr-8">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--brand-peach)] text-[var(--brand-pink)]">
                  {selectedDelegation.category}
                </span>
                <span className="text-[10px] font-mono text-[var(--text-dim)]">
                  Token: {selectedDelegation.tokenId}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)' }}>
                {selectedDelegation.title}
              </h2>
            </div>

            {/* Task Prompt Box */}
            <div className="p-4 rounded-2xl border space-y-1" style={{ background: 'var(--brand-peach)', borderColor: 'var(--border-subtle)' }}>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--brand-pink)]">
                Delegated Task Intent
              </span>
              <p className="text-base font-extrabold" style={{ color: 'var(--text-main)' }}>
                “{selectedDelegation.taskPrompt}”
              </p>
            </div>

            {/* Assignment & Status Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl border" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
              
              {/* Assigned Member */}
              <div className="flex items-center gap-3">
                <UserAvatar name={selectedDelegation.assignedTo} size={42} />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)]">Assigned To</span>
                  <h4 className="text-sm font-black" style={{ color: 'var(--text-main)' }}>{selectedDelegation.assignedTo}</h4>
                  <p className="text-xs text-[var(--text-muted)]">{selectedDelegation.role}</p>
                </div>
              </div>

              {/* Status & TTL */}
              <div className="space-y-1 sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)]">Access Expiry Status</span>
                <div className="flex items-center sm:justify-end gap-2">
                  <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                    selectedDelegation.status === 'active' 
                      ? 'bg-[var(--badge-green-bg)] text-[var(--badge-green-text)] border border-[var(--badge-green-border)]' 
                      : selectedDelegation.status === 'pending'
                      ? 'bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)] border border-amber-300'
                      : 'bg-[var(--bg-surface)] text-[var(--text-dim)] border border-[var(--border-subtle)]'
                  }`}>
                    ● {selectedDelegation.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[var(--text-muted)]">{selectedDelegation.expiryText}</p>
              </div>

            </div>

            {/* Risk Intelligence Breakdown */}
            <div className="p-4 rounded-2xl border space-y-3" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-[var(--brand-pink)]" />
                  <span className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>
                    Risk Intelligence & Exposure
                  </span>
                </div>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  (selectedDelegation.riskLevel || 'Low') === 'High'
                    ? 'bg-red-100 text-red-800 border border-red-300'
                    : (selectedDelegation.riskLevel || 'Low') === 'Medium'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  ● {(selectedDelegation.riskLevel || 'Low').toUpperCase()} RISK
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)] block">Exposure Level</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {selectedDelegation.riskAssessment?.exposureLevel || '17% (Minimal)'}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)] block">Scope Isolation</span>
                  <p className="font-bold mt-0.5" style={{ color: 'var(--text-main)' }}>
                    {selectedDelegation.allowedPermissions?.length || 3} Operations
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border col-span-2 sm:col-span-1" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)] block">Mitigation State</span>
                  <p className="font-bold text-[var(--brand-pink)] mt-0.5">
                    Enforced
                  </p>
                </div>
              </div>

              {selectedDelegation.riskAssessment?.explanation && (
                <p className="text-xs text-[var(--text-muted)] font-medium italic">
                  “{selectedDelegation.riskAssessment.explanation}”
                </p>
              )}

              {selectedDelegation.riskAssessment?.recommendedMitigation && (
                <div className="p-2.5 rounded-xl bg-[var(--brand-peach)] text-xs flex items-center gap-2 text-[var(--brand-pink)] border border-[var(--border-subtle)] font-semibold">
                  <ShieldCheck size={14} className="flex-shrink-0" />
                  <span>Mitigation: {selectedDelegation.riskAssessment.recommendedMitigation}</span>
                </div>
              )}
            </div>

            {/* Dual Scope Breakdown (Granted vs Restricted) */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                Least-Privilege Policy Boundaries
              </h3>

              {/* Allowed Actions */}
              <div className="p-4 rounded-2xl border space-y-2.5" style={{ background: 'var(--badge-green-bg)', borderColor: 'var(--badge-green-border)' }}>
                <div className="flex items-center justify-between text-xs font-black text-[var(--badge-green-text)] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={15} /> ACCESS GRANTED (Scoped API Operations)</span>
                  <span>{selectedDelegation.allowedPermissions.length} Approved</span>
                </div>

                <div className="space-y-1.5">
                  {selectedDelegation.allowedPermissions.map((perm, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-white/70 dark:bg-black/20 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[var(--text-main)]">✓ {perm.name}</span>
                        <code className="text-[10px] font-mono text-[var(--text-dim)] block">{perm.api}</code>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        PERMITTED
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Restricted Actions */}
              <div className="p-4 rounded-2xl border space-y-2.5" style={{ background: 'var(--badge-red-bg)', borderColor: 'var(--badge-red-border)' }}>
                <div className="flex items-center justify-between text-xs font-black text-[var(--badge-red-text)] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Lock size={15} /> ACCESS RESTRICTED (Zero-Trust Guardrails)</span>
                  <span>{selectedDelegation.restrictedPermissions.length} Enforced</span>
                </div>

                <div className="space-y-1.5">
                  {selectedDelegation.restrictedPermissions.map((perm, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-white/70 dark:bg-black/20 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-red-600 dark:text-red-400">✕ {perm.name}</span>
                        <span className="text-[10px] text-[var(--text-dim)] block">{perm.reason}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
                        BLOCKED
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Expandable Cryptographic Policy JSON */}
            {showPolicyJson && (
              <div className="p-4 rounded-2xl border bg-black text-emerald-400 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-[11px] text-gray-400 border-b border-gray-800 pb-1">
                  <span>Policy ID: {selectedDelegation.policyId}</span>
                  <span>SHA-256 Validated</span>
                </div>
                <pre className="overflow-x-auto text-[11px] leading-relaxed">
{JSON.stringify({
  tokenId: selectedDelegation.tokenId,
  grantee: selectedDelegation.assignedTo,
  scope: selectedDelegation.allowedPermissions.map(p => p.api),
  guardrails: selectedDelegation.restrictedPermissions.map(p => p.api),
  ttl_minutes: selectedDelegation.expiryMinutes,
  enforce_origin: "TaskKey Runtime Gateway v2.4",
  status: selectedDelegation.status
}, null, 2)}
                </pre>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <button
                onClick={() => setShowPolicyJson(!showPolicyJson)}
                className="btn-outline-subtle text-xs py-2.5 px-4 font-bold flex items-center gap-1.5"
              >
                <Eye size={14} />
                <span>{showPolicyJson ? 'Hide Raw Policy' : 'View Access Policy'}</span>
              </button>

              <div className="flex items-center gap-3">
                {selectedDelegation.status === 'pending' && (
                  <button
                    onClick={() => handleApprove(selectedDelegation.id)}
                    className="btn-pink-primary text-xs py-2.5 px-4 font-bold flex items-center gap-1.5"
                  >
                    <Check size={14} />
                    <span>Approve & Issue Access</span>
                  </button>
                )}

                {selectedDelegation.status === 'active' && (
                  <button
                    onClick={() => handleRevoke(selectedDelegation.id)}
                    className="py-2.5 px-4 rounded-xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-600 hover:text-white transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <Ban size={14} />
                    <span>Revoke Access</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setSelectedDelegation(null);
                    setShowPolicyJson(false);
                  }}
                  className="btn-outline-subtle text-xs py-2.5 px-4 font-bold"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
