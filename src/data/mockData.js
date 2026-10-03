export const initialOrders = [
  { id: '101', customer: 'Ayesha K.', item: 'Handcrafted Silk Kurta (Rose Dust)', price: '$85.00', status: 'Dispatched', tracking: 'TK-88391', time: '10:42 AM' },
  { id: '102', customer: 'Meera S.', item: 'Rose Gold Jhumka Earrings', price: '$45.00', status: 'Dispatched', tracking: 'TK-88392', time: '11:15 AM' },
  { id: '103', customer: 'Pooja R.', item: 'Velvet Clutch Bag (Blush Pink)', price: '$65.00', status: 'Pending Dispatch', tracking: 'Pending', time: '11:30 AM' },
  { id: '104', customer: 'Kavita N.', item: 'Organic Rose Water Mist (Pack of 2)', price: '$32.00', status: 'Pending Dispatch', tracking: 'Pending', time: '11:45 AM' },
  { id: '105', customer: 'Divya M.', item: 'Embroidered Organza Dupatta', price: '$95.00', status: 'Pending Dispatch', tracking: 'Pending', time: '12:00 PM' },
];

export const teamMembers = [
  {
    id: 'riya',
    name: 'Riya Sharma',
    role: 'Order Fulfillment Specialist',
    relation: 'Cousin & Part-time Helper',
    status: 'Available',
    activeTasks: 2,
    completedTasks: 38,
    workload: 60,
    avatar: 'riya',
    skills: ['Order Processing', 'Packaging', 'Label Printing'],
    currentTask: 'Dispatch Orders #101–105',
    recentActivity: [
      { action: 'Dispatched Order #102', time: 'Today, 10:42 AM', type: 'allowed' },
      { action: 'Added shipping note', time: 'Today, 10:42 AM', type: 'allowed' },
      { action: 'Attempted refund (blocked)', time: 'Today, 09:17 AM', type: 'blocked' }
    ]
  },
  {
    id: 'neha',
    name: 'Neha Patel',
    role: 'Customer Support',
    relation: 'College Friend',
    status: 'Available',
    activeTasks: 1,
    completedTasks: 24,
    workload: 35,
    avatar: 'neha',
    skills: ['Chat Support', 'FAQ Answers'],
    currentTask: 'Customer Support Reply',
    recentActivity: [
      { action: 'Replied to 12 chat tickets', time: 'Today, 11:30 AM', type: 'allowed' }
    ]
  },
  {
    id: 'ananya',
    name: 'Ananya Mehta',
    role: 'Inventory Manager',
    relation: 'Freelance Assistant',
    status: 'Busy',
    activeTasks: 4,
    completedTasks: 52,
    workload: 85,
    avatar: 'ananya',
    skills: ['Stock Counting', 'SKU Audit'],
    currentTask: 'Summer Silk Inventory Update',
    recentActivity: [
      { action: 'Audited 40 SKU counts', time: 'Today, 08:20 AM', type: 'allowed' }
    ]
  },
  {
    id: 'aman',
    name: 'Aman Khan',
    role: 'Operations Helper',
    relation: 'Brother',
    status: 'Available',
    activeTasks: 0,
    completedTasks: 12,
    workload: 10,
    avatar: 'aman',
    skills: ['Logistics Drop-off', 'Packing'],
    currentTask: 'None (Task expired yesterday)',
    recentActivity: [
      { action: 'Task expired: Inventory Update', time: 'Yesterday', type: 'info' }
    ]
  }
];

export const initialAuditLog = [
  { id: 'aud-01', time: '1:24 PM', user: 'Riya Sharma', action: 'Dispatched #102', scope: 'orders:dispatch', status: 'Allowed' },
  { id: 'aud-02', time: '12:56 PM', user: 'Riya Sharma', action: 'Attempted Refund #103', scope: 'orders:refund', status: 'Blocked' },
  { id: 'aud-03', time: '11:42 AM', user: 'Neha Patel', action: 'View Orders List', scope: 'orders:read', status: 'Allowed' },
  { id: 'aud-04', time: '10:21 AM', user: 'Ananya Mehta', action: 'Update Inventory SKU', scope: 'inventory:write', status: 'Allowed' },
  { id: 'aud-05', time: '09:17 AM', user: 'Riya Sharma', action: 'Attempted Export Customers', scope: 'customers:export', status: 'Blocked' },
  { id: 'aud-06', time: '09:00 AM', user: 'Juhi Sharma (Owner)', action: 'Approved Task & Policy #tsk_001', scope: 'policy:create', status: 'Allowed' }
];

