import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { DashboardScreen } from './components/screens/DashboardAndTeam';
import { DelegationsScreen } from './components/screens/DelegationsScreen';
import { TeamScreen } from './components/screens/TeamScreen';
import { SecurityScreen } from './components/screens/SecurityScreen';
import { AuditScreen } from './components/screens/AuditScreen';
import { PosterGalleryView } from './components/PosterGalleryView';
import { SplitScreenSandbox } from './components/SplitScreenSandbox';
import { InteractiveGuidedTour } from './components/InteractiveGuidedTour';
import { DeveloperPayloadDrawer } from './components/DeveloperPayloadDrawer';
import { CriteriaModal } from './components/CriteriaModal';
import { CreateDelegationModal } from './components/CreateDelegationModal';
import { InteractiveDemoModal } from './components/InteractiveDemoModal';
import './styles/theme.css';

export default function App() {
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('taskkey_theme') || 'light';
  });

  const [activeView, setActiveView] = useState('home'); // 'home' | 'delegations' | 'team' | 'security' | 'audit' | 'gallery' | 'sandbox' | 'guided'
  const [guidedStep, setGuidedStep] = useState(1);
  const [isPayloadOpen, setIsPayloadOpen] = useState(false);
  const [isCriteriaOpen, setIsCriteriaOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Global Audit Trail State
  const [auditEvents, setAuditEvents] = useState([
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
      riskLevel: 'Low',
      riskExposure: '17% (Minimal)',
      policy: 'Order Processing Policy v1.2',
      policyId: 'TK-POL-ORDERS-01',
      session: 'TK-1041-PR',
      category: 'Orders'
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
      riskLevel: 'High',
      riskExposure: 'High Financial Risk',
      policy: 'Order Processing Policy v1.2',
      policyId: 'TK-POL-ORDERS-01',
      session: 'TK-1041-PR',
      category: 'Finance'
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
      reason: 'Business owner 1-click verification confirmed with low-risk profile.',
      riskLevel: 'Low',
      riskExposure: '17% (Minimal)',
      policy: 'Order Processing Policy v1.2',
      policyId: 'TK-POL-ORDERS-01',
      session: 'TK-1041-PR',
      category: 'Auth'
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
      reason: 'TaskKey AI generated least-privilege boundaries and risk mitigation rules.',
      riskLevel: 'Low',
      riskExposure: '17% (Minimal)',
      policy: 'Order Processing Policy v1.2',
      policyId: 'TK-POL-ORDERS-01',
      session: 'TK-1041-PR',
      category: 'Policy'
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
      riskLevel: 'Medium',
      riskExposure: 'Moderate Risk Closed',
      policy: 'Frontend Theme Fix Policy v1.0',
      policyId: 'TK-POL-DEV-07',
      session: 'TK-4019-DEV',
      category: 'Auth'
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
      riskLevel: 'Low',
      riskExposure: '14% (Minimal)',
      policy: 'Warehouse Inventory Policy v2.1',
      policyId: 'TK-POL-INV-04',
      session: 'TK-7192-INV',
      category: 'Inventory'
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
      reason: 'Owner approved low-risk task delegation.',
      riskLevel: 'Low',
      riskExposure: '14% (Minimal)',
      policy: 'Warehouse Inventory Policy v2.1',
      policyId: 'TK-POL-INV-04',
      session: 'TK-7192-INV',
      category: 'Auth'
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
      riskLevel: 'High',
      riskExposure: 'High Financial Risk',
      policy: 'Warehouse Inventory Policy v2.1',
      policyId: 'TK-POL-INV-04',
      session: 'TK-7192-INV',
      category: 'Finance'
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
      riskLevel: 'Low',
      riskExposure: '19% (Minimal)',
      policy: 'Customer Support Policy v1.5',
      policyId: 'TK-POL-SUP-09',
      session: 'TK-6304-SUP',
      category: 'Support'
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
      riskLevel: 'Low',
      riskExposure: '19% (Minimal)',
      policy: 'Customer Support Policy v1.5',
      policyId: 'TK-POL-SUP-09',
      session: 'TK-6304-SUP',
      category: 'Auth'
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
      riskLevel: 'High',
      riskExposure: 'High Privacy Risk',
      policy: 'Customer Support Policy v1.5',
      policyId: 'TK-POL-SUP-09',
      session: 'TK-6304-SUP',
      category: 'Privacy'
    }
  ]);

  // Global Team Members State
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 'team-1',
      name: 'Priya',
      email: 'priya@couturestudio.in',
      role: 'Operations Assistant',
      joinedDate: 'Jan 2026',
      avatarGradient: 'from-[var(--brand-pink)] to-[var(--brand-rose)]',
      activities: [
        { time: '10:42 PM', text: 'Completed Order #1041', status: 'ALLOWED', statusType: 'allowed' },
        { time: '10:39 PM', text: 'Attempted Refund #1041', status: 'BLOCKED', statusType: 'blocked', reason: 'Outside approved task scope' },
        { time: '10:35 PM', text: 'Access token issued for 5 orders', status: 'ACCESS ISSUED', statusType: 'granted' }
      ]
    },
    {
      id: 'team-2',
      name: 'Ananya',
      email: 'ananya@couturestudio.in',
      role: 'Inventory Manager',
      joinedDate: 'Dec 2025',
      avatarGradient: 'from-purple-500 to-indigo-500',
      activities: [
        { time: '9:45 PM', text: 'Updated inventory counts for SKU #SP26-88', status: 'ALLOWED', statusType: 'allowed' },
        { time: '9:15 PM', text: 'Access issued for Spring 2026 Collection', status: 'ACCESS ISSUED', statusType: 'granted' }
      ]
    },
    {
      id: 'team-3',
      name: 'Meera',
      email: 'meera@couturestudio.in',
      role: 'Customer Support',
      joinedDate: 'Nov 2025',
      avatarGradient: 'from-amber-500 to-rose-500',
      activities: [
        { time: '2:15 PM', text: 'Replied to Ticket #892 (Sizing Question)', status: 'ALLOWED', statusType: 'allowed' },
        { time: '8:00 AM', text: 'Access token issued for Support Inbox', status: 'ACCESS ISSUED', statusType: 'granted' }
      ]
    },
    {
      id: 'team-4',
      name: 'Tanvi',
      email: 'tanvi@couturestudio.in',
      role: 'Marketing Assistant',
      joinedDate: 'Feb 2026',
      avatarGradient: 'from-pink-500 to-rose-600',
      activities: [
        { time: '11:00 AM', text: 'Requested delegation for Festive Banners upload', status: 'PENDING APPROVAL', statusType: 'pending' }
      ]
    },
    {
      id: 'team-5',
      name: 'Zara',
      email: 'zara.dev@freelance.io',
      role: 'Frontend Assistant',
      joinedDate: 'Mar 2026',
      avatarGradient: 'from-emerald-500 to-teal-600',
      activities: [
        { time: 'Yesterday', text: 'Fixed mobile navigation CSS on checkout', status: 'ALLOWED', statusType: 'allowed' },
        { time: 'Yesterday', text: 'Session TTL expired — access auto-revoked', status: 'EXPIRED', statusType: 'expired' }
      ]
    }
  ]);

  // Global Delegations State with Risk Intelligence
  const [delegations, setDelegations] = useState([
    {
      id: 'del-1',
      title: 'ORDER PROCESSING',
      taskPrompt: "Process today's 5 orders",
      category: 'E-Commerce Orders',
      assignedTo: 'Priya',
      role: 'Operations Assistant',
      createdBy: 'Riya (Owner)',
      createdAt: '10:35 PM',
      accessScopeType: 'Task-scoped',
      tokenId: 'TK-TOK-8841-SEC',
      policyId: 'TK-POL-ORDERS-01',
      status: 'active',
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
      role: 'Inventory Manager',
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
      role: 'Customer Support',
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
      role: 'Marketing Assistant',
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
      role: 'Frontend Assistant',
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
  ]);

  // Sync theme with DOM attribute and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('taskkey_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'night' : 'light'));
  };

  const handleAddAuditEvent = (newEvent) => {
    setAuditEvents(prev => [newEvent, ...prev]);
  };

  const handleCreateNewDelegation = (newDel) => {
    // 1. Update Delegations list
    setDelegations(prev => [newDel, ...prev]);

    // 2. Update Team Member activity trace
    setTeamMembers(prev => prev.map(m => {
      if (m.name.toLowerCase() === newDel.assignedTo.toLowerCase()) {
        return {
          ...m,
          activities: [
            { time: 'Just now', text: `Access token issued for "${newDel.title}" (${newDel.riskLevel || 'Low'} Risk)`, status: 'ACCESS ISSUED', statusType: 'granted' },
            ...(m.activities || [])
          ]
        };
      }
      return m;
    }));

    // 3. Log into Audit Trail with Risk info
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    handleAddAuditEvent({
      id: `EVT-2026-${Date.now().toString().slice(-4)}`,
      time: timeStr,
      date: 'Today',
      actor: 'Riya',
      role: 'Business Owner',
      task: newDel.title,
      action: `Approved "${newDel.title}" token for ${newDel.assignedTo}`,
      requestedApi: `auth.tokens.issue(grantee: ${newDel.assignedTo}, ttl: ${newDel.expiryMinutes || 60}m)`,
      result: 'ACCESS GRANTED',
      statusType: 'granted',
      decision: 'TOKEN ISSUED',
      reason: `Owner verified least-privilege delegation. Risk Level: ${newDel.riskLevel || 'Low'}.`,
      riskLevel: newDel.riskLevel || 'Low',
      riskExposure: newDel.riskAssessment?.exposureLevel || 'Minimal Exposure',
      policy: `${newDel.title} Policy`,
      policyId: newDel.policyId || 'TK-POL-GEN-01',
      session: newDel.tokenId || 'TK-TOK-NEW',
      category: 'Auth'
    });
  };

  const handleSelectPosterScreen = (screenNumber) => {
    setGuidedStep(screenNumber);
    setActiveView('guided');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[var(--brand-pink)] selection:text-white" style={{ background: 'var(--bg-page)', color: 'var(--text-main)' }}>
      
      {/* SaaS Top Header */}
      <HeaderNav
        theme={theme}
        onToggleTheme={toggleTheme}
        activeView={activeView}
        onSelectView={setActiveView}
        onOpenPayload={() => setIsPayloadOpen(true)}
        onOpenCriteriaModal={() => setIsCriteriaOpen(true)}
        onOpenDelegateModal={() => setIsCreateModalOpen(true)}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW 1: Command Center (Home) */}
        {activeView === 'home' && (
          <DashboardScreen 
            onAssignClick={() => setIsCreateModalOpen(true)}
            onViewTeamClick={() => setActiveView('team')}
            onAuditClick={() => setActiveView('audit')}
            onAddAuditEvent={handleAddAuditEvent}
          />
        )}

        {/* VIEW 2: Delegations Page */}
        {activeView === 'delegations' && (
          <DelegationsScreen 
            delegations={delegations}
            onUpdateDelegations={setDelegations}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onOpenPayload={() => setIsPayloadOpen(true)}
          />
        )}

        {/* VIEW 3: Team Page */}
        {activeView === 'team' && (
          <TeamScreen 
            teamMembers={teamMembers}
            onUpdateTeamMembers={setTeamMembers}
            delegations={delegations}
            onUpdateDelegations={setDelegations}
            onNavigateToDelegations={() => setActiveView('delegations')}
            onOpenDelegateModal={() => setIsCreateModalOpen(true)}
          />
        )}

        {/* VIEW 4: Security & Access Control Page */}
        {activeView === 'security' && (
          <SecurityScreen 
            delegations={delegations}
            teamMembers={teamMembers}
            onUpdateDelegations={setDelegations}
            onOpenCreatePolicyModal={() => setIsCreateModalOpen(true)}
            onAddAuditEvent={handleAddAuditEvent}
          />
        )}

        {/* VIEW 5: Security Audit Log Page */}
        {activeView === 'audit' && (
          <AuditScreen 
            auditEvents={auditEvents}
            onNavigateToSecurity={() => setActiveView('security')}
          />
        )}

        {/* Presenter / Sandbox / Guided Tour Views (Available via discreet Dev Menu) */}
        {activeView === 'gallery' && (
          <PosterGalleryView onSelectScreen={handleSelectPosterScreen} />
        )}

        {activeView === 'sandbox' && (
          <SplitScreenSandbox onOpenPayload={() => setIsPayloadOpen(true)} />
        )}

        {activeView === 'guided' && (
          <InteractiveGuidedTour
            currentStep={guidedStep}
            onSetStep={setGuidedStep}
            onOpenPayload={() => setIsPayloadOpen(true)}
          />
        )}
      </main>

      {/* Enterprise SaaS Footer */}
      <footer className="border-t py-8 mt-16 text-xs" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-4 text-[var(--text-muted)]">
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-sm" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>TaskKey</span>
            <span>—</span>
            <span className="font-medium text-xs">“Delegate the task, not the entire business.”</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-semibold text-[var(--text-dim)]">
            <span>Least-Privilege Scoping</span>
            <span>•</span>
            <span>Zero Password Sharing</span>
            <span>•</span>
            <span className="text-[var(--brand-pink)] font-bold">Cryptographic Access Control</span>
          </div>
        </div>
      </footer>

      {/* Global Modals & Drawers */}
      <CreateDelegationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateDelegation={handleCreateNewDelegation}
        onNavigateToDelegations={() => setActiveView('delegations')}
        teamMembers={teamMembers}
      />

      <InteractiveDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onCompleteDemo={() => {
          setIsDemoModalOpen(false);
          setActiveView('audit');
        }}
      />

      <DeveloperPayloadDrawer
        isOpen={isPayloadOpen}
        onClose={() => setIsPayloadOpen(false)}
      />

      <CriteriaModal
        isOpen={isCriteriaOpen}
        onClose={() => setIsCriteriaOpen(false)}
      />

    </div>
  );
}
