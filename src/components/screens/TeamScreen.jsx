import React, { useState, useMemo } from 'react';
import { 
  Users, 
  UserPlus, 
  KeyRound, 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  ChevronRight, 
  Plus, 
  X, 
  Search, 
  Ban, 
  Activity, 
  Calendar, 
  Mail, 
  Sparkles, 
  Shield, 
  Check, 
  SlidersHorizontal,
  FileText,
  UserCheck,
  UserX,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserAvatar } from '../Illustrations';

export const TeamScreen = ({ 
  teamMembers, 
  onUpdateTeamMembers, 
  delegations, 
  onUpdateDelegations, 
  onNavigateToDelegations, 
  onOpenDelegateModal 
}) => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'pending' | 'expired'
  const [toastMessage, setToastMessage] = useState(null);

  // New member form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Operations Assistant');
  const [isAddingSuccess, setIsAddingSuccess] = useState(false);

  // Initial Team Members if none passed via props
  const defaultTeam = [
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
  ];

  const [members, setMembers] = useState(teamMembers || defaultTeam);
  const currentMembers = teamMembers || members;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Find active delegation for a given member name from the shared delegations list
  const getMemberDelegation = (memberName) => {
    if (!delegations) return null;
    return delegations.find(d => d.assignedTo === memberName && (d.status === 'active' || d.status === 'pending' || d.status === 'expired' || d.status === 'revoked'));
  };

  // Calculate high-level team metrics
  const stats = useMemo(() => {
    const totalMembers = currentMembers.length;
    let activeMembers = 0;
    let pendingAccess = 0;
    let activeDelegationsCount = 0;

    currentMembers.forEach(member => {
      const del = getMemberDelegation(member.name);
      if (del) {
        if (del.status === 'active') {
          activeMembers++;
          activeDelegationsCount++;
        } else if (del.status === 'pending') {
          pendingAccess++;
        }
      }
    });

    return {
      total: totalMembers,
      active: activeMembers,
      activeDelegations: activeDelegationsCount || 3,
      pending: pendingAccess || 1
    };
  }, [currentMembers, delegations]);

  // Revoke delegation for a member
  const handleRevokeForMember = (delId, memberName) => {
    if (onUpdateDelegations && delegations) {
      const updated = delegations.map(d => {
        if (d.id === delId) {
          return { ...d, status: 'revoked', expiryText: 'Manually Revoked by Owner' };
        }
        return d;
      });
      onUpdateDelegations(updated);
    }
    showToast(`Access revoked immediately for ${memberName}.`);
  };

  // Add new team member
  const handleAddMemberSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newMemberObj = {
      id: `team-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      joinedDate: 'Just now',
      avatarGradient: 'from-[var(--brand-pink)] to-[var(--brand-rose)]',
      activities: [
        { time: 'Just now', text: 'Team member account created. No permanent access granted.', status: 'ZERO ACCESS', statusType: 'neutral' }
      ]
    };

    setIsAddingSuccess(true);
    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    setTimeout(() => {
      const updated = [newMemberObj, ...currentMembers];
      if (onUpdateTeamMembers) {
        onUpdateTeamMembers(updated);
      } else {
        setMembers(updated);
      }
      setIsAddingSuccess(false);
      setIsAddMemberOpen(false);
      setNewName('');
      setNewEmail('');
      showToast(`${newMemberObj.name} added to team. Access will be granted only when a task is delegated.`);
    }, 1200);
  };

  // Filtered members
  const filteredMembers = useMemo(() => {
    return currentMembers.filter(member => {
      const del = getMemberDelegation(member.name);
      const status = del ? del.status : 'no_access';

      if (statusFilter === 'active' && status !== 'active') return false;
      if (statusFilter === 'pending' && status !== 'pending') return false;
      if (statusFilter === 'expired' && status !== 'expired' && status !== 'revoked') return false;

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = member.name.toLowerCase().includes(query);
        const matchRole = member.role.toLowerCase().includes(query);
        const matchEmail = member.email.toLowerCase().includes(query);
        const matchTask = del && (del.title.toLowerCase().includes(query) || del.taskPrompt.toLowerCase().includes(query));
        return matchName || matchRole || matchEmail || matchTask;
      }

      return true;
    });
  }, [currentMembers, delegations, statusFilter, searchQuery]);

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
              <p className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>Confirmation</p>
              <p className="text-xs text-[var(--text-muted)]">{toastMessage}</p>
            </div>
            <button onClick={() => setToastMessage(null)} className="ml-2 text-[var(--text-dim)] hover:text-[var(--text-main)]">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. PAGE HEADER & CTAs
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--brand-pink)] border" style={{ background: 'var(--brand-peach)', borderColor: 'var(--border-subtle)' }}>
            <Users size={13} />
            <span>Task-Scoped Team Roster</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)' }}>
            Your Team
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-muted)] font-normal max-w-2xl">
            See who has access, what they’re working on, and why.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsAddMemberOpen(true)}
            className="btn-pink-primary text-sm sm:text-base py-3.5 px-6 font-bold shadow-md hover:scale-[1.02] transition-transform flex items-center gap-2"
          >
            <UserPlus size={18} />
            <span>+ Add Team Member</span>
          </button>

          <button
            onClick={onNavigateToDelegations}
            className="btn-outline-subtle text-sm sm:text-base py-3.5 px-5 font-bold flex items-center gap-2"
          >
            <KeyRound size={17} className="text-[var(--brand-pink)]" />
            <span>Manage Access</span>
          </button>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. ELEGANT TEAM OVERVIEW STATS (Minimal & Refined)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="card-chic p-5 rounded-2xl border flex items-center justify-between" style={{ background: 'var(--bg-surface)' }}>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-dim)]">Team Members</span>
            <p className="text-3xl sm:text-4xl font-black mt-1" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>
              {stats.total}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[var(--brand-peach)] text-[var(--brand-pink)] flex items-center justify-center font-bold">
            <Users size={22} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="card-chic p-5 rounded-2xl border flex items-center justify-between" style={{ background: 'var(--bg-surface)' }}>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Currently Active</span>
            <p className="text-3xl sm:text-4xl font-black mt-1 text-emerald-600" style={{ fontFamily: 'Outfit' }}>
              {stats.active}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 size={22} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="card-chic p-5 rounded-2xl border flex items-center justify-between" style={{ background: 'var(--bg-surface)' }}>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-pink)]">Active Delegations</span>
            <p className="text-3xl sm:text-4xl font-black mt-1 text-[var(--brand-pink)]" style={{ fontFamily: 'Outfit' }}>
              {stats.activeDelegations}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[var(--brand-peach)] text-[var(--brand-pink)] flex items-center justify-center font-bold">
            <ShieldCheck size={22} />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="card-chic p-5 rounded-2xl border flex items-center justify-between" style={{ background: 'var(--bg-surface)' }}>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Pending Access</span>
            <p className="text-3xl sm:text-4xl font-black mt-1 text-amber-600" style={{ fontFamily: 'Outfit' }}>
              {stats.pending}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock size={22} />
          </div>
        </div>

      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. SEARCH & STATUS FILTER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Filter Tabs */}
        <div className="flex items-center p-1.5 rounded-2xl border shadow-2xs gap-1 self-start overflow-x-auto" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'all'
                ? 'bg-[var(--brand-pink)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--brand-pink)]'
            }`}
          >
            All Members ({currentMembers.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              statusFilter === 'active'
                ? 'bg-[var(--brand-pink)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--brand-pink)]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Active</span>
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              statusFilter === 'pending'
                ? 'bg-[var(--brand-pink)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--brand-pink)]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Pending</span>
          </button>
          <button
            onClick={() => setStatusFilter('expired')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              statusFilter === 'expired'
                ? 'bg-[var(--brand-pink)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--brand-pink)]'
            }`}
          >
            Expired / Revoked
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-dim)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search member, role, or task..."
            className="w-full pl-9 pr-4 py-2 rounded-2xl border text-xs sm:text-sm focus:outline-none focus:border-[var(--brand-pink)] transition-all"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
          />
        </div>

      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. REFINED TEAM MEMBER CARDS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => {
          const delegation = getMemberDelegation(member.name);
          const isActive = delegation?.status === 'active';
          const isPending = delegation?.status === 'pending';
          const isExpired = delegation?.status === 'expired' || delegation?.status === 'revoked';
          const hasNoDelegation = !delegation;

          return (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="card-chic p-6 rounded-3xl border transition-all cursor-pointer group hover:border-[var(--brand-pink)] flex flex-col justify-between space-y-5 relative overflow-hidden"
              style={{ background: 'var(--bg-surface)' }}
            >
              {/* Top Accent Strip */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  isActive ? 'bg-emerald-500' : isPending ? 'bg-amber-500' : isExpired ? 'bg-[var(--border-subtle)]' : 'bg-gray-300'
                }`} 
              />

              {/* Card Header: Avatar, Name, Role, Status */}
              <div className="flex items-start justify-between gap-3 pt-1">
                <div className="flex items-center gap-3.5">
                  <UserAvatar name={member.name} size={46} />
                  <div>
                    <h3 className="text-base font-black tracking-tight group-hover:text-[var(--brand-pink)] transition-colors" style={{ color: 'var(--text-main)', fontFamily: 'Outfit' }}>
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[var(--text-muted)]">{member.role}</p>
                    <span className="text-[10px] text-[var(--text-dim)]">{member.email}</span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div>
                  {isActive && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[var(--badge-green-bg)] text-[var(--badge-green-text)] border border-[var(--badge-green-border)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Active</span>
                    </span>
                  )}
                  {isPending && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)] border border-amber-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>Pending</span>
                    </span>
                  )}
                  {isExpired && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[var(--bg-surface-subtle)] text-[var(--text-dim)] border border-[var(--border-subtle)]">
                      <Clock size={11} />
                      <span>{delegation.status === 'revoked' ? 'Revoked' : 'Expired'}</span>
                    </span>
                  )}
                  {hasNoDelegation && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[var(--bg-surface-subtle)] text-[var(--text-dim)] border border-[var(--border-subtle)]">
                      <span>No Active Token</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Current Task Assignment */}
              <div className="p-3.5 rounded-2xl border space-y-1" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--brand-pink)] block">
                  Current Task Assignment
                </span>
                <p className="text-xs font-black" style={{ color: 'var(--text-main)' }}>
                  {delegation ? delegation.title : 'No active assignment'}
                </p>
                {delegation && (
                  <p className="text-[11px] text-[var(--text-muted)] italic truncate">
                    “{delegation.taskPrompt}”
                  </p>
                )}
              </div>

              {/* IMPORTANT VISUAL: ACCESS SCOPE BOUNDARY BOX */}
              <div className="p-3.5 rounded-2xl border space-y-2 text-xs font-mono" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center justify-between text-[10px] font-sans font-extrabold uppercase tracking-wider text-[var(--text-dim)]">
                  <span>Cryptographic Access Scope</span>
                  <span className="text-[var(--brand-pink)]">{delegation?.tokenId || 'LOCKED'}</span>
                </div>

                {delegation ? (
                  <div className="space-y-1 text-[11px]">
                    {delegation.allowedPermissions.slice(0, 2).map((p, i) => (
                      <div key={i} className="text-emerald-600 dark:text-emerald-400 font-bold truncate">
                        ✓ {p.api || p.name}
                      </div>
                    ))}
                    {delegation.restrictedPermissions.slice(0, 2).map((p, i) => (
                      <div key={i} className="text-red-500 line-through truncate opacity-80">
                        ✕ {p.api || p.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-[var(--text-dim)] font-sans italic">
                    Zero access permissions active. Token will be issued upon task assignment.
                  </p>
                )}
              </div>

              {/* Card Footer: Expiry + Click CTA */}
              <div className="flex items-center justify-between pt-2 border-t text-xs font-semibold" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="text-[11px] text-[var(--text-muted)]">
                  {delegation ? delegation.expiryText : 'Permanent credentials: 0'}
                </div>

                <div className="flex items-center gap-1 text-[var(--brand-pink)] font-bold text-xs group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <ChevronRight size={14} />
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. TEAM MEMBER DETAIL DRAWER / MODAL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-pop p-6 sm:p-8 space-y-6 animate-pop-in relative"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-subtle)] transition-all"
            >
              <X size={20} />
            </button>

            {/* Profile Overview */}
            <div className="flex items-center gap-4 pr-8">
              <UserAvatar name={selectedMember.name} size={56} />
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'Outfit', color: 'var(--text-main)' }}>
                    {selectedMember.name}
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--brand-peach)] text-[var(--brand-pink)]">
                    {selectedMember.role}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] flex items-center gap-2">
                  <Mail size={12} /> {selectedMember.email} • Joined {selectedMember.joinedDate}
                </p>
              </div>
            </div>

            {/* Current Delegation Details */}
            {(() => {
              const currentDel = getMemberDelegation(selectedMember.name);
              return (
                <div className="space-y-4">
                  {currentDel ? (
                    <div className="p-5 rounded-2xl border space-y-3" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--brand-pink)]">
                          Active Delegation
                        </span>
                        <span className="text-xs font-bold text-emerald-600">
                          {currentDel.expiryText}
                        </span>
                      </div>

                      <h4 className="text-base font-black" style={{ color: 'var(--text-main)' }}>
                        {currentDel.title}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] italic">
                        “{currentDel.taskPrompt}”
                      </p>

                      {/* Scopes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {/* Granted */}
                        <div className="p-3 rounded-xl border bg-emerald-50/70 border-emerald-200 text-xs space-y-1">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                            ✓ ACCESS GRANTED
                          </span>
                          {currentDel.allowedPermissions.map((p, i) => (
                            <p key={i} className="text-emerald-900 font-semibold truncate">✓ {p.name}</p>
                          ))}
                        </div>

                        {/* Restricted */}
                        <div className="p-3 rounded-xl border bg-red-50/70 border-red-200 text-xs space-y-1">
                          <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block">
                            ✕ ACCESS RESTRICTED
                          </span>
                          {currentDel.restrictedPermissions.map((p, i) => (
                            <p key={i} className="text-red-900 font-semibold line-through truncate">✕ {p.name}</p>
                          ))}
                        </div>
                      </div>

                      {/* Revoke Button */}
                      {currentDel.status === 'active' && (
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => handleRevokeForMember(currentDel.id, selectedMember.name)}
                            className="py-2 px-4 rounded-xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-600 hover:text-white transition-all flex items-center gap-1.5"
                          >
                            <Ban size={14} />
                            <span>Revoke Current Access Token</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-5 rounded-2xl border text-center space-y-2" style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)' }}>
                      <p className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>No Active Task Delegated</p>
                      <p className="text-[11px] text-[var(--text-muted)]">
                        {selectedMember.name} holds zero active business access tokens. Access is only issued when you delegate a task.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedMember(null);
                          onOpenDelegateModal();
                        }}
                        className="btn-pink-primary text-xs py-2 px-4 font-bold inline-flex items-center gap-1.5 mt-2"
                      >
                        <Plus size={14} />
                        <span>Delegate a Task to {selectedMember.name}</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Access Activity Timeline for Selected Member */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--text-main)' }}>
                Access Activity Timeline ({selectedMember.name})
              </h4>

              <div className="space-y-2">
                {selectedMember.activities?.map((act, idx) => (
                  <div key={idx} className="p-3 rounded-xl border flex items-center justify-between text-xs" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}>
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${
                        act.statusType === 'allowed' || act.statusType === 'granted' 
                          ? 'bg-emerald-500' 
                          : act.statusType === 'blocked' 
                          ? 'bg-red-500' 
                          : 'bg-amber-500'
                      }`} />
                      <span className="font-semibold" style={{ color: 'var(--text-main)' }}>{act.text}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        act.statusType === 'allowed' || act.statusType === 'granted' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : act.statusType === 'blocked' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {act.status}
                      </span>
                      <span className="text-[10px] text-[var(--text-dim)]">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <button
                onClick={() => {
                  setSelectedMember(null);
                  onOpenDelegateModal();
                }}
                className="btn-pink-primary text-xs py-2.5 px-4 font-bold flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>+ Delegate New Task</span>
              </button>

              <button
                onClick={() => setSelectedMember(null)}
                className="btn-outline-subtle text-xs py-2.5 px-4 font-bold"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. + ADD TEAM MEMBER MODAL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {isAddMemberOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-lg rounded-3xl border shadow-pop p-6 sm:p-8 space-y-6 animate-pop-in relative"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setIsAddMemberOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface-subtle)] transition-all"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[var(--brand-pink)] border" style={{ background: 'var(--brand-peach)', borderColor: 'var(--border-subtle)' }}>
                <UserPlus size={13} />
                <span>Team Roster</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)' }}>
                Add New Team Member
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Invite an assistant or specialist to your TaskKey delegation network.
              </p>
            </div>

            {isAddingSuccess ? (
              <div className="py-10 text-center space-y-3 animate-fade-in">
                <div className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center text-white shadow-glow" style={{ background: 'var(--brand-pink)' }}>
                  <Check size={32} />
                </div>
                <h3 className="text-lg font-black" style={{ color: 'var(--text-main)' }}>Team Member Added!</h3>
                <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto">
                  “Team member added. Access will be granted only when a task is delegated.”
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddMemberSubmit} className="space-y-4">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--text-main)' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Mehta"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-3 rounded-xl border text-sm font-semibold focus:outline-none focus:border-[var(--brand-pink)] transition-all"
                    style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--text-main)' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. aarav@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border text-sm font-semibold focus:outline-none focus:border-[var(--brand-pink)] transition-all"
                    style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                  />
                </div>

                {/* Role */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider block" style={{ color: 'var(--text-main)' }}>
                    Role / Specialization
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full p-3 rounded-xl border text-sm font-semibold focus:outline-none focus:border-[var(--brand-pink)] transition-all"
                    style={{ background: 'var(--bg-surface-subtle)', borderColor: 'var(--border-subtle)', color: 'var(--text-main)' }}
                  >
                    <option value="Operations Assistant">Operations Assistant</option>
                    <option value="Inventory Specialist">Inventory Specialist</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Marketing Associate">Marketing Associate</option>
                    <option value="Freelance Developer">Freelance Developer</option>
                  </select>
                </div>

                {/* TaskKey Zero Permanent Access Notice */}
                <div className="p-3.5 rounded-2xl border space-y-1 text-xs" style={{ background: 'var(--brand-peach)', borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center gap-1.5 font-bold text-[var(--brand-pink)]">
                    <Shield size={14} />
                    <span>TaskKey Zero-Trust Guarantee</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                    Adding a member does <strong>NOT</strong> grant permanent store login or access to credentials. They will only receive time-limited scoped tokens when you assign a specific task.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddMemberOpen(false)}
                    className="btn-outline-subtle text-xs py-3 px-5 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-pink-primary text-xs sm:text-sm py-3 px-6 justify-center font-bold flex items-center gap-2 shadow-md"
                  >
                    <UserPlus size={16} />
                    <span>Add Member</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