export const developerPayload = {
  taskId: "tsk_001_dispatch",
  owner: "juhi.sharma@couture.com",
  delegatee: {
    userId: "riya_sharma_98",
    name: "Riya Sharma",
    role: "Helper"
  },
  policyVersion: "2026-09-30-v1",
  cryptographicProof: "ecdsa-sha256-sig_8f3d91b4a7c29e",
  permissions: {
    "orders:read": {
      allowed: true,
      recordFilter: ["101", "102", "103", "104", "105"],
      redactFields: ["customer_payment_method", "credit_card_last4", "billing_address", "net_margin"]
    },
    "orders:update_dispatch": {
      allowed: true,
      recordFilter: ["101", "102", "103", "104", "105"]
    },
    "orders:add_note": {
      allowed: true
    },
    "orders:refund": {
      allowed: false,
      enforcement: "HARD_BLOCK_ALERT"
    },
    "payments:access": {
      allowed: false,
      enforcement: "HARD_BLOCK_ALERT"
    },
    "customers:export": {
      allowed: false,
      enforcement: "HARD_BLOCK_ALERT"
    },
    "settings:modify": {
      allowed: false,
      enforcement: "GHOST_UI_LOCKED"
    }
  },
  sessionLimits: {
    validFrom: "2026-09-30T10:00:00Z",
    expiresAt: "2026-09-30T18:00:00Z",
    remainingSeconds: 5520,
    killSwitchEnabled: true,
    autoRevokeOnCompletion: true
  },
  exposureAnalysis: {
    unrestrictedManagerExposure: "82%",
    taskKeyScopedExposure: "12%",
    attackSurfaceReduction: "85.3%"
  }
};

export const calculateRiskAssessment = (taskPrompt = '', allowedPermissions = []) => {
  const p = taskPrompt.toLowerCase();
  
  if (p.includes('refund') || p.includes('payout') || p.includes('bank') || p.includes('payment') || p.includes('money')) {
    return {
      riskLevel: 'High',
      badgeColor: 'red',
      exposureLevel: '85% (High)',
      permissionsCount: allowedPermissions.length || 3,
      sensitiveActions: ['Direct Fund Transfers', 'Payment Gateway Settings', 'Customer Financial Ledger'],
      explanation: 'Task requests financial or payment modification capabilities which directly impact company funds and accounts.',
      recommendedMitigation: 'Restrict refund permissions & require explicit owner approval for any financial modifications.',
      riskScore: 85
    };
  } else if (p.includes('export') || p.includes('database') || p.includes('pii') || p.includes('theme') || p.includes('code') || p.includes('admin')) {
    return {
      riskLevel: 'Medium',
      badgeColor: 'amber',
      exposureLevel: '45% (Moderate)',
      permissionsCount: allowedPermissions.length || 2,
      sensitiveActions: ['Customer PII Export', 'Raw Database Access', 'Theme Code Deployment'],
      explanation: 'Task touches customer contact information or codebase styles. Guardrails are required to prevent data exfiltration.',
      recommendedMitigation: 'Enforce field-level data masking on customer PII & require owner review before live publishing.',
      riskScore: 45
    };
  } else if (p.includes('stock') || p.includes('inventory')) {
    return {
      riskLevel: 'Low',
      badgeColor: 'emerald',
      exposureLevel: '14% (Minimal)',
      permissionsCount: allowedPermissions.length || 3,
      sensitiveActions: ['Supplier Payouts (Blocked)', 'Catalog Deletion (Blocked)', 'Pricing Adjustments (Blocked)'],
      explanation: 'Scope is strictly restricted to SKU warehouse counts for assigned collections. All financial & pricing endpoints are locked.',
      recommendedMitigation: 'Lock catalogue deletion & pricing alteration endpoints to owner only.',
      riskScore: 14
    };
  } else if (p.includes('support') || p.includes('ticket') || p.includes('customer')) {
    return {
      riskLevel: 'Low',
      badgeColor: 'emerald',
      exposureLevel: '19% (Minimal)',
      permissionsCount: allowedPermissions.length || 3,
      sensitiveActions: ['Customer PII Export (Blocked)', 'Store Credit Issuance (Blocked)', 'Role Escalation (Blocked)'],
      explanation: 'Access is limited to customer ticket message replies. Customer credit card records and bulk data exports are barred.',
      recommendedMitigation: 'Mask sensitive customer records & restrict store credit issuance to store owner.',
      riskScore: 19
    };
  } else if (p.includes('marketing') || p.includes('banner') || p.includes('asset')) {
    return {
      riskLevel: 'Low',
      badgeColor: 'emerald',
      exposureLevel: '12% (Minimal)',
      permissionsCount: allowedPermissions.length || 2,
      sensitiveActions: ['Live Storefront Publishing (Blocked)', 'Ad Budget Allocation (Blocked)'],
      explanation: 'Access is confined to draft asset staging and folder media uploads without live storefront publishing.',
      recommendedMitigation: 'Keep live storefront publish & ad budget spending restricted to owner review.',
      riskScore: 12
    };
  }

  // Default: Order Processing or General Safe Task
  return {
    riskLevel: 'Low',
    badgeColor: 'emerald',
    exposureLevel: '17% (Minimal)',
    permissionsCount: allowedPermissions.length || 3,
    sensitiveActions: ['Refunds (Blocked)', 'Bank Payouts (Blocked)', 'Customer PII Export (Blocked)'],
    explanation: 'Task is strictly confined to assigned order status updates. High-risk financial operations and customer PII are guardrailed.',
    recommendedMitigation: 'Restrict refund permissions & enforce auto-expiry upon task completion.',
    riskScore: 17
  };
};

